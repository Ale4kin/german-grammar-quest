"use client";

import { useEffect, useState } from "react";
import { getLessonRankChipClass, getLessonRankLabel } from "@/lib/game/ranks";
import { readStoredProgress } from "@/lib/game/storage";
import type { LessonRank } from "@/types";

type LessonRankChipProps = {
  lessonId: string;
  prefix?: string;
  showWhenEmpty?: boolean;
  emptyLabel?: string;
};

export function LessonRankChip({
  lessonId,
  prefix,
  showWhenEmpty = false,
  emptyLabel = "No rank yet",
}: LessonRankChipProps) {
  const [bestRank, setBestRank] = useState<LessonRank | null>(null);

  useEffect(() => {
    const syncState = () => {
      const progress = readStoredProgress();
      setBestRank(progress.lessonBestScores[lessonId]?.bestRank ?? null);
    };

    syncState();
    window.addEventListener("storage", syncState);

    return () => {
      window.removeEventListener("storage", syncState);
    };
  }, [lessonId]);

  if (!bestRank && !showWhenEmpty) {
    return null;
  }

  const label = bestRank ? getLessonRankLabel(bestRank) : emptyLabel;

  return (
    <span
      className={[
        "quest-chip px-2.5 py-1 text-xs",
        bestRank ? getLessonRankChipClass(bestRank) : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {prefix ? `${prefix}: ${label}` : label}
    </span>
  );
}
