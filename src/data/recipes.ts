// src/data/recipes.ts

export interface Recipe {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  country: string;      // Country of origin
  cuisine: string;      // Cuisine or food type (e.g., "Caribbean", "Indian", etc.)
  ingredients: string[]; // List of ingredients
  instructions: string[]; // Step-by-step cooking instructions
}

export const recipes: Recipe[] = [
  {
    id: 1,
    title: "Callaloo, Macaroni Pie, & Stew Chicken",
    description:
      "A beloved Trinidad & Tobago dish where tender stew chicken meets a creamy, cheesy macaroni pie and a hearty serving of callaloo. The dish is balanced by fresh herbs and a hint of spice.",
    imageUrl:
      "",
    link: "",
    country: "Trinidad & Tobago",
    cuisine: "Caribbean",
    ingredients: [
      "1 whole chicken, cut into serving pieces",
      "2 cups callaloo leaves (or spinach, if unavailable), washed and chopped",
      "2 cups macaroni pasta",
      "1 cup shredded cheddar cheese",
      "1 large onion, chopped",
      "4 cloves garlic, minced",
      "2 tomatoes, diced",
      "1 scotch bonnet pepper, seeded and finely chopped",
      "1 teaspoon dried thyme",
      "Salt and pepper to taste",
      "2 cups chicken broth",
      "2 tablespoons vegetable oil"
    ],
    instructions: [
      "Season the chicken with salt, pepper, and thyme.",
      "Heat oil in a large pot over medium heat; brown the chicken on all sides.",
      "Add the onions and garlic; sauté until softened.",
      "Stir in the tomatoes and scotch bonnet; cook 2–3 minutes.",
      "Pour in the chicken broth, cover, and simmer for about 45 minutes until tender.",
      "Meanwhile, cook the macaroni as per package directions; drain and mix in the cheese.",
      "Lightly steam or sauté the callaloo until wilted.",
      "Plate the stew chicken with macaroni pie and callaloo on the side."
    ]
  },
  {
    id: 2,
    title: "Indian Butter Chicken",
    description:
      "A classic Indian curry featuring tender chicken pieces simmered in a creamy, spiced tomato sauce. Perfect with naan or rice.",
    imageUrl:
      "",
    link: "",
    country: "India",
    cuisine: "Indian",
    ingredients: [
      "1 kg boneless chicken, cubed",
      "200 ml heavy cream",
      "100 g unsalted butter",
      "2 cups tomato puree",
      "1 large onion, finely chopped",
      "4 cloves garlic, minced",
      "1 tablespoon ginger paste",
      "2 teaspoons garam masala",
      "1 teaspoon turmeric",
      "1 teaspoon red chili powder",
      "Salt to taste",
      "Fresh coriander for garnish"
    ],
    instructions: [
      "Marinate chicken with salt, turmeric, and chili powder for at least 1 hour.",
      "Melt butter in a pan over medium heat; add onions and cook until golden.",
      "Add garlic and ginger paste; cook for 2 minutes.",
      "Pour in tomato puree and simmer for 10 minutes.",
      "Add chicken and cook until tender (about 20 minutes).",
      "Stir in heavy cream and garam masala; simmer for another 5 minutes.",
      "Garnish with coriander and serve with naan or rice."
    ]
  },
  {
    id: 3,
    title: "Jamaican Jerk Chicken",
    description:
      "A fiery Jamaican dish featuring chicken marinated in a blend of aromatic jerk spices and grilled until perfectly charred.",
    imageUrl:
      "",
    link: "",
    country: "Jamaica",
    cuisine: "Caribbean",
    ingredients: [
      "1 whole chicken, cut into pieces",
      "2 tablespoons allspice",
      "1 tablespoon dried thyme",
      "2 teaspoons ground cinnamon",
      "2 teaspoons ground nutmeg",
      "1 scotch bonnet pepper, seeded and chopped",
      "4 cloves garlic, minced",
      "1 inch ginger, grated",
      "Juice of 1 lime",
      "Salt and black pepper to taste",
      "2 tablespoons vegetable oil"
    ],
    instructions: [
      "Blend allspice, thyme, cinnamon, nutmeg, scotch bonnet, garlic, ginger, lime juice, salt, and pepper until smooth.",
      "Marinate chicken in the jerk marinade for at least 4 hours (preferably overnight).",
      "Preheat grill to medium-high heat.",
      "Grill chicken for about 6–8 minutes per side until charred and cooked through.",
      "Let rest briefly before serving with traditional sides like rice and peas."
    ]
  },
  {
    id: 4,
    title: "Mexican Chicken Fajitas",
    description:
      "Sizzling strips of marinated chicken with bell peppers and onions served with warm tortillas, perfect for assembling fajitas.",
    imageUrl:
      "",
    link: "",
    country: "Mexico",
    cuisine: "Mexican",
    ingredients: [
      "500g chicken breast, thinly sliced",
      "1 red bell pepper, sliced",
      "1 green bell pepper, sliced",
      "1 large onion, sliced",
      "2 cloves garlic, minced",
      "Juice of 1 lime",
      "1 teaspoon ground cumin",
      "1 teaspoon paprika",
      "Salt and pepper to taste",
      "2 tablespoons olive oil",
      "Flour tortillas, for serving"
    ],
    instructions: [
      "Combine lime juice, cumin, paprika, salt, and pepper; marinate chicken for 1–2 hours.",
      "Heat olive oil in a skillet over high heat. Sauté onions and peppers until tender-crisp.",
      "Add chicken to the skillet and cook until fully done, about 5–7 minutes.",
      "Warm tortillas and serve the chicken and veggies with optional toppings like salsa and guacamole."
    ]
  },
  {
    id: 5,
    title: "Okra & Rice with Saltfish",
    description:
      "A hearty Caribbean dish featuring salted cod mixed with okra and rice, infused with aromatic herbs and spices.",
    imageUrl:
      "",
    link: "",
    country: "Trinidad & Tobago",
    cuisine: "Caribbean",
    ingredients: [
      "250g saltfish (dried cod)",
      "400g rice",
      "200g okra, sliced",
      "1 large onion, chopped",
      "2 cloves garlic, minced",
      "1 red bell pepper, diced",
      "1 tomato, diced",
      "1 teaspoon thyme",
      "Salt and pepper to taste",
      "3 cups water or fish broth",
      "2 tablespoons vegetable oil"
    ],
    instructions: [
      "Soak the saltfish overnight, then boil for 10 minutes and flake, discarding any bones.",
      "In a pot, heat oil and sauté onions, garlic, bell pepper, and tomato until softened.",
      "Add the flaked saltfish and thyme; stir well.",
      "Mix in rice and water (or broth), bring to a boil, then cover and simmer for 20 minutes until the rice is cooked.",
      "Stir in okra during the last 5 minutes of cooking. Adjust seasoning and serve hot."
    ]
  },
  {
    id: 6,
    title: "Trinidad Doubles",
    description:
      "A popular Trinidadian street food consisting of soft, fried baras filled with curried chickpeas and drizzled with tangy sauces.",
    imageUrl:
      "",
    link: "",
    country: "Trinidad & Tobago",
    cuisine: "Caribbean",
    ingredients: [
      "2 cups chickpeas, soaked overnight and cooked",
      "2 tablespoons curry powder",
      "1 teaspoon turmeric",
      "1 teaspoon cumin",
      "Salt to taste",
      "For the bara (dough): 2 cups flour, 1/2 teaspoon salt, 1 cup water (adjust as needed)",
      "Oil for deep frying",
      "Tamarind sauce and pepper sauce for serving"
    ],
    instructions: [
      "In a saucepan, heat a little oil and sauté the cooked chickpeas with curry powder, turmeric, cumin, and salt until the flavors meld.",
      "For the bara, mix flour, salt, and water to form a soft dough. Knead and let it rest for 30 minutes.",
      "Divide the dough into small balls and roll into thin rounds.",
      "Deep fry the rounds until golden and puffed up.",
      "Place a generous spoonful of curried chickpeas between two baras, drizzle with tamarind and pepper sauces, and serve immediately."
    ]
  },
  {
    id: 7,
    title: "King Fish Meal",
    description:
      "Grilled king fish marinated in lime and herbs, served with a fresh side salad and fried plantains—a simple yet elegant Caribbean delight.",
    imageUrl:
      "",
    link: "",
    country: "Trinidad & Tobago",
    cuisine: "Caribbean",
    ingredients: [
      "4 king fish fillets",
      "Juice of 2 limes",
      "3 cloves garlic, minced",
      "1 teaspoon salt",
      "1/2 teaspoon black pepper",
      "2 tablespoons olive oil",
      "Fresh herbs (parsley or cilantro), chopped",
      "Fried plantains and mixed salad, for serving"
    ],
    instructions: [
      "Marinate the fish fillets with lime juice, garlic, salt, and pepper for 30 minutes.",
      "Preheat the grill to medium-high heat and brush with olive oil.",
      "Grill the fish for 4–5 minutes per side until just cooked through.",
      "Garnish with fresh herbs and serve with a side of fried plantains and a crisp salad."
    ]
  },
  {
    id: 8,
    title: "Chinese Special Fried Rice",
    description:
      "A vibrant fried rice dish loaded with shrimp, pork, chicken, eggs, and mixed vegetables, all tossed in a savory soy sauce blend.",
    imageUrl:
      "",
    link: "",
    country: "China",
    cuisine: "Chinese",
    ingredients: [
      "3 cups cooked jasmine rice (preferably day-old)",
      "150g shrimp, peeled and deveined",
      "150g pork or chicken, thinly sliced",
      "2 eggs, lightly beaten",
      "1 cup mixed vegetables (carrots, peas, corn)",
      "1 onion, diced",
      "3 cloves garlic, minced",
      "3 tablespoons soy sauce",
      "1 tablespoon sesame oil",
      "2 tablespoons vegetable oil",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Heat vegetable oil in a large wok or skillet. Add onions and garlic; stir-fry until fragrant.",
      "Add the sliced pork/chicken and shrimp, cooking until just done.",
      "Push the protein to one side of the pan and scramble the eggs on the other side.",
      "Add the mixed vegetables and rice. Stir-fry vigorously.",
      "Pour in soy sauce and sesame oil; toss until the rice is evenly coated and heated through.",
      "Season with salt and pepper, and serve hot."
    ]
  },
  {
    id: 9,
    title: "Japanese Hibachi Steak and Shrimp",
    description:
      "A hibachi-style dish featuring tender steak and succulent shrimp, served with vegetables and steamed rice, drizzled with a savory sauce.",
    imageUrl:
      "",
    link: "",
    country: "Japan",
    cuisine: "Japanese",
    ingredients: [
      "300g steak (ribeye or sirloin), sliced thinly",
      "200g shrimp, peeled and deveined",
      "1 cup mixed vegetables (zucchini, mushrooms, bell peppers)",
      "2 cups steamed rice",
      "2 tablespoons soy sauce",
      "1 tablespoon mirin",
      "2 teaspoons sesame oil",
      "2 cloves garlic, minced",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Marinate steak and shrimp with soy sauce, mirin, sesame oil, garlic, salt, and pepper for 30 minutes.",
      "Heat a large skillet or hibachi grill over high heat.",
      "Stir-fry the vegetables until crisp-tender.",
      "Add the marinated steak and shrimp; cook quickly until just done, about 3-4 minutes.",
      "Serve immediately with steamed rice and an extra drizzle of soy sauce if desired."
    ]
  },
  {
    id: 10,
    title: "Korean BBQ Beef Bulgogi",
    description:
      "Thinly sliced beef marinated in a sweet and savory sauce, grilled to perfection and garnished with sesame seeds and scallions.",
    imageUrl:
      "",
    link: "",
    country: "Korea",
    cuisine: "Korean",
    ingredients: [
      "500g thinly sliced beef sirloin",
      "3 tablespoons soy sauce",
      "2 tablespoons brown sugar",
      "1 tablespoon sesame oil",
      "3 cloves garlic, minced",
      "1 teaspoon grated ginger",
      "2 scallions, chopped",
      "1 tablespoon rice vinegar",
      "1 teaspoon black pepper",
      "Sesame seeds for garnish"
    ],
    instructions: [
      "Mix soy sauce, brown sugar, sesame oil, garlic, ginger, rice vinegar, and pepper in a bowl to create the marinade.",
      "Marinate the beef slices for at least 2 hours in the refrigerator.",
      "Heat a grill or skillet over high heat and cook the beef quickly in batches until slightly charred and tender (about 2–3 minutes per side).",
      "Garnish with chopped scallions and sesame seeds, and serve with steamed rice and kimchi."
    ]
  },
  {
    id: 11,
    title: "Nigerian Jollof Rice",
    description:
      "A vibrant and spicy one-pot rice dish simmered with tomatoes, peppers, and aromatic spices—a West African favorite.",
    imageUrl:
      "",
    link: "https://www.allrecipes.com/chef-johns-jollof-rice-recipe-7499757",
    country: "Nigeria",
    cuisine: "West African",
    ingredients: [
      "3 cups parboiled rice",
      "1 (14 oz) can tomato paste",
      "4 fresh tomatoes, blended",
      "1 red bell pepper, blended",
      "1 onion, chopped",
      "3 cloves garlic, minced",
      "1 teaspoon thyme",
      "1 teaspoon curry powder",
      "1 bay leaf",
      "Salt and pepper to taste",
      "3 cups chicken broth",
      "2 tablespoons vegetable oil"
    ],
    instructions: [
      "Heat oil in a large pot and sauté onions and garlic until translucent.",
      "Add the tomato paste and blended tomatoes and red bell pepper; cook for 5 minutes.",
      "Stir in thyme, curry powder, bay leaf, salt, and pepper.",
      "Add the rice and chicken broth, bring to a boil, then cover and simmer for 20–25 minutes until the rice is cooked and the flavors meld.",
      "Remove the bay leaf, adjust seasoning, and serve hot."
    ]
  },
  {
    id: 12,
    title: "Ethiopian Doro Wat",
    description:
      "A richly spiced Ethiopian chicken stew featuring berbere, onions, garlic, ginger, and tomato paste, traditionally served with injera.",
    imageUrl:
      "",
    link: "https://www.daringgourmet.com/doro-wat-spicy-ethiopian-chicken-stew/",
    country: "Ethiopia",
    cuisine: "Ethiopian",
    ingredients: [
      "1.5 kg chicken pieces",
      "4 large onions, thinly sliced",
      "6 cloves garlic, minced",
      "2 tablespoons ginger, grated",
      "3 tablespoons berbere spice mix",
      "1/4 cup tomato paste",
      "2 cups chicken broth",
      "2 tablespoons niter kibbeh (Ethiopian spiced clarified butter)",
      "Salt to taste",
      "Hard-boiled eggs (optional)"
    ],
    instructions: [
      "In a large pot, sauté the onions (with a bit of oil) over low heat until deeply caramelized, about 30–45 minutes.",
      "Add garlic, ginger, and berbere; stir and cook for another 5 minutes.",
      "Mix in the tomato paste and niter kibbeh, then add the chicken pieces.",
      "Pour in the chicken broth, cover, and simmer for 45–60 minutes until the chicken is tender.",
      "Optional: Add hard-boiled eggs during the last 10 minutes of cooking.",
      "Serve hot with injera or rice."
    ]
  },
  {
    id: 13,
    title: "Trinidad Shark and Bake",
    description:
      "A popular Trinidadian street food where marinated shark meat is battered, fried, and served inside a freshly made bake with assorted condiments.",
    imageUrl:
      "",
    link: "https://classicbakes.com/recipes/bake-and-shark-trinidads-iconic-culinary-treasure-recipe",
    country: "Trinidad & Tobago",
    cuisine: "Caribbean",
    ingredients: [
      "500g shark meat, cut into strips",
      "Juice of 2 limes",
      "Salt and pepper to taste",
      "For the batter: 1 cup flour, 1/2 teaspoon salt, water to form a smooth batter",
      "Oil for deep frying",
      "For the bake: 2 cups flour, 1/2 teaspoon salt, 1 cup water, 1 tablespoon oil",
      "Condiments: sliced cabbage, cucumber relish, pepper sauce, tamarind sauce"
    ],
    instructions: [
      "Marinate the shark meat in lime juice, salt, and pepper for 30 minutes.",
      "Mix the batter ingredients until smooth. Dip the shark meat in the batter.",
      "Deep fry the battered shark strips until golden and crispy; drain on paper towels.",
      "For the bake, mix the ingredients into a soft dough, knead, let rest for 30 minutes, then divide and roll into flat rounds. Fry until golden.",
      "Assemble the dish by stuffing the bake with fried shark, then top with condiments such as cabbage, cucumber relish, and a drizzle of pepper and tamarind sauces.",
      "Serve immediately."
    ]
  },
  {
    id: 14,
    title: "Pernil Perfection",
    description:
      "A slow-roasted marinated pork shoulder with a crispy exterior and tender, juicy interior—a Puerto Rican classic.",
    imageUrl:
      "",
    link: "https://www.food.com/recipe/pernil-puerto-rican-pork-shoulder-115565?ic1=suggestedAsset%7Cpernil",
    country: "Puerto Rico",
    cuisine: "Caribbean",
    ingredients: [
      "4 lbs pork shoulder, bone-in",
      "10 cloves garlic, minced",
      "1/4 cup olive oil",
      "Juice of 2 oranges",
      "Juice of 1 lime",
      "2 tbsp white vinegar",
      "1 tbsp salt",
      "1 tsp black pepper",
      "2 tsp dried oregano",
      "2 bay leaves",
      "1 tsp ground cumin"
    ],
    instructions: [
      "Combine garlic, olive oil, orange juice, lime juice, vinegar, salt, pepper, oregano, bay leaves, and cumin in a bowl to form the marinade.",
      "Score the pork shoulder lightly and rub the marinade all over the meat. Cover and refrigerate for at least 8 hours (preferably overnight).",
      "Preheat your oven to 325°F (163°C). Place the pork in a roasting pan and cover with foil.",
      "Roast for about 4 hours until the meat is tender. Increase the temperature to 450°F (232°C), remove the foil, and roast for an additional 30 minutes to crisp the skin.",
      "Let rest for 15 minutes before slicing. Serve with rice, beans, or plantains."
    ]
  },
  {
    id: 15,
    title: "Callaloo Kick",
    description:
      "A modern twist on a Caribbean favorite—sautéed callaloo seasoned with garlic, onions, and a hint of spice for a vibrant green boost.",
    imageUrl:
      "",
    link: "https://www.bonappetit.com/recipe/trini-callaloo?srsltid=AfmBOopGbdHFg7rm65_Bjf7M28HRAKfPircbq5UNb4LNRajIAnusAu8h",
    country: "Trinidad & Tobago",
    cuisine: "Caribbean",
    ingredients: [
      "4 cups callaloo (Dasheen Leaves, or spinach if unavailable), roughly chopped",
      "1 large onion, thinly sliced",
      "4 cloves garlic, minced",
      "1 scotch bonnet pepper, seeded and chopped",
      "2 tablespoons olive oil",
      "1 teaspoon dried thyme",
      "Salt and pepper to taste",
      "Juice of 1 lime"
    ],
    instructions: [
      "Heat olive oil in a large skillet over medium heat.",
      "Sauté the onion and garlic until soft and translucent.",
      "Add the callaloo and scotch bonnet; cook until the greens are wilted but still bright.",
      "Stir in thyme, lime juice, salt, and pepper. Adjust seasoning as needed and serve warm."
    ]
  },
  {
    id: 16,
    title: "Empanada Extra",
    description:
      "Savory empanadas filled with spiced ground beef, olives, and raisins—an irresistible Latino-Caribbean snack.",
    imageUrl:
      "",
    link: "https://tastesbetterfromscratch.com/empanadas/",
    country: "Cuba",
    cuisine: "Caribbean",
    ingredients: [
      "For the dough:",
      "  - 2 1/2 cups all-purpose flour",
      "  - 1/2 cup unsalted butter, cold and cubed",
      "  - 1/2 teaspoon salt",
      "  - 1/3 cup cold water (adjust as needed)",
      "For the filling:",
      "  - 500g ground beef",
      "  - 1 onion, finely chopped",
      "  - 2 cloves garlic, minced",
      "  - 1/2 cup green olives, chopped",
      "  - 1/4 cup raisins",
      "  - 1 teaspoon cumin",
      "  - 1 teaspoon paprika",
      "  - Salt and pepper to taste",
      "  - 2 tablespoons olive oil"
    ],
    instructions: [
      "Prepare the dough: In a bowl, combine flour and salt. Cut in the cold butter until the mixture resembles coarse crumbs. Gradually add water and mix until a dough forms. Wrap in plastic and chill for 30 minutes.",
      "For the filling: Heat olive oil in a pan over medium heat. Sauté onion and garlic until soft. Add ground beef and cook until browned. Stir in olives, raisins, cumin, paprika, salt, and pepper. Cook for another 5 minutes. Allow to cool.",
      "Preheat your oven to 375°F (190°C). Roll out the dough on a floured surface and cut into circles (about 4–5 inches in diameter).",
      "Place a spoonful of filling on each circle, fold over to form a half-moon shape, and crimp the edges with a fork.",
      "Bake for 20–25 minutes until golden brown. Serve warm."
    ]
  },
  {
    id: 17,
    title: "Curry Oxtail Boost",
    description:
      "A hearty Caribbean oxtail stew simmered in a rich, spicy curry sauce that brings deep, robust flavors to the table.",
    imageUrl:
      "https://www.epicurious.com/photos/5a6e94205f9d843c3a8b4576/1:1/w_1600%2Cc_limit/curry-oxtail.jpg",
    link: "https://www.example.com/curry-oxtail-boost",
    country: "Jamaica",
    cuisine: "Caribbean",
    ingredients: [
      "2 lbs oxtail, cut into pieces",
      "2 onions, chopped",
      "4 cloves garlic, minced",
      "1 tablespoon ginger, grated",
      "2 tablespoons curry powder",
      "1 scotch bonnet pepper, whole or chopped (adjust heat level)",
      "1 can (14 oz) diced tomatoes",
      "2 cups beef broth",
      "1 teaspoon allspice",
      "Salt and pepper to taste",
      "2 tablespoons vegetable oil",
      "Fresh thyme sprigs (optional)"
    ],
    instructions: [
      "Season oxtail with salt and pepper.",
      "Heat oil in a large pot over medium-high heat and brown the oxtail on all sides. Remove and set aside.",
      "In the same pot, sauté onions, garlic, and ginger until softened.",
      "Stir in curry powder, allspice, and add the oxtail back to the pot.",
      "Pour in diced tomatoes and beef broth; add the scotch bonnet pepper and thyme sprigs.",
      "Bring to a simmer, cover, and cook on low heat for 2–3 hours until the oxtail is tender and the sauce has thickened.",
      "Remove the pepper and thyme; adjust seasoning and serve with rice or bread."
    ]
  },
  {
    id: 18,
    title: "Plantain Pleasure",
    description:
      "Crispy fried sweet plantains with a savory twist, perfectly balancing natural sweetness with a spicy drizzle.",
    imageUrl:
      "https://www.epicurious.com/photos/5a6e94245f9d843c3a8b4577/1:1/w_1600%2Cc_limit/fried-plantains.jpg",
    link: "https://www.example.com/plantain-pleasure",
    country: "Jamaica",
    cuisine: "Caribbean",
    ingredients: [
      "4 ripe plantains, peeled and sliced diagonally",
      "Salt to taste",
      "Oil for deep frying",
      "For the sauce:",
      "  - 2 tablespoons Sunny Island Pepper Sauce",
      "  - 1 tablespoon lime juice",
      "  - 1 teaspoon honey",
      "  - Pinch of salt"
    ],
    instructions: [
      "Heat oil in a deep fryer or large pan to 350°F (175°C).",
      "Slice plantains and fry in batches until golden brown and crispy.",
      "Drain on paper towels and season lightly with salt.",
      "For the sauce, whisk together Sunny Island Pepper Sauce, lime juice, honey, and a pinch of salt.",
      "Drizzle the sauce over the plantains and serve immediately."
    ]
  },
  {
    id: 19,
    title: "Rhum Cake Revamp",
    description:
      "A twist on the classic Haitian dessert—a moist, spiced rum cake with a daring drizzle of Sunny Island Pepper Sauce for a subtle, unexpected kick.",
    imageUrl:
      "https://www.epicurious.com/photos/5a6e94285f9d843c3a8b4578/1:1/w_1600%2Cc_limit/rhum-cake.jpg",
    link: "https://www.example.com/rhum-cake-revamp",
    country: "Haiti",
    cuisine: "Caribbean",
    ingredients: [
      "2 cups all-purpose flour",
      "1 1/2 cups sugar",
      "1/2 cup unsalted butter, softened",
      "4 eggs",
      "1/2 cup milk",
      "1/2 cup dark rum",
      "1 teaspoon baking powder",
      "1/2 teaspoon salt",
      "1 teaspoon ground cinnamon",
      "1/2 teaspoon ground cloves",
      "Sunny Island Pepper Sauce (for drizzle)"
    ],
    instructions: [
      "Preheat oven to 350°F (175°C) and grease a bundt pan.",
      "Cream butter and sugar until light and fluffy; add eggs one at a time, beating well after each addition.",
      "Sift together flour, baking powder, salt, cinnamon, and cloves; gradually add to the creamed mixture alternating with milk.",
      "Stir in dark rum and mix until smooth.",
      "Pour the batter into the prepared pan and bake for 50–60 minutes, or until a toothpick inserted into the center comes out clean.",
      "Cool the cake completely, then drizzle lightly with Sunny Island Pepper Sauce just before serving for a subtle spicy twist."
    ]
  },
  {
    id: 20,
    title: "Cremasse Charm",
    description:
      "A rich, creamy Haitian dish that transforms traditional cremasse with a hint of Sunny Island Pepper Sauce for a warm, festive spice.",
    imageUrl:
      "https://www.epicurious.com/photos/5a6e942c5f9d843c3a8b4579/1:1/w_1600,c_limit/cremasse-charm.jpg",
    link: "https://www.example.com/cremasse-charm",
    country: "Haiti",
    cuisine: "Caribbean",
    ingredients: [
      "1 whole chicken, cut into pieces",
      "1 cup heavy cream",
      "1/2 cup chicken broth",
      "1 large onion, sliced",
      "4 cloves garlic, minced",
      "2 tablespoons Sunny Island Pepper Sauce",
      "1 teaspoon dried thyme",
      "Salt and pepper to taste",
      "2 tablespoons butter",
      "Fresh parsley for garnish"
    ],
    instructions: [
      "Season chicken with salt, pepper, and thyme.",
      "Melt butter in a large pot and sauté onions and garlic until soft.",
      "Add chicken pieces and brown on all sides.",
      "Pour in chicken broth and heavy cream; bring to a simmer.",
      "Stir in Sunny Island Pepper Sauce and continue to simmer until chicken is cooked and sauce thickens, about 40 minutes.",
      "Garnish with fresh parsley and serve with rice or bread."
    ]
  },
  {
    id: 21,
    title: "Korean Kimchi Jjigae",
    description:
      "A robust Korean stew featuring fermented kimchi, tofu, and pork, simmered until rich and tangy.",
    imageUrl:
      "https://www.epicurious.com/photos/korean-kimchi-jjigae.jpg",
    link: "https://www.example.com/korean-kimchi-jjigae",
    country: "Korea",
    cuisine: "Korean",
    ingredients: [
      "2 cups well-fermented kimchi, chopped",
      "200g pork belly, sliced",
      "1 block firm tofu, cut into cubes",
      "1 onion, sliced",
      "2 cloves garlic, minced",
      "1 tablespoon gochugaru (Korean red chili flakes)",
      "1 tablespoon soy sauce",
      "4 cups water or anchovy broth",
      "1 green onion, chopped (for garnish)",
      "Salt to taste"
    ],
    instructions: [
      "Sauté pork belly in a pot until lightly browned.",
      "Add kimchi and onion; cook for 5 minutes.",
      "Pour in water (or broth) and add garlic, gochugaru, and soy sauce.",
      "Bring to a simmer and cook for 20 minutes.",
      "Add tofu and simmer for another 10 minutes.",
      "Adjust salt if needed, garnish with green onion, and serve hot."
    ]
  },
  {
    id: 22,
    title: "Nigerian Egusi Soup",
    description:
      "A hearty, rich West African soup made with ground melon seeds, leafy greens, and assorted meats.",
    imageUrl:
      "https://www.epicurious.com/photos/nigerian-egusi-soup.jpg",
    link: "https://www.example.com/nigerian-egusi-soup",
    country: "Nigeria",
    cuisine: "West African",
    ingredients: [
      "1 cup egusi (melon seed) powder",
      "500g assorted meat (beef, tripe, offal), pre-cooked",
      "200g spinach or bitterleaf, chopped",
      "1 onion, chopped",
      "2 tomatoes, blended",
      "1 red bell pepper, blended",
      "2 cups meat broth",
      "1 teaspoon ground crayfish",
      "2 tablespoons palm oil",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Heat palm oil in a pot and sauté onions until translucent.",
      "Add blended tomatoes and bell pepper; cook for 5 minutes.",
      "Add pre-cooked meat and broth; simmer for 10 minutes.",
      "Gradually stir in egusi powder to avoid lumps.",
      "Mix in greens and ground crayfish; simmer for another 10 minutes.",
      "Season with salt and pepper, then serve with fufu or rice."
    ]
  },
  {
    id: 23,
    title: "Ethiopian Kitfo",
    description:
      "A traditional Ethiopian dish of finely minced raw beef seasoned with spices and spiced clarified butter, served with injera.",
    imageUrl:
      "https://www.epicurious.com/photos/ethiopian-kitfo.jpg",
    link: "https://www.example.com/ethiopian-kitfo",
    country: "Ethiopia",
    cuisine: "Ethiopian",
    ingredients: [
      "500g lean beef, very finely minced",
      "2 tablespoons mitmita (spice blend)",
      "4 tablespoons niter kibbeh (Ethiopian spiced clarified butter)",
      "Salt to taste",
      "Injera, for serving"
    ],
    instructions: [
      "Mix minced beef with mitmita and salt in a bowl.",
      "Drizzle niter kibbeh over the beef and mix thoroughly.",
      "Serve immediately with injera and a side of collard greens."
    ]
  },
  {
    id: 24,
    title: "Jamaican Escovitch Fish",
    description:
      "Crispy fried whole fish topped with a tangy, spicy pickled vegetable relish, capturing the bold flavors of Jamaica.",
    imageUrl:
      "https://www.epicurious.com/photos/jamaican-escovitch-fish.jpg",
    link: "https://www.example.com/jamaican-escovitch-fish",
    country: "Jamaica",
    cuisine: "Caribbean",
    ingredients: [
      "1 whole fish (snapper or similar), scaled and gutted",
      "1 cup flour",
      "1 teaspoon salt",
      "Oil for frying",
      "For the pickled relish:",
      "  - 1 cup vinegar",
      "  - 1 carrot, julienned",
      "  - 1 bell pepper, sliced",
      "  - 1 small onion, thinly sliced",
      "  - 2 Scotch bonnet peppers, sliced",
      "  - 1 teaspoon thyme",
      "  - 1 bay leaf",
      "  - Salt to taste"
    ],
    instructions: [
      "Season fish with salt and dredge in flour.",
      "Deep fry fish until golden and crispy; drain.",
      "For relish, combine vinegar, carrot, bell pepper, onion, Scotch bonnet, thyme, bay leaf, and salt in a saucepan; simmer for 5 minutes.",
      "Pour hot relish over the fried fish and serve immediately."
    ]
  },
  {
    id: 25,
    title: "Puerto Rican Mofongo",
    description:
      "Mashed green plantains blended with garlic and chicharrón, served with a savory broth—a signature Puerto Rican comfort food.",
    imageUrl:
      "https://www.epicurious.com/photos/puerto-rican-mofongo.jpg",
    link: "https://www.example.com/puerto-rican-mofongo",
    country: "Puerto Rico",
    cuisine: "Caribbean",
    ingredients: [
      "4 green plantains, peeled and cut into chunks",
      "4 cloves garlic, minced",
      "1 cup chicharrón (or bacon bits)",
      "Salt to taste",
      "2 tablespoons olive oil",
      "Chicken broth (for serving)"
    ],
    instructions: [
      "Boil plantains until tender; drain and mash with olive oil and garlic.",
      "Mix in chicharrón and salt thoroughly.",
      "Shape into a mound and serve with hot chicken broth on the side."
    ]
  },
  {
    id: 26,
    title: "Dominican Mangu with Pickled Onions",
    description:
      "Creamy mashed boiled green plantains served with tangy pickled red onions—a traditional Dominican breakfast dish.",
    imageUrl:
      "https://www.epicurious.com/photos/dominican-mangu.jpg",
    link: "https://www.example.com/dominican-mangu",
    country: "Dominican Republic",
    cuisine: "Caribbean",
    ingredients: [
      "4 green plantains",
      "2 tablespoons butter",
      "Salt to taste",
      "For pickled onions:",
      "  - 1 large red onion, thinly sliced",
      "  - 1/2 cup white vinegar",
      "  - 1 teaspoon sugar",
      "  - Salt to taste"
    ],
    instructions: [
      "Boil plantains until soft, then peel and mash with butter and salt.",
      "For pickled onions, mix red onion with vinegar, sugar, and salt; let sit for 30 minutes.",
      "Serve the mashed plantains topped with pickled onions."
    ]
  },
  {
    id: 27,
    title: "Cuban Ropa Vieja",
    description:
      "Tender shredded beef simmered in a tomato-based sauce with bell peppers and onions—a beloved Cuban classic.",
    imageUrl:
      "https://www.epicurious.com/photos/cuban-ropa-vieja.jpg",
    link: "https://www.example.com/cuban-ropa-vieja",
    country: "Cuba",
    cuisine: "Caribbean",
    ingredients: [
      "1.5 kg flank steak",
      "1 large onion, sliced",
      "1 red bell pepper, sliced",
      "1 green bell pepper, sliced",
      "4 cloves garlic, minced",
      "1 can (14 oz) crushed tomatoes",
      "1 cup beef broth",
      "1 tablespoon cumin",
      "1 teaspoon oregano",
      "2 bay leaves",
      "Salt and pepper to taste",
      "2 tablespoons olive oil"
    ],
    instructions: [
      "Brown the flank steak in olive oil on all sides; remove and set aside.",
      "Sauté onions, bell peppers, and garlic until softened.",
      "Return steak to the pot, add crushed tomatoes, broth, cumin, oregano, bay leaves, salt, and pepper.",
      "Simmer on low heat for 2–3 hours until the meat is tender.",
      "Shred the beef and mix into the sauce; serve with rice and beans."
    ]
  },
  {
    id: 28,
    title: "Cuban Mojo Pork",
    description:
      "Slow-roasted pork shoulder marinated in a zesty citrus-garlic mojo, resulting in tender, flavorful meat with a tangy finish.",
    imageUrl:
      "https://www.epicurious.com/photos/cuban-mojo-pork.jpg",
    link: "https://www.example.com/cuban-mojo-pork",
    country: "Cuba",
    cuisine: "Caribbean",
    ingredients: [
      "2 kg pork shoulder",
      "1/2 cup sour orange juice (or 1/3 cup orange juice plus 1/6 cup lime juice)",
      "1/4 cup olive oil",
      "8 cloves garlic, minced",
      "1 teaspoon cumin",
      "1 teaspoon oregano",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Combine sour orange juice, olive oil, garlic, cumin, oregano, salt, and pepper to create a marinade.",
      "Rub marinade over the pork shoulder, cover, and refrigerate for 12 hours.",
      "Preheat oven to 325°F (163°C) and roast pork in a covered pan for 3–4 hours.",
      "Increase temperature to 425°F (218°C) for 20 minutes to crisp the exterior.",
      "Rest before slicing; serve with rice and fried plantains."
    ]
  },
  {
    id: 29,
    title: "Jamaican Ackee and Saltfish",
    description:
      "A signature Jamaican dish combining salted cod with ackee fruit, sautéed with onions, tomatoes, and spices.",
    imageUrl:
      "https://www.epicurious.com/photos/jamaican-ackee-saltfish.jpg",
    link: "https://www.example.com/jamaican-ackee-saltfish",
    country: "Jamaica",
    cuisine: "Caribbean",
    ingredients: [
      "400g saltfish, soaked overnight, boiled, and flaked",
      "1 can ackee, drained",
      "1 onion, sliced",
      "1 tomato, chopped",
      "2 cloves garlic, minced",
      "1 Scotch bonnet pepper, deseeded and chopped",
      "2 tablespoons vegetable oil",
      "Salt and pepper to taste",
      "Fresh thyme (optional)"
    ],
    instructions: [
      "Rinse and boil saltfish until tender; flake and set aside.",
      "Sauté onion, garlic, and Scotch bonnet in oil until soft.",
      "Add tomato and cook until it breaks down.",
      "Fold in saltfish and ackee gently; heat through.",
      "Season with salt, pepper, and thyme. Serve with fried dumplings."
    ]
  },
  {
    id: 30,
    title: "Puerto Rican Arroz con Gandules",
    description:
      "A classic Puerto Rican rice dish cooked with pigeon peas, sofrito, olives, and capers for a burst of Caribbean flavor.",
    imageUrl:
      "https://www.epicurious.com/photos/puerto-rican-arroz-con-gandules.jpg",
    link: "https://www.example.com/arroz-con-gandules",
    country: "Puerto Rico",
    cuisine: "Caribbean",
    ingredients: [
      "3 cups rice",
      "1 can gandules (pigeon peas), drained",
      "1 cup sofrito",
      "2 cups chicken broth",
      "1/2 cup tomato sauce",
      "1/4 cup pitted olives, sliced",
      "2 tablespoons capers",
      "2 tablespoons olive oil",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Heat olive oil in a pot and sauté sofrito until fragrant.",
      "Add tomato sauce, then rice, gandules, olives, and capers.",
      "Pour in chicken broth, season with salt and pepper, and bring to a boil.",
      "Reduce heat, cover, and simmer for 20–25 minutes until rice is cooked.",
      "Fluff and serve hot."
    ]
  },
  {
    id: 31,
    title: "Indian Chicken Tikka Masala",
    description:
      "Tender chicken chunks marinated in spices and yogurt, cooked in a creamy tomato sauce for a rich, flavorful dish.",
    imageUrl:
      "https://www.epicurious.com/photos/indian-chicken-tikka-masala.jpg",
    link: "https://www.example.com/chicken-tikka-masala",
    country: "India",
    cuisine: "Indian",
    ingredients: [
      "1 kg chicken, cubed",
      "1 cup yogurt",
      "2 tablespoons lemon juice",
      "2 teaspoons garam masala",
      "1 teaspoon turmeric",
      "1 teaspoon cumin",
      "Salt to taste",
      "2 onions, finely chopped",
      "4 cloves garlic, minced",
      "1 tablespoon ginger paste",
      "1 can tomato puree (400g)",
      "1 cup heavy cream",
      "2 tablespoons vegetable oil",
      "Fresh cilantro for garnish"
    ],
    instructions: [
      "Marinate chicken with yogurt, lemon juice, garam masala, turmeric, cumin, and salt for 2 hours.",
      "Sauté onions in oil until golden; add garlic and ginger and cook for 2 minutes.",
      "Mix in tomato puree and simmer for 10 minutes.",
      "Add chicken and cook until tender, about 20 minutes.",
      "Stir in heavy cream and simmer for an additional 5 minutes.",
      "Garnish with cilantro and serve with naan or rice."
    ]
  },
  {
    id: 32,
    title: "Thai Green Curry",
    description:
      "A fragrant Thai curry with coconut milk, green curry paste, and vegetables, optionally with chicken or tofu, offering a balanced spicy-sweet flavor.",
    imageUrl:
      "https://www.epicurious.com/photos/thai-green-curry.jpg",
    link: "https://www.example.com/thai-green-curry",
    country: "Thailand",
    cuisine: "Thai",
    ingredients: [
      "500g chicken or tofu, cubed",
      "2 cups coconut milk",
      "3 tablespoons Thai green curry paste",
      "1 red bell pepper, sliced",
      "1 zucchini, sliced",
      "1 onion, chopped",
      "2 cloves garlic, minced",
      "1 tablespoon fish sauce (or soy sauce)",
      "1 teaspoon sugar",
      "Fresh basil leaves for garnish"
    ],
    instructions: [
      "Sauté onion and garlic in a pot until soft.",
      "Add green curry paste and cook for 2 minutes.",
      "Pour in coconut milk and bring to a simmer.",
      "Add chicken (or tofu) and vegetables; simmer for 15 minutes.",
      "Stir in fish sauce and sugar; adjust seasoning.",
      "Garnish with basil and serve with jasmine rice."
    ]
  },
  {
    id: 33,
    title: "Chinese Kung Pao Chicken",
    description:
      "A spicy stir-fry of chicken, peanuts, and vegetables in a tangy, savory sauce, offering a perfect balance of heat and flavor.",
    imageUrl:
      "https://www.epicurious.com/photos/chinese-kung-pao-chicken.jpg",
    link: "https://www.example.com/kung-pao-chicken",
    country: "China",
    cuisine: "Chinese",
    ingredients: [
      "500g chicken breast, cubed",
      "1/2 cup roasted peanuts",
      "2 dried red chilies, broken",
      "1 bell pepper, diced",
      "1 onion, chopped",
      "3 cloves garlic, minced",
      "1 tablespoon ginger, grated",
      "2 tablespoons soy sauce",
      "1 tablespoon rice vinegar",
      "1 tablespoon hoisin sauce",
      "1 teaspoon sugar",
      "2 tablespoons vegetable oil",
      "1 teaspoon cornstarch dissolved in 2 tablespoons water"
    ],
    instructions: [
      "Heat oil in a wok over high heat; stir-fry chicken until browned; remove and set aside.",
      "Add chilies, garlic, ginger, onion, and bell pepper; cook for 3–4 minutes.",
      "Return chicken to the wok and add soy sauce, vinegar, hoisin sauce, and sugar.",
      "Pour in cornstarch mixture; stir until sauce thickens.",
      "Toss in peanuts and serve hot with steamed rice."
    ]
  },
  {
    id: 34,
    title: "Spanish Paella",
    description:
      "A traditional Spanish rice dish loaded with chicken, chorizo, and seafood, infused with saffron and aromatic herbs.",
    imageUrl:
      "https://www.epicurious.com/photos/spanish-paella.jpg",
    link: "https://www.example.com/spanish-paella",
    country: "Spain",
    cuisine: "Spanish",
    ingredients: [
      "2 cups Bomba rice",
      "500g chicken thighs, cut into pieces",
      "200g chorizo, sliced",
      "300g mixed seafood (shrimp, mussels, clams)",
      "1 onion, chopped",
      "1 red bell pepper, sliced",
      "4 cloves garlic, minced",
      "1 can (14 oz) crushed tomatoes",
      "1/2 teaspoon saffron threads, soaked in warm water",
      "4 cups chicken broth",
      "2 tablespoons olive oil",
      "Salt and pepper to taste",
      "Lemon wedges for garnish"
    ],
    instructions: [
      "Heat olive oil in a paella pan; brown chicken and chorizo.",
      "Sauté onion, garlic, and bell pepper until soft.",
      "Stir in crushed tomatoes and saffron with its water.",
      "Add rice and chicken broth; season with salt and pepper.",
      "Cook without stirring for 20 minutes; add seafood and cook another 10 minutes until done.",
      "Garnish with lemon wedges and serve."
    ]
  },
  {
    id: 35,
    title: "Vietnamese Pho",
    description:
      "A fragrant Vietnamese noodle soup with a rich beef broth, rice noodles, and fresh herbs, creating a comforting bowl of flavor.",
    imageUrl:
      "https://www.epicurious.com/photos/vietnamese-pho.jpg",
    link: "https://www.example.com/vietnamese-pho",
    country: "Vietnam",
    cuisine: "Vietnamese",
    ingredients: [
      "1 kg beef bones",
      "500g beef brisket",
      "1 large onion, halved",
      "1 piece ginger (5 cm), halved",
      "5 star anise",
      "2 cinnamon sticks",
      "4 cloves",
      "1 tablespoon coriander seeds",
      "1 tsp fennel seeds",
      "400g rice noodles",
      "Fresh basil, cilantro, and bean sprouts for garnish",
      "2 l water",
      "Salt to taste",
      "Lime wedges and sliced chili for serving"
    ],
    instructions: [
      "Char onion and ginger under a broiler until blackened.",
      "In a large pot, combine beef bones, brisket, charred onion, ginger, and spices with water.",
      "Bring to a boil then simmer for 3-4 hours; skim off fat.",
      "Slice brisket thinly and strain the broth; season with salt.",
      "Soak rice noodles in hot water until soft, drain, and divide into bowls.",
      "Top noodles with brisket, pour hot broth, and garnish with herbs, lime, and chili."
    ]
  },
  {
    id: 36,
    title: "Malaysian Laksa",
    description:
      "A spicy, tangy noodle soup with coconut milk and laksa paste, garnished with shrimp and fresh herbs for a vibrant Southeast Asian flavor.",
    imageUrl:
      "https://www.epicurious.com/photos/malaysian-laksa.jpg",
    link: "https://www.example.com/malaysian-laksa",
    country: "Malaysia",
    cuisine: "Southeast Asian",
    ingredients: [
      "400g rice noodles",
      "200g shrimp, peeled",
      "1 can coconut milk",
      "2 cups chicken broth",
      "3 tablespoons laksa paste",
      "1 red bell pepper, sliced",
      "1 zucchini, sliced",
      "1 onion, chopped",
      "2 cloves garlic, minced",
      "1 tablespoon fish sauce",
      "1 teaspoon sugar",
      "Fresh cilantro and mint for garnish",
      "1 red chili, sliced (optional)"
    ],
    instructions: [
      "Sauté onion and garlic until soft in a pot.",
      "Add laksa paste and cook for 2 minutes.",
      "Pour in chicken broth and coconut milk; bring to a simmer.",
      "Add shrimp and vegetables; cook for 3-4 minutes until shrimp turn pink.",
      "Meanwhile, cook noodles per package instructions; drain.",
      "Combine noodles with broth, stir in fish sauce and sugar, garnish with herbs and chili, and serve."
    ]
  },
  {
    id: 37,
    title: "Indonesian Nasi Goreng",
    description:
      "A flavorful Indonesian fried rice dish with a sweet and savory blend of spices, topped with a fried egg and garnished with prawn crackers.",
    imageUrl:
      "https://www.epicurious.com/photos/indonesian-nasi-goreng.jpg",
    link: "https://www.example.com/indonesian-nasi-goreng",
    country: "Indonesia",
    cuisine: "Southeast Asian",
    ingredients: [
      "3 cups day-old rice",
      "150g chicken or shrimp, diced",
      "1 onion, finely chopped",
      "3 cloves garlic, minced",
      "2 red chilies, sliced",
      "2 eggs",
      "2 tablespoons sweet soy sauce (kecap manis)",
      "1 tablespoon soy sauce",
      "1 teaspoon shrimp paste (optional)",
      "Vegetable oil for frying",
      "Cucumber slices and tomatoes for garnish"
    ],
    instructions: [
      "Heat oil in a wok; sauté onion, garlic, and chilies until fragrant.",
      "Add chicken/shrimp and cook until done.",
      "Push protein aside, scramble eggs in the wok.",
      "Add rice, sweet soy sauce, soy sauce, and shrimp paste; stir-fry thoroughly.",
      "Serve hot topped with a fried egg and garnished with cucumber and tomato slices."
    ]
  },
  {
    id: 38,
    title: "Japanese Ramen",
    description:
      "A comforting bowl of Japanese ramen with a rich pork broth, tender noodles, and traditional toppings such as soft-boiled eggs and scallions.",
    imageUrl:
      "https://www.epicurious.com/photos/japanese-ramen.jpg",
    link: "https://www.example.com/japanese-ramen",
    country: "Japan",
    cuisine: "Japanese",
    ingredients: [
      "1.5 liters pork broth",
      "200g ramen noodles",
      "2 pork belly slices, thinly sliced",
      "2 soft-boiled eggs, halved",
      "1 cup shiitake mushrooms, sliced",
      "1 cup spinach or bok choy",
      "2 scallions, chopped",
      "2 tablespoons soy sauce",
      "1 tablespoon miso paste (optional)",
      "1 teaspoon sesame oil",
      "Salt to taste"
    ],
    instructions: [
      "Bring pork broth to a simmer in a large pot; stir in soy sauce, miso paste, sesame oil, and salt.",
      "Cook ramen noodles as instructed; drain.",
      "Blanch mushrooms and greens briefly.",
      "Assemble bowls with noodles, broth, pork belly, eggs, mushrooms, and greens.",
      "Garnish with scallions and serve immediately."
    ]
  },
  {
    id: 39,
    title: "Korean Bibimbap",
    description:
      "A vibrant Korean rice bowl topped with assorted sautéed vegetables, marinated beef, a fried egg, and spicy gochujang sauce.",
    imageUrl:
      "https://www.epicurious.com/photos/korean-bibimbap.jpg",
    link: "https://www.example.com/korean-bibimbap",
    country: "Korea",
    cuisine: "Korean",
    ingredients: [
      "3 cups steamed rice",
      "200g beef, thinly sliced",
      "1 carrot, julienned",
      "1 zucchini, julienned",
      "1 cup spinach, blanched",
      "1 cup bean sprouts, blanched",
      "1 egg (fried)",
      "2 tablespoons gochujang (Korean chili paste)",
      "2 teaspoons sesame oil",
      "2 cloves garlic, minced",
      "Salt and pepper to taste",
      "Sesame seeds for garnish"
    ],
    instructions: [
      "Marinate beef with garlic, sesame oil, salt, and pepper for 30 minutes.",
      "Sauté each vegetable separately with a pinch of salt.",
      "Stir-fry the beef until just cooked.",
      "Assemble a bowl with rice, topped with vegetables, beef, and a fried egg.",
      "Drizzle with gochujang and sesame oil, garnish with sesame seeds, and mix before eating."
    ]
  },
  {
    id: 40,
    title: "Lebanese Kibbeh",
    description:
      "Traditional Lebanese bulgur patties filled with spiced minced meat, baked or fried until golden and crisp.",
    imageUrl:
      "https://www.epicurious.com/photos/lebanese-kibbeh.jpg",
    link: "https://www.example.com/lebanese-kibbeh",
    country: "Lebanon",
    cuisine: "Middle Eastern",
    ingredients: [
      "2 cups fine bulgur, soaked and drained",
      "500g lean ground lamb",
      "1 large onion, finely chopped",
      "1 teaspoon allspice",
      "1/2 teaspoon cinnamon",
      "Salt and pepper to taste",
      "Olive oil for frying",
      "Pine nuts for garnish (optional)"
    ],
    instructions: [
      "Mix soaked bulgur with half the ground lamb, allspice, cinnamon, salt, and pepper to form a dough.",
      "Sauté the remaining lamb with onions until browned; season lightly.",
      "Shape bulgur mixture into ovals, fill with the meat mixture, and seal.",
      "Fry in olive oil until golden or bake at 375°F (190°C) for 25–30 minutes.",
      "Garnish with pine nuts and serve with yogurt."
    ]
  },
  {
    id: 41,
    title: "Turkish Kebab",
    description:
      "Grilled lamb skewers marinated in a blend of spices, served with flatbread and a fresh vegetable salad.",
    imageUrl:
      "https://www.epicurious.com/photos/turkish-kebab.jpg",
    link: "https://www.example.com/turkish-kebab",
    country: "Turkey",
    cuisine: "Middle Eastern",
    ingredients: [
      "1 kg lamb, cut into cubes",
      "1 onion, grated",
      "3 cloves garlic, minced",
      "2 tablespoons olive oil",
      "1 tablespoon lemon juice",
      "1 teaspoon paprika",
      "1 teaspoon cumin",
      "Salt and pepper to taste",
      "Flatbread for serving",
      "Chopped tomatoes, onions, and parsley for garnish"
    ],
    instructions: [
      "Marinate lamb with grated onion, garlic, olive oil, lemon juice, paprika, cumin, salt, and pepper for at least 4 hours.",
      "Skewer the lamb and grill on high heat for 10–12 minutes, turning occasionally.",
      "Serve with flatbread and garnish with fresh vegetables."
    ]
  },
  {
    id: 42,
    title: "Greek Moussaka",
    description:
      "Layers of roasted eggplant, spiced ground meat, and creamy béchamel sauce baked to a golden perfection.",
    imageUrl:
      "https://www.epicurious.com/photos/greek-moussaka.jpg",
    link: "https://www.example.com/greek-moussaka",
    country: "Greece",
    cuisine: "Greek",
    ingredients: [
      "2 large eggplants, sliced 1/2-inch thick",
      "500g ground lamb",
      "1 onion, chopped",
      "2 cloves garlic, minced",
      "1 can (14 oz) crushed tomatoes",
      "1/2 cup red wine (optional)",
      "1 teaspoon cinnamon",
      "Salt and pepper to taste",
      "For the béchamel:",
      "  - 4 tablespoons butter",
      "  - 4 tablespoons flour",
      "  - 2 cups milk",
      "  - A pinch of nutmeg",
      "  - Salt and pepper to taste"
    ],
    instructions: [
      "Salt eggplant slices and let rest for 30 minutes, then pat dry.",
      "Fry eggplant slices until golden; set aside.",
      "Sauté onion and garlic; add ground lamb and cook until browned.",
      "Stir in crushed tomatoes, red wine, cinnamon, salt, and pepper; simmer for 15 minutes.",
      "Prepare béchamel: melt butter, whisk in flour, then gradually add milk until thickened; season with nutmeg, salt, and pepper.",
      "Layer eggplant and meat sauce in a baking dish, top with béchamel.",
      "Bake at 375°F (190°C) for 45 minutes until bubbly and golden."
    ]
  },
  {
    id: 43,
    title: "Italian Lasagna",
    description:
      "Layers of pasta, rich meat sauce, and creamy ricotta topped with melted mozzarella, baked to a hearty perfection.",
    imageUrl:
      "https://www.epicurious.com/photos/italian-lasagna.jpg",
    link: "https://www.example.com/italian-lasagna",
    country: "Italy",
    cuisine: "Italian",
    ingredients: [
      "12 lasagna noodles",
      "500g ground beef",
      "1 onion, chopped",
      "4 cloves garlic, minced",
      "1 can (28 oz) crushed tomatoes",
      "2 tablespoons tomato paste",
      "1 teaspoon dried basil",
      "1 teaspoon dried oregano",
      "Salt and pepper to taste",
      "500g ricotta cheese",
      "2 cups shredded mozzarella",
      "1/2 cup grated Parmesan"
    ],
    instructions: [
      "Preheat oven to 375°F (190°C).",
      "Cook lasagna noodles per package instructions; drain.",
      "Sauté onion and garlic; add ground beef and brown.",
      "Mix in crushed tomatoes, tomato paste, basil, oregano, salt, and pepper; simmer for 20 minutes.",
      "Layer noodles, meat sauce, ricotta, and mozzarella in a baking dish; top with Parmesan.",
      "Bake for 45 minutes until bubbly and golden. Garnish with fresh basil."
    ]
  },
  {
    id: 44,
    title: "French Ratatouille",
    description:
      "A rustic vegetable stew featuring eggplant, zucchini, bell peppers, and tomatoes, simmered with herbs for a burst of Provencal flavor.",
    imageUrl:
      "https://www.epicurious.com/photos/french-ratatouille.jpg",
    link: "https://www.example.com/french-ratatouille",
    country: "France",
    cuisine: "French",
    ingredients: [
      "1 eggplant, diced",
      "2 zucchinis, diced",
      "1 red bell pepper, diced",
      "1 yellow bell pepper, diced",
      "4 tomatoes, chopped",
      "1 onion, chopped",
      "3 cloves garlic, minced",
      "2 tablespoons olive oil",
      "1 teaspoon dried thyme",
      "1 teaspoon dried basil",
      "Salt and pepper to taste",
      "Fresh parsley for garnish"
    ],
    instructions: [
      "Heat olive oil in a pot; sauté onion and garlic until soft.",
      "Add eggplant, zucchinis, and bell peppers; cook for 5–7 minutes.",
      "Stir in tomatoes, thyme, basil, salt, and pepper.",
      "Cover and simmer on low heat for 30–40 minutes until vegetables are tender.",
      "Garnish with fresh parsley and serve with crusty bread."
    ]
  },
  {
    id: 45,
    title: "Moroccan Tagine",
    description:
      "A slow-cooked lamb stew with dried apricots and warm spices, simmered to tender perfection and served with couscous.",
    imageUrl:
      "https://www.epicurious.com/photos/moroccan-tagine.jpg",
    link: "https://www.example.com/moroccan-tagine",
    country: "Morocco",
    cuisine: "North African",
    ingredients: [
      "1 kg lamb, cut into chunks",
      "1 onion, chopped",
      "3 cloves garlic, minced",
      "1 cup dried apricots, halved",
      "1 can (14 oz) diced tomatoes",
      "1 cup lamb broth",
      "1 teaspoon ground cumin",
      "1 teaspoon ground coriander",
      "1/2 teaspoon cinnamon",
      "1/2 teaspoon turmeric",
      "Salt and pepper to taste",
      "2 tablespoons olive oil",
      "Fresh cilantro for garnish"
    ],
    instructions: [
      "Brown lamb in olive oil in a heavy pot; remove and set aside.",
      "Sauté onion and garlic until soft.",
      "Return lamb to the pot, add tomatoes, apricots, broth, and spices.",
      "Cover and simmer on low heat for 2–3 hours until lamb is tender.",
      "Garnish with cilantro and serve with couscous."
    ]
  },
  {
    id: 46,
    title: "Egyptian Koshari",
    description:
      "A hearty Egyptian dish combining rice, lentils, and pasta in a spiced tomato sauce, topped with crispy fried onions.",
    imageUrl:
      "https://www.epicurious.com/photos/egyptian-koshari.jpg",
    link: "https://www.example.com/egyptian-koshari",
    country: "Egypt",
    cuisine: "Middle Eastern",
    ingredients: [
      "2 cups rice",
      "1 cup brown lentils",
      "200g small pasta (macaroni)",
      "1 large onion, thinly sliced",
      "1 can (14 oz) tomato sauce",
      "3 cloves garlic, minced",
      "1 teaspoon cumin",
      "1 teaspoon coriander",
      "1 bay leaf",
      "Salt and pepper to taste",
      "2 tablespoons vegetable oil",
      "Vinegar and hot sauce for serving"
    ],
    instructions: [
      "Cook rice, lentils, and pasta separately until tender.",
      "Fry sliced onions in oil until crisp; drain on paper towels.",
      "Sauté garlic briefly, then add tomato sauce, bay leaf, cumin, coriander, salt, and pepper; simmer for 10 minutes.",
      "Layer rice, lentils, and pasta in a bowl, top with tomato sauce and crispy onions.",
      "Serve with vinegar and hot sauce on the side."
    ]
  },
  {
    id: 47,
    title: "Brazilian Feijoada",
    description:
      "A rich black bean stew with pork and beef, slow-cooked to meld deep, hearty flavors, served with rice and orange slices.",
    imageUrl:
      "https://www.epicurious.com/photos/brazilian-feijoada.jpg",
    link: "https://www.example.com/brazilian-feijoada",
    country: "Brazil",
    cuisine: "Latin American",
    ingredients: [
      "500g black beans, soaked overnight",
      "300g pork shoulder, cubed",
      "200g chorizo, sliced",
      "200g beef, cubed",
      "1 large onion, chopped",
      "4 cloves garlic, minced",
      "1 bay leaf",
      "1 teaspoon cumin",
      "Salt and pepper to taste",
      "4 cups water or beef broth",
      "2 tablespoons vegetable oil",
      "Orange slices for garnish"
    ],
    instructions: [
      "Sauté onions and garlic in oil until translucent.",
      "Brown pork, beef, and chorizo; add to a large pot.",
      "Stir in soaked beans, bay leaf, cumin, salt, and pepper.",
      "Add water or broth and bring to a boil, then simmer on low heat for 2–3 hours until beans are tender.",
      "Garnish with orange slices and serve with rice."
    ]
  },
  {
    id: 48,
    title: "Argentine Asado",
    description:
      "A traditional Argentine barbecue featuring beef cuts grilled to perfection and served with a zesty chimichurri sauce.",
    imageUrl:
      "https://www.epicurious.com/photos/argentine-asado.jpg",
    link: "https://www.example.com/argentine-asado",
    country: "Argentina",
    cuisine: "Latin American",
    ingredients: [
      "1.5 kg beef ribs or flank steak",
      "Coarse salt",
      "For chimichurri:",
      "  - 1 cup fresh parsley, chopped",
      "  - 4 cloves garlic, minced",
      "  - 2 tablespoons red wine vinegar",
      "  - 1/2 cup olive oil",
      "  - 1 teaspoon red pepper flakes",
      "  - Salt and pepper to taste"
    ],
    instructions: [
      "Generously season beef with coarse salt.",
      "Grill over medium-high heat until desired doneness (ribs may require 20-30 minutes per side).",
      "For chimichurri, mix parsley, garlic, vinegar, olive oil, red pepper flakes, salt, and pepper.",
      "Serve grilled beef with chimichurri and a side salad."
    ]
  },
  {
    id: 49,
    title: "Peruvian Lomo Saltado",
    description:
      "A stir-fry of marinated beef, tomatoes, onions, and fries, fusing Asian stir-fry techniques with Peruvian flavors.",
    imageUrl:
      "https://www.epicurious.com/photos/peruvian-lomo-saltado.jpg",
    link: "https://www.example.com/peruvian-lomo-saltado",
    country: "Peru",
    cuisine: "Latin American",
    ingredients: [
      "500g beef sirloin, cut into strips",
      "2 large tomatoes, cut into wedges",
      "1 large red onion, thickly sliced",
      "2 cloves garlic, minced",
      "1 tablespoon soy sauce",
      "1 tablespoon vinegar",
      "1 teaspoon cumin",
      "Salt and pepper to taste",
      "2 cups French fries (pre-cooked or blanched)",
      "Fresh cilantro for garnish"
    ],
    instructions: [
      "Marinate beef with soy sauce, vinegar, cumin, salt, and pepper for 30 minutes.",
      "Stir-fry beef in a hot pan until browned; remove and set aside.",
      "Sauté onions and garlic until slightly softened; add tomatoes and cook briefly.",
      "Return beef to the pan, toss in French fries, and mix gently.",
      "Garnish with cilantro and serve immediately."
    ]
  },
  {
    id: 50,
    title: "South African Bobotie",
    description:
      "A spiced minced meat casserole topped with a savory egg custard, baked until golden—a comforting South African classic.",
    imageUrl:
      "https://www.epicurious.com/photos/south-african-bobotie.jpg",
    link: "https://www.example.com/south-african-bobotie",
    country: "South Africa",
    cuisine: "African",
    ingredients: [
      "500g minced beef or lamb",
      "1 onion, chopped",
      "2 slices white bread, soaked in milk",
      "1 egg, beaten (mixed into meat)",
      "1 tablespoon curry powder",
      "1 teaspoon turmeric",
      "1/2 cup raisins",
      "2 tablespoons chutney",
      "Salt and pepper to taste",
      "For topping:",
      "  - 2 eggs",
      "  - 1/2 cup milk"
    ],
    instructions: [
      "Preheat oven to 350°F (175°C).",
      "Sauté onion until soft; add minced meat and curry powder, turmeric, salt, and pepper; cook until browned.",
      "Squeeze milk from soaked bread, crumble it in, and stir in raisins and chutney. Mix in 1 beaten egg.",
      "Transfer mixture to a baking dish.",
      "Whisk together 2 eggs and 1/2 cup milk, pour over the meat mixture.",
      "Bake for 35–40 minutes until custard is set and the top is golden.",
      "Serve with rice or a fresh salad."
    ]
  },
  {
    id: 51,
    title: "Jamaican Brown Stew Chicken",
    description:
      "A hearty Jamaican stew with chicken simmered in a rich, spiced gravy infused with tomatoes and allspice.",
    imageUrl:
      "https://www.epicurious.com/photos/jamaican-brown-stew-chicken.jpg",
    link: "https://www.example.com/jamaican-brown-stew-chicken",
    country: "Jamaica",
    cuisine: "Caribbean",
    ingredients: [
      "1.5 kg chicken pieces",
      "2 onions, sliced",
      "4 cloves garlic, minced",
      "2 tomatoes, chopped",
      "1 tablespoon allspice",
      "1 teaspoon thyme",
      "1 scotch bonnet pepper, whole",
      "2 cups chicken broth",
      "2 tablespoons vegetable oil",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Season the chicken with salt and pepper.",
      "Heat oil in a pot and brown the chicken on all sides.",
      "Add onions and garlic; sauté until soft.",
      "Stir in tomatoes, allspice, and thyme.",
      "Pour in chicken broth and add the whole scotch bonnet pepper.",
      "Simmer on low heat for 45–60 minutes until the chicken is tender and the gravy has thickened.",
      "Remove the pepper, adjust seasoning, and serve with rice."
    ]
  },
  {
    id: 52,
    title: "Trinidad Callaloo Soup",
    description:
      "A nourishing soup featuring callaloo greens, root vegetables, and a hint of coconut, popular in Trinidad & Tobago.",
    imageUrl:
      "https://www.epicurious.com/photos/trinidad-callaloo-soup.jpg",
    link: "https://www.example.com/trinidad-callaloo-soup",
    country: "Trinidad & Tobago",
    cuisine: "Caribbean",
    ingredients: [
      "4 cups callaloo (or spinach), roughly chopped",
      "2 potatoes, diced",
      "1 carrot, diced",
      "1 onion, chopped",
      "3 cloves garlic, minced",
      "1 can coconut milk",
      "4 cups vegetable broth",
      "1 teaspoon thyme",
      "Salt and pepper to taste",
      "2 tablespoons vegetable oil"
    ],
    instructions: [
      "Heat oil in a large pot and sauté the onion and garlic until translucent.",
      "Add diced potatoes and carrots; cook for 5 minutes.",
      "Pour in vegetable broth and bring to a simmer.",
      "Add callaloo and thyme; cook for 10–15 minutes until vegetables are tender.",
      "Stir in coconut milk and adjust seasoning with salt and pepper.",
      "Serve hot with crusty bread."
    ]
  },
  {
    id: 53,
    title: "Cuban Picadillo",
    description:
      "A savory ground beef hash with tomatoes, raisins, olives, and capers, bursting with the vibrant flavors of Cuba.",
    imageUrl:
      "https://www.epicurious.com/photos/cuban-picadillo.jpg",
    link: "https://www.example.com/cuban-picadillo",
    country: "Cuba",
    cuisine: "Caribbean",
    ingredients: [
      "500g ground beef",
      "1 onion, chopped",
      "2 cloves garlic, minced",
      "1 green bell pepper, diced",
      "1 can (14 oz) diced tomatoes",
      "1/4 cup raisins",
      "1/4 cup green olives, sliced",
      "2 tablespoons capers",
      "1 teaspoon cumin",
      "1 teaspoon oregano",
      "Salt and pepper to taste",
      "2 tablespoons olive oil"
    ],
    instructions: [
      "Heat olive oil in a skillet and sauté the onion, garlic, and bell pepper until softened.",
      "Add ground beef and cook until browned.",
      "Mix in the diced tomatoes, raisins, olives, capers, cumin, and oregano.",
      "Simmer for 15–20 minutes until flavors meld; adjust seasoning.",
      "Serve with rice or as an empanada filling."
    ]
  },
  {
    id: 54,
    title: "Puerto Rican Pernil",
    description:
      "Slow-roasted pork shoulder marinated in a garlicky, citrusy sauce resulting in tender, juicy meat with crispy skin—a festive Puerto Rican favorite.",
    imageUrl:
      "https://www.epicurious.com/photos/puerto-rican-pernil.jpg",
    link: "https://www.example.com/puerto-rican-pernil",
    country: "Puerto Rico",
    cuisine: "Caribbean",
    ingredients: [
      "4 lbs pork shoulder, bone-in",
      "10 cloves garlic, minced",
      "1/4 cup olive oil",
      "Juice of 2 oranges",
      "Juice of 1 lime",
      "2 tbsp white vinegar",
      "1 tbsp salt",
      "1 tsp black pepper",
      "2 tsp dried oregano",
      "2 bay leaves",
      "1 tsp ground cumin"
    ],
    instructions: [
      "Mix garlic, olive oil, orange juice, lime juice, vinegar, salt, pepper, oregano, bay leaves, and cumin to form the marinade.",
      "Rub the marinade thoroughly over the pork shoulder; refrigerate for at least 8 hours or overnight.",
      "Preheat the oven to 325°F (163°C). Place the pork in a roasting pan, cover with foil, and roast for 4 hours.",
      "Increase the oven temperature to 450°F (232°C), remove the foil, and roast for an additional 30 minutes to crisp the skin.",
      "Let the meat rest for 15 minutes before slicing. Serve with rice and beans or fried plantains."
    ]
  },
  {
    id: 55,
    title: "Dominican Sancocho",
    description:
      "A hearty Dominican stew featuring a medley of meats, root vegetables, and plantains simmered in a savory broth.",
    imageUrl:
      "https://www.epicurious.com/photos/dominican-sancocho.jpg",
    link: "https://www.example.com/dominican-sancocho",
    country: "Dominican Republic",
    cuisine: "Caribbean",
    ingredients: [
      "1 kg assorted meats (chicken, pork, beef)",
      "2 plantains, peeled and cut into chunks",
      "2 yuca roots, peeled and cubed",
      "2 potatoes, peeled and cubed",
      "1 large onion, chopped",
      "4 cloves garlic, minced",
      "1 green bell pepper, chopped",
      "1 can (14 oz) diced tomatoes",
      "6 cups water or broth",
      "1 teaspoon oregano",
      "Salt and pepper to taste",
      "2 tablespoons vegetable oil"
    ],
    instructions: [
      "Heat oil in a large pot and brown the assorted meats.",
      "Add onion, garlic, and bell pepper; sauté until softened.",
      "Pour in water or broth and add diced tomatoes, oregano, salt, and pepper.",
      "Simmer for 1 hour; add plantains, yuca, and potatoes.",
      "Continue simmering for another 30–40 minutes until vegetables are tender.",
      "Adjust seasoning and serve hot."
    ]
  },
  {
    id: 56,
    title: "Indian Rogan Josh",
    description:
      "A classic Kashmiri curry featuring tender lamb simmered in a richly spiced tomato and yogurt sauce.",
    imageUrl:
      "https://www.epicurious.com/photos/indian-rogan-josh.jpg",
    link: "https://www.example.com/indian-rogan-josh",
    country: "India",
    cuisine: "Indian",
    ingredients: [
      "1 kg lamb, cubed",
      "2 onions, thinly sliced",
      "4 cloves garlic, minced",
      "1 tablespoon ginger, grated",
      "2 tomatoes, pureed",
      "2 teaspoons Kashmiri red chili powder",
      "1 teaspoon turmeric",
      "2 teaspoons garam masala",
      "1 teaspoon cumin",
      "1 cup yogurt",
      "2 tablespoons vegetable oil",
      "Salt to taste",
      "Fresh cilantro for garnish"
    ],
    instructions: [
      "Marinate lamb with yogurt, red chili powder, turmeric, cumin, and salt for 2 hours.",
      "Heat oil in a pot; sauté onions until golden.",
      "Add garlic and ginger; cook for 2 minutes.",
      "Stir in tomato puree and cook until the oil separates from the masala.",
      "Add lamb and its marinade; simmer for 1.5–2 hours until tender.",
      "Sprinkle garam masala, garnish with cilantro, and serve with rice or naan."
    ]
  },
  {
    id: 57,
    title: "Indian Chana Masala",
    description:
      "A hearty, spiced chickpea curry in a tangy tomato sauce, showcasing the vibrant flavors of North India.",
    imageUrl:
      "https://www.epicurious.com/photos/indian-chana-masala.jpg",
    link: "https://www.example.com/indian-chana-masala",
    country: "India",
    cuisine: "Indian",
    ingredients: [
      "2 cans chickpeas, drained and rinsed",
      "1 large onion, chopped",
      "3 cloves garlic, minced",
      "1 tablespoon ginger, grated",
      "2 tomatoes, pureed",
      "1 teaspoon cumin seeds",
      "2 teaspoons coriander powder",
      "1 teaspoon turmeric",
      "1 teaspoon garam masala",
      "1/2 teaspoon red chili powder",
      "2 tablespoons vegetable oil",
      "Salt to taste",
      "Fresh cilantro for garnish"
    ],
    instructions: [
      "Heat oil in a pot; add cumin seeds until they sizzle.",
      "Add onion, garlic, and ginger; sauté until golden.",
      "Mix in tomato puree and spices (coriander, turmeric, red chili powder); cook for 5 minutes.",
      "Add chickpeas and a splash of water; simmer for 15–20 minutes.",
      "Stir in garam masala, garnish with cilantro, and serve with rice or naan."
    ]
  },
  {
    id: 58,
    title: "Chinese Mapo Tofu",
    description:
      "A spicy Sichuan dish featuring silky tofu and ground pork in a bold chili bean sauce.",
    imageUrl:
      "https://www.epicurious.com/photos/chinese-mapo-tofu.jpg",
    link: "https://www.example.com/chinese-mapo-tofu",
    country: "China",
    cuisine: "Chinese",
    ingredients: [
      "400g soft tofu, cut into cubes",
      "200g ground pork",
      "2 cloves garlic, minced",
      "1 tablespoon ginger, grated",
      "2 tablespoons doubanjiang (chili bean paste)",
      "1 tablespoon soy sauce",
      "1 teaspoon Sichuan pepper, ground",
      "1 cup chicken broth",
      "2 teaspoons cornstarch dissolved in 2 tablespoons water",
      "2 tablespoons vegetable oil",
      "Green onions, chopped (for garnish)"
    ],
    instructions: [
      "Heat oil in a pan and cook ground pork until browned.",
      "Add garlic, ginger, and doubanjiang; stir-fry for 2 minutes.",
      "Gently add tofu and chicken broth; simmer for 5 minutes.",
      "Stir in soy sauce and ground Sichuan pepper.",
      "Mix in cornstarch slurry and cook until the sauce thickens.",
      "Garnish with green onions and serve with steamed rice."
    ]
  },
  {
    id: 59,
    title: "Japanese Teriyaki Chicken",
    description:
      "Grilled chicken glazed with a sweet and savory teriyaki sauce, served with steamed rice and vegetables.",
    imageUrl:
      "https://www.epicurious.com/photos/japanese-teriyaki-chicken.jpg",
    link: "https://www.example.com/japanese-teriyaki-chicken",
    country: "Japan",
    cuisine: "Japanese",
    ingredients: [
      "1 kg chicken thighs, boneless",
      "1/2 cup soy sauce",
      "1/4 cup mirin",
      "2 tablespoons sake",
      "2 tablespoons sugar",
      "2 cloves garlic, minced",
      "1 teaspoon ginger, grated",
      "Sesame seeds for garnish",
      "Green onions, chopped (for garnish)"
    ],
    instructions: [
      "Combine soy sauce, mirin, sake, sugar, garlic, and ginger to form the teriyaki marinade.",
      "Marinate chicken for at least 2 hours.",
      "Preheat grill or broiler and cook chicken until caramelized and cooked through (about 6–8 minutes per side).",
      "Garnish with sesame seeds and green onions, and serve with steamed rice."
    ]
  },
  {
    id: 60,
    title: "Korean Spicy Pork Bulgogi",
    description:
      "Thinly sliced pork marinated in a spicy-sweet sauce and stir-fried with vegetables for a vibrant Korean dish.",
    imageUrl:
      "https://www.epicurious.com/photos/korean-spicy-pork-bulgogi.jpg",
    link: "https://www.example.com/korean-spicy-pork-bulgogi",
    country: "Korea",
    cuisine: "Korean",
    ingredients: [
      "500g pork shoulder, thinly sliced",
      "3 tablespoons gochujang (Korean chili paste)",
      "2 tablespoons soy sauce",
      "1 tablespoon sugar",
      "1 tablespoon sesame oil",
      "3 cloves garlic, minced",
      "1 teaspoon ginger, grated",
      "1 carrot, julienned",
      "1 bell pepper, sliced",
      "2 green onions, chopped",
      "1 tablespoon rice vinegar"
    ],
    instructions: [
      "Mix gochujang, soy sauce, sugar, sesame oil, garlic, ginger, and rice vinegar to make the marinade.",
      "Marinate the pork for at least 1 hour.",
      "Heat oil in a pan and stir-fry the pork until almost cooked.",
      "Add carrots, bell pepper, and green onions; stir-fry until vegetables are tender-crisp.",
      "Serve hot with steamed rice."
    ]
  },
  {
    id: 61,
    title: "Guyanese Metworst Rice",
    description:
      "A savory dish featuring spiced Guyanese metworst sausage served over aromatic rice with fresh herbs and vegetables.",
    imageUrl:
      "https://www.epicurious.com/photos/guyanese-metworst-rice.jpg",
    link: "https://www.example.com/guyanese-metworst-rice",
    country: "Guyana",
    cuisine: "Caribbean",
    ingredients: [
      "300g Guyanese metworst sausage, sliced",
      "2 cups cooked rice",
      "1 onion, diced",
      "1 red bell pepper, diced",
      "2 cloves garlic, minced",
      "1 teaspoon smoked paprika",
      "2 tablespoons olive oil",
      "Salt and pepper to taste",
      "Fresh parsley, chopped"
    ],
    instructions: [
      "Heat olive oil in a skillet and sauté onion, garlic, and bell pepper until soft.",
      "Add sliced metworst and smoked paprika; cook until the sausage is slightly crisp.",
      "Mix in cooked rice and season with salt and pepper.",
      "Garnish with fresh parsley and serve warm."
    ]
  },
  {
    id: 62,
    title: "Cuban Black Bean Soup",
    description:
      "A hearty, smoky black bean soup simmered with spices and vegetables, reflecting the bold flavors of Cuban cuisine.",
    imageUrl:
      "https://www.epicurious.com/photos/cuban-black-bean-soup.jpg",
    link: "https://www.example.com/cuban-black-bean-soup",
    country: "Cuba",
    cuisine: "Caribbean",
    ingredients: [
      "2 cups black beans, soaked overnight and drained",
      "1 onion, chopped",
      "3 cloves garlic, minced",
      "1 green bell pepper, diced",
      "1 carrot, diced",
      "1 teaspoon cumin",
      "1 bay leaf",
      "4 cups vegetable broth",
      "2 tablespoons olive oil",
      "Salt and pepper to taste",
      "Fresh lime wedges for serving"
    ],
    instructions: [
      "Sauté onion, garlic, bell pepper, and carrot in olive oil until soft.",
      "Add black beans, cumin, bay leaf, and vegetable broth.",
      "Bring to a boil, then simmer for 1–1.5 hours until beans are tender.",
      "Season with salt and pepper, remove bay leaf, and blend slightly for a thicker consistency if desired.",
      "Serve hot with a squeeze of lime."
    ]
  },
  {
    id: 63,
    title: "Puerto Rican Mofongo with Shrimp",
    description:
      "Mashed green plantains mixed with garlic and chicharrón, topped with a savory shrimp stew—a delightful twist on a Puerto Rican classic.",
    imageUrl:
      "https://www.epicurious.com/photos/puerto-rican-mofongo-shrimp.jpg",
    link: "https://www.example.com/puerto-rican-mofongo-shrimp",
    country: "Puerto Rico",
    cuisine: "Caribbean",
    ingredients: [
      "4 green plantains, peeled and chopped",
      "4 cloves garlic, minced",
      "1 cup chicharrón or bacon bits",
      "Salt to taste",
      "2 tablespoons olive oil",
      "For the shrimp stew:",
      "  - 300g shrimp, peeled and deveined",
      "  - 1 onion, chopped",
      "  - 2 tomatoes, diced",
      "  - 1 bell pepper, diced",
      "  - 1 cup seafood broth",
      "  - 1 teaspoon paprika",
      "  - Salt and pepper to taste"
    ],
    instructions: [
      "Boil plantains until tender, then mash with olive oil, garlic, and salt. Mix in chicharrón.",
      "For the stew, sauté onion in a pan until translucent.",
      "Add tomatoes, bell pepper, and paprika; cook for 5 minutes.",
      "Add shrimp and seafood broth; simmer until shrimp are pink (about 5 minutes).",
      "Top the mashed plantains with the shrimp stew and serve immediately."
    ]
  },
  {
    id: 64,
    title: "Dominican Mangu with Red Beans",
    description:
      "Creamy mashed green plantains served with a side of slow-cooked red beans, offering a comforting Dominican breakfast or lunch.",
    imageUrl:
      "https://www.epicurious.com/photos/dominican-mangu-red-beans.jpg",
    link: "https://www.example.com/dominican-mangu-red-beans",
    country: "Dominican Republic",
    cuisine: "Caribbean",
    ingredients: [
      "4 green plantains",
      "2 tablespoons butter",
      "Salt to taste",
      "For the red beans:",
      "  - 2 cups red kidney beans, soaked overnight",
      "  - 1 onion, chopped",
      "  - 2 cloves garlic, minced",
      "  - 1 bell pepper, diced",
      "  - 1 teaspoon oregano",
      "  - 4 cups water or broth",
      "  - Salt and pepper to taste"
    ],
    instructions: [
      "Boil plantains until soft, then mash with butter and salt.",
      "For the beans, sauté onion, garlic, and bell pepper in a pot.",
      "Add soaked beans, oregano, water (or broth), salt, and pepper; simmer for 1–1.5 hours until beans are tender.",
      "Serve the mashed plantains topped with a generous spoonful of red beans."
    ]
  },
  {
    id: 65,
    title: "Indian Palak Paneer",
    description:
      "A vibrant North Indian dish of paneer cheese simmered in a creamy spinach sauce with aromatic spices.",
    imageUrl:
      "https://www.epicurious.com/photos/indian-palak-paneer.jpg",
    link: "https://www.example.com/indian-palak-paneer",
    country: "India",
    cuisine: "Indian",
    ingredients: [
      "400g paneer, cubed",
      "500g spinach, blanched and pureed",
      "1 large onion, finely chopped",
      "3 cloves garlic, minced",
      "1 tablespoon ginger, grated",
      "2 tomatoes, pureed",
      "1 teaspoon cumin seeds",
      "1 teaspoon garam masala",
      "1/2 cup heavy cream",
      "2 tablespoons vegetable oil",
      "Salt to taste"
    ],
    instructions: [
      "Heat oil in a pan and sauté cumin seeds until fragrant.",
      "Add onions, garlic, and ginger; cook until golden.",
      "Stir in tomato puree and cook for 5 minutes.",
      "Add spinach puree, garam masala, and salt; simmer for 10 minutes.",
      "Fold in paneer cubes and heavy cream; simmer for an additional 5 minutes.",
      "Serve hot with naan or rice."
    ]
  },
  {
    id: 66,
    title: "Indian Chicken Vindaloo",
    description:
      "A fiery Goan curry of chicken marinated in vinegar and spices, slow-cooked to tender perfection.",
    imageUrl:
      "https://www.epicurious.com/photos/indian-chicken-vindaloo.jpg",
    link: "https://www.example.com/indian-chicken-vindaloo",
    country: "India",
    cuisine: "Indian",
    ingredients: [
      "1 kg chicken, cut into pieces",
      "1/2 cup white vinegar",
      "4 cloves garlic, minced",
      "1 tablespoon ginger, grated",
      "2 tablespoons vindaloo spice mix",
      "1 teaspoon turmeric",
      "1 large onion, sliced",
      "2 tomatoes, chopped",
      "2 tablespoons vegetable oil",
      "Salt to taste"
    ],
    instructions: [
      "Marinate chicken with vinegar, garlic, ginger, vindaloo spice mix, turmeric, and salt for 2 hours.",
      "Heat oil in a pot and sauté onions until translucent.",
      "Add marinated chicken and tomatoes; cook until chicken is tender and sauce thickens (about 45 minutes).",
      "Adjust seasoning and serve with steamed rice."
    ]
  },
  {
    id: 67,
    title: "Chinese Stir-Fried Beef with Broccoli",
    description:
      "Tender beef slices stir-fried with crisp broccoli in a savory soy and oyster sauce, a classic Chinese dish.",
    imageUrl:
      "https://www.epicurious.com/photos/chinese-beef-broccoli.jpg",
    link: "https://www.example.com/chinese-beef-broccoli",
    country: "China",
    cuisine: "Chinese",
    ingredients: [
      "500g beef sirloin, thinly sliced",
      "300g broccoli florets",
      "1 onion, sliced",
      "3 cloves garlic, minced",
      "2 tablespoons soy sauce",
      "1 tablespoon oyster sauce",
      "1 teaspoon cornstarch dissolved in 2 tablespoons water",
      "2 tablespoons vegetable oil",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Marinate beef with soy sauce, salt, and pepper for 30 minutes.",
      "Heat oil in a wok; stir-fry beef until browned, then remove from the wok.",
      "Add garlic, onion, and broccoli; stir-fry for 3-4 minutes until crisp-tender.",
      "Return beef to the wok, add oyster sauce, and stir in cornstarch slurry.",
      "Cook until sauce thickens slightly; serve immediately with steamed rice."
    ]
  },
  {
    id: 68,
    title: "Japanese Tonkotsu Ramen",
    description:
      "A rich and creamy pork broth ramen with tender noodles, topped with chashu pork, a soft-boiled egg, and scallions.",
    imageUrl:
      "https://www.epicurious.com/photos/japanese-tonkotsu-ramen.jpg",
    link: "https://www.example.com/japanese-tonkotsu-ramen",
    country: "Japan",
    cuisine: "Japanese",
    ingredients: [
      "2 liters pork bone broth",
      "200g ramen noodles",
      "200g chashu pork, sliced",
      "2 soft-boiled eggs, halved",
      "1 cup bean sprouts",
      "2 scallions, chopped",
      "2 tablespoons soy sauce",
      "1 tablespoon mirin",
      "Salt to taste"
    ],
    instructions: [
      "Bring pork bone broth to a simmer; add soy sauce, mirin, and salt.",
      "Cook ramen noodles according to package instructions; drain.",
      "Blanch bean sprouts briefly.",
      "Assemble bowls with noodles, broth, chashu pork, eggs, bean sprouts, and scallions.",
      "Serve hot and enjoy."
    ]
  },
  {
    id: 69,
    title: "Korean Bibimbap (Vegetable Variation)",
    description:
      "A colorful rice bowl topped with assorted sautéed vegetables, a fried egg, and a dollop of spicy gochujang sauce.",
    imageUrl:
      "https://www.epicurious.com/photos/korean-bibimbap-vegetable.jpg",
    link: "https://www.example.com/korean-bibimbap-vegetable",
    country: "Korea",
    cuisine: "Korean",
    ingredients: [
      "3 cups steamed rice",
      "1 carrot, julienned",
      "1 zucchini, julienned",
      "1 cup spinach, blanched",
      "1 cup bean sprouts, blanched",
      "1 small cucumber, julienned",
      "1 egg, fried",
      "2 tablespoons gochujang",
      "2 teaspoons sesame oil",
      "Salt to taste",
      "Sesame seeds for garnish"
    ],
    instructions: [
      "Individually sauté each vegetable with a pinch of salt until tender.",
      "Arrange steamed rice in a bowl; top with the assorted vegetables and a fried egg.",
      "Drizzle gochujang and sesame oil over the bowl.",
      "Garnish with sesame seeds and mix well before eating."
    ]
  },
  {
    id: 70,
    title: "Lebanese Chicken Shawarma",
    description:
      "Marinated chicken, slowly roasted and thinly sliced, served in pita with garlic sauce and fresh vegetables.",
    imageUrl:
      "https://www.epicurious.com/photos/lebanese-chicken-shawarma.jpg",
    link: "https://www.example.com/lebanese-chicken-shawarma",
    country: "Lebanon",
    cuisine: "Middle Eastern",
    ingredients: [
      "1 kg chicken thighs, boneless",
      "1/4 cup yogurt",
      "Juice of 1 lemon",
      "4 cloves garlic, minced",
      "1 tablespoon ground cumin",
      "1 tablespoon ground coriander",
      "1 teaspoon paprika",
      "1/2 teaspoon turmeric",
      "Salt and pepper to taste",
      "2 tablespoons olive oil",
      "Pita bread, for serving",
      "Sliced tomatoes, cucumbers, and onions for garnish"
    ],
    instructions: [
      "Marinate chicken with yogurt, lemon juice, garlic, cumin, coriander, paprika, turmeric, salt, and pepper for at least 4 hours.",
      "Preheat the oven to 400°F (200°C) and roast the chicken on a baking sheet for 25–30 minutes until fully cooked.",
      "Let the chicken rest, then slice thinly.",
      "Serve in pita bread with garlic sauce and fresh vegetables."
    ]
  },
  {
    id: 71,
    title: "Turkish Iskender Kebab",
    description:
      "Tender slices of lamb served over pita bread with tomato sauce and a dollop of yogurt, drizzled with melted butter.",
    imageUrl:
      "https://www.epicurious.com/photos/turkish-iskender-kebab.jpg",
    link: "https://www.example.com/turkish-iskender-kebab",
    country: "Turkey",
    cuisine: "Middle Eastern",
    ingredients: [
      "1 kg lamb, thinly sliced",
      "4 pita breads, toasted and cut into pieces",
      "2 cups tomato sauce",
      "1 cup Greek yogurt",
      "4 tablespoons butter, melted",
      "Salt and pepper to taste",
      "1 teaspoon dried oregano"
    ],
    instructions: [
      "Season lamb slices with salt, pepper, and oregano.",
      "Grill the lamb over high heat until slightly charred.",
      "Arrange toasted pita pieces on a serving dish, top with grilled lamb.",
      "Warm tomato sauce and pour over the lamb and pita.",
      "Drizzle melted butter and serve with a side of Greek yogurt."
    ]
  },
  {
    id: 72,
    title: "Greek Souvlaki",
    description:
      "Juicy skewers of marinated pork or chicken, grilled and served with pita, tzatziki, and a crisp Greek salad.",
    imageUrl:
      "https://www.epicurious.com/photos/greek-souvlaki.jpg",
    link: "https://www.example.com/greek-souvlaki",
    country: "Greece",
    cuisine: "Greek",
    ingredients: [
      "1 kg pork or chicken, cut into cubes",
      "Juice of 2 lemons",
      "3 cloves garlic, minced",
      "2 tablespoons olive oil",
      "1 teaspoon dried oregano",
      "Salt and pepper to taste",
      "Pita bread, tzatziki, and salad for serving"
    ],
    instructions: [
      "Marinate meat with lemon juice, garlic, olive oil, oregano, salt, and pepper for at least 3 hours.",
      "Skewer the meat and grill over medium-high heat for 10–12 minutes, turning to ensure even cooking.",
      "Serve with warm pita, tzatziki, and a fresh Greek salad."
    ]
  },
  {
    id: 73,
    title: "Spanish Gazpacho",
    description:
      "A chilled tomato-based soup blended with cucumbers, bell peppers, and garlic, perfect for hot days.",
    imageUrl:
      "https://www.epicurious.com/photos/spanish-gazpacho.jpg",
    link: "https://www.example.com/spanish-gazpacho",
    country: "Spain",
    cuisine: "Spanish",
    ingredients: [
      "6 ripe tomatoes, chopped",
      "1 cucumber, peeled and chopped",
      "1 red bell pepper, chopped",
      "1 small red onion, chopped",
      "2 cloves garlic, minced",
      "1/4 cup olive oil",
      "2 tablespoons sherry vinegar",
      "Salt and pepper to taste",
      "Water as needed",
      "Fresh basil for garnish"
    ],
    instructions: [
      "Combine tomatoes, cucumber, bell pepper, onion, and garlic in a blender.",
      "Blend until smooth; add olive oil, sherry vinegar, salt, and pepper.",
      "Thin with water to desired consistency.",
      "Chill for at least 2 hours before serving.",
      "Garnish with fresh basil and a drizzle of olive oil."
    ]
  },
  {
    id: 74,
    title: "Vietnamese Bun Bo Hue",
    description:
      "A spicy Vietnamese noodle soup with beef shank and lemongrass, offering a complex balance of heat and sourness.",
    imageUrl:
      "https://www.epicurious.com/photos/vietnamese-bun-bo-hue.jpg",
    link: "https://www.example.com/vietnamese-bun-bo-hue",
    country: "Vietnam",
    cuisine: "Vietnamese",
    ingredients: [
      "1 kg beef shank",
      "500g rice noodles",
      "2 stalks lemongrass, bruised",
      "1 onion, halved",
      "4 cloves garlic, minced",
      "2 tablespoons chili oil",
      "1 tablespoon shrimp paste",
      "1 teaspoon annatto seeds (soaked in warm water)",
      "6 cups beef broth",
      "Salt to taste",
      "Fresh herbs (mint, cilantro) and lime wedges for garnish"
    ],
    instructions: [
      "Boil beef shank with lemongrass, onion, and garlic until tender (about 2 hours).",
      "Remove beef and slice thinly; strain the broth.",
      "Mix in shrimp paste and annatto water into the broth; adjust salt.",
      "Soak rice noodles until soft and divide into bowls.",
      "Top with beef slices and drizzle with chili oil.",
      "Garnish with fresh herbs and serve with lime wedges."
    ]
  },
  {
    id: 75,
    title: "Thai Red Curry with Beef",
    description:
      "A fragrant Thai curry with tender beef, bamboo shoots, and bell peppers simmered in coconut milk and red curry paste.",
    imageUrl:
      "https://www.epicurious.com/photos/thai-red-curry-beef.jpg",
    link: "https://www.example.com/thai-red-curry-beef",
    country: "Thailand",
    cuisine: "Thai",
    ingredients: [
      "500g beef, thinly sliced",
      "2 cups coconut milk",
      "3 tablespoons Thai red curry paste",
      "1 cup bamboo shoots, sliced",
      "1 red bell pepper, sliced",
      "1 onion, sliced",
      "2 tablespoons fish sauce",
      "1 tablespoon sugar",
      "2 tablespoons vegetable oil",
      "Fresh basil for garnish"
    ],
    instructions: [
      "Heat oil in a pot and sauté red curry paste for 1 minute.",
      "Add beef and stir-fry until browned.",
      "Pour in coconut milk and add bamboo shoots, bell pepper, and onion.",
      "Stir in fish sauce and sugar; simmer for 15 minutes until beef is tender.",
      "Garnish with fresh basil and serve with steamed rice."
    ]
  },
  {
    id: 76,
    title: "Indonesian Beef Rendang",
    description:
      "A slow-cooked, intensely spiced beef curry with a thick, aromatic sauce, originating from Indonesia.",
    imageUrl:
      "https://www.epicurious.com/photos/indonesian-beef-rendang.jpg",
    link: "https://www.example.com/indonesian-beef-rendang",
    country: "Indonesia",
    cuisine: "Southeast Asian",
    ingredients: [
      "1 kg beef, cut into cubes",
      "2 cups coconut milk",
      "1 onion, chopped",
      "4 cloves garlic, minced",
      "2 tablespoons ginger, grated",
      "3 tablespoons rendang spice paste",
      "1 stalk lemongrass, bruised",
      "2 kaffir lime leaves",
      "1 teaspoon turmeric",
      "Salt to taste",
      "2 tablespoons vegetable oil"
    ],
    instructions: [
      "Heat oil in a pot; sauté onions, garlic, and ginger until fragrant.",
      "Add beef and brown on all sides.",
      "Stir in rendang spice paste, turmeric, lemongrass, and lime leaves.",
      "Pour in coconut milk and bring to a simmer.",
      "Cook on low heat for 2–3 hours until beef is tender and sauce has reduced.",
      "Season with salt and serve with steamed rice."
    ]
  },
  {
    id: 77,
    title: "Malaysian Hainanese Chicken Rice",
    description:
      "Poached chicken served over fragrant rice cooked in chicken broth, accompanied by a tangy ginger-scallion sauce.",
    imageUrl:
      "https://www.epicurious.com/photos/malaysian-hainanese-chicken-rice.jpg",
    link: "https://www.example.com/malaysian-hainanese-chicken-rice",
    country: "Malaysia",
    cuisine: "Southeast Asian",
    ingredients: [
      "1 whole chicken",
      "4 cups chicken broth",
      "2 cups jasmine rice",
      "4 cloves garlic, minced",
      "1 piece ginger (5 cm), sliced",
      "2 tablespoons vegetable oil",
      "Salt to taste",
      "For the sauce:",
      "  - 4 cloves garlic, minced",
      "  - 1 piece ginger, grated",
      "  - 2 tablespoons green onions, chopped",
      "  - 2 tablespoons soy sauce",
      "  - 1 tablespoon sesame oil",
      "  - Juice of 1 lime"
    ],
    instructions: [
      "Poach the chicken in chicken broth with a few slices of ginger until cooked; reserve broth.",
      "Remove chicken, cool, and slice.",
      "Rinse rice and cook in the reserved broth with garlic and ginger.",
      "Prepare the sauce by mixing garlic, ginger, green onions, soy sauce, sesame oil, and lime juice.",
      "Serve sliced chicken over rice with the sauce on the side."
    ]
  },
  {
    id: 78,
    title: "Filipino Adobo",
    description:
      "A savory and tangy Filipino stew of chicken and pork simmered in vinegar, soy sauce, garlic, and bay leaves.",
    imageUrl:
      "https://www.epicurious.com/photos/filipino-adobo.jpg",
    link: "https://www.example.com/filipino-adobo",
    country: "Philippines",
    cuisine: "Filipino",
    ingredients: [
      "1 kg chicken, cut into pieces",
      "500g pork belly, cubed",
      "1/2 cup soy sauce",
      "1/2 cup vinegar",
      "6 cloves garlic, smashed",
      "2 bay leaves",
      "1 teaspoon black peppercorns",
      "1 cup water",
      "2 tablespoons vegetable oil",
      "Salt to taste"
    ],
    instructions: [
      "In a pot, combine soy sauce, vinegar, garlic, bay leaves, peppercorns, and water.",
      "Add chicken and pork; marinate for 1 hour.",
      "Heat oil in a pot; add the marinated meat and sear briefly.",
      "Pour in the marinade and bring to a boil.",
      "Reduce heat and simmer for 40–50 minutes until meat is tender and sauce has slightly reduced.",
      "Serve hot with steamed rice."
    ]
  },
  {
    id: 79,
    title: "Singapore Chili Crab",
    description:
      "A luxurious seafood dish featuring crab cooked in a tangy, spicy tomato-based sauce with a hint of sweetness.",
    imageUrl:
      "https://www.epicurious.com/photos/singapore-chili-crab.jpg",
    link: "https://www.example.com/singapore-chili-crab",
    country: "Singapore",
    cuisine: "Southeast Asian",
    ingredients: [
      "2 whole crabs, cleaned and cut into pieces",
      "1 onion, sliced",
      "3 cloves garlic, minced",
      "1 tablespoon ginger, grated",
      "2 tomatoes, chopped",
      "2 tablespoons chili sauce",
      "1 tablespoon ketchup",
      "1 teaspoon sugar",
      "1 cup chicken broth",
      "2 tablespoons vegetable oil",
      "Fresh cilantro for garnish"
    ],
    instructions: [
      "Heat oil in a wok and sauté onion, garlic, and ginger until fragrant.",
      "Add tomatoes and cook until softened.",
      "Stir in chili sauce, ketchup, sugar, and chicken broth; bring to a simmer.",
      "Add crab pieces and cook for 10–12 minutes until crab is fully cooked.",
      "Garnish with fresh cilantro and serve with mantou (steamed buns) or rice."
    ]
  },
  {
    id: 80,
    title: "Peruvian Anticuchos",
    description:
      "Grilled skewers of marinated beef heart served with a spicy, tangy sauce—a beloved Peruvian street food.",
    imageUrl:
      "https://www.epicurious.com/photos/peruvian-anticuchos.jpg",
    link: "https://www.example.com/peruvian-anticuchos",
    country: "Peru",
    cuisine: "Latin American",
    ingredients: [
      "500g beef heart, cleaned and cut into cubes",
      "1/4 cup red wine vinegar",
      "3 cloves garlic, minced",
      "1 tablespoon aji panca paste",
      "1 teaspoon cumin",
      "Salt and pepper to taste",
      "2 tablespoons olive oil",
      "Skewers for grilling"
    ],
    instructions: [
      "Marinate beef heart with vinegar, garlic, aji panca paste, cumin, salt, pepper, and olive oil for 4 hours.",
      "Thread the meat onto skewers.",
      "Grill on high heat for 3–4 minutes per side until charred but still tender.",
      "Serve with a side of boiled potatoes and a spicy dipping sauce."
    ]
  },
  {
    id: 81,
    title: "Argentine Milanesa",
    description:
      "Breaded and fried thin slices of beef served with lemon wedges—a classic Argentine comfort food.",
    imageUrl:
      "https://www.epicurious.com/photos/argentine-milanesa.jpg",
    link: "https://www.example.com/argentine-milanesa",
    country: "Argentina",
    cuisine: "Latin American",
    ingredients: [
      "500g beef sirloin, thinly sliced",
      "1 cup breadcrumbs",
      "1/2 cup flour",
      "2 eggs, beaten",
      "1 teaspoon garlic powder",
      "Salt and pepper to taste",
      "Oil for frying",
      "Lemon wedges for serving"
    ],
    instructions: [
      "Season beef slices with salt, pepper, and garlic powder.",
      "Dredge each slice in flour, dip in beaten eggs, then coat in breadcrumbs.",
      "Fry in hot oil until golden and crispy on both sides.",
      "Drain on paper towels and serve with lemon wedges."
    ]
  },
  {
    id: 82,
    title: "Brazilian Moqueca",
    description:
      "A fragrant fish stew from Brazil cooked in coconut milk, tomatoes, and bell peppers, accented with dendê oil.",
    imageUrl:
      "https://www.epicurious.com/photos/brazilian-moqueca.jpg",
    link: "https://www.example.com/brazilian-moqueca",
    country: "Brazil",
    cuisine: "Latin American",
    ingredients: [
      "1 kg white fish fillets (e.g., snapper), cut into chunks",
      "1 onion, sliced",
      "2 cloves garlic, minced",
      "1 red bell pepper, sliced",
      "2 tomatoes, chopped",
      "1 cup coconut milk",
      "2 tablespoons dendê oil (palm oil)",
      "1/2 cup fish broth",
      "Juice of 1 lime",
      "Salt and pepper to taste",
      "Fresh cilantro for garnish"
    ],
    instructions: [
      "Heat dendê oil in a pot and sauté onion and garlic until translucent.",
      "Add bell pepper and tomatoes; cook for 5 minutes.",
      "Add fish chunks and fish broth; simmer gently for 15 minutes.",
      "Stir in coconut milk and lime juice; season with salt and pepper.",
      "Garnish with fresh cilantro and serve with rice."
    ]
  },
  {
    id: 83,
    title: "Ethiopian Tibs",
    description:
      "Sautéed cubes of beef or lamb cooked with onions, garlic, and Ethiopian spices, a dish bursting with flavor and served with injera.",
    imageUrl:
      "https://www.epicurious.com/photos/ethiopian-tibs.jpg",
    link: "https://www.example.com/ethiopian-tibs",
    country: "Ethiopia",
    cuisine: "Ethiopian",
    ingredients: [
      "500g beef or lamb, cubed",
      "1 large onion, sliced",
      "3 cloves garlic, minced",
      "1 tablespoon ginger, grated",
      "2 tomatoes, chopped",
      "2 teaspoons berbere spice mix",
      "2 tablespoons niter kibbeh (or regular butter)",
      "Salt to taste",
      "Fresh basil or cilantro for garnish"
    ],
    instructions: [
      "Heat niter kibbeh in a pan and sauté onions until soft.",
      "Add garlic, ginger, and berbere; cook for 2 minutes.",
      "Add beef or lamb and brown on all sides.",
      "Stir in tomatoes and simmer for 20–25 minutes until meat is tender.",
      "Adjust seasoning, garnish, and serve with injera."
    ]
  },
  {
    id: 84,
    title: "South African Bunny Chow",
    description:
      "A street food favorite from South Africa: hollowed-out bread filled with a spicy curry, traditionally made with lamb or chicken.",
    imageUrl:
      "https://www.epicurious.com/photos/south-african-bunny-chow.jpg",
    link: "https://www.example.com/south-african-bunny-chow",
    country: "South Africa",
    cuisine: "African",
    ingredients: [
      "1 kg lamb or chicken, cubed",
      "1 large onion, chopped",
      "3 cloves garlic, minced",
      "1 can (14 oz) diced tomatoes",
      "2 teaspoons curry powder",
      "1 teaspoon turmeric",
      "1 teaspoon ground coriander",
      "Salt and pepper to taste",
      "2 tablespoons vegetable oil",
      "4 loaves of white bread (small), hollowed out"
    ],
    instructions: [
      "Heat oil in a pot; sauté onion and garlic until soft.",
      "Add lamb or chicken, curry powder, turmeric, coriander, salt, and pepper; brown the meat.",
      "Stir in diced tomatoes and simmer for 1–1.5 hours until the meat is tender and the curry is thick.",
      "Fill the hollowed bread with the curry, and serve hot."
    ]
  },
  {
    id: 85,
    title: "Moroccan Couscous with Lamb",
    description:
      "Stewed lamb served over fluffy couscous with a medley of vegetables and aromatic Moroccan spices.",
    imageUrl:
      "https://www.epicurious.com/photos/moroccan-couscous-lamb.jpg",
    link: "https://www.example.com/moroccan-couscous-lamb",
    country: "Morocco",
    cuisine: "North African",
    ingredients: [
      "1 kg lamb, cut into cubes",
      "2 cups couscous",
      "1 onion, chopped",
      "2 carrots, sliced",
      "1 zucchini, sliced",
      "1 red bell pepper, sliced",
      "1 can (14 oz) diced tomatoes",
      "1 teaspoon cumin",
      "1 teaspoon coriander",
      "1/2 teaspoon cinnamon",
      "Salt and pepper to taste",
      "2 tablespoons olive oil",
      "Fresh cilantro for garnish"
    ],
    instructions: [
      "Brown lamb in olive oil; remove and set aside.",
      "Sauté onion, carrots, zucchini, and bell pepper until softened.",
      "Return lamb to the pot; add diced tomatoes and spices.",
      "Simmer for 1.5–2 hours until lamb is tender.",
      "Prepare couscous according to package instructions.",
      "Serve the lamb curry over couscous, garnished with cilantro."
    ]
  },
  {
    id: 86,
    title: "Egyptian Ful Medames",
    description:
      "A traditional Egyptian dish of slow-cooked fava beans seasoned with garlic, lemon, and olive oil, often eaten for breakfast.",
    imageUrl:
      "https://www.epicurious.com/photos/egyptian-ful-medames.jpg",
    link: "https://www.example.com/egyptian-ful-medames",
    country: "Egypt",
    cuisine: "Middle Eastern",
    ingredients: [
      "2 cups dried fava beans, soaked overnight",
      "4 cups water",
      "4 cloves garlic, minced",
      "Juice of 1 lemon",
      "1/4 cup olive oil",
      "Salt and pepper to taste",
      "Chopped parsley for garnish"
    ],
    instructions: [
      "Drain soaked fava beans and place in a pot with water.",
      "Bring to a boil, then simmer for 1.5–2 hours until beans are very tender.",
      "Mash some of the beans for a thicker consistency.",
      "Stir in garlic, lemon juice, olive oil, salt, and pepper.",
      "Garnish with parsley and serve with warm pita bread."
    ]
  },
  {
    id: 87,
    title: "Israeli Shakshuka",
    description:
      "A hearty tomato and bell pepper stew simmered with spices and topped with poached eggs, a popular breakfast across Israel.",
    imageUrl:
      "https://www.epicurious.com/photos/israeli-shakshuka.jpg",
    link: "https://www.example.com/israeli-shakshuka",
    country: "Israel",
    cuisine: "Middle Eastern",
    ingredients: [
      "1 large onion, sliced",
      "1 red bell pepper, sliced",
      "4 cloves garlic, minced",
      "1 can (28 oz) crushed tomatoes",
      "1 teaspoon cumin",
      "1 teaspoon paprika",
      "4-6 eggs",
      "2 tablespoons olive oil",
      "Salt and pepper to taste",
      "Fresh cilantro or parsley for garnish"
    ],
    instructions: [
      "Heat olive oil in a skillet and sauté onions, bell pepper, and garlic until soft.",
      "Add crushed tomatoes, cumin, paprika, salt, and pepper; simmer for 10–15 minutes.",
      "Make small wells in the sauce and crack eggs into each well.",
      "Cover and cook until eggs are poached to your liking (about 5–7 minutes).",
      "Garnish with fresh herbs and serve with crusty bread."
    ]
  },
  {
    id: 88,
    title: "Mexican Enchiladas Verdes",
    description:
      "Corn tortillas rolled around shredded chicken, smothered in a tangy tomatillo sauce and baked until bubbly.",
    imageUrl:
      "https://www.epicurious.com/photos/mexican-enchiladas-verdes.jpg",
    link: "https://www.example.com/mexican-enchiladas-verdes",
    country: "Mexico",
    cuisine: "Mexican",
    ingredients: [
      "12 corn tortillas",
      "500g shredded chicken",
      "2 cups tomatillo salsa verde",
      "1 cup shredded cheese (Monterey Jack or similar)",
      "1/2 cup sour cream",
      "1 onion, finely chopped",
      "2 cloves garlic, minced",
      "Salt and pepper to taste",
      "Fresh cilantro for garnish"
    ],
    instructions: [
      "Preheat oven to 375°F (190°C).",
      "Lightly fry tortillas in a bit of oil until pliable.",
      "Mix shredded chicken with half of the tomatillo salsa and season with salt and pepper.",
      "Roll chicken filling into tortillas and place in a baking dish.",
      "Pour remaining salsa verde over the enchiladas and sprinkle with cheese.",
      "Bake for 20 minutes until cheese is melted and bubbly.",
      "Garnish with sour cream, chopped onion, and cilantro; serve hot."
    ]
  },
  {
    id: 89,
    title: "Spanish Tortilla",
    description:
      "A classic Spanish omelette made with potatoes and onions, slowly cooked in olive oil until perfectly set and golden.",
    imageUrl:
      "https://www.epicurious.com/photos/spanish-tortilla.jpg",
    link: "https://www.example.com/spanish-tortilla",
    country: "Spain",
    cuisine: "Spanish",
    ingredients: [
      "4 large potatoes, thinly sliced",
      "1 large onion, thinly sliced",
      "6 eggs",
      "1/2 cup olive oil",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Heat olive oil in a large skillet and add potatoes and onions; cook slowly over low heat until soft but not browned.",
      "Beat the eggs in a bowl with salt and pepper.",
      "Drain excess oil from the skillet and pour in the eggs, stirring gently to combine with potatoes and onions.",
      "Cook over low heat until the edges set, then flip the tortilla (using a plate) and cook the other side until fully set.",
      "Slide onto a plate, let cool slightly, and serve at room temperature."
    ]
  },
  {
    id: 90,
    title: "Italian Spaghetti Carbonara",
    description:
      "A creamy pasta dish with pancetta, eggs, and Parmesan cheese, creating a rich and comforting Italian classic.",
    imageUrl:
      "https://www.epicurious.com/photos/italian-spaghetti-carbonara.jpg",
    link: "https://www.example.com/italian-spaghetti-carbonara",
    country: "Italy",
    cuisine: "Italian",
    ingredients: [
      "400g spaghetti",
      "150g pancetta, diced",
      "3 eggs",
      "1 cup grated Parmesan cheese",
      "2 cloves garlic, minced",
      "Salt and pepper to taste",
      "Fresh parsley for garnish"
    ],
    instructions: [
      "Cook spaghetti in salted boiling water until al dente; reserve some pasta water.",
      "In a pan, sauté pancetta and garlic until crispy.",
      "Whisk eggs and Parmesan together in a bowl; season with pepper.",
      "Drain spaghetti and add to the pancetta pan off the heat.",
      "Quickly pour in the egg mixture, tossing rapidly to create a creamy sauce (use reserved pasta water if needed).",
      "Garnish with parsley and serve immediately."
    ]
  },
  {
    id: 91,
    title: "French Coq au Vin",
    description:
      "Chicken braised with red wine, mushrooms, onions, and bacon—a timeless French dish full of depth and richness.",
    imageUrl:
      "https://www.epicurious.com/photos/french-coq-au-vin.jpg",
    link: "https://www.example.com/french-coq-au-vin",
    country: "France",
    cuisine: "French",
    ingredients: [
      "1.5 kg chicken pieces",
      "200g bacon, diced",
      "1 onion, chopped",
      "2 carrots, sliced",
      "3 cloves garlic, minced",
      "2 cups red wine",
      "2 cups chicken broth",
      "200g mushrooms, sliced",
      "2 tablespoons flour",
      "2 tablespoons olive oil",
      "1 bay leaf",
      "Salt and pepper to taste",
      "Fresh thyme for garnish"
    ],
    instructions: [
      "Brown chicken and bacon in olive oil in a heavy pot; remove and set aside.",
      "Sauté onions, carrots, and garlic until soft.",
      "Sprinkle flour over vegetables; stir to coat.",
      "Return chicken and bacon to the pot, pour in red wine and chicken broth.",
      "Add bay leaf and thyme; bring to a simmer.",
      "Cover and cook on low heat for 1.5–2 hours until chicken is tender.",
      "Add mushrooms in the last 20 minutes; adjust seasoning and serve hot."
    ]
  },
  {
    id: 92,
    title: "Turkish Lahmacun",
    description:
      "A thin, crispy flatbread topped with a flavorful minced meat mixture, herbs, and spices, often rolled up with fresh vegetables.",
    imageUrl:
      "https://www.epicurious.com/photos/turkish-lahmacun.jpg",
    link: "https://www.example.com/turkish-lahmacun",
    country: "Turkey",
    cuisine: "Middle Eastern",
    ingredients: [
      "For the dough:",
      "  - 3 cups flour",
      "  - 1 cup warm water",
      "  - 1 tablespoon olive oil",
      "  - 1 teaspoon salt",
      "For the topping:",
      "  - 500g ground lamb or beef",
      "  - 1 onion, finely chopped",
      "  - 2 tomatoes, finely diced",
      "  - 2 cloves garlic, minced",
      "  - 1 red bell pepper, finely chopped",
      "  - 1 teaspoon paprika",
      "  - 1 teaspoon cumin",
      "  - Salt and pepper to taste",
      "  - Fresh parsley, chopped"
    ],
    instructions: [
      "Prepare the dough by mixing flour, water, olive oil, and salt; knead until smooth and let rest for 1 hour.",
      "For the topping, combine ground meat with onion, tomatoes, garlic, bell pepper, paprika, cumin, salt, pepper, and parsley.",
      "Roll the dough out very thinly and spread a thin layer of the meat mixture over it.",
      "Bake in a preheated 450°F (232°C) oven for 8–10 minutes until crispy.",
      "Serve rolled up with fresh vegetables and a squeeze of lemon."
    ]
  },
  {
    id: 93,
    title: "Greek Spanakopita",
    description:
      "A savory pastry filled with spinach, feta, onions, and herbs wrapped in crispy phyllo dough.",
    imageUrl:
      "https://www.epicurious.com/photos/greek-spanakopita.jpg",
    link: "https://www.example.com/greek-spanakopita",
    country: "Greece",
    cuisine: "Greek",
    ingredients: [
      "500g spinach, chopped",
      "250g feta cheese, crumbled",
      "1 onion, finely chopped",
      "2 cloves garlic, minced",
      "4 eggs, lightly beaten",
      "1/2 cup olive oil",
      "1 package phyllo dough",
      "Salt and pepper to taste",
      "Fresh dill, chopped"
    ],
    instructions: [
      "Sauté onions and garlic in olive oil until soft; add spinach and cook until wilted.",
      "Remove from heat and mix in feta, eggs, dill, salt, and pepper.",
      "Layer sheets of phyllo dough in a greased baking dish, brushing each with olive oil.",
      "Spread the spinach mixture evenly and top with additional phyllo sheets.",
      "Bake at 375°F (190°C) for 30–35 minutes until golden and crispy.",
      "Let cool slightly before cutting into squares."
    ]
  },
  {
    id: 94,
    title: "Portuguese Bacalhau à Brás",
    description:
      "A comforting dish of shredded salted cod mixed with scrambled eggs, onions, and fried potatoes, garnished with olives and parsley.",
    imageUrl:
      "https://www.epicurious.com/photos/portuguese-bacalhau-a-bras.jpg",
    link: "https://www.example.com/portuguese-bacalhau-a-bras",
    country: "Portugal",
    cuisine: "Portuguese",
    ingredients: [
      "400g salted cod, soaked and desalted, then shredded",
      "500g potatoes, cut into matchsticks and fried",
      "1 large onion, thinly sliced",
      "4 eggs, beaten",
      "2 cloves garlic, minced",
      "3 tablespoons olive oil",
      "Salt and pepper to taste",
      "Black olives and chopped parsley for garnish"
    ],
    instructions: [
      "Sauté onion and garlic in olive oil until soft.",
      "Add shredded cod and cook for 5 minutes.",
      "Stir in beaten eggs and cook gently until just set.",
      "Fold in fried potato matchsticks; season with salt and pepper.",
      "Garnish with olives and parsley and serve immediately."
    ]
  },
  {
    id: 95,
    title: "Moroccan Harira Soup",
    description:
      "A traditional Moroccan soup brimming with tomatoes, lentils, chickpeas, and aromatic spices, perfect for breaking fast.",
    imageUrl:
      "https://www.epicurious.com/photos/moroccan-harira-soup.jpg",
    link: "https://www.example.com/moroccan-harira-soup",
    country: "Morocco",
    cuisine: "North African",
    ingredients: [
      "1 cup lentils",
      "1 cup chickpeas, soaked overnight",
      "1 large onion, chopped",
      "2 tomatoes, pureed",
      "1/2 cup rice",
      "2 cloves garlic, minced",
      "1 teaspoon ground cinnamon",
      "1 teaspoon ginger powder",
      "1 teaspoon turmeric",
      "1/2 teaspoon black pepper",
      "1 liter vegetable or chicken broth",
      "2 tablespoons olive oil",
      "Fresh cilantro for garnish",
      "Salt to taste"
    ],
    instructions: [
      "Heat olive oil in a large pot and sauté onion and garlic until soft.",
      "Add pureed tomatoes and spices; cook for 5 minutes.",
      "Stir in lentils, chickpeas, rice, and broth.",
      "Bring to a boil, then reduce heat and simmer for 45–60 minutes until all ingredients are tender.",
      "Adjust salt, garnish with cilantro, and serve hot."
    ]
  },
  {
    id: 96,
    title: "Lebanese Mujadara",
    description:
      "A hearty lentil and rice dish topped with crispy caramelized onions, popular throughout the Middle East.",
    imageUrl:
      "https://www.epicurious.com/photos/lebanese-mujadara.jpg",
    link: "https://www.example.com/lebanese-mujadara",
    country: "Lebanon",
    cuisine: "Middle Eastern",
    ingredients: [
      "1 cup lentils",
      "1 cup rice",
      "2 large onions, thinly sliced",
      "3 tablespoons olive oil",
      "1 teaspoon cumin",
      "Salt and pepper to taste",
      "Fresh parsley for garnish"
    ],
    instructions: [
      "Cook lentils in water until tender; drain and set aside.",
      "In a separate pot, cook rice with salt until done.",
      "Fry onions in olive oil over medium heat until deeply caramelized and crispy.",
      "Mix lentils with rice and cumin; season with salt and pepper.",
      "Top with crispy onions and garnish with parsley before serving."
    ]
  },
  {
    id: 97,
    title: "Indian Masala Dosa",
    description:
      "A crisp, fermented rice and lentil crepe filled with a spiced potato mixture, a beloved South Indian street food.",
    imageUrl:
      "https://www.epicurious.com/photos/indian-masala-dosa.jpg",
    link: "https://www.example.com/indian-masala-dosa",
    country: "India",
    cuisine: "Indian",
    ingredients: [
      "For the dosa batter:",
      "  - 2 cups rice",
      "  - 1 cup split black lentils (urad dal)",
      "  - Salt to taste",
      "For the potato filling:",
      "  - 4 potatoes, boiled and mashed",
      "  - 1 onion, chopped",
      "  - 2 cloves garlic, minced",
      "  - 1 teaspoon mustard seeds",
      "  - 1 teaspoon turmeric",
      "  - Salt and pepper to taste",
      "  - 2 tablespoons oil",
      "Cilantro for garnish"
    ],
    instructions: [
      "Soak rice and lentils overnight; blend to a smooth batter and ferment for 8–12 hours. Add salt before cooking.",
      "Heat oil in a pan; add mustard seeds and sauté onions and garlic until soft.",
      "Add mashed potatoes, turmeric, salt, and pepper; cook for 5 minutes.",
      "Heat a non-stick pan and spread a ladle of dosa batter thinly to form a crepe. Cook until crisp on one side.",
      "Place a spoonful of potato filling on the dosa, fold, and serve with chutney and sambar."
    ]
  },
  {
    id: 98,
    title: "Filipino Sinigang na Baboy",
    description:
      "A tangy and savory pork soup flavored with tamarind and a medley of vegetables, offering a comforting sour broth.",
    imageUrl:
      "https://www.epicurious.com/photos/filipino-sinigang.jpg",
    link: "https://www.example.com/filipino-sinigang-na-baboy",
    country: "Philippines",
    cuisine: "Filipino",
    ingredients: [
      "1 kg pork belly or ribs, cut into chunks",
      "1 packet tamarind soup base",
      "1 onion, quartered",
      "2 tomatoes, quartered",
      "1 daikon radish, sliced",
      "1 eggplant, sliced",
      "1 bunch bok choy",
      "2 green chili peppers, whole",
      "Salt to taste",
      "Water as needed"
    ],
    instructions: [
      "Boil pork with onion and tomatoes in water until tender (about 1–1.5 hours).",
      "Add tamarind soup base and stir until dissolved.",
      "Add radish, eggplant, and chili peppers; simmer for 10 minutes.",
      "Add bok choy and cook for another 2 minutes.",
      "Adjust salt if needed and serve hot with rice."
    ]
  },
  {
    id: 99,
    title: "Thai Pad Thai",
    description:
      "A stir-fried rice noodle dish with shrimp, tofu, bean sprouts, and peanuts in a tangy tamarind sauce—a true Thai street food classic.",
    imageUrl:
      "https://www.epicurious.com/photos/thai-pad-thai.jpg",
    link: "https://www.example.com/thai-pad-thai",
    country: "Thailand",
    cuisine: "Thai",
    ingredients: [
      "200g rice noodles",
      "150g shrimp, peeled",
      "150g firm tofu, cubed",
      "2 eggs, lightly beaten",
      "1 cup bean sprouts",
      "1/4 cup roasted peanuts, crushed",
      "2 green onions, chopped",
      "3 tablespoons tamarind paste",
      "3 tablespoons fish sauce",
      "1 tablespoon sugar",
      "2 cloves garlic, minced",
      "2 tablespoons vegetable oil",
      "Lime wedges for serving"
    ],
    instructions: [
      "Soak rice noodles in warm water until soft; drain.",
      "Heat oil in a wok; sauté garlic briefly.",
      "Add tofu and shrimp; cook until shrimp turn pink.",
      "Push protein to the side and scramble eggs.",
      "Add noodles, tamarind paste, fish sauce, and sugar; stir-fry until well combined.",
      "Mix in bean sprouts and green onions; cook for 2 minutes.",
      "Serve hot, garnished with peanuts and lime wedges."
    ]
  },
  {
    id: 100,
    title: "Vietnamese Bun Cha",
    description:
      "Grilled pork patties and slices served over rice noodles with fresh herbs, lettuce, and a tangy dipping sauce—a Hanoi specialty.",
    imageUrl:
      "https://www.epicurious.com/photos/vietnamese-bun-cha.jpg",
    link: "https://www.example.com/vietnamese-bun-cha",
    country: "Vietnam",
    cuisine: "Vietnamese",
    ingredients: [
      "500g ground pork",
      "200g pork belly, thinly sliced",
      "1 shallot, finely chopped",
      "2 cloves garlic, minced",
      "2 tablespoons fish sauce",
      "1 tablespoon sugar",
      "1 teaspoon black pepper",
      "Rice noodles (Bun)",
      "Fresh lettuce, mint, cilantro, and basil",
      "For the dipping sauce:",
      "  - 1/2 cup fish sauce",
      "  - 1/4 cup lime juice",
      "  - 2 tablespoons sugar",
      "  - 2 cloves garlic, minced",
      "  - 1 red chili, sliced"
    ],
    instructions: [
      "Mix ground pork with chopped shallot, garlic, fish sauce, sugar, and pepper; form into small patties.",
      "Marinate pork belly slices with a little fish sauce and grill until charred.",
      "Grill pork patties until cooked through.",
      "Prepare rice noodles according to package instructions and arrange in a bowl with fresh lettuce and herbs.",
      "Combine dipping sauce ingredients until the sugar dissolves.",
      "Serve the grilled pork patties and belly over noodles with the dipping sauce on the side."
    ]
  },
  {
    id: 101,
    title: "American Buffalo Wings with Extra Blue Cheese",
    description: "Crispy chicken wings tossed in a tangy buffalo sauce, served with an extra creamy blue cheese dip—a party favorite.",
    imageUrl: "https://www.epicurious.com/photos/american-buffalo-wings-extra-blue-cheese.jpg",
    link: "https://www.example.com/american-buffalo-wings-extra-blue-cheese",
    country: "USA",
    cuisine: "American",
    ingredients: [
      "1 kg chicken wings",
      "1/2 cup hot sauce",
      "1/4 cup melted butter",
      "Salt and pepper to taste",
      "Extra blue cheese dressing for serving",
      "Celery sticks for garnish"
    ],
    instructions: [
      "Preheat oven to 425°F (218°C).",
      "Season wings with salt and pepper.",
      "Bake wings for 40 minutes until crispy, turning halfway.",
      "Toss wings in a mixture of hot sauce and melted butter.",
      "Serve with extra blue cheese dressing and celery sticks."
    ]
  },
  {
    id: 102,
    title: "Jamaican Curry Goat Stew",
    description: "A spicy, aromatic goat stew slow-cooked with curry spices, a classic Jamaican delicacy.",
    imageUrl: "https://www.epicurious.com/photos/jamaican-curry-goat-stew.jpg",
    link: "https://www.example.com/jamaican-curry-goat-stew",
    country: "Jamaica",
    cuisine: "Caribbean",
    ingredients: [
      "1.5 kg goat meat, cut into chunks",
      "2 onions, chopped",
      "4 cloves garlic, minced",
      "2 tablespoons curry powder",
      "1 scotch bonnet pepper, whole",
      "2 tomatoes, chopped",
      "1 teaspoon thyme",
      "2 cups water or goat broth",
      "2 tablespoons vegetable oil",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Season goat meat with salt, pepper, and curry powder.",
      "Heat oil in a pot and brown the goat meat.",
      "Add onions and garlic; sauté until softened.",
      "Add tomatoes, thyme, and the scotch bonnet pepper.",
      "Pour in water or broth, cover, and simmer for 2-3 hours until the meat is tender.",
      "Remove the pepper, adjust seasoning, and serve with rice."
    ]
  },
  {
    id: 103,
    title: "Puerto Rican Pollo Guisado",
    description: "A savory Puerto Rican chicken stew simmered with vegetables and spices, served with white rice.",
    imageUrl: "https://www.epicurious.com/photos/puerto-rican-pollo-guisado.jpg",
    link: "https://www.example.com/puerto-rican-pollo-guisado",
    country: "Puerto Rico",
    cuisine: "Caribbean",
    ingredients: [
      "1 kg chicken pieces",
      "1 large onion, chopped",
      "2 cloves garlic, minced",
      "2 tomatoes, chopped",
      "1 green bell pepper, sliced",
      "1 teaspoon oregano",
      "1 teaspoon adobo seasoning",
      "1 cup chicken broth",
      "2 tablespoons olive oil",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Season chicken with salt, pepper, oregano, and adobo seasoning.",
      "Heat olive oil in a pot and brown the chicken pieces.",
      "Add onions, garlic, tomatoes, and bell pepper; sauté until softened.",
      "Pour in chicken broth and simmer for 40 minutes until chicken is tender.",
      "Adjust seasoning and serve with rice."
    ]
  },
  {
    id: 104,
    title: "Dominican Mofongo with Beef Stew",
    description: "Mashed green plantains blended with garlic and chicharrón, topped with a hearty beef stew—a Dominican comfort food classic.",
    imageUrl: "https://www.epicurious.com/photos/dominican-mofongo-beef-stew.jpg",
    link: "https://www.example.com/dominican-mofongo-beef-stew",
    country: "Dominican Republic",
    cuisine: "Caribbean",
    ingredients: [
      "4 green plantains, peeled and cubed",
      "4 cloves garlic, minced",
      "1 cup pork cracklings (chicharrón)",
      "Salt to taste",
      "2 tablespoons olive oil",
      "For the beef stew:",
      "500g beef, cubed",
      "1 onion, chopped",
      "2 tomatoes, chopped",
      "1 bell pepper, sliced",
      "1 teaspoon oregano",
      "2 cups beef broth",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Boil plantains until tender, then mash with olive oil, garlic, and salt; mix in pork cracklings.",
      "For the stew, brown beef in a pot, then add onion, tomatoes, and bell pepper.",
      "Stir in oregano and beef broth; simmer for 1 hour until beef is tender.",
      "Serve the beef stew over the mofongo."
    ]
  },
  {
    id: 105,
    title: "Guyanese Curry Chicken",
    description: "Chicken pieces simmered in a spicy, flavorful curry sauce with Caribbean herbs, a Guyanese specialty.",
    imageUrl: "https://www.epicurious.com/photos/guyanese-curry-chicken.jpg",
    link: "https://www.example.com/guyanese-curry-chicken",
    country: "Guyana",
    cuisine: "Caribbean",
    ingredients: [
      "1 kg chicken, cut into pieces",
      "1 onion, chopped",
      "3 cloves garlic, minced",
      "1 tablespoon curry powder",
      "1 scotch bonnet pepper, chopped",
      "1 can (14 oz) diced tomatoes",
      "1 cup chicken broth",
      "2 tablespoons vegetable oil",
      "Salt and pepper to taste",
      "Fresh cilantro for garnish"
    ],
    instructions: [
      "Season chicken with salt and pepper.",
      "Heat oil in a pot and sauté onion and garlic until soft.",
      "Add curry powder and scotch bonnet; stir for 1 minute.",
      "Add chicken, tomatoes, and broth; simmer for 45 minutes until chicken is tender.",
      "Garnish with fresh cilantro and serve with rice."
    ]
  },
  {
    id: 106,
    title: "American Southern Fried Chicken",
    description: "Buttermilk-brined chicken deep-fried to crispy perfection, a staple of American Southern cuisine.",
    imageUrl: "https://www.epicurious.com/photos/american-southern-fried-chicken.jpg",
    link: "https://www.example.com/american-southern-fried-chicken",
    country: "USA",
    cuisine: "American",
    ingredients: [
      "1 kg chicken pieces",
      "2 cups buttermilk",
      "2 cups flour",
      "1 teaspoon paprika",
      "1 teaspoon garlic powder",
      "Salt and pepper to taste",
      "Vegetable oil for deep frying"
    ],
    instructions: [
      "Soak chicken in buttermilk for at least 4 hours or overnight.",
      "Mix flour, paprika, garlic powder, salt, and pepper in a bowl.",
      "Dredge chicken in the flour mixture until well coated.",
      "Deep fry chicken in hot oil (350°F) until golden and cooked through.",
      "Drain on paper towels and serve hot."
    ]
  },
  {
    id: 107,
    title: "American BBQ Ribs",
    description: "Slow-cooked pork ribs smothered in a tangy and smoky BBQ sauce, a favorite in American backyard cookouts.",
    imageUrl: "https://www.epicurious.com/photos/american-bbq-ribs.jpg",
    link: "https://www.example.com/american-bbq-ribs",
    country: "USA",
    cuisine: "American",
    ingredients: [
      "2 kg pork ribs",
      "1 cup BBQ sauce",
      "1/4 cup apple cider vinegar",
      "2 tablespoons brown sugar",
      "1 tablespoon smoked paprika",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Preheat oven to 300°F (150°C).",
      "Season ribs with salt, pepper, and smoked paprika.",
      "Mix BBQ sauce, apple cider vinegar, and brown sugar.",
      "Brush ribs with the sauce and wrap in foil.",
      "Bake for 3 hours until tender.",
      "Unwrap, brush with more sauce, and grill for 5-10 minutes for a crispy finish.",
      "Serve with extra BBQ sauce."
    ]
  },
  {
    id: 108,
    title: "American Mac and Cheese with Bacon",
    description: "Creamy, cheesy macaroni mixed with crispy bacon, baked to perfection—a comforting American classic.",
    imageUrl: "https://www.epicurious.com/photos/american-mac-and-cheese-bacon.jpg",
    link: "https://www.example.com/american-mac-and-cheese-bacon",
    country: "USA",
    cuisine: "American",
    ingredients: [
      "500g macaroni pasta",
      "4 cups milk",
      "4 tablespoons butter",
      "4 tablespoons flour",
      "3 cups shredded cheddar cheese",
      "1/2 cup grated Parmesan",
      "6 slices bacon, cooked and crumbled",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Preheat oven to 350°F (175°C).",
      "Cook macaroni until al dente; drain.",
      "In a saucepan, melt butter and whisk in flour to form a roux.",
      "Gradually add milk, whisking continuously until thickened.",
      "Stir in cheeses until melted; mix in macaroni and crumbled bacon.",
      "Transfer to a baking dish and bake for 25 minutes until bubbly and golden.",
      "Serve hot."
    ]
  },
  {
    id: 109,
    title: "Jamaican Pepper Steak",
    description: "Sizzling strips of beef cooked with peppers and a spicy Jamaican pepper sauce for a bold, flavorful dish.",
    imageUrl: "https://www.epicurious.com/photos/jamaican-pepper-steak.jpg",
    link: "https://www.example.com/jamaican-pepper-steak",
    country: "Jamaica",
    cuisine: "Caribbean",
    ingredients: [
      "500g beef sirloin, thinly sliced",
      "1 red bell pepper, sliced",
      "1 green bell pepper, sliced",
      "1 onion, sliced",
      "3 cloves garlic, minced",
      "2 tablespoons Jamaican pepper sauce",
      "1 tablespoon soy sauce",
      "1 tablespoon vegetable oil",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Marinate beef with pepper sauce, soy sauce, salt, and pepper for 30 minutes.",
      "Heat oil in a skillet and sauté onions and garlic until soft.",
      "Add beef and bell peppers; stir-fry until beef is cooked through.",
      "Adjust seasoning and serve hot with rice."
    ]
  },
  {
    id: 110,
    title: "Trinidad Curry Chicken Roti",
    description: "Spicy curry chicken served wrapped in a soft, flaky roti bread—a Trinidadian street food favorite.",
    imageUrl: "https://www.epicurious.com/photos/trinidad-curry-chicken-roti.jpg",
    link: "https://www.example.com/trinidad-curry-chicken-roti",
    country: "Trinidad & Tobago",
    cuisine: "Caribbean",
    ingredients: [
      "1 kg chicken, cut into pieces",
      "2 onions, chopped",
      "4 cloves garlic, minced",
      "2 tomatoes, chopped",
      "2 tablespoons curry powder",
      "1 scotch bonnet pepper, whole",
      "1 cup chicken broth",
      "2 tablespoons vegetable oil",
      "Salt and pepper to taste",
      "Roti bread (store-bought or homemade)"
    ],
    instructions: [
      "Season chicken with salt and pepper.",
      "Heat oil in a pot and sauté onions and garlic until soft.",
      "Add chicken, curry powder, and tomatoes; cook until chicken is browned.",
      "Pour in chicken broth and simmer for 30-40 minutes until chicken is tender.",
      "Serve the curry in roti bread wraps."
    ]
  },
  {
    id: 111,
    title: "American Buffalo Wings with Blue Cheese",
    description: "Crispy chicken wings tossed in a tangy buffalo sauce, served with cool blue cheese dressing—a beloved American appetizer.",
    imageUrl: "https://www.epicurious.com/photos/american-buffalo-wings-blue-cheese.jpg",
    link: "https://www.example.com/american-buffalo-wings-blue-cheese",
    country: "USA",
    cuisine: "American",
    ingredients: [
      "1 kg chicken wings",
      "1/2 cup hot sauce",
      "1/4 cup melted butter",
      "Salt and pepper to taste",
      "Blue cheese dressing for serving",
      "Celery sticks for garnish"
    ],
    instructions: [
      "Preheat oven to 425°F (218°C).",
      "Season wings with salt and pepper.",
      "Bake wings for 40 minutes until crispy, turning halfway.",
      "Toss wings in a mixture of hot sauce and melted butter.",
      "Serve with blue cheese dressing and celery sticks."
    ]
  },
  {
    id: 112,
    title: "Trinidad Spicy Rice and Beans",
    description: "A robust dish of rice cooked with kidney beans, coconut milk, and spicy seasonings, a Trinidadian favorite.",
    imageUrl: "https://www.epicurious.com/photos/trinidad-spicy-rice-beans.jpg",
    link: "https://www.example.com/trinidad-spicy-rice-beans",
    country: "Trinidad & Tobago",
    cuisine: "Caribbean",
    ingredients: [
      "2 cups rice",
      "1 cup kidney beans, soaked overnight",
      "1 can coconut milk",
      "2 cups water",
      "1 onion, chopped",
      "3 cloves garlic, minced",
      "1 teaspoon thyme",
      "1 scotch bonnet pepper, whole",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Cook kidney beans until tender; drain.",
      "In a pot, sauté onion and garlic until soft.",
      "Add rice, beans, coconut milk, water, thyme, salt, and pepper, and add the whole scotch bonnet.",
      "Bring to a boil, cover, and simmer for 20 minutes until rice is cooked.",
      "Remove the pepper, fluff the rice, and serve."
    ]
  },
  {
    id: 113,
    title: "Jamaican Curried Goat",
    description: "A spicy, aromatic goat curry slow-cooked to perfection, a beloved dish in Jamaican cuisine.",
    imageUrl: "https://www.epicurious.com/photos/jamaican-curried-goat-deluxe.jpg",
    link: "https://www.example.com/jamaican-curried-goat-deluxe",
    country: "Jamaica",
    cuisine: "Caribbean",
    ingredients: [
      "1 kg goat meat, cubed",
      "2 onions, chopped",
      "4 cloves garlic, minced",
      "1 tablespoon ginger, grated",
      "2 tablespoons curry powder",
      "1 scotch bonnet pepper, chopped",
      "1 can diced tomatoes (14 oz)",
      "1 cup goat broth or water",
      "1 teaspoon allspice",
      "Salt and pepper to taste",
      "2 tablespoons vegetable oil"
    ],
    instructions: [
      "Marinate goat meat with curry powder, allspice, salt, and pepper for 2 hours.",
      "Heat oil in a pot; sauté onions, garlic, and ginger until soft.",
      "Add goat meat and brown on all sides.",
      "Stir in diced tomatoes and scotch bonnet; pour in broth.",
      "Simmer for 2-3 hours until goat is tender and the sauce is thick.",
      "Adjust seasoning and serve hot with rice."
    ]
  },
  {
    id: 114,
    title: "American BBQ Pulled Pork Sandwiches",
    description: "Slow-cooked pulled pork smothered in a tangy BBQ sauce, served on soft buns with coleslaw—a classic American comfort food.",
    imageUrl: "https://www.epicurious.com/photos/american-pulled-pork-sandwiches.jpg",
    link: "https://www.example.com/american-pulled-pork-sandwiches",
    country: "USA",
    cuisine: "American",
    ingredients: [
      "2 kg pork shoulder",
      "1 cup BBQ sauce",
      "1/4 cup apple cider vinegar",
      "2 tablespoons brown sugar",
      "1 tablespoon smoked paprika",
      "Salt and pepper to taste",
      "Burger buns",
      "Coleslaw for topping"
    ],
    instructions: [
      "Slow-cook pork shoulder on low for 8 hours until tender.",
      "Shred the pork and mix with BBQ sauce, vinegar, and brown sugar.",
      "Assemble sandwiches with pork, coleslaw, and serve on buns."
    ]
  },
  {
    id: 115,
    title: "American Mac and Cheese with Bacon",
    description: "Creamy, cheesy macaroni mixed with crispy bacon, baked to perfection—a rich, comforting American side dish.",
    imageUrl: "https://www.epicurious.com/photos/american-mac-and-cheese-bacon.jpg",
    link: "https://www.example.com/american-mac-and-cheese-bacon",
    country: "USA",
    cuisine: "American",
    ingredients: [
      "500g macaroni pasta",
      "4 cups shredded cheddar cheese",
      "1 cup milk",
      "2 eggs",
      "1/2 cup butter, melted",
      "1 teaspoon mustard powder",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Preheat oven to 350°F (175°C).",
      "Cook macaroni until al dente; drain.",
      "Mix cheese, milk, eggs, melted butter, mustard powder, salt, and pepper with the pasta.",
      "Transfer to a baking dish and bake for 25-30 minutes until set and golden.",
      "Serve warm."
    ]
  },
  {
    id: 116,
    title: "Jamaican Pepper Steak",
    description: "Sizzling strips of beef cooked with peppers and a spicy Jamaican pepper sauce for a bold, flavorful dish.",
    imageUrl: "https://www.epicurious.com/photos/jamaican-pepper-steak.jpg",
    link: "https://www.example.com/jamaican-pepper-steak",
    country: "Jamaica",
    cuisine: "Caribbean",
    ingredients: [
      "500g beef sirloin, thinly sliced",
      "1 red bell pepper, sliced",
      "1 green bell pepper, sliced",
      "1 onion, sliced",
      "3 cloves garlic, minced",
      "2 tablespoons Jamaican pepper sauce",
      "1 tablespoon soy sauce",
      "1 tablespoon vegetable oil",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Marinate beef with pepper sauce, soy sauce, salt, and pepper for 30 minutes.",
      "Heat oil in a skillet and sauté onions and garlic until soft.",
      "Add beef and bell peppers; stir-fry until beef is cooked through.",
      "Adjust seasoning and serve hot with rice."
    ]
  },
  {
    id: 117,
    title: "Trinidad Curry Chicken Roti",
    description: "Spicy curry chicken served wrapped in a soft, flaky roti bread—a Trinidadian street food favorite.",
    imageUrl: "https://www.epicurious.com/photos/trinidad-curry-chicken-roti.jpg",
    link: "https://www.example.com/trinidad-curry-chicken-roti",
    country: "Trinidad & Tobago",
    cuisine: "Caribbean",
    ingredients: [
      "1 kg chicken, cut into pieces",
      "2 onions, chopped",
      "4 cloves garlic, minced",
      "2 tomatoes, chopped",
      "2 tablespoons curry powder",
      "1 scotch bonnet pepper, whole",
      "1 cup chicken broth",
      "2 tablespoons vegetable oil",
      "Salt and pepper to taste",
      "Roti bread (store-bought or homemade)"
    ],
    instructions: [
      "Season chicken with salt and pepper.",
      "Heat oil in a pot and sauté onions and garlic until soft.",
      "Add chicken, curry powder, and tomatoes; cook until chicken is browned.",
      "Pour in chicken broth and simmer for 30-40 minutes until chicken is tender.",
      "Serve the curry in roti bread wraps."
    ]
  },
  {
    id: 118,
    title: "American Buffalo Wings with Blue Cheese",
    description: "Crispy chicken wings tossed in a tangy buffalo sauce, served with cool blue cheese dressing—a beloved American appetizer.",
    imageUrl: "https://www.epicurious.com/photos/american-buffalo-wings-blue-cheese.jpg",
    link: "https://www.example.com/american-buffalo-wings-blue-cheese",
    country: "USA",
    cuisine: "American",
    ingredients: [
      "1 kg chicken wings",
      "1/2 cup hot sauce",
      "1/4 cup melted butter",
      "Salt and pepper to taste",
      "Blue cheese dressing for serving",
      "Celery sticks for garnish"
    ],
    instructions: [
      "Preheat oven to 425°F (218°C).",
      "Season wings with salt and pepper.",
      "Bake wings for 40 minutes until crispy, turning halfway.",
      "Toss wings in a mixture of hot sauce and melted butter.",
      "Serve with blue cheese dressing and celery sticks."
    ]
  },
  {
    id: 119,
    title: "Trinidad Spicy Rice and Beans",
    description: "A robust dish of rice cooked with kidney beans, coconut milk, and spicy seasonings, a Trinidadian favorite.",
    imageUrl: "https://www.epicurious.com/photos/trinidad-spicy-rice-beans.jpg",
    link: "https://www.example.com/trinidad-spicy-rice-beans",
    country: "Trinidad & Tobago",
    cuisine: "Caribbean",
    ingredients: [
      "2 cups rice",
      "1 cup kidney beans, soaked overnight",
      "1 can coconut milk",
      "2 cups water",
      "1 onion, chopped",
      "3 cloves garlic, minced",
      "1 teaspoon thyme",
      "1 scotch bonnet pepper, whole",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Cook kidney beans until tender; drain.",
      "In a pot, sauté onion and garlic until soft.",
      "Add rice, beans, coconut milk, water, thyme, salt, and pepper, and add the whole scotch bonnet.",
      "Bring to a boil, cover, and simmer for 20 minutes until rice is cooked.",
      "Remove the pepper, fluff the rice, and serve."
    ]
  },
  {
    id: 120,
    title: "Jamaican Curried Goat",
    description: "A spicy, aromatic goat curry slow-cooked to perfection, a beloved dish in Jamaican cuisine.",
    imageUrl: "https://www.epicurious.com/photos/jamaican-curried-goat-deluxe.jpg",
    link: "https://www.example.com/jamaican-curried-goat-deluxe",
    country: "Jamaica",
    cuisine: "Caribbean",
    ingredients: [
      "1 kg goat meat, cubed",
      "2 onions, chopped",
      "4 cloves garlic, minced",
      "1 tablespoon ginger, grated",
      "2 tablespoons curry powder",
      "1 scotch bonnet pepper, chopped",
      "1 can diced tomatoes (14 oz)",
      "1 cup goat broth or water",
      "1 teaspoon allspice",
      "Salt and pepper to taste",
      "2 tablespoons vegetable oil"
    ],
    instructions: [
      "Marinate goat meat with curry powder, allspice, salt, and pepper for 2 hours.",
      "Heat oil in a pot; sauté onions, garlic, and ginger until soft.",
      "Add goat meat and brown on all sides.",
      "Stir in diced tomatoes and scotch bonnet; pour in broth.",
      "Simmer for 2-3 hours until goat is tender and the sauce is thick.",
      "Adjust seasoning and serve hot with rice."
    ]
  },
  {
    id: 121,
    title: "American Pulled Chicken Sandwiches",
    description: "Slow-cooked pulled chicken smothered in tangy BBQ sauce, served on soft buns with coleslaw—a modern twist on an American favorite.",
    imageUrl: "https://www.epicurious.com/photos/american-pulled-chicken-sandwiches.jpg",
    link: "https://www.example.com/american-pulled-chicken-sandwiches",
    country: "USA",
    cuisine: "American",
    ingredients: [
      "1 kg chicken thighs, boneless",
      "1 cup BBQ sauce",
      "1/4 cup apple cider vinegar",
      "1 tablespoon brown sugar",
      "Salt and pepper to taste",
      "Burger buns",
      "Coleslaw for topping"
    ],
    instructions: [
      "Slow-cook chicken thighs in a crockpot on low for 6-8 hours until tender.",
      "Shred the chicken and mix with BBQ sauce, vinegar, and brown sugar.",
      "Assemble sandwiches with chicken and coleslaw on buns.",
      "Serve immediately."
    ]
  },
  {
    id: 122,
    title: "American Grilled Chicken Salad with Avocado",
    description: "A refreshing salad with grilled chicken, avocado, mixed greens, and a zesty lemon vinaigrette—a healthy American favorite.",
    imageUrl: "https://www.epicurious.com/photos/american-grilled-chicken-salad.jpg",
    link: "https://www.example.com/american-grilled-chicken-salad-avocado",
    country: "USA",
    cuisine: "American",
    ingredients: [
      "500g chicken breast",
      "Mixed salad greens",
      "1 avocado, sliced",
      "1 tomato, chopped",
      "1/2 red onion, thinly sliced",
      "Juice of 1 lemon",
      "2 tablespoons olive oil",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Season chicken breast with salt and pepper; grill until cooked and slice.",
      "Toss salad greens, avocado, tomato, and red onion in a bowl.",
      "Whisk together lemon juice, olive oil, salt, and pepper to make the dressing.",
      "Top salad with grilled chicken slices and drizzle with dressing.",
      "Serve immediately."
    ]
  },
  {
    id: 123,
    title: "Jamaican Curried Shrimp",
    description: "Succulent shrimp cooked in a spicy curry sauce with coconut milk, a vibrant dish from Jamaica.",
    imageUrl: "https://www.epicurious.com/photos/jamaican-curried-shrimp.jpg",
    link: "https://www.example.com/jamaican-curried-shrimp",
    country: "Jamaica",
    cuisine: "Caribbean",
    ingredients: [
      "500g shrimp, peeled and deveined",
      "1 onion, chopped",
      "3 cloves garlic, minced",
      "1 tablespoon curry powder",
      "1 cup coconut milk",
      "1 tomato, chopped",
      "1 scotch bonnet pepper, whole",
      "2 tablespoons vegetable oil",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Heat oil in a pan and sauté onion and garlic until soft.",
      "Add curry powder and tomato; cook for 2 minutes.",
      "Add shrimp and coconut milk; add whole scotch bonnet for heat.",
      "Simmer for 8-10 minutes until shrimp are cooked; remove pepper, adjust seasoning, and serve with rice."
    ]
  },
  {
    id: 124,
    title: "American Philly Cheesesteak Deluxe",
    description: "Thinly sliced beef sautéed with onions and peppers, topped with melted cheese in a hoagie roll—a deluxe version of the Philly classic.",
    imageUrl: "https://www.epicurious.com/photos/american-philly-cheesesteak-deluxe.jpg",
    link: "https://www.example.com/american-philly-cheesesteak-deluxe",
    country: "USA",
    cuisine: "American",
    ingredients: [
      "500g thinly sliced beef ribeye",
      "1 large onion, sliced",
      "1 green bell pepper, sliced",
      "4 hoagie rolls",
      "4 slices provolone cheese",
      "2 tablespoons olive oil",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Heat olive oil in a skillet; sauté onions and bell peppers until soft.",
      "Add beef and cook until browned; season with salt and pepper.",
      "Fill hoagie rolls with the beef mixture and top with provolone cheese.",
      "Optional: Toast the sandwiches until the cheese melts.",
      "Serve hot."
    ]
  },
  {
    id: 125,
    title: "Trinidad Spicy Rice and Beans",
    description: "A robust dish of rice cooked with kidney beans, coconut milk, and spicy seasonings, a Trinidadian favorite.",
    imageUrl: "https://www.epicurious.com/photos/trinidad-spicy-rice-beans.jpg",
    link: "https://www.example.com/trinidad-spicy-rice-beans",
    country: "Trinidad & Tobago",
    cuisine: "Caribbean",
    ingredients: [
      "2 cups rice",
      "1 cup kidney beans, soaked overnight",
      "1 can coconut milk",
      "2 cups water",
      "1 onion, chopped",
      "3 cloves garlic, minced",
      "1 teaspoon thyme",
      "1 scotch bonnet pepper, whole",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Cook kidney beans until tender; drain.",
      "In a pot, sauté onion and garlic until soft.",
      "Add rice, beans, coconut milk, water, thyme, salt, and pepper, and add the whole scotch bonnet.",
      "Bring to a boil, cover, and simmer for 20 minutes until rice is cooked.",
      "Remove the pepper, fluff the rice, and serve."
    ]
  },
  {
    id: 126,
    title: "Jamaican Curried Goat Deluxe",
    description: "A spicy, aromatic goat curry slow-cooked to perfection, a beloved dish in Jamaican cuisine.",
    imageUrl: "https://www.epicurious.com/photos/jamaican-curried-goat-deluxe.jpg",
    link: "https://www.example.com/jamaican-curried-goat-deluxe",
    country: "Jamaica",
    cuisine: "Caribbean",
    ingredients: [
      "1 kg goat meat, cubed",
      "2 onions, chopped",
      "4 cloves garlic, minced",
      "1 tablespoon ginger, grated",
      "2 tablespoons curry powder",
      "1 scotch bonnet pepper, chopped",
      "1 can diced tomatoes (14 oz)",
      "1 cup goat broth or water",
      "1 teaspoon allspice",
      "Salt and pepper to taste",
      "2 tablespoons vegetable oil"
    ],
    instructions: [
      "Marinate goat meat with curry powder, allspice, salt, and pepper for 2 hours.",
      "Heat oil in a pot; sauté onions, garlic, and ginger until soft.",
      "Add goat meat and brown on all sides.",
      "Stir in diced tomatoes and scotch bonnet; pour in broth.",
      "Simmer for 2-3 hours until goat is tender and the sauce is thick.",
      "Adjust seasoning and serve hot with rice."
    ]
  },
  {
    id: 127,
    title: "American BBQ Pulled Pork Sandwiches Deluxe",
    description: "Tender pulled pork in a smoky BBQ sauce served on a soft bun with coleslaw and pickles—a deluxe American BBQ experience.",
    imageUrl: "https://www.epicurious.com/photos/american-pulled-pork-sandwiches-deluxe-2.jpg",
    link: "https://www.example.com/american-pulled-pork-sandwiches-deluxe-2",
    country: "USA",
    cuisine: "American",
    ingredients: [
      "2 kg pork shoulder",
      "1 cup BBQ sauce",
      "1/4 cup apple cider vinegar",
      "2 tablespoons brown sugar",
      "1 tablespoon smoked paprika",
      "Salt and pepper to taste",
      "Burger buns",
      "Coleslaw for topping"
    ],
    instructions: [
      "Slow-cook pork shoulder on low for 8 hours until tender.",
      "Shred the pork and mix with BBQ sauce, vinegar, and brown sugar.",
      "Assemble sandwiches with pork, coleslaw, and pick buns.",
      "Serve immediately."
    ]
  },
  {
    id: 128,
    title: "American Mac and Cheese with Bacon Deluxe",
    description: "Creamy, cheesy macaroni combined with crispy bacon and baked to perfection—a comforting American side dish.",
    imageUrl: "https://www.epicurious.com/photos/american-mac-and-cheese-bacon-deluxe.jpg",
    link: "https://www.example.com/american-mac-and-cheese-bacon-deluxe",
    country: "USA",
    cuisine: "American",
    ingredients: [
      "500g macaroni pasta",
      "4 cups shredded cheddar cheese",
      "1 cup milk",
      "2 eggs",
      "1/2 cup butter, melted",
      "1 teaspoon mustard powder",
      "Salt and pepper to taste",
      "6 slices bacon, cooked and crumbled"
    ],
    instructions: [
      "Preheat oven to 350°F (175°C).",
      "Cook macaroni until al dente; drain.",
      "Mix cheese, milk, eggs, melted butter, mustard powder, salt, and pepper with the pasta.",
      "Fold in crumbled bacon and transfer to a baking dish.",
      "Bake for 25-30 minutes until set and bubbly.",
      "Serve hot."
    ]
  },
  {
    id: 129,
    title: "Jamaican Spicy Beef Patties Deluxe",
    description: "Flaky pastry pockets filled with a spicy ground beef mixture, delivering a burst of Caribbean flavor.",
    imageUrl: "https://www.epicurious.com/photos/jamaican-beef-patties-v3.jpg",
    link: "https://www.example.com/jamaican-beef-patties-v3",
    country: "Jamaica",
    cuisine: "Caribbean",
    ingredients: [
      "For the dough:",
      "  - 2 cups flour",
      "  - 1/2 cup cold butter, cubed",
      "  - 1/2 teaspoon salt",
      "  - 1/3 cup cold water",
      "For the filling:",
      "  - 500g ground beef",
      "  - 1 onion, chopped",
      "  - 2 cloves garlic, minced",
      "  - 1 scotch bonnet pepper, chopped",
      "  - 1 teaspoon curry powder",
      "  - Salt and pepper to taste",
      "  - 2 tablespoons vegetable oil"
    ],
    instructions: [
      "Prepare the dough by mixing flour and salt, cutting in butter until crumbly, then add cold water to form a dough; chill for 30 minutes.",
      "For the filling, sauté onion, garlic, and scotch bonnet in oil until soft; add ground beef and curry powder; cook until beef is browned.",
      "Roll out dough, cut into circles, fill with beef mixture, fold and seal edges.",
      "Bake at 375°F (190°C) for 20-25 minutes until golden.",
      "Serve hot."
    ]
  },
  {
    id: 130,
    title: "American Smoked Brisket",
    description: "Slow-smoked beef brisket with a deep, smoky flavor and tender texture, a hallmark of American BBQ.",
    imageUrl: "https://www.epicurious.com/photos/american-smoked-brisket.jpg",
    link: "https://www.example.com/american-smoked-brisket",
    country: "USA",
    cuisine: "American",
    ingredients: [
      "3 kg beef brisket",
      "2 tablespoons paprika",
      "1 tablespoon brown sugar",
      "1 tablespoon salt",
      "1 teaspoon black pepper",
      "1 teaspoon garlic powder",
      "1 teaspoon onion powder",
      "Wood chips for smoking"
    ],
    instructions: [
      "Mix paprika, brown sugar, salt, pepper, garlic powder, and onion powder to form a dry rub.",
      "Rub the brisket thoroughly and let sit in the refrigerator overnight.",
      "Preheat smoker to 225°F (107°C) and add wood chips.",
      "Smoke brisket for 8-10 hours until tender and smoky.",
      "Let rest for 30 minutes before slicing and serve with BBQ sauce."
    ]
  },
  {
    id: 131,
    title: "Jamaican Curried Shrimp",
    description: "Succulent shrimp cooked in a spicy curry sauce with coconut milk, a vibrant dish from Jamaica.",
    imageUrl: "https://www.epicurious.com/photos/jamaican-curried-shrimp.jpg",
    link: "https://www.example.com/jamaican-curried-shrimp",
    country: "Jamaica",
    cuisine: "Caribbean",
    ingredients: [
      "500g shrimp, peeled and deveined",
      "1 onion, chopped",
      "3 cloves garlic, minced",
      "1 tablespoon curry powder",
      "1 cup coconut milk",
      "1 tomato, chopped",
      "1 scotch bonnet pepper, whole",
      "2 tablespoons vegetable oil",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Heat oil in a pan and sauté onion and garlic until soft.",
      "Add curry powder and tomato; cook for 2 minutes.",
      "Add shrimp and coconut milk; add whole scotch bonnet for heat.",
      "Simmer for 8-10 minutes until shrimp are cooked; remove pepper, adjust seasoning, and serve with rice."
    ]
  },
  {
    id: 133,
    title: "American Beef Chili with Sunny Island Pepper Sauce",
    description:
      "A hearty beef chili simmered with kidney beans, tomatoes, and a kick of Sunny Island Pepper Sauce for extra heat.",
    imageUrl:
      "https://www.epicurious.com/photos/american-beef-chili.jpg",
    link: "https://www.example.com/american-beef-chili-pepper-sauce",
    country: "USA",
    cuisine: "American",
    ingredients: [
      "500g ground beef",
      "1 large onion, chopped",
      "4 cloves garlic, minced",
      "1 green bell pepper, diced",
      "1 red bell pepper, diced",
      "1 can (400g) kidney beans, drained",
      "1 can (400g) diced tomatoes",
      "2 tablespoons tomato paste",
      "2 cups beef broth",
      "2 teaspoons chili powder",
      "1 teaspoon cumin",
      "2 tablespoons Sunny Island Pepper Sauce",
      "Salt and pepper to taste",
      "2 tablespoons vegetable oil"
    ],
    instructions: [
      "Heat oil in a large pot and sauté onions, garlic, and bell peppers until softened.",
      "Add ground beef and cook until browned; drain excess fat.",
      "Stir in tomato paste, diced tomatoes, kidney beans, beef broth, chili powder, cumin, and Sunny Island Pepper Sauce.",
      "Bring to a boil, then reduce heat and simmer for 30–40 minutes to allow flavors to meld.",
      "Season with salt and pepper, then serve hot with cornbread or rice."
    ]
  },
  {
    id: 134,
    title: "American Meatloaf with Pepper Glaze",
    description:
      "A classic meatloaf made with a blend of beef and pork, finished with a tangy glaze infused with Sunny Island Pepper Sauce.",
    imageUrl:
      "https://www.epicurious.com/photos/american-meatloaf.jpg",
    link: "https://www.example.com/american-meatloaf-pepper-glaze",
    country: "USA",
    cuisine: "American",
    ingredients: [
      "500g ground beef",
      "500g ground pork",
      "1 cup breadcrumbs",
      "2 eggs, beaten",
      "1/2 cup milk",
      "1 onion, finely chopped",
      "3 cloves garlic, minced",
      "2 tablespoons Worcestershire sauce",
      "Salt and pepper to taste",
      "For the glaze:",
      "  - 1/3 cup Sunny Island Pepper Sauce",
      "  - 2 tablespoons brown sugar"
    ],
    instructions: [
      "Preheat oven to 180°C (350°F).",
      "In a large bowl, combine ground beef, ground pork, breadcrumbs, eggs, milk, onion, garlic, Worcestershire sauce, salt, and pepper.",
      "Shape the mixture into a loaf and place in a baking pan.",
      "Mix Sunny Island Pepper Sauce with brown sugar to form the glaze; brush over the meatloaf.",
      "Bake for 60–75 minutes until cooked through.",
      "Let rest for 10 minutes before slicing and serving."
    ]
  },
  {
    id: 135,
    title: "Jamaican Jerk Pork Tenderloin",
    description:
      "Juicy pork tenderloin marinated in a fiery blend of jerk spices and Sunny Island Pepper Sauce, then grilled to perfection.",
    imageUrl:
      "https://www.epicurious.com/photos/jamaican-jerk-pork-tenderloin.jpg",
    link: "https://www.example.com/jamaican-jerk-pork-tenderloin",
    country: "Jamaica",
    cuisine: "Caribbean",
    ingredients: [
      "1 kg pork tenderloin",
      "3 tablespoons jerk seasoning",
      "2 tablespoons Sunny Island Pepper Sauce",
      "Juice of 1 lime",
      "4 cloves garlic, minced",
      "1 tablespoon fresh thyme, chopped",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Combine jerk seasoning, Sunny Island Pepper Sauce, lime juice, garlic, thyme, salt, and pepper in a bowl.",
      "Marinate the pork tenderloin in the mixture for at least 4 hours or overnight in the refrigerator.",
      "Preheat grill to medium-high heat.",
      "Grill pork tenderloin for about 15–20 minutes, turning occasionally, until cooked through.",
      "Let rest for 10 minutes before slicing and serving."
    ]
  },
  {
    id: 136,
    title: "Trinidad Pepper Shrimp Skewers",
    description:
      "Succulent shrimp marinated in a zesty mix with Sunny Island Pepper Sauce, skewered and grilled to perfection—a taste of Trinidad.",
    imageUrl:
      "https://www.epicurious.com/photos/trinidad-pepper-shrimp-skewers.jpg",
    link: "https://www.example.com/trinidad-pepper-shrimp-skewers",
    country: "Trinidad & Tobago",
    cuisine: "Caribbean",
    ingredients: [
      "500g shrimp, peeled and deveined",
      "3 tablespoons Sunny Island Pepper Sauce",
      "Juice of 1 lime",
      "3 cloves garlic, minced",
      "1 teaspoon grated ginger",
      "Salt and pepper to taste",
      "Skewers"
    ],
    instructions: [
      "Combine Sunny Island Pepper Sauce, lime juice, garlic, ginger, salt, and pepper in a bowl.",
      "Marinate shrimp in the mixture for 1 hour in the refrigerator.",
      "Thread shrimp onto skewers.",
      "Grill over medium-high heat for 2-3 minutes per side until pink and slightly charred.",
      "Serve immediately with extra dipping sauce."
    ]
  },
  {
    id: 137,
    title: "Cuban Mojo Chicken with Pepper Twist",
    description:
      "Roasted chicken infused with traditional Cuban mojo marinade enhanced with Sunny Island Pepper Sauce for an extra kick.",
    imageUrl:
      "https://www.epicurious.com/photos/cuban-mojo-chicken.jpg",
    link: "https://www.example.com/cuban-mojo-chicken-pepper-twist",
    country: "Cuba",
    cuisine: "Caribbean",
    ingredients: [
      "1 kg chicken pieces",
      "1/4 cup olive oil",
      "Juice of 2 oranges",
      "Juice of 1 lime",
      "8 cloves garlic, minced",
      "1 teaspoon cumin",
      "1 teaspoon oregano",
      "3 tablespoons Sunny Island Pepper Sauce",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Mix olive oil, orange juice, lime juice, garlic, cumin, oregano, Sunny Island Pepper Sauce, salt, and pepper to form a marinade.",
      "Marinate chicken pieces for at least 6 hours or overnight.",
      "Preheat oven to 375°F (190°C) or grill to medium-high heat.",
      "Roast or grill chicken until cooked through and slightly charred on the edges.",
      "Serve with rice and beans or a fresh salad."
    ]
  },
  {
    id: 138,
    title: "Puerto Rican Adobo Beef",
    description:
      "Tender beef simmered in a tangy adobo marinade with Sunny Island Pepper Sauce for an extra layer of heat—a Puerto Rican twist on a classic.",
    imageUrl:
      "https://www.epicurious.com/photos/puerto-rican-adobo-beef.jpg",
    link: "https://www.example.com/puerto-rican-adobo-beef",
    country: "Puerto Rico",
    cuisine: "Caribbean",
    ingredients: [
      "1 kg beef stew meat, cubed",
      "1/4 cup vinegar",
      "4 cloves garlic, minced",
      "1 onion, chopped",
      "2 teaspoons adobo seasoning",
      "2 tablespoons Sunny Island Pepper Sauce",
      "2 bay leaves",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Marinate beef with vinegar, garlic, adobo seasoning, Sunny Island Pepper Sauce, bay leaves, salt, and pepper for 2 hours.",
      "In a pot, sauté the onion until translucent.",
      "Add the marinated beef and sear until browned on all sides.",
      "Cover with water, bring to a simmer, and cook for 2–3 hours until tender.",
      "Remove bay leaves, adjust seasoning, and serve with white rice."
    ]
  },
  {
    id: 139,
    title: "Dominican Pollo Asado with Pepper Glaze",
    description:
      "Grilled chicken marinated in a citrus and garlic adobo with a Sunny Island Pepper Sauce glaze, a favorite Dominican dish.",
    imageUrl:
      "https://www.epicurious.com/photos/dominican-pollo-asado.jpg",
    link: "https://www.example.com/dominican-pollo-asado-pepper-glaze",
    country: "Dominican Republic",
    cuisine: "Caribbean",
    ingredients: [
      "1 kg chicken pieces",
      "Juice of 2 limes",
      "4 cloves garlic, minced",
      "2 tablespoons olive oil",
      "1 teaspoon adobo seasoning",
      "2 tablespoons Sunny Island Pepper Sauce",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Combine lime juice, garlic, olive oil, adobo seasoning, Sunny Island Pepper Sauce, salt, and pepper in a bowl.",
      "Marinate chicken pieces for at least 4 hours.",
      "Preheat grill to medium-high heat.",
      "Grill chicken until cooked through and charred on the edges, about 6-8 minutes per side.",
      "Serve with a side of rice and salad."
    ]
  },
  {
    id: 140,
    title: "American Spicy BBQ Brisket Sandwich",
    description:
      "Slow-smoked beef brisket smothered in a tangy, smoky BBQ sauce with a kick from Sunny Island Pepper Sauce, served on a soft bun.",
    imageUrl:
      "https://www.epicurious.com/photos/american-bbq-brisket-sandwich.jpg",
    link: "https://www.example.com/american-spicy-bbq-brisket-sandwich",
    country: "USA",
    cuisine: "American",
    ingredients: [
      "2 kg beef brisket",
      "1 cup BBQ sauce",
      "2 tablespoons Sunny Island Pepper Sauce",
      "1/4 cup apple cider vinegar",
      "2 tablespoons brown sugar",
      "1 tablespoon smoked paprika",
      "Salt and pepper to taste",
      "Burger buns",
      "Coleslaw for topping"
    ],
    instructions: [
      "Season brisket with salt, pepper, and smoked paprika.",
      "Smoke brisket at 225°F (107°C) for 8-10 hours until tender.",
      "Shred brisket and mix with BBQ sauce, apple cider vinegar, brown sugar, and Sunny Island Pepper Sauce.",
      "Assemble on buns with coleslaw and serve immediately."
    ]
  },
  {
    id: 141,
    title: "American Cajun Blackened Chicken",
    description:
      "Spicy Cajun chicken breasts seared in butter and Sunny Island Pepper Sauce for an extra kick, served with a side of remoulade.",
    imageUrl:
      "https://www.epicurious.com/photos/american-cajun-blackened-chicken.jpg",
    link: "https://www.example.com/american-cajun-blackened-chicken",
    country: "USA",
    cuisine: "American",
    ingredients: [
      "4 chicken breasts",
      "2 tablespoons Cajun seasoning",
      "2 tablespoons Sunny Island Pepper Sauce",
      "2 tablespoons butter",
      "Salt to taste"
    ],
    instructions: [
      "Rub chicken with Cajun seasoning, salt, and Sunny Island Pepper Sauce.",
      "Melt butter in a skillet over high heat.",
      "Sear chicken for 5-6 minutes per side until well-charred and cooked through.",
      "Let rest for a few minutes, then serve with remoulade and a side salad."
    ]
  },
  {
    id: 142,
    title: "American Smoky Chipotle Steak",
    description:
      "Grilled ribeye steak marinated in a chipotle and Sunny Island Pepper Sauce blend, offering a smoky, spicy flavor profile.",
    imageUrl:
      "https://www.epicurious.com/photos/american-smoky-chipotle-steak.jpg",
    link: "https://www.example.com/american-smoky-chipotle-steak",
    country: "USA",
    cuisine: "American",
    ingredients: [
      "1 kg ribeye steak",
      "2 chipotle peppers in adobo sauce, minced",
      "2 tablespoons Sunny Island Pepper Sauce",
      "2 cloves garlic, minced",
      "Salt and pepper to taste",
      "1 tablespoon olive oil"
    ],
    instructions: [
      "Mix chipotle, Sunny Island Pepper Sauce, garlic, salt, pepper, and olive oil to form a marinade.",
      "Marinate the steak for at least 2 hours in the refrigerator.",
      "Preheat grill to high heat and cook steak for 4-5 minutes per side for medium-rare.",
      "Let rest for 10 minutes, then slice and serve with extra pepper sauce on the side."
    ]
  },
  {
    id: 143,
    title: "Jamaican Brown Stew Beef",
    description:
      "Slow-cooked beef simmered in a rich tomato-based sauce with onions, garlic, and spices, elevated by Sunny Island Pepper Sauce.",
    imageUrl:
      "https://www.epicurious.com/photos/jamaican-brown-stew-beef.jpg",
    link: "https://www.example.com/jamaican-brown-stew-beef",
    country: "Jamaica",
    cuisine: "Caribbean",
    ingredients: [
      "1 kg beef stew meat, cubed",
      "2 onions, chopped",
      "4 cloves garlic, minced",
      "2 tomatoes, chopped",
      "1 teaspoon allspice",
      "1 teaspoon thyme",
      "2 tablespoons Sunny Island Pepper Sauce",
      "2 cups beef broth",
      "Salt and pepper to taste",
      "2 tablespoons vegetable oil"
    ],
    instructions: [
      "Season beef with salt, pepper, allspice, and thyme.",
      "Brown beef in vegetable oil in a large pot.",
      "Add onions and garlic; sauté until softened.",
      "Stir in tomatoes and Sunny Island Pepper Sauce.",
      "Pour in beef broth, cover, and simmer for 2 hours until beef is tender.",
      "Adjust seasoning and serve with rice or mashed potatoes."
    ]
  },
  {
    id: 144,
    title: "Trinidad Peppered Curry Lamb",
    description:
      "Lamb cubes simmered in a spicy curry sauce with Sunny Island Pepper Sauce and coconut milk, a Trinidadian specialty.",
    imageUrl:
      "https://www.epicurious.com/photos/trinidad-peppered-curry-lamb.jpg",
    link: "https://www.example.com/trinidad-peppered-curry-lamb",
    country: "Trinidad & Tobago",
    cuisine: "Caribbean",
    ingredients: [
      "1 kg lamb, cubed",
      "2 onions, chopped",
      "4 cloves garlic, minced",
      "1 tablespoon curry powder",
      "1 scotch bonnet pepper, chopped",
      "1 cup coconut milk",
      "2 tablespoons Sunny Island Pepper Sauce",
      "1 cup lamb broth or water",
      "Salt and pepper to taste",
      "2 tablespoons vegetable oil"
    ],
    instructions: [
      "Season lamb with salt, pepper, and curry powder.",
      "Brown lamb in vegetable oil in a heavy pot.",
      "Add onions, garlic, and scotch bonnet; sauté for 5 minutes.",
      "Stir in coconut milk, broth, and Sunny Island Pepper Sauce.",
      "Simmer on low heat for 2-3 hours until lamb is tender and flavors meld.",
      "Serve hot with rice or flatbread."
    ]
  },
  {
    id: 145,
    title: "American Spicy Meatball Subs",
    description:
      "Juicy meatballs made with beef and pork, simmered in a spicy tomato and Sunny Island Pepper Sauce, served in a toasted sub roll with melted cheese.",
    imageUrl:
      "https://www.epicurious.com/photos/american-spicy-meatball-subs.jpg",
    link: "https://www.example.com/american-spicy-meatball-subs",
    country: "USA",
    cuisine: "American",
    ingredients: [
      "500g ground beef",
      "500g ground pork",
      "1 cup breadcrumbs",
      "2 eggs, beaten",
      "1 onion, finely chopped",
      "3 cloves garlic, minced",
      "1 cup tomato sauce",
      "2 tablespoons Sunny Island Pepper Sauce",
      "1 teaspoon chili powder",
      "Salt and pepper to taste",
      "4 sub rolls",
      "4 slices mozzarella cheese"
    ],
    instructions: [
      "Mix ground beef, pork, breadcrumbs, eggs, onion, garlic, chili powder, salt, and pepper in a bowl.",
      "Form meatballs and bake at 200°C (400°F) for 25 minutes or until cooked through.",
      "Heat tomato sauce with Sunny Island Pepper Sauce and simmer for 5 minutes.",
      "Place meatballs in sub rolls, top with sauce and mozzarella cheese.",
      "Optional: Toast sandwiches in the oven until cheese is melted.",
      "Serve hot."
    ]
  },
  {
    id: 146,
    title: "American Smothered Pork Chops",
    description:
      "Thick-cut pork chops braised in a savory gravy enriched with Sunny Island Pepper Sauce, served over mashed potatoes.",
    imageUrl:
      "https://www.epicurious.com/photos/american-smothered-pork-chops.jpg",
    link: "https://www.example.com/american-smothered-pork-chops",
    country: "USA",
    cuisine: "American",
    ingredients: [
      "4 pork chops",
      "Salt and pepper to taste",
      "1/2 cup flour",
      "2 tablespoons vegetable oil",
      "1 onion, sliced",
      "2 cloves garlic, minced",
      "2 cups chicken broth",
      "2 tablespoons Sunny Island Pepper Sauce",
      "1 teaspoon dried thyme"
    ],
    instructions: [
      "Season pork chops with salt and pepper, then dredge in flour.",
      "Brown pork chops in vegetable oil in a heavy skillet; remove and set aside.",
      "Sauté onions and garlic in the same skillet until soft.",
      "Return pork chops, add chicken broth, thyme, and Sunny Island Pepper Sauce.",
      "Cover and simmer for 30 minutes until pork is tender and the sauce thickens.",
      "Serve with mashed potatoes or rice."
    ]
  },
  {
    id: 147,
    title: "Jamaican Escovitch Chicken Deluxe",
    description:
      "Crispy fried chicken topped with a tangy escovitch relish spiked with Sunny Island Pepper Sauce for an extra kick of flavor.",
    imageUrl:
      "https://www.epicurious.com/photos/jamaican-escovitch-chicken-deluxe.jpg",
    link: "https://www.example.com/jamaican-escovitch-chicken-deluxe",
    country: "Jamaica",
    cuisine: "Caribbean",
    ingredients: [
      "1 kg chicken pieces",
      "1 cup flour",
      "Oil for frying",
      "For the escovitch relish:",
      "  - 1 cup white vinegar",
      "  - 1 onion, thinly sliced",
      "  - 1 carrot, julienned",
      "  - 1 bell pepper, thinly sliced",
      "  - 2 Scotch bonnet peppers, sliced",
      "  - 1 tablespoon Sunny Island Pepper Sauce",
      "  - 1 teaspoon thyme",
      "  - Salt to taste"
    ],
    instructions: [
      "Season chicken and dredge in flour; deep fry until golden and crispy.",
      "For the relish, combine vinegar, onion, carrot, bell pepper, Scotch bonnet, Sunny Island Pepper Sauce, thyme, and salt in a saucepan; simmer for 5 minutes.",
      "Pour hot relish over the fried chicken and serve immediately."
    ]
  },
  {
    id: 148,
    title: "American Steak Fajitas",
    description:
      "Thinly sliced grilled steak tossed with sautéed onions and bell peppers in a zesty mix of fajita spices and Sunny Island Pepper Sauce, served with warm tortillas.",
    imageUrl:
      "https://www.epicurious.com/photos/american-steak-fajitas.jpg",
    link: "https://www.example.com/american-steak-fajitas",
    country: "USA",
    cuisine: "American",
    ingredients: [
      "500g beef steak, thinly sliced",
      "1 red bell pepper, sliced",
      "1 green bell pepper, sliced",
      "1 onion, sliced",
      "2 cloves garlic, minced",
      "2 tablespoons fajita seasoning",
      "2 tablespoons Sunny Island Pepper Sauce",
      "2 tablespoons olive oil",
      "Flour tortillas for serving",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Marinate steak with fajita seasoning, Sunny Island Pepper Sauce, salt, and pepper for 1 hour.",
      "Sauté onions, bell peppers, and garlic in olive oil until tender.",
      "Grill the steak slices quickly over high heat.",
      "Combine steak with sautéed vegetables and serve in warm tortillas."
    ]
  },
  {
    id: 149,
    title: "Dominican Sancocho de Res",
    description:
      "A comforting Dominican beef stew with a medley of root vegetables and plantains, enriched with Sunny Island Pepper Sauce.",
    imageUrl:
      "https://www.epicurious.com/photos/dominican-sancocho-de-res.jpg",
    link: "https://www.example.com/dominican-sancocho-de-res",
    country: "Dominican Republic",
    cuisine: "Caribbean",
    ingredients: [
      "1 kg beef, cubed",
      "1 yucca, peeled and cubed",
      "2 green plantains, peeled and cut into chunks",
      "2 potatoes, cubed",
      "1 ear of corn, cut into rounds",
      "1 onion, chopped",
      "3 cloves garlic, minced",
      "1 bell pepper, chopped",
      "2 tomatoes, chopped",
      "2 cups beef broth",
      "2 tablespoons Sunny Island Pepper Sauce",
      "1 teaspoon oregano",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Brown beef in a large pot; remove and set aside.",
      "Sauté onions, garlic, and bell pepper until soft.",
      "Add tomatoes, beef, and broth along with yucca, plantains, potatoes, and corn.",
      "Stir in oregano and Sunny Island Pepper Sauce; simmer for 2 hours until beef and vegetables are tender.",
      "Adjust seasoning and serve hot."
    ]
  },
  {
    id: 150,
    title: "Puerto Rican Carne Guisada Deluxe",
    description:
      "A rich and savory beef stew simmered in a tomato and pepper sauce, enhanced with Sunny Island Pepper Sauce for extra heat—a Puerto Rican delight.",
    imageUrl:
      "https://www.epicurious.com/photos/puerto-rican-carne-guisada-deluxe.jpg",
    link: "https://www.example.com/puerto-rican-carne-guisada-deluxe",
    country: "Puerto Rico",
    cuisine: "Caribbean",
    ingredients: [
      "1 kg beef stew meat, cubed",
      "1 large onion, chopped",
      "3 cloves garlic, minced",
      "2 tomatoes, chopped",
      "1 green bell pepper, sliced",
      "1 teaspoon adobo seasoning",
      "2 tablespoons Sunny Island Pepper Sauce",
      "2 cups beef broth",
      "2 tablespoons olive oil",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Season beef with adobo, salt, and pepper.",
      "Sauté onion and garlic in olive oil until soft.",
      "Add beef and brown on all sides.",
      "Stir in tomatoes, bell pepper, Sunny Island Pepper Sauce, and beef broth.",
      "Simmer for 2 hours until beef is tender and sauce is thick.",
      "Serve with rice or mashed potatoes."
    ]
  },
  {
    id: 151,
    title: "American Bourbon Glazed Chicken Deluxe",
    description:
      "Chicken drumsticks glazed with a decadent bourbon and Sunny Island Pepper Sauce mixture, delivering a sweet and spicy kick.",
    imageUrl:
      "https://www.epicurious.com/photos/american-bourbon-glazed-chicken-deluxe.jpg",
    link: "https://www.example.com/american-bourbon-glazed-chicken-deluxe",
    country: "USA",
    cuisine: "American",
    ingredients: [
      "1 kg chicken drumsticks",
      "1/2 cup bourbon",
      "1/4 cup honey",
      "3 tablespoons Sunny Island Pepper Sauce",
      "2 tablespoons soy sauce",
      "3 cloves garlic, minced",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Mix bourbon, honey, Sunny Island Pepper Sauce, soy sauce, garlic, salt, and pepper to form a marinade.",
      "Marinate chicken drumsticks for at least 4 hours or overnight.",
      "Preheat grill to medium-high heat.",
      "Grill drumsticks, basting with the marinade, for 30-35 minutes until cooked through and glazed.",
      "Serve with extra glaze and a side of coleslaw."
    ]
  },
  {
    id: 152,
    title: "Jamaican Pepper Chicken Wings",
    description:
      "Chicken wings marinated in a fiery blend of Jamaican spices and Sunny Island Pepper Sauce, then baked until crispy.",
    imageUrl:
      "https://www.epicurious.com/photos/jamaican-pepper-chicken-wings.jpg",
    link: "https://www.example.com/jamaican-pepper-chicken-wings",
    country: "Jamaica",
    cuisine: "Caribbean",
    ingredients: [
      "1 kg chicken wings",
      "2 tablespoons Jamaican jerk seasoning",
      "2 tablespoons Sunny Island Pepper Sauce",
      "Juice of 1 lime",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Marinate chicken wings with jerk seasoning, Sunny Island Pepper Sauce, lime juice, salt, and pepper for 2 hours.",
      "Preheat oven to 425°F (218°C).",
      "Bake wings for 40 minutes until crispy, turning once.",
      "Serve with a side of cooling ranch or blue cheese dip."
    ]
  },
  {
    id: 153,
    title: "American Spicy Shrimp Po' Boy",
    description:
      "Crispy shrimp tossed in a spicy mixture with Sunny Island Pepper Sauce, served in a soft French roll with lettuce and tomato.",
    imageUrl:
      "https://www.epicurious.com/photos/american-spicy-shrimp-po-boy.jpg",
    link: "https://www.example.com/american-spicy-shrimp-po-boy",
    country: "USA",
    cuisine: "American",
    ingredients: [
      "500g shrimp, peeled and deveined",
      "1 cup flour",
      "1 teaspoon paprika",
      "1/2 teaspoon cayenne pepper",
      "2 tablespoons Sunny Island Pepper Sauce",
      "Salt and pepper to taste",
      "Oil for deep frying",
      "4 French rolls",
      "Lettuce, tomato slices, and remoulade sauce for serving"
    ],
    instructions: [
      "Season shrimp with salt, pepper, and toss in flour mixed with paprika and cayenne.",
      "Deep fry shrimp until golden and crispy; drain on paper towels.",
      "Toss fried shrimp with Sunny Island Pepper Sauce.",
      "Assemble po' boys by placing shrimp in French rolls with lettuce, tomato, and remoulade sauce.",
      "Serve immediately."
    ]
  },
  {
    id: 154,
    title: "American Chili Cheese Dog Deluxe",
    description:
      "A juicy hot dog topped with homemade chili enriched with Sunny Island Pepper Sauce and melted cheese—a deluxe take on a classic.",
    imageUrl:
      "https://www.epicurious.com/photos/american-chili-cheese-dog.jpg",
    link: "https://www.example.com/american-chili-cheese-dog-deluxe",
    country: "USA",
    cuisine: "American",
    ingredients: [
      "4 beef hot dogs",
      "4 hot dog buns",
      "500g ground beef",
      "1 can kidney beans, drained",
      "1 can tomato sauce",
      "2 tablespoons chili powder",
      "2 tablespoons Sunny Island Pepper Sauce",
      "1 cup shredded cheddar cheese",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Cook ground beef in a pan until browned; add tomato sauce, kidney beans, chili powder, and Sunny Island Pepper Sauce.",
      "Simmer the chili for 15 minutes; season with salt and pepper.",
      "Cook hot dogs as desired and place in buns.",
      "Top hot dogs with chili and shredded cheddar cheese, then serve hot."
    ]
  },
  {
    id: 155,
    title: "American Spicy Bratwurst",
    description:
      "Grilled bratwurst sausages with a spicy twist from Sunny Island Pepper Sauce, served on a bun with mustard and sauerkraut.",
    imageUrl:
      "https://www.epicurious.com/photos/american-spicy-bratwurst.jpg",
    link: "https://www.example.com/american-spicy-bratwurst",
    country: "USA",
    cuisine: "American",
    ingredients: [
      "6 bratwurst sausages",
      "2 tablespoons Sunny Island Pepper Sauce",
      "1 tablespoon spicy mustard",
      "6 buns",
      "1 cup sauerkraut",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Preheat grill to medium heat.",
      "Brush bratwurst with Sunny Island Pepper Sauce and season with salt and pepper.",
      "Grill sausages until cooked through and slightly charred, about 10-12 minutes.",
      "Assemble in buns with spicy mustard and sauerkraut.",
      "Serve immediately."
    ]
  },
  {
    id: 156,
    title: "Trinidad Pepper Steak with Mango Salsa",
    description:
      "Grilled beef steak marinated in Sunny Island Pepper Sauce served with a refreshing mango salsa—a tropical twist from Trinidad.",
    imageUrl:
      "https://www.epicurious.com/photos/trinidad-pepper-steak-mango-salsa.jpg",
    link: "https://www.example.com/trinidad-pepper-steak-mango-salsa",
    country: "Trinidad & Tobago",
    cuisine: "Caribbean",
    ingredients: [
      "500g beef steak",
      "2 tablespoons Sunny Island Pepper Sauce",
      "Salt and pepper to taste",
      "For the mango salsa:",
      "  - 1 ripe mango, diced",
      "  - 1 red onion, finely chopped",
      "  - Juice of 1 lime",
      "  - 2 tablespoons chopped cilantro",
      "  - Salt to taste"
    ],
    instructions: [
      "Marinate steak with Sunny Island Pepper Sauce, salt, and pepper for 1 hour.",
      "Preheat grill to high heat and cook steak to desired doneness.",
      "Combine mango, red onion, lime juice, cilantro, and salt to make the salsa.",
      "Slice steak and top with mango salsa before serving."
    ]
  },
  {
    id: 157,
    title: "American Spicy Lamb Gyro",
    description:
      "Thinly sliced lamb marinated in a spicy blend with Sunny Island Pepper Sauce, served in pita with tzatziki and fresh veggies.",
    imageUrl:
      "https://www.epicurious.com/photos/american-spicy-lamb-gyro.jpg",
    link: "https://www.example.com/american-spicy-lamb-gyro",
    country: "USA",
    cuisine: "American",
    ingredients: [
      "500g lamb shoulder, thinly sliced",
      "3 tablespoons Sunny Island Pepper Sauce",
      "2 cloves garlic, minced",
      "Juice of 1 lemon",
      "1 teaspoon cumin",
      "Salt and pepper to taste",
      "Pita bread, for serving",
      "Tzatziki sauce",
      "Sliced tomatoes, onions, and lettuce"
    ],
    instructions: [
      "Marinate lamb with Sunny Island Pepper Sauce, garlic, lemon juice, cumin, salt, and pepper for at least 3 hours.",
      "Grill lamb slices until slightly charred and tender.",
      "Fill pita bread with lamb, tzatziki, and fresh vegetables.",
      "Serve immediately."
    ]
  },
  {
    id: 158,
    title: "Jamaican Brown Stew Pork",
    description:
      "Tender pork shoulder simmered in a rich, savory brown stew sauce with Sunny Island Pepper Sauce, a twist on a Jamaican classic.",
    imageUrl:
      "https://www.epicurious.com/photos/jamaican-brown-stew-pork.jpg",
    link: "https://www.example.com/jamaican-brown-stew-pork",
    country: "Jamaica",
    cuisine: "Caribbean",
    ingredients: [
      "1 kg pork shoulder, cubed",
      "1 large onion, chopped",
      "4 cloves garlic, minced",
      "2 tomatoes, chopped",
      "1 teaspoon allspice",
      "1 teaspoon thyme",
      "2 tablespoons Sunny Island Pepper Sauce",
      "2 cups chicken broth",
      "Salt and pepper to taste",
      "2 tablespoons vegetable oil"
    ],
    instructions: [
      "Season pork with salt, pepper, allspice, and thyme.",
      "Brown pork in vegetable oil in a large pot.",
      "Add onions and garlic; sauté until soft.",
      "Stir in tomatoes and Sunny Island Pepper Sauce.",
      "Pour in chicken broth and simmer for 1.5–2 hours until pork is tender.",
      "Adjust seasoning and serve with rice or mashed potatoes."
    ]
  },
  {
    id: 159,
    title: "American Steak Fajitas",
    description:
      "Grilled steak strips sautéed with onions and bell peppers in a zesty seasoning and Sunny Island Pepper Sauce, served in warm tortillas.",
    imageUrl:
      "https://www.epicurious.com/photos/american-steak-fajitas.jpg",
    link: "https://www.example.com/american-steak-fajitas",
    country: "USA",
    cuisine: "American",
    ingredients: [
      "500g beef steak, thinly sliced",
      "1 red bell pepper, sliced",
      "1 green bell pepper, sliced",
      "1 large onion, sliced",
      "2 cloves garlic, minced",
      "2 tablespoons fajita seasoning",
      "2 tablespoons Sunny Island Pepper Sauce",
      "2 tablespoons olive oil",
      "Flour tortillas for serving",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Marinate steak with fajita seasoning, Sunny Island Pepper Sauce, salt, and pepper for 1 hour.",
      "Sauté onions, bell peppers, and garlic in olive oil until tender.",
      "Grill steak strips quickly over high heat.",
      "Combine steak with vegetables and serve in warm tortillas."
    ]
  },
  {
    id: 160,
    title: "Dominican Sancocho de Res",
    description:
      "A hearty beef stew with a mix of root vegetables and plantains simmered with Sunny Island Pepper Sauce, a Dominican classic.",
    imageUrl:
      "https://www.epicurious.com/photos/dominican-sancocho-de-res.jpg",
    link: "https://www.example.com/dominican-sancocho-de-res",
    country: "Dominican Republic",
    cuisine: "Caribbean",
    ingredients: [
      "1 kg beef, cubed",
      "1 yucca, peeled and cubed",
      "2 green plantains, peeled and cut into chunks",
      "2 potatoes, cubed",
      "1 ear of corn, cut into rounds",
      "1 large onion, chopped",
      "4 cloves garlic, minced",
      "1 bell pepper, chopped",
      "2 tomatoes, chopped",
      "2 cups beef broth",
      "2 tablespoons Sunny Island Pepper Sauce",
      "Salt and pepper to taste",
      "1 teaspoon oregano"
    ],
    instructions: [
      "Brown beef in a pot; set aside.",
      "Sauté onions, garlic, and bell pepper until softened.",
      "Return beef to the pot and add tomatoes, yucca, plantains, potatoes, corn, beef broth, oregano, and Sunny Island Pepper Sauce.",
      "Simmer on low heat for 2–3 hours until beef and vegetables are tender.",
      "Adjust seasoning and serve hot."
    ]
  },
  {
    id: 161,
    title: "Puerto Rican Carne Guisada Deluxe",
    description:
      "A savory beef stew with a rich tomato and pepper sauce enhanced by Sunny Island Pepper Sauce, served with white rice.",
    imageUrl:
      "https://www.epicurious.com/photos/puerto-rican-carne-guisada-deluxe.jpg",
    link: "https://www.example.com/puerto-rican-carne-guisada-deluxe",
    country: "Puerto Rico",
    cuisine: "Caribbean",
    ingredients: [
      "1 kg beef stew meat, cubed",
      "1 large onion, chopped",
      "3 cloves garlic, minced",
      "2 tomatoes, chopped",
      "1 green bell pepper, sliced",
      "1 teaspoon adobo seasoning",
      "2 tablespoons Sunny Island Pepper Sauce",
      "2 cups beef broth",
      "2 tablespoons olive oil",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Season beef with adobo, salt, and pepper.",
      "Sauté onion and garlic in olive oil until soft.",
      "Add beef and brown on all sides.",
      "Mix in tomatoes, bell pepper, Sunny Island Pepper Sauce, and beef broth.",
      "Simmer for 2 hours until beef is tender and sauce thick.",
      "Serve with rice and garnish with fresh herbs."
    ]
  },
  {
    id: 162,
    title: "American Bourbon Glazed Chicken Deluxe",
    description:
      "Juicy chicken drumsticks glazed with a decadent bourbon and Sunny Island Pepper Sauce mixture, offering a sweet and spicy kick.",
    imageUrl:
      "https://www.epicurious.com/photos/american-bourbon-glazed-chicken-deluxe.jpg",
    link: "https://www.example.com/american-bourbon-glazed-chicken-deluxe",
    country: "USA",
    cuisine: "American",
    ingredients: [
      "1 kg chicken drumsticks",
      "1/2 cup bourbon",
      "1/4 cup honey",
      "3 tablespoons Sunny Island Pepper Sauce",
      "2 tablespoons soy sauce",
      "3 cloves garlic, minced",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Mix bourbon, honey, Sunny Island Pepper Sauce, soy sauce, garlic, salt, and pepper to form a marinade.",
      "Marinate chicken drumsticks for at least 4 hours or overnight.",
      "Preheat grill to medium-high heat and cook drumsticks for 30-35 minutes, basting with marinade.",
      "Serve hot with extra glaze and coleslaw."
    ]
  },
  {
    id: 163,
    title: "Jamaican Escovitch Chicken Deluxe",
    description:
      "Crispy fried chicken topped with a tangy escovitch relish spiked with Sunny Island Pepper Sauce for an extra burst of flavor.",
    imageUrl:
      "https://www.epicurious.com/photos/jamaican-escovitch-chicken-deluxe.jpg",
    link: "https://www.example.com/jamaican-escovitch-chicken-deluxe",
    country: "Jamaica",
    cuisine: "Caribbean",
    ingredients: [
      "1 kg chicken pieces",
      "1 cup flour",
      "Oil for deep frying",
      "For the escovitch relish:",
      "  - 1 cup white vinegar",
      "  - 1 onion, thinly sliced",
      "  - 1 carrot, julienned",
      "  - 1 bell pepper, sliced",
      "  - 2 Scotch bonnet peppers, sliced",
      "  - 1 tablespoon Sunny Island Pepper Sauce",
      "  - 1 teaspoon thyme",
      "  - Salt to taste"
    ],
    instructions: [
      "Season chicken pieces and dredge in flour; deep fry until golden and crispy.",
      "For the relish, combine vinegar, onion, carrot, bell pepper, Scotch bonnet, Sunny Island Pepper Sauce, thyme, and salt in a saucepan; simmer for 5 minutes.",
      "Pour the hot relish over the fried chicken and serve immediately."
    ]
  },
  {
    id: 164,
    title: "American Spicy Cajun Gumbo",
    description:
      "A hearty gumbo loaded with chicken, andouille sausage, and shrimp, enriched with a dark roux and Sunny Island Pepper Sauce for an extra kick.",
    imageUrl:
      "https://www.epicurious.com/photos/american-cajun-gumbo.jpg",
    link: "https://www.example.com/american-spicy-cajun-gumbo",
    country: "USA",
    cuisine: "American",
    ingredients: [
      "500g chicken thighs, cut into pieces",
      "250g andouille sausage, sliced",
      "200g shrimp, peeled and deveined",
      "1 large onion, chopped",
      "2 celery stalks, chopped",
      "1 green bell pepper, chopped",
      "3 cloves garlic, minced",
      "1/4 cup flour",
      "1/4 cup vegetable oil",
      "4 cups chicken broth",
      "2 tablespoons Sunny Island Pepper Sauce",
      "1 teaspoon Cajun seasoning",
      "Salt and pepper to taste",
      "Cooked rice for serving"
    ],
    instructions: [
      "Prepare a dark roux by heating oil and gradually whisking in flour until it turns deep brown.",
      "Add onions, celery, bell pepper, and garlic; cook until softened.",
      "Add chicken, sausage, and shrimp; stir-fry briefly.",
      "Pour in chicken broth, add Cajun seasoning and Sunny Island Pepper Sauce, and simmer for 45 minutes.",
      "Serve the gumbo hot over rice."
    ]
  },
  {
    id: 165,
    title: "Jamaican Spicy Oxtail Soup",
    description:
      "A robust oxtail soup simmered with vegetables and a generous splash of Sunny Island Pepper Sauce, delivering deep, hearty flavors.",
    imageUrl:
      "https://www.epicurious.com/photos/jamaican-spicy-oxtail-soup.jpg",
    link: "https://www.example.com/jamaican-spicy-oxtail-soup",
    country: "Jamaica",
    cuisine: "Caribbean",
    ingredients: [
      "1 kg oxtail, cut into pieces",
      "2 onions, chopped",
      "3 cloves garlic, minced",
      "2 carrots, diced",
      "2 celery stalks, diced",
      "2 tomatoes, chopped",
      "1 scotch bonnet pepper, whole",
      "2 cups beef broth",
      "2 tablespoons Sunny Island Pepper Sauce",
      "1 teaspoon thyme",
      "Salt and pepper to taste",
      "2 tablespoons vegetable oil"
    ],
    instructions: [
      "Season oxtail with salt and pepper and brown in vegetable oil in a large pot.",
      "Add onions, garlic, carrots, and celery; sauté until softened.",
      "Stir in tomatoes, thyme, and Sunny Island Pepper Sauce.",
      "Pour in beef broth and add the whole scotch bonnet pepper.",
      "Cover and simmer on low heat for 3 hours until oxtail is tender and the soup is rich.",
      "Remove the pepper, adjust seasoning, and serve hot with bread or rice."
    ]
  }

];

export default recipes;
