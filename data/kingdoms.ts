import type { Kingdom } from "@/types";

export const mockKingdoms: Kingdom[] = [
  {
    id: "articles",
    name: "Articles",
    description: "Learn when German nouns take der, die, das, ein, eine, or no article at all.",
    sortOrder: 1,
  },
  {
    id: "nouns",
    name: "Nouns",
    description: "Explore noun cases and how nouns change across sentence roles.",
    sortOrder: 2,
  },
  {
    id: "pronouns",
    name: "Pronouns",
    description: "Practice the small but important words that replace nouns in German.",
    sortOrder: 3,
  },
  {
    id: "prepositions",
    name: "Prepositions",
    description: "Study which case each preposition requires and how meaning shifts with movement.",
    sortOrder: 4,
  },
  {
    id: "adjectives",
    name: "Adjectives",
    description: "Compare qualities and learn how German describes things more strongly.",
    sortOrder: 5,
  },
  {
    id: "verbs",
    name: "Verbs",
    description: "Build tense and verb-form confidence from present tense to core past forms.",
    sortOrder: 6,
  },
];
