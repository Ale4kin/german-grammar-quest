"use client";

import { useEffect } from "react";
import { recordLessonCompletion } from "@/lib/progress-storage";

type ProgressSyncProps = {
  runId?: string;
  lessonId: string;
  kingdomId: string;
  countryId: string;
  correctAnswers?: number;
  totalAnswers?: number;
  hintsUsed?: number;
  bestStreak?: number;
  gemsEarned?: number;
  xpEarned?: number;
};

export function ProgressSync({
  runId,
  lessonId,
  kingdomId,
  countryId,
  correctAnswers,
  totalAnswers,
  hintsUsed,
  bestStreak,
  gemsEarned,
  xpEarned,
}: ProgressSyncProps) {
  useEffect(() => {
    recordLessonCompletion({
      runId,
      lessonId,
      kingdomId,
      countryId,
      correctAnswers,
      totalAnswers,
      hintsUsed,
      bestStreak,
      gemsEarned,
      xpEarned,
    });
  }, [
    bestStreak,
    correctAnswers,
    countryId,
    gemsEarned,
    hintsUsed,
    kingdomId,
    lessonId,
    runId,
    totalAnswers,
    xpEarned,
  ]);

  return null;
}
