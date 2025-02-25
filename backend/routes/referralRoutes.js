const express = require("express");
const { PrismaClient } = require("@prisma/client");
const nodemailer = require("nodemailer");

const prisma = new PrismaClient();
const router = express.Router();

router.post("/submit-referral", async (req, res) => {
  try {
    const { referrerName, referrerEmail, refereeName, refereeEmail, refereePhone } = req.body;

    if (!referrerName || !referrerEmail || !refereeName || !refereeEmail || !refereePhone) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Generate a referral code
    const referralCode = "REF" + Math.floor(100000 + Math.random() * 900000);

    // Save referral in the database
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

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: referrerEmail,
      subject: "Your Referral Code",
      text: `Hello ${referrerName},\n\nYour referral code is: ${referralCode}.\nShare this with your friend for rewards!\n\nThank you!`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ referralCode });

  } catch (error) {
    console.error("Error submitting referral:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
