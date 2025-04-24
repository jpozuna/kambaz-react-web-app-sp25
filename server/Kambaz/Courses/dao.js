import model from "./model.js";

export const findAllCourses = () => model.find();
export const findCourseById = (courseId) => model.findById(courseId);
export const findCoursesByOwner = (ownerId) => model.find({ owner: ownerId });
export const createCourse = (course) => model.create(course);
export const updateCourse = (courseId, courseUpdates) => 
  model.updateOne({ _id: courseId }, { $set: courseUpdates });
export const deleteCourse = (courseId) => model.deleteOne({ _id: courseId }); 