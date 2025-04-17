import PathParameters from "./PathParameters.js";
import QueryParameters from "./QueryParameters.js";

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
    app.get("/lab5/todos/:id/completed/:completed", (req, res) => {
        const todos = [
            {
                id: 1,
                title: "Learn Node.js",
                description: "Learn how to create a Node.js server",
                completed: req.params.completed === "true"
            },
            {
                id: 2,
                title: "Learn React",
                description: "Learn how to create a React application",
                completed: false
            }
        ];
        const todo = todos.find(t => t.id === parseInt(req.params.id));
        if (todo) {
            todo.completed = req.params.completed === "true";
            res.json(todos);
        } else {
            res.status(404).json({ error: "Todo not found" });
        }
    });

    app.get("/lab5/todos/:id/description/:description", (req, res) => {
        const todos = [
            {
                id: 1,
                title: "Learn Node.js",
                description: req.params.description,
                completed: false
            },
            {
                id: 2,
                title: "Learn React",
                description: "Learn how to create a React application",
                completed: false
            }
        ];
        const todo = todos.find(t => t.id === parseInt(req.params.id));
        if (todo) {
            todo.description = req.params.description;
            res.json(todos);
        } else {
            res.status(404).json({ error: "Todo not found" });
        }
    });
} 