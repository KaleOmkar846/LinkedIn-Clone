import express from "express";
import passport from "../config/passport.js";
import { isLoggedIn } from "../middleware/auth.js";
import {
  register,
  login,
  logout,
  getCurrentUser,
} from "../controllers/authController.js";

const router = express.Router();

// POST /api/users/register
router.post("/register", register);

// POST /api/users/login
router.post("/login", (req, res, next) => login(req, res, next, passport));

// POST /api/users/logout
router.post("/logout", isLoggedIn, logout);

// GET /api/users/me
router.get("/me", isLoggedIn, getCurrentUser);

export default router;
