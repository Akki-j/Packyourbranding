import { LeadFormData, ApiResponse } from "../types";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";
const TIMEOUT_MS = 15000;

export async function submitLead(data: LeadFormData): Promise<ApiResponse> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(`${API_BASE}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    const result: ApiResponse = await response.json();
    return result;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return {
        success: false,
        message: "Your request is taking longer than expected. Please try again or contact us on WhatsApp.",
      };
    }
    return { success: false, message: "Network error. Please check your connection." };
  } finally {
    clearTimeout(timeout);
  }
}
