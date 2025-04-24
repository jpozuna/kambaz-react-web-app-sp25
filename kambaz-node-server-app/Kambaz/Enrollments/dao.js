import model from "./model.js";

export const findAllEnrollments = async () => {
  return model.find().populate("course").populate("user");
};

export const findEnrollmentsForUser = async (userId) => {
  const enrollments = await model.find({ user: userId }).populate("course");
  return enrollments.map((enrollment) => enrollment.course);
};

export const findEnrollmentsForCourse = async (courseId) => {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments.map((enrollment) => enrollment.user);
};

export const createEnrollment = async (userId, courseId) => {
  // Check if enrollment already exists
  const existing = await model.findOne({ user: userId, course: courseId });
  if (existing) return null;
  
  return model.create({ 
    user: userId, 
    course: courseId, 
    _id: `${userId}-${courseId}`,
    dateEnrolled: new Date()
  });
};

export const deleteEnrollment = async (userId, courseId) => {
  const result = await model.deleteOne({ user: userId, course: courseId });
  return result.deletedCount > 0;
};

