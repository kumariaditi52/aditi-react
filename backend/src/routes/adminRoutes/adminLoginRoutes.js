import express from "express";
import Admin from "../../models/Admin.models.js";
import bcrypt from "bcrypt";

const router = express.Router();
router.post("/adminlogin", async (req, res) => {
    const { usernameid, password } = req.body;
    // await console.log(usernameid, password)
    try {
        const admin = await Admin.findOne({ username_id: usernameid });
        if (!admin) return res.status(400).json({ message: "admin doesn't exist" });
        const isMatch = await bcrypt.compare(password, admin.admin_password);
        if (!isMatch) return res.status(400).json({ message: "invalid Password" });
        // console.log(err)
        res.status(200).json({ message: "login success" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "server error" })
    }
})

export default router;