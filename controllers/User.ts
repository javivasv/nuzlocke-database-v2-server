import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";

export async function createUser(req: Request, res: Response) {
  const username = req.body.username;
  const user = await User.findOne({ username });

  if (user) {
    return res.status(404).send({ msg: "User already exists" });
  }

  const salt = bcrypt.genSaltSync(+process.env.SALT);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  const userInfo = {
    username: req.body.username,
    password: hashedPassword,
  }

  try {
    const newUser = new User(userInfo);
    await newUser.save();
    res.status(200).send({ msg: "User created successfully" });
  } catch (error) {
    res.status(500).send({ error, msg: "An error occurred during the creation" });
  }
}