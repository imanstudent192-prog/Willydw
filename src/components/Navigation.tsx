import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Properti", path: "/#properties" },
    { name: "Agen", path: "/agents" },
    { name: "Karir", path: "/karir" },
    { name: "Berita", path: "/berita" },
    { name: "Testimonial", path: "/#testimonials" },
    { name: "Tentang Kami", path: "/#about" },
    { name: "Kontak", path: "/#contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname === path || location.hash === path.replace("/", "");
  };

  const handleNavClick = (path: string) => {
    setIsOpen(false);
    if (path.includes("#")) {
      const element = document.getElementById(path.split("#")[1]);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="bg-[hsl(var(--navy))] text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--gold))] to-[hsl(var(--gold-light))] rounded-lg flex items-center justify-center">
              <span className="text-[hsl(var(--navy))] font-bold text-xl">RP</span>
            </div>
            <div className="hidden md:block">
              <div className="font-bold text-lg">RUMAH PROFIT</div>
              <div className="text-xs text-white/70">Property Agent</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? "bg-[hsl(var(--gold))] text-[hsl(var(--navy))]"
                    : "hover:bg-white/10"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Search */}
          <div className="hidden lg:flex items-center gap-2">
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive(link.path)
                      ? "bg-[hsl(var(--gold))] text-[hsl(var(--navy))]"
                      : "hover:bg-white/10"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {/* Removed Dashboard link */}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
