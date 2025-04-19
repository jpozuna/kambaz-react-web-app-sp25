import Database from "../Database/index.js";
import model from "./model.js";
export function createModule(module) {
    const newModule = {...module, _id: uuidv4()};
    return model.create(newModule);
}

// Get modules for a specific course
export const findModulesForCourse = (courseId) =>
    Module.find({ course: courseId });

// Delete a module
export const deleteModule = (moduleId) =>
    Module.deleteOne({ _id: moduleId });

// Update a module
export const updateModule = (moduleId, moduleUpdates) =>
    Module.updateOne({ _id: moduleId }, { $set: moduleUpdates });
