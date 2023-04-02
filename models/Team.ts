import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  pokemon: [{ type: mongoose.SchemaTypes.ObjectId }]
});

export default module.exports = mongoose.model("Team", schema);
