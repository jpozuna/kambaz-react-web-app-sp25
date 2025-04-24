import model from "./model.js";
import { v4 as uuidv4 } from 'uuid';

export function createModule(module) {
    const newModule = {...module, _id: uuidv4()};
    return model.create(newModule);
}

// Get modules for a specific course
export const findModulesForCourse = (courseId) =>
    model.find({ course: courseId });

// Delete a module
export const deleteModule = (moduleId) =>
    model.deleteOne({ _id: moduleId });

// Update a module
export const updateModule = (moduleId, moduleUpdates) =>
    model.updateOne({ _id: moduleId }, { $set: moduleUpdates });
