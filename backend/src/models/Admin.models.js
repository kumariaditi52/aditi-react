import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    username_id: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
})

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;