import mongoose from "mongoose";

const schema = new mongoose.Schema({
  nuzlockes: [{ type: String }],
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true }
});

export default module.exports = mongoose.model("User", schema);
