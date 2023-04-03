import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  pokemon: [{
    id: { type: mongoose.SchemaTypes.ObjectId },
    item: {
      name: { type: String },
      sprite: { type: String },
    },
    moves: {
      first: { type: String },
      second: { type: String },
      third: { type: String },
      fourth: { type: String },
    }
  }]
});

export default module.exports = mongoose.model("Team", schema);
