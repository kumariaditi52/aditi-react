import mongoose from "mongoose";
import Admin from "../../models/Admin.models.js";
import express from "express";

const router = express.Router();

router.post("/adminlogin", async (req, res) => {
    const {usernameid, password} = req.body;
    console.log(usernameid, password)
})

export default router;