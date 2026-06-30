import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(200, "Name is too long"),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(200, "Email is too long"),
  phone: z
    .string()
    .trim()
    .max(50, "Phone is too long")
    .optional()
    .default(""),
  company: z
    .string()
    .trim()
    .max(200, "Company is too long")
    .optional()
    .default(""),
  service: z
    .string()
    .trim()
    .max(200, "Service is too long")
    .optional()
    .default(""),
  quantity: z
    .string()
    .trim()
    .max(50, "Quantity is too long")
    .optional()
    .default(""),
  message: z
    .string()
    .trim()
    .max(5000, "Message is too long")
    .optional()
    .default(""),
  source: z
    .string()
    .trim()
    .max(100, "Source is too long")
    .optional()
    .default("website"),
});

export function validateLead(req: Request, res: Response, next: NextFunction): void {
  const result = leadSchema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
    return;
  }

  req.body = result.data;
  next();
}
