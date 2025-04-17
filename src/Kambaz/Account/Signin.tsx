import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import * as client from "./client";

export default function Signin() {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user = await client.signin(credentials);
            if (!user) return;
            dispatch(setCurrentUser(user));
            navigate("/Kambaz/Dashboard");
        } catch (err) {
            console.error("Signin failed", err);
        }
    };

    return (
        <div className="container mt-4" style={{ maxWidth: 400 }}>
            <h2 className="mb-4">Sign In</h2>
            <form onSubmit={signin}>
                <div className="form-group mb-3">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        className="form-control"
                        value={credentials.username}
                        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        className="form-control"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Sign In
                </button>
            </form>
            <p className="mt-3 text-center">
                Don't have an account? <Link to="/account/signup">Sign up</Link>
            </p>
        </div>
    );
}
