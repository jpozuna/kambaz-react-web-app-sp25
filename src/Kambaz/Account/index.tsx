import { Navigate, Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import Signin from "./Signin";
import Signup from "./Signup";
import AccountNavigation from "./Navigation";
import { useSelector } from "react-redux";
import Users from "./Users.tsx";

export default function Account() {
    const { currentUser } = useSelector(
        (state: any) => state.accountReducer);
    return (
        <div>
            <h2>Account</h2>
            <table width="100%">
                <tbody>
                    <tr>
                        <td valign="top">
                            <AccountNavigation />
                        </td>
                        <td>
                            <Routes>
                                <Route path="/" element={<Navigate to={
                                    currentUser ? "/Kambaz/Account/Profile"
                                        : "/Kambaz/Account/Signin" }/>}/>
                                <Route path="Signin" element={<Signin />} />
                                <Route path="Signup" element={<Signup />} />
                                <Route path="Profile" element={<Profile />} />
                                <Route path="/Users" element={<Users />} />
                                <Route path="/Users/:uid" element={<Users />} />
                            </Routes>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}