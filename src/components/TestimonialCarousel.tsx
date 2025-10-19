import { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: number;
  name: string;
  title: string;
  company: string;
  rating: number;
  review: string;
  date: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Budi Santoso",
    title: "Karyawan Swasta",
    company: "PT. Maju Jaya",
    rating: 5,
    review: "Rumah Profit Property Agent sangat membantu! Bu Elita sangat profesional dan sabar dalam menjelaskan setiap detail properti. Proses jual beli berjalan lancar dan saya puas dengan hasilnya.",
    date: "15-01-2024",
    image: "BS",
  },
  {
    id: 2,
    name: "Sari Dewi",
    title: "Ibu Rumah Tangga",
    company: "Freelancer",
    rating: 5,
    review: "Terima kasih Bu Elita! Berkat bantuan Rumah Profit, kami bisa menemukan rumah yang cocok untuk keluarga. Prosesnya mudah dan transparan. Highly recommended!",
    date: "28-02-2024",
    image: "SD",
  },
  {
    id: 3,
    name: "Ahmad Rahman",
    title: "Pengusaha",
    company: "CV. Rahman Jaya",
    rating: 5,
    review: "Jual beli properti yang lancar berkat bantuan Rumah Profit. Bu Elita memberikan konsultasi yang tepat dan membantu saya menjual properti dengan harga terbaik.",
    date: "10-03-2024",
    image: "AR",
  },
  {
    id: 4,
    name: "Linda Putri",
    title: "Karyawan BUMN",
    company: "PT. Telkom Indonesia",
    rating: 5,
    review: "Pelayanan Rumah Profit sangat memuaskan! Tim yang responsif dan Bu Elita sangat memahami kebutuhan klien. Proses transaksi berjalan lancar tanpa kendala.",
    date: "05-04-2024",
    image: "LP",
  },
];

export const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const resumeTimeoutRef = useRef<number | null>(null);
  const lastTickRef = useRef<number | null>(null);
  const elapsedRef = useRef(0);
  const touchStartXRef = useRef<number | null>(null);
  const touchDeltaXRef = useRef(0);
  const AUTOPLAY_MS = 5000;
  const RESUME_DELAY_MS = 6000;

  // Autoplay and progress logic
  useEffect(() => {
    if (!isAutoPlaying || isHovered) {
      lastTickRef.current = null;
      return;
    }

    const interval = window.setInterval(() => {
      const now = performance.now();
      if (lastTickRef.current == null) {
        lastTickRef.current = now;
        return;
      }
      const delta = now - lastTickRef.current;
      lastTickRef.current = now;
      elapsedRef.current += delta;
      const nextProgress = Math.min(100, (elapsedRef.current / AUTOPLAY_MS) * 100);
      setProgress(nextProgress);
      if (elapsedRef.current >= AUTOPLAY_MS) {
        elapsedRef.current = 0;
        setProgress(0);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }
    }, 100);

    return () => {
      window.clearInterval(interval);
    };
  }, [isAutoPlaying, isHovered]);

  // Clear resume timeout on unmount
  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  const pauseAndScheduleResume = () => {
    setIsAutoPlaying(false);
    if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = window.setTimeout(() => {
      elapsedRef.current = 0;
      setProgress(0);
      setIsAutoPlaying(true);
    }, RESUME_DELAY_MS);
  };

  const goToNext = () => {
    pauseAndScheduleResume();
    elapsedRef.current = 0;
    setProgress(0);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    pauseAndScheduleResume();
    elapsedRef.current = 0;
    setProgress(0);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    pauseAndScheduleResume();
    elapsedRef.current = 0;
    setProgress(0);
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchDeltaXRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current == null) return;
    touchDeltaXRef.current = e.touches[0].clientX - touchStartXRef.current;
  };

  const handleTouchEnd = () => {
    const threshold = 50; // px
    if (touchDeltaXRef.current > threshold) {
      goToPrev();
    } else if (touchDeltaXRef.current < -threshold) {
      goToNext();
    }
    touchStartXRef.current = null;
    touchDeltaXRef.current = 0;
  };

  return (
    <div
      className="relative max-w-5xl mx-auto group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Card */}
      <div
        className="relative bg-white rounded-3xl shadow-[var(--shadow-medium)] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[hsl(var(--gold))]/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[hsl(var(--navy))]/5 to-transparent rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative p-8 md:p-12">
          {/* Quote Icon */}
          <div className="mb-6">
            <Quote className="w-12 h-12 text-[hsl(var(--gold))]/30" />
          </div>

          {/* Marquee Auto-Scroll */}
          <div className="marquee">
            <div className="marquee-track">
              {[...testimonials, ...testimonials].map((t, idx) => (
                <div
                  key={`${t.id}-${idx}`}
                  className="basis-4/5 sm:basis-1/2 lg:basis-1/3 shrink-0 px-3"
                >
                  <div className="h-full rounded-2xl border border-[hsl(var(--gold))]/15 bg-white/80 backdrop-blur-sm p-6 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(var(--gold))] to-[hsl(var(--gold-light))] text-white font-bold flex items-center justify-center">
                        {t.image}
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{t.name}</div>
                        <div className="text-xs text-muted-foreground">{t.title} • {t.company}</div>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-3">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" />
                      ))}
                    </div>
                    <blockquote className="text-sm text-foreground/90 leading-relaxed">“{t.review}”</blockquote>
                    <div className="mt-3 text-xs text-muted-foreground">{t.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Side previews removed for marquee mode */}
    </div>
  );
};
