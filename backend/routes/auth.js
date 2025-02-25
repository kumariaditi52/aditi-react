const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');

router.post('/register', authController.registerUser);
router.post('/generate-otp', authController.generateOTP);
router.post('/verify-otp', authController.verifyOTP);
router.post('/login', authController.loginUser);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);

// Social auth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect(process.env.CLIENT_URL);
});
router.get('/github/callback', passport.authenticate('github'), (req, res) => {
    res.redirect(process.env.CLIENT_URL);
});
router.get('/facebook/callback', passport.authenticate('facebook'), (req, res) => {
    res.redirect(process.env.CLIENT_URL);
});

module.exports = router;