export default function Modules() {
    return (
        <div>
            {/* Buttons for Collapse All and View Progress */}
            <div className="wd-buttons">
                <button className="btn btn-secondary">Collapse All</button>
                <button className="btn btn-secondary">View Progress</button>

                <select id="wd-select-one-genre">
                    <option value="Publish All"> Publish All</option>
                    <option value="Courses1234"> Courses1234 </option>
                </select>

                <button className="btn btn-secondary">+Module</button>
            </div>

            {/* Modules List */}
            <ul id="wd-modules">
                <li className="wd-module">
                    <div className="wd-title">Week 1</div>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">LEARNING OBJECTIVES</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Introduction to the course</li>
                                <li className="wd-content-item">Learn what is Web Development</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li className="wd-module">
                    <div className="wd-title">Week 2</div>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">LEARNING OBJECTIVES</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">HTML Basics</li>
                                <li className="wd-content-item">CSS Fundamentals</li>
                                <li className="wd-content-item">Introduction to JavaScript</li>
                            </ul>
                        </li>
                        <li className="wd-lesson">
                            <span className="wd-title">READING</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Chapter 1: Getting Started with Web Development</li>
                                <li className="wd-content-item">Chapter 2: HTML and CSS Basics</li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}
