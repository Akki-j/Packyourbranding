import { useCounterAnimation } from "../hooks/useCounterAnimation";
import ScrollReveal from "./ScrollReveal";
import { StatItem } from "../types";

interface StatsCounterProps {
  items: StatItem[];
}

function StatCard({ target, value, label, suffix }: StatItem) {
  const numTarget = target ? Number(target) : 0;
  const count = useCounterAnimation(numTarget);

  return (
    <ScrollReveal className="stat-card">
      <h2 className="counter">
        {value || count}{suffix && <span>{suffix}</span>}
      </h2>
      <p>{label}</p>
    </ScrollReveal>
  );
}

export default function StatsCounter({ items }: StatsCounterProps) {
  return (
    <section className="stats">
      <div className="container stats-grid">
        {items.map((item, i) => (
          <StatCard key={i} {...item} />
        ))}
      </div>
    </section>
  );
}
