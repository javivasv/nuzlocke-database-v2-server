import { Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";
import { createTransport } from "nodemailer";
import bcrypt from "bcryptjs";
import User from "../models/User";

export async function login(req: Request, res: Response) {
  const email = req.body.email;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(404).send({ msg: "Invalid credentials" });
  }

  try {
    const token = sign({ _id: user._id, email: user.email, username: user.username }, process.env.TOKEN_KEY, { expiresIn: "1d" });
    res.status(200).send({ token, msg: "User found" });
  } catch (error) {
    res.status(500).send({ error, msg: "An error occurred during the login" });
  }
}

export async function session(req: Request, res: Response) {
  res.status(200).send({ msg: "Session active" });
}

export async function forgotPassword(req: Request, res: Response) {
  const email = req.body.email;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send({ msg: 'User not found' });
  }

  try {
    const resetToken = sign({ _id: user._id, email: user.email }, process.env.TOKEN_KEY, { expiresIn: '10m' });

    let transporter = createTransport({
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
      },
      service: "gmail",
    });

    const mailOptions = {
      from: process.env.EMAIL,
      subject: `Reset password`,
      text: `http://localhost:8080/reset-password/${resetToken}`,
      to: [user.email]
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send({ msg: 'Reset email sent successfully' });
  } catch (error) {
    res.status(500).send({ error, msg: "An error occurred sending the reset email" });
  }
}

export function validateResetToken(req: Request, res: Response) {
  const token = req.body.resetToken;

  try {
    verify(token, process.env.TOKEN_KEY);
    res.status(200).send({ msg: "Valid reset token" });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(401).send({ error, msg: "Reset token expired" });
    } else if (error.name === "JsonWebTokenError") {
      res.status(404).send({ error, msg: "Invalid token" });
    } else {
      res.status(500).send({ error, msg: "Server error" });
    }
  }
}
