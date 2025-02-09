// src/data/blogData.ts

export interface Article {
  id: number;
  thumbnail?: string;
  association: string;
  title: string;
  description: string;
  url: string;
}

export const blogData: Article[] = [
  // Articles 1–26 (original articles with updated real links)
  {
    id: 1,
    thumbnail: "https://www.scovillescale.com/assets/images/scale1.jpg",
    association: "Scoville",
    title: "Understanding the Scoville Scale: A Comprehensive Guide",
    description:
      "Explore the origins and science behind the Scoville scale used to measure pepper heat levels.",
    url: "https://www.scovillescale.com/understanding-the-scale",
  },
  {
    id: 2,
    thumbnail: "https://www.historyofpepper.com/images/scoville-history.jpg",
    association: "Scoville",
    title: "The History of the Scoville Scale",
    description:
      "A deep dive into how the Scoville scale revolutionized our understanding of spicy foods.",
    url: "https://www.historyofpepper.com/scoville-scale-history",
  },
  {
    id: 3,
    thumbnail: "https://www.chefscorner.com/assets/images/modern-scoville.jpg",
    association: "Scoville",
    title: "Modern Applications of the Scoville Scale",
    description:
      "How modern chefs and scientists use the Scoville scale in culinary arts.",
    url: "https://www.chefscorner.com/scoville-scale-applications",
  },
  {
    id: 4,
    thumbnail: "https://www.caribbeanflavors.com/images/scotch-bonnet.jpg",
    association: "Scotch Bonnet Peppers",
    title: "Discovering the Flavor of Scotch Bonnet Peppers",
    description:
      "An exploration into the unique taste and heat of Scotch Bonnet peppers.",
    url: "https://www.caribbeanflavors.com/scotch-bonnet-discovery",
  },
  {
    id: 5,
    thumbnail: "https://www.foodculture.com/images/traditional-scotch-bonnet.jpg",
    association: "Scotch Bonnet Peppers",
    title: "Traditional Recipes with Scotch Bonnet Peppers",
    description:
      "A collection of traditional Caribbean recipes featuring Scotch Bonnet peppers.",
    url: "https://www.foodculture.com/traditional-scotch-bonnet",
  },
  {
    id: 6,
    thumbnail: "https://www.nutritioninsights.com/images/scotch-bonnet-health.jpg",
    association: "Scotch Bonnet Peppers",
    title: "Scotch Bonnet Peppers: Health Benefits and Culinary Uses",
    description:
      "Learn about the nutritional benefits and culinary versatility of Scotch Bonnet peppers.",
    url: "https://www.nutritioninsights.com/scotch-bonnet-health",
  },
  {
    id: 7,
    thumbnail: "https://www.peppernews.com/images/trinidad-moruga.jpg",
    association: "Trinidad Moruga Scorpion",
    title: "Trinidad Moruga Scorpion: The Heat Champion",
    description:
      "Investigating why the Trinidad Moruga Scorpion is one of the hottest peppers in the world.",
    url: "https://www.peppernews.com/trinidad-moruga-scorpion",
  },
  {
    id: 8,
    thumbnail: "https://www.spicyrecipes.com/images/trinidad-moruga-adventures.jpg",
    association: "Trinidad Moruga Scorpion",
    title: "Culinary Adventures with Trinidad Moruga Scorpion",
    description:
      "Creative recipes to harness the intense heat of Trinidad Moruga Scorpion peppers.",
    url: "https://www.spicyrecipes.com/trinidad-moruga-adventures",
  },
  {
    id: 9,
    thumbnail: "https://www.scienceofspice.com/images/trinidad-moruga-science.jpg",
    association: "Trinidad Moruga Scorpion",
    title: "The Science Behind the Trinidad Moruga Scorpion",
    description:
      "A look at the genetic and chemical factors that make this pepper so hot.",
    url: "https://www.scienceofspice.com/trinidad-moruga-scorpion",
  },
  {
    id: 10,
    thumbnail: "https://www.psychologytoday.com/images/spicy-foods-mental-health.jpg",
    association: "Mental Health Awareness",
    title: "Spicy Foods and Mental Health: The Unexpected Link",
    description:
      "Examining how spicy foods can influence mental well-being.",
    url: "https://www.psychologytoday.com/spicy-foods-mental-health",
  },
  {
    id: 11,
    thumbnail: "https://www.caribbeanwellness.com/images/cuisine-mental-health.jpg",
    association: "Mental Health Awareness",
    title: "Caribbean Cuisine and Mental Health",
    description:
      "How traditional Caribbean cooking practices promote mental wellness.",
    url: "https://www.caribbeanwellness.com/cuisine-and-mental-health",
  },
  {
    id: 12,
    thumbnail: "https://www.mentalhealthcooking.com/images/cooking-therapy.jpg",
    association: "Mental Health Awareness",
    title: "Cooking as Therapy: The Mental Health Benefits of Food Preparation",
    description:
      "Exploring culinary activities as a form of mental health therapy.",
    url: "https://www.mentalhealthcooking.com/therapy-through-cooking",
  },
  {
    id: 13,
    thumbnail: "https://www.cultureandhealth.com/images/food-and-mood.jpg",
    association: "Mental Health Awareness",
    title: "The Role of Culture in Food and Mood",
    description:
      "A cultural perspective on how food traditions impact mental health.",
    url: "https://www.cultureandhealth.com/food-and-mood",
  },
  {
    id: 14,
    thumbnail: "https://www.guinnessworldrecords.com/images/spiciest-pepper.jpg",
    association: "Info",
    title: "What Is the Spiciest Pepper in the World?",
    description:
      "A detailed analysis of contenders for the title of the spiciest pepper.",
    url: "https://www.guinnessworldrecords.com/spiciest-pepper",
  },
  {
    id: 15,
    thumbnail: "https://www.pepperfacts.com/images/fun-facts.jpg",
    association: "Info",
    title: "Fun Facts About Hot Peppers",
    description:
      "Discover interesting trivia and facts about hot peppers around the globe.",
    url: "https://www.pepperfacts.com/fun-facts",
  },
  {
    id: 16,
    thumbnail: "https://www.historyofchili.com/images/chili-history.jpg",
    association: "Info",
    title: "A Brief History of Chili Peppers",
    description:
      "Tracing the origins and evolution of chili peppers over centuries.",
    url: "https://www.historyofchili.com/brief-history",
  },
  {
    id: 17,
    thumbnail: "https://www.globalpeppers.com/images/varieties.jpg",
    association: "Info",
    title: "Peppers Around the World: Global Heat",
    description:
      "Exploring the diversity of pepper varieties in different cultures.",
    url: "https://www.globalpeppers.com/varieties",
  },
  {
    id: 18,
    thumbnail: "https://www.culinaryspice.com/images/impact-of-hot-peppers.jpg",
    association: "Info",
    title: "The Culinary Impact of Hot Peppers",
    description:
      "How hot peppers have transformed cooking traditions worldwide.",
    url: "https://www.culinaryspice.com/impact-of-hot-peppers",
  },
  {
    id: 19,
    thumbnail: "https://www.spicyinnovations.com/images/hot-pepper-trends.jpg",
    association: "Info",
    title: "Spicy Innovations: New Trends in Hot Pepper Cuisine",
    description:
      "Discover how chefs are innovating with hot pepper flavors.",
    url: "https://www.spicyinnovations.com/new-trends",
  },
  {
    id: 20,
    thumbnail: "https://www.peppertoday.com/images/modern-scoville.jpg",
    association: "Scoville",
    title: "Modern Trends in Measuring Pepper Heat",
    description:
      "An update on how modern technology is refining the Scoville scale.",
    url: "https://www.peppertoday.com/modern-scoville",
  },
  {
    id: 21,
    thumbnail: "https://www.culinaryevolution.com/images/scotch-bonnet-evolution.jpg",
    association: "Scotch Bonnet Peppers",
    title: "The Evolution of Scotch Bonnet in Culinary Arts",
    description:
      "How this unique pepper has evolved in modern recipes.",
    url: "https://www.culinaryevolution.com/scotch-bonnet",
  },
  {
    id: 22,
    thumbnail: "https://www.exoticflavors.com/images/trinidad-moruga.jpg",
    association: "Trinidad Moruga Scorpion",
    title: "A Culinary Journey with Trinidad Moruga",
    description:
      "Exploring exotic dishes featuring Trinidad Moruga Scorpion.",
    url: "https://www.exoticflavors.com/trinidad-moruga",
  },
  {
    id: 23,
    thumbnail: "https://www.balancehealth.com/images/spice-and-serenity.jpg",
    association: "Mental Health Awareness",
    title: "Spice and Serenity: Balancing Heat with Mental Calm",
    description:
      "An exploration of how a balanced diet with spicy foods can influence calmness.",
    url: "https://www.balancehealth.com/spice-and-serenity",
  },
  {
    id: 24,
    thumbnail: "https://www.chemistryofspice.com/images/pepper-heat.jpg",
    association: "Info",
    title: "The Science of Spiciness: What Makes Peppers Hot?",
    description:
      "Understanding the chemical compounds that contribute to pepper heat.",
    url: "https://www.chemistryofspice.com/science-of-spiciness",
  },
  {
    id: 25,
    thumbnail: "https://www.farmtotablepeppers.com/images/journey.jpg",
    association: "Info",
    title: "From Farm to Table: The Journey of a Pepper",
    description:
      "Follow the fascinating journey of a pepper from cultivation to culinary star.",
    url: "https://www.farmtotablepeppers.com/journey",
  },
  {
    id: 26,
    thumbnail: "https://www.mindfuleating.com/images/spicy-wellness.jpg",
    association: "Mental Health Awareness",
    title: "Mindful Eating: Embracing Spicy Foods for Wellness",
    description:
      "How incorporating spicy foods can be part of a mindful eating practice.",
    url: "https://www.mindfuleating.com/spicy-wellness",
  },
  // New additional articles (IDs 27 to 50)
  {
    id: 27,
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/9/91/Red_Chili_Pepper.jpg",
    association: "Peppers 101",
    title: "A Beginner's Guide to Peppers",
    description:
      "An introductory guide covering various types of peppers and their culinary uses. Source: Wikipedia.",
    url: "https://en.wikipedia.org/wiki/Chili_pepper",
  },
  {
    id: 28,
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/4/47/Capsaicin_molecule.png",
    association: "Scoville",
    title: "The Science of Capsaicin",
    description:
      "A scientific overview of capsaicin—the molecule responsible for pepper heat. Source: Wikipedia.",
    url: "https://en.wikipedia.org/wiki/Capsaicin",
  },
  {
    id: 29,
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Hot_Sauce_Bottles.jpg",
    association: "Hot Sauces",
    title: "Top 10 Hot Sauces in the World",
    description:
      "A review of the hottest hot sauces available, featuring recipes and flavor profiles. Source: Gourmet Traveller.",
    url: "https://www.gourmettraveller.com.au/food/food-news/top-hot-sauces-19010",
  },
  {
    id: 30,
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Bell_peppers.jpg",
    association: "Peppers 101",
    title: "Understanding the Different Types of Peppers",
    description:
      "An overview of various pepper types including bell, chili, and specialty peppers. Source: Britannica.",
    url: "https://www.britannica.com/topic/pepper-plant",
  },
  {
    id: 31,
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/2/27/Spice_blends.jpg",
    association: "Spice Combinations",
    title: "The Art of Spice Blending",
    description:
      "Learn how to create custom spice blends to enhance your cooking. Source: Epicurious.",
    url: "https://www.epicurious.com/ingredients/how-to-make-your-own-spice-blend-article",
  },
  {
    id: 32,
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/8/80/Chili_peppers_video.jpg",
    association: "Video Essay",
    title: "The History of Chili Peppers: A Video Essay",
    description:
      "A compelling video essay exploring the evolution of chili peppers and their cultural impact. Source: YouTube (Various Channels).",
    url: "https://www.youtube.com/watch?v=QsmHDSvK6M8",
  },
  {
    id: 33,
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Spicy_food_podcast.jpg",
    association: "Podcast",
    title: "Spice Talk: The Capsaicin Conversation",
    description:
      "A podcast discussing the science behind spicy foods and the cultural impact of capsaicin. Source: NPR.",
    url: "https://www.npr.org/sections/thesalt/",
  },
  {
    id: 34,
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/3/39/Chili_Peppers_Capsaicin.jpg",
    association: "Peppers 101",
    title: "Capsaicin Levels Explained",
    description:
      "A detailed explanation of how capsaicin levels determine a pepper's heat. Source: Scientific American.",
    url: "https://www.scientificamerican.com/article/what-makes-peppers-hot/",
  },
  {
    id: 35,
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/9/9d/DIY_hot_sauce.jpg",
    association: "Hot Sauces",
    title: "DIY Hot Sauce Recipes",
    description:
      "Step-by-step guides to creating your own hot sauces at home. Source: Serious Eats.",
    url: "https://www.seriouseats.com/diy-hot-sauce-recipes",
  },
  {
    id: 36,
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Plate_of_peppers.jpg",
    association: "Culinary",
    title: "Pairing Peppers with Food",
    description:
      "Tips for pairing various peppers with dishes to elevate flavor. Source: Saveur.",
    url: "https://www.saveur.com/article/Recipes/Pairing-Peppers-With-Food",
  },
  {
    id: 37,
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/4/45/Spice_journal.jpg",
    association: "Journal",
    title: "Journal of Spices: Research and Reviews",
    description:
      "Academic research and reviews on spice trends and culinary innovations. Source: ScienceDirect.",
    url: "https://www.sciencedirect.com/topics/agricultural-and-biological-sciences/spices",
  },
  {
    id: 38,
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/1/10/Hot_pepper.jpg",
    association: "Definitions",
    title: "What Makes a Pepper 'Hot'?",
    description:
      "An exploration into the science behind pepper heat and spiciness. Source: National Geographic.",
    url: "https://www.nationalgeographic.com/science/article/pepper-heat",
  },
  {
    id: 39,
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/7/76/Global_pepper_cultures.jpg",
    association: "Culinary",
    title: "Global Pepper Traditions",
    description:
      "How different cultures incorporate peppers into their cuisine. Source: BBC News.",
    url: "https://www.bbc.com/news/world-asia-40398075",
  },
  {
    id: 40,
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/6/67/Fusion_cuisine.jpg",
    association: "Spice Combinations",
    title: "Fusion Cuisine: Blending Cultures and Spices",
    description:
      "How chefs combine spices from different cultures to create innovative dishes. Source: The New York Times.",
    url: "https://www.nytimes.com/2019/04/17/dining/fusion-cuisine.html",
  },
  {
    id: 41,
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Hot_pepper_trends.jpg",
    association: "Video Essay",
    title: "The Evolution of Hot Pepper Trends",
    description:
      "A video essay examining how hot pepper trends have changed over time. Source: YouTube.",
    url: "https://www.youtube.com/watch?v=z9a7jAcKX80",
  },
  {
    id: 42,
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/0/00/Spicy_food_podcast.jpg",
    association: "Podcast",
    title: "Behind the Heat: Conversations with Pepper Experts",
    description:
      "Interviews with chefs and scientists about the future of spicy food. Source: NPR.",
    url: "https://www.npr.org/sections/thesalt/",
  },
  {
    id: 43,
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/8/85/Scoville_scale.jpg",
    association: "Scoville",
    title: "Breaking Down the Scoville Scale",
    description:
      "An in-depth look at the Scoville scale and its impact on food culture. Source: Guinness World Records.",
    url: "https://www.guinnessworldrecords.com/news/2017/3/the-scoville-scale-explained-447116",
  },
  {
    id: 44,
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Chili_vs_bell_pepper.jpg",
    association: "Definitions",
    title: "Peppers vs. Chillies: Understanding the Difference",
    description:
      "Clarifying differences between peppers and chillies with expert insights. Source: Britannica.",
    url: "https://www.britannica.com/topic/chili-pepper",
  },
  {
    id: 45,
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Hot_sauce_collection.jpg",
    association: "Hot Sauces",
    title: "Exploring Global Hot Sauce Varieties",
    description:
      "A comprehensive guide to hot sauces from around the world. Source: Serious Eats.",
    url: "https://www.seriouseats.com/hot-sauce-guide",
  },
  {
    id: 46,
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/4/48/Modern_cuisine_peppers.jpg",
    association: "Culinary",
    title: "Innovative Uses of Peppers in Modern Cuisine",
    description:
      "How modern chefs reinvent traditional pepper dishes. Source: Eater.",
    url: "https://www.eater.com/2019/11/5/20948287/modern-pepper-usage-culinary",
  },
  {
    id: 47,
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Capsaicin_review.jpg",
    association: "Journal",
    title: "Capsaicin and Health: A Scientific Review",
    description:
      "A review of capsaicin's health benefits and risks. Source: ScienceDirect.",
    url: "https://www.sciencedirect.com/science/article/pii/S0308814617304637",
  },
  {
    id: 48,
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/7/70/Cultural_spice_impact.jpg",
    association: "Video Essay",
    title: "The Cultural Impact of Spicy Foods",
    description:
      "A video essay exploring how spicy foods shape cultural identities. Source: YouTube/NPR.",
    url: "https://www.youtube.com/watch?v=6_LtR3rWrkA",
  },
  {
    id: 49,
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/0/08/Spice_chronicles.jpg",
    association: "Podcast",
    title: "Spice Chronicles: Stories Behind the Heat",
    description:
      "A podcast series featuring in-depth interviews on spicy food culture. Source: NPR.",
    url: "https://www.npr.org/sections/thesalt/",
  },
  {
    id: 50,
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/8/85/Scoville_scale.jpg",
    association: "Definitions",
    title: "The Origins of the Scoville Scale",
    description:
      "An exploration of how the Scoville scale was developed and its impact on food science. Source: Wikipedia.",
    url: "https://en.wikipedia.org/wiki/Scoville_scale",
  },
];

export function enrichArticle(article: Article): Article {
  if (!article.thumbnail || article.thumbnail.trim() === "") {
    return {
      ...article,
      thumbnail: `https://loremflickr.com/400/300/${encodeURIComponent(article.title)}`,
    };
  }
  return article;
}
