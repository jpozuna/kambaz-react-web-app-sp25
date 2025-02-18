import Nav from "react-bootstrap/Nav";
import { useLocation } from "react-router";
export default function TOC() {
    const { pathname } = useLocation();
    return (
        <Nav variant="pills">
            <Nav.Item>
                <Nav.Link href="#/Labs">Labs </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="#/Labs/Lab1" active={pathname.includes("Lab1")}>Lab 1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="#/Labs/Lab2" active={pathname.includes("Lab2")}>Lab 2</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="#/Labs/Lab3"active={pathname.includes("Lab3")}>Lab 3</Nav.Link>
            </Nav.Item>
            <Nav.Item>

                <Nav.Link href="#/Kambaz">Kambaz</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="https://github.com/jpozuna/kambaz-react-web-app-sp25">My GitHub</Nav.Link>
            </Nav.Item>
        </Nav>
    );}
