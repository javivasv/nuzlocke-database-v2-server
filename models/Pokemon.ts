import mongoose from "mongoose";

const schema = new mongoose.Schema({
  species: {
    codedSpecies: { type: String, required: true },
    formattedSpecies: { type: String, required: true },
  },
  nickname: { type: String },
  location: { type: String, required: true },
  obtained: { enum: ["caught", "gifted", "hatched", "traded", "not"], type: String, required: true },
  original: { type: Boolean, required: true },
  sprite: { type: String },
  fainted: { type: Boolean, required: true }
});

export default module.exports = mongoose.model("Pokemon", schema);
