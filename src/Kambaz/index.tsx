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
            await courseClient.updateCourse(course);
            const updatedCourses = await userClient.findMyCourses();
            setCourses(updatedCourses);
        } catch (e) {
            console.error("⛔ Update failed:", e);
        }
    };


    const addNewCourse = async () => {
        if (!currentUser) return;
        const newCourse = await courseClient.createCourse({ name: "", description: "" });
        // Optional: enroll the user in the course if your logic supports it
        await courseClient.enrollInCourse(newCourse._id, currentUser._id);
        setCourses([...courses, newCourse]);
    };


    const deleteCourse = async (courseId: string) => {
        await courseClient.deleteCourse(courseId);
    };

    const fetchCourses = async () => {
        try {
            const courses = await userClient.findMyCourses();
            setCourses(courses);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCourses();
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
