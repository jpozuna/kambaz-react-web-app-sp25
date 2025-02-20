import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import * as db from "../../Database";

export default function PeopleTable() {
    const { cid } = useParams();
    const { users} = db || [];
    const enrollments = db.enrollment || [];

    const enrolledUsers = users.filter((usr) =>
        enrollments.some((enrollment) => enrollment.user === usr._id && enrollment.course === cid)
    );

    return (
        <div id="wd-people-table">
            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Login ID</th>
                    <th>Section</th>
                    <th>Role</th>
                    <th>Last Activity</th>
                    <th>Total Activity</th>
                </tr>
                </thead>
                <tbody>
                {enrolledUsers.length > 0 ? (
                    enrolledUsers.map((user) => (
                        <tr key={user._id}>
                            <td className="wd-full-name text-nowrap">
                                <FaUserCircle className="me-2 fs-1 text-secondary"/>
                                <span className="wd-first-name">{user.firstName}</span>
                                <span className="wd-last-name"> {user.lastName}</span>
                            </td>
                            <td className="wd-login-id">{user.loginId}</td>
                            <td className="wd-section">{user.section}</td>
                            <td className="wd-role">{user.role}</td>
                            <td className="wd-last-activity">{user.lastActivity}</td>
                            <td className="wd-total-activity">{parseFloat(user.totalActivity) || 0}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                    <td colSpan="6" className="text-center text-muted">
                            No users enrolled in this course.
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>
        </div>
    );
}


