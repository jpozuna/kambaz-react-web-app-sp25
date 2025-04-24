import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  credits: { type: Number, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  modules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Module" }],
}, { timestamps: true });

const model = mongoose.model("Course", courseSchema);
export default model; 