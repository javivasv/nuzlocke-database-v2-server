import { Request, Response } from "express";
import Video from "../models/Video";

export async function getVideos(req: Request, res: Response) {
  try {
    const videos = await Video.find();
    res.status(200).send({ videos, msg: "Videos found" });
  } catch (error) {
    res.status(500).send({ error, msg: "An error occurred during the process" });
  }
}