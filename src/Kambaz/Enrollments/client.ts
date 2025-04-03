import axios from "axios";

const API_BASE = "http://localhost:4000/api";

export interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

export const findAllEnrollments = async () => {
  const response = await axios.get(`${API_BASE}/enrollments`, {
    withCredentials: true,
  });
  return response.data;
};

export const findEnrollmentsForUser = async () => {
  const response = await axios.get(`${API_BASE}/users/enrollments`, {
    withCredentials: true,
  });
  return response.data;
};

export const findEnrollmentsForCourse = async (courseId: string) => {
  const response = await axios.get(`${API_BASE}/courses/${courseId}/enrollments`, {
    withCredentials: true,
  });
  return response.data;
};

export const createEnrollment = async (courseId: string) => {
  const response = await axios.post(`${API_BASE}/courses/${courseId}/enrollments`, {}, {
    withCredentials: true,
  });
  return response.data;
};

export const deleteEnrollment = async (courseId: string) => {
  const response = await axios.delete(`${API_BASE}/courses/${courseId}/enrollments`, {
    withCredentials: true,
  });
  return response.data;
}; 