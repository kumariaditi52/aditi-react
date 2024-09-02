import mongoose from "mongoose";

const fruitsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    nutritions: {
        type: String,
    },
    photo: {
        type: String,
        required: true,
    },
});

const Fruits = mongoose.model("Fruits", fruitsSchema);
export default Fruits;