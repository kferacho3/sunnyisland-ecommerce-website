// src/data/storyData.ts

export interface IStorySection {
    topline: string;
    header: string;
    description: string;
    bullets: string[];
  }
  
  const storyData: IStorySection[] = [
    {
      topline: "Nutritional Value",
      header: "Health and Flavor Combined",
      description:
        "Our vegan and gluten-free pepper sauce enhances meals without common allergens, offering a rich flavor that caters to various dietary needs.",
      bullets: [
        "Vegan and Gluten-Free.",
        "Free from 'Big Nine' allergens.",
        "Rich in natural ingredients.",
        "Perfect for marinades and finishing sauces.",
      ],
    },
    {
      topline: "History",
      header: "A Legacy of Caribbean Flavors",
      description:
        "Originating from Trinidad & Tobago, Sunny Island Pepper Sauce embodies Caribbean culinary traditions, bringing vibrant flavors to every dish.",
      bullets: [
        "Trinidad & Tobago heritage.",
        "Celebrates Caribbean culinary culture.",
        "Legacy of Mother Sunny's recipe.",
      ],
    },
    {
      topline: "About Us",
      header: "More Than Just Condiments",
      description:
        "Feracho Brand aims to positively impact society through our products, focusing on mental health and supporting small businesses.",
      bullets: [
        "Dedicated to mental health and wellness.",
        "Supports small business growth.",
        "Commits to ethical business practices.",
      ],
    },
    {
      topline: "Mental Health and Wellness",
      header: "Supporting Our Community",
      description:
        "We're committed to enhancing mental health awareness and accessibility, aiming to create a supportive environment for everyone.",
      bullets: [
        "Promotes mental health awareness.",
        "Encourages seeking help and self-care.",
        "Takes a holistic approach to wellness.",
      ],
    },
    {
      topline: "Partnering with Feracho Brand",
      header: "Grow with Us",
      description:
        "Partner with Feracho Brand to enhance visibility and join a movement dedicated to making a positive impact, one bottle at a time.",
      bullets: [
        "Opportunity for exposure and growth.",
        "Join a movement for positive impact.",
        "Fosters sustainable and innovative practices.",
      ],
    },
  ];
  
  export default storyData;
  