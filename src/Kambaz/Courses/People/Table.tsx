import { FaUserCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as courseClient from "../client";
import { useSelector } from "react-redux";

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    loginId: string;
    section: string;
    role: string;
    lastActivity: string;
    totalActivity: string;
}

interface PeopleTableProps {
    course: any;
}

export default function PeopleTable({ course }: PeopleTableProps) {
    const { cid } = useParams();
    const [users, setUsers] = useState<User[]>([]);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

    const fetchUsersForCourse = async () => {
        if (!cid) return;
        const courseUsers = await courseClient.findUsersForCourse(cid);
        setUsers(courseUsers as User[]);
    };

    useEffect(() => {
        fetchUsersForCourse();
    }, [cid]);

    if (!isFaculty) {
        return (
            <div className="alert alert-warning">
                Access Denied: Only faculty and administrators can view the people page.
            </div>
        );
    }

    return (
        <div id="wd-people-table">
            <table className="table table-striped">
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
                {users.map((user) => (
                    <tr key={user._id}>
                        <td className="wd-full-name text-nowrap">
                            <Link to={`/Kambaz/Account/Users/${user._id}`} className="text-decoration-none">
                                <FaUserCircle className="me-2 fs-1 text-secondary" />
                                <span className="wd-first-name">{user.firstName}</span>{" "}
                                <span className="wd-last-name">{user.lastName}</span>
                            </Link>
                        </td>
                        <td className="wd-login-id">{user.loginId}</td>
                        <td className="wd-section">{user.section}</td>
                        <td className="wd-role">{user.role}</td>
                        <td className="wd-last-activity">{user.lastActivity}</td>
                        <td className="wd-total-activity">{user.totalActivity}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}


