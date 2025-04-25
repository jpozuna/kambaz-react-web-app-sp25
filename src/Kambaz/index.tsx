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
import * as userClient from "./Account/client";
import { useSelector } from "react-redux";
import * as courseClient from "./Courses/client";

export default function Kambaz() {
    const [courses, setCourses] = useState<any[]>([]);
    const [course, setCourse] = useState<any>(null);
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const updateCourse = async () => {
        if (!course || !course._id) {
            console.warn("⛔ Can't update: course is missing or has no ID.");
            return;
        }

        try {
            await courseClient.updateCourse(course._id, course);
            setCourses(courses.map((c) => {
                if (c._id === course._id) { return course; }
                else { return c; }
            }));
        } catch (e) {
            console.error("⛔ Update failed:", e);
        }
    };

    const addNewCourse = async () => {
        const newCourse = await userClient.createCourse(course);
        setCourses([...courses, newCourse]);
    };

    const deleteCourse = async (courseId: string) => {
        try {
            await courseClient.deleteCourse(courseId);
            setCourses(courses.filter(course => course._id !== courseId));
        } catch (error) {
            console.error("Failed to delete course:", error);
        }
    };

    const fetchCourses = async () => {
        try {
            let fetchedCourses;
            if (currentUser.role === "FACULTY" || currentUser.role === "ADMIN") {
                // Faculty and admins see all courses
                fetchedCourses = await courseClient.fetchAllCourses();
            } else {
                // Students see all courses but can only enroll in them
                fetchedCourses = await courseClient.fetchAllCourses();
                // Get enrolled courses to mark them
                const enrolledCourses = await userClient.findMyCourses();
                fetchedCourses = fetchedCourses.map((course: any) => ({
                    ...course,
                    enrolled: enrolledCourses.some((ec: any) => ec._id === course._id)
                }));
            }
            setCourses(fetchedCourses as any[]);
        } catch (error) {
            console.error("Failed to fetch courses:", error);
        }
    };

    useEffect(() => {
        if (currentUser) {
            fetchCourses();
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
                            updateCourse={updateCourse}/></ProtectedRoute>}/>
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
