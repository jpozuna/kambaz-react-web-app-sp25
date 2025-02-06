import { Link } from "react-router-dom";
import {ListGroup} from "react-bootstrap";
import * as React from "react";
export default function CourseNavigation() {
    return (
        <ListGroup className="wd fs-5 rounded-0">
            <ListGroup.Item as={Link} to="/Kambaz/Courses/1234/Home"
                            className="active border border-0">
                Home </ListGroup.Item >
            <ListGroup.Item as={Link} to="/Kambaz/Courses/1234/Modules"
                            className="text-danger border border-0">
                Modules </ListGroup.Item >
            <ListGroup.Item as={Link} to="/Kambaz/Courses/1234/Piazza"
                            className="text-danger border border-0">
                Piazza </ListGroup.Item >
            <ListGroup.Item as={Link} to="/Kambaz/Courses/1234/Zoom"
                            className="text-danger border border-0">
                Zoom </ListGroup.Item >
            <ListGroup.Item as={Link}
                            to="/Kambaz/Courses/1234/Assignments"
                            className="text-danger border border-0">
                Assignments </ListGroup.Item >
            <ListGroup.Item as={Link} to="/Kambaz/Courses/1234/Quizzes"
                            className="text-danger border border-0">
                Quizzes </ListGroup.Item >
            <ListGroup.Item as={Link} to="/Kambaz/Courses/1234/People"
                            className="text-danger border border-0" >
                People </ListGroup.Item >
        </ListGroup>
    );}

