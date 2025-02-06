import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
export default function PeopleTable() {
    return (
        <div id="wd-people-table">
            <Table striped>
                <thead>
                <tr><th>Name</th><th>Login ID</th><th>Section</th><th>Role</th><th>Last Activity</th><th>Total Activity</th></tr>
                </thead>
                <tbody>
                <tr>
                    <td className="wd-full-name text-nowrap">
                        <FaUserCircle className="me-2 fs-1 text-secondary"/>
                        <span className="wd-first-name">Tony</span>{" "}
                        <span className="wd-last-name">Stark</span></td>
                    <td className="wd-login-id">001234561S</td>
                    <td className="wd-section">S101</td>
                    <td className="wd-role">STUDENT</td>
                    <td className="wd-last-activity">2020-10-01</td>
                    <td className="wd-total-activity">11:21:32</td>
                </tr>

                <tr>
                    <td className="wd-full-name text-nowrap">
                        <FaUserCircle className="me-2 fs-1 text-secondary"/>
                        <span className="wd-first-name">Bruce</span>{" "}
                        <span className="wd-last-name">Banner</span></td>
                    <td className="wd-login-id">001234561S</td>
                    <td className="wd-section">S101</td>
                    <td className="wd-role">TA</td>
                    <td className="wd-last-activity">2020-10-08</td>
                    <td className="wd-total-activity">10:24:32</td>
                </tr>

                <tr>
                    <td className="wd-full-name text-nowrap">
                        <FaUserCircle className="me-2 fs-1 text-secondary"/>
                        <span className="wd-first-name">Steve</span>{" "}
                        <span className="wd-last-name">Rodgers</span></td>
                    <td className="wd-login-id">001234561S</td>
                    <td className="wd-section">S101</td>
                    <td className="wd-role">STUDENT</td>
                    <td className="wd-last-activity">2020-09-01</td>
                    <td className="wd-total-activity">12:21:32</td>
                </tr>

                <tr>
                    <td className="wd-full-name text-nowrap">
                        <FaUserCircle className="me-2 fs-1 text-secondary"/>
                        <span className="wd-first-name">Thor</span>{" "}
                        <span className="wd-last-name">Odinson</span></td>
                    <td className="wd-login-id">001234561S</td>
                    <td className="wd-section">S101</td>
                    <td className="wd-role">STUDENT</td>
                    <td className="wd-last-activity">2020-11-01</td>
                    <td className="wd-total-activity">10:30:32</td>
                </tr>
                </tbody>
            </Table>
        </div>);
}

