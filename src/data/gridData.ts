// src/data/gridData.ts

export interface Widget {
  id: number;
  title: string;
  route: string;
  image: string;
  category?: string;
  description?: string;
}

// Permanent widgets (always appear on page 0)
export const permanentWidgets: Widget[] = [
  {
    id: 101,
    title: "Products",
    route: "/explore/products",
    image:
      "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/home/widgets/productsSIPS.webp",
  },
  {
    id: 102,
    title: "Scoville Scale",
    route: "/scoville",
    image:
      "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/home/widgets/scovilleSIPS.webp",
  },
  {
    id: 103,
    title: "Foods all around!",
    route: "/explore/recipes",
    image:
      "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/home/widgets/faaSIPS.webp",
  },
];

// Secondary widgets (appear on non‑page0 sections)
export const secondaryWidgetsData: Widget[] = [
  {
    id: 1,
    title: "Shop",
    route: "/shop",
    image:
      "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/home/widgets/shopSIPS.webp",
  },
  {
    id: 2,
    title: "About Us",
    route: "/explore/about",
    image:
      "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/home/widgets/aboutUsSIPS.webp",
  },
  {
    id: 3,
    title: "Contact",
    route: "/contact/inquiries",
    image:
      "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/home/widgets/contactSIPS.webp",
  },
  {
    id: 4,
    title: "Blog",
    route: "/explore/blog",
    image:
      "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/home/widgets/blogSIPS.webp",
  },
  {
    id: 5,
    title: "Events",
    route: "/explore/events",
    image:
      "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/home/widgets/eventsSIPS.webp",
  },
  {
    id: 6,
    title: "Locations",
    route: "/explore/locations",
    image:
      "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/home/widgets/locationsSIPS.webp",
  },
  {
    id: 7,
    title: "FAQ",
    route: "/contact/FAQs",
    image:
      "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/home/widgets/faqSIPS.webp",
  },
  {
    id: 8,
    title: "Testimonials",
    route: "/testimonials",
    image:
      "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/home/widgets/testimonialSIPS.webp",
  },
  {
    id: 9,
    title: "Careers",
    route: "/testimonials",
    image:
      "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/home/widgets/careersSIPS.webp",
  },
  {
    id: 10,
    title: "Support Us",
    route: "/contact/supportUs",
    image:
      "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/home/widgets/supportSIPS.webp",
  },
  {
    id: 11,
    title: "Questions?",
    route: "/contact/inquiries",
    image:
      "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/home/widgets/inquiriesSIPS.webp",
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
