import { Link } from "react-router-dom";

const DEFAULT_LINKS = [
    "Home",
    "Modules",
    "Assignments",
    "Quizzes",
    "Piazza",
    "People"
];

export default function CourseNavigation({
    links = DEFAULT_LINKS,
    cid,
    pathname
}: {
    links?: string[];
    cid: string | undefined;
    pathname: string;
}) {
    return (
        <nav className="d-flex flex-column" style={{ minWidth: '200px' }}>
            {links.map((link, index) => {
                const isActive = pathname.includes(`/${link}`);

                return (
                    <Link
                        key={index}
                        to={`/Kambaz/Courses/${cid}/${link}`}
                        className={`nav-link text-danger border-0 d-flex align-items-center position-relative py-2 
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


