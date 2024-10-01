// import mongoose from "mongoose";
import Admin from "../../models/Admin.models.js";
import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/adminsignup", async (req, res) => {
    const { usernameid, password } = req.body;
    // console.log(usernameid, password)
    const username_id = usernameid;

    try {
        const admin = await Admin.findOne({ username_id: usernameid });
        if (admin) {
            return res.status(400).json({ message: "admin already exist" });
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newAdmin = new Admin({ username_id, admin_password: hashedPassword });
        await newAdmin.save();
        res.status(201).json({ message: "admin created successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error", error: error.message });
    }
})

export default router;