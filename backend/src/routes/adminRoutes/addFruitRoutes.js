import Fruits from "../../models/Fruits.models.js";
import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url"; // For handling file paths in ES modules

const router = express.Router();

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the uploads directory path
const uploadDir = path.join(process.cwd(), 'src', 'uploads');

// Ensure 'uploads' directory exists or create it
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Save files to the 'src/uploads/' directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Use timestamp for unique filenames
    }
});

// Initialize multer with the defined storage
const upload = multer({ storage });

// POST route to handle adding a fruit with a file upload
router.post('/add-fruits', upload.single('photo'), async (req, res) => {
    try {
        const { name, price, quantity, nutritions } = req.body;
        const photo = req.file ? req.file.path.replace(/\\/g, '/') : null; // Normalize path for MongoDB

        // Validate required fields
        if (!name || !price || !quantity || !nutritions || !photo) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        // Create a new fruit entry
        const newFruit = new Fruits({
            name,
            price,
            quantity,
            nutritions,
            photo
        });

        // Save the fruit to the database
        await newFruit.save();
        res.status(201).json({ message: "You have successfully added a new fruit" });
    } catch (error) {
        console.error("Error saving fruit:", error); // Log the actual error for debugging
        res.status(500).json({ message: "An error occurred while adding the fruit" });
    }
});

export default router;
