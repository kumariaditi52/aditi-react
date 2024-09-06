import express from "express";
import User from "../models/User.models.js";

const router = express.Router();

router.get("/userProfile", async (req, res) => {
    const userId = req.query.userId;
    // console.log("UserId", userId)
    try {
        const user = await User.findById(userId);
        res.json(user);
    } catch (error) {
        console.log("Catch the error", error)
    }

})

export default router;