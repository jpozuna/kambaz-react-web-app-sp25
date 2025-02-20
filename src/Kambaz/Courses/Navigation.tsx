import { Link } from "react-router-dom";

export default function CourseNavigation( {
    links = [],
        cid = "" as string,
        pathname = "" as string
}) {
return (
        <nav className="d-flex flex-column">
            {links.map((link, index) => {
                const isActive = pathname.includes(`/${link}`);

                return (
                    <Link
                        key={index}
                        to={`/Kambaz/Courses/${cid}/${link}`}
                        className={`nav-link text-danger border-0 d-flex align-items-center position-relative 
                            ${isActive ? "active-link" : ""}`}
                    >
                        {isActive && <span className="active-indicator"></span>}
                        <span className={isActive ? "fw-bold" : ""}>{link}</span>
                    </Link>
                );
            })}
        </nav>
    );
}


