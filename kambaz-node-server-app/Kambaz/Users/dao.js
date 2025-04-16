import users from "../Database/users.js";
import { v4 as uuidv4 } from "uuid";

export function findAllUsers() {
  return users;
}

export function findUserById(userId) {
  return users.find((user) => user._id === userId);
}

export function findUsersByRole(role) {
  return users.filter((user) => user.role === role);
}

export function findUsersByCourse(courseId) {
  return users.filter((user) => user.courses?.includes(courseId));
}

export function createUser(user) {
  const newUser = {
    _id: uuidv4(),
    ...user,
    courses: [],
  };
  users.push(newUser);
  return newUser;
}

export function updateUser(userId, userUpdates) {
  const user = users.find((u) => u._id === userId);
  if (user) {
    Object.assign(user, userUpdates);
    return user;
  }
  return null;
}

export function deleteUser(userId) {
  const index = users.findIndex((u) => u._id === userId);
  if (index !== -1) {
    users.splice(index, 1);
    return true;
  }
  return false;
}

export function enrollUserInCourse(userId, courseId) {
  const user = users.find((u) => u._id === userId);
  if (user) {
    if (!user.courses) {
      user.courses = [];
    }
    if (!user.courses.includes(courseId)) {
      user.courses.push(courseId);
      return true;
    }
  }
  return false;
}

export function unenrollUserFromCourse(userId, courseId) {
  const user = users.find((u) => u._id === userId);
  if (user && user.courses) {
    const index = user.courses.indexOf(courseId);
    if (index !== -1) {
      user.courses.splice(index, 1);
      return true;
    }
  }
  return false;
}
export function findUserByCredentials(username, password) {
  return users.find((user) => user.username === username && user.password === password);
}
