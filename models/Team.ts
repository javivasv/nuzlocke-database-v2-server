import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  pokemon: [{
    id: { type: mongoose.SchemaTypes.ObjectId },
    item: {
      sprite: { type: String },
      codedName: { type: String },
      formattedName: { type: String },
    },
    moves: {
      first: {
        codedName: { type: String },
        formattedName: { type: String },
        class: { type: String },
        type: { type: String },
      },
      second: {
        codedName: { type: String },
        formattedName: { type: String },
        class: { type: String },
        type: { type: String },
      },
      third: {
        codedName: { type: String },
        formattedName: { type: String },
        class: { type: String },
        type: { type: String },
      },
      fourth: {
        codedName: { type: String },
        formattedName: { type: String },
        class: { type: String },
        type: { type: String },
      },
    }
  }]
});

export default module.exports = mongoose.model("Team", schema);
