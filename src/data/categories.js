import catBaby from "@/assets/cat-baby.jpg";
import catGirls from "@/assets/cat-girls.jpg";
import catBoys from "@/assets/cat-boys.jpg";
import catParty from "@/assets/cat-party.jpg";
import catEthnic from "@/assets/cat-ethnic.jpg";
import catAccessories from "@/assets/cat-accessories.jpg";

export const categories = [
  {
    id: "baby",
    slug: "baby",
    name: "Baby & Newborn",
    tagline: "Rompers, onesies & soft cottons",
    image: catBaby,
    tone: "pinky",
    active: true,
  },
  {
    id: "girls",
    slug: "girls",
    name: "Girls",
    tagline: "Frocks, tops & everyday cuties",
    image: catGirls,
    tone: "pinky",
    active: true,
  },
  {
    id: "boys",
    slug: "boys",
    name: "Boys",
    tagline: "Shirts, jeans & playful basics",
    image: catBoys,
    tone: "sky",
    active: true,
  },
  {
    id: "party",
    slug: "party",
    name: "Party Wear",
    tagline: "Birthday-ready sparkle",
    image: catParty,
    tone: "sun",
    active: true,
  },
  {
    id: "ethnic",
    slug: "ethnic",
    name: "Ethnic Wear",
    tagline: "Kurta, lehenga & sherwani sets",
    image: catEthnic,
    tone: "coral",
    active: true,
  },
  {
    id: "accessories",
    slug: "accessories",
    name: "Accessories",
    tagline: "Shoes, bows, socks & caps",
    image: catAccessories,
    tone: "mint",
    active: true,
  },
];

export const ageGroups = [
  { id: "0-3m", label: "Newborn", range: "0–3M", tone: "pinky" },
  { id: "3-12m", label: "Baby", range: "3–12M", tone: "sky" },
  { id: "1-3y", label: "Toddler", range: "1–3Y", tone: "mint" },
  { id: "4-8y", label: "Kids", range: "4–8Y", tone: "sun" },
  { id: "9-12y", label: "Kids", range: "9–12Y", tone: "coral" },
  { id: "13-16y", label: "Teens", range: "13–16Y", tone: "pinky" },
];

export const allSizes = [
  "0–3M",
  "3–6M",
  "6–12M",
  "1–2Y",
  "2–3Y",
  "4–5Y",
  "6–7Y",
  "8–9Y",
  "10–11Y",
  "12–13Y",
  "14–15Y",
];

export const priceBuckets = [
  { id: "u500", label: "Under ₹500", min: 0, max: 499 },
  { id: "500-999", label: "₹500–₹999", min: 500, max: 999 },
  { id: "1000-1499", label: "₹1,000–₹1,499", min: 1000, max: 1499 },
  { id: "1500p", label: "₹1,500+", min: 1500, max: 999999 },
];
