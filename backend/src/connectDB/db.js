import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();



const connectDb = async () => {
    try {
        const DB_NAME="EXx";
        const conn = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`MongoDB connected : ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error is occurred on ${error}`);
    }
}

export default connectDb;