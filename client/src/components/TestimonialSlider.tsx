import { useState, useEffect, useCallback } from "react";
import { TestimonialItem } from "../types";

interface TestimonialSliderProps {
  items: TestimonialItem[];
}

export default function TestimonialSlider({ items }: TestimonialSliderProps) {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  if (items.length === 0) return null;

  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-title">
          <span>Testimonials</span>
          <h2>What Clients Say</h2>
        </div>
        <div className="testimonial-slider">
          {items.map((item, i) => (
            <div
              key={i}
              className={`testimonial${i === index ? " active" : ""}`}
            >
              <p>&ldquo;{item.quote}&rdquo;</p>
              <h4>{item.author}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
