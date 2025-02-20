import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { useParams, Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import * as db from "../../Database";

export default function AssignmentEditor() {
    const { cid, assignmentSlug } = useParams();

    const course = db.assignments.find(course => course.course_id === cid);
    const assignment = course
        ? course.assignments.find(a => a.title.replace(/\s+/g, "-") === assignmentSlug)
        : null;
    if (!assignment) {
        return <h3 className="text-danger">Assignment not found</h3>;
    }
    return (
        <Container fluid="lg" className="my-4">
            <Card>
                <Card.Body>
                    <Form>
                        <Row className="mb-5">
                            <Form.Group as={Col} controlId="assignmentName">
                                <Form.Label><b>Assignment Name</b></Form.Label>
                                <Form.Control type="text" defaultValue={assignment.title} readOnly />
                            </Form.Group>
                        </Row>

                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Description</Card.Title>
                                <Card.Text>{assignment.description}</Card.Text>
                            </Card.Body>
                        </Card>

                        <Form.Group as={Row} className="mb-3">
                            <Col md={12}>
                                <Form.Label><b>Points</b></Form.Label>
                                <Form.Control type="number" defaultValue={assignment.points} readOnly />
                            </Col>
                        </Form.Group>

                        <Card className="mb-3">
                            <Card.Body>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="assignTo">
                                        <Form.Label>Assign To</Form.Label>
                                        <Form.Control type="text" defaultValue="" readOnly />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Col md={6}>
                                        <Form.Label><b>Due Date</b></Form.Label>
                                        <Form.Control type="date" defaultValue={assignment.dueDate} readOnly />
                                    </Col>
                                </Row>
                                <Col md={6}>
                                    <Form.Label><b>Available Date</b></Form.Label>
                                    <Form.Control type="date" defaultValue={assignment.availableDate} readOnly />
                                </Col>
                            </Card.Body>
                        </Card>

                        <Row className="justify-content-end">
                            <Col md="auto">
                                <Link to={`/Kambaz/Courses/${cid}/Assignments`} className="btn btn-secondary me-2">
                                    Cancel
                                </Link>
                                <Button variant="danger">Save</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}