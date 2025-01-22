import { Navigate, Route, Routes } from "react-router-dom";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";

export default function Kambaz() {
    return (
        <div id="wd-kambaz">
            <table>
                <tr>
                    <td valign="top">
                        <KambazNavigation />
                    </td>
                    <td valign="top">
                        <Routes>
                            <Route path="/" element={<Navigate to="Account" />} />
                            <Route path="Account/*" element={<Account />} />
                            <Route path="Dashboard" element={<Dashboard />} />
                            <Route path="Courses/:cid/*" element={<Courses />} />
                            <Route path="Inbox" element={<h3>Inbox</h3>} />
                            <Route path="Help" element={<h3>Help</h3>} />
                        </Routes>
                    </td>
                </tr>
            </table>
        </div>
    );
}