import express from "express";
import Cart from "../models/cart.models.js";
import Fruit from "../models/Fruits.models.js";


const router = express.Router();

// Add to cart
router.post('/api/add-to-cart', async (req, res) => {
    const { userId, fruitId } = req.body;

    if (!userId || !fruitId) {
        return res.status(400).json({ message: "User ID and Fruit ID are required" });
    }

    try {
        // Fetch the fruit details to get the price
        const fruit = await Fruit.findById(fruitId);
        if (!fruit) {
            return res.status(404).json({ message: "Fruit not found" });
        }

        let cart = await Cart.findOne({ userId });

        if (cart) {
            // If cart exists, update it 
            const itemIndex = cart.items.findIndex(item => item.fruitId.toString() === fruitId);

            if (itemIndex > -1) {
                // If item exists, then increase quantity
                cart.items[itemIndex].quantity += 1;
            } else {
                // If it doesn't, add new item
                cart.items.push({ fruitId, price: fruit.price });
            }

            cart = await cart.save();
        } else {
            // Create a new cart for the user
            cart = new Cart({
                userId,
                items: [{ fruitId, price: fruit.price }]
            });
            await cart.save();
        }

        res.status(200).json(cart);
    } catch (err) {
        console.error("Error in CartRoutes:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
