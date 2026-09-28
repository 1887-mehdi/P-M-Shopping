import product01 from "../assets/products/Gallery Clothing Model1.webp";
import product02 from "../assets/products/Gallery Clothing Model2.webp";
import product03 from "../assets/products/Gallery Clothing Model3.webp";
import product04 from "../assets/products/Gallery Clothing Model4.webp";
import product05 from "../assets/products/Gallery Clothing Model5.webp";
import product06 from "../assets/products/Gallery Clothing Model6.webp";
import product07 from "../assets/products/Gallery Clothing Model7.webp";
import product08 from "../assets/products/Gallery Clothing Model8.webp";
import product09 from "../assets/products/Gallery Clothing Model9.webp";
import product10 from "../assets/products/Gallery Clothing Model10.webp";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: "Outerwear" | "Essentials" | "Accessories";
  price: number;
  oldPrice?: number;
  image: string;
  color: string;
  badge?: string;
  description: string;
};

export const products: Product[] = [
  {
    id: "01",
    slug: "studio-overshirt",
    name: "Studio overshirt",
    category: "Outerwear",
    price: 89,
    oldPrice: 118,
    image: product01,
    color: "Stone",
    badge: "Bestseller",
    description:
      "An easy, considered layer cut from midweight organic cotton. Finished with a clean collar, dropped shoulder and room for whatever the day brings.",
  },
  {
    id: "02",
    slug: "everyday-tee",
    name: "Everyday heavyweight tee",
    category: "Essentials",
    price: 42,
    image: product02,
    color: "Washed black",
    description:
      "The one you reach for on repeat. A substantial cotton jersey with a relaxed fit and a soft, lived-in feel from the first wear.",
  },
  {
    id: "03",
    slug: "relaxed-cargo",
    name: "Relaxed utility trouser",
    category: "Essentials",
    price: 96,
    image: product03,
    color: "Moss",
    badge: "New arrival",
    description:
      "Utility details, edited down. A relaxed straight leg in durable cotton twill makes this an everyday uniform piece.",
  },
  {
    id: "04",
    slug: "weekend-knit",
    name: "Weekend knit polo",
    category: "Essentials",
    price: 74,
    image: product04,
    color: "Oat",
    description:
      "Lightweight textured knit and a quiet open collar. Layer it or wear it on its own through the in-between seasons.",
  },
  {
    id: "05",
    slug: "canvas-trucker",
    name: "Canvas trucker jacket",
    category: "Outerwear",
    price: 128,
    oldPrice: 158,
    image: product05,
    color: "Ecru",
    badge: "Limited edit",
    description:
      "A modern take on a familiar shape. Washed canvas, considered hardware and a generous silhouette make it an easy layer.",
  },
  {
    id: "06",
    slug: "daily-cap",
    name: "Daily six-panel cap",
    category: "Accessories",
    price: 36,
    image: product06,
    color: "Midnight",
    description:
      "A low-profile six-panel cap made from soft cotton twill. Adjustable back strap for a comfortable, everyday fit.",
  },
  {
    id: "07",
    slug: "relaxed-sweatshirt",
    name: "Form crew sweatshirt",
    category: "Essentials",
    price: 78,
    image: product07,
    color: "Heather",
    description:
      "A soft, midweight fleece crew with a relaxed shape and considered finishing. Made for slow mornings and late trains.",
  },
  {
    id: "08",
    slug: "field-jacket",
    name: "Field jacket no. 08",
    category: "Outerwear",
    price: 148,
    image: product08,
    color: "Olive",
    badge: "New arrival",
    description:
      "A utility classic, reworked for daily wear. A clean front, useful pockets and a lightweight cotton shell keep it versatile.",
  },
  {
    id: "09",
    slug: "boxy-long-sleeve",
    name: "Boxy long-sleeve",
    category: "Essentials",
    price: 54,
    image: product09,
    color: "Ink",
    description:
      "A relaxed long-sleeve in soft cotton jersey. The slightly boxy shape and subtle proportions make it a good layer year-round.",
  },
  {
    id: "10",
    slug: "travel-tote",
    name: "Everywhere canvas tote",
    category: "Accessories",
    price: 32,
    image: product10,
    color: "Natural",
    description:
      "A sturdy canvas carryall with enough space for the everyday extras. Simple, dependable and ready to go.",
  },
];

export const categories = [
  "All pieces",
  "Outerwear",
  "Essentials",
  "Accessories",
] as const;
