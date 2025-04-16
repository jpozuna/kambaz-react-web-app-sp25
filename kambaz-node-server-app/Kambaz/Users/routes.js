import * as dao from "./dao.js";

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
      if (!req.session.currentUser || req.session.currentUser.role !== "FACULTY") {
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

  const findCurrentUserCourses = (req, res) => {
    const user = req.session.currentUser;
    if (!user) {
      return res.status(401).json({ error: "Not logged in" });
    }
    res.json(user.courses || []);
  };

  const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await dao.findUserByCredentials(username, password);
    if (user) {
      req.session.currentUser = user;  // 🪄 This is the magic line
      res.json(user);
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  };

  const logout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const profile = (req, res) => {
    const user = req.session.currentUser;
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json(user);
  };

  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.get("/api/users/role/:role", findUsersByRole);
  app.get("/api/courses/:courseId/users", findUsersByCourse);
  app.get("/api/users/current/courses", findCurrentUserCourses);

  app.post("/api/users", createUser);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/:userId/courses/:courseId", enrollUserInCourse);
  app.delete("/api/users/:userId/courses/:courseId", unenrollUserFromCourse);
  app.post("/api/users/login", login);
  app.post("/api/users/logout", logout);
  app.post("/api/users/profile", profile);
} 