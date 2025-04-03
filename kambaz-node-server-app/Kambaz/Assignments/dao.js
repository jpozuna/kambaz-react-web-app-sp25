import assignments from "../Database/assignments.js";
import { v4 as uuidv4 } from "uuid";

export function findAllAssignments() {
  return assignments;
}

export function findAssignmentsForCourse(courseId) {
  return assignments.filter((assignment) => assignment.course === courseId);
}

export function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: uuidv4() };
  assignments.push(newAssignment);
  return newAssignment;
}

export function updateAssignment(assignmentId, assignmentUpdates) {
  const assignment = assignments.find((a) => a._id === assignmentId);
  if (assignment) {
    Object.assign(assignment, assignmentUpdates);
    return assignment;
  }
  return null;
}

export function deleteAssignment(assignmentId) {
  const index = assignments.findIndex((a) => a._id === assignmentId);
  if (index !== -1) {
    assignments.splice(index, 1);
    return true;
  }
  return false;
} 