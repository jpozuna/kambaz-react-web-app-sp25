import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { Button, FormControl } from "react-bootstrap";
import * as client from "./client";

export default function Profile() {
    const [profile, setProfile] = useState<any>({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const updateProfile = async () => {
        const updatedProfile = await client.updateUser(profile);
        dispatch(setCurrentUser(updatedProfile));
    };

    const fetchProfile = () => {
        if (!currentUser) return navigate("/Kambaz/Account/Signin");
        setProfile(currentUser);
    };

    const signout = async () => {
        await client.signout();
        dispatch(setCurrentUser(null));
        navigate("/Kambaz/Account/Signin");
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <div id="wd-profile-screen">
            <h3>Profile</h3>
            {profile && (
                <div>
                    <FormControl
                        defaultValue={profile.username}
                        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                        className="mb-2"
                    />
                    <FormControl
                        defaultValue={profile.password}
                        onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                        className="mb-2"
                        type="password"
                    />
                    <FormControl
                        defaultValue={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                        className="mb-2"
                    />
                    <FormControl
                        defaultValue={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                        className="mb-2"
                    />
                    <FormControl
                        defaultValue={profile.dob}
                        onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                        type="date"
                        className="mb-2"
                    />
                    <FormControl
                        defaultValue={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="mb-2"
                    />
                    <select
                        onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                        className="form-control mb-2"
                        id="wd-role"
                        defaultValue={profile.role}
                    >
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="FACULTY">Faculty</option>
                        <option value="STUDENT">Student</option>
                    </select>
                    <Button onClick={updateProfile} className="btn btn-primary w-100 mb-2">
                        Update
                    </Button>
                    <Button onClick={signout} className="btn btn-danger w-100">
                        Sign out
                    </Button>
                </div>
            )}
        </div>
    );
}
