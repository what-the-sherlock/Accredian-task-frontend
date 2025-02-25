import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Express and Prisma
const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,  // Your Gmail
    pass: process.env.EMAIL_PASS,  // App password (not Gmail password)
  },
});

// Verify transporter connection
transporter.verify(function (error, success) {
  if (error) {
    console.error("Error with email transporter:", error);
  } else {
    console.log("Email transporter is ready");
  }
});

// API: Submit Referral
app.post("/api/submit-referral", async (req, res) => {
  try {
    const { referrerName, referrerEmail, refereeName, refereeEmail, refereePhone } = req.body;

    // Validate input
    if (!referrerName || !referrerEmail || !refereeName || !refereeEmail || !refereePhone) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // Generate Referral Code
    const referralCode = "REF" + Math.floor(100000 + Math.random() * 900000);

    // Save to Database using Prisma
    const referral = await prisma.referral.create({
      data: {
        referrerName,
        referrerEmail,
        refereeName,
        refereeEmail,
        refereePhone,
        referralCode,
      },
    });

    // Send Referral Email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: refereeEmail,
      subject: "You Have Been Referred!",
      text: `Hi ${refereeName},\n\n${referrerName} has referred you! Use this referral code: ${referralCode}.\n\nBest regards,\naccredian`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Referral submitted successfully!", referralCode });

  } catch (error) {
    console.error("Error submitting referral:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
