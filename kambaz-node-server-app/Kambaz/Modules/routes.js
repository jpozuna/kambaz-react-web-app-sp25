import * as modulesDao from "./dao.js";

export default function ModuleRoutes(app) {
    // Create a module for a course
    app.post("/api/courses/:cid/modules", async (req, res) => {
        const module = { ...req.body, course: req.params.cid };
        const created = await modulesDao.createModule(module);
        res.json(created);
    });

    // Find modules for a course
    app.get("/api/courses/:cid/modules", async (req, res) => {
        const modules = await modulesDao.findModulesForCourse(req.params.cid);
        res.json(modules);
    });

    // Update a module
    app.put("/api/modules/:moduleId", async (req, res) => {
        const { moduleId } = req.params;
        const status = await modulesDao.updateModule(moduleId, req.body);
        res.json(status);
    });

    // Delete a module
    app.delete("/api/modules/:moduleId", async (req, res) => {
        const { moduleId } = req.params;
        const status = await modulesDao.deleteModule(moduleId);
        res.json(status);
    });
}
