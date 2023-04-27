import { Request, Response } from "express";
import User from "../models/User";
import { sign } from "jsonwebtoken";

export async function login(req: Request, res: Response) {
  const username = req.body.username;
  const user = await User.findOne({ username });

  if (!user || (user.password !== req.body.password)) {
    return res.status(404).send({ msg: "Invalid credentials" });
  }

  try {
    const token = sign({ _id: user._id, username: user.username }, process.env.TOKEN_KEY, { expiresIn: "1d" });
    res.status(200).send({ token, msg: "User found" });
  } catch (error) {
    res.status(500).send({ error, msg: "An error occurred during the login" });
  }
}

export async function session(req: Request, res: Response) {
  res.status(200).send({ msg: "Session active" });
}