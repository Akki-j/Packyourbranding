import HeroSection from "../components/HeroSection";
import ServiceCard from "../components/ServiceCard";
import { ServiceItem } from "../types";

const SERVICES: ServiceItem[] = [
  { title: "Luxury Shopping Bags", description: "Premium paper and laminated shopping bags designed for fashion stores and boutiques." },
  { title: "Eco-Friendly Bags", description: "Sustainable packaging solutions using recyclable and environmentally friendly materials." },
  { title: "Bakery Packaging", description: "Attractive packaging for bakeries, cafés and food brands." },
  { title: "Corporate Gift Bags", description: "Branded gift bags and promotional packaging for companies and events." },
  { title: "Cosmetic Packaging", description: "Elegant packaging solutions for beauty and skincare businesses." },
  { title: "Bulk Manufacturing", description: "Large-scale production capacity with strict quality control." },
];

const ADVANTAGES: ServiceItem[] = [
  { title: "Premium Materials", description: "We use high-quality materials to ensure durability and elegance." },
  { title: "Custom Branding", description: "Every package is tailored to your business identity." },
  { title: "Fast Delivery", description: "Reliable production schedules and on-time delivery." },
];

const INDUSTRIES = [
  "Fashion Brands",
  "Jewelry Stores",
  "Cosmetic Companies",
  "Bakeries & Cafés",
  "Gift Shops",
  "Corporate Businesses",
];

export default function Services() {
  return (
    <>
      <HeroSection
        badge="Our Services"
        title="Premium Packaging"
        highlight="Solutions"
        description="We manufacture attractive branded bags and packaging products that help your business gain more attention and deliver an unforgettable customer experience."
        imageSrc="/assets/bag-1.jpg"
        imageAlt="Premium Packaging Services"
        primaryBtn={{ label: "Request Free Quote", href: "/contact" }}
      />

      <section className="services">
        <div className="container">
          <div className="section-title">
            <span>What We Offer</span>
            <h2>Complete Packaging Services</h2>
          </div>
          <div className="service-grid">
            {SERVICES.map((s, i) => (
              <ServiceCard key={i} title={s.title} description={s.description} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-title">
            <span>Advantages</span>
            <h2>Why Businesses Choose Us</h2>
          </div>
          <div className="service-grid">
            {ADVANTAGES.map((a, i) => (
              <ServiceCard key={i} title={a.title} description={a.description} />
            ))}
          </div>
        </div>
      </section>

      <section className="services">
        <div className="container">
          <div className="section-title">
            <span>Industries</span>
            <h2>Businesses We Serve</h2>
          </div>
          <div className="service-grid">
            {INDUSTRIES.map((ind, i) => (
              <ServiceCard key={i} title={ind} />
            ))}
          </div>
        </div>
      </section>

      <section className="quote-section">
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: 900, margin: "auto" }}>
            <h2 style={{ fontSize: "3rem", marginBottom: 30 }}>Need Custom Packaging Solutions?</h2>
            <p style={{ opacity: 0.9, marginBottom: 40 }}>
              Contact our team today and let's create premium branded packaging for your business.
            </p>
            <a href="/contact" className="btn btn-primary">
              Request Free Quote
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
