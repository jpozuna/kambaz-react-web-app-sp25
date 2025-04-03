import axios from "axios";

const API_BASE = "http://localhost:4000/api";

export interface Assignment {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  availableDate: string;
  points: number;
  course: string;
  module?: string;
}

export const findAllAssignments = async () => {
  const response = await axios.get(`${API_BASE}/assignments`, {
    withCredentials: true,
  });
  return response.data;
};

export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axios.get(`${API_BASE}/courses/${courseId}/assignments`, {
    withCredentials: true,
  });
  return response.data;
};

export const createAssignment = async (assignment: Omit<Assignment, "_id">) => {
  const response = await axios.post(`${API_BASE}/assignments`, assignment, {
    withCredentials: true,
  });
  return response.data;
};

export const updateAssignment = async (assignmentId: string, assignment: Partial<Assignment>) => {
  const response = await axios.put(`${API_BASE}/assignments/${assignmentId}`, assignment, {
    withCredentials: true,
  });
  return response.data;
};

export const deleteAssignment = async (assignmentId: string) => {
  const response = await axios.delete(`${API_BASE}/assignments/${assignmentId}`, {
    withCredentials: true,
  });
  return response.data;
}; 