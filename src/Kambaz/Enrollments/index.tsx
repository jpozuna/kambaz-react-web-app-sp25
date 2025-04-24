import React from "react";
import { Link } from "react-router-dom";
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

interface EnrollmentsProps {
    courses: Course[];
    updateEnrollment: (courseId: string, enrolled: boolean) => void;
}

function Enrollments({ courses, updateEnrollment }: EnrollmentsProps) {
    const enrolledCourses = courses.filter(course => course.enrolled);

    return (
        <div className="container-fluid">
            <h1>My Enrollments</h1>
            <hr />
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {enrolledCourses.map((course) => (
                    <div key={course._id} className="col" style={{ width: "260px" }}>
                        <div className="card rounded-3 overflow-hidden">
                            <Link
                                className="text-decoration-none text-dark"
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
                                    <h5 className="card-title">{course.name}</h5>
                                    <p className="card-text">{course.description}</p>
                                </div>
                            </Link>
                            <div className="card-footer">
                                <Link
                                    to={`/Kambaz/Courses/${course._id}/Home`}
                                    className="btn btn-primary"
                                >
                                    View Course
                                </Link>
                                <button
                                    onClick={() => updateEnrollment(course._id, false)}
                                    className="btn btn-danger float-end"
                                >
                                    Unenroll
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Enrollments; 