import type { ExerciseDifficulty } from "@/types/exercise";

export type Kingdom = {
  id: string;
  name: string;
  description: string;
  sortOrder: number;
};

export type Country = {
  id: string;
  kingdomId: string;
  name: string;
  description: string;
  sortOrder: number;
};

export type Lesson = {
  id: string;
  kingdomId: string;
  countryId: string;
  title: string;
  description: string;
  difficulty: ExerciseDifficulty;
  sortOrder: number;
  grammarRuleTitle: string;
  grammarRuleSummary: string;
  grammarRuleExamples: {
    article: string;
    label: string;
    example: string;
  }[];
  grammarNotes?: string[];
  learningTip: string;
};
