import HeroSection from "../components/HeroSection";
import QuoteForm from "../components/QuoteForm";

const CONTACT_DETAILS = [
  { label: "Office Address", value: "Industrial Area, Gurugram, Haryana, India" },
  { label: "Phone Number", value: "+91 98765 43210" },
  { label: "Email Address", value: "hello@packyourbranding.com" },
];

export default function Contact() {
  return (
    <>
      <HeroSection
        badge="Contact Us"
        title="Let's Build"
        highlight="Your Brand"
        description="We help businesses create premium packaging solutions that customers remember. Contact us today for a free consultation and quotation."
        imageSrc="/assets/team.png"
        imageAlt="Contact Pack Your Branding"
      />

      <section>
        <div className="container">
          <div className="section-title">
            <span>Reach Us</span>
            <h2>Contact Information</h2>
          </div>
          <div className="contact-grid">
            {CONTACT_DETAILS.map((item, i) => (
              <div key={i} className="service-card">
                <h3>{item.label}</h3>
                <p>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <QuoteForm source="contact" />

      <section>
        <div className="container">
          <div className="section-title">
            <span>Location</span>
            <h2>Visit Our Office</h2>
          </div>
          <div
            style={{
              height: 400,
              borderRadius: 40,
              background: "#e5e7eb",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 24,
              color: "#64748b",
              boxShadow: "var(--shadow)",
            }}
          >
            Google Maps Placeholder
          </div>
        </div>
      </section>

      <section className="services">
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: 900, margin: "auto" }}>
            <h2 style={{ fontSize: "3rem", marginBottom: 30 }}>
              Ready To Upgrade Your Packaging?
            </h2>
            <p style={{ color: "var(--gray)", marginBottom: 40 }}>
              Let us create custom bags that strengthen your brand identity and leave a lasting impression on your customers.
            </p>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Chat On WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
