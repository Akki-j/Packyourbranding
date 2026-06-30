import dotenv from "dotenv";
dotenv.config();

import { createApp } from "./app";

function getEnvOrThrow(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

function main() {
  const port = parseInt(process.env.PORT || "3001", 10);

  const sheetsConfig = {
    serviceAccountEmail: getEnvOrThrow("GOOGLE_SERVICE_ACCOUNT_EMAIL"),
    privateKey: getEnvOrThrow("GOOGLE_PRIVATE_KEY"),
    sheetId: getEnvOrThrow("GOOGLE_SHEET_ID"),
  };

  const emailConfig = {
    apiKey: getEnvOrThrow("RESEND_API_KEY"),
    notificationEmail: getEnvOrThrow("NOTIFICATION_EMAIL"),
    from: getEnvOrThrow("EMAIL_FROM"),
  };

  const app = createApp(sheetsConfig, emailConfig);

  const server = app.listen(port, () => {
    console.log(`[SERVER] Running on port ${port}`);
    console.log(`[SERVER] Health check: http://localhost:${port}/api/health`);
  });

  function shutdown(signal: string) {
    console.log(`[SERVER] Received ${signal}, shutting down gracefully...`);
    server.close(() => {
      console.log("[SERVER] Closed remaining connections");
      process.exit(0);
    });
    setTimeout(() => {
      console.error("[SERVER] Forced shutdown after timeout");
      process.exit(1);
    }, 10000).unref();
  }

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

main();
