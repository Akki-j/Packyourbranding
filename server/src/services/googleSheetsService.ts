import { google } from "googleapis";
import { Lead, SheetsConfig } from "../types";

export function createSheetsService(config: SheetsConfig) {
  const auth = new google.auth.JWT(
    config.serviceAccountEmail,
    undefined,
    config.privateKey.replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/spreadsheets"]
  );

  const sheets = google.sheets({ version: "v4", auth, timeout: 15000 });

  async function appendLead(lead: Lead): Promise<void> {
    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId: config.sheetId,
        range: "Sheet1!A:I",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [[
            lead.name,
            lead.email,
            lead.phone || "",
            lead.company || "",
            lead.service || "",
            lead.quantity || "",
            lead.message || "",
            lead.source || "website",
            lead.createdAt,
          ]],
        },
      });

      console.log("[SHEETS] Lead appended successfully");
    } catch (error) {
      console.error("[SHEETS] Append failed:", error);
      throw new Error("Failed to save lead to Google Sheets");
    }
  }

  return { appendLead };
}
