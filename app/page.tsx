import Link from "next/link";
import { topicsMockExercises } from "@/data/exercises/topics";
import { mockKingdoms } from "@/data/kingdoms";
import { mockLessons } from "@/data/lessons";

export default function LandingPage() {
  return (
    <main className="quest-page justify-center">
      <section className="quest-content grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-3">
            <span className="quest-chip">Fantasy Grammar Adventure</span>
            <span className="quest-chip quest-chip-gem">
              💎 {topicsMockExercises.length * 15}+ gems to collect
            </span>
          </div>
          <div className="space-y-4">
            <h1 className="quest-title">
              Explore German grammar as a world-by-world adventure.
            </h1>
            <p className="quest-subtitle max-w-2xl">
              Travel through Articles, Nouns, Pronouns, Prepositions,
              Adjectives, and Verbs with lessons, hints, and gem-based progress.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/map" className="quest-button-primary">
              Open the app
            </Link>
            <Link href="/avatar" className="quest-button-secondary">
              Preview avatars
            </Link>
          </div>
        </div>

        <div className="quest-card quest-map-grid relative overflow-hidden p-6 sm:p-8">
          <div className="absolute right-6 top-6 rounded-full bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
            MVP world map
          </div>
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">
                  Quest board
                </p>
                <p className="mt-2 text-2xl font-black text-slate-800">
                  German Grammar Quest
                </p>
              </div>
              <div className="rounded-[24px] bg-gradient-to-br from-amber-100 to-orange-200 p-4 text-4xl shadow-sm">
                🗺️
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[24px] bg-white/80 p-4">
                <p className="text-sm text-slate-500">Grammar worlds</p>
                <p className="mt-1 text-3xl font-black text-slate-800">
                  {mockKingdoms.length}
                </p>
              </div>
              <div className="rounded-[24px] bg-white/80 p-4">
                <p className="text-sm text-slate-500">Lesson topics</p>
                <p className="mt-1 text-3xl font-black text-slate-800">
                  {mockLessons.length}
                </p>
              </div>
              <div className="rounded-[24px] bg-white/80 p-4 sm:col-span-2">
                <p className="text-sm text-slate-500">Current playable pack</p>
                <p className="mt-1 text-lg font-bold text-slate-800">
                  {topicsMockExercises.length} exercise
                  {topicsMockExercises.length === 1 ? "" : "s"} in the first
                  Articles lesson
                </p>
              </div>
            </div>

            <div className="rounded-[24px] bg-white/72 p-4">
              <div className="flex items-center justify-between text-sm font-semibold text-slate-600">
                <span>Current flow</span>
                <span>Map → Lesson → Exercise</span>
              </div>
              <div className="quest-progress-track mt-3">
                <div className="quest-progress-fill w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
