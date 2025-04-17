import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as coursesClient from "../client";
import { addAssignment, setAssignments, updateAssignment } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as assignmentsClient from "../../Assignments/client";



export default function AssignmentEditor() {
    const { aid, cid } = useParams() as { aid: string; cid: string };
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [assignmentTitle, setAssignmentTitle] = useState("");
    const [assignmentDescription, setAssignmentDescription] = useState("");
    const [assignmentPoints, setAssignmentPoints] = useState(100);
    const [assignmentDueDate, setAssignmentDueDate] = useState("");
    const [assignmentAvailableFrom, setAssignmentAvailableFrom] = useState("2024-05-06");
    const [assignmentAvailableUntil, setAssignmentAvailableUntil] = useState("2024-05-28");

    const assignment = assignments.find((a: any) => a._id === aid);

    const fetchAssignments = async () => {
        const assignments = await coursesClient.findAssignmentsForCourse(cid);
        dispatch(setAssignments(assignments));
    };

    useEffect(() => {
        fetchAssignments();
        if (assignment) {
            setAssignmentTitle(assignment.title);
            setAssignmentDescription(assignment.description);
            setAssignmentPoints(assignment.points);
            setAssignmentDueDate(assignment.dueDate);
            setAssignmentAvailableFrom(assignment.availableFrom);
            setAssignmentAvailableUntil(assignment.availableUntil);
        }
    }, []);

    const createAssignmentForCourse = async () => {
        if (!cid) return;
        const newAssignment = {
            _id: "new",
            title: assignmentTitle,
            course: cid,
            availableFrom: assignmentAvailableFrom,
            availableUntil: assignmentAvailableUntil,
            dueDate: assignmentDueDate,
            points: assignmentPoints,
            description: assignmentDescription,
        };
        const created = await coursesClient.createAssignmentForCourse(cid, newAssignment);
        dispatch(addAssignment(created));
    };

    const saveAssignment = async () => {
        if (!assignment) return;
        const updatedAssignment = {
            ...assignment,
            title: assignmentTitle,
            description: assignmentDescription,
            points: assignmentPoints,
            dueDate: assignmentDueDate,
            availableFrom: assignmentAvailableFrom,
            availableUntil: assignmentAvailableUntil,
        };
        await assignmentsClient.updateAssignment(updatedAssignment);
        dispatch(updateAssignment(updatedAssignment));
    };

    return (
        <div id="wd-assignments-editor" className="container mt-4">
            <h4 className="mb-4">Assignment Name</h4>
            <input
                id="wd-name"
                value={assignmentTitle}
                onChange={(e) => setAssignmentTitle(e.target.value)}
                className="form-control mb-3"
            />

            <div className="mb-4">
        <textarea
            id="wd-description"
            className="form-control"
            rows={5}
            value={assignmentDescription}
            onChange={(e) => setAssignmentDescription(e.target.value)}
        />
            </div>

            <input
                id="wd-points"
                type="number"
                value={assignmentPoints}
                onChange={(e) => setAssignmentPoints(Number(e.target.value))}
                className="form-control"
            />

            <div className="row mt-4">
                <div className="col-md-4 mb-3">
                    <h6 className="font-weight-bold">Due</h6>
                    <input
                        type="date"
                        id="wd-due-date"
                        className="form-control"
                        value={assignmentDueDate}
                        onChange={(e) => setAssignmentDueDate(e.target.value)}
                    />
                </div>
                <div className="col-md-4 mb-3">
                    <h6 className="font-weight-bold">Available from</h6>
                    <input
                        type="date"
                        id="wd-available-from"
                        className="form-control"
                        value={assignmentAvailableFrom}
                        onChange={(e) => setAssignmentAvailableFrom(e.target.value)}
                    />
                </div>
                <div className="col-md-4 mb-3">
                    <h6 className="font-weight-bold">Until</h6>
                    <input
                        type="date"
                        id="wd-available-until"
                        className="form-control"
                        value={assignmentAvailableUntil}
                        onChange={(e) => setAssignmentAvailableUntil(e.target.value)}
                    />
                </div>
            </div>

            <div className="d-flex justify-content-end mt-3">
                <button
                    id="wd-cancel"
                    className="btn btn-secondary me-2"
                    onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments`)}
                >
                    Cancel
                </button>
                <button
                    id="wd-save"
                    className="btn btn-danger"
                    onClick={async () => {
                        if (aid !== "new") {
                            await saveAssignment();
                        } else {
                            await createAssignmentForCourse();
                        }
                        navigate(`/Kambaz/Courses/${cid}/Assignments`);
                    }}
                >
                    Save
                </button>
            </div>
        </div>
    );
}
