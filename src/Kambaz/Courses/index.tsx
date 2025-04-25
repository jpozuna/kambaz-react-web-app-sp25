import React from 'react';
import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import { FaAlignJustify } from 'react-icons/fa';
import CoursesNavigation from './Navigation';
import Home from './Home';
import Modules from './Modules';
import Assignments from './Assignments';
import AssignmentEditor from './Assignments/Editor';
import Quizzes from '../Quizzes/Quizzes';
import Piazza from '../Piazza/Piazza';
import PeopleTable from './People/Table';
import { useSelector } from "react-redux";

export default function Courses({ courses }: { courses: any[]; }) {
    const { cid } = useParams();
    const { pathname } = useLocation();
    const course = courses.find(c => c._id === cid);
    const currentSection = pathname.split('/').pop();
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    return (
        <div id="wd-courses">
            <h2 className="text-danger mb-4">
                <FaAlignJustify className="me-2 fs-4 mb-1"/>
                {course && course.name} &gt; {currentSection}
            </h2>
            <hr/>
            <div className="d-flex">
                <div className="me-4">
                    <CoursesNavigation cid={cid} pathname={pathname}/>
                </div>
                <div className="flex-fill">
                    <Routes>
                        <Route path="/" element={<Navigate to="Home"/>}/>
                        <Route path="Home" element={<Home/>}/>
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Assignments" element={<Assignments/>}/>
                        <Route path="Assignments/:aid" element={<AssignmentEditor/>}/>
                        <Route path="Quizzes" element={<Quizzes courseId={cid || ''} currentUser={currentUser} />}/>
                        <Route path="Piazza" element={
                            <Piazza 
                                courseName={course?.name || ""} 
                                userName={currentUser?.username || ""}
                                userRole={currentUser?.role === "FACULTY" ? "instructor" : "student"}
                                userId={currentUser?._id || ""}
                            />
                        }/>
                        <Route path="People" element={<PeopleTable/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}
