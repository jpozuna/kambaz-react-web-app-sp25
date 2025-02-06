import {ListGroup} from "react-bootstrap";
import {BsGripVertical} from "react-icons/bs";
import {Link} from "react-router-dom";
import ModulesControls from "../Modules/ModuleControls.tsx";
import AssignmentButtons from "./AssignmentButtons.tsx";
import {CaretDownFill, JournalText, Search} from "react-bootstrap-icons";
import LessonControlButtons from "../Modules/LessonControlButtons.tsx";

export default function Assignments() {
    return (
        <div id="wd-assignments"><Search/>
            <input id="wd-search-assignment" placeholder="Search"/>
            <button id="wd-add-assignment-group" className="btn btn-lg">
                +Group
            </button>
            <button id="wd-add-assignment" className="btn btn-primary btn-lg">
                +Assignment
            </button>


            <ModulesControls/><br/><br/><br/>
            <ListGroup className="rounded-0" id="wd-modules">
                <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3"/> <CaretDownFill/> ASSIGNMENTS
                        <AssignmentButtons/>
                        <button id="wd-assignment-total" className="wd-assignment-total-btn">
                            40% of Total
                        </button>
                    </div>

                    <ListGroup className="rounded-0" id="wd-assignment-list">
                        <ListGroup.Item className="wd-assignment-list-item p-3">
                            <div className="d-flex justify-content-between">
                                <Link to="/Kambaz/Courses/1234/Assignments/123" className="wd-assignment-link d-flex align-items-center" style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
                                    <BsGripVertical className="me-2 fs-3 dimgray-icon"/>
                                    <JournalText className="me-2 green-icon"/>
                                    A1
                                </Link>
                                <LessonControlButtons/>
                            </div>
                            <div>
                                <span className="red-text">Multiple Modules</span> | <strong>Not Available until</strong> May 6 at 12:00 am
                            </div>
                            <div>
                                <strong>Due</strong> May 13 at 11:59 pm | 100 pts
                            </div>
                        </ListGroup.Item>

                        <ListGroup.Item className="wd-assignment-list-item p-3">
                            <div className="d-flex justify-content-between">
                                <Link to="/Kambaz/Courses/1234/Assignments/234" className="wd-assignment-link d-flex align-items-center" style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
                                    <BsGripVertical className="me-2 fs-3 dimgray-icon"/>
                                    <JournalText className="me-2 green-icon"/>
                                    A2
                                </Link>
                                <LessonControlButtons/>
                            </div>
                            <div>
                                <span className="red-text">Multiple Modules</span> | <strong>Not Available until</strong> May 13 at 12:00 am
                            </div>
                            <div>
                                <strong>Due</strong> May 20 at 11:59 pm | 100 pts
                            </div>
                        </ListGroup.Item>
                    </ListGroup>

                            <ListGroup.Item className="wd-assignment-list-item p-3">
                                <Link to="/Kambaz/Courses/1234/Assignments/345" className="wd-assignment-link d-block" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                            <BsGripVertical className="me-2 fs-3 dimgray-icon"/>
                                            <JournalText className="me-2 green-icon"/>
                                            A3
                                        </div>
                                        <LessonControlButtons/>
                                    </div>
                                    <div>
                                        <span className="red-text">Multiple Modules</span> | <strong>Not Available until</strong> May 20 at 12:00 am
                                    </div>
                                    <div>
                                        <strong>Due</strong> May 27 at 11:59 pm | 100 pts
                                    </div>
                                </Link>
                            </ListGroup.Item>

                        </ListGroup.Item>
                    </ListGroup>
        </div>
    );
}
