"use client";

import { useEffect, useState } from "react";
import { readStoredProgress } from "@/lib/progress-storage";

type LessonCompletionChipProps = {
  lessonId: string;
};

export function LessonCompletionChip({ lessonId }: LessonCompletionChipProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const syncState = () => {
      const progress = readStoredProgress();
      setIsCompleted(progress.completedLessonIds.includes(lessonId));
    };

    syncState();
    window.addEventListener("storage", syncState);

    return () => {
      window.removeEventListener("storage", syncState);
    };
  }, [lessonId]);

  if (!isCompleted) {
    return null;
  }

  return <span className="quest-chip bg-emerald-100 font-bold text-emerald-900">Completed</span>;
}
