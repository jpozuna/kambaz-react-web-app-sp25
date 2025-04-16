import axios from "axios";

console.log("REMOTE_SERVER ENV:", import.meta.env.VITE_REMOTE_SERVER);
const API_BASE = import.meta.env.VITE_REMOTE_SERVER;

export interface User {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "FACULTY" | "STUDENT" | "ADMIN";
  email: string;
  courses?: string[];
}

export const findAllUsers = async () => {
  const response = await axios.get(`${API_BASE}/users`, {
    withCredentials: true,
  });
  return response.data;
};


export const findUserById = async (userId: string) => {
  const response = await axios.get(`${API_BASE}/users/${userId}`, {
    withCredentials: true,
  });
  return response.data;
};

export const findUsersByRole = async (role: string) => {
  const response = await axios.get(`${API_BASE}/users/role/${role}`, {
    withCredentials: true,
  });
  return response.data;
};

export const findUsersByCourse = async (courseId: string) => {
  const response = await axios.get(`${API_BASE}/courses/${courseId}/users`, {
    withCredentials: true,
  });
  return response.data;
};

export const createUser = async (user: Omit<User, "_id">) => {
  const response = await axios.post(`${API_BASE}/users`, user, {
    withCredentials: true,
  });
  return response.data;
};

export const updateUser = async (userId: string, user: Partial<User>) => {
  const response = await axios.put(`${API_BASE}/users/${userId}`, user, {
    withCredentials: true,
  });
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await axios.delete(`${API_BASE}/users/${userId}`, {
    withCredentials: true,
  });
  return response.data;
};

export const enrollUserInCourse = async (userId: string, courseId: string) => {
  const response = await axios.post(
    `${API_BASE}/users/${userId}/courses/${courseId}`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const unenrollUserFromCourse = async (userId: string, courseId: string) => {
  const response = await axios.delete(
    `${API_BASE}/users/${userId}/courses/${courseId}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};