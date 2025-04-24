import React, { useEffect, useState } from "react";
import { findAllUsers } from "../Account/client";
import PeopleTable from "../../Courses/People/Table";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await findAllUsers() as User[];
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users");
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container">
      <h2>Users</h2>
      <PeopleTable users={users} />
    </div>
  );
} 