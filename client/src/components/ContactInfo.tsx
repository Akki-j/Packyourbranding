interface ContactInfoProps {
  title: string;
  subtitle?: string;
  items: { label: string; value: string }[];
}

export default function ContactInfo({ title, subtitle, items }: ContactInfoProps) {
  return (
    <section className="contact">
      <div className="container">
        <div className="section-title">
          <span>Reach Us</span>
          <h2>{title}</h2>
        </div>
        <div className="contact-grid">
          {items.map((item, i) => (
            <div key={i} className="service-card">
              <h3>{item.label}</h3>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
