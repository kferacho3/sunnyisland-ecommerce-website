export interface IStorySection {
  topline: string;
  header: string;
  description: string;
  bullets: string[];
  imageUrl?: string;      // Optional background image URL for this section
  reverseLayout?: boolean; // If true, forces the layout to swap (image right, text left)
}

const storyData: IStorySection[] = [
  {
    topline: "Nutritional Value",
    header: "Health and Flavor Combined",
    description:
      "Our vegan and gluten-free pepper sauce enhances meals without common allergens. Packed with natural ingredients, it adds a burst of flavor perfect for marinades, dressings, and finishing sauces.",
    bullets: [
      "Vegan and Gluten-Free",
      "Free from common allergens",
      "Rich, natural ingredients",
      "Ideal for versatile culinary use",
    ],
    imageUrl: "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/explore/aboutUs/about1.webp",
  },
  {
    topline: "History",
    header: "A Legacy of Caribbean Flavors",
    description:
      "Born in Trinidad & Tobago, Sunny Island Pepper Sauce carries forward a heritage steeped in tradition and passion for bold, authentic Caribbean cuisine.",
    bullets: [
      "Inspired by Trinidad & Tobago traditions",
      "Celebrates authentic Caribbean culture",
      "Rooted in a family recipe",
    ],
    imageUrl: "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/explore/aboutUs/about2.webp",
  },
  {
    topline: "About Us",
    header: "More Than Just Condiments",
    description:
      "At Sunny Island Pepper Sauce, we’re dedicated to more than flavor – we’re about community, wellness, and supporting small businesses with every drop.",
    bullets: [
      "Focused on mental health and wellness",
      "Committed to supporting small business growth",
      "Ethical and sustainable practices",
    ],
    imageUrl: "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/explore/aboutUs/about3.webp",
  },
  {
    topline: "Mental Health and Wellness",
    header: "Supporting Our Community",
    description:
      "We believe in creating a supportive environment for everyone. Our initiatives promote mental health awareness and self-care, ensuring a healthier community.",
    bullets: [
      "Advocates mental health awareness",
      "Encourages self-care and support",
      "Fosters a holistic approach to wellness",
    ],
    imageUrl: "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/explore/aboutUs/about4.webp",
    reverseLayout: true
  },
  {
    topline: "Partnering with Feracho Brand",
    header: "Grow with Us",
    description:
      "Join our movement to make a positive impact. We partner with like‑minded brands to foster innovation and sustainable growth – one bottle at a time.",
    bullets: [
      "Opportunities for mutual growth",
      "Join a positive movement",
      "Promotes sustainable practices",
    ],
    imageUrl: "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/explore/aboutUs/about5.webp",
    reverseLayout: true
  },
  {
    topline: "Community Engagement",
    header: "Giving Back to Our Neighbors",
    description:
      "We love to give back! Sunny Island Pepper Sauce supports local charities and community initiatives that celebrate culinary diversity and cultural heritage.",
    bullets: [
      "Supports local community projects",
      "Encourages volunteerism and charitable giving",
      "Celebrates culinary diversity",
    ],
    imageUrl: "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/explore/aboutUs/about1.webp",
  },
  {
    topline: "Event Participation",
    header: "Our Presence at Caribbean Events",
    description:
      "From food festivals to cultural celebrations, we proudly participate in events that highlight Caribbean heritage and the vibrant spirit of our communities.",
    bullets: [
      "Active participation in cultural events",
      "Bringing our sauce to food festivals",
      "Supporting Caribbean heritage initiatives",
    ],
    imageUrl: "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/explore/aboutUs/about2.webp",
  },
  {
    topline: "Recipe Submissions",
    header: "Share Your Culinary Creativity",
    description:
      "We invite you to submit your unique recipes featuring Sunny Island Pepper Sauce. Get a shout out on your account and join our movement of culinary inspiration.",
    bullets: [
      "Submit your original recipes",
      "Get featured on our platform",
      "Join a community of creative cooks",
    ],
    imageUrl: "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/explore/aboutUs/about3.webp",
  },
];

export default storyData;
