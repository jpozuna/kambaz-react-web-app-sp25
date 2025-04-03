import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import * as client from "../../Assignments/client";

interface Assignment {
    _id: string;
    title: string;
    description: string;
    points: number;
    dueDate: string;
    availableDate: string;
    course: string;
    module?: string;
}

export default function AssignmentEditor() {
    const { aid, cid } = useParams();
    const navigate = useNavigate();

    const defaultAssignment: Omit<Assignment, "_id"> = {
        title: "",
        description: "",
        points: 100,
        dueDate: "2024-05-13",
        availableDate: "2024-05-06",
        course: cid || "",
        module: "Multiple Modules",
    };

    const [title, setTitle] = useState<string>(defaultAssignment.title);
    const [description, setDescription] = useState<string>(defaultAssignment.description);
    const [points, setPoints] = useState<number>(defaultAssignment.points);
    const [dueDate, setDueDate] = useState<string>(defaultAssignment.dueDate);
    const [availableFrom, setAvailableFrom] = useState<string>(defaultAssignment.availableDate);
    const [module, setModule] = useState<string>(defaultAssignment.module || "Multiple Modules");

    useEffect(() => {
        const fetchAssignment = async () => {
            if (aid && aid !== "new" && cid) {
                try {
                    const assignments = await client.findAssignmentsForCourse(cid);
                    const assignment = assignments.find((a: Assignment) => a._id === aid);
                    if (assignment) {
                        setTitle(assignment.title);
                        setDescription(assignment.description);
                        setPoints(assignment.points);
                        setDueDate(assignment.dueDate);
                        setAvailableFrom(assignment.availableDate);
                        setModule(assignment.module || "Multiple Modules");
                    }
                } catch (error) {
                    console.error("Failed to fetch assignment:", error);
                }
            }
        };
        fetchAssignment();
    }, [aid, cid]);

    const handleSave = async () => {
        if (!cid) return;
        
        try {
            const newAssignment = {
                title,
                description,
                points,
                dueDate,
                availableDate: availableFrom,
                course: cid,
                module,
            };

            if (aid === "new") {
                await client.createAssignment(newAssignment);
            } else if (aid) {
                await client.updateAssignment(aid, newAssignment);
            }

            navigate(`/Kambaz/Courses/${cid}/Assignments`);
        } catch (error) {
            console.error("Failed to save assignment:", error);
        }
    };

    const handleCancel = () => {
        if (cid) {
            navigate(`/Kambaz/Courses/${cid}/Assignments`);
        }
    };

    return (
        <div id="wd-assignments-editor" className="container mt-4">
            <h4 className="mb-4">Assignment Name</h4>
            <input
                id="wd-name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control mb-3"
            />

            <div className="mb-4">
                <label htmlFor="wd-description" className="form-label">
                    Description
                </label>
                <textarea
                    id="wd-description"
                    className="form-control"
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="wd-points" className="form-label">
                            Points
                        </label>
                        <input
                            id="wd-points"
                            type="number"
                            value={points}
                            onChange={(e) => setPoints(Number(e.target.value))}
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="wd-due-date" className="form-label">
                            Due Date
                        </label>
                        <input
                            id="wd-due-date"
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="form-control"
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="wd-available-from" className="form-label">
                            Available From
                        </label>
                        <input
                            id="wd-available-from"
                            type="date"
                            value={availableFrom}
                            onChange={(e) => setAvailableFrom(e.target.value)}
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="wd-modules" className="form-label">
                            Modules
                        </label>
                        <input
                            id="wd-modules"
                            type="text"
                            value={module}
                            onChange={(e) => setModule(e.target.value)}
                            className="form-control"
                        />
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-end mt-3">
                <button id="wd-cancel" className="btn btn-secondary me-2" onClick={handleCancel}>
                    Cancel
                </button>
                <button id="wd-save" className="btn btn-danger" onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>
    );
}
