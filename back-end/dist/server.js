"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
require("dotenv").config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware to parse JSON bodies
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// Create a transport for sending emails using your email provider
const transporter = nodemailer_1.default.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "gmail",
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASSWORD,
  },
});
app.post("/send-email", (req, res) => {
  const { subject, message, phone, email, name } = req.body;
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
app.get("/", (req, res) => {
  res.send("Welcome to Manish Gandotra testing domain");
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
