// import mongoose from "mongoose";
import Fruits from "../models/Fruits.models.js";
import express from "express";

const router = express.Router();

router.get("/api/fruits", async (req, res) => {
    try {
        const fruits = await Fruits.find(); //fetching all fruits from DB
        res.json(fruits)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export default router;