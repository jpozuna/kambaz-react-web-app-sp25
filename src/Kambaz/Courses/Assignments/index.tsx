export default function Assignments() {
    return (
        <div id="wd-assignments">
            <input id="wd-search-assignment" placeholder="Search for Assignments" />
            <button id="wd-add-assignment-group">+ Group</button>
            <button id="wd-add-assignment">+ Assignment</button>
            <h3 id="wd-assignments-title">
                ASSIGNMENTS 40% of Total <button>+</button>
            </h3>
            <ul id="wd-assignment-list">
                <li className="wd-assignment-list-item">
                    <a
                        className="wd-assignment-link"
                        href="#/Kambaz/Courses/1234/Assignments/123"
                    >
                        A1 - ENV + HTML
                    </a>
                </li>
                <li className="wd-assignment-list-item">
                    <a
                        className="wd-assignment-link"
                        href="#/Kambaz/Courses/1234/Assignments/234"
                    >
                        A2 - CSS
                    </a>
                </li>
                <li className="wd-assignment-list-item">
                    <a
                        className="wd-assignment-link"
                        href="#/Kambaz/Courses/1234/Assignments/345"
                    >
                        A3 - JavaScript
                    </a>
                </li>
                <li className="wd-assignment-list-item">
                    <a
                        className="wd-assignment-link"
                        href="#/Kambaz/Courses/1234/Assignments/456"
                    >
                        A4 - React Intro
                    </a>
                </li>
            </ul>
        </div>
    );
}

