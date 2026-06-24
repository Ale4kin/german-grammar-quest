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
  lastCompletedAt: string | null;
};

export type KingdomProgress = {
  kingdomId: string;
  totalLessons: number;
  completedLessons: number;
  completedLessonIds: string[];
  isCompleted: boolean;
  completedAt: string | null;
};

export type UnlockedReward = {
  id: string;
  unlockedAt: string;
  sourceLessonId?: string | null;
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
  topicId: string;
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
  lessonBestScores: Record<string, LessonBestScore>;
  kingdomProgress: Record<string, KingdomProgress>;
  processedRunIds: string[];
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
