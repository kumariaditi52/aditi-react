import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    otp: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verficationToken: {
        type: String,
    },
    token: {
        type: String,
    },
});

const User = mongoose.model("User", UserSchema)
export default User;