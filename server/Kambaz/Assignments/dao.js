import model from "./model.js";

export const findAllAssignments = () => model.find();
export const findAssignmentById = (assignmentId) => model.findById(assignmentId);
export const findAssignmentsForCourse = (courseId) => model.find({ course: courseId });
export const createAssignment = (assignment) => model.create(assignment);
export const updateAssignment = (assignmentId, assignmentUpdates) => 
  model.updateOne({ _id: assignmentId }, { $set: assignmentUpdates });
export const deleteAssignment = (assignmentId) => model.deleteOne({ _id: assignmentId }); 