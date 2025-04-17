import {FaPlus, FaSearch, FaGripVertical, FaEllipsisV, FaTrash} from "react-icons/fa";
import {BsPlus} from "react-icons/bs";
import GreenCheckmark from "../Modules/GreenCheckmark";
import {useParams} from "react-router";
import {Link, useNavigate} from "react-router-dom";
import * as coursesClient from "../client";
import * as assignmentsClient from "../client";
import {useState, useEffect} from "react";
import {addAssignment, deleteAssignment, updateAssignment, setAssignments} from "./reducer";
import {useDispatch, useSelector} from "react-redux";
import * as modulesClient from "../Modules/client";
import {deleteModule} from "../Modules/reducer";

export default function Assignments() {
    const {assignments} = useSelector((state: any) => state.assignmentsReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {cid} = useParams();
    const fetchAssignments = async () => {
        const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
        dispatch(setAssignments(assignments));
    };
    useEffect(() => {
        fetchAssignments();
    }, []);
    const removeAssignment = async (assignmentId: string) => {
        await assignmentsClient.deleteAssignment(assignmentId);
        dispatch(deleteAssignment(assignmentId));
    };
    return (
        <div id="wd-assignments" className="p-3">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                    <FaSearch className="me-2 text-muted"/>
                    <input
                        id="wd-search-assignment"
                        placeholder="Search..."
                        className="form-control"
                        style={{width: "250px"}}
                    />
                </div>
                <div className="d-flex">
                    <button className="btn btn-outline-secondary me-2">
                        <FaPlus className="me-1"/> Group
                    </button>
                    <button className="btn btn-danger"
                            onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments/new`)}>
                        <FaPlus className="me-1"/> Assignment
                    </button>
                </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3 bg-light p-3">
                <h4 className="fw-bold mb-0" style={{fontSize: "1.5rem"}}>
                    Assignments
                </h4>
                <div className="d-flex align-items-center">
                    <span className="badge rounded-pill bg-light border me-2 px-3 py-2 text-dark">
        40% of Total <BsPlus className="ms-1"/>
                     </span>
                    <FaEllipsisV/>
                </div>
            </div>

            <ul id="wd-assignment-list" className="list-group">
                {assignments.map((assignment: any) => (
                    <li
                        key={assignment.id}
                        className="wd-assignment-list-item list-group-item p-3 d-flex justify-content-between align-items-center"
                        style={{borderLeft: "10px solid green"}}
                    >
                        <div className="d-flex align-items-center">
                            <FaGripVertical className="me-2 fs-5 text-muted"/>
                            <div>

                                <Link
                                    to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                                    className="fw-bold d-block text-decoration-none text-dark"
                                >
                                    {assignment.title}
                                </Link>
                                <small className="text-muted">
                                    <span
                                        className="text-danger">Multiple Modules</span> | <b>Due</b> {assignment.dueDate} | {assignment.points} pts
                                </small>
                            </div>
                        </div>
                        <div className="d-flex align-items-center">
                            <GreenCheckmark/>
                            <FaEllipsisV className="ms-2"/>
                            <FaTrash className="ms-2 text-danger" onClick={() => removeAssignment(assignment._id)}/>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}