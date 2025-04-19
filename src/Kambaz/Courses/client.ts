import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const findUsersForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/users`);
  return response.data;
};

const axiosWithCredentials = axios.create({
  withCredentials: true,
});

// ✅ Create a new module for a course
export const createModuleForCourse = async (courseId: string, module: any) => {
  const response = await axiosWithCredentials.post(
      `${COURSES_API}/${courseId}/modules`,
      module
  );
  return response.data;
};

// ✅ Fetch all courses (admin use only, usually)
export const fetchAllCourses = async () => {
  const { data } = await axiosWithCredentials.get(COURSES_API);
  return data;
};

// ✅ Delete course by ID
export const deleteCourse = async (id: string) => {
  if (!id) throw new Error("Missing course ID in deleteCourse()");
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
  return data;
};

// ✅ Update a course
export const updateCourse = async (course: any) => {
  if (!course?._id) {
    throw new Error("Missing course._id in updateCourse()");
  }
  const { data } = await axiosWithCredentials.put(
      `${COURSES_API}/${course._id}`,
      course
  );
  return data;
};

// ✅ Get all modules for a course
export const findModulesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(
      `${COURSES_API}/${courseId}/modules`
  );
  return response.data;
};

// ✅ Get all assignments for a course
export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(
      `${COURSES_API}/${courseId}/Assignments`
  );
  return response.data;
};

// ✅ Create assignment for a course
export const createAssignmentForCourse = async (
    courseId: string,
    assignment: any
) => {
  const response = await axiosWithCredentials.post(
      `${COURSES_API}/${courseId}/Assignments`,
      assignment
  );
  return response.data;
};

// ✅ Enroll a user in a course
export const enrollInCourse = async (courseId: string, userId: string) => {
  const response = await axiosWithCredentials.post(
      `${COURSES_API}/${courseId}`,
      { userId }
  );
  return response.data;
};

// ✅ Unenroll a user from a course
export const unenrollFromCourse = async (
    courseId: string,
    userId: string
) => {
  const response = await axiosWithCredentials.delete(
      `${COURSES_API}/${courseId}/enrollments/${userId}`
  );
  return response.data;
};

// ✅ Get enrollments for a user
export const getEnrollmentsForUser = async (userId: string) => {
  const response = await axiosWithCredentials.get(
      `${REMOTE_SERVER}/api/enrollments/${userId}`
  );
  return response.data;
};

// ✅ Create a new course (with default fallback)
export const createCourse = async (course: any = { name: "Untitled", description: "" }) => {
  const { data } = await axiosWithCredentials.post(COURSES_API, course);
  return data;
};


