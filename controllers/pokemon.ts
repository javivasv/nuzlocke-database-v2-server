import { Request, Response } from "express";
import Nuzlocke from "../models/Nuzlocke";
import { verify, JwtPayload } from "jsonwebtoken";

export async function addPokemon(req: Request, res: Response) {
  //const decodedToken = verify(req.header("Authorization"), "pndb_v2")

  try {
    const nuzlocke = await Nuzlocke.findOne({ _id: req.params.id });
    nuzlocke.pokemon.push(req.body);
    await nuzlocke.save();
    res.status(200).send({ nuzlocke, msg: "Pokemon added" });
  } catch (error) {
    res.status(500).send({ error, msg: "An error occurred during the addition" });
  }
}