import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

export function validateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header("Authorization");

  try {
    verify(token, process.env.TOKEN_KEY);
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(401).send({ error, msg: "Session expired" });
    } else if (error.name === "JsonWebTokenError") {
      res.status(404).send({ error, msg: "Invalid token" });
    }

    res.status(500).send({ error, msg: "Server error" });
  }
}
