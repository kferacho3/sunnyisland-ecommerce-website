// src/data/recipes.ts

export interface Recipe {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    link: string;
    country: string;      // New: Country of origin
    cuisine: string;      // New: Cuisine or food type (e.g., "Caribbean", "Indian", etc.)
    rating: number;       // New: Initial rating for the recipe
  }
  
  const recipes: Recipe[] = [
    {
      id: 1,
      title: "Callaloo, Macaroni Pie, & Stew Chicken",
      description:
        "A traditional Trinidad and Tobago dish with stew chicken, fresh Dasheen leaves and spices blended to make callaloo, and a blend of nice cheese to make a macaroni pie.",
      imageUrl:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/recipesAI/recipe1.png",
      link: "https://www.youtube.com/watch?v=V_FZJXGijBs",
      country: "Trinidad & Tobago",
      cuisine: "Caribbean",
      rating: 10, 
    },
    {
      id: 2,
      title: "Indian Butter Chicken",
      description:
        "A creamy tomato-based curry made with chicken and a blend of warm spices.",
      imageUrl:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/recipesAI/recipe2.png",
      link: "https://www.indianhealthyrecipes.com/butter-chicken/",
      country: "India",
      cuisine: "Indian",
      rating: 10, 
    },
    {
      id: 3,
      title: "Trinidad Chicken Pelau",
      description:
        "A flavorful stewed chicken recipe, a staple of Trinidadian cuisine, rice and stewed pigeon peas",
      imageUrl:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/recipesAI/recipe3.png",
      link: "https://www.youtube.com/watch?v=VmdAmyUMZwo",
      country: "Trinidad & Tobago",
      cuisine: "Caribbean",
      rating: 10, 
    },
    {
      id: 4,
      title: "Mexican Chicken Fajitas",
      description:
        "A dish made with grilled chicken, onions, and bell peppers, served with tortillas.",
      imageUrl:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/recipesAI/recipe4.png",
      link: "https://www.simplyrecipes.com/recipes/chicken_fajitas/",
      country: "Mexico",
      cuisine: "Mexican",
      rating: 10, 
    },
    {
      id: 5,
      title: "Okra & Rice with Saltfish",
      description:
        "A classic Caribbean dish consisting of rice, okra, and various herbs and spices mixed together with saltfish",
      imageUrl:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/recipesAI/recipe5.png",
      link: "https://cleoscooking.com/recipe-items/okra-rice/",
      country: "Caribbean",
      cuisine: "Caribbean",
      rating: 10, 
    },
    {
      id: 6,
      title: "Jamaican Jerk Chicken",
      description:
        "Chicken marinated in a spicy jerk seasoning and grilled to perfection.",
      imageUrl:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/recipesAI/recipe6.png",
      link: "https://www.jamaicanmedium.com/recipes/recipe/jamaican-jerk-chicken-recipe/",
      country: "Jamaica",
      cuisine: "Caribbean",
      rating: 10, 
    },
    {
      id: 7,
      title: "Curry Chicken with Trinidad Style Roti",
      description:
        "Rich spices in a curry sauce, served with soft, flat Trinidadian roti bread.",
      imageUrl:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/recipesAI/recipe7.png",
      link: "https://www.africanbites.com/curry-chicken/",
      country: "Trinidad & Tobago",
      cuisine: "Caribbean",
      rating: 10, 
    },
    {
      id: 8,
      title: "Mexican Arroz con Pollo",
      description:
        "A hearty dish featuring rice, chicken, vegetables, and a flavorful blend of spices.",
      imageUrl:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/recipesAI/recipe8.png",
      link: "https://www.simplyrecipes.com/recipes/arroz_con_pollo/",
      country: "Mexico",
      cuisine: "Mexican",
      rating: 10, 
    },
    {
      id: 9,
      title: "Trinidad Doubles",
      description:
        "A popular street food consisting of two baras (flat fried bread) filled with curry channa (chickpeas).",
      imageUrl:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/recipesAI/recipe9.png",
      link: "https://www.simplytrinicooking.com/trinidad-doubles/",
      country: "Trinidad & Tobago",
      cuisine: "Caribbean",
      rating: 10, 
    },
    {
      id: 10,
      title: "King Fish Meal",
      description:
        "A flavorful fish dish, often grilled or fried, popular in Caribbean cuisine.",
      imageUrl:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/recipesAI/recipe10.png",
      link: "https://www.youtube.com/watch?v=P2T_MneXmvM",
      country: "Caribbean",
      cuisine: "Caribbean",
      rating: 10, 
    },
    {
      id: 11,
      title: "Chinese Special Fried Rice",
      description:
        "A flavorful fried rice dish with shrimp, pork, chicken, eggs, and mixed vegetables, seasoned with soy sauce.",
      imageUrl:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/recipesAI/recipe11.png",
      link: "https://www.example.com/chinese-special-fried-rice",
      country: "China",
      cuisine: "Chinese",
      rating: 10, 
    },
    {
      id: 12,
      title: "Japanese Hibachi Steak and Shrimp",
      description:
        "Grilled steak and shrimp cooked on a traditional Japanese hibachi grill, served with fried rice and vegetables.",
      imageUrl:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/recipesAI/recipe12.png",
      link: "https://www.example.com/japanese-hibachi-steak-shrimp",
      country: "Japan",
      cuisine: "Japanese",
      rating: 10, 
    },
    {
      id: 13,
      title: "Korean BBQ Beef Bulgogi",
      description:
        "A popular Korean BBQ dish featuring thinly sliced marinated beef, grilled and served with a side of steamed rice.",
      imageUrl:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/recipesAI/recipe13.png",
      link: "https://www.example.com/korean-bbq-beef-bulgogi",
      country: "Korea",
      cuisine: "Korean",
      rating: 10, 
    },
    {
      id: 14,
      title: "Nigerian Jollof Rice",
      description:
        "A West African favorite, this spicy one-pot rice dish is made with tomatoes, onions, and bell peppers.",
      imageUrl:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/recipesAI/recipe14.png",
      link: "https://www.example.com/nigerian-jollof-rice",
      country: "Nigeria",
      cuisine: "Nigerian",
      rating: 10, 
    },
    {
      id: 15,
      title: "Ethiopian Doro Wat",
      description:
        "A spicy chicken stew served with hard-boiled eggs and injera, an Ethiopian sourdough flatbread.",
      imageUrl:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/recipesAI/recipe15.png",
      link: "https://www.example.com/ethiopian-doro-wat",
      country: "Ethiopia",
      cuisine: "Ethiopian",
      rating: 10, 
    },
    {
      id: 16,
      title: "Jamaican Oxtail Stew",
      description:
        "A rich and flavorful stew made with oxtail, butter beans, and a blend of Jamaican spices.",
      imageUrl:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/recipesAI/recipe16.png",
      link: "https://www.example.com/jamaican-oxtail-stew",
      country: "Jamaica",
      cuisine: "Caribbean",
      rating: 10, 
    },
    {
      id: 17,
      title: "Guyanese Pepperpot",
      description:
        "A traditional Guyanese dish made with beef, cinnamon, cassareep (a special Guyanese sauce), and hot peppers.",
      imageUrl:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/recipesAI/recipe17.png",
      link: "https://www.example.com/guyanese-pepperpot",
      country: "Guyana",
      cuisine: "Guyanese",
      rating: 10, 
    },
    {
      id: 18,
      title: "Chinese Lemon Chicken",
      description:
        "Crispy fried chicken pieces coated in a sweet and tangy lemon sauce.",
      imageUrl:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/recipesAI/recipe18.png",
      link: "https://www.example.com/chinese-lemon-chicken",
      country: "China",
      cuisine: "Chinese",
      rating: 10, 
    },
    {
      id: 19,
      title: "Japanese Sushi Platter",
      description:
        "An assortment of fresh sushi and sashimi, including nigiri, maki, and California rolls.",
      imageUrl:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/recipesAI/recipe19.png",
      link: "https://www.example.com/japanese-sushi-platter",
      country: "Japan",
      cuisine: "Japanese",
      rating: 10, 
    },
    {
      id: 20,
      title: "Korean Kimchi Jjigae",
      description:
        "A spicy and hearty Korean stew made with kimchi, pork, tofu, and various vegetables.",
      imageUrl:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/recipesAI/recipe20.png",
      link: "https://www.example.com/korean-kimchi-jjigae",
      country: "Korea",
      cuisine: "Korean",
      rating: 10, 
    },
    {
      id: 21,
      title: "Nigerian Egusi Soup",
      description:
        "A rich and savory West African soup made with ground melon seeds, spinach, and assorted meats.",
      imageUrl:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/recipesAI/recipe21.png",
      link: "https://www.example.com/nigerian-egusi-soup",
      country: "Nigeria",
      cuisine: "Nigerian",
      rating: 10, 
    },
    {
      id: 22,
      title: "Ethiopian Kitfo",
      description:
        "A traditional Ethiopian dish of minced raw beef, marinated in mitmita (a spicy chili powder) and niter kibbeh (clarified butter).",
      imageUrl:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/recipesAI/recipe22.png",
      link: "https://www.example.com/ethiopian-kitfo",
      country: "Ethiopia",
      cuisine: "Ethiopian",
      rating: 10, 
    },
    {
      id: 23,
      title: "Jamaican Curry Goat",
      description:
        "A popular Jamaican dish featuring goat meat slow-cooked in a fragrant curry sauce.",
      imageUrl:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/recipesAI/recipe23.png",
      link: "https://www.example.com/jamaican-curry-goat",
      country: "Jamaica",
      cuisine: "Caribbean",
      rating: 10, 
    },
    {
      id: 24,
      title: "Guyanese Chow Mein",
      description:
        "A flavorful noodle dish with a mix of chicken, vegetables, and Guyanese spices.",
      imageUrl:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/recipesAI/recipe24.png",
      link: "https://www.example.com/guyanese-chow-mein",
      country: "Guyana",
      cuisine: "Guyanese",
      rating: 10, 
    },
    {
      id: 25,
      title: "Chinese Peking Duck",
      description:
        "A famous Chinese dish of roasted duck known for its crispy skin, served with pancakes and hoisin sauce.",
      imageUrl:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/recipesAI/recipe25.png",
      link: "https://www.example.com/chinese-peking-duck",
      country: "China",
      cuisine: "Chinese",
      rating: 10, 
    },
    {
      id: 26,
      title: "Trinidad Shark and Bake",
      description:
        "A popular street food featuring fried shark stuffed in a fried dough ('bake') with various condiments and vegetables.",
      imageUrl:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/recipesAI/recipe26.png",
      link: "https://www.example.com/trinidad-shark-and-bake",
      country: "Trinidad & Tobago",
      cuisine: "Caribbean",
      rating: 10, 
    },
    {
      id: 27,
      title: "Trinidad Stewed Red Beans",
      description:
        "A hearty dish of red beans slow-cooked with herbs, spices, and coconut milk, often served with rice.",
      imageUrl:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/recipesAI/recipe27.png",
      link: "https://www.example.com/trinidad-stewed-red-beans",
      country: "Trinidad & Tobago",
      cuisine: "Caribbean",
      rating: 10, 
    },
    {
      id: 28,
      title: "Trinidadian Corn Soup",
      description:
        "A rich and flavorful soup made with corn, coconut milk, and a medley of vegetables and spices, often sold by street vendors.",
      imageUrl:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/recipesAI/recipe28.png",
      link: "https://www.example.com/trinidadian-corn-soup",
      country: "Trinidad & Tobago",
      cuisine: "Caribbean",
      rating: 10, 
    },
    {
      id: 29,
      title: "Trinidad Pelau with Beef",
      description:
        "A one-pot dish with caramelized beef, rice, pigeon peas, and coconut milk, infused with Caribbean flavors.",
      imageUrl:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/recipesAI/recipe29.png",
      link: "https://www.example.com/trinidad-pelau-with-beef",
      country: "Trinidad & Tobago",
      cuisine: "Caribbean",
      rating: 10,
    },
    {
      id: 30,
      title: "Trinidad Stewed Pigeon Peas",
      description:
        "A hearty and savory side dish made with pigeon peas stewed with garlic, onions, coconut milk, and Caribbean herbs, often served with rice or roti.",
      imageUrl:
        "https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/recipesAI/recipe30.png",
      link: "https://www.example.com/trinidad-stewed-pigeon-peas",
      country: "Trinidad & Tobago",
      cuisine: "Caribbean",
      rating: 10, 
    },
  ];
  
  export default recipes;
  