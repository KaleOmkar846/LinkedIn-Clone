import express from 'express';
import passport from '../config/passport.js';
import {
  register,
  login,
  logout,
  getCurrentUser,
} from '../controllers/authController.js';

const router = express.Router();

// POST /api/users/register
router.post('/register', register);

// POST /api/users/login
router.post('/login', (req, res, next) => login(req, res, next, passport));

// POST /api/users/logout
router.post('/logout', logout);

// GET /api/users/me
router.get('/me', getCurrentUser);

export default router;
