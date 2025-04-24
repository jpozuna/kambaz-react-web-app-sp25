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
import { useSelector } from "react-redux";
import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";

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
    const [courses, setCourses] = useState<Course[]>([]);
    const [course, setCourse] = useState<Course | null>(null);
    const [enrolling, setEnrolling] = useState<boolean>(false);

    const findCoursesForUser = async () => {
        try {
            const courses = await userClient.findCoursesForUser(currentUser._id);
            setCourses(courses as Course[]);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchCourses = async () => {
        try {
            const allCourses = await courseClient.fetchAllCourses() as Course[];
            const enrolledCourses = await userClient.findCoursesForUser(
                currentUser._id
            ) as Course[];
            const courses = allCourses.map((course) => {
                if (enrolledCourses.find((c) => c._id === course._id)) {
                    return { ...course, enrolled: true };
                } else {
                    return course;
                }
            });
            setCourses(courses);
        } catch (error) {
            console.error(error);
        }
    };

    const updateEnrollment = async (courseId: string, enrolled: boolean) => {
        try {
            if (enrolled) {
                await userClient.enrollIntoCourse(currentUser._id, courseId);
            } else {
                await userClient.unenrollFromCourse(currentUser._id, courseId);
            }
            setCourses(
                courses.map((course) => {
                    if (course._id === courseId) {
                        return { ...course, enrolled: enrolled };
                    } else {
                        return course;
                    }
                })
            );
        } catch (error) {
            console.error(error);
        }
    };

    const addNewCourse = async () => {
        try {
            const newCourse = await courseClient.createCourse({
                name: "New Course",
                number: "CS1234",
                startDate: "2024-01-01",
                endDate: "2024-05-01",
                image: "https://example.com/course.jpg",
                description: "New course description",
                credits: 3,
            });
            setCourses([...courses, newCourse as Course]);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteCourse = async (courseId: string) => {
        try {
            await courseClient.deleteCourse(courseId);
            setCourses(courses.filter((course) => course._id !== courseId));
        } catch (error) {
            console.error(error);
        }
    };

    const updateCourse = async (courseId: string, course: Partial<Course>) => {
        try {
            await courseClient.updateCourse(courseId, course);
            setCourses(
                courses.map((c) => (c._id === courseId ? { ...c, ...course } : c))
            );
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (enrolling) {
            fetchCourses();
        } else {
            findCoursesForUser();
        }
    }, [currentUser, enrolling]);

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
