import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
  const findAllEnrollments = async (req, res) => {
    try {
      const enrollments = await dao.findAllEnrollments();
      res.json(enrollments);
    } catch (error) {
      res.status(500).json({ error: "Failed to find enrollments" });
    }
  };

  const findEnrollmentsForUser = async (req, res) => {
    try {
      if (!req.session.currentUser) {
        res.status(401).json({ error: "User not logged in" });
        return;
      }
      const enrollments = await dao.findEnrollmentsForUser(req.session.currentUser._id);
      res.json(enrollments);
    } catch (error) {
      res.status(500).json({ error: "Failed to find enrollments" });
    }
  };

  const findEnrollmentsForCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const enrollments = await dao.findEnrollmentsForCourse(courseId);
      res.json(enrollments);
    } catch (error) {
      res.status(500).json({ error: "Failed to find enrollments" });
    }
  };

  const createEnrollment = async (req, res) => {
    try {
      if (!req.session.currentUser) {
        res.status(401).json({ error: "User not logged in" });
        return;
      }
      const { courseId } = req.params;
      const enrollment = await dao.createEnrollment(req.session.currentUser._id, courseId);
      if (!enrollment) {
        res.status(400).json({ error: "User is already enrolled in this course" });
        return;
      }
      res.json(enrollment);
    } catch (error) {
      res.status(500).json({ error: "Failed to create enrollment" });
    }
  };

  const deleteEnrollment = async (req, res) => {
    try {
      if (!req.session.currentUser) {
        res.status(401).json({ error: "User not logged in" });
        return;
      }
      const { courseId } = req.params;
      const success = await dao.deleteEnrollment(req.session.currentUser._id, courseId);
      if (!success) {
        res.status(404).json({ error: "Enrollment not found" });
        return;
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete enrollment" });
    }
  };

  app.get("/api/enrollments", findAllEnrollments);
  app.get("/api/users/enrollments", findEnrollmentsForUser);
  app.get("/api/courses/:courseId/enrollments", findEnrollmentsForCourse);
  app.post("/api/courses/:courseId/enrollments", createEnrollment);
  app.delete("/api/courses/:courseId/enrollments", deleteEnrollment);
} 