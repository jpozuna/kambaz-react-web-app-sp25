import PathParameters from "./PathParameters.js";
import QueryParameters from "./QueryParameters.js";
import modules from "../Kambaz/Database/modules.js";
import assignments from "../Kambaz/Database/assignments.js";

export default function Lab5(app) {
    app.get("/lab5/welcome", (req, res) => {
        res.send("Welcome to Lab 5");
    });
    PathParameters(app);
    QueryParameters(app);

    // Module routes
    app.get("/lab5/module", (req, res) => {
        const module = modules.find(m => m._id === "M101");
        if (!module) {
            res.status(404).json({ error: "Module not found" });
            return;
        }
        res.json(module);
    });

    app.get("/lab5/module/name", (req, res) => {
        const module = modules.find(m => m._id === "M101");
        if (!module) {
            res.status(404).json({ error: "Module not found" });
            return;
        }
        res.send(module.name);
    });

    app.put("/lab5/module/name/:newName", (req, res) => {
        const module = modules.find(m => m._id === "M101");
        if (!module) {
            res.status(404).json({ error: "Module not found" });
            return;
        }
        module.name = req.params.newName;
        res.json(module);
    });

    app.put("/lab5/module/description/:newDescription", (req, res) => {
        const module = modules.find(m => m._id === "M101");
        if (!module) {
            res.status(404).json({ error: "Module not found" });
            return;
        }
        module.description = req.params.newDescription;
        res.json(module);
    });

    // Assignment update routes
    app.put("/lab5/assignment/score/:newScore", (req, res) => {
        const courseAssignments = assignments.find(a => a.course_id === "RS101");
        if (!courseAssignments) {
            res.status(404).json({ error: "Course assignments not found" });
            return;
        }
        const assignment = courseAssignments.assignments.find(a => a.id === "A1");
        if (!assignment) {
            res.status(404).json({ error: "Assignment not found" });
            return;
        }
        assignment.points = parseInt(req.params.newScore);
        res.json(assignment);
    });

    app.put("/lab5/assignment/completed/:completed", (req, res) => {
        const courseAssignments = assignments.find(a => a.course_id === "RS101");
        if (!courseAssignments) {
            res.status(404).json({ error: "Course assignments not found" });
            return;
        }
        const assignment = courseAssignments.assignments.find(a => a.id === "A1");
        if (!assignment) {
            res.status(404).json({ error: "Assignment not found" });
            return;
        }
        assignment.completed = req.params.completed === "true";
        res.json(assignment);
    });

    // Todo routes
    app.put("/lab5/todos/:id/completed/:completed", (req, res) => {
        const courseAssignments = assignments.find(a => a.course_id === "RS101");
        if (!courseAssignments) {
            res.status(404).json({ error: "Course assignments not found" });
            return;
        }
        const assignment = courseAssignments.assignments.find(a => a.id === req.params.id);
        if (!assignment) {
            res.status(404).json({ error: "Assignment not found" });
            return;
        }
        assignment.completed = req.params.completed === "true";
        res.json(courseAssignments.assignments);
    });

    app.put("/lab5/todos/:id/description/:description", (req, res) => {
        const courseAssignments = assignments.find(a => a.course_id === "RS101");
        if (!courseAssignments) {
            res.status(404).json({ error: "Course assignments not found" });
            return;
        }
        const assignment = courseAssignments.assignments.find(a => a.id === req.params.id);
        if (!assignment) {
            res.status(404).json({ error: "Assignment not found" });
            return;
        }
        assignment.description = req.params.description;
        res.json(courseAssignments.assignments);
    });
} 