import courses from "../Database/courses.js";
import { v4 as uuidv4 } from "uuid";

export function findAllCourses() {
  return courses;
}

export function createCourse(course) {
  const newCourse = { ...course, _id: uuidv4() };
  courses.push(newCourse);
  return newCourse;
}

export function findCoursesForEnrolledUser(userId) {
    const { courses, enrollments } = Database;
    const enrolledCourses = courses.filter((course) =>
      enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
    return enrolledCourses;
  }
  