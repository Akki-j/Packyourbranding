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

export function createLeadController(
  appendLead: (lead: Lead) => Promise<void>,
  sendEmail: (lead: Lead) => Promise<void>
) {
  return async function handleLead(req: Request, res: Response): Promise<void> {
    const raw = req.body;

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

    console.log("[LEAD] Processing:", lead.email);

    await appendLead(lead);

    sendEmail(lead).catch((e) => {
      console.error("[EMAIL] Non-fatal error:", e);
    });

    console.log("[LEAD] Completed for:", lead.email);

    res.status(201).json({
      success: true,
      message: "Thank you! We'll get back to you shortly.",
    });
  };
}
