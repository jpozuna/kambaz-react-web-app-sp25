import PathParameters from "./PathParameters.js";
import QueryParameters from "./QueryParameters.js";

// Initialize todos array
let todos = [
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
];

export default function Lab5(app) {
    app.get("/lab5/welcome", (req, res) => {
        res.send("Welcome to Lab 5");
    });
    PathParameters(app);
    QueryParameters(app);

    // Module routes
    app.get("/lab5/module", (req, res) => {
        const module = {
            id: "CS5610",
            name: "Web Development",
            description: "Learn modern web development with React and Node.js",
            course: "CS5610"
        };
        res.json(module);
    });

    app.get("/lab5/module/name", (req, res) => {
        const module = {
            id: "CS5610",
            name: "Web Development",
            description: "Learn modern web development with React and Node.js",
            course: "CS5610"
        };
        res.send(module.name);
    });

    app.get("/lab5/module/name/:newName", (req, res) => {
        const module = {
            id: "CS5610",
            name: req.params.newName,
            description: "Learn modern web development with React and Node.js",
            course: "CS5610"
        };
        res.json(module);
    });

    app.get("/lab5/module/description/:newDescription", (req, res) => {
        const module = {
            id: "CS5610",
            name: "Web Development",
            description: req.params.newDescription,
            course: "CS5610"
        };
        res.json(module);
    });

    // Assignment update routes
    app.get("/lab5/assignment/score/:newScore", (req, res) => {
        const assignment = {
            id: 1,
            title: "NodeJS Assignment",
            description: "Create a NodeJS server with ExpressJS",
            due: "2021-10-10",
            completed: false,
            score: parseInt(req.params.newScore)
        };
        res.json(assignment);
    });

    app.get("/lab5/assignment/completed/:completed", (req, res) => {
        const assignment = {
            id: 1,
            title: "NodeJS Assignment",
            description: "Create a NodeJS server with ExpressJS",
            due: "2021-10-10",
            completed: req.params.completed === "true",
            score: 0
        };
        res.json(assignment);
    });

    // Todo routes
    app.get("/lab5/todos", (req, res) => {
        res.json(todos);
    });

    app.post("/lab5/todos", (req, res) => {
        const newTodo = {
            ...req.body,
            id: new Date().getTime()
        };
        todos.push(newTodo);
        res.json(newTodo);
    });

    app.put("/lab5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
        if (todoIndex === -1) {
            res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
            return;
        }
        todos = todos.map((t) => {
            if (t.id === parseInt(id)) {
                return { ...t, ...req.body };
            }
            return t;
        });
        res.sendStatus(200);
    });

    app.delete("/lab5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
        if (todoIndex === -1) {
            res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
            return;
        }
        todos.splice(todoIndex, 1);
        res.sendStatus(200);
    });

    app.get("/lab5/todos/create", (req, res) => {
        const newTodo = {
            id: new Date().getTime(),
            title: "New Task",
            completed: false
        };
        todos.push(newTodo);
        res.json(todos);
    });
} 