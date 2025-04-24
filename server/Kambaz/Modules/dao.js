import model from "./model.js";

export const findAllModules = () => model.find();
export const findModuleById = (moduleId) => model.findById(moduleId);
export const findModulesForCourse = (courseId) => model.find({ course: courseId });
export const createModule = (module) => model.create(module);
export const updateModule = (moduleId, moduleUpdates) => 
  model.updateOne({ _id: moduleId }, { $set: moduleUpdates });
export const deleteModule = (moduleId) => model.deleteOne({ _id: moduleId }); 