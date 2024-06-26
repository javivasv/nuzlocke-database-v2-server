import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";

export async function createUser(req: Request, res: Response) {
  const email = req.body.email;
  const user = await User.findOne({ email });

  if (user) {
    return res.status(404).send({ msg: "User already exists" });
  }

  const salt = bcrypt.genSaltSync(+process.env.SALT);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  const userInfo = {
    email: req.body.email,
    username: req.body.username,
    password: hashedPassword,
    creationDate: new Date(),
    updateDate: new Date(),
  }

  try {
    const newUser = new User(userInfo);
    await newUser.save();
    res.status(200).send({ msg: "User created successfully" });
  } catch (error) {
    res.status(500).send({ error, msg: "An error occurred during the creation" });
  }
}

export async function resetPassword(req: Request, res: Response) {
  const email = req.body.email;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).send({ msg: 'User not found' });
  }

  const salt = bcrypt.genSaltSync(+process.env.SALT);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  try {
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({ msg: "Password updated successfully" });
  } catch (error) {
    res.status(500).send({ error, msg: "An error occurred resetting the password" });
  }
}