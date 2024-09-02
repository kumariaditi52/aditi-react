import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [
        {
            fruitId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Fruits",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
            price: {
                type: Number,
                required: true,
            }
        }
    ]
})

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;