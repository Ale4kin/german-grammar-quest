import { mockCountries } from "@/data/countries";
import { getExerciseById as getTopicExerciseById, getExercisesByLesson as getTopicExercisesByLesson } from "@/data/exercises/topics";
import { mockKingdoms } from "@/data/kingdoms";
import { mockLessons } from "@/data/lessons";
import { rewardRules } from "@/data/reward-rules";
import type {
  Country,
  Exercise,
  ExerciseRoundResult,
  GameProgress,
  Kingdom,
  Lesson,
} from "@/types";

export function getKingdomById(kingdomId: string): Kingdom | undefined {
  return mockKingdoms.find((kingdom) => kingdom.id === kingdomId);
}

export function getCountryById(countryId: string): Country | undefined {
  return mockCountries.find((country) => country.id === countryId);
}

export function getLessonById(lessonId: string): Lesson | undefined {
  return mockLessons.find((lesson) => lesson.id === lessonId);
}

export function getExerciseById(exerciseId: string): Exercise | undefined {
  return getTopicExerciseById(exerciseId);
}

export function getExercisesByLesson(lessonId: string): Exercise[] {
  return getTopicExercisesByLesson(lessonId);
}

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

export function scoreAnswer(isCorrect: boolean, usedHint: boolean, nextStreak: number) {
  if (!isCorrect) {
    return {
      gemsEarned: rewardRules.wrongAnswerGems,
      bonusGemsEarned: 0,
    };
  }

  const gemsEarned = usedHint ? rewardRules.correctWithHintGems : rewardRules.correctWithoutHintGems;
  const bonusGemsEarned =
    nextStreak > 0 && nextStreak % rewardRules.streakBonusThreshold === 0 ? rewardRules.streakBonusGems : 0;

  return {
    gemsEarned,
    bonusGemsEarned,
  };
}

export function buildProgressFromResults(results: ExerciseRoundResult[], lessonId: string): GameProgress {
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
