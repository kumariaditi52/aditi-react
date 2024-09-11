import express from "express";
import Admin from "../../models/Admin.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

// const generateAccessToken = (admin) => {
//     // return jwt.sign({ id: admin._id }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" })
//     return jwt.sign({ id: admin._id }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" })
// }
const generateRefreshToken = (admin) => {
    return jwt.sign({ id: admin._id }, REFRESH_TOKEN_SECRET)
}

router.post("/adminlogin", async (req, res) => {
    const { usernameid, password } = req.body;
    // await console.log(usernameid, password)
    try {
        const admin = await Admin.findOne({ username_id: usernameid });
        if (!admin) return res.status(400).json({ message: "admin doesn't exist" });
        const isMatch = await bcrypt.compare(password, admin.admin_password);
        if (!isMatch) return res.status(400).json({ message: "invalid Password" });

        // const accessToken = generateAccessToken(admin);
        const adminToken = generateRefreshToken(admin);
        admin.refreshToken = adminToken
        await admin.save();

        res.cookie('adminToken', adminToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        }
        )

        // console.log(err)
        res.status(200).json({ message: "login success", adminToken });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "server error" })
    }
})

export default router;