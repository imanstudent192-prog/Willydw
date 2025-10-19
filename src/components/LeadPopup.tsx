import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { submitLead } from "@/lib/leads";

export const LeadPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    propertyType: "",
    priceRange: "",
  });

  useEffect(() => {
    const hasShown = sessionStorage.getItem("leadPopupShown");
    
    if (!hasShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("leadPopupShown", "true");
      }, 20000); // 20 seconds

      const handleScroll = () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercent > 40 && !hasShown) {
          setIsOpen(true);
          sessionStorage.setItem("leadPopupShown", "true");
          window.removeEventListener("scroll", handleScroll);
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        clearTimeout(timer);
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Submit to Supabase
      await submitLead({
        name: formData.name,
        email: formData.email,
        phone: formData.whatsapp,
        message: `Property Type: ${formData.propertyType}, Price Range: ${formData.priceRange}`,
        source: 'Lead Popup'
      });
      
      toast.success("Terima kasih! Konsultan kami akan segera menghubungi Anda.");
      
      // Reset form
      setFormData({
        name: "",
        whatsapp: "",
        email: "",
        propertyType: "",
        priceRange: "",
      });
      
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    } catch (error: any) {
      toast.error(error.message || "Gagal mengirim data. Silakan coba lagi.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Popup Card */}
      <div className="relative bg-[hsl(var(--navy))] text-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-[var(--shadow-gold)] border-2 border-[hsl(var(--gold))] animate-scale-in">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        {/* Content */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2 text-gradient-gold">
            Bingung pilih properti yang mana?
          </h2>
          <p className="text-white/80 text-sm">
            Isi data Anda di bawah ini — tim George Town Real Estate siap membantu Anda menemukan properti terbaik sesuai kebutuhan Anda.
          </p>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-white/90">Nama Lengkap</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
              placeholder="Masukkan nama Anda"
            />
          </div>
          
          <div>
            <Label htmlFor="whatsapp" className="text-white/90">Nomor WhatsApp</Label>
            <Input
              id="whatsapp"
              required
              type="tel"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
              placeholder="+62 812 3456 7890"
            />
          </div>
          
          <div>
            <Label htmlFor="email" className="text-white/90">Email</Label>
            <Input
              id="email"
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
              placeholder="email@example.com"
            />
          </div>
          
          <div>
            <Label htmlFor="propertyType" className="text-white/90">Jenis Properti yang Dicari</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, propertyType: value })}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Pilih jenis properti" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartemen">Apartemen</SelectItem>
                <SelectItem value="rumah">Rumah</SelectItem>
                <SelectItem value="kantor">Kantor</SelectItem>
                <SelectItem value="tanah">Tanah</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="priceRange" className="text-white/90">Rentang Harga</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, priceRange: value })}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Pilih rentang harga" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="<500jt">&lt; Rp 500 Juta</SelectItem>
                <SelectItem value="500jt-1m">Rp 500 Juta - 1 Miliar</SelectItem>
                <SelectItem value="1m-2m">Rp 1 - 2 Miliar</SelectItem>
                <SelectItem value="2m-5m">Rp 2 - 5 Miliar</SelectItem>
                <SelectItem value=">5m">&gt; Rp 5 Miliar</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            type="submit"
            className="w-full bg-[hsl(var(--gold))] text-[hsl(var(--navy))] hover:bg-[hsl(var(--gold-light))] font-semibold"
          >
            Kirim & Dapatkan Rekomendasi
          </Button>
        </form>
      </div>
    </div>
  );
};
