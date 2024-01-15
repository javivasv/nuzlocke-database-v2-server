import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  channel: { type: String, required: true },
  url: { type: String, required: true, unique: true }
});

export default module.exports = mongoose.model("Video", schema);
