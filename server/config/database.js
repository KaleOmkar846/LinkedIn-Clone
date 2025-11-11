import mongoose from "mongoose";

/**
 * Database configuration and connection
 */
export const connectDB = async () => {
  try {
    const mongoURI =
      process.env.ATLASDB_URL || "mongodb://localhost:27017/linkedin-clone";

    await mongoose.connect(mongoURI);

    console.log("✓ Connected to MongoDB");

    // Handle connection events
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });

    // Graceful shutdown
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("MongoDB connection closed through app termination");
      process.exit(0);
    });
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
