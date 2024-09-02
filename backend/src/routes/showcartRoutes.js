import mongoose from "mongoose";
// import axios from "axios";
import express from "express";
import Cart from "../models/cart.models.js";

const router = express.Router();

router.get("/showcart", async (req, res) => {
    try {
        const userId = req.query.userId;
        const cartItems = await Cart.find({ userId })
            .populate({
                path: 'items.fruitId',
                model: 'Fruits'
            });

        res.json(cartItems);

    } catch (error) {
        console.log("Catch the error", error)
    }
})

export default router;