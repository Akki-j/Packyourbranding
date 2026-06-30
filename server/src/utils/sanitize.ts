export function sanitizeString(value: string): string {
  return value
    .trim()
    .replace(/<[^>]*>/g, "")
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "");
}

export function sanitizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function sanitizePhone(value: string): string {
  return value.trim().replace(/[^\d+\-\s()]/g, "");
}
