import { Navigate, Route, Routes, useParams, useLocation } from "react-router-dom";
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";

export default function Courses({ courses }: { courses: any[]; }) {
    const { cid } = useParams();
    const course = courses.find((course) => course._id === cid);
    const { pathname } = useLocation();

    if (!course) {
        return <div>Course not found</div>;
    }

    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1"/>
                {course.name}&gt; {pathname.split("/")[4]}
            </h2>
            <hr/>
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CoursesNavigation 
                        cid={cid} 
                        pathname={pathname}
                        links={["Home", "Modules", "Assignments", "People"]}
                    />
                </div>
                <div className="flex-fill">
                    <Routes>
                        <Route path="/" element={<Navigate to="Home"/>}/>
                        <Route path="Home" element={<Home course={course}/>}/>
                        <Route path="Modules" element={<Modules course={course}/>}/>
                        <Route path="Assignments" element={<Assignments course={course}/>}/>
                        <Route path="Assignments/:aid" element={<AssignmentEditor course={course}/>}/>
                        <Route path="People" element={<PeopleTable course={course}/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}
