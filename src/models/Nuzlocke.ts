import mongoose from "mongoose";
import Pokemon from "./Pokemon"
import Team from "./Team"

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  game: { type: String, required: true },
  description: { type: String },
  status: { enum: ["started", "completed", "lost"], type: String, required: true },
  user: { type: mongoose.SchemaTypes.ObjectId, required: true },
  pokemon: [Pokemon.schema],
  teams: [Team.schema],
  creationDate: { type: Date, required: true },
  updateDate: { type: Date, required: true }
});

export default module.exports = mongoose.model("Nuzlocke", schema);
