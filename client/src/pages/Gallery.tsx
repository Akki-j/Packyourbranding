import HeroSection from "../components/HeroSection";
import GalleryGrid from "../components/GalleryGrid";
import ServiceCard from "../components/ServiceCard";
import { ServiceItem } from "../types";

const GALLERY_IMAGES = [
  { src: "/assets/bag--1.jpg", alt: "Luxury Shopping Bag" },
  { src: "/assets/bag-2.jpg", alt: "Eco Friendly Packaging" },
  { src: "/assets/bag-3.jpg", alt: "Corporate Gift Bag" },
  { src: "/assets/bag--4.jpg", alt: "Boutique Packaging" },
];

const CATEGORIES: ServiceItem[] = [
  { title: "Fashion Packaging", description: "Premium bags for boutiques, apparel brands, and luxury retailers." },
  { title: "Food & Bakery Packaging", description: "Attractive and functional packaging for bakeries and cafés." },
  { title: "Cosmetic Packaging", description: "Elegant branding solutions for beauty businesses." },
  { title: "Jewelry Packaging", description: "Sophisticated packaging for premium jewelry brands." },
  { title: "Corporate Gift Bags", description: "Branded packaging for events and corporate gifting." },
  { title: "Eco-Friendly Products", description: "Sustainable packaging built for the modern market." },
];

const PROCESS: ServiceItem[] = [
  { title: "Design Consultation", description: "Understanding your brand, audience, and packaging goals." },
  { title: "Prototype Development", description: "Building concepts and premium packaging samples." },
  { title: "Manufacturing & Delivery", description: "Producing high-quality products with reliable delivery schedules." },
];

export default function Gallery() {
  return (
    <>
      <HeroSection
        badge="Our Portfolio"
        title="Premium"
        highlight="Packaging"
        description="Discover sample projects and packaging concepts designed for modern brands. Replace these images with your own work whenever you're ready."
        imageSrc="/assets/bag--1.jpg"
        imageAlt="Premium Custom Bags"
        primaryBtn={{ label: "Start Your Project", href: "/contact" }}
      />

      <section className="gallery">
        <div className="container">
          <div className="section-title">
            <span>Showcase</span>
            <h2>Featured Packaging Designs</h2>
          </div>
          <GalleryGrid images={GALLERY_IMAGES} />
        </div>
      </section>

      <section className="services">
        <div className="container">
          <div className="section-title">
            <span>Categories</span>
            <h2>Packaging Solutions We Create</h2>
          </div>
          <div className="service-grid">
            {CATEGORIES.map((c, i) => (
              <ServiceCard key={i} title={c.title} description={c.description} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-title">
            <span>Workflow</span>
            <h2>How We Create Great Packaging</h2>
          </div>
          <div className="service-grid">
            {PROCESS.map((p, i) => (
              <ServiceCard key={i} title={p.title} description={p.description} />
            ))}
          </div>
        </div>
      </section>

      <section className="quote-section">
        <div className="container">
          <div style={{ maxWidth: 900, margin: "auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "3rem", marginBottom: 30 }}>Want Your Brand To Look Premium?</h2>
            <p style={{ opacity: 0.9, marginBottom: 40 }}>
              Let's create custom packaging that turns every customer into a walking advertisement for your business.
            </p>
            <a href="/contact" className="btn btn-primary">
              Start Your Project
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
