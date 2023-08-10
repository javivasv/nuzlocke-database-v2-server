import { Request, Response } from "express";
import { createTransport } from "nodemailer";

export async function sendSuggestion(req: Request, res: Response) {
  try {
    let transporter = createTransport({
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
      },
      service: "gmail",
    });

    const mailOptions = {
      from: process.env.EMAIL,
      subject: `${req.body.name} - Suggestion`,
      text: req.body.text,
      to: [process.env.EMAIL]
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send({ msg: "Suggestion sent successfully" });
  } catch (error) {
    res.status(500).send({ error, msg: "An error occurred sending the suggestion" });
  }
}