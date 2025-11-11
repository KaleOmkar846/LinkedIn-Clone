import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import passport from "./config/passport.js";
import connectDB from "./config/database.js";
import sessionMiddleware from "./config/session.js";
import authRoutes from "./routes/auth.js";
import postsRoutes from "./routes/posts.js";

const app = express();
const PORT = process.env.PORT || 8080;

// Trust proxy - required when behind a reverse proxy (e.g., Render, Heroku)
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Session configuration
app.use(sessionMiddleware);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get("/", (req, res) => {
  res.json({ message: "LinkedIn Clone API" });
});

// Health check endpoint
app.get("/health", (req, res) => {
  const health = {
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    database: "unknown",
    session: "unknown",
  };

  // Check MongoDB connection
  if (mongoose.connection.readyState === 1) {
    health.database = "connected";
  } else {
    health.database = "disconnected";
    health.status = "error";
  }

  // Check if session secret is set
  if (
    process.env.SESSION_SECRET &&
    process.env.SESSION_SECRET !== "your-secret-key-change-this"
  ) {
    health.session = "configured";
  } else {
    health.session = "not_configured";
    health.status = "warning";
  }

  const statusCode = health.status === "error" ? 503 : 200;
  res.status(statusCode).json(health);
});

app.use("/api/users", authRoutes);
app.use("/api/posts", postsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(
    `✓ CORS origin: ${process.env.CLIENT_URL || "http://localhost:5173"}`
  );
});
