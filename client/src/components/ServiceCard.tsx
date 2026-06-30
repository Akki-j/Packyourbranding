import ScrollReveal from "./ScrollReveal";

interface ServiceCardProps {
  title: string;
  description?: string;
}

export default function ServiceCard({ title, description }: ServiceCardProps) {
  return (
    <ScrollReveal className="service-card">
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </ScrollReveal>
  );
}
