// src/data/eventsData.ts

export interface EventData {
    id: number;
    title: string;
    date: string; // ISO format YYYY-MM-DD
    theme: string;
    description: string;
    culture: string[]; // e.g. ["Trinidadian"], ["Jamaican"], ["Guyanese"], or ["All"]
    state: "GA" | "FL";
  }
  
  /* 
    MAIN EVENT (Hero Section)
    This is the featured event that Sunny Island Pepper Sauce will attend.
  */
  export const mainEvent: EventData = {
    id: 0,
    title: "Sunny Island Pepper Sauce Featured Event",
    date: "2025-04-15",
    theme: "Featured - Black Owned Business Support",
    description:
      "Join Sunny Island Pepper Sauce at this exclusive event celebrating Caribbean flavors and supporting black-owned businesses.",
    culture: ["All"],
    state: "FL",
  };
  
  /*
    FEATURED EVENTS (Sponsored Events)
    These three events are specially sponsored.
  */
  export const featuredEvents: EventData[] = [
    {
      id: 1,
      title: "Miami Afro-Caribbean Culinary Expo",
      date: "2025-02-18",
      theme: "Afro-Caribbean Fusion",
      description:
        "An interactive expo in Miami showcasing fusion cuisine from Africa and the Caribbean with chef demonstrations and vendor booths.",
      culture: ["All"],
      state: "FL",
    },
    {
      id: 2,
      title: "Fort Lauderdale Rasta Vibes Food Fest",
      date: "2025-03-10",
      theme: "Reggae & Food",
      description:
        "Enjoy a day of reggae music, art, and Caribbean street food in Fort Lauderdale, complete with interactive vendor booths.",
      culture: ["Jamaican"],
      state: "FL",
    },
    {
      id: 3,
      title: "Orlando Caribbean Block Party",
      date: "2025-03-12",
      theme: "Community Celebration",
      description:
        "A neighborhood block party in Orlando featuring food trucks, live music, and authentic Caribbean cuisine.",
      culture: ["All"],
      state: "FL",
    },
  ];
  
  /*
    GEORGIA EVENTS LIST
  */
    export const gaEvents: EventData[] = [
        {
          id: 0,
          title: "Atlanta Caribbean Food Festival",
          date: "2025-02-15",
          theme: "Caribbean Cuisine",
          description:
            "A vibrant celebration in Atlanta featuring food booths, live music, and cultural performances that spotlight authentic Caribbean dishes.",
          culture: ["All"],
          state: "GA",
        },
        {
          id: 1,
          title: "Savannah Street Food Carnival",
          date: "2025-02-20",
          theme: "Caribbean Street Food",
          description:
            "Enjoy a day of street food vendors and pop-up stalls in Savannah offering traditional Trinidadian, Jamaican, and Guyanese flavors.",
          culture: ["Trinidadian", "Jamaican", "Guyanese"],
          state: "GA",
        },
        {
          id: 2,
          title: "Augusta Island Flavors Festival",
          date: "2025-02-22",
          theme: "Island Cuisine",
          description:
            "A lively event in Augusta featuring on‑site cooking demos, food booths, and live Caribbean music celebrating island tastes.",
          culture: ["All"],
          state: "GA",
        },
        {
          id: 3,
          title: "Columbus Caribbean Cooking Fest",
          date: "2025-02-25",
          theme: "Caribbean Cooking",
          description:
            "A community festival in Columbus with interactive cooking demonstrations and vendors serving time‑honored Caribbean recipes.",
          culture: ["All"],
          state: "GA",
        },
        {
          id: 4,
          title: "Macon Afro-Diaspora Food Fair",
          date: "2025-02-28",
          theme: "African Diaspora Cuisine",
          description:
            "Explore authentic African and Caribbean dishes through local vendors and cultural performances in Macon.",
          culture: ["African Diaspora"],
          state: "GA",
        },
        {
          id: 5,
          title: "Atlanta Jerk & Roti Bash",
          date: "2025-03-02",
          theme: "Jamaican Specialties",
          description:
            "A festive gathering in Atlanta celebrating Jamaican jerk chicken, roti, and patties with live DJ sets and food demos.",
          culture: ["Jamaican"],
          state: "GA",
        },
        {
          id: 6,
          title: "Savannah Soul Food & Spice Fair",
          date: "2025-03-15",
          theme: "Soul Food Fusion",
          description:
            "Experience a fusion of soulful dishes and Caribbean spices at this outdoor fair in Savannah.",
          culture: ["All"],
          state: "GA",
        },
        {
          id: 7,
          title: "Augusta Afro-Caribbean Carnival",
          date: "2025-03-18",
          theme: "Carnival & Cuisine",
          description:
            "A carnival‑themed event in Augusta with parades, food booths, and live performances celebrating Afro‑Caribbean heritage.",
          culture: ["All"],
          state: "GA",
        },
        {
          id: 8,
          title: "Atlanta Taste of Trinidad",
          date: "2025-04-15",
          theme: "Trinidadian Cuisine",
          description:
            "An event in Atlanta focusing on Trinidadian specialties such as doubles, curries, and savory street food.",
          culture: ["Trinidadian"],
          state: "GA",
        },
        {
          id: 9,
          title: "Atlanta Reggae & Roti Rally",
          date: "2025-04-03",
          theme: "Jamaican Favorites",
          description:
            "Celebrate traditional Jamaican roti and live reggae music at this rally held in the heart of Atlanta.",
          culture: ["Jamaican"],
          state: "GA",
        },
        {
          id: 10,
          title: "Columbus Caribbean Heritage Food Fest",
          date: "2025-04-11",
          theme: "Heritage Cuisine",
          description:
            "Celebrate Caribbean heritage in Columbus through time‑honored recipes, storytelling, and interactive food displays.",
          culture: ["All"],
          state: "GA",
        },
        {
          id: 11,
          title: "Macon Afro-Caribbean Market Day",
          date: "2025-04-13",
          theme: "Market Day",
          description:
            "A day‑long market event in Macon featuring food vendors, craft stalls, and live cultural performances.",
          culture: ["All"],
          state: "GA",
        },
        {
          id: 12,
          title: "Atlanta Caribbean Carnival of Flavors",
          date: "2025-04-27",
          theme: "Carnival",
          description:
            "A carnival in Atlanta celebrating a diverse array of Caribbean flavors with parades, costumes, and food stalls.",
          culture: ["All"],
          state: "GA",
        },
        {
          id: 13,
          title: "Savannah Creole Cook-Off",
          date: "2025-05-01",
          theme: "Creole Cuisine",
          description:
            "A competitive cook‑off in Savannah highlighting Creole and Caribbean fusion recipes with local chefs.",
          culture: ["Creole", "Caribbean"],
          state: "GA",
        },
        {
          id: 14,
          title: "Augusta Island Spice Fair",
          date: "2025-05-03",
          theme: "Spice Fair",
          description:
            "An event in Augusta where vendors offer a wide variety of Caribbean spices and specialty prepared dishes.",
          culture: ["All"],
          state: "GA",
        },
        {
          id: 15,
          title: "Columbus Caribbean Street Eats Festival",
          date: "2025-05-05",
          theme: "Street Eats",
          description:
            "Celebrate the vibrant street food culture in Columbus with food trucks serving classic Caribbean fare.",
          culture: ["All"],
          state: "GA",
        },
        {
          id: 16,
          title: "Macon Afro-Fusion Culinary Fest",
          date: "2025-05-07",
          theme: "Afro-Fusion",
          description:
            "A culinary fest in Macon that merges African and Caribbean flavors through live demos and tasting sessions.",
          culture: ["African", "Caribbean"],
          state: "GA",
        },
        {
          id: 17,
          title: "Atlanta Reggae Food Jam",
          date: "2025-05-09",
          theme: "Reggae & Food",
          description:
            "A jam session in Atlanta featuring live reggae music alongside numerous food vendors serving Caribbean dishes.",
          culture: ["Jamaican"],
          state: "GA",
        },
        {
          id: 18,
          title: "Miami Caribbean Flavors Expo",
          date: "2025-05-11",
          theme: "Expo",
          description:
            "An expo in Miami showcasing innovative Caribbean cuisine, culinary techniques, and interactive vendor booths.",
          culture: ["All"],
          state: "GA",
        },
        {
          id: 19,
          title: "Jacksonville Tropical Feast",
          date: "2025-05-13",
          theme: "Tropical Feast",
          description:
            "A feast in Jacksonville featuring tropical Caribbean ingredients, fresh seafood, and traditional recipes.",
          culture: ["All"],
          state: "GA",
        },
        {
            id: 20,
            title: "Tallahassee Caribbean Spice Summit",
            date: "2025-05-15",
            theme: "Spices",
            description:
              "A summit in Tallahassee dedicated to exploring the spices and seasonings that define Caribbean cuisine.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 21,
            title: "Fort Lauderdale Island Grill Festival",
            date: "2025-05-17",
            theme: "Grill & Chill",
            description:
              "An outdoor grill festival in Fort Lauderdale featuring island‑inspired grilled dishes and relaxed vibes.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 22,
            title: "Orlando Afro-Caribbean Food Extravaganza",
            date: "2025-05-19",
            theme: "Extravaganza",
            description:
              "A large‑scale food extravaganza in Orlando with multiple food booths, live demonstrations, and cultural workshops.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 23,
            title: "Atlanta Caribbean Carnival of Flavors",
            date: "2025-05-21",
            theme: "Carnival",
            description:
              "A carnival in Atlanta celebrating a diverse array of Caribbean flavors with parades, costumes, and food stalls.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 24,
            title: "Savannah Creole Cook-Off",
            date: "2025-05-23",
            theme: "Creole Cuisine",
            description:
              "A competitive cook‑off in Savannah highlighting Creole and Caribbean fusion recipes with local chefs.",
            culture: ["Creole", "Caribbean"],
            state: "GA",
          },
          {
            id: 25,
            title: "Augusta Island Spice Fair",
            date: "2025-05-25",
            theme: "Spice Fair",
            description:
              "An event in Augusta where vendors offer a wide variety of Caribbean spices and specialty prepared dishes.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 26,
            title: "Columbus Caribbean Street Eats Festival",
            date: "2025-05-27",
            theme: "Street Eats",
            description:
              "Celebrate the vibrant street food culture in Columbus with food trucks serving classic Caribbean fare.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 27,
            title: "Macon Afro-Fusion Culinary Fest",
            date: "2025-05-29",
            theme: "Afro-Fusion",
            description:
              "A culinary fest in Macon that merges African and Caribbean flavors through live demos and tasting sessions.",
            culture: ["African", "Caribbean"],
            state: "GA",
          },
          {
            id: 28,
            title: "Atlanta Reggae Food Jam",
            date: "2025-06-01",
            theme: "Reggae & Food",
            description:
              "A jam session in Atlanta featuring live reggae music alongside numerous food vendors serving Caribbean dishes.",
            culture: ["Jamaican"],
            state: "GA",
          },
          {
            id: 29,
            title: "Savannah Tropical Culinary Carnival",
            date: "2025-06-03",
            theme: "Tropical Carnival",
            description:
              "A carnival in Savannah featuring tropical ingredients, vibrant Caribbean recipes, and interactive cooking stations.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 30,
            title: "Augusta Afro-Spice Street Fest",
            date: "2025-06-05",
            theme: "Afro-Spice",
            description:
              "A street festival in Augusta celebrating the bold spices of Afro‑Caribbean cuisine with food vendors and cultural performances.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 31,
            title: "Columbus Caribbean Gourmet Fair",
            date: "2025-06-07",
            theme: "Gourmet Fair",
            description:
              "A gourmet fair in Columbus offering high‑end Caribbean cuisine, artisanal products, and curated wine pairings.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 32,
            title: "Macon Island Cuisine Extravaganza",
            date: "2025-06-09",
            theme: "Island Cuisine",
            description:
              "An extravaganza in Macon featuring island‑inspired dishes, fresh seafood, and live cooking demonstrations.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 33,
            title: "Atlanta Caribbean Fusion Fiesta",
            date: "2025-06-11",
            theme: "Fusion Fiesta",
            description:
              "A festive event in Atlanta that merges traditional Caribbean flavors with modern culinary twists and creative presentations.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 34,
            title: "Savannah Tropical Treats Expo",
            date: "2025-06-13",
            theme: "Tropical Treats",
            description:
              "An expo in Savannah showcasing innovative desserts and treats inspired by tropical Caribbean fruits and flavors.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 35,
            title: "Augusta Island Spice Fest",
            date: "2025-06-15",
            theme: "Island Spices",
            description:
              "A festival in Augusta dedicated to the bold and vibrant spices that define Caribbean cuisine.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 36,
            title: "Columbus Jerk & Roti Extravaganza",
            date: "2025-06-17",
            theme: "Jerk & Roti",
            description:
              "Celebrate classic Jamaican jerk and roti dishes with live music, interactive demos, and food booths in Columbus.",
            culture: ["Jamaican"],
            state: "GA",
          },
          {
            id: 37,
            title: "Macon Tropic Food & Music Fest",
            date: "2025-06-19",
            theme: "Tropic Fest",
            description:
              "A combined food and music festival in Macon featuring tropical Caribbean dishes, live bands, and outdoor vendors.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 38,
            title: "Atlanta Afro-Caribbean Culinary Carnival",
            date: "2025-06-21",
            theme: "Culinary Carnival",
            description:
              "A carnival in Atlanta showcasing the diversity of Afro‑Caribbean cuisine with live cooking demonstrations and vendor displays.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 39,
            title: "Savannah Island Heritage Festival",
            date: "2025-06-23",
            theme: "Heritage Festival",
            description:
              "An expo in Savannah highlighting traditional Caribbean recipes, cultural history, and culinary heritage.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 40,
            title: "Augusta Island Vibes Food Fest",
            date: "2025-06-25",
            theme: "Island Vibes",
            description:
              "A vibrant food fest in Augusta featuring authentic island dishes, local vendors, and cultural exhibitions.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 41,
            title: "Columbus Afro-Caribbean Street Festival",
            date: "2025-06-27",
            theme: "Street Festival",
            description:
              "A vibrant festival in Columbus featuring Afro-Caribbean street food, cultural performances, and live music.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 42,
            title: "Macon Reggae & Roti Fest",
            date: "2025-06-29",
            theme: "Reggae & Roti",
            description:
              "Experience a day of reggae beats and traditional Caribbean roti dishes in Macon’s lively outdoor setting.",
            culture: ["Jamaican"],
            state: "GA",
          },
          {
            id: 43,
            title: "Atlanta Island Spice & Jerk Fest",
            date: "2025-07-02",
            theme: "Jerk & Spices",
            description:
              "A celebration of the bold flavors of Caribbean jerk and spices, featuring food vendors and interactive demos.",
            culture: ["Jamaican", "Caribbean"],
            state: "GA",
          },
          {
            id: 44,
            title: "Savannah Tropical Taste Carnival",
            date: "2025-07-05",
            theme: "Tropical Cuisine",
            description:
              "A lively carnival in Savannah celebrating tropical Caribbean ingredients with food vendors and cultural showcases.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 45,
            title: "Augusta Afro-Caribbean Tasting Tour",
            date: "2025-07-08",
            theme: "Tasting Tour",
            description:
              "Join a guided tasting tour in Augusta featuring various Caribbean and African-inspired dishes from local vendors.",
            culture: ["African", "Caribbean"],
            state: "GA",
          },
          {
            id: 46,
            title: "Columbus Caribbean Seafood Festival",
            date: "2025-07-11",
            theme: "Seafood",
            description:
              "A seafood festival in Columbus showcasing fresh, Caribbean-inspired seafood dishes from top chefs.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 47,
            title: "Macon Jerk Chicken & Curry Cook-Off",
            date: "2025-07-14",
            theme: "Jerk & Curry",
            description:
              "A cook-off competition in Macon featuring the best jerk chicken and Caribbean curries in the region.",
            culture: ["Jamaican", "Trinidadian"],
            state: "GA",
          },
          {
            id: 48,
            title: "Atlanta Afro-Diaspora Cultural Food Fest",
            date: "2025-07-17",
            theme: "Cultural Food Fest",
            description:
              "An immersive cultural experience in Atlanta celebrating the diverse culinary traditions of the African diaspora.",
            culture: ["African Diaspora"],
            state: "GA",
          },
          {
            id: 49,
            title: "Savannah Island Fusion Cuisine Fair",
            date: "2025-07-20",
            theme: "Fusion Cuisine",
            description:
              "A culinary fair in Savannah featuring fusion dishes that blend Caribbean, African, and Southern flavors.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 50,
            title: "Augusta Reggae & Caribbean Street Eats",
            date: "2025-07-23",
            theme: "Reggae & Street Food",
            description:
              "A reggae-themed festival in Augusta with live music, Caribbean street food, and interactive cooking demos.",
            culture: ["Jamaican"],
            state: "GA",
          },
          {
            id: 51,
            title: "Columbus Afro-Caribbean Market & Food Fest",
            date: "2025-07-26",
            theme: "Market & Food",
            description:
              "A community market and food festival in Columbus celebrating Afro-Caribbean cuisine, crafts, and culture.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 52,
            title: "Macon Creole & Caribbean Culinary Fest",
            date: "2025-07-29",
            theme: "Creole & Caribbean",
            description:
              "A festival in Macon celebrating Creole and Caribbean dishes, featuring top chefs and local vendors.",
            culture: ["Creole", "Caribbean"],
            state: "GA",
          },
          {
            id: 53,
            title: "Atlanta Jerk & Reggae Music Bash",
            date: "2025-08-01",
            theme: "Jerk & Reggae",
            description:
              "A festival in Atlanta featuring the best jerk dishes, reggae performances, and Caribbean-themed activities.",
            culture: ["Jamaican"],
            state: "GA",
          },
          {
            id: 54,
            title: "Savannah Afro-Caribbean Soul Food Fest",
            date: "2025-08-04",
            theme: "Soul Food Fusion",
            description:
              "A soulful celebration of Caribbean and African-American flavors with local chefs, tastings, and cultural displays.",
            culture: ["African Diaspora"],
            state: "GA",
          },
          {
            id: 55,
            title: "Augusta Caribbean Culture Carnival",
            date: "2025-08-07",
            theme: "Culture & Food",
            description:
              "A cultural carnival in Augusta showcasing Caribbean history, music, and cuisine through a series of events.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 56,
            title: "Columbus Taste of the Islands Fest",
            date: "2025-08-10",
            theme: "Taste of the Islands",
            description:
              "An island-themed food festival in Columbus highlighting dishes from Jamaica, Trinidad, and the Bahamas.",
            culture: ["Jamaican", "Trinidadian", "Bahamian"],
            state: "GA",
          },
          {
            id: 57,
            title: "Macon Jerk & Curry Food Rally",
            date: "2025-08-13",
            theme: "Jerk & Curry",
            description:
              "A food rally in Macon celebrating jerk chicken, curries, and Caribbean street food culture.",
            culture: ["Jamaican", "Trinidadian"],
            state: "GA",
          },
          {
            id: 58,
            title: "Atlanta Island Street Food Showcase",
            date: "2025-08-16",
            theme: "Street Food",
            description:
              "A street food showcase in Atlanta featuring authentic Caribbean dishes served by food trucks and pop-up vendors.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 59,
            title: "Savannah Caribbean Grill & Chill Festival",
            date: "2025-08-19",
            theme: "Grill & Chill",
            description:
              "An outdoor event in Savannah featuring Caribbean barbecue, grilled seafood, and laid-back island vibes.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 60,
            title: "Augusta Reggae & Roti Fiesta",
            date: "2025-08-22",
            theme: "Reggae & Roti",
            description:
              "A fun-filled day in Augusta celebrating Caribbean roti dishes, reggae music, and cultural showcases.",
            culture: ["Jamaican"],
            state: "GA",
          },
          {
            id: 61,
            title: "Columbus Tropical Food & Music Festival",
            date: "2025-08-25",
            theme: "Tropical Fest",
            description:
              "A festival in Columbus celebrating tropical Caribbean dishes with live bands and cultural performances.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 62,
            title: "Macon Afro-Caribbean Cook-Off",
            date: "2025-08-28",
            theme: "Cook-Off",
            description:
              "A competitive cook-off in Macon featuring the best Afro-Caribbean chefs and traditional recipes.",
            culture: ["African Diaspora", "Caribbean"],
            state: "GA",
          },
          {
            id: 63,
            title: "Atlanta Jerk & Island Bites Festival",
            date: "2025-08-31",
            theme: "Jerk & Island Bites",
            description:
              "A festival in Atlanta showcasing authentic jerk dishes and island-inspired street food.",
            culture: ["Jamaican", "Caribbean"],
            state: "GA",
          },
          {
            id: 64,
            title: "Savannah Creole & Caribbean Flavor Fair",
            date: "2025-09-03",
            theme: "Creole & Caribbean",
            description:
              "A fair in Savannah featuring Creole and Caribbean fusion cuisine with tastings and food contests.",
            culture: ["Creole", "Caribbean"],
            state: "GA",
          },
          {
            id: 65,
            title: "Augusta Heritage Food & Music Fest",
            date: "2025-09-06",
            theme: "Heritage Festival",
            description:
              "A festival in Augusta celebrating Caribbean and African heritage through food, music, and cultural exhibitions.",
            culture: ["African Diaspora", "Caribbean"],
            state: "GA",
          },
          {
            id: 66,
            title: "Columbus Island Vibes Food Fair",
            date: "2025-09-09",
            theme: "Island Vibes",
            description:
              "A relaxing food fair in Columbus featuring authentic Caribbean dishes, local vendors, and laid-back island music.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 67,
            title: "Macon Reggae Roti & Rum Festival",
            date: "2025-09-12",
            theme: "Reggae & Roti",
            description:
              "An event in Macon featuring traditional Caribbean roti, rum tastings, and live reggae music.",
            culture: ["Jamaican"],
            state: "GA",
          },
          {
            id: 68,
            title: "Atlanta Tropical Tasting Carnival",
            date: "2025-09-15",
            theme: "Tropical Treats",
            description:
              "A tasting event in Atlanta showcasing Caribbean tropical desserts and fresh fruit-inspired dishes.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 69,
            title: "Savannah Caribbean Seafood & Spice Festival",
            date: "2025-09-18",
            theme: "Seafood & Spice",
            description:
              "A seafood and spice-themed festival in Savannah featuring Caribbean grilled seafood and signature spice blends.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 70,
            title: "Augusta Afro-Caribbean Gourmet Gathering",
            date: "2025-09-21",
            theme: "Gourmet Cuisine",
            description:
              "An upscale gathering in Augusta showcasing refined Afro-Caribbean cuisine, chef panels, and exclusive tastings.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 71,
            title: "Columbus Island Fusion Tasting Tour",
            date: "2025-09-24",
            theme: "Fusion Cuisine",
            description:
              "A guided tasting tour in Columbus featuring vendors blending Caribbean and African flavors into creative fusion dishes.",
            culture: ["African Diaspora", "Caribbean"],
            state: "GA",
          },
          {
            id: 72,
            title: "Macon Tropic Heritage Food Fest",
            date: "2025-09-27",
            theme: "Heritage Food",
            description:
              "A food festival in Macon highlighting traditional Caribbean and African dishes passed down through generations.",
            culture: ["African Diaspora", "Caribbean"],
            state: "GA",
          },
          {
            id: 73,
            title: "Atlanta Reggae Grill & Chill Bash",
            date: "2025-09-30",
            theme: "Reggae & Grill",
            description:
              "An outdoor reggae and grill bash in Atlanta featuring authentic grilled Caribbean meats, seafood, and music.",
            culture: ["Jamaican"],
            state: "GA",
          },
          {
            id: 74,
            title: "Savannah Taste of the Caribbean Festival",
            date: "2025-10-03",
            theme: "Taste of the Caribbean",
            description:
              "A festival in Savannah showcasing Caribbean favorites like jerk, curry, and island-style seafood.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 75,
            title: "Augusta Jerk, Curry & Rum Expo",
            date: "2025-10-06",
            theme: "Jerk, Curry & Rum",
            description:
              "A specialty expo in Augusta featuring top Caribbean chefs preparing jerk, curry dishes, and curated rum tastings.",
            culture: ["Jamaican", "Caribbean"],
            state: "GA",
          },
          {
            id: 76,
            title: "Columbus Afro-Caribbean Cultural Food Fair",
            date: "2025-10-09",
            theme: "Cultural Food Fair",
            description:
              "A cultural food fair in Columbus featuring local vendors and live Caribbean and African performances.",
            culture: ["African Diaspora", "Caribbean"],
            state: "GA",
          },
          {
            id: 77,
            title: "Macon Island Grill Festival",
            date: "2025-10-12",
            theme: "Island Grill",
            description:
              "A festival in Macon showcasing Caribbean-style grilling techniques with traditional island flavors.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 78,
            title: "Atlanta Roti & Reggae Rally",
            date: "2025-10-15",
            theme: "Roti & Reggae",
            description:
              "A reggae-themed rally in Atlanta featuring traditional roti vendors and Caribbean street food.",
            culture: ["Jamaican", "Trinidadian"],
            state: "GA",
          },
          {
            id: 79,
            title: "Savannah Afro-Caribbean Heritage Cookout",
            date: "2025-10-18",
            theme: "Heritage Cookout",
            description:
              "A cookout in Savannah celebrating the rich culinary traditions of the African and Caribbean diaspora.",
            culture: ["African Diaspora", "Caribbean"],
            state: "GA",
          },
          {
            id: 80,
            title: "Augusta Caribbean Dessert & Coffee Fest",
            date: "2025-10-21",
            theme: "Desserts & Coffee",
            description:
              "A festival in Augusta showcasing Caribbean desserts, pastries, and coffee specialties.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 81,
            title: "Columbus Tropic Flavor Cook-Off",
            date: "2025-10-24",
            theme: "Tropical Cook-Off",
            description:
              "A cook-off competition in Columbus featuring tropical Caribbean ingredients and bold island flavors.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 82,
            title: "Macon Caribbean BBQ & Beach Bash",
            date: "2025-10-27",
            theme: "BBQ & Beach Vibes",
            description:
              "A laid-back beach-inspired BBQ festival in Macon featuring grilled Caribbean cuisine and live island music.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 83,
            title: "Atlanta Afro-Caribbean Cuisine & Wine Pairing",
            date: "2025-10-30",
            theme: "Fine Dining & Wine",
            description:
              "A fine dining event in Atlanta pairing Afro-Caribbean dishes with expertly curated wines.",
            culture: ["African Diaspora", "Caribbean"],
            state: "GA",
          },
          {
            id: 84,
            title: "Savannah Island Food Truck Festival",
            date: "2025-11-02",
            theme: "Food Truck Fest",
            description:
              "A festival in Savannah featuring the best Caribbean food trucks serving island specialties.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 85,
            title: "Augusta Caribbean Hot Pepper & Spice Fest",
            date: "2025-11-05",
            theme: "Hot Peppers & Spices",
            description:
              "A festival in Augusta celebrating the bold and spicy flavors of Caribbean cuisine, featuring pepper-eating contests and spice vendors.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 86,
            title: "Columbus Afro-Caribbean Street Food Fair",
            date: "2025-11-08",
            theme: "Street Food",
            description:
              "A street food fair in Columbus featuring authentic Caribbean dishes such as doubles, patties, and jerk chicken.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 87,
            title: "Macon Caribbean Seafood & Rum Festival",
            date: "2025-11-11",
            theme: "Seafood & Rum",
            description:
              "An event in Macon dedicated to Caribbean seafood dishes and exclusive rum tastings from top distillers.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 88,
            title: "Atlanta Reggae & Jerk Festival",
            date: "2025-11-14",
            theme: "Reggae & Jerk",
            description:
              "A festival in Atlanta celebrating Jamaica’s finest jerk dishes with live reggae performances and cultural showcases.",
            culture: ["Jamaican"],
            state: "GA",
          },
          {
            id: 89,
            title: "Savannah Afro-Fusion Culinary Carnival",
            date: "2025-11-17",
            theme: "Afro-Fusion",
            description:
              "A culinary carnival in Savannah merging African and Caribbean flavors through fusion dishes, tastings, and live music.",
            culture: ["African Diaspora", "Caribbean"],
            state: "GA",
          },
          {
            id: 90,
            title: "Augusta Roti & Doubles Festival",
            date: "2025-11-20",
            theme: "Roti & Doubles",
            description:
              "A festival in Augusta showcasing the best roti, doubles, and other Trinidadian delicacies.",
            culture: ["Trinidadian"],
            state: "GA",
          },
          {
            id: 91,
            title: "Columbus Island Soul Fest",
            date: "2025-11-23",
            theme: "Soul Food Fusion",
            description:
              "A festival in Columbus blending Caribbean and Southern soul food traditions into one delicious experience.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 92,
            title: "Macon Tropical Brunch & Bottomless Mimosas",
            date: "2025-11-26",
            theme: "Brunch & Drinks",
            description:
              "A brunch event in Macon featuring Caribbean-inspired brunch favorites and unlimited tropical mimosas.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 93,
            title: "Atlanta Island Grill-Off",
            date: "2025-11-29",
            theme: "Grill-Off",
            description:
              "A Caribbean-style BBQ grill-off competition in Atlanta featuring jerk, curry goat, and smoked seafood.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 94,
            title: "Savannah Tiki Rum & Caribbean Bites Festival",
            date: "2025-12-02",
            theme: "Rum & Bites",
            description:
              "A festival in Savannah featuring Caribbean-inspired tiki drinks, craft rum tastings, and delicious island appetizers.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 95,
            title: "Augusta Sweet Treats & Cocoa Carnival",
            date: "2025-12-05",
            theme: "Desserts & Cocoa",
            description:
              "A sweet-themed carnival in Augusta highlighting Caribbean desserts, tropical chocolates, and festive drinks.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 96,
            title: "Columbus Holiday Caribbean Market",
            date: "2025-12-08",
            theme: "Holiday Market",
            description:
              "A festive holiday market in Columbus featuring Caribbean baked goods, handcrafted gifts, and holiday treats.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 97,
            title: "Macon Christmas in the Islands",
            date: "2025-12-11",
            theme: "Christmas Festival",
            description:
              "A holiday festival in Macon celebrating Caribbean Christmas traditions with traditional food, parang music, and festive cheer.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 98,
            title: "Atlanta New Year's Eve Caribbean Bash",
            date: "2025-12-31",
            theme: "New Year's Bash",
            description:
              "Ring in the new year at this Caribbean-themed party in Atlanta, featuring tropical cocktails, music, and festive dishes.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 99,
            title: "Savannah Caribbean New Year’s Brunch",
            date: "2026-01-01",
            theme: "New Year’s Brunch",
            description:
              "Start the new year with a special Caribbean brunch in Savannah featuring fresh seafood, tropical mimosas, and island specialties.",
            culture: ["All"],
            state: "GA",
          },
          {
            id: 100,
            title: "Augusta Tropical Winter Escape Festival",
            date: "2026-01-05",
            theme: "Winter Escape",
            description:
              "A winter escape festival in Augusta featuring warm tropical dishes, hot rum punch, and festive Caribbean performances.",
            culture: ["All"],
            state: "GA",
          }
          
      ];
      
  
      export const flEvents: EventData[] = [
        {
          id: 101,
          title: "Miami Afro-Caribbean Culinary Expo",
          date: "2025-02-18",
          theme: "Afro-Caribbean Fusion",
          description:
            "An interactive expo in Miami showcasing fusion cuisine from Africa and the Caribbean with chef demonstrations and vendor booths.",
          culture: ["All"],
          state: "FL",
        },
        {
          id: 102,
          title: "Miami Island Bites Fiesta",
          date: "2025-03-04",
          theme: "Island Bites",
          description:
            "Savor bite‑sized Caribbean treats from top food vendors at a relaxed outdoor fiesta in Miami.",
          culture: ["All"],
          state: "FL",
        },
        {
          id: 103,
          title: "Jacksonville Caribbean Gourmet Gala",
          date: "2025-03-06",
          theme: "Gourmet Caribbean",
          description:
            "An upscale gala in Jacksonville featuring gourmet Caribbean dishes, curated tastings, and chef panel discussions.",
          culture: ["All"],
          state: "FL",
        },
        {
          id: 104,
          title: "Tallahassee Tropical Taste Expo",
          date: "2025-03-08",
          theme: "Tropical Cuisine",
          description:
            "A tropical expo in Tallahassee showcasing fresh, vibrant Caribbean flavors with innovative food booths and live demos.",
          culture: ["All"],
          state: "FL",
        },
        {
          id: 105,
          title: "Fort Lauderdale Rasta Vibes Food Fest",
          date: "2025-03-10",
          theme: "Reggae & Food",
          description:
            "Enjoy a day of reggae music, art, and Caribbean street food in Fort Lauderdale, complete with interactive vendor booths.",
          culture: ["Jamaican"],
          state: "FL",
        },
        {
          id: 106,
          title: "Orlando Caribbean Block Party",
          date: "2025-03-12",
          theme: "Community Celebration",
          description:
            "A neighborhood block party in Orlando featuring food trucks, live music, and authentic Caribbean cuisine.",
          culture: ["All"],
          state: "FL",
        },
        {
          id: 107,
          title: "Miami Mango & More Food Fest",
          date: "2025-03-22",
          theme: "Tropical Fruits & Cuisine",
          description:
            "Celebrate the bounty of tropical fruits with Caribbean-inspired dishes and refreshing drinks in Miami.",
          culture: ["All"],
          state: "FL",
        },
        {
          id: 108,
          title: "Jacksonville Island Flavors Fair",
          date: "2025-03-25",
          theme: "Island Flavors",
          description:
            "A local fair in Jacksonville highlighting island recipes, fresh seafood, and traditional Caribbean cooking techniques.",
          culture: ["All"],
          state: "FL",
        },
        {
          id: 109,
          title: "Tallahassee Caribbean Comfort Food Festival",
          date: "2025-03-28",
          theme: "Comfort Food",
          description:
            "Enjoy hearty Caribbean comfort foods and family recipes at this festival held in Tallahassee.",
          culture: ["All"],
          state: "FL",
        },
        {
          id: 110,
          title: "Fort Lauderdale Caribbean BBQ Bonanza",
          date: "2025-03-30",
          theme: "BBQ",
          description:
            "A barbecue festival in Fort Lauderdale featuring Caribbean‑style grilled meats, sides, and a festive outdoor atmosphere.",
          culture: ["All"],
          state: "FL",
        },
        {
          id: 111,
          title: "Orlando Afro-Fusion Food Carnival",
          date: "2025-04-01",
          theme: "Afro‑Fusion Cuisine",
          description:
            "A carnival in Orlando that blends African and Caribbean culinary traditions with interactive workshops and food booths.",
          culture: ["All"],
          state: "FL",
        },
        {
          id: 112,
          title: "Miami Tropical Tasting Tour",
          date: "2025-04-05",
          theme: "Tropical Tasting",
          description:
            "Join a guided tour in Miami featuring stops at several food booths serving innovative tropical Caribbean dishes.",
          culture: ["All"],
          state: "FL",
        },
        {
          id: 113,
          title: "Savannah Caribbean Culinary Carnival",
          date: "2025-04-07",
          theme: "Culinary Carnival",
          description:
            "A festive carnival in Savannah with culinary contests, live cooking stations, and plenty of Caribbean flavors.",
          culture: ["All"],
          state: "FL",
        },
        {
          id: 114,
          title: "Miami Caribbean Seafood Showcase",
          date: "2025-04-17",
          theme: "Seafood",
          description:
            "Enjoy a seafood showcase in Miami where top vendors serve up fresh, Caribbean‑inspired seafood dishes.",
          culture: ["All"],
          state: "FL",
        },
        {
          id: 115,
          title: "Jacksonville Jerk Chicken Jam",
          date: "2025-04-19",
          theme: "Jerk Chicken",
          description:
            "A lively jam session in Jacksonville celebrating Jamaican jerk chicken with vibrant music and food vendors.",
          culture: ["Jamaican"],
          state: "FL",
        },
        {
          id: 116,
          title: "Tallahassee Caribbean Spice Summit",
          date: "2025-04-21",
          theme: "Spices",
          description:
            "A summit in Tallahassee dedicated to exploring the spices and seasonings that define Caribbean cuisine.",
          culture: ["All"],
          state: "FL",
        },
        {
          id: 117,
          title: "Fort Lauderdale Island Grill Festival",
          date: "2025-04-23",
          theme: "Grill & Chill",
          description:
            "An outdoor grill festival in Fort Lauderdale featuring island‑inspired grilled dishes and relaxed vibes.",
          culture: ["All"],
          state: "FL",
        },
        {
          id: 118,
          title: "Orlando Afro-Caribbean Food Extravaganza",
          date: "2025-04-25",
          theme: "Extravaganza",
          description:
            "A large‑scale food extravaganza in Orlando with multiple food booths, live demonstrations, and cultural workshops.",
          culture: ["All"],
          state: "FL",
        },
        {
          id: 119,
          title: "Miami Tropic Taste Fiesta",
          date: "2025-04-29",
          theme: "Fiesta",
          description:
            "A festive food fiesta in Miami featuring tropical ingredients and innovative Caribbean dishes.",
          culture: ["All"],
          state: "FL",
        },
        {
          id: 120,
          title: "Jacksonville Tropical Feast",
          date: "2025-05-13",
          theme: "Tropical Feast",
          description:
            "A feast in Jacksonville featuring tropical Caribbean ingredients, fresh seafood, and traditional recipes.",
          culture: ["All"],
          state: "FL",
        },
        {
          id: 121,
          title: "Tallahassee Island Eats & Beats",
          date: "2025-05-15",
          theme: "Beats & Eats",
          description:
            "A lively event in Tallahassee pairing island‑inspired dishes with live Caribbean drumming and dance.",
          culture: ["All"],
          state: "FL",
        },
        {
          id: 122,
          title: "Fort Lauderdale Caribbean Food Carnival",
          date: "2025-05-17",
          theme: "Food Carnival",
          description:
            "A carnival in Fort Lauderdale celebrating Caribbean food culture with interactive booths, contests, and music.",
          culture: ["All"],
          state: "FL",
        },
        {
          id: 123,
          title: "Orlando Island Flavor Fiesta",
          date: "2025-05-19",
          theme: "Flavor Fiesta",
          description:
            "A festive event in Orlando featuring creative island flavors, cooking contests, and live performances.",
          culture: ["All"],
          state: "FL",
        },
        {
          id: 124,
          title: "Miami Afro-Caribbean Gourmet Gathering",
          date: "2025-05-23",
          theme: "Gourmet Gathering",
          description:
            "An upscale gathering in Miami offering refined Caribbean dishes, chef collaborations, and wine pairings.",
          culture: ["All"],
          state: "FL",
        },
        {
          id: 125,
          title: "Tampa Caribbean Seafood & Rum Festival",
          date: "2025-06-10",
          theme: "Seafood & Rum",
          description:
            "A Caribbean seafood and rum festival in Tampa featuring fresh seafood, premium rum tastings, and live island music.",
          culture: ["All"],
          state: "FL",
        },
        {
            id: 126,
            title: "Jacksonville Island BBQ & Spice Fest",
            date: "2025-06-12",
            theme: "BBQ & Spices",
            description:
              "A festival in Jacksonville dedicated to the art of Caribbean BBQ and bold spice blends with live cooking demos.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 127,
            title: "Tallahassee Afro-Caribbean Market Day",
            date: "2025-06-14",
            theme: "Market Day",
            description:
              "A full-day market event in Tallahassee featuring vendors selling authentic Afro-Caribbean dishes, spices, and cultural crafts.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 128,
            title: "Fort Lauderdale Reggae Roti & Grill Bash",
            date: "2025-06-16",
            theme: "Reggae & Grill",
            description:
              "Enjoy a festive day of reggae music, grilled Caribbean specialties, and traditional roti dishes.",
            culture: ["Jamaican"],
            state: "FL",
          },
          {
            id: 129,
            title: "Orlando Caribbean Beachside Feast",
            date: "2025-06-18",
            theme: "Beachside Feast",
            description:
              "A relaxing beachside festival in Orlando with fresh seafood, grilled Caribbean meats, and tropical cocktails.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 130,
            title: "Miami Tropical Treats Carnival",
            date: "2025-06-20",
            theme: "Tropical Treats",
            description:
              "A carnival in Miami featuring sweet and savory tropical Caribbean treats, exotic fruit vendors, and island music.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 131,
            title: "Jacksonville Caribbean Heritage Cook-Off",
            date: "2025-06-22",
            theme: "Heritage Cook-Off",
            description:
              "A cook-off in Jacksonville celebrating generational Caribbean recipes and traditional cooking methods.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 132,
            title: "Tallahassee Island Flavors Expo",
            date: "2025-06-24",
            theme: "Island Flavors",
            description:
              "An expo in Tallahassee showcasing a variety of island-inspired Caribbean dishes and fresh tropical ingredients.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 133,
            title: "Fort Lauderdale Afro-Caribbean Fusion Fest",
            date: "2025-06-26",
            theme: "Fusion Cuisine",
            description:
              "A festival celebrating the intersection of African and Caribbean flavors through creative fusion dishes.",
            culture: ["African", "Caribbean"],
            state: "FL",
          },
          {
            id: 134,
            title: "Orlando Jerk & Curry Festival",
            date: "2025-06-28",
            theme: "Jerk & Curry",
            description:
              "A festival in Orlando dedicated to the bold flavors of jerk seasoning and rich Caribbean curries.",
            culture: ["Jamaican", "Trinidadian"],
            state: "FL",
          },
          {
            id: 135,
            title: "Miami Rum & Island Bites Gala",
            date: "2025-06-30",
            theme: "Rum & Bites",
            description:
              "An upscale gala in Miami featuring premium Caribbean rums paired with small-plate island-inspired bites.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 136,
            title: "Jacksonville Tropic Taste Tour",
            date: "2025-07-02",
            theme: "Tropical Tasting",
            description:
              "Join a guided tour through Jacksonville's best tropical and Caribbean food vendors.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 137,
            title: "Tallahassee Caribbean Seafood & Spice Carnival",
            date: "2025-07-04",
            theme: "Seafood & Spice",
            description:
              "A carnival in Tallahassee that highlights Caribbean seafood specialties infused with bold spices.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 138,
            title: "Fort Lauderdale Island Gourmet Gala",
            date: "2025-07-06",
            theme: "Gourmet Island Cuisine",
            description:
              "An exclusive gala in Fort Lauderdale featuring high-end Caribbean cuisine with curated tastings and chef panels.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 139,
            title: "Orlando Reggae Roti & Rum Rally",
            date: "2025-07-08",
            theme: "Reggae & Food",
            description:
              "A lively event in Orlando featuring traditional roti dishes, rum tastings, and reggae music performances.",
            culture: ["Jamaican"],
            state: "FL",
          },
          {
            id: 140,
            title: "Miami Afro-Caribbean Food & Art Fest",
            date: "2025-07-10",
            theme: "Food & Art",
            description:
              "A festival in Miami celebrating Afro-Caribbean food, art installations, and live cultural performances.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 141,
            title: "Jacksonville Island Eats Street Fair",
            date: "2025-07-12",
            theme: "Street Food Fair",
            description:
              "A street fair in Jacksonville featuring an array of Caribbean street food vendors and live music.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 142,
            title: "Tallahassee Caribbean Tasting Tour",
            date: "2025-07-14",
            theme: "Tasting Tour",
            description:
              "A food tour through Tallahassee, stopping at key Caribbean eateries and specialty vendors.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 143,
            title: "Fort Lauderdale Afro-Caribbean Beach Bash",
            date: "2025-07-16",
            theme: "Beach Bash",
            description:
              "A beach party featuring Caribbean food, tropical drinks, and Afro-Caribbean music performances.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 144,
            title: "Orlando Tropic Bites & Beats Festival",
            date: "2025-07-18",
            theme: "Food & Music",
            description:
              "A festival combining live Caribbean music performances with an eclectic selection of island-inspired street food.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 145,
            title: "Miami Reggae & Roti Extravaganza",
            date: "2025-07-20",
            theme: "Reggae & Food",
            description:
              "A vibrant food and music event in Miami dedicated to traditional roti dishes and reggae vibes.",
            culture: ["Jamaican"],
            state: "FL",
          },
          {
            id: 146,
            title: "Jacksonville Caribbean Culinary Showcase",
            date: "2025-07-22",
            theme: "Culinary Showcase",
            description:
              "A showcase in Jacksonville featuring top Caribbean chefs, food workshops, and exclusive tastings.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 147,
            title: "Tallahassee Island Spices & Fusion Fest",
            date: "2025-07-24",
            theme: "Spices & Fusion",
            description:
              "An exploration of Caribbean spices and fusion cuisine with live cooking demos and tasting booths.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 148,
            title: "Fort Lauderdale Tropic Fusion Carnival",
            date: "2025-07-26",
            theme: "Fusion Carnival",
            description:
              "A carnival in Fort Lauderdale merging traditional Caribbean dishes with modern fusion twists.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 149,
            title: "Orlando Afro-Caribbean Culinary Fest",
            date: "2025-07-28",
            theme: "Culinary Fest",
            description:
              "A culinary festival in Orlando highlighting authentic Afro-Caribbean flavors through cooking competitions and vendor booths.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 150,
            title: "Miami Tropical Gourmet Festival",
            date: "2025-07-30",
            theme: "Gourmet Caribbean",
            description:
              "A high-end gourmet festival in Miami featuring top Caribbean chefs, premium seafood, and exclusive tasting experiences.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 151,
            title: "Jacksonville Island Breeze & Bites Bash",
            date: "2025-08-01",
            theme: "Island Breeze & Bites",
            description:
              "A laid-back beachside event in Jacksonville featuring Caribbean tapas, tropical drinks, and live steel drum performances.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 152,
            title: "Tallahassee Caribbean Comfort Cook-Off",
            date: "2025-08-03",
            theme: "Comfort Cook-Off",
            description:
              "A cook-off competition in Tallahassee featuring home-cooked Caribbean comfort foods judged by local chefs and food critics.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 153,
            title: "Fort Lauderdale Tropic Seafood & Spice Festival",
            date: "2025-08-05",
            theme: "Seafood & Spice",
            description:
              "A festival in Fort Lauderdale featuring fresh Caribbean seafood dishes paired with bold spice blends.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 154,
            title: "Orlando Afro-Caribbean Flavors Expo",
            date: "2025-08-07",
            theme: "Afro-Caribbean Flavors",
            description:
              "An expo in Orlando showcasing Afro-Caribbean flavors through cooking workshops, tastings, and cultural performances.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 155,
            title: "Miami Rum & Reggae Food Bash",
            date: "2025-08-09",
            theme: "Rum & Reggae",
            description:
              "A vibrant food and music event featuring top Caribbean rum brands paired with delicious island cuisine.",
            culture: ["Jamaican", "All"],
            state: "FL",
          },
          {
            id: 156,
            title: "Jacksonville Jerk & Seafood Fiesta",
            date: "2025-08-11",
            theme: "Jerk & Seafood",
            description:
              "A fiesta in Jacksonville featuring authentic Jamaican jerk meats and fresh Caribbean seafood.",
            culture: ["Jamaican", "All"],
            state: "FL",
          },
          {
            id: 157,
            title: "Tallahassee Island Street Eats Festival",
            date: "2025-08-13",
            theme: "Street Eats",
            description:
              "A festival in Tallahassee dedicated to Caribbean street food, featuring local vendors and specialty pop-up stalls.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 158,
            title: "Fort Lauderdale Tropical Fruits & Treats Festival",
            date: "2025-08-15",
            theme: "Fruits & Treats",
            description:
              "An event celebrating Caribbean tropical fruits and sweets, including fresh juices, smoothies, and island desserts.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 159,
            title: "Orlando Reggae & Roti Roundup",
            date: "2025-08-17",
            theme: "Reggae & Roti",
            description:
              "A relaxed event in Orlando combining delicious Caribbean roti with live reggae music performances.",
            culture: ["Jamaican", "Trinidadian"],
            state: "FL",
          },
          {
            id: 160,
            title: "Miami Afro-Caribbean Culinary Carnival",
            date: "2025-08-19",
            theme: "Culinary Carnival",
            description:
              "A large-scale culinary carnival in Miami celebrating the diversity of Afro-Caribbean cuisine with food trucks and live demos.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 161,
            title: "Jacksonville Island Grill Festival",
            date: "2025-08-21",
            theme: "Island Grill",
            description:
              "A food festival in Jacksonville focused on Caribbean grilled meats, seafood, and traditional jerk flavors.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 162,
            title: "Tallahassee Afro-Caribbean Tasting Tour",
            date: "2025-08-23",
            theme: "Tasting Tour",
            description:
              "A curated tasting tour in Tallahassee featuring a variety of Afro-Caribbean restaurants and food vendors.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 163,
            title: "Fort Lauderdale Tropic Taste Fest",
            date: "2025-08-25",
            theme: "Tropical Tasting",
            description:
              "A festival in Fort Lauderdale celebrating tropical Caribbean flavors with food stalls, craft drinks, and live entertainment.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 164,
            title: "Orlando Island Vibes & Flavors Carnival",
            date: "2025-08-27",
            theme: "Island Vibes",
            description:
              "A carnival in Orlando blending Caribbean flavors, live music, and cultural performances.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 165,
            title: "Miami Reggae Roti & Grill Fest",
            date: "2025-08-29",
            theme: "Reggae & Grill",
            description:
              "A festival in Miami featuring delicious Caribbean roti, grilled meats, and live reggae performances.",
            culture: ["Jamaican", "Trinidadian"],
            state: "FL",
          },
          {
            id: 166,
            title: "Jacksonville Caribbean Bites & Beats",
            date: "2025-08-31",
            theme: "Bites & Beats",
            description:
              "A fun event in Jacksonville combining bite-sized Caribbean treats with live beats from top DJs.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 167,
            title: "Tallahassee Island Feast Festival",
            date: "2025-09-02",
            theme: "Island Feast",
            description:
              "A festival in Tallahassee celebrating communal Caribbean feasting traditions with authentic island dishes.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 168,
            title: "Fort Lauderdale Afro-Caribbean Gourmet Experience",
            date: "2025-09-04",
            theme: "Gourmet Experience",
            description:
              "An upscale dining experience in Fort Lauderdale featuring Afro-Caribbean gourmet cuisine.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 169,
            title: "Orlando Tropical BBQ & Rum Festival",
            date: "2025-09-06",
            theme: "BBQ & Rum",
            description:
              "A festival in Orlando featuring grilled Caribbean BBQ specialties and premium rum tastings.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 170,
            title: "Miami Island Tasting Tour",
            date: "2025-09-08",
            theme: "Tasting Tour",
            description:
              "A guided tasting tour in Miami, exploring diverse Caribbean flavors and local food vendors.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 171,
            title: "Jacksonville Tropical Bites Bash",
            date: "2025-09-10",
            theme: "Tropical Bites",
            description:
              "A lively event in Jacksonville featuring bite-sized Caribbean dishes, refreshing tropical drinks, and island beats.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 172,
            title: "Tallahassee Caribbean Comfort Cuisine Carnival",
            date: "2025-09-12",
            theme: "Comfort Cuisine",
            description:
              "A carnival in Tallahassee dedicated to hearty Caribbean comfort foods, with cooking competitions and live music.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 173,
            title: "Fort Lauderdale Island Fusion Fair",
            date: "2025-09-14",
            theme: "Island Fusion",
            description:
              "A fusion fair in Fort Lauderdale where Caribbean flavors meet innovative culinary techniques.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 174,
            title: "Orlando Afro-Caribbean Tasting Trail",
            date: "2025-09-16",
            theme: "Tasting Trail",
            description:
              "A guided tasting event in Orlando showcasing Afro-Caribbean flavors at select restaurants and food vendors.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 175,
            title: "Miami Reggae Roti & Rum Fest",
            date: "2025-09-18",
            theme: "Reggae & Roti",
            description:
              "A vibrant event in Miami featuring traditional roti dishes, reggae music, and premium Caribbean rum tastings.",
            culture: ["Jamaican", "Trinidadian"],
            state: "FL",
          },
          {
            id: 176,
            title: "Jacksonville Caribbean Food & Art Festival",
            date: "2025-09-20",
            theme: "Food & Art",
            description:
              "An outdoor festival in Jacksonville celebrating Caribbean cuisine alongside cultural art showcases and live performances.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 177,
            title: "Tallahassee Tropic Taste Fest",
            date: "2025-09-22",
            theme: "Tropical Tasting",
            description:
              "A festival in Tallahassee highlighting tropical Caribbean flavors with interactive tasting booths and cooking demos.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 178,
            title: "Fort Lauderdale Island Street Eats Festival",
            date: "2025-09-24",
            theme: "Street Eats",
            description:
              "A festival in Fort Lauderdale featuring the best of Caribbean street food, including jerk, doubles, and more.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 179,
            title: "Orlando Caribbean Beachside Bash",
            date: "2025-09-26",
            theme: "Beachside Bash",
            description:
              "A festive beachside event in Orlando with grilled Caribbean seafood, tropical cocktails, and island music.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 180,
            title: "Miami Afro-Caribbean Gourmet Gala",
            date: "2025-09-28",
            theme: "Gourmet Gala",
            description:
              "An exclusive gala in Miami featuring high-end Afro-Caribbean cuisine prepared by top chefs.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 181,
            title: "Jacksonville Island Cuisine Festival",
            date: "2025-09-30",
            theme: "Island Cuisine",
            description:
              "A festival in Jacksonville showcasing a wide range of traditional and modern Caribbean dishes.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 182,
            title: "Tallahassee Afro-Caribbean Heritage Feast",
            date: "2025-10-02",
            theme: "Heritage Feast",
            description:
              "A heritage feast in Tallahassee celebrating traditional Afro-Caribbean recipes and cooking techniques.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 183,
            title: "Fort Lauderdale Caribbean BBQ & Rum Festival",
            date: "2025-10-04",
            theme: "BBQ & Rum",
            description:
              "A festival featuring slow-grilled Caribbean BBQ dishes paired with curated rum tastings.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 184,
            title: "Orlando Island Heritage Food Expo",
            date: "2025-10-06",
            theme: "Heritage Expo",
            description:
              "An expo in Orlando featuring authentic Caribbean cuisine and cultural exhibits.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 185,
            title: "Miami Tropical Gourmet Experience",
            date: "2025-10-08",
            theme: "Gourmet Experience",
            description:
              "An upscale dining experience in Miami featuring exotic tropical flavors from the Caribbean.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 186,
            title: "Jacksonville Caribbean Carnival Cook-Off",
            date: "2025-10-10",
            theme: "Carnival Cook-Off",
            description:
              "A competitive cook-off in Jacksonville as part of a larger Caribbean carnival celebration.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 187,
            title: "Tallahassee Tropic Taste Extravaganza",
            date: "2025-10-12",
            theme: "Taste Extravaganza",
            description:
              "An extravaganza in Tallahassee featuring top Caribbean chefs, food trucks, and tasting sessions.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 188,
            title: "Fort Lauderdale Reggae & Jerk Festival",
            date: "2025-10-14",
            theme: "Reggae & Jerk",
            description:
              "A festival in Fort Lauderdale featuring live reggae performances and a variety of jerk-inspired dishes.",
            culture: ["Jamaican"],
            state: "FL",
          },
          {
            id: 189,
            title: "Orlando Afro-Caribbean Market Fest",
            date: "2025-10-16",
            theme: "Market Fest",
            description:
              "A vibrant market fest in Orlando showcasing Afro-Caribbean food, craft vendors, and cultural performances.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 190,
            title: "Miami Caribbean Street Food Fiesta",
            date: "2025-10-18",
            theme: "Street Food Fiesta",
            description:
              "A street food festival in Miami featuring pop-up Caribbean vendors serving classic dishes.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 191,
            title: "Jacksonville Island Bites & Beats Festival",
            date: "2025-10-20",
            theme: "Bites & Beats",
            description:
              "A festival combining Caribbean small bites with live beats and entertainment.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 192,
            title: "Tallahassee Caribbean Heritage Cook-Off",
            date: "2025-10-22",
            theme: "Heritage Cook-Off",
            description:
              "A cook-off in Tallahassee showcasing Caribbean recipes passed down through generations.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 193,
            title: "Fort Lauderdale Tropic Fusion Fest",
            date: "2025-10-24",
            theme: "Fusion Fest",
            description:
              "A festival merging traditional Caribbean ingredients with modern culinary innovations.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 194,
            title: "Orlando Tropical Tasting Carnival",
            date: "2025-10-26",
            theme: "Tropical Carnival",
            description:
              "A carnival in Orlando showcasing tropical Caribbean flavors through interactive food booths.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 195,
            title: "Miami Afro-Caribbean Culinary Celebration",
            date: "2025-10-28",
            theme: "Culinary Celebration",
            description:
              "A culinary event in Miami celebrating the vibrant flavors and history of Afro-Caribbean cuisine.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 196,
            title: "Jacksonville Island Flavors & Rum Festival",
            date: "2025-10-30",
            theme: "Island Flavors & Rum",
            description:
              "A festival in Jacksonville celebrating traditional island cuisine, paired with a selection of premium Caribbean rums.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 197,
            title: "Tallahassee Afro-Caribbean Holiday Market",
            date: "2025-11-02",
            theme: "Holiday Market",
            description:
              "A festive holiday market in Tallahassee featuring Caribbean delicacies, artisan crafts, and seasonal treats.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 198,
            title: "Fort Lauderdale Reggae & Spice Cook-Off",
            date: "2025-11-04",
            theme: "Reggae & Spice",
            description:
              "A culinary competition in Fort Lauderdale where chefs showcase their best Caribbean spice-infused dishes, with reggae music performances.",
            culture: ["Jamaican", "All"],
            state: "FL",
          },
          {
            id: 199,
            title: "Orlando Tropical Harvest Festival",
            date: "2025-11-06",
            theme: "Tropical Harvest",
            description:
              "A festival in Orlando celebrating the Caribbean harvest season with fresh produce, tropical juices, and traditional dishes.",
            culture: ["All"],
            state: "FL",
          },
          {
            id: 200,
            title: "Miami Grand Caribbean Culinary Finale",
            date: "2025-11-08",
            theme: "Grand Culinary Finale",
            description:
              "A grand finale event in Miami closing the year's food festivals, featuring the best dishes, top chefs, and vibrant Caribbean entertainment.",
            culture: ["All"],
            state: "FL",
          }
      ];
      

  /*
    EXPORTING THE FULL EVENT LIST
  */
// Combine all redundant events:
export const redundantEvents: EventData[] = [...gaEvents, ...flEvents];

// Optionally, export a combined list of all events:
export const allEvents: EventData[] = [mainEvent, ...featuredEvents, ...redundantEvents];
