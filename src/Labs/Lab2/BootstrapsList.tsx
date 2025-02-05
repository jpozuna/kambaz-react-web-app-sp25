import {ListGroup, Table} from "react-bootstrap";

export default function BootstrapsList() {
    return (
        <div id="wd-css-responsive-tables">
            <h2>Responsive tables</h2>
            <Table responsive>
                <thead>
                <tr>
                    <th>Very</th>
                    <th>long</th>
                    <th>set</th>
                    <th>of</th>
                    <th>columns</th>
                    <th>Very</th>
                    <th>long</th>
                    <th>set</th>
                    <th>of</th>
                    <th>columns</th>
                    <th>Very</th>
                    <th>long</th>
                    <th>set</th>
                    <th>of</th>
                    <th>columns</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Very</td>
                    <td>long</td>
                    <td>set</td>
                    <td>of</td>
                    <td>columns</td>
                    <td>Very</td>
                    <td>long</td>
                    <td>set</td>
                    <td>of</td>
                    <td>columns</td>
                    <td>Very</td>
                    <td>long</td>
                    <td>set</td>
                    <td>of</td>
                    <td>columns</td>
                </tr>
                </tbody>
            </Table>

            <div id="wd-css-hyperlink-list">
                <h3>Favorite books</h3>
                <ListGroup>
                    <ListGroup.Item action active
                                    href="https://en.wikipedia.org/wiki/Dune_(novel)">
                        Dune </ListGroup.Item>
                    <ListGroup.Item action
                                    href="https://en.wikipedia.org/wiki/The_Lord_of_the_Rings">
                        Lord of the Rings </ListGroup.Item>
                    <ListGroup.Item action
                                    href="https://en.wikipedia.org/wiki/The_Forever_War">
                        The Forever War </ListGroup.Item>
                    <ListGroup.Item action
                                    href="https://en.wikipedia.org/wiki/2001:_A_Space_Odyssey_(novel)">
                        2001 A Space Odyssey </ListGroup.Item>
                    <ListGroup.Item action disabled
                                    href="https://en.wikipedia.org/wiki/Ender%27s_Game">
                        Ender's Game </ListGroup.Item>
                    <ListGroup.Item action onClick={() => alert("New book added")}>
                        Add another book </ListGroup.Item>
                </ListGroup>
            </div>
        </div>
    );
}