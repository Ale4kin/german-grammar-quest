export type StreakMilestoneRewardType = "gems" | "chest" | "badge";

export type StreakMilestone = {
  streak: number;
  title: string;
  description: string;
  rewardType: StreakMilestoneRewardType;
  gemBonus?: number;
};

export type RewardRules = {
  correctWithoutHintGems: number;
  correctWithHintGems: number;
  wrongAnswerGems: number;
  streakBonusThreshold: number;
  streakBonusGems: number;
  reviewCorrectWithoutHintGems: number;
  reviewCorrectWithHintGems: number;
  reviewStreakBonusGems: number;
  streakMilestones: StreakMilestone[];
};
