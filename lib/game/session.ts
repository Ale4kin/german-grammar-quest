import { rewardRules } from "@/data/game-rules";
import type { ExerciseRoundResult, ExerciseRunType, GameProgress, StreakMilestone } from "@/types";
import { getLessonById } from "@/lib/game/curriculum";
import { mockLessons } from "@/data/lessons";

export function createInitialProgress(): GameProgress {
  const firstLesson = mockLessons[0];

  return {
    selectedAvatarId: null,
    activeKingdomId: firstLesson?.kingdomId ?? null,
    activeCountryId: firstLesson?.countryId ?? null,
    currentLessonId: firstLesson?.id ?? null,
    completedLessonIds: [],
    completedExerciseIds: [],
    gems: 0,
    streak: 0,
    correctAnswers: 0,
    hintUses: 0,
  };
}

export function scoreAnswer(
  isCorrect: boolean,
  usedHint: boolean,
  nextStreak: number,
  runType: ExerciseRunType = "lesson",
) {
  if (!isCorrect) {
    return {
      gemsEarned: rewardRules.wrongAnswerGems,
      bonusGemsEarned: 0,
    };
  }

  const gemsEarned = usedHint
    ? runType === "review"
      ? rewardRules.reviewCorrectWithHintGems
      : rewardRules.correctWithHintGems
    : runType === "review"
      ? rewardRules.reviewCorrectWithoutHintGems
      : rewardRules.correctWithoutHintGems;
  const bonusGemsEarned =
    nextStreak > 0 && nextStreak % rewardRules.streakBonusThreshold === 0
      ? runType === "review"
        ? rewardRules.reviewStreakBonusGems
        : rewardRules.streakBonusGems
      : 0;

  return {
    gemsEarned,
    bonusGemsEarned,
  };
}

export function getUnlockedStreakMilestones(streak: number): StreakMilestone[] {
  return rewardRules.streakMilestones.filter((milestone) => streak >= milestone.streak);
}

export function getNextStreakMilestone(streak: number): StreakMilestone | undefined {
  return rewardRules.streakMilestones.find((milestone) => streak < milestone.streak);
}

export function getRemainingAnswersForMilestone(streak: number, targetStreak: number): number {
  return Math.max(targetStreak - streak, 0);
}

export function buildProgressFromResults(
  results: ExerciseRoundResult[],
  lessonId: string,
): GameProgress {
  const lesson = getLessonById(lessonId);

  return results.reduce(
    (progress, result) => {
      return {
        ...progress,
        activeKingdomId: lesson?.kingdomId ?? progress.activeKingdomId,
        activeCountryId: lesson?.countryId ?? progress.activeCountryId,
        currentLessonId: lessonId,
        completedExerciseIds: [...progress.completedExerciseIds, result.exerciseId],
        gems: progress.gems + result.gemsEarned + result.bonusGemsEarned,
        streak: result.streakAfterAnswer,
        correctAnswers: progress.correctAnswers + (result.isCorrect ? 1 : 0),
        hintUses: progress.hintUses + (result.usedHint ? 1 : 0),
      };
    },
    {
      ...createInitialProgress(),
      activeKingdomId: lesson?.kingdomId ?? null,
      activeCountryId: lesson?.countryId ?? null,
      currentLessonId: lessonId,
    },
  );
}
