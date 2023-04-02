import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  pokemon: [{
    id: { type: mongoose.SchemaTypes.ObjectId },
    item: { type: String },
    moves: [
      { type: String }
    ],
  }]
});

export default module.exports = mongoose.model("Team", schema);
