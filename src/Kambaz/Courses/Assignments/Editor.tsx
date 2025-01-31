export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name"><b>Assignment Name</b></label>
            <br/><br/>
            <input id="wd-name" value="A1 - ENV + HTML"/><br/><br/>
            <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of your Web application running on Netlify.
      </textarea>
            <br/> <br/>
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

                <br/>
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

                <br/>
                <tbody>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-due-date">Display Grade As</label>
                    </td>
                    <td>
                        <select id="wd-select-one-group">
                            <option value="Percentage">Percentage</option>
                            <option value=""></option>
                        </select>
                    </td>
                </tr>
                </tbody>

                <br/>
                <tbody>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-submission-type">Submission Type</label>
                    </td>
                    <td>
                        <select id="wd-select-one-group">
                            <option value="Online">Online</option>
                            <option value=""></option>
                        </select>
                    </td>
                </tr>
                </tbody>

                <br/>
                <tbody>
                <tr>
                    <td align="left" valign="top">
                        <label>Online Entry Options:</label><br/>

                        <input type="checkbox" name="check-online-entry-option" id="wd-chkbox-text-entry"/>
                        <label htmlFor= "wd-chkbox-text-entry">Text Entry</label><br/>

                        <input type="checkbox" name="check-website-url" id="wd-chkbox-website-url"/>
                        <label htmlFor= "wd-chkbox-website-url">Website URL</label><br/>

                        <input type="checkbox" name="check-media-recordings" id="wd-chkbox-media-recordings"/>
                        <label htmlFor="wd-chkbox-media-recordings">Media Recordings</label><br/>

                        <input type="checkbox" name="check-student-annotations" id="wd-chkbox-student-annotations"/>
                        <label htmlFor= "wd-chkbox-student-annotations">Student Annotation</label><br/>

                        <input type="checkbox" name="check-file-uploads" id={"wd-chkbox-file-uploads"}/>
                        <label htmlFor={"wd-chkbox-file-uploads"}>File Uploads</label><br/>
                    </td>
                </tr>
                </tbody>

                <br/>
                <tbody>
                <tr>
                <td align="right" valign="top">
                        <label>Assign To</label>
                    </td>
                    <td>
                        <br/>
                        <input id="wd-everyone" value={"Everyone"}/>
                    </td>
                </tr>
                </tbody>

                <br/>
                <tbody>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-due-date">Due Date</label>
                    </td>
                    <td>
                        <br/>
                        <input type="date"
                               value="2024-05-13"
                               id="wd-text-fields-dob"/><br/>
                    </td>
                </tr>
                </tbody>

                <br/>
                <tbody>
                <tr>
                    <td align="right" valign="top">
                    </td>
                    <td>Available From</td>
                    <td>Until</td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                    </td>
                    <td><input id="wd-date" type="date" value="2024-05-06"/></td>
                    <td><input id="wd-date" type="date" value="2024-05-20"/></td>
                </tr>
                </tbody>
            </table>

            <hr/>
            <table align="right">
                <tr>
                    <td></td>
                    <td><button id="wd-cancel-assignment">Cancel</button>
                    </td>
                    <td><button id="wd-save-assignment">Save</button>
                    </td>
                </tr>
            </table>
        </div>
    );
}