export interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  quantity: string;
  message: string;
  source: string;
  idempotencyKey?: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  errors?: { field: string; message: string }[];
}

export interface NavLink {
  label: string;
  path: string;
}

export interface ServiceItem {
  title: string;
  description: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
}

