import enrollments from "../Database/enrollment.js";
import { v4 as uuidv4 } from "uuid";
import Database from "../Database/index.js";

export function findAllEnrollments() {
  return enrollments;
}

export function findEnrollmentsForUser(userId) {
  return enrollments.filter((enrollment) => enrollment.user === userId);
}

export function findEnrollmentsForCourse(courseId) {
  return enrollments.filter((enrollment) => enrollment.course === courseId);
}

export function createEnrollment(userId, courseId) {
  // Check if enrollment already exists
  const existingEnrollment = enrollments.find(
    (e) => e.user === userId && e.course === courseId
  );
  if (existingEnrollment) {
    return null;
  }

  const newEnrollment = {
    _id: uuidv4(),
    user: userId,
    course: courseId,
  };
  enrollments.push(newEnrollment);
  return newEnrollment;
}

export function deleteEnrollment(userId, courseId) {
  const index = enrollments.findIndex(
    (e) => e.user === userId && e.course === courseId
  );
  if (index !== -1) {
    enrollments.splice(index, 1);
    return true;
  }
  return false;
}

export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
} 