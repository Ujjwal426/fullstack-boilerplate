import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  })
);
app.use(express.json());

app.use("/api/health", healthRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
