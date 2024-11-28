import express from "express";
import { Request, Response, Application } from "express";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors());
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "gmail",
  auth: {
    user: `speedupyourdreams@gmail.com`,
    pass: `cqwl tzzu smdn jfcj`,
  },
});
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist2/", "index.html"));
});
app.post("/send-email", (req: Request, res: Response): void => {
  const {
    subject,
    message,
    phone,
    email,
    name,
  }: {
    subject: string;
    message: string;
    phone: number;
    email: string;
    name: string;
  } = req.body;

  // Validation for required fields
  if (!subject || !message || !phone || !email || !name) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  // Validate email format
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Invalid email format" });
    return;
  }

  const mailOptions = {
    from: email, // sender address
    to: "manishgandotra@icloud.com", // recipient address
    subject: `${name} wants to connect`, // subject line
    text: `${message}\n\nContact Details:\nName: ${name}\nPhone: ${phone}\nEmail: ${email}`, // Plain text body
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "Error sending email", error });
      return;
    }
    console.log("Email sent: " + info.response);
    res.status(200).json({ message: "Email sent successfully", info });
  });
});
app.get("/api", (req: Request, res: Response): void => {
  res.send("Welcome to Manish Gandotra testing domain");
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
