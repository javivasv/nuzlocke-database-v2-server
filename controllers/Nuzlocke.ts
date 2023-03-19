import { Request, Response } from "express";
import Nuzlocke from "../models/Nuzlocke";
import { verify, JwtPayload } from "jsonwebtoken";

export async function getNuzlockes(req: Request, res: Response) {
  try {
    const nuzlockes = await Nuzlocke.find();
    res.status(200).send({ nuzlockes, msg: "Nuzlockes found" });
  } catch (error) {
    res.status(500).send({ error, msg: "An error occurred during the process" });
  }
}

export async function createNuzlocke(req: Request, res: Response) {
  const decodedToken = verify(req.header("Authorization"), "pndb_v2")

  const data = {
    ...req.body,
    user: (decodedToken as JwtPayload)._id,
    status: "started",
    pokemon: [],
  };

  try {
    const newNuzlocke = new Nuzlocke(data);
    await newNuzlocke.save();
    const nuzlockes = await Nuzlocke.find();
    res.status(200).send({ nuzlockes, msg: "Nuzlocke created" });
  } catch (error) {
    res.status(500).send({ error, msg: "An error occurred during the creation" });
  }
}