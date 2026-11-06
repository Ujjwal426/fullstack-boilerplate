import mongoose from "mongoose";

export default async function connectDB() {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/boilerplate";
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log(`MongoDB connected: ${mongoose.connection.host}/${mongoose.connection.name}`);
  } catch (err) {
    // Keep the server up so /api/health can report the DB as disconnected
    console.error("MongoDB connection failed:", err.message);
  }
}
