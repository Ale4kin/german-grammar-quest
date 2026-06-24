import type { GameModeId } from "@/types/game-mode";

export type LessonStartedEvent = {
  id: string;
  type: "lesson.started";
  payload: {
    lessonId: string;
    kingdomId: string;
    countryId: string;
    modeUsed: GameModeId;
    occurredAt: string;
  };
};

export type AnswerSubmittedEvent = {
  id: string;
  type: "answer.submitted";
  payload: {
    runId: string;
    lessonId: string;
    kingdomId: string;
    countryId: string;
    exerciseId: string;
    grammarSkillIds: string[];
    modeUsed: GameModeId;
    occurredAt: string;
    isCorrect: boolean;
    usedHint: boolean;
    streakAfterAnswer: number;
    gemsEarned: number;
    bonusGemsEarned: number;
  };
};

export type LessonCompletedEvent = {
  id: string;
  type: "lesson.completed";
  payload: {
    runId: string;
    lessonId: string;
    kingdomId: string;
    countryId: string;
    modeUsed: GameModeId;
    occurredAt: string;
    correctAnswers: number;
    totalAnswers: number;
    hintsUsed: number;
    bestStreak: number;
    firstTryCount: number;
    gemsEarned: number;
    xpEarned: number;
  };
};

export type QuestClaimedEvent = {
  id: string;
  type: "quest.claimed";
  payload: {
    questId: string;
    occurredAt: string;
  };
};

export type CosmeticUnlockedEvent = {
  id: string;
  type: "cosmetic.unlocked";
  payload: {
    cosmeticId: string;
    occurredAt: string;
    sourceLessonId?: string | null;
  };
};

export type GameEvent =
  | LessonStartedEvent
  | AnswerSubmittedEvent
  | LessonCompletedEvent
  | QuestClaimedEvent
  | CosmeticUnlockedEvent;
