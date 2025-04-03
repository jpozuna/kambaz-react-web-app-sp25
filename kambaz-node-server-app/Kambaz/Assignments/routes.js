import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  const findAllAssignments = async (req, res) => {
    try {
      const assignments = await dao.findAllAssignments();
      res.json(assignments);
    } catch (error) {
      res.status(500).json({ error: "Failed to find assignments" });
    }
  };

  const findAssignmentsForCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const assignments = await dao.findAssignmentsForCourse(courseId);
      res.json(assignments);
    } catch (error) {
      res.status(500).json({ error: "Failed to find assignments" });
    }
  };

  const createAssignment = async (req, res) => {
    try {
      if (!req.session.currentUser) {
        res.status(401).json({ error: "User not logged in" });
        return;
      }
      const assignment = await dao.createAssignment(req.body);
      res.json(assignment);
    } catch (error) {
      res.status(500).json({ error: "Failed to create assignment" });
    }
  };

  const updateAssignment = async (req, res) => {
    try {
      if (!req.session.currentUser) {
        res.status(401).json({ error: "User not logged in" });
        return;
      }
      const { assignmentId } = req.params;
      const assignment = await dao.updateAssignment(assignmentId, req.body);
      if (!assignment) {
        res.status(404).json({ error: "Assignment not found" });
        return;
      }
      res.json(assignment);
    } catch (error) {
      res.status(500).json({ error: "Failed to update assignment" });
    }
  };

  const deleteAssignment = async (req, res) => {
    try {
      if (!req.session.currentUser) {
        res.status(401).json({ error: "User not logged in" });
        return;
      }
      const { assignmentId } = req.params;
      const success = await dao.deleteAssignment(assignmentId);
      if (!success) {
        res.status(404).json({ error: "Assignment not found" });
        return;
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete assignment" });
    }
  };

  app.get("/api/assignments", findAllAssignments);
  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.post("/api/assignments", createAssignment);
  app.put("/api/assignments/:assignmentId", updateAssignment);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
} 