import { useEffect, useState } from "react";
import { FaUserCircle, FaCheck } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import * as client from "../../Account/client";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
  loginId: string;
  section: string;
  totalActivity: string;
  email: string;
}

interface PeopleDetailsProps {
  onUserDeleted?: () => void;
}

export default function PeopleDetails({ onUserDeleted }: PeopleDetailsProps) {
  const { uid } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid) as User;
    setUser(user);
    setName(`${user.firstName} ${user.lastName}`);
    setEmail(user.email);
    setRole(user.role);
  };

  const deleteUser = async () => {
    if (!uid) return;
    try {
      await client.deleteUser(uid);
      if (onUserDeleted) {
        onUserDeleted();
      }
      navigate(-1);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const saveUser = async () => {
    if (!uid || !user) return;
    try {
      const [firstName, ...lastNameParts] = name.split(" ");
      const lastName = lastNameParts.join(" ");
      const updatedUser = {
        ...user,
        firstName,
        lastName,
        email,
        role,
      };
      await client.updateUser(updatedUser);
      setUser(updatedUser);
      setEditing(false);
      navigate(-1);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);

  if (!uid || !user) return null;

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button 
        onClick={() => navigate(-1)} 
        className="btn position-fixed end-0 top-0 wd-close-details"
      >
        <IoCloseSharp className="fs-1" />
      </button>
      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div>
      <hr />
      <div className="text-danger fs-4">
        {!editing && (
          <FaPencil 
            onClick={() => setEditing(true)}
            className="float-end fs-5 mt-2 wd-edit" 
          />
        )}
        {editing && (
          <FaCheck 
            onClick={saveUser}
            className="float-end fs-5 mt-2 me-2 wd-save" 
          />
        )}
        {!editing && (
          <div 
            className="wd-name"
            onClick={() => setEditing(true)}
          >
            {user.firstName} {user.lastName}
          </div>
        )}
        {editing && (
          <input
            type="text"
            className="form-control w-50 wd-edit-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveUser();
              }
            }}
          />
        )}
      </div>
      <div className="mt-3">
        <b>Email:</b>
        {editing ? (
          <input
            type="email"
            className="form-control w-75"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        ) : (
          <span className="wd-email">{user.email}</span>
        )}
      </div>
      <div className="mt-3">
        <b>Role:</b>
        {editing ? (
          <select
            className="form-select w-75"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="STUDENT">Student</option>
            <option value="TA">Teaching Assistant</option>
            <option value="FACULTY">Faculty</option>
            <option value="ADMIN">Administrator</option>
          </select>
        ) : (
          <span className="wd-role">{user.role}</span>
        )}
      </div>
      <b>Login ID:</b> <span className="wd-login-id">{user.loginId}</span> <br />
      <b>Section:</b> <span className="wd-section">{user.section}</span> <br />
      <b>Total Activity:</b> <span className="wd-total-activity">{user.totalActivity}</span>
      <hr />
      <div className="d-flex justify-content-end">
        {editing ? (
          <>
            <button onClick={() => setEditing(false)} className="btn btn-secondary me-2">
              Cancel
            </button>
            <button onClick={saveUser} className="btn btn-success">
              Save
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setEditing(true)} className="btn btn-warning me-2">
              Edit
            </button>
            <button onClick={deleteUser} className="btn btn-danger">
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}



