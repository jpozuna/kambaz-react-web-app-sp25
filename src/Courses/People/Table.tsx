import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import * as client from "../../Kambaz/Account/client";
import PeopleDetails from "../../Kambaz/Courses/People/Details";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
}

export default function PeopleTable({ users = [] }: { users?: User[] }) {
  const [currentUsers, setCurrentUsers] = useState<User[]>(users);

  useEffect(() => {
    setCurrentUsers(users);
  }, [users]);

  const handleUserDeleted = () => {
    // Refresh the users list after deletion
    const fetchUsers = async () => {
      const updatedUsers = await client.findAllUsers() as User[];
      setCurrentUsers(updatedUsers);
    };
    fetchUsers();
  };

  return (
    <div id="wd-people-table">
      <PeopleDetails onUserDeleted={handleUserDeleted} />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <Link to={`/Kambaz/Account/Users/${user._id}`} className="text-decoration-none">
                  <FaUserCircle className="me-2 fs-1 text-secondary" />
                  <span className="wd-first-name">{user.firstName}</span>{" "}
                  <span className="wd-last-name">{user.lastName}</span>
                </Link>
              </td>
              <td>{user.role}</td>
              <td>{user.email}</td>
              <td>
                <button className="btn btn-warning me-2">Edit</button>
                <button className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 