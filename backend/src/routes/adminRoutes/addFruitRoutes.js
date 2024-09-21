import Fruits from "../../models/Fruits.models.js";
import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url"; // To work with file paths in ES modules
import { log } from "console";

const router = express.Router();

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure 'uploads' directory exists or create it
// Use absolute path for the uploads folder
const uploadDir = path.join(process.cwd(), 'src', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/'); // Save files to the 'uploads/' directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Use timestamp for unique filenames
    }
});

const upload = multer({ storage });

// POST route to handle adding a fruit with a file upload
router.post('/add-fruits', upload.single('photo'), async (req, res) => {
    try {
        // console.log('File:', req.headers.file);  // Log to check if file is being received
        // console.log('Body:', req.body);  // Log to check the body data

        const { name, price, quantity, nutritions } = req.body;
        const photo = req.file ? req.file.path : null;

        if (!name || !price || !quantity || !nutritions || !photo) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const newFruit = new Fruits({
            name,
            price,
            quantity,
            nutritions,
            photo
        });

        await newFruit.save();
        res.status(201).json({ message: "You have successfully added a new fruit" });
    } catch (error) {
        console.error("Error saving fruit:", error); // Log the actual error for debugging
        res.status(500).json({ message: "An error occurred while adding the fruit" });
    }
});

export default router;
