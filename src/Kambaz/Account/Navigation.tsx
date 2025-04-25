import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
    const { currentUser } = useSelector(
        (state: any) => state.accountReducer);
    const links = currentUser ? ["Profile"]
        : ["Signin", "Signup"];
    const { pathname } = useLocation();

    const isActive = (link: string) => {
        return pathname.endsWith(link);
    };

    return (
        <div id="wd-account-navigation" className="list-group">
            {links.map((link) => (
                <Link 
                    key={link} 
                    to={`/Kambaz/Account/${link}`}
                    className={`list-group-item ${isActive(link) ? "active" : ""}`}
                >
                    {link}
                </Link>
            ))}
            {currentUser && currentUser.role === "ADMIN" && (
                <Link 
                    to="/Kambaz/Account/Users" 
                    className={`list-group-item ${isActive("Users") ? "active" : ""}`}
                >
                    Users
                </Link>
            )}
        </div>
    );
}
