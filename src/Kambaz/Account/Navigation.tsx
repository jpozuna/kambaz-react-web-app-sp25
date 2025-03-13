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
            <Link to={`/Kambaz/Account/Signin`}> Signin </Link> <br />
            <Link to={`/Kambaz/Account/Signup`}> Signup </Link> <br />
            <Link to={`/Kambaz/Account/Profile`}> Profile </Link> <br />
        </div>
    );
}