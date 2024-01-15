import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  vs: { type: String },
  description: { type: String },
  members: [{
    pokemon: {
      id: { type: String },
      sprite: { type: String },
      species: {
        codedName: { type: String },
        formattedName: { type: String },
      }
    },
    item: {
      sprite: { type: String },
      name: {
        codedName: { type: String },
        formattedName: { type: String },
      }
    },
    moves: {
      first: {
        name: {
          codedName: { type: String },
          formattedName: { type: String },
        },
        class: { type: String },
        type: { type: String },
      },
      second: {
        name: {
          codedName: { type: String },
          formattedName: { type: String },
        },
        class: { type: String },
        type: { type: String },
      },
      third: {
        name: {
          codedName: { type: String },
          formattedName: { type: String },
        },
        class: { type: String },
        type: { type: String },
      },
      fourth: {
        name: {
          codedName: { type: String },
          formattedName: { type: String },
        },
        class: { type: String },
        type: { type: String },
      },
    }
  }]
});

export default module.exports = mongoose.model("Team", schema);
