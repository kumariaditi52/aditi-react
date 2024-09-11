import express from "express";
import Admin from "../../models/Admin.models.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

router.post("/adminAuth", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from Bearer header

    if (!token) return res.status(401).json({ message: "Token missing" });

    try {
        const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET);

        // Fetch admin from database using ID from the token
        const admin = await Admin.findById(decoded.id);

        if (!admin) {
            return res.status(403).json({ message: "Admin not found" });
        }

        // Check if the refresh token stored in the database matches the provided token
        if (admin.refreshToken !== token) {
            return res.status(403).json({ message: "Invalid token" });
        }

        res.status(200).json({ isValid: true });
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(403).json({ message: "Invalid or expired token" });
    }
});

export default router;
