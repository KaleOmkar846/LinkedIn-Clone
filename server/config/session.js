import session from "express-session";
import MongoStore from "connect-mongo";

const store = MongoStore.create({
  mongoUrl:
    process.env.ATLASDB_URL || "mongodb://localhost:27017/linkedin-clone",
  crypto: {
    secret: process.env.SESSION_SECRET,
  },
  touchAfter: 24 * 3600, // time period in seconds
});

store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e);
});
/**
 * Session configuration
 */
export const sessionConfig = {
  store: store,
  name: "session", // Custom session name
  secret: process.env.SESSION_SECRET || "your-secret-key-change-this",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 24 hours
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Allow cross-origin cookies in production
  },
};

/**
 * Session middleware
 */
export const sessionMiddleware = session(sessionConfig);

export default sessionMiddleware;
