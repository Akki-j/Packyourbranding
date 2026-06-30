import { Router } from "express";
import { validateLead } from "../middleware/validate";
import { asyncHandler } from "../middleware/asyncHandler";
import { createLeadController } from "../controllers/leadController";
import { createSheetsService } from "../services/googleSheetsService";
import { createEmailService } from "../services/emailService";
import { SheetsConfig, EmailConfig } from "../types";

export function createLeadRouter(
  sheetsConfig: SheetsConfig,
  emailConfig: EmailConfig
): Router {
  const router = Router();

  const sheetsService = createSheetsService(sheetsConfig);
  const emailService = createEmailService(emailConfig);

  const handleLead = createLeadController(
    sheetsService.appendLead,
    emailService.sendLeadNotification
  );

  router.post("/", validateLead, asyncHandler(handleLead));

  return router;
}
