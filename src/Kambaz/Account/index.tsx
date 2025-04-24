import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Signin from "./Signin";
import Signup from "./Signup";
import Profile from "./Profile";
import Users from "./Users";
import PeopleDetails from "../Courses/People/Details";
import AccountNavigation from "./Navigation";

export default function Account() {
    const { currentUser } = useSelector(
        (state: any) => state.accountReducer);
    return (
        <div className="container">
            <div className="row">
                <div className="col-3">
                    <AccountNavigation />
                </div>
                <div className="col-9">
                    <Routes>
                        <Route path="/" element={<Navigate to={
                            currentUser ? "/Kambaz/Account/Profile"
                                : "/Kambaz/Account/Signin" }/>}/>
                        <Route path="/Signin" element={<Signin />} />
                        <Route path="/Profile" element={<Profile />} />
                        <Route path="/Signup" element={<Signup />} />
                        <Route path="/Users" element={<Users />} />
                        <Route path="/Users/:uid" element={<PeopleDetails />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}