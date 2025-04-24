import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentsDao from "../Assignments/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) {
  const findUsersForCourse = async (req, res) => {
    const {cid} = req.params;
    const users = await enrollmentsDao.findUsersForCourse(cid);
    res.json(users);
  };
  app.get("/api/courses/:cid/users", findUsersForCourse);

  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await dao.findAllCourses();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch courses" });
    }
  });

  app.get("/api/courses/:courseId", async (req, res) => {
    try {
      const course = await dao.findCourseById(req.params.courseId);
      if (!course) {
        res.status(404).json({ error: "Course not found" });
        return;
      }
      res.json(course);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch course" });
    }
  });

  app.post("/api/courses", async (req, res) => {
    try {
      const course = await dao.createCourse(req.body);
      const currentUser = req.session["currentUser"];
      if (currentUser) {
        await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id);
      }
      res.json(course);
    } catch (error) {
      res.status(500).json({ error: "Failed to create course" });
    }
  });

  app.put("/api/courses/:courseId", async (req, res) => {
    try {
      const course = await dao.updateCourse(req.params.courseId, req.body);
      res.json(course);
    } catch (error) {
      res.status(500).json({ error: "Failed to update course" });
    }
  });

  app.delete("/api/courses/:courseId", async (req, res) => {
    try {
      const { courseId } = req.params;
      const status = await dao.deleteCourse(courseId);
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: "Failed to delete course" });
    }
  });

  app.get("/api/courses/:courseId/modules", async (req, res) => {
    const {courseId} = req.params;
    const modules = await modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  });

  app.post("/api/courses/:courseId/modules", async (req, res) => {
    const {courseId} = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = await modulesDao.createModule(module);
    res.send(newModule);
  });

  app.get("/api/courses/:courseId/Assignments", async (req, res) => {
    const {courseId} = req.params;
    const assignments = await assignmentsDao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  })

  app.post("/api/courses/:courseId/Assignments", async (req, res) => {
    const {courseId} = req.params;
    const assignment = {
      ...req.body,
      course: courseId,
    };
    const newAssignment = await assignmentsDao.createAssignment(assignment);
    res.send(newAssignment);
  });

  app.post("api/courses/:courseId", async (req, res) => {
    const {userId, courseId} = req.body;
    await enrollmentsDao.enrollUserInCourse(userId, courseId);
    res.send({status: "enrolled"});
  });

  app.delete("api/courses/:courseId", async (req, res) => {
    const {userId, courseId} = req.body;
    await enrollmentsDao.unenrollUserInCourse(userId, courseId);
    res.send({status: "unenrolled"});
  });

  app.get("/api/users/:userId/enrollments", async (req, res) => {
    const {userId} = req.params;
    const enrollments = await enrollmentsDao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  });
}