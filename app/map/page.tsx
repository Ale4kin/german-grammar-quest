import Link from "next/link";
import { MapCompletionView } from "@/components/game/map-completion-view";
import { MapProgressPanel } from "@/components/game/map-progress-panel";
import { StatCard } from "@/components/ui/stat-card";
import { mockAvatars } from "@/data/avatars";
import { mockCountries } from "@/data/countries";
import { getGameMode } from "@/data/game-modes";
import { mockKingdoms } from "@/data/kingdoms";
import { mockLessons } from "@/data/lessons";
import { getLessonByCountryId } from "@/lib/game/curriculum";
import { buildLessonHref } from "@/lib/game/routes";

const worldIcons: Record<string, string> = {
  articles: "📜",
  nouns: "🏺",
  pronouns: "🪞",
  prepositions: "🧭",
  adjectives: "✨",
  verbs: "⚙️",
};

const worldRoutes = mockKingdoms
  .slice()
  .sort((left, right) => left.sortOrder - right.sortOrder)
  .map((kingdom) => {
    const countries = mockCountries
      .filter((country) => country.kingdomId === kingdom.id)
      .sort((left, right) => left.sortOrder - right.sortOrder)
      .map((country) => {
        const lesson = getLessonByCountryId(country.id);

        return {
          ...country,
          lesson,
        };
      });

    return {
      ...kingdom,
      icon: worldIcons[kingdom.id] ?? "🗺️",
      countries,
      readyTopics: countries.filter((country) => country.lesson).length,
    };
  });

type MapPageProps = {
  searchParams?: Promise<{
    avatar?: string;
  }>;
};

export default async function MapPage({ searchParams }: MapPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const selectedAvatar = mockAvatars.find((avatar) => avatar.id === params?.avatar) ?? null;
  const readyLessons = mockLessons.length;
  const totalTopics = mockCountries.length;
  const explorerMode = getGameMode("explorer");

  return (
    <main className="quest-page">
      <header className="quest-content grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="quest-card p-6 sm:p-7">
          <p className="quest-kicker">Study map</p>
          <h1 className="mt-3 quest-title text-4xl sm:text-5xl">Choose the next topic</h1>
          <p className="mt-3 quest-subtitle max-w-2xl">
            The map now works better as a curriculum browser: worlds, topics,
            lesson availability, and entry points are all visible without extra
            onboarding copy.
          </p>
          <div className="mt-4 rounded-[20px] bg-white/72 px-4 py-3 text-sm leading-6 text-slate-700">
            <span className="font-black">Mode: {explorerMode.name}</span>
            <br />
            {explorerMode.summary}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <StatCard label="Worlds" value={worldRoutes.length} />
            <StatCard label="Topics" value={totalTopics} />
            <StatCard label="Ready lessons" value={readyLessons} />
          </div>
        </div>

        <aside className="quest-card p-6 sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="quest-kicker">Profile</p>
              <h2 className="mt-3 quest-panel-title">
                {selectedAvatar ? selectedAvatar.name : "Guest adventurer"}
              </h2>
            </div>
            <div className="rounded-[24px] bg-gradient-to-br from-amber-50 via-orange-50 to-emerald-50 px-5 py-4 text-5xl shadow-inner">
              {selectedAvatar ? selectedAvatar.emoji : "🧝"}
            </div>
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            {selectedAvatar
              ? selectedAvatar.description
              : "Avatar selection is optional and behaves like a profile cosmetic, not a required setup step."}
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link href="/profile" className="quest-button-secondary w-full">
              Open profile
            </Link>
            <Link href={buildLessonHref("a1-articles")} className="quest-button-primary w-full">
              Resume active lesson
            </Link>
          </div>
        </aside>
      </header>

      <section className="quest-content quest-card quest-map-grid overflow-hidden p-5 sm:p-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="quest-kicker">Curriculum route</p>
            <h2 className="mt-2 quest-panel-title">Grammar worlds and topics</h2>
          </div>
          <p className="text-sm font-semibold text-slate-600">
            Ready topics open directly into their lesson briefing.
          </p>
        </div>

        <MapCompletionView worlds={worldRoutes} />
      </section>

      <section className="quest-content">
        <MapProgressPanel />
      </section>
    </main>
  );
}
