export default function CourseStatus() {
    return (
        <div id="wd-course-status">
            <h2>Course Status</h2>
            <button className="btn btn-secondary">Unpublish</button>
            <button className="btn btn-success">Publish</button>
            <hr />
            <div className="wd-course-actions" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <button className="btn btn-light">Import Existing Content</button>
                <button className="btn btn-light">Import From Commons</button>
                <button className="btn btn-light">Choose Home Page</button>
                <button className="btn btn-light">View Course Stream</button>
                <button className="btn btn-light">New Announcement</button>
                <button className="btn btn-light">New Analytics</button>
                <button className="btn btn-light">View Course Notifications</button>
            </div>
        </div>
    );
}
