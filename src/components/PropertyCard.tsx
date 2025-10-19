import { MapPin, Maximize } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface PropertyCardProps {
  id: string;
  image: string;
  title: string;
  location: string;
  price: string;
  type: "JUAL" | "SEWA";
  area: string;
}

export const PropertyCard = ({ id, image, title, location, price, type, area }: PropertyCardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 10; // -5deg..5deg
    const rotateX = (0.5 - py) * 8;  // -4deg..4deg
    el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  return (
    <Link to={`/property/${id}`}>
      <div
        ref={cardRef}
        className="group relative overflow-hidden rounded-xl bg-white shadow-[var(--shadow-soft)] hover-lift cursor-pointer perspective-1000 tilt-soft tilt-glow"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 backface-hidden"
            style={{ transform: "translateZ(0px)" }}
          />
          
          {/* Type Ribbon */}
          <div className={`absolute top-4 left-0 px-4 py-1 font-semibold text-sm text-white ${
            type === "JUAL" ? "bg-primary" : "bg-accent"
          }`}>
            {type}
          </div>
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        {/* Content */}
        <div className="p-6" style={{ transform: "translateZ(20px)" }}>
          <h3 className="text-xl font-semibold text-foreground mb-2 line-clamp-1">
            {title}
          </h3>
          
          <div className="flex items-center gap-2 text-muted-foreground mb-3">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            <Maximize className="w-4 h-4" />
            <span className="text-sm">{area}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-[hsl(var(--accent))]">
                {price}
              </p>
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
            >
              Lihat Detail
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};
