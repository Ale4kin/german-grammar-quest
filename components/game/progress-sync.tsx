"use client";

import { useEffect } from "react";
import { dispatchGameEvent, recordLessonCompletion } from "@/lib/game/storage";
import type { GameModeId } from "@/types";

type ProgressSyncProps = {
  runId?: string;
  lessonId: string;
  kingdomId: string;
  countryId: string;
  modeUsed?: GameModeId;
  correctAnswers?: number;
  totalAnswers?: number;
  hintsUsed?: number;
  bestStreak?: number;
  firstTryCount?: number;
  gemsEarned?: number;
  xpEarned?: number;
};

export function ProgressSync({
  runId,
  lessonId,
  kingdomId,
  countryId,
  modeUsed,
  correctAnswers,
  totalAnswers,
  hintsUsed,
  bestStreak,
  firstTryCount,
  gemsEarned,
  xpEarned,
}: ProgressSyncProps) {
  useEffect(() => {
    if (!runId) {
      return;
    }

    dispatchGameEvent({
      id: `lesson-started:${runId}`,
      type: "lesson.started",
      payload: {
        lessonId,
        kingdomId,
        countryId,
        modeUsed: modeUsed ?? "explorer",
        occurredAt: new Date().toISOString(),
      },
    });

    recordLessonCompletion({
      runId,
      lessonId,
      kingdomId,
      countryId,
      modeUsed,
      correctAnswers,
      totalAnswers,
      hintsUsed,
      bestStreak,
      firstTryCount,
      gemsEarned,
      xpEarned,
    });
  }, [
    bestStreak,
    correctAnswers,
    countryId,
    firstTryCount,
    gemsEarned,
    hintsUsed,
    kingdomId,
    lessonId,
    modeUsed,
    runId,
    totalAnswers,
    xpEarned,
  ]);

  return null;
}
