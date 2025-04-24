import * as dao from "./dao.js";

let currentUser = null;

export default function UserRoutes(app) {
  const createUser = (req, res) => {
    const user = req.body;
    const newUser = dao.createUser(user);
    res.json(newUser);
  };

  const deleteUser = (req, res) => {
    const userId = req.params.userId;
    dao.deleteUser(userId);
    res.sendStatus(200);
  };

  const findAllUsers = (req, res) => {
    const users = dao.findAllUsers();
    res.json(users);
  };

  const findUserById = (req, res) => {
    const userId = req.params.userId;
    const user = dao.findUserById(userId);
    if (!user) {
      res.status(404).json({ message: `User with ID ${userId} not found` });
      return;
    }
    res.json(user);
  };

  const updateUser = (req, res) => {
    const userId = req.params.userId;
    const user = req.body;
    const updatedUser = dao.updateUser(userId, user);
    if (!updatedUser) {
      res.status(404).json({ message: `User with ID ${userId} not found` });
      return;
    }
    res.json(updatedUser);
  };

  const signup = (req, res) => {
    const user = req.body;
    const existingUser = dao.findUserByUsername(user.username);
    if (existingUser) {
      res.status(400).json({ message: "Username already exists" });
      return;
    }
    const newUser = dao.createUser(user);
    currentUser = newUser;
    res.json(newUser);
  };

  const signin = (req, res) => {
    const { username, password } = req.body;
    const user = dao.findUserByCredentials(username, password);
    if (!user) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }
    currentUser = user;
    res.json(user);
  };

  const signout = (req, res) => {
    currentUser = null;
    res.sendStatus(200);
  };

  const profile = (req, res) => {
    if (!currentUser) {
      res.status(401).json({ message: "Not signed in" });
      return;
    }
    res.json(currentUser);
  };

  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
} 