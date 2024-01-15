import mongoose from "mongoose";

const schema = new mongoose.Schema({
  originalSpecies: { type: Boolean, required: true },
  species: {
    codedName: { type: String, required: true },
    formattedName: { type: String, required: true },
  },
  nickname: { type: String },
  location: { type: String, required: true },
  obtained: { enum: ["caught", "gifted", "hatched", "traded", "not"], type: String, required: true },
  sprite: { type: String },
  fainted: { type: Boolean, required: true },
  types: {
    first: { enum: ["normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost", "steel", "fire", "water", "grass", "electric", "psychic", "ice", "dragon", "dark", "fairy"], type: String, required: true },
    second: { enum: ["", "normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost", "steel", "fire", "water", "grass", "electric", "psychic", "ice", "dragon", "dark", "fairy"], type: String },
  },
  originalAbility: { type: Boolean, required: true },
  ability: {
    codedName: { type: String },
    formattedName: { type: String },
  },
  obtainedAs: {
    sprite: { type: String },
    species: {
      codedName: { type: String, required: true },
      formattedName: { type: String, required: true },
    },
    ability: {
      codedName: { type: String },
      formattedName: { type: String },
    },
    types: {
      first: { enum: ["normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost", "steel", "fire", "water", "grass", "electric", "psychic", "ice", "dragon", "dark", "fairy"], type: String, required: true },
      second: { enum: ["", "normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost", "steel", "fire", "water", "grass", "electric", "psychic", "ice", "dragon", "dark", "fairy"], type: String },
    },
  }
});

export default module.exports = mongoose.model("Pokemon", schema);
