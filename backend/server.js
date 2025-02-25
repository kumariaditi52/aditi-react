    const express = require('express');
    const cors = require('cors');
    const session = require('express-session');
    const passport = require('./config/socialAuth');
    const connectDB = require('./config/db');
    const authRoutes = require('./routes/auth');
    require('dotenv').config();

    const app = express();

    // Connect MongoDB
    connectDB();

    // Middleware setup
    app.use(cors({
        origin: "http://localhost:3000",  // Frontend URL
        methods: "GET,POST,PUT,DELETE",
        credentials: true
    }));

    app.use(express.json());
    app.use(session({
        secret: process.env.JWT_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        }
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    // Routes
    app.use('/api/auth', authRoutes);

    // Error handler
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({ message: err.message || 'Something went wrong!' });
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));