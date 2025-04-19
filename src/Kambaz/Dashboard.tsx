import { Link } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";

export default function Dashboard({
                                      courses,
                                      course,
                                      setCourse,
                                      addNewCourse,
                                      deleteCourse,
                                      updateCourse,
                                      enrolling,
                                      setEnrolling,
                                      updateEnrollment,
                                  }: {
    courses: any[];
    course: any;
    setCourse: (course: any) => void;
    addNewCourse: () => void;
    deleteCourse: (course: any) => void;
    updateCourse: () => void;
    enrolling: boolean;
    setEnrolling: (enrolling: boolean) => void;
    updateEnrollment: (courseId: string, enrolled: boolean) => void;
}) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    console.log("Current User:", currentUser);
    console.log("Courses:", courses);

    return (
        <div id="wd-dashboard" className="container-fluid">
            <h1 id="wd-dashboard-title">
                Dashboard
                <button
                    onClick={() => setEnrolling(!enrolling)}
                    className="float-end btn btn-primary"
                >
                    {enrolling ? "My Courses" : "All Courses"}
                </button>
            </h1>
            <hr />

            <h5>
                New Course
                <button
                    className="btn btn-primary float-end"
                    id="wd-add-new-course-click"
                    onClick={addNewCourse}
                >
                    {" "}
                    Add{" "}
                </button>
                <button
                    className="btn btn-warning float-end me-2"
                    onClick={updateCourse}
                    id="wd-update-course-click"
                >
                    Update
                </button>
            </h5>
            <br />
            <input
                value={course.name}
                className="form-control mb-2"
                onChange={(e) => setCourse({ ...course, name: e.target.value })}
            />
            <textarea
                value={course.description}
                className="form-control"
                onChange={(e) => setCourse({ ...course, description: e.target.value })}
            />
            <hr />

            <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
            <hr />
            <div id="wd-dashboard-courses" className="row justify-content-start">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {courses.map((course) => (
                        <div className="wd-dashboard-course col" style={{ width: "260px" }}>
                            <div className="card rounded-3 overflow-hidden">
                                <Link
                                    className="wd-dashboard-course-link text-decoration-none text-dark"
                                    to={`/Kambaz/Courses/${course._id}/Home`}
                                >
                                    <img
                                        src="/images/canvas-image.png"
                                        width="100%"
                                        height={160}
                                        className="card-img-top"
                                    />
                                    <div className="card-body">
                                        <h5 className="wd-dashboard-course-title card-title">
                                            {enrolling && (
                                                <button
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        updateEnrollment(course._id, !course.enrolled);
                                                    }}
                                                    className={`btn ${
                                                        course.enrolled ? "btn-danger" : "btn-success"
                                                    } float-end`}
                                                >
                                                    {course.enrolled ? "Unenroll" : "Enroll"}
                                                </button>
                                            )}
                                            {course.name}
                                        </h5>
                                        <p className="wd-dashboard-course-title card-text">
                                            {course.description}
                                        </p>
                                        <button className="btn btn-primary">Go</button>
                                    </div>
                                </Link>
                                <div className="card-body">
                                    <button
                                        onClick={(event) => {
                                            event.preventDefault();
                                            deleteCourse(course._id);
                                        }}
                                        className="btn btn-secondary float-end me-2"
                                        id="wd-unenroll-course-click"
                                    >
                                        Unenroll
                                    </button>
                                    <button
                                        id="wd-edit-course-click"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            setCourse(course);
                                        }}
                                        className="btn btn-warning me-2 float-end"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
