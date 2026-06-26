import type { DailyQuestProgress, GameModeId, LessonResultEntry, PlayerProgress } from "@/types";

export type LessonRank = "bronze" | "silver" | "gold";

export type KingdomTrophyTier = "none" | "complete" | "gold";

export type LevelThreshold = {
  level: number;
  minXp: number;
};

export type LessonXpRules = {
  baseCompletionXp: number;
  accuracyBonuses: {
    minAccuracy: number;
    xpBonus: number;
  }[];
  hintFreeBonus: number;
  perfectRunBonus: number;
};

export type ExerciseRunType = "lesson" | "review";

export type LessonRankEvaluation = {
  rank: LessonRank;
  reasons: string[];
};

export type KingdomCompletionSummary = {
  kingdomId: string;
  completedLessons: number;
  totalLessons: number;
  isCompleted: boolean;
  trophyTier: KingdomTrophyTier;
  allLessonsGold: boolean;
};

export type KingdomCompletionEvaluation = {
  completedKingdomIds: string[];
  goldKingdomIds: string[];
  newlyCompletedKingdomIds: string[];
  newlyGoldKingdomIds: string[];
  summaries: KingdomCompletionSummary[];
};

export type DailyQuestDefinition = {
  id: string;
  title: string;
  target: number;
  rewardGems: number;
};

export type DailyQuestEvaluation = {
  dateKey: string;
  activeQuestIds: string[];
  quests: Record<string, DailyQuestProgress>;
  newlyCompletedQuestIds: string[];
};

export type BadgeDefinition = {
  id: string;
  title: string;
  description: string;
  condition:
    | {
        type: "perfect-run";
      }
    | {
        type: "best-streak";
        minStreak: number;
      }
    | {
        type: "completed-lessons";
        minLessons: number;
      }
    | {
        type: "perfect-runs-total";
        minPerfectRuns: number;
      };
};

export type BadgeUnlockEvaluation = {
  unlockedBadgeIds: string[];
  badgeDefinitions: BadgeDefinition[];
};

export type CosmeticUnlockCondition =
  | {
      type: "free";
    }
  | {
      type: "gems";
      minGems: number;
    }
  | {
      type: "badge";
      badgeId: string;
    }
  | {
      type: "kingdom-complete";
      kingdomId: string;
    };

export type CosmeticDefinition = {
  id: string;
  type: "avatar";
  name: string;
  emoji: string;
  description: string;
  unlockCondition: CosmeticUnlockCondition;
};

export type CosmeticUnlockEvaluation = {
  unlockedCosmeticIds: string[];
  cosmeticDefinitions: CosmeticDefinition[];
};

export type WeaknessProfileEntry = {
  skillId: string;
  skillLabel: string;
  attempts: number;
  accuracy: number;
  hintRate: number;
  severity: "low" | "medium" | "high";
};

export type WeaknessProfileEvaluation = {
  weakestTopics: WeaknessProfileEntry[];
};

export type LessonEvaluatorContext = {
  result: LessonResultEntry;
  progress: PlayerProgress;
  today: string;
  modeId?: GameModeId;
};
