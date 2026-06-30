import HeroSection from "../components/HeroSection";
import StatsCounter from "../components/StatsCounter";
import ServiceCard from "../components/ServiceCard";
import ScrollReveal from "../components/ScrollReveal";
import GalleryGrid from "../components/GalleryGrid";
import TestimonialSlider from "../components/TestimonialSlider";
import QuoteForm from "../components/QuoteForm";
import { StatItem, ServiceItem, TestimonialItem } from "../types";

const STATS: StatItem[] = [
  { target: "500", label: "Custom Orders", suffix: "" },
  { target: "400", label: "Happy Clients", suffix: "" },
  { target: "50", label: "Cities Served", suffix: "" },
  { value: "100%", label: "Quality Commitment", suffix: "" },
];

const SERVICES: ServiceItem[] = [
  { title: "Luxury Shopping Bags", description: "Elegant branded shopping bags for boutiques and retail stores." },
  { title: "Eco-Friendly Packaging", description: "Sustainable packaging with modern premium design." },
  { title: "Bakery & Food Packaging", description: "Attractive food packaging solutions that increase brand recognition." },
  { title: "Corporate Branding Bags", description: "Premium promotional and corporate packaging solutions." },
  { title: "Boutique Packaging", description: "Luxury packaging for fashion and lifestyle brands." },
  { title: "Bulk Manufacturing", description: "Reliable large-scale production for growing businesses." },
];

const GALLERY_IMAGES = [
  { src: "/assets/bag--1.jpg", alt: "Premium bag 1" },
  { src: "/assets/bag--2.jpg", alt: "Premium bag 2" },
  { src: "/assets/bag--3.jpg", alt: "Premium bag 3" },
  { src: "/assets/bag--5.jpg", alt: "Premium bag 5" },
  { src: "/assets/bag--6.jpg", alt: "Premium bag 6" },
  { src: "/assets/bag--7.jpg", alt: "Premium bag 7" },
];

const TESTIMONIALS: TestimonialItem[] = [
  { quote: "The quality exceeded our expectations. Customers love our premium shopping bags.", author: "Priya Fashion Boutique" },
  { quote: "Professional service, excellent finishing and timely delivery.", author: "Golden Bakery" },
];

const CONTACT_ITEMS = [
  { label: "Pack Your Branding", value: "Premium custom packaging solutions for modern businesses." },
  { label: "Contact Details", value: "Email: hello@packyourbranding.com\nPhone: +91 98765 43210\nGurugram, Haryana, India" },
];

export default function Home() {
  return (
    <>
      <HeroSection
        badge="Premium Custom Packaging Manufacturer"
        title="Packaging That Makes"
        highlight="Your Brand"
        description="We create luxury custom bags and packaging solutions that help businesses leave a lasting impression on every customer."
        imageSrc="/assets/bag--4.jpg"
        imageAlt="Luxury Packaging"
        primaryBtn={{ label: "Get Free Quote", href: "#quote" }}
        secondaryBtn={{ label: "View Portfolio", href: "#gallery" }}
      />

      <StatsCounter items={STATS} />

      <section className="about-company" id="about">
        <div className="container">
          <div className="section-title">
            <span>Who We Are</span>
            <h2>Building Brands Through Better Packaging</h2>
          </div>
          <div className="hero-grid">
            <div>
              <img src="/assets/team.png" alt="Our Team" />
            </div>
            <div>
              <p>Pack Your Branding specializes in premium customized bags and packaging solutions for modern businesses.</p>
              <br />
              <p>We help fashion brands, bakeries, gift stores, cosmetic companies and retailers deliver products with style, professionalism and strong branding.</p>
              <br />
              <p>Every bag we manufacture becomes a moving advertisement for your business.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="services" id="services">
        <div className="container">
          <div className="section-title">
            <span>Services</span>
            <h2>Premium Packaging Solutions</h2>
          </div>
          <div className="service-grid">
            {SERVICES.map((s, i) => (
              <ServiceCard key={i} title={s.title} description={s.description} />
            ))}
          </div>
        </div>
      </section>

      <section className="gallery" id="gallery">
        <div className="container">
          <div className="section-title">
            <span>Portfolio</span>
            <h2>Our Premium Packaging Collection</h2>
          </div>
          <GalleryGrid images={GALLERY_IMAGES} />
        </div>
      </section>

      <TestimonialSlider items={TESTIMONIALS} />

      <QuoteForm source="home" />

      <section className="contact" id="contact">
        <div className="container">
          <div className="section-title">
            <span>Contact</span>
            <h2>Let's Build Your Brand Together</h2>
          </div>
          <div className="contact-grid">
            {CONTACT_ITEMS.map((item, i) => (
              <div key={i}>
                <h3>{item.label}</h3>
                <p style={{ whiteSpace: "pre-line" }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
