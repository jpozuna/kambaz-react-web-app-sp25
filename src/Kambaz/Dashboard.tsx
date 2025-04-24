import { Link } from "react-router-dom";
import React, {useState} from "react";
import { useSelector } from "react-redux";

interface Course {
    _id: string;
    name: string;
    number: string;
    startDate: string;
    endDate: string;
    image: string;
    description: string;
    credits: number;
    enrolled?: boolean;
}

interface DashboardProps {
    courses: Course[];
    course: Course | null;
    setCourse: (course: Course | null) => void;
    addNewCourse: () => void;
    deleteCourse: (courseId: string) => void;
    updateCourse: (courseId: string, course: Partial<Course>) => void;
    enrolling: boolean;
    setEnrolling: (enrolling: boolean) => void;
    updateEnrollment: (courseId: string, enrolled: boolean) => void;
}

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
}: DashboardProps) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isAdmin = currentUser?.role === "ADMIN";
    const isFaculty = currentUser?.role === "FACULTY";

    return (
        <div id="wd-dashboard" className="container-fluid">
            <h1 id="wd-dashboard-title">
                Dashboard
                {!isAdmin && !isFaculty && (
                    <Link to="/Kambaz/Enrollments" className="float-end btn btn-primary">
                        My Enrollments
                    </Link>
                )}
            </h1>
            <hr />

            {(isAdmin || isFaculty) && (
                <>
                    <h5>
                        Course Management
                        <button
                            className="btn btn-primary float-end"
                            id="wd-add-new-course-click"
                            onClick={addNewCourse}
                        >
                            Add New Course
                        </button>
                        {course && (
                            <button
                                className="btn btn-warning float-end me-2"
                                onClick={() => updateCourse(course._id, course)}
                                id="wd-update-course-click"
                            >
                                Update Course
                            </button>
                        )}
                    </h5>
                    {course && (
                        <div className="mt-3">
                            <input
                                value={course.name}
                                placeholder="Course Name"
                                className="form-control mb-2"
                                onChange={(e) => setCourse({ ...course, name: e.target.value })}
                            />
                            <textarea
                                value={course.description}
                                placeholder="Course Description"
                                className="form-control"
                                onChange={(e) => setCourse({ ...course, description: e.target.value })}
                            />
                        </div>
                    )}
                    <hr />
                </>
            )}

            <h2 id="wd-dashboard-published">
                Available Courses ({courses.length})
            </h2>
            <hr />
            <div id="wd-dashboard-courses" className="row justify-content-start">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {courses.map((course) => (
                        <div key={course._id} className="wd-dashboard-course col" style={{ width: "260px" }}>
                            <div className="card rounded-3 overflow-hidden">
                                <Link
                                    className="wd-dashboard-course-link text-decoration-none text-dark"
                                    to={`/Kambaz/Courses/${course._id}/Home`}
                                >
                                    <img
                                        src={course.image}
                                        width="100%"
                                        height={160}
                                        className="card-img-top"
                                        alt={course.name}
                                    />
                                    <div className="card-body">
                                        <h5 className="wd-dashboard-course-title card-title">
                                            {course.name}
                                        </h5>
                                        <p className="wd-dashboard-course-title card-text">
                                            {course.description}
                                        </p>
                                    </div>
                                </Link>
                                <div className="card-footer">
                                    <Link
                                        to={`/Kambaz/Courses/${course._id}/Home`}
                                        className="btn btn-primary"
                                    >
                                        View Course
                                    </Link>
                                    {(isAdmin || isFaculty) && (
                                        <>
                                            <button
                                                onClick={() => setCourse(course)}
                                                className="btn btn-warning float-end ms-2"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => deleteCourse(course._id)}
                                                className="btn btn-danger float-end"
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
