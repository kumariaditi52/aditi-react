const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/email');

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        user = new User({
            name,
            email,
            password: hashedPassword
        });

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000);
        user.otp = otp;
        user.otpExpiry = Date.now() + 600000; // 10 minutes

        await user.save();

        // Send OTP email
        await sendEmail(
            email,
            'Email Verification OTP',
            `Your OTP for registration is: ${otp}`
        );

        res.status(201).json({ message: "Registration successful. Please check your email for OTP." });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: "Registration failed", error: error.message });
    }
};

const generateOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const otp = Math.floor(100000 + Math.random() * 900000);
        
        // Store OTP in database or cache
        await User.findOneAndUpdate(
            { email }, 
            { otp, otpExpiry: Date.now() + 600000 }, // 10 minutes expiry
            { upsert: true }
        );

        // Send OTP via email
        await sendEmail(
            email,
            'Email Verification OTP',
            `Your OTP for email verification is: ${otp}`
        );

        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ 
            email,
            otp,
            otpExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Clear OTP after successful verification
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.status(200).json({ token, message: 'Email verified successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        if (!user.isVerified) return res.status(400).json({ message: "Verify your email first" });

        const token = jwt.sign({ id: user._id }, "your_jwt_secret", { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate reset token
        const resetToken = jwt.sign({ id: user._id }, "your_jwt_secret", { expiresIn: '1h' });
      
        // Save token and expiry to user
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpire = Date.now() + 3600000; // 1 hour
        await user.save();

        const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
        const emailText = `Click here to reset your password: ${resetUrl}`;

        await sendEmail(email, 'Password Reset', emailText);
        res.json({ message: 'Password reset link sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending reset link' });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        // Verify token and get user id
        const decoded = jwt.verify(token, "your_jwt_secret");
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Hash and update password
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();

        // Generate login token
        const loginToken = jwt.sign({ id: user._id }, "your_jwt_secret", { expiresIn: '1h' });

        res.json({ 
            message: 'Password reset successful',
            token: loginToken 
        });
    } catch (error) {
        res.status(500).json({ message: 'Invalid or expired token' });
    }
};

module.exports = {
    registerUser,
    generateOTP,
    verifyOTP,
    loginUser,
    forgotPassword,
    resetPassword
};
