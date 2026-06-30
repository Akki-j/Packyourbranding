import { useState, useCallback } from "react";
import { LeadFormData, ApiResponse } from "../types";
import { submitLead } from "../services/api";

const EMPTY_FORM: LeadFormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  quantity: "",
  message: "",
  source: "website",
};

export function useQuoteForm(source = "website") {
  const [formData, setFormData] = useState<LeadFormData>({ ...EMPTY_FORM, source });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const updateField = useCallback((field: keyof LeadFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setFormData({ ...EMPTY_FORM, source });
    setStatus("idle");
    setMessage("");
    setFieldErrors({});
    setSubmitted(false);
  }, [source]);

  const handleSubmit = useCallback(async () => {
    if (submitted) return;

    setStatus("loading");
    setMessage("");
    setFieldErrors({});

    const result: ApiResponse = await submitLead(formData);

    if (result.success) {
      setStatus("success");
      setMessage(result.message);
      setSubmitted(true);
    } else {
      setStatus("error");
      setMessage(result.message || "Submission failed");
      if (result.errors) {
        const errMap: Record<string, string> = {};
        result.errors.forEach((e) => { errMap[e.field] = e.message; });
        setFieldErrors(errMap);
      }
    }
  }, [formData, submitted]);

  return {
    formData,
    status,
    message,
    fieldErrors,
    submitted,
    updateField,
    handleSubmit,
    reset,
  };
}
