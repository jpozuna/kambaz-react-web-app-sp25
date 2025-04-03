import express from "express";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import UserRoutes from "./Kambaz/Users/routes.js";
import session from "express-session";
import "dotenv/config";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";

const app = express();
UserRoutes(app);
app.use(
    cors({
      credentials: true,
      origin: process.env.NETLIFY_URL || "http://localhost:5173",
    })
  );
  const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
  };
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
      domain: process.env.NODE_SERVER_DOMAIN,
    };
  }
  app.use(session(sessionOptions));
  app.use(express.json()); // make sure this is configure BEFORE all the routes below
Lab5(app);
UserRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);
ModuleRoutes(app);
EnrollmentRoutes(app);
app.listen(4000);

