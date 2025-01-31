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
                    <br/> Due May 13 at 11:59 pm
                    <br/> 100 pts
                </li>
                <li className="wd-assignment-list-item">
                <a
                        className="wd-assignment-link"
                        href="#/Kambaz/Courses/1234/Assignments/234"
                    >
                        A2 - CSS + BOOTSTRAP
                    </a>
                    <br/> Due May 20 at 11:59 pm
                    <br/> 100 pts
                </li>
                <li className="wd-assignment-list-item">
                    <a
                        className="wd-assignment-link"
                        href="#/Kambaz/Courses/1234/Assignments/345"
                    >
                        A3 - JavaScript + REACT
                    </a>
                    <br/> Due May 27 at 11:59 pm
                    <br/> 100 pts
                </li>
            </ul>
        </div>
    );
}
