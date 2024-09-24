import express from 'express';

const router = express.Router();
router.post('/admin-logout', (req, res) => {
    res.clearCookie('adminToken', { path: '/' }); // Clear the cookie
    res.sendStatus(200);
});

export default router;