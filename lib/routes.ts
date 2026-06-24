import type { GameModeId } from "@/types";

export function buildLessonHref(lessonId: string, modeId: GameModeId = "explorer"): string {
  return `/lesson/${lessonId}?mode=${modeId}`;
}

export function buildExerciseHref(
  exerciseId: string,
  modeId: GameModeId = "explorer",
): string {
  return `/exercise/${exerciseId}?mode=${modeId}`;
}

export function buildResultHref(params: {
  runId?: string;
  lessonId: string;
  modeId: GameModeId;
  gems: number;
  correct: number;
  total: number;
  streak: number;
  bestStreak: number;
  hints: number;
}): string {
  const searchParams = new URLSearchParams({
    lessonId: params.lessonId,
    mode: params.modeId,
    gems: String(params.gems),
    correct: String(params.correct),
    total: String(params.total),
    streak: String(params.streak),
    bestStreak: String(params.bestStreak),
    hints: String(params.hints),
  });

  if (params.runId) {
    searchParams.set("runId", params.runId);
  }

  return `/result?${searchParams.toString()}`;
}
