import { Request, Response } from "express";
import Nuzlocke from "../models/Nuzlocke";
import { verify, JwtPayload } from "jsonwebtoken";

export async function getNuzlockes(req: Request, res: Response) {
  const decodedToken = verify(req.header("Authorization"), process.env.TOKEN_KEY)

  try {
    const nuzlockes = (await Nuzlocke.find({ user: (decodedToken as JwtPayload)._id })).map(nuzlocke => {
      return {
        _id: nuzlocke._id,
        name: nuzlocke.name,
        game: nuzlocke.game,
        status: nuzlocke.status,
      }
    });

    res.status(200).send({ nuzlockes, msg: "Nuzlockes found" });
  } catch (error) {
    res.status(500).send({ error, msg: "An error occurred during the process" });
  }
}

export async function createNuzlocke(req: Request, res: Response) {
  const decodedToken = verify(req.header("Authorization"), process.env.TOKEN_KEY)

  const data = {
    ...req.body,
    user: (decodedToken as JwtPayload)._id,
    status: "started",
    pokemon: [],
  };

  try {
    const newNuzlocke = new Nuzlocke(data);
    await newNuzlocke.save();
    const nuzlockes = (await Nuzlocke.find({ user: (decodedToken as JwtPayload)._id })).map(nuzlocke => {
      return {
        _id: nuzlocke._id,
        name: nuzlocke.name,
        game: nuzlocke.game,
        status: nuzlocke.status,
      }
    });

    res.status(200).send({ nuzlockes, msg: "Nuzlocke created successfully" });
  } catch (error) {
    res.status(500).send({ error, msg: "An error occurred during the creation" });
  }
}

export async function getNuzlocke(req: Request, res: Response) {
  const decodedToken = verify(req.header("Authorization"), process.env.TOKEN_KEY)

  try {
    const nuzlocke = await Nuzlocke.findOne({ _id: req.params.nuzlockeId, user: (decodedToken as JwtPayload)._id }).orFail(new Error("AccessDenied"));
    res.status(200).send({ nuzlocke, msg: "Nuzlocke found" });
  } catch (error) {
    if (error.message === "AccessDenied") {
      res.status(403).send({ error, msg: "Access denied" });
    } else {
      res.status(500).send({ error, msg: "An error occurred during the process" });
    }
  }
}

export async function updateNuzlocke(req: Request, res: Response) {
  const decodedToken = verify(req.header("Authorization"), process.env.TOKEN_KEY)

  try {
    const nuzlocke = await Nuzlocke.findByIdAndUpdate({ _id: req.params.nuzlockeId, user: (decodedToken as JwtPayload)._id }, req.body, { new: true }).orFail(new Error("AccessDenied"));
    res.status(200).send({ nuzlocke, msg: "Nuzlocke updated successfully" });
  } catch (error) {
    if (error.message === "AccessDenied") {
      res.status(403).send({ error, msg: "Access denied" });
    } else {
      res.status(500).send({ error, msg: "An error occurred during the update" });
    }
  }
}

export async function deleteNuzlocke(req: Request, res: Response) {
  const decodedToken = verify(req.header("Authorization"), process.env.TOKEN_KEY)

  try {
    const nuzlocke = await Nuzlocke.findOne({ _id: req.params.nuzlockeId, user: (decodedToken as JwtPayload)._id }).orFail(new Error("AccessDenied"));
    nuzlocke.delete();
    res.status(200).send({ msg: "Nuzlocke deleted successfully" });
  } catch (error) {
    if (error.message === "AccessDenied") {
      res.status(403).send({ error, msg: "Access denied" });
    } else {
      res.status(500).send({ error, msg: "An error occurred during the delete" });
    }
  }
}