import type { RewardRules } from "@/types";

export const rewardRules: RewardRules = {
  correctWithoutHintGems: 15,
  correctWithHintGems: 5,
  wrongAnswerGems: 0,
  streakBonusThreshold: 3,
  streakBonusGems: 10,
  streakMilestones: [
    {
      streak: 3,
      title: "Bonus gems",
      description: "Gain +10 bonus gems for 3 correct answers in a row without hints.",
      rewardType: "gems",
      gemBonus: 10,
    },
    {
      streak: 5,
      title: "Small chest",
      description: "Open a small chest reward after 5 correct answers in a row without hints.",
      rewardType: "chest",
    },
    {
      streak: 10,
      title: "Perfect combo badge",
      description: "Unlock a perfect combo badge after 10 correct answers in a row without hints.",
      rewardType: "badge",
    },
  ],
};
