import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
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
    addNewCourse: (course: Partial<Course>) => void;
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
    const navigate = useNavigate();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isAdmin = currentUser?.role === "ADMIN";
    const isFaculty = currentUser?.role === "FACULTY";
    const isStudent = !isAdmin && !isFaculty;
    const [newCourse, setNewCourse] = useState({ name: '', description: '' });
    const [selectedFilter, setSelectedFilter] = useState('All Courses');

    // Filter courses based on enrollment status
    const filteredCourses = selectedFilter === 'My Enrollments' 
        ? courses.filter(course => course.enrolled)
        : courses;

    const handleAddCourse = () => {
        if (newCourse.name && newCourse.description) {
            addNewCourse({
                name: newCourse.name,
                description: newCourse.description,
                image: '/images/canvas-image.png',
                number: '',
                startDate: new Date().toISOString(),
                endDate: new Date().toISOString(),
                credits: 3
            });
            setNewCourse({ name: '', description: '' });
        }
    };

    const handleUpdateCourse = () => {
        if (course) {
            updateCourse(course._id, {
                name: course.name,
                description: course.description,
                image: course.image || '/images/canvas-image.png'
            });
            setCourse(null);
        }
    };

    const handleCardClick = (courseId: string, event: React.MouseEvent) => {
        // Check if the click target is a button or link
        const target = event.target as HTMLElement;
        if (target.closest('button') || target.closest('a')) {
            return;
        }
        navigate(`/Kambaz/Courses/${courseId}/Home`);
    };

    return (
        <div className="container-fluid p-4">
            <div className="row">
                {/* Left Sidebar */}
                <div className="col-md-2">
                    <div className="list-group">
                        <button 
                            className={`list-group-item list-group-item-action ${selectedFilter === 'All Courses' ? 'active' : ''}`}
                            onClick={() => setSelectedFilter('All Courses')}
                        >
                            All Courses
                        </button>
                        {isStudent && (
                            <button 
                                className={`list-group-item list-group-item-action ${selectedFilter === 'My Enrollments' ? 'active' : ''}`}
                                onClick={() => setSelectedFilter('My Enrollments')}
                            >
                                My Enrollments
                                <span className="badge bg-primary rounded-pill float-end">
                                    {courses.filter(course => course.enrolled).length}
                                </span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Main Content */}
                <div className="col-md-10">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="mb-0">
                            {selectedFilter === 'My Enrollments' ? 'My Enrolled Courses' : 'Course Dashboard'}
                        </h2>
                    </div>

                    {/* Admin Course Management */}
                    {(isAdmin || isFaculty) && selectedFilter === 'All Courses' && (
                        <div className="card mb-4">
                            <div className="card-header bg-light">
                                <h5 className="mb-0">Course Management</h5>
                            </div>
                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-md-4">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="New Course Name"
                                            value={newCourse.name}
                                            onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="New Course Description"
                                            value={newCourse.description}
                                            onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <button
                                            className="btn btn-primary w-100"
                                            onClick={handleAddCourse}
                                            disabled={!newCourse.name || !newCourse.description}
                                        >
                                            Add Course
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Course Editor */}
                    {course && (
                        <div className="card mb-4">
                            <div className="card-header bg-light d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Edit Course</h5>
                                <button
                                    className="btn btn-sm btn-outline-secondary"
                                    onClick={() => setCourse(null)}
                                >
                                    ×
                                </button>
                            </div>
                            <div className="card-body">
                                <div className="mb-3">
                                    <input
                                        value={course.name}
                                        placeholder="Course Name"
                                        className="form-control mb-2"
                                        onChange={(e) => setCourse({ ...course, name: e.target.value })}
                                    />
                                    <textarea
                                        value={course.description}
                                        placeholder="Course Description"
                                        className="form-control mb-2"
                                        onChange={(e) => setCourse({ ...course, description: e.target.value })}
                                    />
                                    <input
                                        value={course.image || ''}
                                        placeholder="Course Image URL"
                                        className="form-control mb-3"
                                        onChange={(e) => setCourse({ ...course, image: e.target.value })}
                                    />
                                    <button
                                        className="btn btn-warning"
                                        onClick={handleUpdateCourse}
                                    >
                                        Update Course
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Course List */}
                    <div className="row g-4">
                        {filteredCourses.map((course) => (
                            <div key={course._id} className="col-md-6 col-lg-4">
                                <div 
                                    className="card h-100 interactive-card" 
                                    onClick={(e) => handleCardClick(course._id, e)}
                                    style={{
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s, box-shadow 0.2s'
                                    }}
                                >
                                    <img
                                        src={course.image || "/images/canvas-image.png"}
                                        className="card-img-top"
                                        alt={course.name}
                                        style={{ height: "160px", objectFit: "cover" }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{course.name}</h5>
                                        <p className="card-text text-muted">{course.description}</p>
                                        {course.enrolled && (
                                            <span className="badge bg-success">Enrolled</span>
                                        )}
                                    </div>
                                    <div className="card-footer bg-transparent">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <Link
                                                to={`/Kambaz/Courses/${course._id}/Home`}
                                                className="btn btn-outline-primary"
                                            >
                                                View Course
                                            </Link>
                                            <div>
                                                {(isAdmin || isFaculty) && selectedFilter === 'All Courses' && (
                                                    <>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setCourse(course);
                                                            }}
                                                            className="btn btn-outline-warning me-2"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                deleteCourse(course._id);
                                                            }}
                                                            className="btn btn-outline-danger"
                                                        >
                                                            Delete
                                                        </button>
                                                    </>
                                                )}
                                                {isStudent && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            updateEnrollment(course._id, !course.enrolled);
                                                        }}
                                                        className={`btn btn-${course.enrolled ? 'outline-danger' : 'outline-success'}`}
                                                        disabled={enrolling}
                                                    >
                                                        {course.enrolled ? 'Unenroll' : 'Enroll'}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
