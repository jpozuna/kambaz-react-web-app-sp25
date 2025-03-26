import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";
import { RootState } from "../../store";

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

export default function AssignmentEditor() {
    const { aid, cid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const assignments: Assignment[] = useSelector(
        (state: RootState) => state.assignmentsReducer.assignments
    );

    const assignmentsArray: Assignment[] = assignments.filter(a => a.course === cid);

    const defaultAssignment: Assignment = {
        _id: "",
        title: "",
        description: "",
        points: 100,
        dueDate: "2024-05-13",
        notAvailableUntil: "2024-05-06",
        course: cid || "",
        modules: "Multiple Modules",
    };

    // ✅ Find the existing assignment or use the default
    const assignment: Assignment = assignmentsArray.find(a => a._id === aid) ?? defaultAssignment;

    // ✅ Initialize state correctly
    const [title, setTitle] = useState<string>(assignment.title);
    const [description, setDescription] = useState<string>(assignment.description);
    const [points, setPoints] = useState<number>(assignment.points);
    const [dueDate, setDueDate] = useState<string>(assignment.dueDate);
    const [availableFrom, setAvailableFrom] = useState<string>(assignment.notAvailableUntil);
    const [modules, setModules] = useState<string>(assignment.modules);

    useEffect(() => {
        if (aid !== "new" && assignment) {
            setTitle(assignment.title);
            setDescription(assignment.description);
            setPoints(assignment.points);
            setDueDate(assignment.dueDate);
            setAvailableFrom(assignment.notAvailableUntil);
            setModules(assignment.modules);
        }
    }, [aid, assignment]);

    // ✅ Ensure `handleSave` properly sets the assignment values
    const handleSave = () => {
        const newAssignment: Assignment = {
            _id: aid === "new" ? title.replace(/\s+/g, "-").toLowerCase() : assignment?._id || "",
            title,
            description,
            dueDate,
            points,
            course: cid || "",
            notAvailableUntil: availableFrom,
            modules,
        };

        if (aid === "new") {
            dispatch(addAssignment(newAssignment));
        } else {
            dispatch(updateAssignment(newAssignment));
        }

        navigate(`/Kanbas/Courses/${cid}/Assignments`);
    };

    const handleCancel = () => {
        navigate(`/Kanbas/Courses/${cid}/Assignments`);
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
                            value={modules}
                            onChange={(e) => setModules(e.target.value)}
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
