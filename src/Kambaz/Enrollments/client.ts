import axios from "axios";

console.log("REMOTE_SERVER ENV:", import.meta.env.VITE_REMOTE_SERVER);p
const API_BASE = import.meta.env.VITE_REMOTE_SERVER;



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