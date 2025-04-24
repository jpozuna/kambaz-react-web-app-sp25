import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function UserRoutes(app) {
  const findAllUsers = async (req, res) => {
    try {
      const users = dao.findAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to find users" });
    }
  };

  const findUserById = async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await dao.findUserById(userId);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to find user" });
    }
  };

  const findUsersByRole = async (req, res) => {
    try {
      const { role } = req.params;
      const users = dao.findUsersByRole(role);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to find users" });
    }
  };

  const findUsersByCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const users = dao.findUsersByCourse(courseId);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to find users" });
    }
  };

  const createUser = async (req, res) => {
    try {
      if (!currentUser ||
          (currentUser._id !== userId && !["FACULTY", "ADMIN"].includes(currentUser.role))
      ) {
        res.status(403).json({ error: "Only faculty can create users" });
        return;
      }
      const user = await dao.createUser(req.body);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to create user" });
    }
  };

  const updateUser = async (req, res) => {
    try {
      if (!req.session.currentUser || req.session.currentUser.role !== "FACULTY") {
        res.status(403).json({ error: "Only faculty can update users" });
        return;
      }
      const { userId } = req.params;
      const user = await dao.updateUser(userId, req.body);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to update user" });
    }
  };

  const deleteUser = async (req, res) => {
    try {
      if (!req.session.currentUser || req.session.currentUser.role !== "FACULTY") {
        res.status(403).json({ error: "Only faculty can delete users" });
        return;
      }
      const { userId } = req.params;
      const success = dao.deleteUser(userId);
      if (!success) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete user" });
    }
  };

  const enrollUserInCourse = async (req, res) => {
    try {
      if (!req.session.currentUser || req.session.currentUser.role !== "FACULTY") {
        res.status(403).json({ error: "Only faculty can enroll users" });
        return;
      }
      const { userId, courseId } = req.params;
      const success = dao.enrollUserInCourse(userId, courseId);
      if (!success) {
        res.status(400).json({ error: "Failed to enroll user in course" });
        return;
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to enroll user" });
    }
  };

  const unenrollUserFromCourse = async (req, res) => {
    try {
      if (!req.session.currentUser || req.session.currentUser.role !== "FACULTY") {
        res.status(403).json({ error: "Only faculty can unenroll users" });
        return;
      }
      const { userId, courseId } = req.params;
      const success = dao.unenrollUserFromCourse(userId, courseId);
      if (!success) {
        res.status(400).json({ error: "Failed to unenroll user from course" });
        return;
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to unenroll user" });
    }
  };

  const signup = (req, res) => {
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already taken" });
      return;
    }
    const currentUser = dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  const signin = (req, res) => {
    const { username, password } = req.body;
    const currentUser = dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };

  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };

  const findCurrentUserCourses = (req, res) => {
    console.log("Current courses request, current user:", req.session.currentUser?.username);
    const user = req.session.currentUser;
    if (!user) {
      console.log("No user in session");
      res.status(401).json({ error: "Not logged in" });
      return;
    }
    const courses = dao.findUserCourses(req.session.currentUser._id);
    res.json(courses);
  };

  const findCoursesForEnrolledUser = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = courseDao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  };

  const createCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    const newCourse = courseDao.createCourse(req.body);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };

  // Register routes in order of specificity
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
  app.get("/api/users/current/courses", findCurrentUserCourses);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.get("/api/users/role/:role", findUsersByRole);
  app.get("/api/users/course/:courseId", findUsersByCourse);
  app.post("/api/users", createUser);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/:userId/courses/:courseId", enrollUserInCourse);
  app.delete("/api/users/:userId/courses/:courseId", unenrollUserFromCourse);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.post("/api/users/current/courses", createCourse);
} 