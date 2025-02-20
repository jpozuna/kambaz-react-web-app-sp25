import { useParams, Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { CaretDownFill, JournalText, Search } from "react-bootstrap-icons";
import ModulesControls from "../Modules/ModuleControls.tsx";
import AssignmentButtons from "./AssignmentButtons.tsx";
import LessonControlButtons from "../Modules/LessonControlButtons.tsx";
import * as db from "../../Database";


export default function Assignments() {
    const { cid } = useParams();
    const course = db.assignments.find(course => course.course_id === cid);
    const courseAssignments = course ? course.assignments : [];

    return (
        <div id="wd-assignments">
            <Search />
            <input id="wd-search-assignment" placeholder="Search" />
            <button id="wd-add-assignment-group" className="btn btn-lg">+Group</button>
            <button id="wd-add-assignment" className="btn btn-primary btn-lg">+Assignment</button>

            <ModulesControls />
            <br /><br /><br />

            <ListGroup className="rounded-0" id="wd-modules">
                <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" /> <CaretDownFill /> ASSIGNMENTS
                        <AssignmentButtons />
                        <button id="wd-assignment-total" className="wd-assignment-total-btn">40% of Total</button>
                    </div>

                    <ListGroup className="rounded-0" id="wd-assignment-list">
                        {courseAssignments.length === 0 ? (
                            <p className="text-muted p-3">No assignments found for this course.</p>
                        ) : (
                            courseAssignments.map((assignment) => {
                                const assignmentSlug = assignment.title.replace(/\s+/g, "-");

                                return (
                                    <ListGroup.Item key={assignment.id} className="wd-assignment-list-item p-3">
                                        <div className="d-flex justify-content-between">
                                            <Link
                                                to={`/Kambaz/Courses/${cid}/Assignments/${assignmentSlug}`}
                                                className="wd-assignment-link d-flex align-items-center"
                                                style={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}
                                            >
                                                <BsGripVertical className="me-2 fs-3 dimgray-icon" />
                                                <JournalText className="me-2 green-icon" />
                                                {assignment.title}
                                            </Link>
                                            <LessonControlButtons />
                                        </div>
                                        <div>
                                            <span className="red-text">Multiple Modules</span> |
                                            <strong> Not Available until</strong> {assignment.availableDate}
                                        </div>
                                        <div>
                                            <strong>Due</strong> {assignment.dueDate} | {assignment.points} pts
                                        </div>
                                    </ListGroup.Item>
                                );
                            })
                        )}
                    </ListGroup>
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
}



