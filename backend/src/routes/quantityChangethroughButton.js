import express from 'express';
import Cart from '../models/cart.models.js';

const router = express.Router();

router.post("/handleQuantity", async (req, res) => {
    try {
        const { userId, fruitId, action } = req.body;

        if (!userId || !fruitId || !action) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Find the user's cart
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Find the item in the cart's items array
        const item = cart.items.find(item => item.fruitId.toString() === fruitId);

        if (!item) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        // Adjust the quantity based on the action
        if (action === "increment") {
            item.quantity += 1;
        } else if (action === "decrement") {
            item.quantity -= 1;

            // Prevent negative quantity
            if (item.quantity < 0) {
                item.quantity = 0;
            }
        } else {
            return res.status(400).json({ message: "Invalid action" });
        }

        // Save the updated cart back to the database
        await cart.save();

        // Populate the items with fruit details
        await cart.populate('items.fruitId');

        // Log the populated items to verify correctness
        console.log("Updated cart items:", cart.items);

        // Respond with the updated items
        return res.status(200).json({ items: cart.items });
    } catch (error) {
        console.error("Error handling quantity:", error);
        return res.status(500).json({ message: "Server error" });
    }
});
export default router;
