import { Request, Response } from "express";
import Nuzlocke from "../models/Nuzlocke";

export async function getNuzlockes(req: Request, res: Response) {
  try {
    const nuzlockes = await Nuzlocke.find();
    res.status(200).send({ nuzlockes, msg: "Nuzlockes found" });
  } catch (error) {
    res.status(500).send({ error, msg: "An error occurred during the process" });
  }
}

export async function createNuzlocke(req: Request, res: Response) {
  try {
    const newNuzlocke = new Nuzlocke(req.body);
    await newNuzlocke.save();
    res.status(200).send({ msg: "Nuzlocke created" });
  } catch (error) {
    res.status(500).send({ error, msg: "An error occurred during the creation" });
  }
}