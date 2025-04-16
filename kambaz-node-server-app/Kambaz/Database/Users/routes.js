import * as dao from "./dao.js";

export default function UserRoutes(app) {
  // GLOBAL state
  let currentUser = null;

  // HANDLERS
  const createUser = (req, res) => {  };
  const deleteUser = (req, res) => { };
  const findAllUsers = (req, res) => { };
  const findUserById = (req, res) => { };

  const updateUser = (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;
    dao.updateUser(userId, userUpdates);
    currentUser = dao.findUserById(userId);
    res.json(currentUser);
  };

  const signup = (req, res) => {
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      return res.status(400).json({ message: "Username already in use" });
    }
    currentUser = dao.createUser(req.body);
    req.session.currentUser = currentUser;
    res.json(currentUser);
  };

  const signin = (req, res) => {
    const { username, password } = req.body;
    const user = dao.findUserByCredentials(username, password);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    req.session.currentUser = user; // ✅ store user in session
    res.json(user);
  };

  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const profile = (req, res) => {
    console.log("💡 /profile called");
    console.log("Session:", req.session);
    const user = req.session.currentUser;
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  };

  const findCurrentUserCourses = (req, res) => {
    const user = req.session.currentUser;
    if (!user) {
      return res.status(401).json({ error: "Not logged in" });
    }
    res.json(user.courses || []);
  };

  console.log("Registering routes")
  // ROUTE REGISTRATION
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);

  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
  app.get("/api/users/current/courses", findCurrentUserCourses);
}
