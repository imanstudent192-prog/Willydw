import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export const PropertyFilter = () => {
  return (
    <div className="glass-card rounded-2xl p-6 shadow-[var(--shadow-medium)] max-w-6xl mx-auto -mt-12 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Jenis Properti" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apartemen">Apartemen</SelectItem>
            <SelectItem value="rumah">Rumah</SelectItem>
            <SelectItem value="kantor">Kantor</SelectItem>
            <SelectItem value="tanah">Tanah</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Transaksi" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="jual">Jual</SelectItem>
            <SelectItem value="sewa">Sewa</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Rentang Harga" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="<500jt">&lt; Rp 500 Juta</SelectItem>
            <SelectItem value="500jt-1m">Rp 500 Juta - 1 Miliar</SelectItem>
            <SelectItem value="1m-2m">Rp 1 - 2 Miliar</SelectItem>
            <SelectItem value="2m-5m">Rp 2 - 5 Miliar</SelectItem>
            <SelectItem value=">5m">&gt; Rp 5 Miliar</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Lokasi" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="jakarta-selatan">Jakarta Selatan</SelectItem>
            <SelectItem value="jakarta-pusat">Jakarta Pusat</SelectItem>
            <SelectItem value="jakarta-barat">Jakarta Barat</SelectItem>
            <SelectItem value="jakarta-utara">Jakarta Utara</SelectItem>
            <SelectItem value="jakarta-timur">Jakarta Timur</SelectItem>
          </SelectContent>
        </Select>

        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Search className="w-4 h-4 mr-2" />
          Cari
        </Button>
      </div>
    </div>
  );
};
