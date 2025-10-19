import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

export interface Agent {
  id: string;
  name: string;
  phone: string;
  email: string;
  photo?: string;
  title: string;
}

export interface Property {
  id: string;
  image: string;
  title: string;
  location: string;
  price: string;
  type: "JUAL" | "SEWA";
  area: string;
  bedrooms?: number;
  bathrooms?: number;
  description: string;
  agent: Agent;
  features: string[];
}

export const agents: Agent[] = [
  {
    id: "1",
    name: "Bu Elita",
    phone: "6281234567890",
    email: "elita@rumahprofit.com",
    title: "Founder & Principal Agent",
  },
  {
    id: "2",
    name: "Sari Wijaya",
    phone: "6281234567891",
    email: "sari@rumahprofit.com",
    title: "Senior Property Consultant",
  },
  {
    id: "3",
    name: "Ahmad Rahman",
    phone: "6281234567892",
    email: "ahmad@rumahprofit.com",
    title: "Property Investment Advisor",
  },
];

export const properties: Property[] = [
  {
    id: "1",
    image: property1,
    title: "Rumah Type 45 Strategis",
    location: "Bekasi Timur, Jawa Barat",
    price: "Rp 450.000.000",
    type: "JUAL",
    area: "45 m²",
    bedrooms: 2,
    bathrooms: 1,
    description: "Rumah type 45 dengan lokasi strategis dekat stasiun kereta dan pusat perbelanjaan. Cocok untuk hunian pertama atau keluarga kecil. Dilengkapi dengan carport dan halaman depan yang luas.",
    agent: agents[0],
    features: [
      "Lokasi Strategis",
      "Dekat Stasiun",
      "Carport",
      "Halaman Depan",
      "Siap Huni",
      "Harga Terjangkau",
    ],
  },
  {
    id: "2",
    image: property2,
    title: "Rumah Type 70 Modern",
    location: "Depok, Jawa Barat",
    price: "Rp 750.000.000",
    type: "JUAL",
    area: "70 m²",
    bedrooms: 3,
    bathrooms: 2,
    description: "Rumah modern type 70 dengan desain minimalis dan fungsional. Taman belakang yang asri, dapur yang luas, dan ruang keluarga yang nyaman. Perfect untuk keluarga kecil.",
    agent: agents[1],
    features: [
      "Desain Modern",
      "Taman Belakang",
      "Dapur Luas",
      "3 Kamar Tidur",
      "2 Kamar Mandi",
      "Lokasi Nyaman",
    ],
  },
  {
    id: "3",
    image: property3,
    title: "Apartemen 1BR Investasi",
    location: "Jakarta Selatan",
    price: "Rp 3.500.000/bulan",
    type: "SEWA",
    area: "35 m²",
    bedrooms: 1,
    bathrooms: 1,
    description: "Apartemen 1 kamar tidur dengan fasilitas lengkap. Lokasi strategis dekat kawasan bisnis dan transportasi umum. Cocok untuk hunian single professional atau pasangan muda.",
    agent: agents[2],
    features: [
      "Fasilitas Lengkap",
      "Dekat Kawasan Bisnis",
      "Transportasi Mudah",
      "Keamanan 24 Jam",
      "Kolam Renang",
      "Lokasi Premium",
    ],
  },
];
