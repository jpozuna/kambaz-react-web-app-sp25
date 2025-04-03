import React, { useState } from "react";
import { FormControl, Button, Row, Col } from "react-bootstrap";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function WorkingWithArrays() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Learn Node.js",
      description: "Learn how to create a Node.js server",
      completed: false
    },
    {
      id: 2,
      title: "Learn React",
      description: "Learn how to create a React application",
      completed: false
    }
  ]);

  const [selectedTodoId, setSelectedTodoId] = useState(1);
  const [newDescription, setNewDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleUpdateDescription = async () => {
    try {
      const response = await fetch(
        `${REMOTE_SERVER}/lab5/todos/${selectedTodoId}/description/${newDescription}`
      );
      if (!response.ok) {
        throw new Error("Failed to update description");
      }
      const updatedTodos = await response.json();
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error updating description:", error);
    }
  };

  const handleUpdateCompleted = async () => {
    try {
      const response = await fetch(
        `${REMOTE_SERVER}/lab5/todos/${selectedTodoId}/completed/${completed}`
      );
      if (!response.ok) {
        throw new Error("Failed to update completion status");
      }
      const updatedTodos = await response.json();
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error updating completion status:", error);
    }
  };

  return (
    <div>
      <h3 id="wd-working-with-arrays">Working With Arrays</h3>
      
      <h4>Select Todo</h4>
      <Row className="mb-3">
        <Col md={12}>
          <FormControl as="select" 
            value={selectedTodoId}
            onChange={(e) => setSelectedTodoId(parseInt(e.target.value))}>
            {todos.map(todo => (
              <option key={todo.id} value={todo.id}>
                {todo.title}
              </option>
            ))}
          </FormControl>
        </Col>
      </Row>

      <h4>Update Todo Description</h4>
      <Row className="mb-3">
        <Col md={8}>
          <FormControl
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Enter new description"
          />
        </Col>
        <Col md={4} className="text-end">
          <Button
            variant="primary"
            onClick={handleUpdateDescription}>
            Update Description
          </Button>
        </Col>
      </Row>

      <h4>Update Todo Completion</h4>
      <Row className="mb-3">
        <Col md={8}>
          <FormControl
            type="checkbox"
            checked={completed}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompleted(e.target.checked)}
          />
        </Col>
        <Col md={4} className="text-end">
          <Button
            variant="primary"
            onClick={handleUpdateCompleted}>
            Update Completion
          </Button>
        </Col>
      </Row>

      <h4>Current Todos</h4>
      <div className="list-group">
        {todos.map(todo => (
          <div key={todo.id} className="list-group-item">
            <h5>{todo.title}</h5>
            <p>{todo.description}</p>
            <p>Completed: {todo.completed ? "Yes" : "No"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
