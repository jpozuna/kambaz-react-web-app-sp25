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
        if (course) {
            await courseClient.updateCourse(course);
        }
    };

    const addNewCourse = async () => {
        const newCourse = await userClient.createCourse(courses);
        setCourses([ ...courses, newCourse ]);
    };    

    const deleteCourse = async (courseId: string) => {
        const status = await courseClient.deleteCourse(courseId);
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
