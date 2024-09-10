import express from 'express';
import cors from 'cors';

// importing db
import connectDb from './src/connectDB/db.js';

//importing handlers
import { signupHandler, verifyOtpHandler } from './src/handlers/handlers.js';
import fruitsRoutes from "./src/routes/fruitsRoutes.js";
import cartRoutes from "./src/routes/addcartRoutes.js";
import showcartRoutes from "./src/routes/showcartRoutes.js";
import deleteItemRoutes from "./src/routes/deleteItemRoutes.js";
import showCartCountRoutes from "./src/routes/showCartCountRoutes.js";
import quantityChangethroughButton from "./src/routes/quantityChangethroughButton.js";
import userProfileRoutes from "./src/routes/userProfileRoutes.js";

import adminRoutes from "./src/routes/adminRoutes/adminSignRoutes.js";

const app = express(); // initializing
const PORT = process.env.PORT || 3000;

//connect the database
connectDb();

//middlewares
app.use(cors());
app.use(express.json());

app.use(fruitsRoutes);
app.use(cartRoutes); // to save the cart from user

app.post("/api/signup", signupHandler);
app.post("/api/verify", verifyOtpHandler);

app.use("/api", showcartRoutes); // show cart page
app.use("/api", deleteItemRoutes); //  delete cart items from cart
app.use("/api", showCartCountRoutes); //  show total count in cart
app.use("/api", quantityChangethroughButton);
app.use("/api", userProfileRoutes);


//admin routes
app.use("/api", adminRoutes);

app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}`);
});