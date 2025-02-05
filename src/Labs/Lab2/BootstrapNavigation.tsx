import {Button, Card, Nav} from "react-bootstrap";

export default function BootstrapNavigation() {
    return (
        <div id="wd-css-navigating-with-tabs">
            <h2>Tabs</h2>
            <Nav variant="tabs">
                <Nav.Item>
                    <Nav.Link href="#/Labs/Lab2/Active">Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="#/Labs/Lab2/Link1">Link 1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="#/Labs/Lab2/Link2">Link 2</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="#/Labs/Lab2/Disabled" disabled>Disabled</Nav.Link>
                </Nav.Item>
            </Nav>

            <div id="wd-css-navigating-with-cards">
                <h2>
                    Cards
                </h2>
                <Card style={{width: "18rem"}}>
                    <Card.Img variant="top" src="images/bug-pic.jpg"/>
                    <Card.Body>
                        <Card.Title>Bug Insect In Tree</Card.Title>
                        <Card.Text>
                            A close-up of a green and red shield bug standing on a tree surface
                        </Card.Text>
                        <Button variant="primary">Cricket</Button>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}