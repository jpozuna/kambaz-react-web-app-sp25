import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import * as courseClient from "../client";

export default function PeopleDetails() {
    const { courseId } = useParams();
    const [users, setUsers] = useState<any[]>([]);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        if (!courseId) return;
        const fetchedUsers = await courseClient.findUsersForCourse(courseId);
        setUsers(fetchedUsers);
    };

    useEffect(() => {
        fetchUsers();
    }, [courseId]);

    if (!users.length) return null;

    return (
        <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
            <button
                onClick={() => navigate(-1)}
                className="btn position-fixed end-0 top-0 wd-close-details"
            >
                <IoCloseSharp className="fs-1" />
            </button>
            <div className="text-center mt-2">
                <h3>Enrolled Users</h3>
            </div>
            <hr />
            {users.map((user) => (
                <div key={user._id} className="mb-3">
                    <div className="text-center">
                        <FaUserCircle className="text-secondary me-2 fs-1" />
                    </div>
                    <div className="text-danger fs-5 wd-name text-center">
                        {user.firstName} {user.lastName}
                    </div>
                    <div className="text-center">
                        <b>Role:</b> {user.role} <br />
                        <b>Login ID:</b> {user.loginId} <br />
                        <b>Section:</b> {user.section} <br />
                        <b>Total Activity:</b> {user.totalActivity}
                    </div>
                    <hr />
                </div>
            ))}
        </div>
    );
}



