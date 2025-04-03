import modules from "../Database/modules.js";

export function findModulesForCourse(courseId) {
  return modules.filter((module) => module.course === courseId);
} 