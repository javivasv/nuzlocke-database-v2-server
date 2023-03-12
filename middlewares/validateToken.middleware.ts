import * as express from "express";
import jwt from "jsonwebtoken";

export function verifyToken(req: express.Request, res: express.Response, next: express.NextFunction) {
    const token = req.header("authorization");

    if (!token) {
        return res.status(400).send({ msg: "Does not contain the token" });
    }

    try {
        jwt.verify(token, "pndb_token");
        next();
    } catch (error) {
        res.status(404).send({ msg: "Invalid token" });
    }
}
