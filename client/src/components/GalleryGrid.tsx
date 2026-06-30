import ScrollReveal from "./ScrollReveal";

interface GalleryGridProps {
  images: { src: string; alt: string }[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  return (
    <div className="gallery-grid">
      {images.map((img, i) => (
        <ScrollReveal key={i}>
          <img src={img.src} alt={img.alt} loading="lazy" />
        </ScrollReveal>
      ))}
    </div>
  );
}
