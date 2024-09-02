import express from 'express';
import Cart from '../models/cart.models.js';

const router = express.Router();

router.get('/showCartCount', async (req, res) => {
    const userId = req.query.userId;
    // console.log(userId)
    if (!userId) {
        return res.status(400).json("User id is not given")
    }
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            res.status(404).json({ message: "cart not found" })
        }
        const totalItemCount = cart.items.reduce((total, item) => total + item.quantity, 0);
        res.json({ totalItemCount });
    } catch (error) {
        console.log(error, "show cart count backend")
    }
})

export default router;