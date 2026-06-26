import { getGameMode } from "@/data/game-modes";
import type { GameMode, GameModeId } from "@/types";

export function resolveGameModeId(mode?: string): GameModeId {
  const defaultModeId: GameModeId = "explorer";
  return mode === defaultModeId ? mode : defaultModeId;
}

export function resolveGameMode(mode?: string): GameMode {
  return getGameMode(resolveGameModeId(mode));
}
