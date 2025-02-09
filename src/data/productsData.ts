export interface Product {
  id: number;
  name: string;
  scoville: string;
  description: string;
  modelId: string | null;
  spiceLevel: number;
  gradientButton: string;
  gradientHeader: string;
  spiceColor: string;
}

export const productsData: Product[] = [
  {
    id: 1,
    name: 'OG SAUCE (Original Pepper Sauce)',
    scoville: '150,000 - 325,000 SHU',
    description:
      'This classic sauce delivers a bold and tangy heat that adds a vibrant kick to any meal. It combines the perfect balance of spice and zest, creating a timeless flavor loved by heat enthusiasts.',
    modelId: 'PepperSauce',
    spiceLevel: 3,
    gradientButton:
      "bg-gradient-to-r from-red-700 via-yellow-400 to-black border border-red-900",
    gradientHeader: "text-red-700",
    spiceColor: "orange",
  },
  {
    id: 2,
    name: 'FIESTA SAUCE (FIESTA SWEET HEAT Pepper Sauce)',
    scoville: '125,000 - 300,000 SHU',
    description:
      'Experience the harmony of sweet and smoky heat with this sauce. The roasted notes complement the fiery peppers, creating a rich depth of flavor that is both savory and slightly sweet.',
    modelId: null,
    spiceLevel: 2,
    gradientButton:
      "bg-gradient-to-r from-purple-600 to-red-600 border border-purple-900",
    gradientHeader: "text-purple-600",
    spiceColor: "yellow",
  },
  {
    id: 3,
    name: 'BLAZE SAUCE (ISLAND BLAZE Pepper Sauce)',
    scoville: '125,000 - 300,000 SHU',
    description:
      'A tropical explosion of heat and sweetness. This sauce brings the flavors of mango and pineapple into a fiery dance with warm spices, making it a delightful choice for adventurous palates.',
    modelId: null,
    spiceLevel: 4,
    gradientButton:
      "bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 border border-orange-500",
    gradientHeader: "text-yellow-500",
    spiceColor: "red",
  },
  {
    id: 4,
    name: 'INFERNO SAUCE (INFERNO FIRE Pepper Sauce)',
    scoville: '500,000 - 1,390,000 SHU',
    description:
      'For those who dare to venture into extreme heat, this sauce offers a deep, smoky burn. Packed with layers of spicy richness, it’s perfect for adding an intense kick to any dish.',
    modelId: null,
    spiceLevel: 5,
    gradientButton: "bg-black border border-gray-800",
    gradientHeader: "text-black",
    spiceColor: "black",
  },
  {
    id: 5,
    name: 'VERDE SAUCE (VERDE VIBE - Mild)',
    scoville: '150,000 - 325,000 SHU',
    description:
      'This mild and refreshing sauce features smooth and fresh flavors with a gentle heat. Perfect for those who prefer a lighter touch of spice with a vibrant green finish.',
    modelId: null,
    spiceLevel: 1,
    gradientButton:
      "bg-gradient-to-r from-green-700 via-green-500 to-green-300 border border-green-700",
    gradientHeader: "text-green-700",
    spiceColor: "green",
  },
];
