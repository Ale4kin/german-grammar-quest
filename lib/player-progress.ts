import { mockKingdoms } from "@/data/kingdoms";
import { mockLessons } from "@/data/lessons";
import type {
  DailyQuestState,
  GameProgress,
  KingdomProgress,
  LessonBestScore,
  PlayerProgress,
  WeaknessStat,
} from "@/types";

export const PLAYER_PROGRESS_VERSION = 1;

type LessonCompletionUpdate = {
  runId?: string;
  lessonId: string;
  kingdomId: string;
  countryId: string;
  completedAt?: string;
  correctAnswers?: number;
  totalAnswers?: number;
  hintsUsed?: number;
  bestStreak?: number;
  gemsEarned?: number;
  xpEarned?: number;
};

function createDailyQuestState(): DailyQuestState {
  return {
    dateKey: null,
    activeQuestIds: [],
    quests: {},
  };
}

function createLifetimeStats(): PlayerProgress["lifetimeStats"] {
  return {
    completedLessons: 0,
    completedExercises: 0,
    correctAnswers: 0,
    hintUses: 0,
    totalGemsEarned: 0,
    totalXpEarned: 0,
  };
}

export function calculateLevelFromXp(xp: number): number {
  return Math.max(1, Math.floor(xp / 100) + 1);
}

export function createPlayerProgress(): PlayerProgress {
  const firstLesson = mockLessons[0];

  return {
    version: PLAYER_PROGRESS_VERSION,
    selectedAvatarId: null,
    activeKingdomId: firstLesson?.kingdomId ?? null,
    activeCountryId: firstLesson?.countryId ?? null,
    currentLessonId: firstLesson?.id ?? null,
    completedLessonIds: [],
    completedExerciseIds: [],
    lessonBestScores: {},
    kingdomProgress: {},
    processedRunIds: [],
    gems: 0,
    xp: 0,
    level: 1,
    unlockedBadges: [],
    unlockedCosmetics: [],
    dailyStreak: 0,
    lastActiveOn: null,
    dailyQuestState: createDailyQuestState(),
    weaknessStats: {},
    lifetimeStats: createLifetimeStats(),
  };
}

function isLegacyGameProgress(value: unknown): value is GameProgress {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<GameProgress>;

  return Array.isArray(candidate.completedLessonIds) && typeof candidate.gems === "number";
}

function normalizeLessonBestScores(
  lessonBestScores: Partial<Record<string, LessonBestScore>> | undefined,
): Record<string, LessonBestScore> {
  if (!lessonBestScores) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(lessonBestScores).map(([lessonId, score]) => [
      lessonId,
      {
        lessonId,
        completions: score?.completions ?? 0,
        highestAccuracy: score?.highestAccuracy ?? 0,
        bestStreak: score?.bestStreak ?? 0,
        fewestHints: score?.fewestHints ?? 0,
        bestGems: score?.bestGems ?? 0,
        lastCompletedAt: score?.lastCompletedAt ?? null,
      },
    ]),
  );
}

function normalizeWeaknessStats(
  weaknessStats: Partial<Record<string, WeaknessStat>> | undefined,
): Record<string, WeaknessStat> {
  if (!weaknessStats) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(weaknessStats).map(([topicId, stat]) => [
      topicId,
      {
        topicId,
        totalAnswers: stat?.totalAnswers ?? 0,
        incorrectAnswers: stat?.incorrectAnswers ?? 0,
        hintUses: stat?.hintUses ?? 0,
        lastPracticedAt: stat?.lastPracticedAt ?? null,
      },
    ]),
  );
}

export function deriveKingdomProgress(
  completedLessonIds: string[],
  existingProgress?: Record<string, KingdomProgress>,
): Record<string, KingdomProgress> {
  return Object.fromEntries(
    mockKingdoms.map((kingdom) => {
      const kingdomLessonIds = mockLessons
        .filter((lesson) => lesson.kingdomId === kingdom.id)
        .map((lesson) => lesson.id);
      const completedInKingdom = kingdomLessonIds.filter((lessonId) =>
        completedLessonIds.includes(lessonId),
      );
      const previousProgress = existingProgress?.[kingdom.id];
      const isCompleted =
        kingdomLessonIds.length > 0 && completedInKingdom.length === kingdomLessonIds.length;

      return [
        kingdom.id,
        {
          kingdomId: kingdom.id,
          totalLessons: kingdomLessonIds.length,
          completedLessons: completedInKingdom.length,
          completedLessonIds: completedInKingdom,
          isCompleted,
          completedAt: isCompleted
            ? previousProgress?.completedAt ?? new Date().toISOString()
            : null,
        },
      ];
    }),
  );
}

