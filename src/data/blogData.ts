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
    url: "https://www.scovillescale.com/scoville-scale/",
  },
  {
    id: 2,
    thumbnail: "https://www.historyofpepper.com/images/scoville-history.jpg",
    association: "Scoville",
    title: "The History of the Scoville Scale",
    description:
      "A deep dive into how the Scoville scale revolutionized our understanding of spicy foods.",
    url: "https://www.scovillescale.com/scoville-scale/",
  },
  {
    id: 3,
    thumbnail: "https://www.chefscorner.com/assets/images/modern-scoville.jpg",
    association: "Scoville",
    title: "Modern Applications of the Scoville Scale",
    description:
      "How modern chefs and scientists use the Scoville scale in culinary arts.",
    url: "https://www.chilipapermadness.com/chili-pepper-types/scoville-heat-scale/",
  },
  {
    id: 4,
    thumbnail: "https://www.caribbeanflavors.com/images/scotch-bonnet.jpg",
    association: "Scotch Bonnet Peppers",
    title: "Discovering the Flavor of Scotch Bonnet Peppers",
    description:
      "An exploration into the unique taste and heat of Scotch Bonnet peppers.",
    url: "https://www.chilipeppermadness.com/chili-pepper-types/scotch-bonnet-peppers/",
  },
  {
    id: 5,
    thumbnail:
      "https://www.foodculture.com/images/traditional-scotch-bonnet.jpg",
    association: "Scotch Bonnet Peppers",
    title: "Traditional Recipes with Scotch Bonnet Peppers",
    description:
      "A collection of traditional Caribbean recipes featuring Scotch Bonnet peppers.",
    url: "https://www.allrecipes.com/recipes/843/everyday-cooking/caribbean/",
  },
  {
    id: 6,
    thumbnail:
      "https://www.nutritioninsights.com/images/scotch-bonnet-health.jpg",
    association: "Scotch Bonnet Peppers",
    title: "Scotch Bonnet Peppers: Health Benefits and Culinary Uses",
    description:
      "Learn about the nutritional benefits and culinary versatility of Scotch Bonnet peppers.",
    url: "https://www.healthline.com/nutrition/scotch-bonnet-pepper",
  },
  {
    id: 7,
    thumbnail: "https://www.peppernews.com/images/trinidad-moruga.jpg",
    association: "Trinidad Moruga Scorpion",
    title: "Trinidad Moruga Scorpion: The Heat Champion",
    description:
      "Investigating why the Trinidad Moruga Scorpion is one of the hottest peppers in the world.",
    url: "https://www.chilipeppermadness.com/chili-pepper-types/trinidad-moruga-scorpion-peppers/",
  },
  {
    id: 8,
    thumbnail:
      "https://www.spicyrecipes.com/images/trinidad-moruga-adventures.jpg",
    association: "Trinidad Moruga Scorpion",
    title: "Culinary Adventures with Trinidad Moruga Scorpion",
    description:
      "Creative recipes to harness the intense heat of Trinidad Moruga Scorpion peppers.",
    url: "https://www.chilipeppermadness.com/recipes/trinidad-scorpion-recipes/",
  },
  {
    id: 9,
    thumbnail:
      "https://www.scienceofspice.com/images/trinidad-moruga-science.jpg",
    association: "Trinidad Moruga Scorpion",
    title: "The Science Behind the Trinidad Moruga Scorpion",
    description:
      "A look at the genetic and chemical factors that make this pepper so hot.",
    url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7768225/",
  },
  {
    id: 10,
    thumbnail:
      "https://www.psychologytoday.com/images/spicy-foods-mental-health.jpg",
    association: "Mental Health Awareness",
    title: "Spicy Foods and Mental Health: The Unexpected Link",
    description: "Examining how spicy foods can influence mental well-being.",
    url: "https://www.psychologytoday.com/us/blog/food-for-thought/202307/can-spicy-foods-help-with-depression-and-anxiety",
  },
  {
    id: 11,
    thumbnail:
      "https://www.caribbeanwellness.com/images/cuisine-mental-health.jpg",
    association: "Mental Health Awareness",
    title: "Caribbean Cuisine and Mental Health",
    description:
      "How traditional Caribbean cooking practices promote mental wellness.",
    url: "https://www.researchgate.net/publication/344159286_Caribbean_Food_and_Nutrition_for_Mental_Health",
  },
  {
    id: 12,
    thumbnail: "https://www.mentalhealthcooking.com/images/cooking-therapy.jpg",
    association: "Mental Health Awareness",
    title: "Cooking as Therapy: The Mental Health Benefits of Food Preparation",
    description:
      "Exploring culinary activities as a form of mental health therapy.",
    url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10365589/",
  },
  {
    id: 13,
    thumbnail: "https://www.cultureandhealth.com/images/food-and-mood.jpg",
    association: "Mental Health Awareness",
    title: "The Role of Culture in Food and Mood",
    description:
      "A cultural perspective on how food traditions impact mental health.",
    url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6723444/",
  },
  {
    id: 14,
    thumbnail:
      "https://www.guinnessworldrecords.com/images/spiciest-pepper.jpg",
    association: "Info",
    title: "What Is the Spiciest Pepper in the World?",
    description:
      "A detailed analysis of contenders for the title of the spiciest pepper.",
    url: "https://www.guinnessworldrecords.com/news/2023/10/what-is-the-hottest-chilli-pepper-in-the-world-760800",
  },
  {
    id: 15,
    thumbnail: "https://www.pepperfacts.com/images/fun-facts.jpg",
    association: "Info",
    title: "Fun Facts About Hot Peppers",
    description:
      "Discover interesting trivia and facts about hot peppers around the globe.",
    url: "https://www.farmersalmanac.com/hot-pepper-guide-1733",
  },
  {
    id: 16,
    thumbnail: "https://www.historyofchili.com/images/chili-history.jpg",
    association: "Info",
    title: "A Brief History of Chili Peppers",
    description:
      "Tracing the origins and evolution of chili peppers over centuries.",
    url: "https://www.britannica.com/plant/chili-pepper",
  },
  {
    id: 17,
    thumbnail: "https://www.globalpeppers.com/images/varieties.jpg",
    association: "Info",
    title: "Peppers Around the World: Global Heat",
    description:
      "Exploring the diversity of pepper varieties in different cultures.",
    url: "https://www.196flavors.com/glossary-of-peppers-from-around-the-world/",
  },
  {
    id: 18,
    thumbnail: "https://www.culinaryspice.com/images/impact-of-hot-peppers.jpg",
    association: "Info",
    title: "The Culinary Impact of Hot Peppers",
    description:
      "How hot peppers have transformed cooking traditions worldwide.",
    url: "https://www.fsis.usda.gov/food-safety-education/food-safety-basics/spices-and-food-safety",
  },
  {
    id: 19,
    thumbnail: "https://www.spicyinnovations.com/images/hot-pepper-trends.jpg",
    association: "Info",
    title: "Spicy Innovations: New Trends in Hot Pepper Cuisine",
    description: "Discover how chefs are innovating with hot pepper flavors.",
    url: "https://www.fooddive.com/news/mintel-spicy-food-trend-menu-innovation/538503/",
  },
  {
    id: 20,
    thumbnail: "https://www.peppertoday.com/images/modern-scoville.jpg",
    association: "Scoville",
    title: "Modern Trends in Measuring Pepper Heat",
    description:
      "An update on how modern technology is refining the Scoville scale.",
    url: "https://www.analyticalinstruments.co.uk/news/analytical-instrumentation-for-the-scoville-scale/",
  },
  {
    id: 21,
    thumbnail:
      "https://www.culinaryevolution.com/images/scotch-bonnet-evolution.jpg",
    association: "Scotch Bonnet Peppers",
    title: "The Evolution of Scotch Bonnet in Culinary Arts",
    description: "How this unique pepper has evolved in modern recipes.",
    url: "https://jamaica-gleaner.com/article/food/20230831/scotch-bonnet-pepper-culinary-dynamo",
  },
  {
    id: 22,
    thumbnail: "https://www.exoticflavors.com/images/trinidad-moruga.jpg",
    association: "Trinidad Moruga Scorpion",
    title: "A Culinary Journey with Trinidad Moruga",
    description: "Exploring exotic dishes featuring Trinidad Moruga Scorpion.",
    url: "https://www.caymangoodtaste.com/recipes/scotch-bonnet-hot-pepper-sauce",
  },
  {
    id: 23,
    thumbnail: "https://www.balancehealth.com/images/spice-and-serenity.jpg",
    association: "Mental Health Awareness",
    title: "Spice and Serenity: Balancing Heat with Mental Calm",
    description:
      "An exploration of how a balanced diet with spicy foods can influence calmness.",
    url: "https://www.everydayhealth.com/diet-nutrition/diet/spicy-food-benefits/",
  },
  {
    id: 24,
    thumbnail: "https://www.chemistryofspice.com/images/pepper-heat.jpg",
    association: "Info",
    title: "The Science of Spiciness: What Makes Peppers Hot?",
    description:
      "Understanding the chemical compounds that contribute to pepper heat.",
    url: "https://www.sciencelearn.org.nz/resources/729-chilli-chemistry",
  },
  {
    id: 25,
    thumbnail: "https://www.farmtotablepeppers.com/images/journey.jpg",
    association: "Info",
    title: "From Farm to Table: The Journey of a Pepper",
    description:
      "Follow the fascinating journey of a pepper from cultivation to culinary star.",
    url: "https://www.specialtyproduce.com/produce/Peppers_Hot_Assorted_312.php",
  },
  {
    id: 26,
    thumbnail: "https://www.mindfuleating.com/images/spicy-wellness.jpg",
    association: "Mental Health Awareness",
    title: "Mindful Eating: Embracing Spicy Foods for Wellness",
    description:
      "How incorporating spicy foods can be part of a mindful eating practice.",
    url: "https://www.eatingwell.com/article/7948878/health-benefits-of-spicy-food/",
  },
  {
    id: 27,
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/9/91/Red_Chili_Pepper.jpg",
    association: "Peppers 101",
    title: "A Beginner's Guide to Peppers",
    description:
      "An introductory guide covering various types of peppers and their culinary uses. Source: Wikipedia.",
    url: "https://www.allrecipes.com/recipes/22342/ingredients/produce/vegetables/chile-peppers/",
  },
  {
    id: 28,
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/4/47/Capsaicin_molecule.png",
    association: "Scoville",
    title: "The Science of Capsaicin",
    description:
      "A scientific overview of capsaicin—the molecule responsible for pepper heat. Source: Wikipedia.",
    url: "https://www.acs.org/education/whatischemistry/landmarks/wilbur-scoville-pepper-test.html",
  },
  {
    id: 29,
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/5/5a/Hot_Sauce_Bottles.jpg",
    association: "Hot Sauces",
    title: "Top 10 Hot Sauces in the World",
    description:
      "A review of the hottest hot sauces available, featuring recipes and flavor profiles. Source: Gourmet Traveller.",
    url: "https://www.10best.com/awards/travel/best-hot-sauce/",
  },
  {
    id: 30,
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/b/bf/Bell_peppers.jpg",
    association: "Peppers 101",
    title: "Understanding the Different Types of Peppers",
    description:
      "An overview of various pepper types including bell, chili, and specialty peppers. Source: Britannica.",
    url: "https://www.farmersalmanac.com/types-of-peppers-1735",
  },
  {
    id: 31,
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/2/27/Spice_blends.jpg",
    association: "Spice Combinations",
    title: "The Art of Spice Blending",
    description:
      "Learn how to create custom spice blends to enhance your cooking. Source: Epicurious.",
    url: "https://www.simplyrecipes.com/spice-blends-recipes-5117299",
  },
  {
    id: 32,
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/8/80/Chili_peppers_video.jpg",
    association: "Video Essay",
    title: "The History of Chili Peppers: A Video Essay",
    description:
      "A compelling video essay exploring the evolution of chili peppers and their cultural impact. Source: YouTube (Various Channels).",
    url: "https://www.youtube.com/watch?v=3jS_zDd-mv4",
  },
  {
    id: 33,
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/0/0b/Spicy_food_podcast.jpg",
    association: "Podcast",
    title: "Spice Talk: The Capsaicin Conversation",
    description:
      "A podcast discussing the science behind spicy foods and the cultural impact of capsaicin. Source: NPR.",
    url: "https://podcasts.apple.com/us/podcast/spicy-tales/id1684730498",
  },
  {
    id: 34,
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/3/39/Chili_Peppers_Capsaicin.jpg",
    association: "Peppers 101",
    title: "Capsaicin Levels Explained",
    description:
      "A detailed explanation of how capsaicin levels determine a pepper's heat. Source: Scientific American.",
    url: "https://www.compoundchem.com/2014/02/20/the-chemistry-of-chili-peppers-capsaicin/",
  },
  {
    id: 35,
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/9/9d/DIY_hot_sauce.jpg",
    association: "Hot Sauces",
    title: "DIY Hot Sauce Recipes",
    description:
      "Step-by-step guides to creating your own hot sauces at home. Source: Serious Eats.",
    url: "https://www.chilipeppermadness.com/recipes/best-homemade-hot-sauce-recipes/",
  },
  {
    id: 36,
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/f/fd/Plate_of_peppers.jpg",
    association: "Culinary",
    title: "Pairing Peppers with Food",
    description:
      "Tips for pairing various peppers with dishes to elevate flavor. Source: Saveur.",
    url: "https://www.indianhealthyrecipes.com/chilli-paneer-recipe-chilli-paneer-dry-gravy/",
  },
  {
    id: 37,
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/4/45/Spice_journal.jpg",
    association: "Journal",
    title: "Journal of Spices: Research and Reviews",
    description:
      "Academic research and reviews on spice trends and culinary innovations. Source: ScienceDirect.",
    url: "https://www.tandfonline.com/toc/tsij20/current",
  },
  {
    id: 38,
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/1/10/Hot_pepper.jpg",
    association: "Definitions",
    title: "What Makes a Pepper 'Hot'?",
    description:
      "An exploration into the science behind pepper heat and spiciness. Source: National Geographic.",
    url: "https://www.britannica.com/video/184388/Overview-capsaicin",
  },
  {
    id: 39,
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/7/76/Global_pepper_cultures.jpg",
    association: "Culinary",
    title: "Global Pepper Traditions",
    description:
      "How different cultures incorporate peppers into their cuisine. Source: BBC News.",
    url: "https://www.nationalgeographic.com/culture/article/chili-peppers-history-food-south-america",
  },
  {
    id: 40,
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/6/67/Fusion_cuisine.jpg",
    association: "Spice Combinations",
    title: "Fusion Cuisine: Blending Cultures and Spices",
    description:
      "How chefs combine spices from different cultures to create innovative dishes. Source: The New York Times.",
    url: "https://www.nytimes.com/2023/08/22/dining/fusion-food-restaurants-nyc.html",
  },
  {
    id: 41,
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/5/5a/Hot_pepper_trends.jpg",
    association: "Video Essay",
    title: "The Evolution of Hot Pepper Trends",
    description:
      "A video essay examining how hot pepper trends have changed over time. Source: YouTube.",
    url: "https://www.youtube.com/watch?v=iJKVWjRuH9U",
  },
  {
    id: 42,
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/0/00/Spicy_food_podcast.jpg",
    association: "Podcast",
    title: "Behind the Heat: Conversations with Pepper Experts",
    description:
      "Interviews with chefs and scientists about the future of spicy food. Source: NPR.",
    url: "https://podcasts.apple.com/us/podcast/the-chili-chump-podcast/id1582818797",
  },
  {
    id: 43,
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/8/85/Scoville_scale.jpg",
    association: "Scoville",
    title: "Breaking Down the Scoville Scale",
    description:
      "An in-depth look at the Scoville scale and its impact on food culture. Source: Guinness World Records.",
    url: "https://www.britannica.com/science/Scoville-scale",
  },
  {
    id: 44,
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/3/3e/Chili_vs_bell_pepper.jpg",
    association: "Definitions",
    title: "Peppers vs. Chillies: Understanding the Difference",
    description:
      "Clarifying differences between peppers and chillies with expert insights. Source: Britannica.",
    url: "https://www.diffen.com/difference/Chili_vs_Pepper",
  },
  {
    id: 45,
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/1/1d/Hot_sauce_collection.jpg",
    association: "Hot Sauces",
    title: "Exploring Global Hot Sauce Varieties",
    description:
      "A comprehensive guide to hot sauces from around the world. Source: Serious Eats.",
    url: "https://www.timeout.com/usa/restaurants/best-hot-sauces-in-america",
  },
  {
    id: 46,
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/4/48/Modern_cuisine_peppers.jpg",
    association: "Culinary",
    title: "Innovative Uses of Peppers in Modern Cuisine",
    description:
      "How modern chefs reinvent traditional pepper dishes. Source: Eater.",
    url: "https://www.foodnetwork.com/how-to/packages/food-network-essentials/cooking-with-chiles",
  },
  {
    id: 47,
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/2/2e/Capsaicin_review.jpg",
    association: "Journal",
    title: "Capsaicin and Health: A Scientific Review",
    description:
      "A review of capsaicin's health benefits and risks. Source: ScienceDirect.",
    url: "https://www.mdpi.com/2306-5710/9/9/178",
  },
  {
    id: 48,
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/7/70/Cultural_spice_impact.jpg",
    association: "Video Essay",
    title: "The Cultural Impact of Spicy Foods",
    description:
      "A video essay exploring how spicy foods shape cultural identities. Source: YouTube/NPR.",
    url: "https://www.youtube.com/watch?v=14yKj6-6gGg",
  },
  {
    id: 49,
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/0/08/Spice_chronicles.jpg",
    association: "Podcast",
    title: "Spice Chronicles: Stories Behind the Heat",
    description:
      "A podcast series featuring in-depth interviews on spicy food culture. Source: NPR.",
    url: "https://www.npr.org/podcasts/510355/the-salt",
  },
  {
    id: 50,
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/8/85/Scoville_scale.jpg",
    association: "Definitions",
    title: "The Origins of the Scoville Scale",
    description:
      "An exploration of how the Scoville scale was developed and its impact on food science. Source: Wikipedia.",
    url: "https://www.ams.usda.gov/grades-standards/scoville-heat-units-and-hplc-determining-pungency-hot-sauces",
  },
  {
    id: 51,
    thumbnail: "https://www.scovillescale.com/assets/images/scale1.jpg",
    association: "Article",
    title: "The Scotch Bonnet | Types of Chile Peppers",
    description:
      "Explore the Scotch Bonnet pepper, popular in Caribbean cuisine, known for its spicy and sweet flavor, and its use in hot sauces.",
    url: "https://hotsaucefever.com/hot-peppers/scotch-bonnet/",
  },
  {
    id: 52,
    thumbnail:
      "https://specialtyproduce.com/produce_items/broccolini-baby-broccoli-bimi-648.jpg",
    association: "Informational Page",
    title: "Scotch Bonnets Chile Peppers Information and Facts",
    description:
      "Get detailed information and facts about Scotch Bonnet chile peppers, including taste, availability, uses, and nutritional value.",
    url: "https://specialtyproduce.com/produce/Scotch_Bonnets_Chile_Peppers_165.php",
  },
  {
    id: 53,
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Tam_o%27_shanter_bonnet.jpg/800px-Tam_o%27_shanter_bonnet.jpg",
    association: "Wikipedia Article",
    title: "Scotch bonnet - Wikipedia",
    description:
      "Learn about the Scotch bonnet chili pepper, a variety of chili pepper named for its resemblance to a Scottish tam o' shanter bonnet, its origins, and culinary uses.",
    url: "https://en.wikipedia.org/wiki/Scotch_bonnet",
  },
  {
    id: 54,
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Tam_o%27_shanter_bonnet.jpg/800px-Tam_o%27_shanter_bonnet.jpg",
    association: "Wikipedia Article",
    title: "Scotch bonnet - Simple English Wikipedia",
    description:
      "Read a simplified overview of Scotch bonnet peppers, their heat level, culinary uses, and comparison to habaneros.",
    url: "https://simple.wikipedia.org/wiki/Scotch_bonnet",
  },
  {
    id: 55,
    thumbnail:
      "https://www.mikeyvsfoods.com/uploads/1/3/8/5/138538543/s787813943853378385_p35_i1_w640.png",
    association: "Blog Post",
    title: "Scotch Bonnet Vs Habanero: Which Packs More?",
    description:
      "Compare Scotch Bonnet and Habanero peppers in terms of flavor, heat level, origin, and culinary applications.",
    url: "https://www.mikeyvsfoods.com/post/scotch-bonnet-vs-habanero",
  },
  {
    id: 56,
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Trinidad_Moruga_Scorpion_yellow.jpg/800px-Trinidad_Moruga_Scorpion_yellow.jpg",
    association: "Wikipedia Article",
    title: "Trinidad Moruga scorpion - Wikipedia",
    description:
      "Explore the Trinidad Moruga scorpion pepper, once considered the hottest pepper in the world, its heat level, origin, and flavor profile.",
    url: "https://en.wikipedia.org/wiki/Trinidad_Moruga_scorpion",
  },
  {
    id: 57,
    thumbnail:
      "https://magicplantfarms.com/cdn/shop/files/Trinidad-Moruga-Scorpion-pepper.jpg?v=1692282833&width=800",
    association: "Informational Page",
    title: "Trinidad Moruga Scorpion pepper",
    description:
      "Learn about the Trinidad Moruga Scorpion pepper, known for its extreme heat and fruity flavor, including its origin in Trinidad and Tobago.",
    url: "https://magicplantfarms.com/pepper-varieties/moruga-scorpion-trinidad-moruga/",
  },
  {
    id: 58,
    thumbnail:
      "https://thehippyseedcompany.com/wp-content/uploads/2023/07/Trinidad-Moruga-Scorpion-scaled.jpg",
    association: "Product Description",
    title: "Trinidad Moruga Scorpion",
    description:
      "Discover the Trinidad Moruga Scorpion pepper, known for its fiery punch and robust growth, with details on its taste profile, heat level, and culinary uses.",
    url: "https://thehippyseedcompany.com/product/trinidad-moruga-scorpion/",
  },
  {
    id: 59,
    thumbnail: "https://www.spicemad.com/img/p/1/3/8/138-large_default.jpg",
    association: "Informational Article",
    title: "Trinidad Moruga Scorpion",
    description:
      "Read about the Trinidad Moruga Scorpion, one of the hottest chillies in the world, its flavor, and culinary applications.",
    url: "http://www.spicemad.com/p/trinidad-moruga-scorpion.html",
  },
  {
    id: 60,
    thumbnail:
      "https://pepperhead.com/wp-content/uploads/2019/03/Trinidad-Moruga-Scorpion-Seeds-pepper.jpg",
    association: "Product Description",
    title: "Trinidad Moruga Scorpion - PepperHead",
    description:
      "Explore the Trinidad Moruga Scorpion pepper, considered the #2 hottest pepper in the world, with information on its heat level and flavor.",
    url: "https://pepperhead.com/shop/moruga-scorpion/",
  },
  {
    id: 61,
    thumbnail:
      "https://www.peppersanyhow.com/uploads/1/3/4/1/134128455/s534873994224884843_p20_i1_w640.png",
    association: "Blog Post",
    title: "Trinidad Pimento Pepper - peppers any how",
    description:
      "Learn about the Trinidad pimento pepper, a flavorful chili pepper from Trinidad and Tobago, known for its mild to medium heat and sweet, fruity flavor.",
    url: "https://www.peppersanyhow.com/blog-content-2/pepper-profile-trinidad-pimento-pepper",
  },
  {
    id: 62,
    thumbnail:
      "https://herbsocietyblog.files.wordpress.com/2020/12/pimento-peppers-3.jpg?w=840",
    association: "Blog Post",
    title: "Trinidad pimento peppers | The Herb Society of America Blog",
    description:
      "Discover Trinidad pimento peppers, a mild Capsicum chinense used in Trinidadian cooking, known for its flavor without the heat.",
    url: "https://herbsocietyblog.wordpress.com/tag/trinidad-pimento-peppers/",
  },
  {
    id: 63,
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Pimientos_de_Padr%C3%B3n.jpg/800px-Pimientos_de_Padr%C3%B3n.jpg",
    association: "Wikipedia Article",
    title: "Pimiento - Wikipedia",
    description:
      "Read about pimiento or cherry pepper, a variety of large, red, heart-shaped chili pepper, its uses, and flavor profile.",
    url: "https://en.wikipedia.org/wiki/Pimiento",
  },
  {
    id: 64,
    thumbnail:
      "https://www.smartgardener.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBMGc0QTVEaG96RWt4d016aG1NemRrTjJZeU16b3hOell5TjJZeU16b3hOREU1T1dGbEdWaDBkSEE9IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--f84884945903552fc689497489a3394da9934190/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaUNrZ2g4RW1WdWJBd21jOXJsY2pGdHBXd3RUb21abVkyVnNQVU9HT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--27de89e3b3d454804223c8c9a9c89a25c1e5e441/Peppers-Trinidad-Spice-Overview.jpg",
    association: "Growing Guide",
    title: "Peppers: Trinidad (Spice) Overview - Growing Tips",
    description:
      "Get growing tips and an overview of Trinidad (Spice) peppers, known for their habanero flavor with little heat.",
    url: "https://www.smartgardener.com/plants/4352-peppers-trinidad-spice/overview",
  },
  {
    id: 65,
    thumbnail:
      "https://cdn.shopify.com/s/files/1/0225/4439/products/Trinidad_Seasoning_Pimento_Pepper_Seeds_900x.jpg?v=1614364298",
    association: "Product Description",
    title: "Trinidad Pimento Pepper - Truelove Seeds",
    description:
      "Explore Trinidad Pimento Pepper seeds, a Caribbean seasoning pepper with little to no heat, perfect for flavorful sauces and salsas.",
    url: "https://trueloveseeds.com/products/trinidad-pimento-pepper",
  },
  {
    id: 66,
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Jalapeno-chilies.jpg/800px-Jalapeno-chilies.jpg",
    association: "Wikipedia Article",
    title: "Jalapeño - Wikipedia",
    description:
      "Discover the Jalapeño pepper, a medium-sized chili pepper pod type, its origin in Mexico, and its global culinary popularity.",
    url: "https://en.wikipedia.org/wiki/Jalape%C3%B1o",
  },
  {
    id: 67,
    thumbnail:
      "https://www.chilipeppermadness.com/wp-content/uploads/2019/01/jalapeno-popper-焗烤辣椒.jpg",
    association: "Recipe",
    title: "Jalapeno Poppers Recipe",
    description:
      "Learn how to make classic Jalapeno Poppers, filled with cheese and often bacon, a popular appetizer or snack.",
    url: "https://www.allrecipes.com/recipe/14143/jalapeno-poppers-ii/",
  },
  {
    id: 68,
    thumbnail:
      "https://www.simplyrecipes.com/thmb/rCJ_PJK0AcOdQeYjGkLwFKSj2Uo=/720x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Cowboy-Candy-Jalapenos-LEAD-3-877b3989939b44288862396445f5569c.jpg",
    association: "Recipe",
    title: "Candied Jalapenos (Cowboy Candy)",
    description:
      "Try Cowboy Candy, or candied jalapeños, a sweet and spicy condiment perfect for burgers, tacos, and more.",
    url: "https://www.simplyrecipes.com/candied-jalapenos-cowboy-candy-recipe-5260413",
  },
  {
    id: 69,
    thumbnail:
      "https://www.kaufmann-mercantile.com/wp-content/uploads/2023/08/Ancho-Chiles-KM-0484-1200.jpg",
    association: "Informational Page",
    title: "Ancho Chile Peppers",
    description:
      "Explore Ancho chile peppers, dried poblano peppers, known for their mild heat and rich, raisin-like flavor, used extensively in Mexican cuisine.",
    url: "https://www.kaufmann-mercantile.com/products/ancho-chile-peppers",
  },
  {
    id: 70,
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Ancho_chile_drying.jpg/800px-Ancho_chile_drying.jpg",
    association: "Wikipedia Article",
    title: "Poblano - Wikipedia",
    description:
      "Learn about Poblano peppers, mild chili peppers originating from Puebla, Mexico, often dried and then called ancho chiles.",
    url: "https://en.wikipedia.org/wiki/Poblano",
  },
  {
    id: 71,
    thumbnail:
      "https://www.mexicoinmykitchen.com/wp-content/uploads/2013/09/How-to-Roast-Poblano-Peppers-1.jpg",
    association: "Recipe",
    title: "How to Roast Poblano Peppers",
    description:
      "A guide on roasting poblano peppers to enhance their flavor, a key step in many Mexican dishes.",
    url: "https://www.mexicoinmykitchen.com/how-to-roast-poblano-peppers/",
  },
  {
    id: 72,
    thumbnail:
      "https://www.allrecipes.com/thmb/UKbVY4F9r6vK কুলু_j9i8G8K2iA=/720x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/213345-stuffed-poblano-peppers-DDMFS-4x3-0688-134-4c719349470844548b968c4ef06847cb.jpg",
    association: "Recipe",
    title: "Stuffed Poblano Peppers Recipe",
    description:
      "Make Stuffed Poblano Peppers, a dish featuring roasted poblano peppers filled with various ingredients like cheese and meat.",
    url: "https://www.allrecipes.com/recipe/213345/stuffed-poblano-peppers/",
  },
  {
    id: 73,
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Habanero_Red_Savina_and_Orange.jpg/800px-Habanero_Red_Savina_and_Orange.jpg",
    association: "Wikipedia Article",
    title: "Habanero - Wikipedia",
    description:
      "Explore the Habanero pepper, a hot chili pepper of South American origin, known for its fruity flavor and heat.",
    url: "https://en.wikipedia.org/wiki/Habanero",
  },
  {
    id: 74,
    thumbnail:
      "https://www.chilipeppermadness.com/wp-content/uploads/2018/07/habanero-hot-sauce-2.jpg",
    association: "Recipe",
    title: "Habanero Hot Sauce Recipe",
    description:
      "Create your own Habanero Hot Sauce, capturing the pepper's intense heat and fruity notes in a flavorful condiment.",
    url: "https://www.chilipeppermadness.com/recipes/habanero-hot-sauce-recipe/",
  },
  {
    id: 75,
    thumbnail:
      "https://www.allrecipes.com/thmb/q-Uc9JH-kzj6OQtY0aJpQjJvxFQ=/720x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/228194-habanero-jelly-DDMFS-4x3-1591-972451455c4d4a01b2a723e2a642051b.jpg",
    association: "Recipe",
    title: "Habanero Jelly Recipe",
    description:
      "Make Habanero Jelly, a sweet and spicy jelly that balances the heat of habaneros with sweetness, great with appetizers or desserts.",
    url: "https://www.allrecipes.com/recipe/228194/habanero-jelly/",
  },
  {
    id: 76,
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Cayenne-pepper.jpg/800px-Cayenne-pepper.jpg",
    association: "Wikipedia Article",
    title: "Cayenne pepper - Wikipedia",
    description:
      "Learn about Cayenne peppers, slender, moderately hot chili peppers used in various cuisines and known for their powdered spice form.",
    url: "https://en.wikipedia.org/wiki/Cayenne_pepper",
  },
  {
    id: 77,
    thumbnail:
      "https://www.themediterraneandish.com/wp-content/uploads/2023/01/cayenne-pepper-recipe-3-1200x900.jpg",
    association: "Informational Page",
    title: "What Is Cayenne Pepper? - The Mediterranean Dish",
    description:
      "Discover cayenne pepper, its flavor profile, heat level, and how it's used in cooking, plus get recipe ideas.",
    url: "https://www.themediterraneandish.com/what-is-cayenne-pepper/",
  },
  {
    id: 78,
    thumbnail:
      "https://www.africanbites.com/wp-content/uploads/2020/01/IMG_1793-2-500x500.jpg",
    association: "Recipe",
    title: "Pepper Sauce (African Style)",
    description:
      "Make African Pepper Sauce using cayenne peppers, a versatile and spicy condiment to enhance any meal.",
    url: "https://www.africanbites.com/pepper-sauce/",
  },
  {
    id: 79,
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Serrano_peppers_white_background.jpg/800px-Serrano_peppers_white_background.jpg",
    association: "Wikipedia Article",
    title: "Serrano pepper - Wikipedia",
    description:
      "Explore Serrano peppers, chili peppers that are hotter than jalapeños, widely used in Mexican and Thai cuisine.",
    url: "https://en.wikipedia.org/wiki/Serrano_pepper",
  },
  {
    id: 80,
    thumbnail:
      "https://www.chilipeppermadness.com/wp-content/uploads/2018/11/serrano-salsa-verde-1.jpg",
    association: "Recipe",
    title: "Serrano Pepper Salsa Verde Recipe",
    description:
      "Prepare Serrano Salsa Verde, a vibrant green salsa that highlights the fresh, bright flavor and heat of serrano peppers.",
    url: "https://www.chilipeppermadness.com/recipes/serrano-salsa-verde-recipe/",
  },
  {
    id: 81,
    thumbnail:
      "https://www.simplyrecipes.com/thmb/QJPDj93hhnQL8j3igjCFjJgLzQQ=/720x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Quick-Pickled-Serrano-Peppers-LEAD-3-322b791f0e8247c081d42b083a93a83c.jpg",
    association: "Recipe",
    title: "Quick Pickled Serrano Peppers",
    description:
      "Learn how to quickly pickle serrano peppers, a great way to preserve them and add a spicy, tangy kick to dishes.",
    url: "https://www.simplyrecipes.com/quick-pickled-serrano-peppers-recipe-7162248",
  },
  {
    id: 82,
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Guindillas_de_Ibarra.jpg/800px-Guindillas_de_Ibarra.jpg",
    association: "Wikipedia Article",
    title: "Guindilla pepper - Wikipedia",
    description:
      "Discover Guindilla peppers, long, thin, moderately spicy chili peppers from the Basque Country in Spain, often pickled.",
    url: "https://en.wikipedia.org/wiki/Guindilla_pepper",
  },
  {
    id: 83,
    thumbnail:
      "https://www.bascofinefoods.com/cdn/shop/products/Ibarra-Chillies-Guindillas-de-Ibarra-PDO-Basco-Fine-Foods-Product-min_1024x1024.jpg?v=1621258989",
    association: "Product Description",
    title: "Ibarra Chillies - Guindillas de Ibarra PDO",
    description:
      "Product description of Guindillas de Ibarra PDO, highlighting their Protected Designation of Origin status and unique qualities.",
    url: "https://www.bascofinefoods.com/products/ibarra-chillies-guindillas-de-ibarra-pdo",
  },
  {
    id: 84,
    thumbnail:
      "https://www.spanishfood.info/sites/default/files/styles/large_flexible/public/images/productos/guindilla-de-ibarra-1.jpg?itok=jpe2G99u",
    association: "Informational Page",
    title: "Guindilla de Ibarra - Spanish Food",
    description:
      "Informational page about Guindilla de Ibarra peppers, emphasizing their role in Spanish cuisine and distinctive taste.",
    url: "https://www.spanishfood.info/guindilla-de-ibarra",
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
