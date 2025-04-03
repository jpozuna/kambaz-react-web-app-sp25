import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { enroll, unenroll, toggleEnrollmentView } from "./Account/reducer";
import { Button } from "react-bootstrap";

interface DashboardProps {
    courses: { _id: string; name: string; description: string }[];
    course: { _id: string; name: string; description: string };
    setCourse: (course: { _id: string; name: string; description: string }) => void;
    addNewCourse: () => void;
    deleteCourse: (courseId: string) => void;
    updateCourse: () => void;
}

export default function Dashboard({
                                      courses,
                                      course,
                                      setCourse,
                                      addNewCourse,
                                      deleteCourse,
                                      updateCourse
                                  }: DashboardProps) {
    {
        const {currentUser, enrollmentsViewAll} = useSelector((state: any) => state.accountReducer);
        useNavigate();
        const dispatch = useDispatch();

        const isEnrolled = (courseId: string) => {
            if (!Array.isArray(enrollment)) {
                console.error("Enrollments is undefined or not an array:", enrollment);
                return false;
            }
            return enrollment.some(
                (enrollment) => enrollment.user === currentUser._id && enrollment.course === courseId
            );
        };
        const handleEnroll = (courseId: string) => {
            dispatch(enroll({userId: currentUser._id, courseId}));
        };


        const handleUnenroll = (courseId: string) => {
            dispatch(unenroll({userId: currentUser._id, courseId}));
        };


        const handleToggleView = () => {
            dispatch(toggleEnrollmentView());
        };

        return (
            <div id="wd-dashboard" className="container-fluid">
                <h1 id="wd-dashboard-title">Dashboard</h1>
                <h5>New Course
                    <button className="btn btn-primary float-end"
                            onClick={addNewCourse}>Add</button>
                    <button className="btn btn-warning float-end me-2"
                            onClick={updateCourse}>Update
                    </button>
                </h5>
                <br/>
                <input value={course.name} className="form-control mb-2"
                       onChange={(e) => setCourse({...course, name: e.target.value})}/>
                <textarea value={course.description} className="form-control"
                          onChange={(e) => setCourse({...course, description: e.target.value})}/>
                <hr/>
                <button className="btn btn-primary float-end" onClick={handleToggleView}>
                    {enrollmentsViewAll ? "View My Enrollments" : "View All Courses"}
                </button>
                <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
                <hr/>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {courses.map((course: { _id: string; name: string; description: string }) => (
                        <div key={course._id} className="col" style={{width: "260px"}}>
                            <div className="card rounded-3 overflow-hidden">
                                <Link to={`/Kambaz/Courses/${course._id}/Home`}
                                      className="text-decoration-none text-dark">
                                    <img src="/images/canvas-image.png" width="100%" height={160}
                                         alt="Course"/>
                                    <div className="card-body">
                                        <h5 className="card-title">{course.name}</h5>
                                        <p className="card-text">{course.description}</p>
                                    </div>
                                </Link>
                                <div className="card-body d-flex justify-content-between">
                                    <Button variant="primary">Go</Button>
                                    <div>
                                        <Button variant="warning" onClick={() => setCourse(course)}>
                                            Edit
                                        </Button>
                                        <Button variant="danger"
                                                onClick={() => deleteCourse(course._id)}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    {isEnrolled(course._id) ? (
                                        <Button className="btn btn-danger w-100"
                                                onClick={() => handleUnenroll(course._id)}>
                                            Unenroll
                                        </Button>
                                    ) : (
                                        <Button className="btn btn-success w-100"
                                                onClick={() => handleEnroll(course._id)}>
                                            Enroll
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }


}