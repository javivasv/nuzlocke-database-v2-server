import mongoose from "mongoose";
import Pokemon from "./Pokemon"

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  game: { type: String, required: true },
  description: { type: String },
  status: { enum: ["started", "completed", "lost"], type: String, required: true },
  user: { type: String, required: true },
  pokemon: [Pokemon.schema],
});

export default module.exports = mongoose.model("Nuzlocke", schema);
