import { Navigate, Route, Routes, useParams, useLocation } from "react-router-dom";
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import Quizzes from "../Quizzes";
import Piazza from "../Piazza/Piazza";
import { useSelector } from "react-redux";

export default function Courses({ courses }: { courses: any[]; }) {
    const { cid } = useParams();
    const course = courses.find((course) => course._id === cid);
    const { pathname } = useLocation();
    const currentSection = pathname.split("/")[4] || "Home";
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
                        <Route path="Quizzes" element={<Quizzes/>}/>
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
