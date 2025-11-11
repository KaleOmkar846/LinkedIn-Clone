import User from '../models/User.js';
import { registerSchema, loginSchema } from '../validators/authValidator.js';

/**
 * Register a new user
 * @route POST /api/users/register
 */
export const register = async (req, res) => {
  try {
    // Validate request body
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password } = value;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Register new user
    const newUser = new User({ email });
    await User.register(newUser, password);

    // Log the user in immediately
    req.login(newUser, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error logging in after registration' });
      }
      return res.status(201).json({
        message: 'User registered successfully',
        user: { email: newUser.email, _id: newUser._id },
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Login user
 * @route POST /api/users/login
 */
export const login = (req, res, next, passport) => {
  // Validate request body
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error logging in' });
      }
      return res.json({
        message: 'Logged in successfully',
        user: { email: user.email, _id: user._id },
      });
    });
  })(req, res, next);
};

/**
 * Logout user
 * @route POST /api/users/logout
 */
export const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Error logging out' });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Error destroying session' });
      }
      res.json({ message: 'Logged out successfully' });
    });
  });
};

/**
 * Get current user
 * @route GET /api/users/me
 */
export const getCurrentUser = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  res.json({
    user: { email: req.user.email, _id: req.user._id },
  });
};
