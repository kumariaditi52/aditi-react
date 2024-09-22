import express from "express";
import Fruits from "../../models/Fruits.models.js";

const router = express.Router();

router.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    // console.log(id, quantity);

    try {
        const updatedFruits = await Fruits.findByIdAndUpdate(id, { quantity }, { new: true });

        if (!updatedFruits) {
            return res.status(404).json({ message: "Fruits Not Found" });
        }

        res.status(200).json({ message: "Fruits Updated Successfully", updatedFruits });
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ message: 'Failed to update product', error });
    }
});

export default router;
