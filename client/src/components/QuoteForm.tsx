import { useQuoteForm } from "../hooks/useQuoteForm";
import { LeadFormData } from "../types";

const SERVICE_OPTIONS: { value: string; label: string }[] = [
  { value: "", label: "Select Bag Type" },
  { value: "fashion-packaging", label: "Fashion Packaging" },
  { value: "food-bakery-packaging", label: "Food & Bakery Packaging" },
  { value: "cosmetic-packaging", label: "Cosmetic Packaging" },
  { value: "jewellery-packaging", label: "Jewellery Packaging" },
  { value: "corporate-gift-bags", label: "Corporate Gift Bags" },
  { value: "eco-friendly-products", label: "Eco-Friendly Products" },
];

interface QuoteFormProps {
  source?: string;
}

const fieldStyle = { color: "#ef4444", fontSize: "0.85rem", marginTop: -16 };

export default function QuoteForm({ source = "website" }: QuoteFormProps) {
  const { formData, status, message, fieldErrors, submitted, updateField, handleSubmit, reset } = useQuoteForm(source);

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    updateField(e.target.name as keyof LeadFormData, e.target.value);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await handleSubmit();
  }

  if (submitted && status === "success") {
    return (
      <section className="quote-section" id="quote">
        <div className="container">
          <div className="section-title">
            <span>Get Started</span>
            <h2>Request A Free Quote</h2>
          </div>
          <div
            style={{
              maxWidth: 600,
              margin: "auto",
              textAlign: "center",
              padding: "60px 40px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: 30,
            }}
          >
            <p style={{ fontSize: "1.5rem", marginBottom: 20, color: "#c9a227" }}>
              ✓ Request Submitted!
            </p>
            <p style={{ color: "#94a3b8", marginBottom: 30 }}>{message}</p>
            <button
              onClick={reset}
              className="btn btn-primary"
              style={{ border: "none", cursor: "pointer" }}
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="quote-section" id="quote">
      <div className="container">
        <div className="section-title">
          <span>Get Started</span>
          <h2>Request A Free Quote</h2>
        </div>
        <form className="quote-form" onSubmit={onSubmit}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Business Name"
              required
              value={formData.name}
              onChange={onChange}
              aria-invalid={!!fieldErrors.name}
              aria-describedby={fieldErrors.name ? "name-error" : undefined}
            />
            {fieldErrors.name && <span id="name-error" role="alert" style={fieldStyle}>{fieldErrors.name}</span>}
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={onChange}
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
            />
            {fieldErrors.email && <span id="email-error" role="alert" style={fieldStyle}>{fieldErrors.email}</span>}
          </div>
          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              value={formData.phone}
              onChange={onChange}
              aria-invalid={!!fieldErrors.phone}
              aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
            />
            {fieldErrors.phone && <span id="phone-error" role="alert" style={fieldStyle}>{fieldErrors.phone}</span>}
          </div>
          <div>
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={formData.company}
              onChange={onChange}
              aria-invalid={!!fieldErrors.company}
              aria-describedby={fieldErrors.company ? "company-error" : undefined}
            />
            {fieldErrors.company && <span id="company-error" role="alert" style={fieldStyle}>{fieldErrors.company}</span>}
          </div>
          <div>
            <select
              name="service"
              required
              value={formData.service}
              onChange={onChange}
              aria-label="Select Bag Type"
              aria-invalid={!!fieldErrors.service}
              aria-describedby={fieldErrors.service ? "service-error" : undefined}
            >
              {SERVICE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {fieldErrors.service && <span id="service-error" role="alert" style={fieldStyle}>{fieldErrors.service}</span>}
          </div>
          <div>
            <input
              type="text"
              name="quantity"
              placeholder="Estimated Quantity"
              value={formData.quantity}
              onChange={onChange}
              aria-invalid={!!fieldErrors.quantity}
              aria-describedby={fieldErrors.quantity ? "quantity-error" : undefined}
            />
            {fieldErrors.quantity && <span id="quantity-error" role="alert" style={fieldStyle}>{fieldErrors.quantity}</span>}
          </div>
          <div>
            <textarea
              name="message"
              rows={6}
              placeholder="Tell us your requirements..."
              required
              value={formData.message}
              onChange={onChange}
              aria-invalid={!!fieldErrors.message}
              aria-describedby={fieldErrors.message ? "message-error" : undefined}
            />
            {fieldErrors.message && <span id="message-error" role="alert" style={fieldStyle}>{fieldErrors.message}</span>}
          </div>
          {status === "error" && !Object.keys(fieldErrors).length && (
            <p style={{ color: "#ef4444", textAlign: "center" }}>{message}</p>
          )}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={status === "loading"}
            style={{
              border: "none",
              cursor: status === "loading" ? "not-allowed" : "pointer",
              opacity: status === "loading" ? 0.7 : 1,
            }}
          >
            {status === "loading" ? "Submitting..." : "Request Quote"}
          </button>
        </form>
      </div>
    </section>
  );
}
