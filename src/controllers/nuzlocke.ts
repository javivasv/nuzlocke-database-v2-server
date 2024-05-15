import { Request, Response } from "express";
import { verify, JwtPayload } from "jsonwebtoken";
import Nuzlocke from "../models/Nuzlocke";

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
    creationDate: new Date(),
    updateDate: new Date(),
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
    const updateNuzlockeData = {
      ...req.body,
      updateDate: new Date(),
    }

    const nuzlocke = await Nuzlocke.findByIdAndUpdate({ _id: req.params.nuzlockeId, user: (decodedToken as JwtPayload)._id }, updateNuzlockeData, { new: true }).orFail(new Error("AccessDenied"));
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