import { Request, Response } from "express";
import { verify, JwtPayload } from "jsonwebtoken";
import Nuzlocke from "../models/Nuzlocke";
import Pokemon from "../models/Pokemon";

export async function addPokemon(req: Request, res: Response) {
  const decodedToken = verify(req.header("Authorization"), process.env.TOKEN_KEY)

  try {
    const newPokemon = new Pokemon({
      ...req.body,
      obtainedAs: {
        sprite: req.body.sprite,
        species: req.body.species,
        ability: req.body.ability,
        types: req.body.types,
      }
    })

    const nuzlocke = await Nuzlocke.findOne({ _id: req.params.nuzlockeId, user: (decodedToken as JwtPayload)._id }).orFail(new Error("AccessDenied"));
    nuzlocke.pokemon.push(newPokemon);
    await nuzlocke.save();
    res.status(200).send({ nuzlocke, msg: "Pokemon added successfully" });
  } catch (error) {
    if (error.message === "AccessDenied") {
      res.status(403).send({ error, msg: "Access denied" });
    } else {
      res.status(500).send({ error, msg: "An error occurred during the addition" });
    }
  }
}

export async function updatePokemon(req: Request, res: Response) {
  const decodedToken = verify(req.header("Authorization"), process.env.TOKEN_KEY)

  try {
    const nuzlocke = await Nuzlocke.findOne({ _id: req.params.nuzlockeId, user: (decodedToken as JwtPayload)._id }).orFail(new Error("AccessDenied"));
    nuzlocke.pokemon.id(req.params.pokemonId).set(req.body);
    await nuzlocke.save();
    res.status(200).send({ nuzlocke, msg: "Pokemon updated successfully" });
  } catch (error) {
    if (error.message === "AccessDenied") {
      res.status(403).send({ error, msg: "Access denied" });
    } else {
      res.status(500).send({ error, msg: "An error occurred during the update" });
    }
  }
}

export async function deletePokemon(req: Request, res: Response) {
  const decodedToken = verify(req.header("Authorization"), process.env.TOKEN_KEY)

  try {
    const nuzlocke = await Nuzlocke.findOne({ _id: req.params.nuzlockeId, user: (decodedToken as JwtPayload)._id }).orFail(new Error("AccessDenied"));
    
    nuzlocke.teams.forEach(team => {
      let toDeleteMember = team.members.find(member => member.pokemon.id === req.params.pokemonId);

      if (toDeleteMember) {
        toDeleteMember.pokemon.id = "";
      }

    });

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