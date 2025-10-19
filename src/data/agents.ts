export type Agent = {
  id: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  avatar: string; // initials or image url
  deals: number;
  rating: number; // 1-5
  description: string;
};

export const agents: Agent[] = [
  {
    id: "bu-elita",
    name: "Bu Elita",
    title: "Founder & Principal Agent",
    phone: "+62 812 3456 7890",
    email: "elita@rumahprofit.com",
    avatar: "BE",
    deals: 200,
    rating: 5,
    description: "Pendiri dan pemimpin Rumah Profit Property Agent dengan pengalaman 8+ tahun dalam jual beli properti.",
  },
  {
    id: "sari-wijaya",
    name: "Sari Wijaya",
    title: "Senior Property Consultant",
    phone: "+62 813 9876 5432",
    email: "sari@rumahprofit.com",
    avatar: "SW",
    deals: 150,
    rating: 5,
    description: "Spesialis properti residensial dengan fokus pada jual beli rumah dan apartemen.",
  },
  {
    id: "ahmad-rahman",
    name: "Ahmad Rahman",
    title: "Property Sales Specialist",
    phone: "+62 815 1111 2222",
    email: "ahmad@rumahprofit.com",
    avatar: "AR",
    deals: 120,
    rating: 5,
    description: "Ahli dalam penjualan properti dan membantu klien menemukan properti yang sesuai kebutuhan.",
  },
];


