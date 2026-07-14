import { Resend } from "resend";
import { Lead, EmailConfig } from "../types";

export function createEmailService(config: EmailConfig) {
  const resend = new Resend(config.apiKey);

  function formatEmailHtml(lead: Lead): string {
    return `
      <!DOCTYPE html>
      <html>
        <head><meta charset="utf-8"></head>
        <body style="font-family: 'Inter', Arial, sans-serif; padding: 40px; background: #faf7f2;">
          <div style="max-width: 600px; margin: auto; background: white; border-radius: 30px; padding: 40px; box-shadow: 0 20px 50px rgba(0,0,0,0.08);">
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="width: 55px; height: 55px; background: #c9a227; border-radius: 18px; display: inline-flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: bold;">P</div>
              <h2 style="color: #0f172a; font-family: 'Playfair Display', serif; margin-top: 15px;">New Lead Received</h2>
            </div>
            <table style="width: 100%; border-collapse: collapse;">
              ${renderRow("Name", lead.name)}
              ${renderRow("Email", lead.email)}
              ${renderRow("Phone", lead.phone || "—")}
              ${renderRow("Company", lead.company || "—")}
              ${renderRow("Service", lead.service || "—")}
              ${renderRow("Quantity", lead.quantity || "—")}
              ${renderRow("Page Source", lead.source || "website")}
              ${renderRow("Submitted At", lead.createdAt)}
              ${lead.message ? `<tr><td colspan="2" style="padding: 12px 0;"><strong style="color: #c9a227;">Message:</strong><br><p style="color: #64748b; margin-top: 8px; line-height: 1.6;">${lead.message}</p></td></tr>` : ""}
            </table>
          </div>
        </body>
      </html>
    `;
  }

  function renderRow(label: string, value: string): string {
    return `
      <tr>
        <td style="padding: 12px 0; color: #64748b; width: 140px; vertical-align: top; font-weight: 600;">${label}</td>
        <td style="padding: 12px 0; color: #0f172a;">${value}</td>
      </tr>
    `;
  }

  async function sendLeadNotification(lead: Lead): Promise<void> {
    const start = performance.now();
    try {
      await resend.emails.send({
        from: config.from,
        to: config.notificationEmail,
        subject: `New Lead: ${lead.name} — ${lead.service || "Packaging Inquiry"}`,
        html: formatEmailHtml(lead),
      });

      const elapsed = ((performance.now() - start) / 1000).toFixed(2);
      console.log(`[EMAIL] Sent (${elapsed}s)`);
    } catch (error) {
      const elapsed = ((performance.now() - start) / 1000).toFixed(2);
      console.error(`[EMAIL] Failed after ${elapsed}s:`, error instanceof Error ? error.message : error);
      throw new Error("Failed to send email notification");
    }
  }

  return { sendLeadNotification };
}
