import express from 'express';
import { register, login } from '../controllers/authController.js';
import { authenticateToken } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify', authenticateToken, (req, res) => res.json({ message: 'Token valid', user: req.user }));

export default router;
