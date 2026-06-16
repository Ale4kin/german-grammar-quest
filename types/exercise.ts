export type ExerciseDifficulty = "A1";

export type Exercise = {
  id: string;
  lessonId: string;
  prompt: string;
  noun: string;
  options: string[];
  correctAnswer: string;
  hint: string;
  explanation: string;
  difficulty: ExerciseDifficulty;
};

export type ExerciseRoundResult = {
  exerciseId: string;
  selectedAnswer: string;
  isCorrect: boolean;
  usedHint: boolean;
  gemsEarned: number;
  streakAfterAnswer: number;
  bonusGemsEarned: number;
};
