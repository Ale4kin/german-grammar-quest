"use client";

import { useMemo, useState } from "react";
import type { GameMode, GameModeId } from "@/types";

const modeIcons: Record<GameModeId, string> = {
  explorer: "🧭",
  adventurer: "🗡️",
  master: "👑",
};

type ModeSelectorProps = {
  activeModeId: GameModeId;
  modes: GameMode[];
};

export function ModeSelector({ activeModeId, modes }: ModeSelectorProps) {
  const [hoveredModeId, setHoveredModeId] = useState<GameModeId | null>(null);
  const [pinnedModeId, setPinnedModeId] = useState<GameModeId | null>(null);

  const displayedMode = useMemo(() => {
    const selectedModeId = hoveredModeId ?? pinnedModeId;
    return selectedModeId
      ? modes.find((mode) => mode.id === selectedModeId) ?? null
      : null;
  }, [hoveredModeId, modes, pinnedModeId]);

  return (
    <section className="rounded-[24px] bg-white/72 p-5">
      <p className="quest-kicker">Mode setting</p>
      <h2 className="mt-3 quest-panel-title">Current lesson mode</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        Explorer is on by default. Hover over a mode or click it to inspect its rules.
      </p>

      <div className="mt-5 grid gap-3">
        {modes.map((mode) => {
          const isActive = mode.id === activeModeId;
          const isDisplayed = mode.id === displayedMode?.id;
          const isLocked = mode.status === "coming-soon";

          return (
            <button
              key={mode.id}
              type="button"
              onMouseEnter={() => setHoveredModeId(mode.id)}
              onMouseLeave={() => setHoveredModeId(null)}
              onFocus={() => setHoveredModeId(mode.id)}
              onBlur={() => setHoveredModeId(null)}
              onClick={() => setPinnedModeId(mode.id)}
              className={`quest-mode-card text-left ${
                isActive
                  ? "quest-mode-card-active"
                  : isLocked
                    ? "quest-mode-card-locked"
                    : ""
              } ${isDisplayed ? "quest-mode-card-preview" : ""}`}
              aria-pressed={isDisplayed}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="quest-mode-icon" aria-hidden="true">
                    {modeIcons[mode.id]}
                  </span>
                  <div>
                    <p className="text-sm font-black text-slate-800">{mode.name}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      {isActive
                        ? "Mode on"
                        : isLocked
                          ? "Not available yet"
                          : "Available"}
                    </p>
                  </div>
                </div>
                <span
                  className={`quest-mode-status ${
                    isActive ? "quest-mode-status-active" : "quest-mode-status-locked"
                  }`}
                >
                  {isActive ? "On" : "Soon"}
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-600">{mode.summary}</p>
            </button>
          );
        })}
      </div>

      {displayedMode ? (
        <div className="mt-5 rounded-[24px] border border-emerald-100 bg-gradient-to-br from-emerald-50/95 via-white/90 to-amber-50/80 p-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="quest-mode-icon" aria-hidden="true">
              {modeIcons[displayedMode.id]}
            </span>
            <div>
              <p className="text-lg font-black text-slate-800">
                {displayedMode.name}
                {displayedMode.id === activeModeId ? " mode is currently on" : " mode preview"}
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600">{displayedMode.tagline}</p>
            </div>
          </div>

          <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
            {displayedMode.rules.map((rule) => (
              <li key={rule}>• {rule}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
