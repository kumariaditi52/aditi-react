import express from 'express';
import Cart from '../models/cart.models.js'; // Ensure the path is correct

const router = express.Router();

router.delete('/deleteItem', async (req, res) => {
    //  console.log("Working ROutes")
    const { userId, itemId } = req.body;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart user not found" });
        }
        cart.items = cart.items.filter(item => item._id.toString() !== itemId);
        await cart.save();

        res.status(200).json({ message: "Workign perfectfully" });
    } catch (error) {
        res.status(500).json({ meaasge: "Not working anymore from the deleteRoutes.js" })
    }

});


export default router;