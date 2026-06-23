import Link from "next/link";
import { gameModes, getGameMode } from "@/data/game-modes";
import { topicsMockExercises } from "@/data/exercises/topics";
import { mockKingdoms } from "@/data/kingdoms";
import { mockLessons } from "@/data/lessons";
import { rewardRules } from "@/data/reward-rules";

const quickLinks = [
  {
    href: "/map",
    title: "Continue on the map",
    description: "Browse worlds, topics, and ready lessons in sequence.",
  },
  {
    href: "/avatar",
    title: "Choose an avatar",
    description: "Preview the profile cosmetics tied to gem rewards.",
  },
];

export default function LandingPage() {
  const totalRewardPreview =
    topicsMockExercises.length * rewardRules.correctWithoutHintGems;
  const explorerMode = getGameMode("explorer");

  return (
    <main className="quest-page justify-center">
      <section className="quest-content grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="quest-card p-6 sm:p-8">
          <div className="flex flex-wrap gap-3">
            <span className="quest-chip">Learning dashboard</span>
            <span className="quest-chip quest-chip-gem">
              💎 up to {totalRewardPreview} gems in the active pack
            </span>
            <span className="quest-chip quest-chip-streak">
              🔥 streak bonus every {rewardRules.streakBonusThreshold} correct
            </span>
          </div>

          <div className="mt-6 space-y-4">
            <p className="quest-kicker">Study flow</p>
            <h1 className="quest-title">
              A clearer front door for the grammar journey.
            </h1>
            <p className="quest-subtitle max-w-2xl">
              The app now has enough structure to behave like a study product:
              world map, lesson briefing, guided exercise run, rewards, and
              avatar unlocks.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/map" className="quest-button-primary">
              Open study map
            </Link>
            <Link href="/lesson/a1-articles?mode=explorer" className="quest-button-secondary">
              Jump to active lesson
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="quest-stat-card">
              <p className="text-sm text-slate-500">Worlds</p>
              <p className="mt-1 text-3xl font-black text-slate-800">
                {mockKingdoms.length}
              </p>
            </div>
            <div className="quest-stat-card">
              <p className="text-sm text-slate-500">Lessons</p>
              <p className="mt-1 text-3xl font-black text-slate-800">
                {mockLessons.length}
              </p>
            </div>
            <div className="quest-stat-card">
              <p className="text-sm text-slate-500">Playable exercises</p>
              <p className="mt-1 text-3xl font-black text-slate-800">
                {topicsMockExercises.length}
              </p>
            </div>
          </div>
        </div>

        <aside className="quest-card p-6">
          <p className="quest-kicker">Mode system</p>
          <h2 className="mt-3 quest-panel-title">Current playable mode</h2>
          <div className="mt-5 grid gap-3">
            <div className="quest-stat-card">
              <p className="text-sm font-bold text-slate-800">Mode: {explorerMode.name}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {explorerMode.summary}
              </p>
            </div>
            {gameModes
              .filter((mode) => mode.id !== "explorer")
              .map((mode) => (
                <div key={mode.id} className="quest-stat-card">
                  <p className="text-sm font-bold text-slate-800">
                    {mode.name} - coming soon
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {mode.summary}
                  </p>
                </div>
              ))}
          </div>
        </aside>
      </section>

      <section className="quest-content grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="quest-card p-6">
          <p className="quest-kicker">Workflow</p>
          <h2 className="mt-3 quest-panel-title">Core study path</h2>
          <div className="mt-5 space-y-4">
            {[
              "Choose a world and topic from the map.",
              "Read the lesson rule and preview examples.",
              "Run the exercise set with hints and streak bonuses.",
              "Review the result summary and replay or continue.",
            ].map((step, index) => (
              <div key={step} className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-black text-slate-700">
                  {index + 1}
                </div>
                <p className="pt-1 text-sm leading-6 text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {quickLinks.map((link) => (
            <article key={link.href} className="quest-card p-6">
              <p className="quest-kicker">Quick access</p>
              <h2 className="mt-3 text-xl font-black text-slate-800">
                {link.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {link.description}
              </p>
              <Link href={link.href} className="quest-button-secondary mt-5 w-full">
                Open
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
