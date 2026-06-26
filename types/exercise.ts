export type ExerciseDifficulty = "A1";
export type ExerciseType =
  | "pronoun-choice"
  | "possessive-choice"
  | "article-choice"
  | "case-form"
  | "phrase-choice"
  | "question-word"
  | "ending-choice";

export type Exercise = {
  id: string;
  lessonId: string;
  grammarSkillIds?: string[];
  type?: ExerciseType;
  prompt: string;
  noun: string;
  supportText?: string;
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
