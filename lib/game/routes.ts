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
  runType?: "lesson" | "review";
  gems: number;
  correct: number;
  total: number;
  streak: number;
  bestStreak: number;
  hints: number;
  firstTryCount: number;
  incorrectExerciseIds?: string[];
}): string {
  const searchParams = new URLSearchParams({
    lessonId: params.lessonId,
    mode: params.modeId,
    runType: params.runType ?? "lesson",
    gems: String(params.gems),
    correct: String(params.correct),
    total: String(params.total),
    streak: String(params.streak),
    bestStreak: String(params.bestStreak),
    hints: String(params.hints),
    firstTryCount: String(params.firstTryCount),
  });

  if (params.runId) {
    searchParams.set("runId", params.runId);
  }

  if (params.incorrectExerciseIds?.length) {
    searchParams.set("incorrectExerciseIds", params.incorrectExerciseIds.join(","));
  }

  return `/result?${searchParams.toString()}`;
}
