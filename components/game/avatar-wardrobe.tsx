"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { StatCard } from "@/components/ui/stat-card";
import { avatarCosmetics } from "@/data/cosmetics";
import { readStoredProgress } from "@/lib/game/storage";
import type { PlayerProgress } from "@/types";

function getUnlockLabel(
  condition: (typeof avatarCosmetics)[number]["unlockCondition"],
): string {
  switch (condition.type) {
    case "free":
      return "Free";
    case "gems":
      return `Unlock at ${condition.minGems} gems`;
    case "badge":
      return `Unlock with badge: ${condition.badgeId}`;
    case "kingdom-complete":
      return `Unlock by completing kingdom: ${condition.kingdomId}`;
    default:
      return "Locked";
  }
}

type AvatarWardrobeProps = {
  showHeader?: boolean;
};

export function AvatarWardrobe({ showHeader = true }: AvatarWardrobeProps) {
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

  const unlockedIds = useMemo(
    () => new Set(progress?.unlockedCosmetics.map((cosmetic) => cosmetic.id) ?? []),
    [progress],
  );
  const unlockedCount = avatarCosmetics.filter((avatar) => unlockedIds.has(avatar.id)).length;

  return (
    <>
      {showHeader ? (
        <header className="quest-content grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="quest-card p-6 sm:p-7">
            <p className="quest-kicker">Avatar wardrobe</p>
            <h1 className="mt-3 quest-title text-4xl sm:text-5xl">Profile avatar selection</h1>
            <p className="mt-3 quest-subtitle max-w-2xl">
              Choose an unlocked avatar now. Future cosmetics unlock from gems, badges, and kingdom trophies.
            </p>
          </div>

          <aside className="quest-card p-6 sm:p-7">
            <p className="quest-kicker">Unlock overview</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <StatCard label="Available now" value={unlockedCount} />
              <StatCard label="Locked" value={avatarCosmetics.length - unlockedCount} />
              <StatCard label="Total styles" value={avatarCosmetics.length} />
            </div>
          </aside>
        </header>
      ) : (
        <section className="quest-content quest-card p-6 sm:p-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="quest-kicker">Cosmetics</p>
              <h2 className="mt-2 quest-panel-title">Avatar wardrobe</h2>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <StatCard label="Ready" value={unlockedCount} valueClassName="mt-1 text-2xl font-black text-slate-800" />
              <StatCard label="Locked" value={avatarCosmetics.length - unlockedCount} valueClassName="mt-1 text-2xl font-black text-slate-800" />
              <StatCard label="Total" value={avatarCosmetics.length} valueClassName="mt-1 text-2xl font-black text-slate-800" />
            </div>
          </div>
        </section>
      )}

      <section className="quest-content grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {avatarCosmetics.map((avatar) => {
          const isUnlocked = unlockedIds.has(avatar.id);

          return (
            <article
              key={avatar.id}
              className="quest-card relative overflow-hidden p-5 transition hover:-translate-y-1 sm:p-6"
            >
              <div className="absolute right-4 top-4 rounded-full bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                {isUnlocked ? "Ready" : "Locked"}
              </div>
              <div className="rounded-[26px] bg-gradient-to-br from-amber-50 via-orange-50 to-emerald-50 p-5 text-center shadow-inner">
                <div className="text-6xl">{avatar.emoji}</div>
              </div>
              <h2 className="mt-5 text-xl font-black text-slate-800">{avatar.name}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{avatar.description}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-sm font-semibold text-slate-600">
                <span className="quest-chip px-2.5 py-1 text-xs">Profile cosmetic</span>
                <span className="quest-chip px-2.5 py-1 text-xs">
                  {getUnlockLabel(avatar.unlockCondition)}
                </span>
              </div>
              {isUnlocked ? (
                <Link href={`/map?avatar=${avatar.id}`} className="quest-button-primary mt-5 w-full">
                  Use on map
                </Link>
              ) : (
                <button
                  type="button"
                  disabled
                  className="quest-button-secondary mt-5 w-full cursor-not-allowed opacity-70"
                >
                  Not unlocked yet
                </button>
              )}
            </article>
          );
        })}
      </section>
    </>
  );
}
