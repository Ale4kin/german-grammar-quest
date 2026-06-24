"use client";

import {
  applyLessonCompletion,
  createPlayerProgress,
  migratePlayerProgress,
} from "@/lib/player-progress";
import type { PlayerProgress } from "@/types";

const PROGRESS_STORAGE_KEY = "german-grammar-quest-progress";

export function readStoredProgress(): PlayerProgress {
  if (typeof window === "undefined") {
    return createPlayerProgress();
  }

  const rawValue = window.localStorage.getItem(PROGRESS_STORAGE_KEY);

  if (!rawValue) {
    return createPlayerProgress();
  }

  try {
    return migratePlayerProgress(JSON.parse(rawValue));
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

export function recordLessonCompletion(input: {
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
}) {
  return updateStoredProgress((progress) =>
    applyLessonCompletion(progress, input),
  );
}
