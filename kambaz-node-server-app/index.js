import express from "express";
import session from "express-session";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import Lab5 from "./Lab5/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz"
mongoose.connect(CONNECTION_STRING);
const app = express();

// ✅ Middleware
app.use(cors({
               credentials: true,
               origin: "http://localhost:5173", // ✅ MUST match exactly
             }));


const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: "lax", // 🔥 this is the magic
    secure: false,   // for localhost, must be false
  },
};

if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie.domain = process.env.NODE_SERVER_DOMAIN;
}

app.use(cookieParser());
app.use(session(sessionOptions));
app.use(express.json());


// ✅ Routes
Lab5(app);
UserRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);
ModuleRoutes(app);
EnrollmentRoutes(app);

app.use((req, res, next) => {
  console.log("Unhandled route hit:", req.method, req.url);
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome to Full Stack Development!");
});

app.listen(4000, () => {
  console.log("Server running at http://localhost:4000");
});

