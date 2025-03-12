import { Button, ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({ todo }: { todo: { id: string; title: string } }) {
    const dispatch = useDispatch();
    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
            {todo.title}
            <div>
                <Button variant="danger" onClick={() => dispatch(deleteTodo(todo.id))} className="me-2" id="wd-delete-todo-click">
                    Delete
                </Button>
                <Button variant="primary" onClick={() => dispatch(setTodo(todo))} id="wd-set-todo-click">
                    Edit
                </Button>
            </div>
        </ListGroup.Item>
    );
}

