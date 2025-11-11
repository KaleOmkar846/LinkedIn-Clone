import passport from 'passport';
import User from '../models/User.js';

// Configure passport to use the local strategy provided by passport-local-mongoose
passport.use(User.createStrategy());

// Serialize and deserialize user instances to and from the session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

export default passport;
