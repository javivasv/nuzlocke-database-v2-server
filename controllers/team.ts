import { Request, Response } from "express";
import Nuzlocke from "../models/Nuzlocke";
import Team from "../models/Team";
import { verify, JwtPayload } from "jsonwebtoken";

export async function addTeam(req: Request, res: Response) {
  const decodedToken = verify(req.header("Authorization"), "pndb_v2")

  try {
    const newTeam = new Team(req.body);
    const nuzlocke = await Nuzlocke.findOne({ _id: req.params.nuzlockeId, user: (decodedToken as JwtPayload)._id }).orFail(new Error("AccessDenied"));
    nuzlocke.teams.push(newTeam);
    await nuzlocke.save();
    res.status(200).send({ nuzlocke, msg: "Team added successfully" });
  } catch (error) {
    if (error.message === "AccessDenied") {
      res.status(403).send({ error, msg: "Access denied" });
    } else {
      res.status(500).send({ error, msg: "An error occurred during the addition" });
    }
  }
}

export async function updateTeam(req: Request, res: Response) {
  const decodedToken = verify(req.header("Authorization"), "pndb_v2")

  try {
    const nuzlocke = await Nuzlocke.findOne({ _id: req.params.nuzlockeId, user: (decodedToken as JwtPayload)._id }).orFail(new Error("AccessDenied"));
    nuzlocke.teams.id(req.params.teamId).set(req.body);
    await nuzlocke.save();
    res.status(200).send({ nuzlocke, msg: "Team updated successfully" });
  } catch (error) {
    if (error.message === "AccessDenied") {
      res.status(403).send({ error, msg: "Access denied" });
    } else {
      res.status(500).send({ error, msg: "An error occurred during the update" });
    }
  }
}

/*
export async function deleteTeam(req: Request, res: Response) {
  const decodedToken = verify(req.header("Authorization"), "pndb_v2")

  try {
    const nuzlocke = await Nuzlocke.findOne({ _id: req.params.nuzlockeId, user: (decodedToken as JwtPayload)._id }).orFail(new Error("AccessDenied"));
    nuzlocke.pokemon.id(req.params.pokemonId).remove();
    await nuzlocke.save();
    res.status(200).send({ nuzlocke, msg: "Pokemon deleted successfully" });
  } catch (error) {
    if (error.message === "AccessDenied") {
      res.status(403).send({ error, msg: "Access denied" });
    } else {
      res.status(500).send({ error, msg: "An error occurred during the delete" });
    }
  }
}
*/