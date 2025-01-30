export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name">Assignment Name</label>
            <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
            <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
            <br />
            <table>
                <tbody>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-points">Points</label>
                    </td>
                    <td>
                        <input id="wd-points" value={100}/>
                    </td>
                </tr>
                </tbody>

                <tbody>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-due-date">Assignment Group</label>
                    </td>
                    <td>
                        <select id="wd-select-one-group">
                            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                            <option value=""></option>
                        </select>
                    </td>
                </tr>
                </tbody>

                <tbody>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-due-date">Display Grade As</label>
                    </td>
                    <td>
                        <select id="wd-select-one-group">
                            <option value="PERCENTAGE">PERCENTAGE</option>
                            <option value=""></option>
                        </select>
                    </td>
                </tr>
                </tbody>

                <tbody>
                <tr>
                    <td align="left" valign="top">
                        <label>Online Entry Options:</label><br/>
                        <input type="checkbox"/>
                        <label>Text Entry</label><br/>
                        <input type="checkbox"/>
                        <label>Website URL</label><br/>
                        <input type="checkbox"/>
                        <label>Media Recordings</label><br/>
                        <input type="checkbox"/>
                        <label>Student Annotation</label><br/>
                        <input type="checkbox"/>
                        <label>File Uploads</label><br/>
                    </td>
                </tr>
                </tbody>
                <tbody>
                <tr>
                    <td align="left" valign="top">
                        <label>Assign To</label>
                    </td>
                    <td>
                        <input id="wd-everyone" value={"Everyone"}/>
                    </td>
                </tr>
                </tbody>

                <tbody>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-due-date">Due Date</label>
                    </td>
                    <td>
                        <input id="wd-due-date" type="date"/>
                    </td>
                </tr>
                </tbody>

                <tbody>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-due-date">Available From </label>
                    </td>
                    <td>
                        <input id="wd-date" type="date"/>
                    </td>
                </tr>
                </tbody>
                <tbody>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-date">Until</label>
                    </td>
                    <td>
                        <input id="wd-date" type="date"/>
                    </td>
                </tr>
                </tbody>

            </table>
            <br/>
            <button type="submit">Submit Assignment</button>
        </div>
    );
}