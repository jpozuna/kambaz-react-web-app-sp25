import { Link } from "react-router-dom";
export default function Profile() {
    return (
        <div id="wd-profile-screen">
            <h3>Profile</h3>
            <input id="wd-username" value="alice" placeholder="username" />
            <br />
            <input
                id="wd-password"
                value="123"
                placeholder="password"
                type="password"
            />
            <br />
            <input id="wd-firstname" value="Alice" placeholder="First Name" />
            <br />
            <input id="wd-lastname" value="Wonderland" placeholder="Last Name" />
            <br />
            <input id="wd-dob" value="2000-01-01" type="date" />
            <br />
            <input id="wd-email" value="alice@wonderland" type="email" />
            <br />
            <select id="wd-role">
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
            </select>
            <br />
            <textarea>
        Alice is a fictional character and protagonist of Lewis Carroll's
        children's novel Alice's Adventures in Wonderland (1865) and its sequel,
        Through the Looking-Glass (1871). A child in the mid-Victorian era,
        Alice unintentionally goes on an underground adventure after
        accidentally falling down a rabbit hole into Wonderland; in the sequel,
        she steps through a mirror into an alternative world.
      </textarea>
            <br />
            <Link to="/Kambaz/Account/Signin">Sign out</Link>
        </div>
    );
}