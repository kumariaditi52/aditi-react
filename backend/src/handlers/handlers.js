import User from "../models/User.models.js";
import nodemailer from "nodemailer";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "aditikumari5281@gmail.com", // aditi sing email
        pass: "uhxkmfnqbgioulql" //p[ass]
    }
})

export const signupHandler = async (req, res) => {
    const { email, username } = req.body;
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already existed" });
        }

        const newUser = new User({ email, otp, username });
        await newUser.save();

        // Send OTP via email
        const mailOptions = {
            from: "aditikumari5281@gmail.com", //apka email
            to: email,
            subject: "Thanks for Signing up in Fruitzz...    Here is your OTP code",
            text: `Hey ${username} welcome to the Fruitzz... , Your OTP for verification code is ${otp}`
        };

        await transporter.sendMail(mailOptions);
        res.status(201).json({ message: "User Registered Successfully, An OTP has been sent" });

    } catch (error) {
        res.status(500).json({ message: "Failed to process the request", error });
    }
};

export const verifyOtpHandler = async (req, res) => {
    const { email, otp, username } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        console.log("User found:", user); // Add this log to check the user data

        if (user.otp === otp) {
            user.isVerified = true;
            user.otp = null; // Clear OTP
            const token = jwt.sign({
                email: user.email,
                isVerified: true,
                userId: user._id
            }, process.env.JWT_SECRET);

            user.token = token;
            await user.save();

            console.log("Token generated:", token); // Add this log to check token generation

            return res.status(200).json({ message: "OTP verified successfully", token });
        } else {
            return res.status(400).json({ message: "Invalid OTP" });
        }
    } catch (err) {
        console.error("Error during OTP verification:", err); // Log the error
        return res.status(500).json({ message: "Failed to verify user", error: err.message });
    }
};
