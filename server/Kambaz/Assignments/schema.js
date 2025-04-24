import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    _id: String,
    title: { type: String, required: true },
    description: { type: String, required: true },
    course: { type: String, ref: "CourseModel" },
    points: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    availableFrom: { type: Date, required: true },
    availableUntil: { type: Date, required: true },
  },
  { collection: "assignments" }
);

export default assignmentSchema; 