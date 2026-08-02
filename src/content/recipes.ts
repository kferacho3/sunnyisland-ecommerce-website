import type { Claim } from "./claim";
import { approved } from "./claim";

/**
 * The six Trinidad & Tobago house recipes.
 *
 * First-party editorial content authored FOR the brand (2026-08-02) — "our
 * take" on classic T&T dishes, written in the family voice. This is authored
 * work, not scraped content: the old 150-recipe library of third-party
 * material with dead images does not return.
 */

export interface RecipeIngredient {
  group?: string;
  item: string;
  isSauce?: boolean;
}

export interface RecipeStep {
  title?: string;
  text: string;
  sauceStep?: boolean;
}

export interface Recipe {
  slug: string;
  title: string;
  dish: string;
  intro: string;
  serves: string;
  activeTime: string;
  totalTime: string;
  heat: string;
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  sauceMoments: string[];
  tip: string;
}

export const recipesProvenance: Claim<string> = approved(
  "House recipes authored for Sunny Island Pepper Sauce, 2026-08-02",
  "First-party editorial; docs/design/2026-08-02-creative-direction.md §4.IV",
);

export const recipes: Recipe[] = [
  {
    slug: "doubles-slight-pepper",
    title: "Doubles, Slight Pepper",
    dish: "Doubles",
    intro:
      'Doubles is the street food Trinidad wakes up to — two soft turmeric bara folded around curried channa, bought at the roadside and eaten standing over the wrapping paper. The classic order is "slight pepper," and that pepper has always been scotch bonnet. Ours goes in twice: a spoonful in the channa pot, and the drizzle at the table beside the cucumber chutney.',
    serves: "Makes about 18 bara — 9 doubles; serves 4 to 6",
    activeTime: "1 hour",
    totalTime: "About 3 hours, plus an overnight soak for the channa",
    heat: "Runs medium with a tablespoon in the pot; the table drizzle sets the final heat, so start light in the channa and let each double take its own.",
    ingredients: [
      {
        group: "For the bara",
        item: "2 cups (250 g) all-purpose flour",
      },
      {
        group: "For the bara",
        item: "1 tsp instant yeast",
      },
      {
        group: "For the bara",
        item: "1 tsp granulated sugar",
      },
      {
        group: "For the bara",
        item: "3/4 tsp salt",
      },
      {
        group: "For the bara",
        item: "1/2 tsp ground turmeric",
      },
      {
        group: "For the bara",
        item: "1/2 tsp ground geera (cumin)",
      },
      {
        group: "For the bara",
        item: "3/4 cup plus 2 tbsp (210 ml) warm water, about",
      },
      {
        group: "For the bara",
        item: "Neutral oil, for the bowl, your hands, and deep-frying (about 4 cups / 1 L)",
      },
      {
        group: "For the curried channa",
        item: "1 cup (200 g) dried channa (chickpeas), soaked overnight — or two 15-oz (425 g) cans, drained",
      },
      {
        group: "For the curried channa",
        item: "3 tbsp neutral oil",
      },
      {
        group: "For the curried channa",
        item: "1 small onion, finely chopped",
      },
      {
        group: "For the curried channa",
        item: "4 cloves garlic, minced",
      },
      {
        group: "For the curried channa",
        item: "2 tbsp Trinidad-style curry powder",
      },
      {
        group: "For the curried channa",
        item: "1 tsp ground geera (cumin), plus 1/2 tsp roasted geera to finish",
      },
      {
        group: "For the curried channa",
        item: "2 cups (475 ml) reserved channa cooking liquid or water",
      },
      {
        group: "For the curried channa",
        item: "1 tbsp Sunny Island Pepper Sauce",
        isSauce: true,
      },
      {
        group: "For the curried channa",
        item: "2 tbsp chopped bandhania (shado beni or culantro)",
      },
      {
        group: "For the curried channa",
        item: "Salt, to taste",
      },
      {
        group: "For the cucumber chutney",
        item: "1 cucumber, seeded and coarsely grated",
      },
      {
        group: "For the cucumber chutney",
        item: "1 clove garlic, grated",
      },
      {
        group: "For the cucumber chutney",
        item: "1 tbsp chopped bandhania",
      },
      {
        group: "For the cucumber chutney",
        item: "Juice of 1/2 lime",
      },
      {
        group: "For the cucumber chutney",
        item: "1/4 tsp salt",
      },
      {
        group: "To serve",
        item: "Sunny Island Pepper Sauce, for drizzling",
        isSauce: true,
      },
    ],
    steps: [
      {
        title: "Mix the bara dough",
        text: "Whisk the flour, yeast, sugar, salt, turmeric, and geera in a large bowl. Add the warm water and mix to a soft, slightly sticky dough — softer than roti dough, and it should be. Knead in the bowl for two minutes, film with oil, cover, and rest 1 to 1 1/2 hours until doubled.",
      },
      {
        title: "Boil the channa",
        text: "Drain the soaked channa, cover with fresh water by two inches, and boil until tender but still holding shape, 45 minutes to an hour. Reserve 2 cups of the cooking liquid before draining. Canned channa skips this step; use plain water in its place.",
      },
      {
        title: "Cook down the curry",
        text: "Stir the curry powder and ground geera with 1/4 cup water into a loose paste. Heat the oil in a heavy pot, soften the onion and garlic, then add the paste and cook, stirring, until the water is gone and the curry darkens and grips the pot, about 2 minutes. This is where the channa gets its flavor; do not rush it.",
      },
      {
        title: "Curry the channa",
        text: "Add the channa and turn until every pea is coated. Pour in the reserved liquid, bring to a simmer, and cook 20 to 25 minutes, crushing some channa against the side of the pot so the gravy thickens. It should end soft, wet, and spoonable — doubles channa runs looser than curry channa for roti.",
      },
      {
        title: "Season the pot",
        sauceStep: true,
        text: "Stir in 1 tablespoon of Sunny Island Pepper Sauce, the roasted geera, and salt to taste. Simmer 5 minutes more, then fold in the bandhania off the heat. The sauce's vinegar and scotch bonnet lift the curry without shouting over it.",
      },
      {
        title: "Make the cucumber chutney",
        text: "Squeeze about half the water from the grated cucumber, then toss it with the garlic, bandhania, lime juice, and salt. Keep it cold. It is the cooling half of the pepper-sauce equation on the finished double.",
      },
      {
        title: "Fry the bara",
        text: "Heat 2 inches of oil to 350 F (175 C). With well-oiled hands, pull golf-ball pieces of dough and flatten each thin, 4 to 5 inches across, then slide into the oil. Fry 15 to 20 seconds a side until puffed and lightly blistered, and drain on paper.",
      },
      {
        title: "Build and drizzle",
        sauceStep: true,
        text: "Lay two bara overlapping on wax paper. Spoon on hot channa, add a spoonful of cucumber chutney, and drizzle with Sunny Island Pepper Sauce — the classic order is slight pepper, but that call is yours. Fold and eat standing up, over the paper.",
      },
    ],
    sauceMoments: [
      "1 tbsp stirred into the channa pot for the last 10 minutes of simmering",
      "A drizzle over each assembled double at the table, beside the cucumber chutney",
    ],
    tip: "The bara dough should feel too sticky to handle — that stickiness is what fries into softness. Work with oiled hands instead of flouring the dough; every extra spoon of flour costs you a soft bara.",
  },
  {
    slug: "curry-chicken-buss-up-shut",
    title: "Curry Chicken, Buss-Up-Shut",
    dish: "Curry Chicken with Buss-Up-Shut (Paratha Roti)",
    intro:
      "Curry chicken with buss-up-shut is roti-shop food at its best — chicken simmered in a chadon beni-heavy green seasoning and a curry gravy, mopped up with paratha roti beaten until it shreds like a busted-up shirt. In Trinidad this is Saturday lunch, wedding food, the plate you order without looking at the menu. Scotch bonnet has always belonged in green seasoning, so we blend a spoonful of our sauce straight into the marinade and keep the bottle on the table for the rest.",
    serves: "4 to 6",
    activeTime: "1 hour 15 minutes",
    totalTime: "About 4 hours, including marinating and dough rests",
    heat: "Moderate — one tablespoon in the marinade cooks down to a warm background; the real heat is self-serve at the table. Halve it in the marinade for a gentler pot, double it if pepper is the point.",
    ingredients: [
      {
        group: "For the chicken and marinade",
        item: "3 lb (1.35 kg) chicken thighs and drumsticks, bone-in, skin removed, cut into pieces",
      },
      {
        item: "Juice of 1 lime, for washing the chicken",
      },
      {
        item: "8 leaves chadon beni (culantro), or a good handful of cilantro",
      },
      {
        item: "4 scallions, roughly chopped",
      },
      {
        item: "6 sprigs fresh thyme, leaves stripped",
      },
      {
        item: "5 cloves garlic",
      },
      {
        item: "1 small onion, quartered",
      },
      {
        item: "2 pimento peppers, seeded (optional but traditional)",
      },
      {
        item: "1 tbsp Sunny Island Pepper Sauce",
        isSauce: true,
      },
      {
        item: "2 tsp salt",
      },
      {
        group: "For the curry",
        item: "3 tbsp Trinidad-style curry powder",
      },
      {
        item: "1 tsp amchar massala or roasted ground geera (cumin), optional",
      },
      {
        item: "3 tbsp neutral oil",
      },
      {
        item: "1/4 cup (60 ml) water, for the curry slurry",
      },
      {
        item: "2 cups (475 ml) hot water",
      },
      {
        item: "1 medium potato, peeled and cut into chunks (optional)",
      },
      {
        item: "Salt, to taste",
      },
      {
        group: "For the buss-up-shut",
        item: "4 cups (500 g) all-purpose flour",
      },
      {
        item: "2 tsp baking powder",
      },
      {
        item: "1 tsp salt",
      },
      {
        item: "About 1 1/2 cups (355 ml) warm water",
      },
      {
        item: "1/4 cup (60 ml) neutral oil or melted butter, for brushing and the tawa",
      },
      {
        group: "For the table",
        item: "Sunny Island Pepper Sauce, for serving",
        isSauce: true,
      },
    ],
    steps: [
      {
        title: "Blend the green seasoning",
        text: "Blend the chadon beni, scallions, thyme, garlic, onion, and pimento peppers with a splash of water until you have a loose, deep-green paste. Stir in 1 tablespoon of Sunny Island Pepper Sauce — the Scotch bonnet and mustard do the work a fresh hot pepper would.",
        sauceStep: true,
      },
      {
        title: "Season the chicken",
        text: "Wash the chicken pieces with the lime juice and cold water, drain, and pat dry. Toss with the green seasoning and salt until every piece is coated, then cover and marinate in the fridge at least 2 hours, or overnight if you can.",
      },
      {
        title: "Make the dough",
        text: "Whisk the flour, baking powder, and salt, then add the warm water gradually and knead 3 to 4 minutes into a soft, slightly tacky dough. Cover with a damp cloth and rest 30 minutes.",
      },
      {
        title: "Form the cones",
        text: "Divide the dough into 4 balls. Roll each into a thin round, brush with oil, cut a slit from center to edge, and roll into a tight cone; tuck the point into the base and rest the cones, covered, another 20 minutes.",
      },
      {
        title: "Bloom the curry",
        text: "Stir the curry powder and amchar massala into the 1/4 cup water to make a slurry. Heat the oil in a heavy pot over medium heat, add the slurry, and fry, stirring, until it darkens, smells toasted rather than raw, and the oil breaks back out at the edges — 2 to 3 minutes.",
      },
      {
        title: "Curry the chicken",
        text: "Add the chicken and turn until every piece wears the curry. Cover and let it spring its own water for 10 minutes, then add the hot water and the potato if using, and simmer, partly covered, 30 to 35 minutes, until the chicken is tender and the gravy coats a spoon. Taste for salt.",
      },
      {
        title: "Cook the roti",
        text: "While the pot simmers, roll each cone into a thin round about 12 inches across. Cook on a hot, lightly oiled tawa or wide skillet, brushing the top with oil, about 2 minutes per side until blistered and gold in spots.",
      },
      {
        title: "Buss it up",
        text: "Working while it is hot, clap each roti between your hands inside a clean kitchen towel — or beat it on the tawa with two wooden spatulas — until it breaks into soft, ragged folds. Pile it beside the curry chicken, spoon gravy over, and put the Sunny Island bottle on the table where it belongs.",
        sauceStep: true,
      },
    ],
    sauceMoments: [
      "1 tbsp blended into the green seasoning marinade",
      "At the table, spooned over the gravy plate by plate",
    ],
    tip: "Let the chicken spring its own water before you add any — the pot looks dry for the first few minutes, then releases plenty. Add water too soon and you boil the curry instead of frying it.",
  },
  {
    slug: "chicken-pelau",
    title: "Burnt-Sugar Chicken Pelau",
    dish: "Chicken Pelau",
    intro:
      "Pelau is the pot that follows Trinidadians everywhere — to the beach, to the river, to Sunday lunch — chicken, rice, and pigeon peas cooked down in one heavy pot over caramel made from burnt sugar. Our family has cooked it this way since the Trinidad years, and the Scotch bonnet in our sauce is the same pepper the dish was built around. A spoonful goes into the seasoning overnight, and another goes in at the end, where its tang wakes up the coconut milk.",
    serves: "6",
    activeTime: "45 minutes",
    totalTime: "1 hour 30 minutes, plus marinating",
    heat: "Runs gentle to medium — the marinade spoonful mellows in the pot and the finishing spoonful carries the brightness; double the finish, or bring the bottle to the table, for more.",
    ingredients: [
      {
        group: "For the chicken and green seasoning",
        item: "2 1/2 lb (1.1 kg) chicken thighs and drumsticks, bone-in, skin removed",
      },
      {
        item: "6 leaves chadon beni (culantro), or 1/2 cup cilantro leaves",
      },
      {
        item: "3 scallions, roughly chopped",
      },
      {
        item: "4 sprigs fresh thyme, leaves stripped",
      },
      {
        item: "4 cloves garlic",
      },
      {
        item: "1 tbsp Sunny Island Pepper Sauce",
        isSauce: true,
      },
      {
        item: "1 1/2 tsp salt",
      },
      {
        group: "For the pot",
        item: "2 tbsp neutral oil",
      },
      {
        item: "3 tbsp brown sugar, preferably demerara",
      },
      {
        item: "1 medium onion, diced",
      },
      {
        item: "1 pimento (seasoning) pepper, seeded and chopped, or half a red bell pepper",
      },
      {
        item: "1 carrot, diced",
      },
      {
        item: "2 cups (400 g) parboiled rice, rinsed and drained",
      },
      {
        item: "1 can (15 oz / 425 g) pigeon peas, drained, or 1 1/2 cups cooked",
      },
      {
        item: "1 can (13.5 fl oz / 400 ml) coconut milk",
      },
      {
        item: "2 cups (475 ml) water or chicken stock",
      },
      {
        item: "1 tbsp ketchup (optional, but most pots we know have it)",
      },
      {
        group: "To finish",
        item: "1 tbsp butter",
      },
      {
        item: "1 tbsp Sunny Island Pepper Sauce, plus more at the table",
        isSauce: true,
      },
      {
        item: "Chopped chadon beni or cilantro, a small handful",
      },
    ],
    steps: [
      {
        title: "Season the chicken",
        sauceStep: true,
        text: "Blend the chadon beni, scallions, thyme, and garlic with a splash of water into a rough green seasoning. Toss the chicken with the seasoning, the salt, and 1 tablespoon of pepper sauce until every piece is coated. Cover and marinate at least 1 hour, or overnight in the fridge — overnight is where the flavor lives.",
      },
      {
        title: "Burn the sugar",
        text: "Set a heavy pot — iron if you have it — over medium heat with the oil, then sprinkle the sugar over in an even layer. Let it melt, bubble, and darken past amber to a deep mahogany that froths at the edges. Do not walk away; the line between burnt sugar and ruined sugar is about ten seconds.",
      },
      {
        title: "Coat and brown",
        text: "Add the chicken straight into the frothing caramel, seasoning and all, and turn the pieces until they are stained brown on every side. Let them brown and release their juices, about 8 to 10 minutes, stirring now and then.",
      },
      {
        title: "Build the pot",
        text: "Add the onion, pimento pepper, and carrot and cook until the onion softens, about 3 minutes. Stir in the pigeon peas and the rice, turning until every grain is slicked and colored by the pot.",
      },
      {
        title: "Add the liquid",
        text: "Pour in the coconut milk and water, add the ketchup if using, and scrape the bottom of the pot once. Taste the liquid — it should be slightly saltier than you want the finished rice — and adjust. Bring to a boil.",
      },
      {
        title: "Cover and cook low",
        text: "Drop the heat to low, cover tightly, and cook undisturbed for 25 to 30 minutes, until the rice is tender and the liquid is absorbed. Resist stirring; the quiet crackle near the end is the bun bun forming at the bottom, and that crust is the cook's reward.",
      },
      {
        title: "Rest and finish",
        sauceStep: true,
        text: "Pull the pot off the heat and let it sit, covered, for 10 minutes. Fluff with a fork, then stir the butter and 1 tablespoon of pepper sauce through the hot rice so it glosses every grain. Scatter over the chadon beni and bring the pot — and the bottle — to the table.",
      },
    ],
    sauceMoments: [
      "1 tbsp in the green seasoning marinade",
      "1 tbsp stirred through with the butter after the rest",
    ],
    tip: "If the sugar turns black and smokes acrid before the chicken goes in, throw it out, wipe the pot, and start again — bitter caramel cannot be cooked out, and three tablespoons of sugar is a cheap do-over.",
  },
  {
    slug: "callaloo",
    title: "Callaloo, Swizzled to Silk",
    dish: "Callaloo",
    intro:
      "Callaloo is the green heart of a Trini Sunday lunch — dasheen leaves simmered down with coconut milk, okra, and pumpkin, then swizzled until the pot turns thick and silken. Tradition floats a whole Scotch bonnet on the surface, fished out before it bursts; our sauce does that pepper's job with more control, since Scotch bonnet, vinegar, and green papaya are already the backbone of the bottle. This is the pot we put down when the rice is cooking and the macaroni pie is in the oven.",
    serves: "6 as a side, 4 over rice",
    activeTime: "25 minutes",
    totalTime: "1 hour",
    heat: "Gentle to medium as written — the traditional floating pepper never bursts, and 2 teaspoons keeps that spirit; climb a teaspoon at a time in the pot, or let the table bottle do the rest.",
    ingredients: [
      {
        group: "For the pot",
        item: "1 bundle dasheen (taro) leaves, about 8 oz (225 g) once stripped — or 10 oz (280 g) baby spinach where dasheen is scarce",
      },
      {
        item: "8 okra, tops trimmed, cut into thirds",
      },
      {
        item: "8 oz (225 g) calabaza pumpkin, peeled and cut into chunks",
      },
      {
        item: "1 small onion, chopped",
      },
      {
        item: "4 cloves garlic, chopped",
      },
      {
        item: "2 pimento (seasoning) peppers, seeded and chopped, if you can get them",
      },
      {
        item: "4 blades chive (scallion), chopped",
      },
      {
        item: "3 sprigs fresh thyme",
      },
      {
        item: "1 can (13.5 fl oz / 400 ml) coconut milk",
      },
      {
        item: "2 cups (475 ml) water or light stock",
      },
      {
        item: "1 salted pig tail, soaked and cut up, or 2 small blue crabs, cleaned (optional)",
      },
      {
        item: "2 tsp Sunny Island Pepper Sauce",
        isSauce: true,
      },
      {
        item: "1 tsp salt, plus more to taste",
      },
      {
        group: "To finish",
        item: "1 tbsp butter or coconut oil",
      },
      {
        item: "1/2 to 1 tsp Sunny Island Pepper Sauce, plus the bottle at the table",
        isSauce: true,
      },
    ],
    steps: [
      {
        title: "Strip the leaves",
        text: "Strip the dasheen leaves from their stalks and cut out the thick central ribs. Wash them well, stack and roll them, and slice into wide ribbons. If you are using spinach, just wash it — it needs no trimming and will cook faster.",
      },
      {
        title: "Layer the pot",
        text: "In a heavy pot, layer the leaves with the okra, pumpkin, onion, garlic, pimentos, chive, and thyme. Tuck in the pig tail or crab if using, then pour the coconut milk and water over everything. It will look like too many leaves; it is not.",
      },
      {
        title: "Add the sauce",
        sauceStep: true,
        text: "Stir in 2 teaspoons of Sunny Island Pepper Sauce and the salt. This is where a whole Scotch bonnet would float, watched nervously so it never bursts — the sauce gives you the same fruity heat without the gamble, and the green papaya adds body to the pot.",
      },
      {
        title: "Simmer it down",
        text: "Bring to a boil, then drop to a low simmer, cover, and cook 30 to 35 minutes, stirring once or twice. You want the leaves fully collapsed and dark, and the pumpkin soft enough to crush against the side of the pot. Dasheen leaves must be cooked all the way through — do not rush this.",
      },
      {
        title: "Swizzle smooth",
        text: "Lift out the crab or pig tail pieces and set them aside. Swizzle the pot with a bois lélé rolled between your palms, or pulse briefly with an immersion blender. Stop while it still has some body — callaloo should be thick and nearly smooth, not a purée.",
      },
      {
        title: "Finish the pot",
        sauceStep: true,
        text: "Return the crab or pig tail, swirl in the butter, and taste for salt. Off the heat, stir in another 1/2 to 1 teaspoon of sauce if you want the finish brighter — the vinegar lifts the coconut milk the way a squeeze of lime would.",
      },
      {
        title: "Serve it Sunday style",
        text: "Ladle over rice or serve alongside stewed chicken and macaroni pie. Put the bottle on the table for those who take their callaloo hotter than the pot.",
      },
    ],
    sauceMoments: [
      "2 tsp stirred into the pot in place of the traditional floating whole Scotch bonnet",
      "1/2 to 1 tsp swirled in off the heat to brighten the finish",
      "the bottle on the table for anyone who wants it hotter",
    ],
    tip: "If your dasheen leaves taste the slightest bit scratchy on the throat, they are undercooked — the itch is calcium oxalate, and only time and heat break it down. Simmer another 10 minutes and taste again; it always cooks out.",
  },
  {
    slug: "trini-corn-soup",
    title: "Late-Night Trini Corn Soup",
    dish: "Trini Corn Soup",
    intro:
      "Corn soup is what Trinidad eats standing up — ladled thick from a drum pot outside the fete at two in the morning, sweet corn rounds and flour dumplings sunk into a split pea broth. Our version builds that same body on a home stove: peas cooked until they break, pumpkin collapsing into the pot, coconut milk rounding everything out. The pepper sauce goes in near the end so the Scotch bonnet stays bright and fruity, then sits on the table the way every vendor keeps a bottle by the ladle.",
    serves: "6 to 8",
    activeTime: "40 minutes",
    totalTime: "About 1 hour 45 minutes",
    heat: "Gentle as written — one tablespoon in a full pot warms more than it burns; use two if your crowd can take it, and let the table bottle do the rest.",
    ingredients: [
      {
        group: "For the soup",
        item: "2 tbsp coconut or neutral oil",
      },
      {
        item: "1 medium onion, diced",
      },
      {
        item: "4 cloves garlic, minced",
      },
      {
        item: "4 pimento (seasoning) peppers, seeded and chopped, if you can get them",
      },
      {
        item: "1/4 cup green seasoning (chadon beni or cilantro, chives, thyme, and garlic blended with a splash of water)",
      },
      {
        item: "1 cup (200 g) yellow split peas, rinsed",
      },
      {
        item: "8 cups (2 L) water or vegetable stock",
      },
      {
        item: "1 lb (450 g) calabaza pumpkin, peeled and cut in 1-inch pieces",
      },
      {
        item: "8 oz (225 g) cassava or white potato, peeled and cut in large chunks",
      },
      {
        item: "2 carrots, cut in thick rounds",
      },
      {
        item: "4 ears corn, shucked and cut in 1 1/2-inch rounds",
      },
      {
        item: "1 can (13.5 oz / 400 ml) coconut milk",
      },
      {
        item: "3 to 4 sprigs fresh thyme",
      },
      {
        item: "Salt and black pepper",
      },
      {
        group: "For the dumplings",
        item: "1 cup (125 g) all-purpose flour",
      },
      {
        item: "1/4 tsp salt",
      },
      {
        item: "About 1/3 cup (80 ml) water",
      },
      {
        group: "To finish",
        item: "1 tbsp Sunny Island Pepper Sauce, plus the bottle at the table",
        isSauce: true,
      },
      {
        item: "Chadon beni or cilantro leaves, chopped",
      },
    ],
    steps: [
      {
        title: "Build the base",
        text: "Heat the oil in a heavy pot over medium. Add the onion, garlic, pimentos, and green seasoning and cook 3 to 4 minutes, until the pot smells like the seasoning and the onion is soft.",
      },
      {
        title: "Cook down the peas",
        text: "Add the split peas and water, bring to a boil, and skim any foam. Simmer partly covered 35 to 40 minutes, until the peas are soft and starting to break apart, then whisk the pot briskly to break them down further — this is where the body comes from.",
      },
      {
        title: "Add the provisions",
        text: "Stir in the pumpkin, cassava, carrots, coconut milk, thyme, and a generous pinch of salt. Simmer 10 minutes while you make the dumplings.",
      },
      {
        title: "Make the dumplings",
        text: "Mix the flour and salt, then work in just enough water to form a firm dough. Knead 2 minutes until smooth and rest 10 minutes under a damp cloth — the rest is what keeps them tender.",
      },
      {
        title: "Corn and spinners",
        text: "Add the corn rounds to the pot. Roll the dough into thin ropes, pinch off short pieces, and roll each between your palms into spinners; drop them in and simmer 15 to 20 minutes, until the dumplings are cooked through and the pumpkin is collapsing into the broth.",
      },
      {
        title: "Bring in the heat",
        sauceStep: true,
        text: "In the last 10 minutes, stir in 1 tablespoon of Sunny Island Pepper Sauce so the Scotch bonnet blooms into the broth but keeps its brightness. Taste and adjust with salt and black pepper — the soup should be thick enough to coat the corn.",
      },
      {
        title: "Serve it street-style",
        text: "Ladle into deep cups or bowls, making sure everyone gets corn and dumplings. Scatter chadon beni over the top and put the bottle on the table for each person to finish their own.",
      },
    ],
    sauceMoments: [
      "1 tbsp stirred into the pot in the last 10 minutes of simmering",
      "At the table, over each bowl",
    ],
    tip: "The body should come from the peas and pumpkin, not added flour — if the soup feels thin, crush some pumpkin against the side of the pot and give it five more minutes at a simmer.",
  },
  {
    slug: "pepper-shrimp",
    title: "Ten-Minute Pepper Shrimp",
    dish: "Pepper Shrimp",
    intro:
      "Pepper shrimp is the cutter that disappears first at any lime — hot shrimp, sharp lime, enough pepper to keep the rum honest. Our version skips a separate glaze recipe entirely: the pepper sauce is the glaze, thinned with lime juice and pulled together with cold butter, because Scotch bonnet, mustard, and green papaya already carry everything a pan sauce needs. Start to finish, this is the fastest cooking we do.",
    serves: "4, or 6 as a cutter",
    activeTime: "20 minutes",
    totalTime: "35 minutes",
    heat: "Runs medium-hot — lime and butter round off the Scotch bonnet; drop the glaze to 2 tablespoons of sauce for a gentler plate, or pass the bottle for more.",
    ingredients: [
      {
        group: "For the shrimp",
        item: "1 1/2 lb (680 g) large shrimp (16/20 count), peeled and deveined, tails left on",
      },
      {
        item: "3/4 tsp salt",
      },
      {
        item: "1/2 tsp freshly ground black pepper",
      },
      {
        item: "1 tbsp Sunny Island Pepper Sauce",
        isSauce: true,
      },
      {
        item: "2 tbsp neutral oil",
      },
      {
        group: "For the glaze",
        item: "4 cloves garlic, thinly sliced",
      },
      {
        item: "3 tbsp Sunny Island Pepper Sauce",
        isSauce: true,
      },
      {
        item: "1/4 cup (60 ml) fresh lime juice (about 2 limes), plus wedges for serving",
      },
      {
        item: "2 tbsp (28 g) cold unsalted butter, cut into cubes",
      },
      {
        item: "2 scallions, thinly sliced",
      },
      {
        item: "Small handful chadon beni (culantro) or cilantro leaves, roughly chopped",
      },
    ],
    steps: [
      {
        title: "Season the shrimp",
        text: "Pat the shrimp completely dry, then toss with the salt, black pepper, and 1 tablespoon of pepper sauce. Let them sit 15 minutes at room temperature while you slice the garlic and juice the limes.",
        sauceStep: true,
      },
      {
        title: "Heat the pan hard",
        text: "Set a heavy skillet over medium-high heat with the oil until it shimmers. A pan that is not hot enough will steam the shrimp instead of searing them.",
      },
      {
        title: "Sear in batches",
        text: "Lay the shrimp in a single layer with space between them, working in two batches. Cook 1 to 2 minutes per side until just pink but slightly underdone, then move them to a plate.",
      },
      {
        title: "Bloom the garlic",
        text: "Lower the heat to medium and add the garlic to the fat left in the pan. Cook 30 to 45 seconds, stirring, until pale gold and fragrant — no further, it turns bitter fast.",
      },
      {
        title: "Build the glaze",
        text: "Add the pepper sauce and lime juice and scrape up everything stuck to the pan. Let it bubble about 30 seconds until it tightens slightly.",
        sauceStep: true,
      },
      {
        title: "Mount with butter",
        text: "Pull the pan off the heat and swirl in the cold butter a cube at a time until the glaze turns glossy and coats a spoon. Return the shrimp and any collected juices and toss over low heat until every shrimp is covered, about 30 seconds.",
      },
      {
        title: "Finish and serve",
        text: "Shower with scallion and chadon beni and serve straight from the pan, with lime wedges and bread for the glaze. Set the bottle on the table for anyone who wants more.",
      },
    ],
    sauceMoments: [
      "1 tbsp tossed with the shrimp before they hit the pan",
      "3 tbsp as the base of the pan glaze, thinned with lime juice and mounted with cold butter",
      "The bottle at the table for those who want more",
    ],
    tip: "Pull the shrimp from the sear when they curl into a loose C — a tight O means overcooked. They finish in the glaze, so undercooking on the first pass is the whole trick.",
  },
];
