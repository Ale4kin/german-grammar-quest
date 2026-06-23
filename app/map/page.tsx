import Link from "next/link";
import { mockAvatars } from "@/data/avatars";
import { mockCountries } from "@/data/countries";
import { getGameMode } from "@/data/game-modes";
import { mockKingdoms } from "@/data/kingdoms";
import { mockLessons } from "@/data/lessons";

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
        const lesson = mockLessons.find((entry) => entry.countryId === country.id);

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
            <div className="quest-stat-card">
              <p className="text-sm text-slate-500">Worlds</p>
              <p className="mt-1 text-3xl font-black text-slate-800">{worldRoutes.length}</p>
            </div>
            <div className="quest-stat-card">
              <p className="text-sm text-slate-500">Topics</p>
              <p className="mt-1 text-3xl font-black text-slate-800">{totalTopics}</p>
            </div>
            <div className="quest-stat-card">
              <p className="text-sm text-slate-500">Ready lessons</p>
              <p className="mt-1 text-3xl font-black text-slate-800">{readyLessons}</p>
            </div>
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
            <Link href="/avatar" className="quest-button-secondary w-full">
              Manage avatar
            </Link>
            <Link href="/lesson/a1-articles?mode=explorer" className="quest-button-primary w-full">
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

        <div className="mt-6 grid gap-4">
          {worldRoutes.map((world) => (
            <article key={world.id} className="quest-card p-5 sm:p-6">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-300 to-emerald-500 text-2xl shadow-md">
                      {world.icon}
                    </div>
                    <div>
                      <p className="quest-kicker">World {world.sortOrder}</p>
                      <h3 className="text-2xl font-black text-slate-800">{world.name}</h3>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{world.description}</p>
                </div>

                <div className="grid min-w-[220px] gap-3 sm:grid-cols-2 xl:w-[260px] xl:grid-cols-1">
                  <div className="quest-stat-card">
                    <p className="text-sm text-slate-500">Topics in world</p>
                    <p className="mt-1 text-2xl font-black text-slate-800">{world.countries.length}</p>
                  </div>
                  <div className="quest-stat-card">
                    <p className="text-sm text-slate-500">Ready now</p>
                    <p className="mt-1 text-2xl font-black text-slate-800">{world.readyTopics}</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-3 xl:grid-cols-2">
                {world.countries.map((country) => (
                  <div key={country.id} className="rounded-[24px] bg-white/78 p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-base font-black text-slate-800">{country.name}</p>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{country.description}</p>
                      </div>
                      <span className="quest-chip px-2.5 py-1 text-xs">
                        {country.lesson ? "Ready" : "Soon"}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="quest-chip px-2.5 py-1 text-xs">
                        Order {country.sortOrder}
                      </span>
                      <span className="quest-chip px-2.5 py-1 text-xs">
                        {country.lesson ? "Lesson ready" : "No lesson yet"}
                      </span>
                    </div>

                    {country.lesson ? (
                      <Link href={`/lesson/${country.lesson.id}?mode=explorer`} className="quest-button-primary mt-4 w-full">
                        Open lesson
                      </Link>
                    ) : (
                      <div className="mt-4 rounded-full border border-dashed border-slate-300 px-4 py-2 text-center text-sm font-semibold text-slate-500">
                        Coming soon
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
