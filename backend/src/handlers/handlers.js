import User from "../models/User.models.js";
import nodemailer from "nodemailer";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "free.usage.for.code@gmail.com",
        pass: "gefktrfbtxxzetxo"
    }
})

export const signupHandler = async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(1000 + Math.random() * 9000);

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already existed" });
        }

        const newUser = new User({ email, otp });
        await newUser.save();

        // Send OTP via email
        const mailOptions = {
            from: "free.usage.for.code@gmail.com",
            to: email,
            subject: "Thanks for Signing up. Here is your OTP code",
            text: `The OTP code is ${otp}`
        };

        await transporter.sendMail(mailOptions);
        res.status(201).json({ message: "User Registered Successfully, An OTP has been sent" });

    } catch (error) {
        res.status(500).json({ message: "Failed to process the request", error });
    }
};

export const verifyOtpHandler = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.otp === otp) {
            user.isVerified = true;
            user.otp = null; // Clear OTP
            const token = jwt.sign({ // Generating the JWT token
                email: user.email, isVerified: true, userId: user._id
            }, process.env.JWT_SECRET);

            user.token = token;
            await user.save();

            return res.status(200).json({ message: "OTP verified successfully", token });
        } else {
            return res.status(400).json({ message: "Invalid OTP" });
        }
    } catch (err) {
        console.error("Error during OTP verification:", err); // Log the error
        return res.status(500).json({ message: "Failed to verify user", error: err.message });
    }
};
