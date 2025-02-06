// noinspection TypeScriptCheckImport
import {Form, Button, Row, Col, Container, Card,} from 'react-bootstrap';

export default function AssignmentEditor() {
    return (
        <Container fluid="lg" className="my-4">
            <Card>
                <Card.Body>
                    <Form>
                        <Row className="mb-5">
                            <Form.Group as={Col} controlId="assignmentName">
                                <Form.Label><b>Assignment Name</b></Form.Label>
                                <Form.Control type="text" defaultValue="A1 - ENV + HTML" />
                            </Form.Group>
                        </Row>
                        <Card>
                            <Card.Body>
                                <Card.Title>Description</Card.Title>
                                <Card.Text>
                                    The assignment is available online. Submit a link to the landing page of your Web application running on Netlify.
                                </Card.Text>
                                <ul>
                                    <li>Your full name and section</li>
                                    <li>Links to each of the lab assignments</li>
                                    <li>Link to the Kambaz application</li>
                                    <li>Links to all relevant source code repositories</li>
                                </ul>
                                The Kambaz application should include a link to navigate back to the landing page.
                            </Card.Body>
                        </Card>

                        <Container fluid="lg" className="my-4">
                            <Form>
                                <Form.Group as={Row} className="mb-3">
                                    <Col md={12}>
                                        <Form.Label><b>Points</b></Form.Label>
                                        <Form.Control type="number" defaultValue={100} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3">
                                    <Col md={12}>
                                        <Form.Label><b>Assignment Group</b></Form.Label>
                                        <Form.Select defaultValue="ASSIGNMENTS">
                                            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                                        </Form.Select>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3">
                                    <Col md={12}>
                                        <Form.Label><b>Display Grade As</b></Form.Label>
                                        <Form.Select defaultValue="Percentage">
                                            <option value="Percentage">Percentage</option>
                                        </Form.Select>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3">
                                    <Col md={12}>
                                        <Form.Label><b>Submission Type</b></Form.Label>
                                        <Form.Select defaultValue="Online">
                                            <option value="Online">Online</option>
                                        </Form.Select>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Container>

                        <Card className="mb-3">
                            <Card.Body>
                                <Form.Group as={Row}>
                                    <Col md={12}>
                                        <Form.Label><b>Online Entry Options</b></Form.Label>
                                        <Form.Check type="checkbox" label="Text Entry" />
                                        <Form.Check type="checkbox" label="Website URL" defaultChecked />
                                        <Form.Check type="checkbox" label="Media Recordings" />
                                        <Form.Check type="checkbox" label="Student Annotation" />
                                        <Form.Check type="checkbox" label="File Uploads" />
                                    </Col>
                                </Form.Group>
                            </Card.Body>
                        </Card>

                        <Card className="mb-3">
                            <Card.Body>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="assignTo">
                                        <Form.Label>Assign To</Form.Label>
                                        <Form.Control type="text" defaultValue="Everyone" />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} md={4} controlId="dueDate">
                                        <Form.Label>Due Date</Form.Label>
                                        <Form.Control type="date" defaultValue="2024-05-13" />
                                    </Form.Group>

                                    <Form.Group as={Col} md={4} controlId="availableFrom">
                                        <Form.Label>Available From</Form.Label>
                                        <Form.Control type="date" defaultValue="2024-05-06" />
                                    </Form.Group>

                                    <Form.Group as={Col} md={4} controlId="availableUntil">
                                        <Form.Label>Until</Form.Label>
                                        <Form.Control type="date" defaultValue="2024-05-20" />
                                    </Form.Group>
                                </Row>
                            </Card.Body>
                        </Card>


                        <Row className="justify-content-end">
                            <Col md="auto">
                                <Button variant="secondary" className="me-2">Cancel</Button>
                                <Button variant="danger">Save</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}