import HeroSection from "../components/HeroSection";
import ServiceCard from "../components/ServiceCard";
import ScrollReveal from "../components/ScrollReveal";
import { ServiceItem } from "../types";

const VALUES: ServiceItem[] = [
  { title: "Quality First", description: "Premium materials and excellent finishing for every order." },
  { title: "Customer Success", description: "Your packaging becomes an extension of your brand identity." },
  { title: "Sustainable Growth", description: "Eco-friendly packaging solutions for modern businesses." },
];

const PROCESS = [
  { step: "1", title: "Consultation", desc: "Understanding your requirements." },
  { step: "2", title: "Design", desc: "Creating premium packaging concepts." },
  { step: "3", title: "Manufacturing", desc: "Producing with strict quality control." },
  { step: "4", title: "Delivery", desc: "Reliable and timely order fulfillment." },
];

export default function About() {
  return (
    <>
      <HeroSection
        badge="About Our Company"
        title="We Build"
        highlight="Packaging"
        description="Helping businesses create memorable customer experiences through premium customized bags and packaging solutions."
        imageSrc="/assets/team.jpg"
        imageAlt="About Pack Your Branding"
      />

      <section>
        <div className="container">
          <div className="section-title">
            <span>Our Story</span>
            <h2>Growing Businesses Through Better Packaging</h2>
          </div>
          <div className="hero-grid">
            <div>
              <p>Pack Your Branding was created with one simple mission: help businesses turn ordinary packaging into a powerful marketing tool.</p>
              <br />
              <p>We specialize in manufacturing attractive customized bags and packaging solutions that improve customer experience and increase brand visibility.</p>
              <br />
              <p>Whether you run a boutique, bakery, cosmetic store, jewelry brand, or corporate business, our packaging solutions help your products stand out.</p>
            </div>
            <div>
              <img
                src="/assets/team.jpg"
                alt="Our Team"
                style={{ borderRadius: 40, boxShadow: "var(--shadow)" }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="services">
        <div className="container">
          <div className="section-title">
            <span>Our Values</span>
            <h2>What Drives Us</h2>
          </div>
          <div className="service-grid">
            {VALUES.map((v, i) => (
              <ServiceCard key={i} title={v.title} description={v.description} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-title">
            <span>Process</span>
            <h2>How We Work</h2>
          </div>
          <div className="process-grid">
            {PROCESS.map((p, i) => (
              <ScrollReveal key={i} className="service-card">
                <h3>{p.step}. {p.title}</h3>
                <p>{p.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="quote-section">
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: 800, margin: "auto" }}>
            <h2 style={{ fontSize: "3rem", marginBottom: 30 }}>Ready To Elevate Your Brand?</h2>
            <p style={{ marginBottom: 40, opacity: 0.9 }}>
              Let's create packaging that customers remember.
            </p>
            <a href="/contact" className="btn btn-primary">
              Get Free Quote
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
