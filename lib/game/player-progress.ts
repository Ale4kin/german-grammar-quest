import { mockKingdoms } from "@/data/kingdoms";
import { mockLessons } from "@/data/lessons";
import { dailyQuestDefinitions } from "@/data/game-rules";
import {
  evaluateBadgeUnlocks,
  evaluateCosmeticUnlocks,
  evaluateDailyQuests,
  evaluateKingdomCompletion,
  evaluateLessonRank,
  evaluateLessonXp,
  getLocalDateKey,
  evaluateLevelProgress,
} from "@/lib/game/evaluators";
import type {
  CosmeticUnlockedEvent,
  DailyQuestState,
  GameProgress,
  GameEvent,
  GameModeId,
  KingdomProgress,
  LessonBestScore,
  LessonResultEntry,
  LessonCompletedEvent,
  LessonStartedEvent,
  PlayerProgress,
  QuestClaimedEvent,
  WeaknessStat,
} from "@/types";

export const PLAYER_PROGRESS_VERSION = 1;

type LessonCompletionUpdate = {
  runId?: string;
  lessonId: string;
  kingdomId: string;
  countryId: string;
  completedAt?: string;
  modeUsed?: GameModeId;
  correctAnswers?: number;
  totalAnswers?: number;
  hintsUsed?: number;
  bestStreak?: number;
  firstTryCount?: number;
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

function updateDailyActivity(progress: PlayerProgress, occurredAt: string) {
  const activityDateKey = getLocalDateKey(occurredAt);
  const previousDateKey = progress.lastActiveOn;

  if (previousDateKey === activityDateKey) {
    return {
      dailyStreak: progress.dailyStreak || 1,
      lastActiveOn: activityDateKey,
    };
  }

  if (!previousDateKey) {
    return {
      dailyStreak: 1,
      lastActiveOn: activityDateKey,
    };
  }

  const previousDate = new Date(`${previousDateKey}T00:00:00`);
  const currentDate = new Date(`${activityDateKey}T00:00:00`);
  const diffInDays = Math.round((currentDate.getTime() - previousDate.getTime()) / 86400000);

  return {
    dailyStreak: diffInDays === 1 ? progress.dailyStreak + 1 : 1,
    lastActiveOn: activityDateKey,
  };
}

export function calculateLevelFromXp(xp: number): number {
  return evaluateLevelProgress(xp).level;
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
    lessonResults: [],
    lessonBestScores: {},
    kingdomProgress: {},
    processedEventIds: [],
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
        bestRank: score?.bestRank ?? "bronze",
        lastCompletedAt: score?.lastCompletedAt ?? null,
      },
    ]),
  );
}

function normalizeLessonResults(
  lessonResults: LessonResultEntry[] | undefined,
): LessonResultEntry[] {
  if (!lessonResults) {
    return [];
  }

  return lessonResults.map((entry) => ({
    runId: entry.runId,
    lessonId: entry.lessonId,
    completedAt: entry.completedAt,
    accuracy: entry.accuracy ?? 0,
    correctCount: entry.correctCount ?? 0,
    totalQuestions: entry.totalQuestions ?? 0,
    hintCount: entry.hintCount ?? 0,
    bestStreak: entry.bestStreak ?? 0,
    perfectRun: entry.perfectRun ?? false,
    firstTryCount: entry.firstTryCount ?? 0,
    totalGemsEarned: entry.totalGemsEarned ?? 0,
    modeUsed: entry.modeUsed ?? "explorer",
  }));
}

