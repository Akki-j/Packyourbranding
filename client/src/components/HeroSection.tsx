interface HeroSectionProps {
  badge: string;
  title: string;
  highlight: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  primaryBtn?: { label: string; href: string };
  secondaryBtn?: { label: string; href: string };
}

export default function HeroSection({
  badge,
  title,
  highlight,
  description,
  imageSrc,
  imageAlt,
  primaryBtn,
  secondaryBtn,
}: HeroSectionProps) {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="fade-up">
          <span className="hero-badge">{badge}</span>
          <h1>
            {title} <span>{highlight}</span>
          </h1>
          <p>{description}</p>
          {primaryBtn && (
            <div className="hero-buttons">
              <a href={primaryBtn.href} className="btn btn-primary">
                {primaryBtn.label}
              </a>
              {secondaryBtn && (
                <a href={secondaryBtn.href} className="btn btn-outline">
                  {secondaryBtn.label}
                </a>
              )}
            </div>
          )}
        </div>
        <div className="hero-image fade-left">
          <img src={imageSrc} alt={imageAlt} />
        </div>
      </div>
    </section>
  );
}
