import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { deleteAssignment } from "./reducer";
import { RootState } from "../../store";
import { FaEllipsisV, FaGripVertical, FaSearch, FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { BsPlus } from "react-icons/bs";
import { Link } from "react-router-dom";
import GreenCheckmark from "../Modules/GreenCheckmark.tsx";

interface Assignment {
    _id: string;
    title: string;
    description: string;
    points: number;
    dueDate: string;
    notAvailableUntil: string;
    course: string;
    modules: string;
}

interface CourseAssignments {
    course_id: string;
    course_name: string;
    assignments: Assignment[];
}

export default function Assignments() {
    const { cid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const courseAssignments = useSelector((state: RootState) => state.assignmentsReducer.assignments as CourseAssignments[]);
    const assignmentsArray = courseAssignments.find(course => course.course_id === cid)?.assignments || [];

    const [showDialog, setShowDialog] = useState(false);
    const [assignmentToDelete, setAssignmentToDelete] = useState<Assignment | null>(null);

    const handleAddAssignment = () => {
        navigate(`/Kambaz/Courses/${cid}/Assignments/new`);
    };

    const handleDeleteClick = (assignment: Assignment) => {
        setAssignmentToDelete(assignment);
        setShowDialog(true);
    };

    const handleConfirmDelete = () => {
        if (assignmentToDelete) {
            dispatch(deleteAssignment(assignmentToDelete._id));
            setShowDialog(false);
            setAssignmentToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setShowDialog(false);
        setAssignmentToDelete(null);
    };

    return (
        <div id="wd-assignments" className="p-3">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                    <FaSearch className="me-2 text-muted" />
                    <input id="wd-search-assignment" placeholder="Search..." className="form-control" style={{ width: "250px" }} />
                </div>
                <div className="d-flex">
                    <button className="btn btn-outline-secondary me-2">
                        <FaPlus className="me-1" /> Group
                    </button>
                    <button className="btn btn-danger" onClick={handleAddAssignment}>
                        <FaPlus className="me-1" /> Assignment
                    </button>
                </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3 bg-light p-3">
                <h4 className="fw-bold mb-0" style={{ fontSize: "1.5rem" }}>Assignments</h4>
                <div className="d-flex align-items-center">
                    <span className="badge rounded-pill bg-light border me-2 px-3 py-2 text-dark">
                        40% of Total <BsPlus className="ms-1" />
                    </span>
                    <FaEllipsisV />
                </div>
            </div>

            <ul className="list-group">
                {assignmentsArray.map((assignment: Assignment) => (
                    <li key={assignment._id} className="wd-assignment-list-item list-group-item p-3 d-flex justify-content-between align-items-center" style={{ borderLeft: "10px solid green" }}>
                        <div className="d-flex align-items-center">
                            <FaGripVertical className="me-2 fs-5 text-muted" />
                            <div>
                                <Link to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`} className="fw-bold d-block text-decoration-none text-dark">
                                    {assignment.title}
                                </Link>
                                <small className="text-muted">
                                    <span className="text-danger">{assignment.modules}</span> | <b>Not Available Until:</b> {assignment.notAvailableUntil} | <b>Due Date:</b> {assignment.dueDate}
                                </small>
                            </div>
                        </div>
                        <div className="d-flex align-items-center">
                            <GreenCheckmark />
                            <FaTrash className="ms-2 text-danger" onClick={() => handleDeleteClick(assignment)} />
                        </div>
                    </li>
                ))}
            </ul>

            {showDialog && (
                <div className="modal" style={{ display: "block" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Delete</h5>
                                <button type="button" className="btn-close" onClick={handleCancelDelete}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this assignment?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCancelDelete}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

