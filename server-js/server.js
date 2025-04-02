import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import ejs from "ejs";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { title: "Home Page" });
});

app.get("/email", (req, res) => {
  res.render("email-template", { title: "Email Template" });
});

app.get("/send-email", async (req, res) => {
  try {
    // Render EJS Template
    const emailTemplate = await ejs.renderFile(
      path.join(__dirname, "views", "email-template.ejs"),
      {
        name: "John Doe",
        link: "https://example.com/welcome",
        title: "Email sent"
      }
    );

    // Email Options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "youngstemo18@gmail.com",
      subject: "Welcome to Our Platform!",
      html: emailTemplate,
    };

    // Send Email
    await transporter.sendMail(mailOptions);
    res.send("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email");
  }
});

app.listen(PORT, () => {
  console.log(`✈ http://localhost:${PORT}`);
});
