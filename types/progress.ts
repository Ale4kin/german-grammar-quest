export type UserProgress = {
  selectedAvatarId: string | null;
  activeKingdomId: string | null;
  activeCountryId: string | null;
  currentLessonId: string | null;
  completedLessonIds: string[];
  completedExerciseIds: string[];
  gems: number;
  streak: number;
  correctAnswers: number;
  hintUses: number;
};

// Kept as an alias so the current MVP can migrate incrementally.
export type GameProgress = UserProgress;
