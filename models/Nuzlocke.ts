import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  game: { type: String, required: true },
  description: { type: String },
  status: { enum: ["started", "completed", "lost"], type: String, required: true },
  user: { type: String, required: true },
  pokemon: [{
      species: { type: String, required: true },
      nickname: { type: String },
      location: { type: String, required: true },
      obtained: { enum: ["caught", "gifted", "hatched", "traded", "not"], type: String, required: true },
      original: { type: Boolean, required: true },
      sprite: { type: String },
      fainted: { type: Boolean, required: true }
  }],
});

export default module.exports = mongoose.model("Nuzlocke", schema);
