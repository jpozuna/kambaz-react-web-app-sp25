import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {useLocation} from "react-router";
export default function AccountNavigation() {
    const { currentUser } = useSelector(
        (state: any) => state.accountReducer);
    const links = currentUser ? ["Profile"]
        : ["Signin", "Signup"];
    const { pathname } = useLocation();
    return (
        <div id="wd-account-navigation">
            {links.map((link) => (
                <Link key={link} to={`/Kambaz/Account/${link}`}
                      className={pathname.endsWith(link) ? "active" : ""}>
                    {link}
                </Link>
            ))}
            {currentUser && currentUser.role === "ADMIN" && (
                <Link to={`/Kambaz/Account/Users`} className={`list-group-item ${active("Users")}`}> Users </Link> )}
        </div>
    );
}