export function migratePlayerProgress(value: unknown): PlayerProgress {
  const baseProgress = createPlayerProgress();

  if (isLegacyGameProgress(value)) {
    return {
      ...baseProgress,
      selectedAvatarId: value.selectedAvatarId ?? baseProgress.selectedAvatarId,
      activeKingdomId: value.activeKingdomId ?? baseProgress.activeKingdomId,
      activeCountryId: value.activeCountryId ?? baseProgress.activeCountryId,
      currentLessonId: value.currentLessonId ?? baseProgress.currentLessonId,
      completedLessonIds: value.completedLessonIds ?? [],
      completedExerciseIds: value.completedExerciseIds ?? [],
      gems: value.gems ?? 0,
      processedRunIds: [],
      lifetimeStats: {
        ...baseProgress.lifetimeStats,
        correctAnswers: value.correctAnswers ?? 0,
        hintUses: value.hintUses ?? 0,
      },
      kingdomProgress: deriveKingdomProgress(value.completedLessonIds ?? []),
    };
  }

  if (!value || typeof value !== "object") {
    return baseProgress;
  }

  const parsed = value as Partial<PlayerProgress>;
  const completedLessonIds = parsed.completedLessonIds ?? [];
  const xp = parsed.xp ?? 0;

  return {
    ...baseProgress,
    ...parsed,
    version: PLAYER_PROGRESS_VERSION,
    completedLessonIds,
    completedExerciseIds: parsed.completedExerciseIds ?? [],
    lessonBestScores: normalizeLessonBestScores(parsed.lessonBestScores),
    kingdomProgress: deriveKingdomProgress(
      completedLessonIds,
      parsed.kingdomProgress,
    ),
    processedRunIds: parsed.processedRunIds ?? [],
    xp,
    level: parsed.level ?? calculateLevelFromXp(xp),
    unlockedBadges: parsed.unlockedBadges ?? [],
    unlockedCosmetics: parsed.unlockedCosmetics ?? [],
    dailyQuestState: parsed.dailyQuestState ?? createDailyQuestState(),
    weaknessStats: normalizeWeaknessStats(parsed.weaknessStats),
    lifetimeStats: {
      ...baseProgress.lifetimeStats,
      ...parsed.lifetimeStats,
    },
  };
}

export function applyLessonCompletion(
  progress: PlayerProgress,
  update: LessonCompletionUpdate,
): PlayerProgress {
  if (update.runId && progress.processedRunIds.includes(update.runId)) {
    return progress;
  }

  const completedAt = update.completedAt ?? new Date().toISOString();
  const completedLessonIds = progress.completedLessonIds.includes(update.lessonId)
    ? progress.completedLessonIds
    : [...progress.completedLessonIds, update.lessonId];
  const previousBest = progress.lessonBestScores[update.lessonId];
  const totalAnswers = update.totalAnswers ?? 0;
  const correctAnswers = update.correctAnswers ?? 0;
  const accuracy = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0;
  const hintsUsed = update.hintsUsed ?? 0;
  const gemsEarned = update.gemsEarned ?? 0;
  const xpEarned = update.xpEarned ?? 0;
  const topicId = update.kingdomId;
  const previousWeakness = progress.weaknessStats[topicId];

  const lessonBestScore: LessonBestScore = {
    lessonId: update.lessonId,
    completions: (previousBest?.completions ?? 0) + 1,
    highestAccuracy: Math.max(previousBest?.highestAccuracy ?? 0, accuracy),
    bestStreak: Math.max(previousBest?.bestStreak ?? 0, update.bestStreak ?? 0),
    fewestHints:
      previousBest && previousBest.completions > 0
        ? Math.min(previousBest.fewestHints, hintsUsed)
        : hintsUsed,
    bestGems: Math.max(previousBest?.bestGems ?? 0, gemsEarned),
    lastCompletedAt: completedAt,
  };

  const weaknessStat: WeaknessStat = {
    topicId,
    totalAnswers: (previousWeakness?.totalAnswers ?? 0) + totalAnswers,
    incorrectAnswers:
      (previousWeakness?.incorrectAnswers ?? 0) + Math.max(totalAnswers - correctAnswers, 0),
    hintUses: (previousWeakness?.hintUses ?? 0) + hintsUsed,
    lastPracticedAt: completedAt,
  };

  const nextXp = progress.xp + xpEarned;
  const nextProgress = {
    ...progress,
    activeKingdomId: update.kingdomId,
    activeCountryId: update.countryId,
    currentLessonId: update.lessonId,
    completedLessonIds,
    lessonBestScores: {
      ...progress.lessonBestScores,
      [update.lessonId]: lessonBestScore,
    },
    processedRunIds: update.runId
      ? [...progress.processedRunIds, update.runId]
      : progress.processedRunIds,
    gems: progress.gems + gemsEarned,
    xp: nextXp,
    level: calculateLevelFromXp(nextXp),
    lastActiveOn: completedAt.slice(0, 10),
    weaknessStats: {
      ...progress.weaknessStats,
      [topicId]: weaknessStat,
    },
    lifetimeStats: {
      ...progress.lifetimeStats,
      completedLessons: completedLessonIds.length,
      correctAnswers: progress.lifetimeStats.correctAnswers + correctAnswers,
      hintUses: progress.lifetimeStats.hintUses + hintsUsed,
      totalGemsEarned: progress.lifetimeStats.totalGemsEarned + gemsEarned,
      totalXpEarned: progress.lifetimeStats.totalXpEarned + xpEarned,
    },
  };

  return {
    ...nextProgress,
    kingdomProgress: deriveKingdomProgress(
      completedLessonIds,
      nextProgress.kingdomProgress,
    ),
  };
}
