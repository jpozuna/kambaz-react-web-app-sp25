import users from "../Database/users.js";
import { v4 as uuidv4 } from "uuid";
import {model} from "mongoose";

export function findAllUsers() {
  return users;
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
  return model.create(newUser);
}

export const updateUser = async (userId, userUpdates) => {
  return model.updateOne({ _id: userId }, { $set: userUpdates });
};



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
  return users.find((user) =>
                        user.username === username && user.password === password
  );
}

export function findUserCourses(userId) {
  const user = users.find((u) => u._id === userId);
  return user?.courses || [];
}

export const findUsersByPartialName = (partialName) => {
  const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
  return model.find({
                      $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
                    });
};

export const findUserById = (userId) => model.findById(userId);

export const deleteUser = (userId) => model.deleteOne({ _id: userId });

