import { Button, FormControl, ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm() {
    const { todo } = useSelector((state: any) => state.todosReducer);
    const dispatch = useDispatch();

    return (
        <ListGroup.Item className="d-flex align-items-center">
            <FormControl
                value={todo.title || ''}
                onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
                className="me-2"
                placeholder="Enter Todo"
            />
            <Button variant="success" onClick={() => dispatch(addTodo(todo))} className="me-2" id="wd-add-todo-click">
                Add
            </Button>
            <Button variant="warning" onClick={() => dispatch(updateTodo(todo))} id="wd-update-todo-click">
                Update
            </Button>
        </ListGroup.Item>
    );
}
