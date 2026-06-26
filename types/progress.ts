import type { GameModeId } from "@/types/game-mode";
import type { KingdomTrophyTier, LessonRank } from "@/types/game-systems";

export type GameProgress = {
  selectedAvatarId: string | null;
  activeKingdomId: string | null;
  activeCountryId: string | null;
  currentLessonId: string | null;
  completedLessonIds: string[];
  completedExerciseIds: string[];
  gems: number;
  streak: number;
  correctAnswers: number;
  hintUses: number;
};

export type LessonBestScore = {
  lessonId: string;
  completions: number;
  highestAccuracy: number;
  bestStreak: number;
  fewestHints: number;
  bestGems: number;
  bestRank: LessonRank;
  lastCompletedAt: string | null;
};

export type LessonResultEntry = {
  runId: string;
  lessonId: string;
  completedAt: string;
  accuracy: number;
  correctCount: number;
  totalQuestions: number;
  hintCount: number;
  bestStreak: number;
  perfectRun: boolean;
  firstTryCount: number;
  totalGemsEarned: number;
  modeUsed: GameModeId;
};

export type KingdomProgress = {
  kingdomId: string;
  totalLessons: number;
  completedLessons: number;
  completedLessonIds: string[];
  isCompleted: boolean;
  trophyTier: KingdomTrophyTier;
  allLessonsGold: boolean;
  completedAt: string | null;
  goldCompletedAt: string | null;
};

export type UnlockedReward = {
  id: string;
  unlockedAt: string;
  sourceLessonId?: string | null;
  sourceRunId?: string | null;
};

export type DailyQuestProgress = {
  questId: string;
  progress: number;
  target: number;
  completed: boolean;
  claimed: boolean;
};

export type DailyQuestState = {
  dateKey: string | null;
  activeQuestIds: string[];
  quests: Record<string, DailyQuestProgress>;
};

export type WeaknessStat = {
  skillId: string;
  totalAnswers: number;
  incorrectAnswers: number;
  hintUses: number;
  lastPracticedAt: string | null;
};

export type PlayerLifetimeStats = {
  completedLessons: number;
  completedExercises: number;
  correctAnswers: number;
  hintUses: number;
  totalGemsEarned: number;
  totalXpEarned: number;
};

export type PlayerProgress = {
  version: number;
  selectedAvatarId: string | null;
  activeKingdomId: string | null;
  activeCountryId: string | null;
  currentLessonId: string | null;
  completedLessonIds: string[];
  completedExerciseIds: string[];
  lessonResults: LessonResultEntry[];
  lessonBestScores: Record<string, LessonBestScore>;
  kingdomProgress: Record<string, KingdomProgress>;
  processedEventIds: string[];
  gems: number;
  xp: number;
  level: number;
  unlockedBadges: UnlockedReward[];
  unlockedCosmetics: UnlockedReward[];
  dailyStreak: number;
  lastActiveOn: string | null;
  dailyQuestState: DailyQuestState;
  weaknessStats: Record<string, WeaknessStat>;
  lifetimeStats: PlayerLifetimeStats;
};

export type UserProgress = PlayerProgress;
