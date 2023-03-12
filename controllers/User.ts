import { Request, Response } from "express";
import User from "../models/User";

export async function loginUser(req: Request, res: Response) {
    const username = req.body.username;
    const user = await User.findOne({ username });

    if (!user || (user.password !== req.body.password)) {
        return res.status(404).send({ msg: "Invalid credentials" });
    }

    try {
        res.status(200).send({ user: { username: user.username }, msg: "User found" });
    } catch (error) {
        res.status(500).send({ error, msg: "An error occurred during the login" });
    }
}

export async function getUsers(req: Request, res: Response) {
    const users = await User.find();
    res.send(users);
}

export async function createUser(req: Request, res: Response) {
    const username = req.body.username;
    const user = await User.findOne({ username });

    if (user) {
        return res.status(404).send({ msg: "User already exists" });
    }

    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(200).send({ msg: "User created" });
    } catch (error) {
        res.status(500).send({ error, msg: "An error occurred during the register" });
    }
}