import type { CosmeticDefinition } from "@/types";

export const cosmeticDefinitions: CosmeticDefinition[] = [
  {
    id: "fox",
    type: "avatar",
    name: "Fritz the Fox",
    emoji: "🦊",
    description: "Quick learner focused on speed and streaks.",
    unlockCondition: {
      type: "free",
    },
  },
  {
    id: "owl",
    type: "avatar",
    name: "Olli the Owl",
    emoji: "🦉",
    description: "Careful and precise, good for grammar missions.",
    unlockCondition: {
      type: "gems",
      minGems: 100,
    },
  },
  {
    id: "bear",
    type: "avatar",
    name: "Bruno the Bear",
    emoji: "🐻",
    description: "Steady progress with strong memory power.",
    unlockCondition: {
      type: "badge",
      badgeId: "lesson-veteran",
    },
  },
  {
    id: "cat",
    type: "avatar",
    name: "Kira the Cat",
    emoji: "🐱",
    description: "Curious explorer who unlocks every lesson.",
    unlockCondition: {
      type: "kingdom-complete",
      kingdomId: "articles",
    },
  },
];

export const avatarCosmetics = cosmeticDefinitions.filter(
  (cosmetic) => cosmetic.type === "avatar",
);
