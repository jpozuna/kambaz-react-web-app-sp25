import * as dao from "./dao.js";

export default function UserRoutes(app) {
  // HANDLERS

  const createUser = (req, res) => { };
  const deleteUser = (req, res) => { };
  const findAllUsers = (req, res) => { };
  const findUserById = (req, res) => { };

  const updateUser = (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;
    dao.updateUser(userId, userUpdates);
    const updatedUser = dao.findUserById(userId);
    req.session.currentUser = updatedUser; // ✅ update session with latest data
    console.log("🔄 Updated session user:", req.session.currentUser?.username);
    res.json(updatedUser);
  };

  const signup = (req, res) => {
    const existing = dao.findUserByUsername(req.body.username);
    if (existing) {
      return res.status(400).json({ message: "Username already in use" });
    }
    const newUser = dao.createUser(req.body);
    req.session.currentUser = newUser;
    console.log("✅ Signed up:", newUser.username);
    res.json(newUser);
  };

  const signin = (req, res) => {
    const { username, password } = req.body;
    const user = dao.findUserByCredentials(username, password);
    if (!user) {
      console.log("❌ Invalid login for:", username);
      return res.status(401).json({ error: "Invalid credentials" });
    }
    req.session.currentUser = user; // ✅ store user in session
    console.log("🔐 Logged in:", user.username);
    res.json(user);
  };

  const signout = (req, res) => {
    console.log("👋 Logging out:", req.session.currentUser?.username);
    req.session.destroy();
    res.sendStatus(200);
  };

  const profile = (req, res) => {
    console.log("💡 /profile called");
    console.log("👉 Session:", req.session);
    const user = req.session.currentUser;
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  };

  const findCurrentUserCourses = (req, res) => {
    const user = req.session.currentUser;
    console.log("📚 /current/courses request for:", user?.username);
    if (!user) {
      return res.status(401).json({ error: "Not logged in" });
    }
    res.json(user.courses || []);
  };

  console.log("✅ Registering user routes...");
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
