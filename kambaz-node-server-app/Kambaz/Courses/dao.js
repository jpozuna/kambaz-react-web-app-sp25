import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export const findAllCourses = () => model.find();

export const findCourseById = (courseId) => model.findById(courseId);

export const findCoursesForEnrolledUser = (userId) => model.find({ enrolled: userId });

export const createCourse = (course) => {
  const newCourse = { ...course, _id: uuidv4() };
  return model.create(newCourse);
};

export const updateCourse = (courseId, course) => 
  model.updateOne({ _id: courseId }, { $set: course });

export const deleteCourse = (courseId) => model.deleteOne({ _id: courseId });