import { courses } from "../Database";
import { useParams, useLocation } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./Navigation";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Modules from "./Modules";
import Assignments from "./Assignments";
import "../styles.css";
import AssignmentEditor from "./Assignments/Editor.tsx";
import PeopleTable from "./People/Table.tsx";


export default function Courses() {
    const { pathname } = useLocation();
    const { cid } = useParams();
    const course = courses.find((course) => course._id === cid);
    const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />
                {course && course.name} &gt; {pathname.split("/")[4]}
            </h2>

            <hr />

            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CourseNavigation links={links} cid={cid} pathname={pathname} />
                </div>

                <div className="flex-grow-1 p-3">
                    <Routes>
                        <Route path="Home" element={<Home />}/>
                        <Route path="Modules" element={<Modules />}/>
                        <Route path="Assignments/*" element={<Assignments />} />
                        <Route path="Assignments/:assignmentSlug" element={<AssignmentEditor />} />
                        <Route path="People" element={<PeopleTable />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

