export default function Lab1() {
    return (
        <div>
            <h2>Lab 1</h2>

            <h3>HTML Examples</h3>
            <div id="wd-h-tag">
                <h4>Heading Tags</h4>
                Text documents are often broken up into several sections and
                subsections. Each section is usually prefaced with a short title or
                heading that attempts to summarize the topic of the section it precedes.
                For instance this paragraph is preceded by the heading Heading Tags. The
                font of the section headings are usually larger and bolder than their
                subsection headings. This document uses headings to introduce topics
                such as HTML Documents, HTML Tags, Heading Tags, etc. HTML heading tags
                can be used to format plain text so that it renders in a browser as
                large headings. There are 6 heading tags for different sizes: h1, h2,
                h3, h4, h5, and h6. Tag h1 is the largest heading and h6 is the smallest
                heading.
            </div>

            <div id="wd-p-tag">
                <h4>Paragraph Tag</h4>
                <p id="wd-p-1">
                    This is a paragraph. We often separate a long set of sentences with
                    vertical spaces to make the text easier to read. Browsers ignore
                    vertical white spaces and render all the text as one single set of
                    sentences. To force the browser to add vertical spacing, wrap the
                    paragraphs you want to separate with the paragraph tag
                </p>

                <p>
                    This is the first paragraph. The paragraph tag is used to format
                    vertical gaps between long pieces of text like this one.
                </p>
                <p>
                    This is the second paragraph. Even though there is a deliberate white
                    gap between the paragraph above and this paragraph, by default
                    browsers render them as one contiguous piece of text as shown here on
                    the right.
                </p>
                <p>
                    This is the third paragraph. Wrap each paragraph with the paragraph
                    tag to tell browsers to render the gaps.
                </p>
            </div>
            <div id="wd-lists">
                <h4>List Tags</h4>
                <h5>Ordered List Tag</h5>
                How to make pancakes:
                <ol>
                    <li>Mix dry ingredients.</li>
                    <li>Add wet ingredients.</li>
                    <li>Stir to combine. </li>
                    <li>Heat a skillet or griddle. </li>
                    <li> Pour batter onto the skillet. </li>
                    <li> Cook until bubbly on top.</li>
                    <li> Flip and cook the other side. </li>
                    <li> Serve and enjoy!</li>
                </ol>
            </div>
            <div>
                <h4>Form elements</h4>
                <label htmlFor="username">Username:</label>
                <input
                    id="username"
                    type="text"
                    placeholder="jdoe"
                    title="Please type your username which should be unique"
                />
                <br />
                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    type="password"
                    placeholder="asdf876as8d7f6asdf"
                    title="Please type your password which doesn't have to be unique"
                />
                <br />
                <button type="button" style="margin-bottom: 10px;">Delete</button>
                <br />
                <button type="button" style="margin-bottom: 10px;">Edit</button>
                <br />
                <button type="submit">Update</button>
                <br />
                <h5 id="wd-buttons">Buttons</h5>
                <button
                    id="wd-all-good"
                    onClick={() => alert("Life is Good!")}
                    type="button"
                >
                    Hello World!
                </button>
                <h5 id="wd-radio-buttons">Radio buttons</h5>
                <label>Favorite movie genre:</label>
                <br />
                <input id="comedy" type="radio" name="radio-genre" />
                <label htmlFor="comedy">Comedy</label>
                <br />
                <label>
                    <input type="radio" name="radio-genre" />
                    Drama
                </label>
                <br />
                <input type="radio" name="radio-genre" />
                Sci-Fi
                <br />
                <input type="radio" name="radio-genre" />
                Horror
                <br />
                <label>Favorite color</label>
                <br />
                <input type="radio" name="color" />
                Red
                <br />
                <input type="radio" name="color" />
                Yellow
                <br />
                <input type="radio" name="color" />
                Blue
                <br />
                <input type="radio" name="color" />
                Green
                <br />
            </div>
        </div>
    );
}