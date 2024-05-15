import mongoose from "mongoose";

const schema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  creationDate: { type: Date, required: true },
  updateDate: { type: Date, required: true }
});

export default module.exports = mongoose.model("User", schema);