function normalizeWeaknessStats(
  weaknessStats: Partial<Record<string, WeaknessStat>> | undefined,
): Record<string, WeaknessStat> {
  if (!weaknessStats) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(weaknessStats).map(([skillId, stat]) => [
      skillId,
      {
        skillId: stat?.skillId ?? (stat as { topicId?: string } | undefined)?.topicId ?? skillId,
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
  lessonBestScores: Record<string, LessonBestScore>,
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
      const allLessonsGold =
        isCompleted &&
        kingdomLessonIds.every((lessonId) => lessonBestScores[lessonId]?.bestRank === "gold");
      const trophyTier = allLessonsGold ? "gold" : isCompleted ? "complete" : "none";

      return [
        kingdom.id,
        {
          kingdomId: kingdom.id,
          totalLessons: kingdomLessonIds.length,
          completedLessons: completedInKingdom.length,
          completedLessonIds: completedInKingdom,
          isCompleted,
          trophyTier,
          allLessonsGold,
          completedAt: isCompleted
            ? previousProgress?.completedAt ?? new Date().toISOString()
            : null,
          goldCompletedAt: allLessonsGold
            ? previousProgress?.goldCompletedAt ?? new Date().toISOString()
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
      lessonResults: [],
      gems: value.gems ?? 0,
      processedEventIds: [],
      lifetimeStats: {
        ...baseProgress.lifetimeStats,
        correctAnswers: value.correctAnswers ?? 0,
        hintUses: value.hintUses ?? 0,
      },
      kingdomProgress: deriveKingdomProgress(value.completedLessonIds ?? [], {}),
    };
  }

  if (!value || typeof value !== "object") {
    return baseProgress;
  }

  const parsed = value as Partial<PlayerProgress>;
  const legacyParsed = value as Partial<PlayerProgress> & { processedRunIds?: string[] };
  const completedLessonIds = parsed.completedLessonIds ?? [];
  const xp = parsed.xp ?? 0;

  return {
    ...baseProgress,
    ...parsed,
    version: PLAYER_PROGRESS_VERSION,
    completedLessonIds,
    completedExerciseIds: parsed.completedExerciseIds ?? [],
    lessonResults: normalizeLessonResults(parsed.lessonResults),
    lessonBestScores: normalizeLessonBestScores(parsed.lessonBestScores),
    kingdomProgress: deriveKingdomProgress(
      completedLessonIds,
      normalizeLessonBestScores(parsed.lessonBestScores),
      parsed.kingdomProgress,
    ),
    processedEventIds: parsed.processedEventIds ?? legacyParsed.processedRunIds ?? [],
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
  if (update.runId && progress.processedEventIds.includes(update.runId)) {
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
  const firstTryCount = update.firstTryCount ?? 0;
  const modeUsed = update.modeUsed ?? "explorer";
  const perfectRun = totalAnswers > 0 && correctAnswers === totalAnswers && hintsUsed === 0;
  const lessonResultEntry: LessonResultEntry = {
    runId: update.runId ?? `${update.lessonId}-${completedAt}`,
    lessonId: update.lessonId,
    completedAt,
    accuracy,
    correctCount: correctAnswers,
    totalQuestions: totalAnswers,
    hintCount: hintsUsed,
    bestStreak: update.bestStreak ?? 0,
    perfectRun,
    firstTryCount,
    totalGemsEarned: gemsEarned,
    modeUsed,
  };
  const xpEarned = update.xpEarned ?? evaluateLessonXp(lessonResultEntry);

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
    bestRank: previousBest?.bestRank ?? "bronze",
    lastCompletedAt: completedAt,
  };

  const nextXp = progress.xp + xpEarned;
  const activityUpdate = updateDailyActivity(progress, completedAt);
  const rankEvaluation = evaluateLessonRank(lessonResultEntry);
  const rankWeight = { bronze: 1, silver: 2, gold: 3 };
  if (rankWeight[rankEvaluation.rank] > rankWeight[lessonBestScore.bestRank]) {
    lessonBestScore.bestRank = rankEvaluation.rank;
  }
  const dailyQuestEvaluation = evaluateDailyQuests(lessonResultEntry, progress, completedAt);
  const badgeEvaluation = evaluateBadgeUnlocks(lessonResultEntry, progress);
  const lessonBestScores = {
    ...progress.lessonBestScores,
    [update.lessonId]: lessonBestScore,
  };
  const nextProgress = {
    ...progress,
    activeKingdomId: update.kingdomId,
    activeCountryId: update.countryId,
    currentLessonId: update.lessonId,
    completedLessonIds,
    lessonResults: [lessonResultEntry, ...progress.lessonResults],
    lessonBestScores,
    processedEventIds: update.runId
      ? [...progress.processedEventIds, update.runId]
      : progress.processedEventIds,
    gems: progress.gems + gemsEarned,
    xp: nextXp,
    level: calculateLevelFromXp(nextXp),
    unlockedBadges: [
      ...progress.unlockedBadges,
      ...badgeEvaluation.unlockedBadgeIds.map((badgeId) => ({
        id: badgeId,
        unlockedAt: completedAt,
        sourceLessonId: update.lessonId,
        sourceRunId: update.runId ?? null,
      })),
    ],
    dailyStreak: activityUpdate.dailyStreak,
    lastActiveOn: activityUpdate.lastActiveOn,
    dailyQuestState: {
      dateKey: dailyQuestEvaluation.dateKey,
      activeQuestIds: dailyQuestEvaluation.activeQuestIds,
      quests: dailyQuestEvaluation.quests,
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

  const kingdomProgress = deriveKingdomProgress(
    completedLessonIds,
    lessonBestScores,
    nextProgress.kingdomProgress,
  );
  const kingdomEvaluation = evaluateKingdomCompletion({
    ...nextProgress,
    kingdomProgress,
  });
  const progressWithKingdoms = {
    ...nextProgress,
    kingdomProgress: kingdomEvaluation.summaries.reduce<Record<string, KingdomProgress>>(
      (accumulator, summary) => {
        const existing = kingdomProgress[summary.kingdomId];
        accumulator[summary.kingdomId] = {
          ...existing,
          trophyTier: summary.trophyTier,
          allLessonsGold: summary.allLessonsGold,
        };
        return accumulator;
      },
      {},
    ),
  };
  const cosmeticEvaluation = evaluateCosmeticUnlocks(progressWithKingdoms);

  return {
    ...progressWithKingdoms,
    unlockedCosmetics: [
      ...progressWithKingdoms.unlockedCosmetics,
      ...cosmeticEvaluation.unlockedCosmeticIds.map((cosmeticId) => ({
        id: cosmeticId,
        unlockedAt: completedAt,
        sourceLessonId: update.lessonId,
        sourceRunId: update.runId ?? null,
      })),
    ],
  };
}

function applyLessonStarted(
  progress: PlayerProgress,
  event: LessonStartedEvent,
): PlayerProgress {
  const activityUpdate = updateDailyActivity(progress, event.payload.occurredAt);
  return {
    ...progress,
    activeKingdomId: event.payload.kingdomId,
    activeCountryId: event.payload.countryId,
    currentLessonId: event.payload.lessonId,
    dailyStreak: activityUpdate.dailyStreak,
    lastActiveOn: activityUpdate.lastActiveOn,
  };
}

function applyAnswerSubmitted(
  progress: PlayerProgress,
  event: Extract<GameEvent, { type: "answer.submitted" }>,
): PlayerProgress {
  const completedExerciseIds = progress.completedExerciseIds.includes(event.payload.exerciseId)
    ? progress.completedExerciseIds
    : [...progress.completedExerciseIds, event.payload.exerciseId];
  const weaknessStats = { ...progress.weaknessStats };
  const activityUpdate = updateDailyActivity(progress, event.payload.occurredAt);

  event.payload.grammarSkillIds.forEach((skillId) => {
    const previousWeakness = weaknessStats[skillId];

    weaknessStats[skillId] = {
      skillId,
      totalAnswers: (previousWeakness?.totalAnswers ?? 0) + 1,
      incorrectAnswers:
        (previousWeakness?.incorrectAnswers ?? 0) + (event.payload.isCorrect ? 0 : 1),
      hintUses:
        (previousWeakness?.hintUses ?? 0) + (event.payload.usedHint ? 1 : 0),
      lastPracticedAt: event.payload.occurredAt,
    };
  });

  return {
    ...progress,
    activeKingdomId: event.payload.kingdomId,
    activeCountryId: event.payload.countryId,
    currentLessonId: event.payload.lessonId,
    completedExerciseIds,
    weaknessStats,
    dailyStreak: activityUpdate.dailyStreak,
    lastActiveOn: activityUpdate.lastActiveOn,
  };
}

function applyQuestClaimed(
  progress: PlayerProgress,
  event: QuestClaimedEvent,
): PlayerProgress {
  const existingQuest = progress.dailyQuestState.quests[event.payload.questId];
  const questDefinition = dailyQuestDefinitions.find((quest) => quest.id === event.payload.questId);

  if (!existingQuest || existingQuest.claimed || !questDefinition) {
    return progress;
  }

  const nextProgress = {
    ...progress,
    gems: progress.gems + questDefinition.rewardGems,
    ...updateDailyActivity(progress, event.payload.occurredAt),
    dailyQuestState: {
      ...progress.dailyQuestState,
      quests: {
        ...progress.dailyQuestState.quests,
        [event.payload.questId]: {
          ...existingQuest,
          claimed: true,
        },
      },
    },
  };
  const cosmeticEvaluation = evaluateCosmeticUnlocks(nextProgress);

  return {
    ...nextProgress,
    unlockedCosmetics: [
      ...nextProgress.unlockedCosmetics,
      ...cosmeticEvaluation.unlockedCosmeticIds.map((cosmeticId) => ({
        id: cosmeticId,
        unlockedAt: event.payload.occurredAt,
        sourceLessonId: null,
        sourceRunId: null,
      })),
    ],
  };
}

export function getLevelProgress(xp: number) {
  return evaluateLevelProgress(xp);
}

function applyCosmeticUnlocked(
  progress: PlayerProgress,
  event: CosmeticUnlockedEvent,
): PlayerProgress {
  if (progress.unlockedCosmetics.some((cosmetic) => cosmetic.id === event.payload.cosmeticId)) {
    return progress;
  }

  return {
    ...progress,
    unlockedCosmetics: [
      ...progress.unlockedCosmetics,
      {
        id: event.payload.cosmeticId,
        unlockedAt: event.payload.occurredAt,
        sourceLessonId: event.payload.sourceLessonId ?? null,
        sourceRunId: event.payload.sourceRunId ?? null,
      },
    ],
  };
}

export function applyGameEvent(progress: PlayerProgress, event: GameEvent): PlayerProgress {
  if (progress.processedEventIds.includes(event.id)) {
    return progress;
  }

  switch (event.type) {
    case "lesson.started":
      return {
        ...applyLessonStarted(progress, event),
        processedEventIds: [...progress.processedEventIds, event.id],
      };
    case "answer.submitted":
      return {
        ...applyAnswerSubmitted(progress, event),
        processedEventIds: [...progress.processedEventIds, event.id],
      };
    case "lesson.completed":
      return applyLessonCompletion(progress, {
        runId: event.id,
        lessonId: event.payload.lessonId,
        kingdomId: event.payload.kingdomId,
        countryId: event.payload.countryId,
        completedAt: event.payload.occurredAt,
        modeUsed: event.payload.modeUsed,
        correctAnswers: event.payload.correctAnswers,
        totalAnswers: event.payload.totalAnswers,
        hintsUsed: event.payload.hintsUsed,
        bestStreak: event.payload.bestStreak,
        firstTryCount: event.payload.firstTryCount,
        gemsEarned: event.payload.gemsEarned,
        xpEarned: event.payload.xpEarned,
      });
    case "quest.claimed":
      return {
        ...applyQuestClaimed(progress, event),
        processedEventIds: [...progress.processedEventIds, event.id],
      };
    case "cosmetic.unlocked":
      return {
        ...applyCosmeticUnlocked(progress, event),
        processedEventIds: [...progress.processedEventIds, event.id],
      };
    default:
      return progress;
  }
}
