import mongoose from "mongoose";
// import bcrypt from "bcrypt";

const adminSchema = new mongoose.Schema({
    username_id: {
        type: String,
        required: true,
        unique: true,
    },
    admin_password: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
    }
})

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;