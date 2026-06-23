import type { GameMode, GameModeId } from "@/types";

export const gameModes: GameMode[] = [
  {
    id: "explorer",
    name: "Explorer",
    status: "available",
    summary: "Hints available · relaxed scoring · beginner-friendly",
    tagline: "Easy mode for guided learning and steady progress.",
    rules: [
      "Hints are available.",
      "No penalty for mistakes.",
      "Correct after hint: +5 gems.",
      "Correct without hint: +15 gems.",
      "Streak bonus after 3 correct answers without hints.",
      "Explanations appear after every answer.",
    ],
  },
  {
    id: "adventurer",
    name: "Adventurer",
    status: "coming-soon",
    summary: "Limited hints · tighter scoring · mixed prompts",
    tagline: "Medium mode with more pressure and fewer safety nets.",
    rules: [
      "Hints limited to 3 per lesson.",
      "Wrong answers give no gems and reset the streak.",
      "Questions include short sentences, not only single nouns.",
      "Bonus for finishing without hints.",
    ],
  },
  {
    id: "master",
    name: "Master",
    status: "coming-soon",
    summary: "No pre-answer hints · more options · high completion bar",
    tagline: "Hard mode for accuracy, speed, and stronger rewards.",
    rules: [
      "No hints before answering.",
      "More answer options.",
      "Need 80%+ to complete.",
      "Bigger reward payout.",
    ],
  },
];

export function getGameMode(modeId: GameModeId = "explorer"): GameMode {
  return gameModes.find((mode) => mode.id === modeId) ?? gameModes[0];
}
