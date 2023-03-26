import { Request, Response } from "express";
import Nuzlocke from "../models/Nuzlocke";
import Pokemon from "../models/Pokemon";

export async function addPokemon(req: Request, res: Response) {
  //const decodedToken = verify(req.header("Authorization"), "pndb_v2")

  try {
    const newPokemon = new Pokemon(req.body);
    const nuzlocke = await Nuzlocke.findOne({ _id: req.params.nuzlockeId });
    nuzlocke.pokemon.push(newPokemon);
    await nuzlocke.save();
    res.status(200).send({ nuzlocke, msg: "Pokemon added" });
  } catch (error) {
    res.status(500).send({ error, msg: "An error occurred during the addition" });
  }
}

export async function updatePokemon(req: Request, res: Response) {
  //const decodedToken = verify(req.header("Authorization"), "pndb_v2")

  try {
    const nuzlocke = await Nuzlocke.findOne({ _id: req.params.nuzlockeId });
    nuzlocke.pokemon.id(req.params.pokemonId).set(req.body);
    await nuzlocke.save();
    res.status(200).send({ nuzlocke, msg: "Pokemon updated" });
  } catch (error) {
    res.status(500).send({ error, msg: "An error occurred during the update" });
  }
}

export async function deletePokemon(req: Request, res: Response) {
  //const decodedToken = verify(req.header("Authorization"), "pndb_v2")

  try {
    const nuzlocke = await Nuzlocke.findOne({ _id: req.params.nuzlockeId });
    nuzlocke.pokemon.id(req.params.pokemonId).remove();
    await nuzlocke.save();
    res.status(200).send({ nuzlocke, msg: "Pokemon delete" });
  } catch (error) {
    res.status(500).send({ error, msg: "An error occurred during the delete" });
  }
}