export type GameModeId = "explorer" | "adventurer" | "master";

export type GameModeStatus = "available" | "coming-soon";

export type GameMode = {
  id: GameModeId;
  name: string;
  status: GameModeStatus;
  summary: string;
  tagline: string;
  rules: string[];
};
