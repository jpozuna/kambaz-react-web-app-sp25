import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Signin() {
    const [credentials, setCredentials] = useState<any>({});
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signin = async () => {
        try {
            const user = await client.signin(credentials);
            if (!user) {
                setError("Invalid username or password");
                return;
            }
            dispatch(setCurrentUser(user));
            navigate("/Kambaz/Dashboard");
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to sign in");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Sign In</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
                <label htmlFor="username" className="form-label">
                    Username
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={credentials.username || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setCredentials({ ...credentials, username: e.target.value })
                    }
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">
                    Password
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={credentials.password || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setCredentials({ ...credentials, password: e.target.value })
                    }
                />
            </div>
            <button className="btn btn-primary" onClick={signin}>
                Sign In
            </button>
            <Link id="wd-signup-link" to="/Kambaz/Account/Signup"> Sign up </Link>
        </div>
    );
}
