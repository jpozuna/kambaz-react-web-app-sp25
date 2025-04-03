import React, { useState } from "react";
import { FormControl, Button, Row, Col } from "react-bootstrap";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  });

  const [module, setModule] = useState({
    id: "CS5610",
    name: "Web Development",
    description: "Learn modern web development with React and Node.js",
    course: "CS5610"
  });

  const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`;

  return (
    <div>
      <h3 id="wd-working-with-objects">Working With Objects</h3>
      
      <h4>Modifying Assignment Properties</h4>
      <Row className="mb-3">
        <Col md={8}>
          <FormControl className="w-100" id="wd-assignment-title"
            defaultValue={assignment.title} onChange={(e) =>
              setAssignment({ ...assignment, title: e.target.value })}/>
        </Col>
        <Col md={4} className="text-end">
          <Button id="wd-update-assignment-title"
            variant="primary"
            href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
            Update Title
          </Button>
        </Col>
      </Row>
      
      <h4>Update Assignment Score</h4>
      <Row className="mb-3">
        <Col md={8}>
          <FormControl type="number" className="w-100" id="wd-assignment-score"
            defaultValue={assignment.score} onChange={(e) =>
              setAssignment({ ...assignment, score: parseInt(e.target.value) })}/>
        </Col>
        <Col md={4} className="text-end">
          <Button id="wd-update-assignment-score"
            variant="primary"
            href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
            Update Score
          </Button>
        </Col>
      </Row>
      
      <h4>Update Assignment Completion</h4>
      <Row className="mb-3">
        <Col md={8}>
          <FormControl type="checkbox" className="w-100" id="wd-assignment-completed"
            checked={assignment.completed} onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAssignment({ ...assignment, completed: e.target.checked })}/>
        </Col>
        <Col md={4} className="text-end">
          <Button id="wd-update-assignment-completed"
            variant="primary"
            href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>
            Update Completion
          </Button>
        </Col>
      </Row>
      
      <h4>Working with Module Object</h4>
      <Row className="mb-3">
        <Col md={12} className="text-end">
          <Button id="wd-get-module"
            variant="primary"
            href={MODULE_API_URL}
            className="me-2">
            Get Module
          </Button>
          <Button id="wd-get-module-name"
            variant="primary"
            href={`${MODULE_API_URL}/name`}>
            Get Module Name
          </Button>
        </Col>
      </Row>
      
      <h4>Update Module Properties</h4>
      <Row className="mb-3">
        <Col md={8}>
          <FormControl className="w-100" id="wd-module-name"
            defaultValue={module.name} onChange={(e) =>
              setModule({ ...module, name: e.target.value })}/>
        </Col>
        <Col md={4} className="text-end">
          <Button id="wd-update-module-name"
            variant="primary"
            href={`${MODULE_API_URL}/name/${module.name}`}>
            Update Module Name
          </Button>
        </Col>
      </Row>
      
      <Row className="mb-3">
        <Col md={8}>
          <FormControl className="w-100" id="wd-module-description"
            defaultValue={module.description} onChange={(e) =>
              setModule({ ...module, description: e.target.value })}/>
        </Col>
        <Col md={4} className="text-end">
          <Button id="wd-update-module-description"
            variant="primary"
            href={`${MODULE_API_URL}/description/${module.description}`}>
            Update Module Description
          </Button>
        </Col>
      </Row>
    </div>
  );
}
