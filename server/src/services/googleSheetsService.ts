import { google, sheets_v4 } from "googleapis";
import { Lead, SheetsConfig } from "../types";

const SHEETS_TIMEOUT_MS = 12000;

export function createSheetsService(config: SheetsConfig) {
  const auth = new google.auth.JWT(
    config.serviceAccountEmail,
    undefined,
    config.privateKey.replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/spreadsheets"]
  );

  const sheets: sheets_v4.Sheets = google.sheets({ version: "v4", auth, timeout: SHEETS_TIMEOUT_MS });

  async function appendLead(lead: Lead): Promise<void> {
    const start = performance.now();
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
      const elapsed = ((performance.now() - start) / 1000).toFixed(2);
      console.log(`[SHEETS] Lead appended (${elapsed}s)`);
    } catch (error: unknown) {
      const elapsed = ((performance.now() - start) / 1000).toFixed(2);
      console.error(`[SHEETS] Append failed after ${elapsed}s:`, error instanceof Error ? error.message : error);
      throw new Error("Failed to save lead to Google Sheets");
    }
  }

  return { appendLead };
}
