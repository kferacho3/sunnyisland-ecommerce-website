// src/data/gridData.ts

export interface Widget {
  id: number;
  title: string;
  route: string;
  image: string;
}

// Permanent widgets (always appear on page 0)
export const permanentWidgets: Widget[] = [
  {
    id: 101,
    title: "Products",
    route: "/explore/products",
    image: "https://picsum.photos/id/101/500/500",
  },
  {
    id: 102,
    title: "Scoville Scale",
    route: "/scoville",
    image: "https://picsum.photos/id/102/500/500",
  },
  {
    id: 103,
    title: "Foods all around!",
    route: "/explore/recipes",
    image: "https://picsum.photos/id/103/500/500",
  },
];

// Secondary widgets (appear on non‑page0 sections)
export const secondaryWidgetsData: Widget[] = [
  {
    id: 1,
    title: "Shop",
    route: "/shop",
    image: "https://picsum.photos/id/104/500/500",
  },
  {
    id: 2,
    title: "About Us",
    route: "/explore/about",
    image: "https://picsum.photos/id/105/500/500",
  },
  {
    id: 3,
    title: "Contact",
    route: "/contact/inquiries",
    image: "https://picsum.photos/id/106/500/500",
  },
  {
    id: 4,
    title: "Blog",
    route: "/explore/blog",
    image: "https://picsum.photos/id/107/500/500",
  },
  {
    id: 5,
    title: "Events",
    route: "/explore/events",
    image: "https://picsum.photos/id/108/500/500",
  },
  {
    id: 6,
    title: "Locations",
    route: "/explore/locations",
    image: "https://picsum.photos/id/109/500/500",
  },
  {
    id: 7,
    title: "FAQ",
    route: "/contact/FAQs",
    image: "https://picsum.photos/id/110/500/500",
  },
  {
    id: 8,
    title: "Testimonials",
    route: "/testimonials",
    image: "https://picsum.photos/id/111/500/500",
  },
  {
    id: 9,
    title: "Careers",
    route: "/testimonials",
    image: "https://picsum.photos/id/112/500/500",
  },
  {
    id: 10,
    title: "Support Us",
    route: "/contact/supportUs",
    image: "https://picsum.photos/id/113/500/500",
  },
  {
    id: 11,
    title: "Questions?",
    route: "/contact/inquiries",
    image: "https://picsum.photos/id/114/500/500",
  },
];

// Utility function to shuffle an array.
export function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
