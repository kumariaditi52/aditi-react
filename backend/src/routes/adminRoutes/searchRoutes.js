import express from "express";
import Admin from "../../models/Admin.models.js";
import Fruits from "../../models/Fruits.models.js";
import jwt from "jsonwebtoken";
const router = express.Router();

router.get("/search", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]; //authorization header
    if (!token) return res.status(401).json({ message: "Token Missing" });
    try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const admin = await Admin.findById(decoded.id);
        if (!admin) {
            return res.status(403).json({ message: "Admin not found" });
        }
        const searchQuery = req.query.search;
        const results = await Fruits.find({
            name: { $regex: searchQuery, $options: "i" }
        })
        if (results.length === 0) {
            return res.status(404).json({ message: "No results found" });
        }
        return res.json(results);
        // console.log(searchQuery);
    } catch (error) {
        return res.status(500).json({ message: "Invalid token" });
    }
})
export default router;