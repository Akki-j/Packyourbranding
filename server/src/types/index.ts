export interface Lead {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  quantity?: string;
  message?: string;
  source?: string;
  createdAt: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
}

export interface SheetsConfig {
  serviceAccountEmail: string;
  privateKey: string;
  sheetId: string;
}

export interface EmailConfig {
  apiKey: string;
  notificationEmail: string;
  from: string;
}
