import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { createLeadRouter } from "./routes/leadRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { asyncHandler } from "./middleware/asyncHandler";
import { SheetsConfig, EmailConfig } from "./types";

export function createApp(
  sheetsConfig: SheetsConfig,
  emailConfig: EmailConfig
) {
  const app = express();

  app.use(helmet());

  const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";
  app.use(cors({
    origin: allowedOrigin === "*" ? "*" : allowedOrigin.split(","),
  }));

  app.use(express.json({ limit: "10kb" }));

  const leadLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { success: false, message: "Too many requests. Please try again later." },
  });

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  const leadRouter = createLeadRouter(sheetsConfig, emailConfig);
  app.use("/api/leads", leadLimiter, leadRouter);

  app.use(errorHandler);

  return app;
}
