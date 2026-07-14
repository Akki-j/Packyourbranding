import { Request, Response } from "express";
import { Lead } from "../types";
import { sanitizeString, sanitizeEmail, sanitizePhone } from "../utils/sanitize";

const bagTypeLabels: Record<string, string> = {
  "fashion-packaging": "Fashion Packaging",
  "food-bakery-packaging": "Food & Bakery Packaging",
  "cosmetic-packaging": "Cosmetic Packaging",
  "jewellery-packaging": "Jewellery Packaging",
  "corporate-gift-bags": "Corporate Gift Bags",
  "eco-friendly-products": "Eco-Friendly Products",
};

const processedKeys = new Set<string>();
const IDEMPOTENCY_TTL_MS = 5 * 60 * 1000;

setInterval(() => processedKeys.clear(), IDEMPOTENCY_TTL_MS);

export function createLeadController(
  appendLead: (lead: Lead) => Promise<void>,
  sendEmail: (lead: Lead) => Promise<void>
) {
  return async function handleLead(req: Request, res: Response): Promise<void> {
    const start = performance.now();
    const raw = req.body;

    const idempotencyKey = typeof raw.idempotencyKey === "string" ? raw.idempotencyKey.trim() : "";
    if (idempotencyKey) {
      if (processedKeys.has(idempotencyKey)) {
        console.log(`[LEAD] Duplicate blocked (key=${idempotencyKey.slice(0, 8)}…)`);
        res.status(201).json({ success: true, message: "Your request has been received." });
        return;
      }
      processedKeys.add(idempotencyKey);
    }

    const serviceSlug = sanitizeString(raw.service || "");
    const serviceLabel = bagTypeLabels[serviceSlug] || serviceSlug;

    const lead: Lead = {
      name: sanitizeString(raw.name),
      email: sanitizeEmail(raw.email),
      phone: sanitizePhone(raw.phone || ""),
      company: sanitizeString(raw.company || ""),
      service: serviceLabel,
      quantity: sanitizeString(raw.quantity || ""),
      message: sanitizeString(raw.message || ""),
      source: sanitizeString(raw.source || "website"),
      createdAt: new Date().toISOString(),
    };

    console.log(`[LEAD] Processing: ${lead.email} (key=${idempotencyKey.slice(0, 8) || "none"}…)`);

    try {
      await appendLead(lead);

      const elapsed = ((performance.now() - start) / 1000).toFixed(2);
      console.log(`[LEAD] Sheets done (${elapsed}s)`);

      sendEmail(lead).catch((e) => {
        console.error("[EMAIL] Non-fatal error:", e instanceof Error ? e.message : e);
      });

      const total = ((performance.now() - start) / 1000).toFixed(2);
      console.log(`[LEAD] Completed for: ${lead.email} (${total}s)`);

      res.status(201).json({
        success: true,
        message: "Your request has been received.",
      });
    } catch (error) {
      const elapsed = ((performance.now() - start) / 1000).toFixed(2);
      console.error(`[LEAD] Failed after ${elapsed}s:`, error instanceof Error ? error.message : error);
      res.status(500).json({
        success: false,
        message: "Something went wrong. Please try again or contact us on WhatsApp.",
      });
    }
  };
}
