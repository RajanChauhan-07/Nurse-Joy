import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRouter from "./routes";
import { errorHandler } from "./middleware/error.middleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

// Middlewares
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(express.json());

// Health Check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "nurse-joy-backend", timestamp: new Date().toISOString() });
});

// API Routes
app.use("/api", apiRouter);

// Error Handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🏥 Nurse Joy API Server is running on port ${PORT}`);
});

export default app;
