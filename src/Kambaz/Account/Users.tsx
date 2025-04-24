import { useState, useEffect } from "react";
import { useParams } from "react-router";
import PeopleTable from "../../Courses/People/Table";
import * as client from "./client";
import { FaPlus } from "react-icons/fa";

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    username: string;
    password: string;
    section: string;
}

export default function Users() {
    const { uid } = useParams();
    const [users, setUsers] = useState<User[]>([]);
    const [role, setRole] = useState("");
    const [name, setName] = useState("");

    const createUser = async () => {
        try {
            const user = await client.createUser({
                firstName: "New",
                lastName: `User${users.length + 1}`,
                username: `newuser${Date.now()}`,
                password: "password123",
                email: `email${users.length + 1}@neu.edu`,
                section: "S101",
                role: "STUDENT",
            }) as User;
            setUsers([...users, user]);
        } catch (error) {
            console.error("Failed to create user:", error);
        }
    };

    const filterUsersByRole = async (role: string) => {
        setRole(role);
        if (role) {
            const users = await client.findUsersByRole(role) as User[];
            setUsers(users);
        } else {
            fetchUsers();
        }
    };

    const filterUsersByName = async (name: string) => {
        setName(name);
        if (name) {
            const users = await client.findUsersByPartialName(name) as User[];
            setUsers(users);
        } else {
            fetchUsers();
        }
    };

    const fetchUsers = async () => {
        const users = await client.findAllUsers() as User[];
        setUsers(users);
    };

    useEffect(() => {
        fetchUsers();
    }, [uid]);

    return (
        <div>
            <button onClick={createUser} className="float-end btn btn-danger wd-add-people">
                <FaPlus className="me-2" />
                Users
            </button>
            <h3>Users</h3>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control w-25 float-start me-2"
                    placeholder="Search by name"
                    value={name}
                    onChange={(e) => filterUsersByName(e.target.value)}
                />
                <select
                    value={role}
                    onChange={(e) => filterUsersByRole(e.target.value)}
                    className="form-select w-25 float-start"
                >
                    <option value="">All Roles</option>
                    <option value="STUDENT">Students</option>
                    <option value="TA">Assistants</option>
                    <option value="FACULTY">Faculty</option>
                    <option value="ADMIN">Administrators</option>
                </select>
            </div>
            <div className="clearfix"></div>
            <PeopleTable users={users} />
        </div>
    );
}
