"use client";

import { useEffect, useMemo, useState } from "react";
import { StatCard } from "@/components/ui/stat-card";
import { badgeDefinitions } from "@/data/game-rules";
import { readStoredProgress } from "@/lib/game/storage";
import { getLevelProgress } from "@/lib/game/player-progress";
import type { PlayerProgress } from "@/types";

export function ProfileOverview() {
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

  const levelProgress = progress ? getLevelProgress(progress.xp) : null;
  const unlockedBadgeIds = useMemo(
    () => new Set(progress?.unlockedBadges.map((badge) => badge.id) ?? []),
    [progress],
  );
  const unlockedBadges = badgeDefinitions.filter((badge) => unlockedBadgeIds.has(badge.id));

  if (!progress || !levelProgress) {
    return null;
  }

  return (
    <section className="quest-content grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
      <div className="quest-card p-6 sm:p-7">
        <p className="quest-kicker">Profile</p>
        <h1 className="mt-3 quest-title text-4xl sm:text-5xl">Player progress</h1>
        <p className="mt-3 quest-subtitle max-w-2xl">
          Track level growth, streak consistency, and unlocked achievements in one place.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          <StatCard label="Level" value={levelProgress.level} />
          <StatCard label="XP" value={progress.xp} />
          <StatCard label="Daily streak" value={progress.dailyStreak} />
          <StatCard label="Gems" value={progress.gems} />
        </div>

        <div className="mt-6">
          <div className="quest-progress-track">
            <div
              className="quest-progress-fill transition-all"
              style={{ width: `${levelProgress.progressPercent}%` }}
            />
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {levelProgress.nextLevel
              ? `${levelProgress.currentLevelXp} / ${levelProgress.requiredXp} XP to Level ${levelProgress.nextLevel}.`
              : "Top level reached for the current progression table."}
          </p>
        </div>
      </div>

      <aside className="quest-card p-6 sm:p-7">
        <p className="quest-kicker">Badges</p>
        <h2 className="mt-3 quest-panel-title">Unlocked achievements</h2>
        <div className="mt-5 grid gap-3">
          {unlockedBadges.length > 0 ? (
            unlockedBadges.map((badge) => (
              <div key={badge.id} className="rounded-[20px] bg-white/78 p-4 shadow-sm">
                <p className="text-sm font-black text-slate-800">{badge.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{badge.description}</p>
              </div>
            ))
          ) : (
            <div className="rounded-[20px] bg-white/78 p-4 text-sm leading-6 text-slate-600">
              Finish lessons and chain clean runs to start unlocking badges.
            </div>
          )}
        </div>
      </aside>
    </section>
  );
}
