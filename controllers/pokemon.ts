import { Request, Response } from "express";
import Nuzlocke from "../models/Nuzlocke";
import Pokemon from "../models/Pokemon";
import { verify, JwtPayload } from "jsonwebtoken";

export async function addPokemon(req: Request, res: Response) {
  const decodedToken = verify(req.header("Authorization"), "pndb_v2")

  try {
    const newPokemon = new Pokemon(req.body);
    const nuzlocke = await Nuzlocke.findOne({ _id: req.params.nuzlockeId, user: (decodedToken as JwtPayload)._id }).orFail(new Error("AccessDenied"));
    nuzlocke.pokemon.push(newPokemon);
    await nuzlocke.save();
    res.status(200).send({ nuzlocke, msg: "Pokemon added" });
  } catch (error) {
    if (error.message === "AccessDenied") {
      res.status(403).send({ error, msg: "Access denied" });
    } else {
      res.status(500).send({ error, msg: "An error occurred during the addition" });
    }
  }
}

export async function updatePokemon(req: Request, res: Response) {
  const decodedToken = verify(req.header("Authorization"), "pndb_v2")

  try {
    const nuzlocke = await Nuzlocke.findOne({ _id: req.params.nuzlockeId, user: (decodedToken as JwtPayload)._id }).orFail(new Error("AccessDenied"));
    nuzlocke.pokemon.id(req.params.pokemonId).set(req.body);
    await nuzlocke.save();
    res.status(200).send({ nuzlocke, msg: "Pokemon updated" });
  } catch (error) {
    if (error.message === "AccessDenied") {
      res.status(403).send({ error, msg: "Access denied" });
    } else {
      res.status(500).send({ error, msg: "An error occurred during the update" });
    }
  }
}

export async function deletePokemon(req: Request, res: Response) {
  const decodedToken = verify(req.header("Authorization"), "pndb_v2")

  try {
    const nuzlocke = await Nuzlocke.findOne({ _id: req.params.nuzlockeId, user: (decodedToken as JwtPayload)._id }).orFail(new Error("AccessDenied"));
    nuzlocke.pokemon.id(req.params.pokemonId).remove();
    await nuzlocke.save();
    res.status(200).send({ nuzlocke, msg: "Pokemon delete" });
  } catch (error) {
    if (error.message === "AccessDenied") {
      res.status(403).send({ error, msg: "Access denied" });
    } else {
      res.status(500).send({ error, msg: "An error occurred during the delete" });
    }
  }
}