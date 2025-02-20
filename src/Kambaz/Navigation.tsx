import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

export default function KambazNavigation() {
    const { pathname } = useLocation();
    const links = [
        { to: "/Kambaz/Account", label: "Account", icon: <FaRegCircleUser className="fs-1" /> },
        { to: "/Kambaz/Dashboard", label: "Dashboard", icon: <AiOutlineDashboard className="fs-1" /> },
        { to: "/Kambaz/Courses", label: "Courses", icon: <LiaBookSolid className="fs-1" /> },
        { to: "/Kambaz/Calendar", label: "Calendar", icon: <IoCalendarOutline className="fs-1" /> },
        { to: "/Kambaz/Inbox", label: "Inbox", icon: <FaInbox className="fs-1" /> },
        { to: "/Labs", label: "Labs", icon: <LiaCogSolid className="fs-1" /> },
    ];

    return (
        <div id="wd-kambaz-navigation" style={{ width: 120 }}
             className="list-group rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2">

            <a id="wd-neu-link" target="_blank"
               href="https://www.northeastern.edu/"
               className="list-group-item bg-black border-0 text-center">
                <img src="/images/NEU.png" width="100" alt="Northeastern Logo" />
            </a>

            {links.map((link, index) => {
                const isActive = pathname.toLowerCase().includes(link.label.toLowerCase());
                return (
                    <ListGroup.Item
                        key={`${link.to}-${index}`}
                        as={Link}
                        to={link.to}
                        className={`bg-black text-center border-0 ${isActive ? "text-danger bg-white" : "text-white bg-black"}`}
                    >
                        {link.icon}
                        <br />
                        {link.label}
                    </ListGroup.Item>
                );
            })}
        </div>
    );
}
