"use client";

import { useEffect, useMemo, useState } from "react";
import { StatCard } from "@/components/ui/stat-card";
import { claimQuest, readStoredProgress } from "@/lib/game/storage";
import { getDailyQuestStateView } from "@/lib/game/evaluators";
import { getLevelProgress } from "@/lib/game/player-progress";
import type { PlayerProgress } from "@/types";

function createEmptyProgress(): PlayerProgress | null {
  return null;
}

export function MapProgressPanel() {
  const [progress, setProgress] = useState<PlayerProgress | null>(createEmptyProgress());

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

  const today = new Date();
  const levelProgress = progress ? getLevelProgress(progress.xp) : null;
  const dailyQuestView = useMemo(
    () => (progress ? getDailyQuestStateView(progress, today) : null),
    [progress, today],
  );
  const completedTrophies =
    progress ? Object.values(progress.kingdomProgress).filter((kingdom) => kingdom.isCompleted).length : 0;
  const goldTrophies =
    progress ? Object.values(progress.kingdomProgress).filter((kingdom) => kingdom.trophyTier === "gold").length : 0;

  if (!progress || !levelProgress || !dailyQuestView) {
    return null;
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
      <section className="quest-card p-5 sm:p-6">
        <p className="quest-kicker">Player progress</p>
        <h2 className="mt-3 quest-panel-title">Level {levelProgress.level}</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {levelProgress.nextLevel
            ? `${levelProgress.currentLevelXp} / ${levelProgress.requiredXp} XP to Level ${levelProgress.nextLevel}.`
            : "Top level reached for the current progression table."}
        </p>
        <div
          className="quest-progress-track mt-4"
          role="progressbar"
          aria-label="Level progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(levelProgress.progressPercent)}
          aria-valuetext={
            levelProgress.nextLevel
              ? `${levelProgress.currentLevelXp} of ${levelProgress.requiredXp} XP toward Level ${levelProgress.nextLevel}`
              : "Top level reached"
          }
        >
          <div
            className="quest-progress-fill transition-all"
            style={{ width: `${levelProgress.progressPercent}%` }}
          />
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-4">
          <StatCard label="XP" value={progress.xp} />
          <StatCard label="Badges" value={progress.unlockedBadges.length} />
          <StatCard label="Trophies" value={completedTrophies} />
          <StatCard label="Gold kingdoms" value={goldTrophies} />
        </div>
      </section>

      <section className="quest-card p-5 sm:p-6">
        <p className="quest-kicker">Daily quests</p>
        <h2 className="mt-3 quest-panel-title">Today&apos;s missions</h2>
        <div className="mt-5 grid gap-3">
          {dailyQuestView.definitions.map((quest) => {
            const questState = dailyQuestView.quests[quest.id];
            const canClaim = questState.completed && !questState.claimed;

            return (
              <div key={quest.id} className="rounded-[20px] bg-white/78 p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-black text-slate-800">{quest.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Progress {questState.progress} / {questState.target}
                    </p>
                  </div>
                  <span className="quest-chip quest-chip-gem px-2.5 py-1 text-xs">
                    +{quest.rewardGems}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    {questState.claimed
                      ? "Claimed"
                      : questState.completed
                        ? "Ready to claim"
                        : "In progress"}
                  </span>
                  {canClaim ? (
                    <button
                      type="button"
                      onClick={() => {
                        claimQuest(quest.id);
                        setProgress(readStoredProgress());
                      }}
                      className="quest-button-primary px-4 py-2 text-sm"
                    >
                      Claim
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
