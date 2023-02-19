import { Request, Response } from "express";
import Nuzlocke from "../models/Nuzlocke";

export async function getNuzlockes(req: Request, res: Response) {
    const nuzlockes = await Nuzlocke.find();
    res.send(nuzlockes);
}