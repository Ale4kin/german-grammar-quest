"use client";

import {
  applyGameEvent,
  createPlayerProgress,
  migratePlayerProgress,
} from "@/lib/game/player-progress";
import {
  evaluateCosmeticUnlocks,
  getDailyQuestPlan,
  getLocalDateKey,
} from "@/lib/game/evaluators";
import type { CosmeticUnlockedEvent, GameEvent, GameModeId, PlayerProgress, QuestClaimedEvent } from "@/types";

const PROGRESS_STORAGE_KEY = "german-grammar-quest-progress";

function syncDailyQuestState(progress: PlayerProgress): PlayerProgress {
  const dateKey = getLocalDateKey();

  if (progress.dailyQuestState.dateKey === dateKey) {
    return progress;
  }

  return {
    ...progress,
    dailyQuestState: {
      dateKey,
      activeQuestIds: getDailyQuestPlan(dateKey).map((quest) => quest.id),
      quests: {},
    },
  };
}

function syncCosmeticUnlocks(progress: PlayerProgress): PlayerProgress {
  const occurredAt = new Date().toISOString();
  const cosmeticEvaluation = evaluateCosmeticUnlocks(progress);

  if (cosmeticEvaluation.unlockedCosmeticIds.length === 0) {
    return progress;
  }

  return {
    ...progress,
    unlockedCosmetics: [
      ...progress.unlockedCosmetics,
      ...cosmeticEvaluation.unlockedCosmeticIds.map((cosmeticId) => ({
        id: cosmeticId,
        unlockedAt: occurredAt,
        sourceLessonId: null,
      })),
    ],
  };
}

export function readStoredProgress(): PlayerProgress {
  if (typeof window === "undefined") {
    return createPlayerProgress();
  }

  const rawValue = window.localStorage.getItem(PROGRESS_STORAGE_KEY);

  if (!rawValue) {
    return createPlayerProgress();
  }

  try {
    const migratedProgress = migratePlayerProgress(JSON.parse(rawValue));
    const syncedProgress = syncCosmeticUnlocks(syncDailyQuestState(migratedProgress));

    if (JSON.stringify(syncedProgress) !== JSON.stringify(migratedProgress)) {
      writeStoredProgress(syncedProgress);
    }

    return syncedProgress;
  } catch {
    return createPlayerProgress();
  }
}

export function writeStoredProgress(progress: PlayerProgress) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
}

export function updateStoredProgress(
  updater: (progress: PlayerProgress) => PlayerProgress,
): PlayerProgress {
  const nextProgress = updater(readStoredProgress());
  writeStoredProgress(nextProgress);
  return nextProgress;
}

export function dispatchGameEvent(event: GameEvent) {
  return updateStoredProgress((progress) => applyGameEvent(progress, event));
}

export function dispatchGameEvents(events: GameEvent[]) {
  return updateStoredProgress((progress) =>
    events.reduce((nextProgress, event) => applyGameEvent(nextProgress, event), progress),
  );
}

export function recordLessonCompletion(input: {
  runId: string;
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
}) {
  return dispatchGameEvent({
    id: input.runId,
    type: "lesson.completed",
    payload: {
      runId: input.runId,
      lessonId: input.lessonId,
      kingdomId: input.kingdomId,
      countryId: input.countryId,
      modeUsed: input.modeUsed ?? "explorer",
      occurredAt: input.completedAt ?? new Date().toISOString(),
      correctAnswers: input.correctAnswers ?? 0,
      totalAnswers: input.totalAnswers ?? 0,
      hintsUsed: input.hintsUsed ?? 0,
      bestStreak: input.bestStreak ?? 0,
      firstTryCount: input.firstTryCount ?? 0,
      gemsEarned: input.gemsEarned ?? 0,
      xpEarned: input.xpEarned ?? 0,
    },
  });
}

export function claimQuest(questId: string, occurredAt = new Date().toISOString()) {
  const event: QuestClaimedEvent = {
    id: `quest-claimed:${questId}:${occurredAt}`,
    type: "quest.claimed",
    payload: {
      questId,
      occurredAt,
    },
  };

  return dispatchGameEvent(event);
}

export function unlockCosmetic(
  cosmeticId: string,
  options?: { occurredAt?: string; sourceLessonId?: string | null; sourceRunId?: string | null },
) {
  const occurredAt = options?.occurredAt ?? new Date().toISOString();
  const event: CosmeticUnlockedEvent = {
    id: `cosmetic-unlocked:${cosmeticId}:${occurredAt}`,
    type: "cosmetic.unlocked",
    payload: {
      cosmeticId,
      occurredAt,
      sourceLessonId: options?.sourceLessonId ?? null,
      sourceRunId: options?.sourceRunId ?? null,
    },
  };

  return dispatchGameEvent(event);
}
