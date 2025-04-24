import {Routes, Route, Navigate} from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import "./styles.css";
import PeopleTable from "./Courses/People/Table";
import { useEffect, useState } from "react";
import ProtectedRoute from "./Account/ProtectedRoute";
import KambazNavigation from "./Navigation";
import Session from "./Account/Session";
import { useSelector, useDispatch } from "react-redux";
import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";
import { setCourses, addCourse, updateCourse as updateCourseAction, deleteCourse as deleteCourseAction, updateEnrollment as updateEnrollmentAction } from "./Courses/reducer";
import Enrollments from "./Enrollments";

interface Course {
    _id: string;
    name: string;
    number: string;
    startDate: string;
    endDate: string;
    image: string;
    description: string;
    credits: number;
    enrolled?: boolean;
}

export default function Kambaz() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { courses } = useSelector((state: any) => state.coursesReducer);
    const dispatch = useDispatch();
    const [course, setCourse] = useState<Course | null>(null);
    const [enrolling, setEnrolling] = useState<boolean>(false);

    const loadCourses = async () => {
        try {
            if (!currentUser) return;

            // Get all available courses
            const allCourses = await courseClient.fetchAllCourses() as Course[];
            
            // If user is a student, get their enrollments
            if (currentUser.role === "STUDENT") {
                const enrollments = await courseClient.getEnrollmentsForUser() as Course[];
                const coursesWithEnrollment = allCourses.map(course => ({
                    ...course,
                    enrolled: enrollments?.some(e => e?._id === course._id) || false
                }));
                dispatch(setCourses(coursesWithEnrollment));
            } else {
                // For admin and faculty, just load all courses
                dispatch(setCourses(allCourses.map(course => ({ ...course, enrolled: false }))));
            }
        } catch (error) {
            console.error("Error loading courses:", error);
        }
    };

    const updateEnrollment = async (courseId: string, enrolled: boolean) => {
        try {
            setEnrolling(true);
            if (enrolled) {
                await courseClient.enrollInCourse(courseId);
            } else {
                await courseClient.unenrollFromCourse(courseId);
            }
            dispatch(updateEnrollmentAction({ courseId, enrolled }));
            // Reload courses to get updated enrollment status
            await loadCourses();
        } catch (error) {
            console.error("Error updating enrollment:", error);
        } finally {
            setEnrolling(false);
        }
    };

    const addNewCourse = async (courseData: Partial<Course>) => {
        try {
            const newCourse = await courseClient.createCourse({
                name: courseData.name || "New Course",
                number: courseData.number || "CS1234",
                startDate: courseData.startDate || "2024-01-01",
                endDate: courseData.endDate || "2024-05-01",
                image: courseData.image || "/images/canvas-image.png",
                description: courseData.description || "New course description",
                credits: courseData.credits || 3,
            }) as Course;
            dispatch(addCourse(newCourse));
        } catch (error) {
            console.error("Error creating course:", error);
        }
    };

    const deleteCourse = async (courseId: string) => {
        try {
            await courseClient.deleteCourse(courseId);
            dispatch(deleteCourseAction(courseId));
        } catch (error) {
            console.error("Error deleting course:", error);
        }
    };

    const updateCourse = async (courseId: string, course: Partial<Course>) => {
        try {
            const updatedCourse = await courseClient.updateCourse(courseId, course) as Course;
            dispatch(updateCourseAction(updatedCourse));
        } catch (error) {
            console.error("Error updating course:", error);
        }
    };

    useEffect(() => {
        if (currentUser) {
            loadCourses();
        }
    }, [currentUser]);

    return (
        <Session>
            <div id="wd-kambaz">
                <KambazNavigation/>
                <div className="wd-main-content-offset p-3">
                    <Routes>
                        <Route path="/" element={<Navigate to="Dashboard"/>}/>
                        <Route path="/Account/*" element={<Account/>}/>
                        <Route path="/Dashboard" element={<ProtectedRoute><Dashboard
                            courses={courses}
                            course={course}
                            setCourse={setCourse}
                            addNewCourse={addNewCourse}
                            deleteCourse={deleteCourse}
                            updateCourse={updateCourse}
                            enrolling={enrolling}
                            setEnrolling={setEnrolling}
                            updateEnrollment={updateEnrollment}
                        /></ProtectedRoute>}/>
                        <Route path="/Enrollments" element={<ProtectedRoute>
                            <Enrollments courses={courses} updateEnrollment={updateEnrollment} />
                        </ProtectedRoute>}/>
                        <Route path="Courses/:cid/*" element={<ProtectedRoute><Courses courses={courses} /></ProtectedRoute> } />
                        <Route path="/Calendar" element={<h1>Calendar</h1>}/>
                        <Route path="/Inbox" element={<h1>Inbox</h1>}/>
                        <Route path="People" element={<PeopleTable />} />
                    </Routes>
                </div>
            </div>
        </Session>
    );
}
