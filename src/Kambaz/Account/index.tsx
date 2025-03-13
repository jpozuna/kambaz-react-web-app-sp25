import { Navigate, Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import Signin from "./Signin";
import Signup from "./Signup";
import AccountNavigation from "./Navigation";
import { useSelector } from "react-redux";

export default function Account() {
    const { currentUser } = useSelector(
        (state: any) => state.accountReducer);
    return (
        <div>
            <h2>Account</h2>
            <table width="100%">
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
                        </Routes>
                    </td>
                </tr>
            </table>
        </div>
    );
}