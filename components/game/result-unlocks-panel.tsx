"use client";

import { useEffect, useMemo, useState } from "react";
import { badgeDefinitions } from "@/data/game-rules";
import { cosmeticDefinitions } from "@/data/cosmetics";
import { readStoredProgress } from "@/lib/game/storage";
import type { PlayerProgress } from "@/types";

type ResultUnlocksPanelProps = {
  runId?: string;
};

export function ResultUnlocksPanel({ runId }: ResultUnlocksPanelProps) {
  const [progress, setProgress] = useState<PlayerProgress | null>(null);

  useEffect(() => {
    const syncState = () => {
      setProgress(readStoredProgress());
    };

    syncState();
    window.addEventListener("storage", syncState);
    window.addEventListener("focus", syncState);

    return () => {
      window.removeEventListener("storage", syncState);
      window.removeEventListener("focus", syncState);
    };
  }, []);

  const unlocks = useMemo(() => {
    if (!progress || !runId) {
      return { badges: [], cosmetics: [] };
    }

    const badgeIds = new Set(
      progress.unlockedBadges
        .filter((badge) => badge.sourceRunId === runId)
        .map((badge) => badge.id),
    );
    const cosmeticIds = new Set(
      progress.unlockedCosmetics
        .filter((cosmetic) => cosmetic.sourceRunId === runId)
        .map((cosmetic) => cosmetic.id),
    );

    return {
      badges: badgeDefinitions.filter((badge) => badgeIds.has(badge.id)),
      cosmetics: cosmeticDefinitions.filter((cosmetic) => cosmeticIds.has(cosmetic.id)),
    };
  }, [progress, runId]);

  if (unlocks.badges.length === 0 && unlocks.cosmetics.length === 0) {
    return null;
  }

  return (
    <div className="mt-5 rounded-[24px] bg-white/72 p-5">
      <p className="quest-kicker">Unlocks</p>
      <h2 className="mt-3 quest-panel-title">Unlocked in this run</h2>
      <div className="mt-4 grid gap-3">
        {unlocks.badges.map((badge) => (
          <div key={badge.id} className="rounded-[20px] border border-emerald-200 bg-emerald-50/70 p-4">
            <p className="text-sm font-black text-slate-800">🏅 {badge.title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{badge.description}</p>
          </div>
        ))}
        {unlocks.cosmetics.map((cosmetic) => (
          <div key={cosmetic.id} className="rounded-[20px] border border-amber-200 bg-amber-50/70 p-4">
            <p className="text-sm font-black text-slate-800">
              {cosmetic.emoji} {cosmetic.name}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{cosmetic.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
