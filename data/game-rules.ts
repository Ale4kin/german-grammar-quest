import type {
  BadgeDefinition,
  DailyQuestDefinition,
  LessonXpRules,
  LevelThreshold,
  LessonRank,
  RewardRules,
} from "@/types";

export const rewardRules: RewardRules = {
  correctWithoutHintGems: 15,
  correctWithHintGems: 5,
  wrongAnswerGems: 0,
  streakBonusThreshold: 3,
  streakBonusGems: 10,
  reviewCorrectWithoutHintGems: 8,
  reviewCorrectWithHintGems: 3,
  reviewStreakBonusGems: 5,
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

export const lessonRankThresholds: Record<
  LessonRank,
  {
    minAccuracy: number;
    maxHints: number;
    requirePerfectRun: boolean;
  }
> = {
  bronze: {
    minAccuracy: 60,
    maxHints: Number.POSITIVE_INFINITY,
    requirePerfectRun: false,
  },
  silver: {
    minAccuracy: 80,
    maxHints: 2,
    requirePerfectRun: false,
  },
  gold: {
    minAccuracy: 100,
    maxHints: 0,
    requirePerfectRun: true,
  },
};

export const dailyQuestDefinitions: DailyQuestDefinition[] = [
  {
    id: "finish-lesson",
    title: "Finish 1 lesson",
    target: 1,
    rewardGems: 10,
  },
  {
    id: "no-hint-run",
    title: "Complete a lesson without hints",
    target: 1,
    rewardGems: 15,
  },
  {
    id: "streak-3",
    title: "Reach a 3-answer streak",
    target: 1,
    rewardGems: 10,
  },
  {
    id: "earn-40-gems",
    title: "Earn 40 gems in one lesson",
    target: 1,
    rewardGems: 15,
  },
  {
    id: "perfect-run",
    title: "Finish a perfect run",
    target: 1,
    rewardGems: 20,
  },
];

export const dailyQuestRules = {
  minActiveQuests: 2,
  maxActiveQuests: 3,
};

export const badgeDefinitions: BadgeDefinition[] = [
  {
    id: "perfect-runner",
    title: "Perfect Runner",
    description: "Finish one lesson with full accuracy and no hints.",
    condition: {
      type: "perfect-run",
    },
  },
  {
    id: "combo-starter",
    title: "Combo Starter",
    description: "Reach a best streak of 3 in a finished lesson.",
    condition: {
      type: "best-streak",
      minStreak: 3,
    },
  },
  {
    id: "lesson-veteran",
    title: "Lesson Veteran",
    description: "Finish 5 lessons in total.",
    condition: {
      type: "completed-lessons",
      minLessons: 5,
    },
  },
  {
    id: "hint-free-hat-trick",
    title: "Hint-Free Hat Trick",
    description: "Finish 3 perfect runs.",
    condition: {
      type: "perfect-runs-total",
      minPerfectRuns: 3,
    },
  },
];

export const lessonXpRules: LessonXpRules = {
  baseCompletionXp: 40,
  accuracyBonuses: [
    {
      minAccuracy: 60,
      xpBonus: 10,
    },
    {
      minAccuracy: 80,
      xpBonus: 20,
    },
    {
      minAccuracy: 100,
      xpBonus: 30,
    },
  ],
  hintFreeBonus: 10,
  perfectRunBonus: 20,
};

export const reviewXpMultiplier = 0.5;

export const levelThresholds: LevelThreshold[] = [
  { level: 1, minXp: 0 },
  { level: 2, minXp: 100 },
  { level: 3, minXp: 220 },
  { level: 4, minXp: 360 },
  { level: 5, minXp: 520 },
  { level: 6, minXp: 700 },
  { level: 7, minXp: 900 },
  { level: 8, minXp: 1120 },
  { level: 9, minXp: 1360 },
  { level: 10, minXp: 1620 },
];
