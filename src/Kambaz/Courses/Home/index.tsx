import Modules from "../Modules";
import CourseStatus from "./Status";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function Home() {
    const { role } = useSelector((state: any) => state.accountReducer);
    const { courses } = useSelector((state: any) => state.coursesReducer);
    const { cid } = useParams();
    const course = courses?.find((c: any) => c._id === cid);

    return (
        <div className="d-flex flex-column" id="wd-home">
            {course && (
                <div className="mb-4">
                    <h3>{course.name}</h3>
                    <p className="text-muted">{course.description}</p>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <strong>Start Date:</strong> {new Date(course.startDate).toLocaleDateString()}
                        </div>
                        <div className="col-md-6">
                            <strong>End Date:</strong> {new Date(course.endDate).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            )}
            <div className="d-flex">
                <div className="flex-fill">
                    <Modules/>
                </div>
                {role === "FACULTY" && (
                    <div className="d-none d-md-block">
                        <CourseStatus/>
                    </div>
                )}
            </div>
        </div>
    );
}