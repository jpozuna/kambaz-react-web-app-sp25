import model from "./model.js";
import db from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export const createUser = (user) => {
  const newUser = {
    _id: uuidv4(),
    ...user,
    courses: [],
  };
  return model.create(newUser);
};

export const findAllUsers = () => model.find();

export const findUsersByRole = (role) => model.find({ role: role });

export const findUsersByPartialName = (partialName) => {
  const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
  return model.find({
    $or: [
      { firstName: { $regex: regex } },
      { lastName: { $regex: regex } }
    ]
  });
};

export function findUsersByCourse(courseId) {
  return model.find({ courses: { $elemMatch: { $eq: courseId } } });
}

export function enrollUserInCourse(userId, courseId) {
  return model.updateOne({ _id: userId }, { $addToSet: { courses: courseId } });
}

export function unenrollUserFromCourse(userId, courseId) {
  return model.updateOne({ _id: userId }, { $pull: { courses: courseId } });
}

export function findUserByUsername(username) {
  return model.findOne({ username: username });
}

export function findUserByCredentials(username, password) {
  return model.findOne({ username, password });
}

export function findUserCourses(userId) {
  return model.findOne({ _id: userId }, { courses: 1 });
}

export const findUserById = (userId) => model.findById(userId);

export const updateUser = (userId, user) => model.updateOne({ _id: userId }, { $set: user });

export const deleteUser = (userId) => model.deleteOne({ _id: userId });

