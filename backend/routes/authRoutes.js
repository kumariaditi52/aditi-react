const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

const { registerUser, loginUser, verifyOTP } = require('../controllers/authController');

const User = require('../models/User'); // Add this at the top

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                message: 'User already exists' 
            });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000);
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

        // Create new user
        const newUser = new User({
            name,
            email,
            password,
            otp,
            otpExpiry,
            isVerified: false
        });

        // Save user to database
        await newUser.save();

        // Send OTP email
        await sendEmail(
            email,
            'Email Verification OTP',
            `Your OTP for email verification is: ${otp}`
        );

        res.status(201).json({
            success: true,
            message: 'Registration successful. Please verify your email with OTP.'
        });

    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error during registration' 
        });
    }
});


router.post('/login', loginUser);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);
router.post('/verify-otp', authController.verifyOTP);

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/verify-otp', authController.verifyOTP);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);


router.post('/test-email', async (req, res) => {
    try {
        await sendEmail(req.body.email, "Test Email", "This is a test email");
        res.json({ message: "Test email sent successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;
    
    try {
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: 'User not found' 
            });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid OTP' 
            });
        }

        if (user.otpExpiry < Date.now()) {
            return res.status(400).json({ 
                success: false, 
                message: 'OTP has expired' 
            });
        }

        // Mark user as verified and clear OTP data
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.status(200).json({ 
            success: true,
            message: 'Email verified successfully' 
        });
        
    } catch (error) {
        console.error('OTP Verification Error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error during verification' 
        });
    }
});

module.exports = router;

