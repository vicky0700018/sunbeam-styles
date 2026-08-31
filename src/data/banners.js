import hero from "@/assets/hero-kids.jpg";
import party from "@/assets/cat-party.jpg";
import festive from "@/assets/promo-festive.jpg";

export const banners = [
  {
    id: "b1",
    title: "Little Styles, Big Smiles",
    subtitle:
      "Discover comfortable, trendy and adorable fashion for every little personality.",
    image: hero,
    ctaText: "Shop New Arrivals",
    ctaLink: "/shop",
    active: true,
  },
  {
    id: "b2",
    title: "Festive Looks for Little Stars",
    subtitle:
      "Kurta sets, lehengas and sherwanis crafted for your family celebrations.",
    image: festive,
    ctaText: "Explore Ethnic Wear",
    ctaLink: "/category/ethnic",
    active: true,
  },
  {
    id: "b3",
    title: "Everyday Comfort, Made Cute",
    subtitle:
      "Breathable cottons and easy-play styles from newborn to early teens.",
    image: party,
    ctaText: "Shop Party Wear",
    ctaLink: "/category/party",
    active: true,
  },
];
