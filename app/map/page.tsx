import Link from "next/link";
import { mockAvatars } from "@/data/avatars";
import { mockCountries } from "@/data/countries";
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

  return (
    <main className="quest-page">
      <header className="quest-content space-y-4">
        <h1 className="quest-title text-4xl sm:text-5xl">Quest map</h1>
        <p className="quest-subtitle max-w-2xl">
          Follow a little grammar trail through soft forest nodes, chapter cards, and milestone rewards.
        </p>
      </header>

      <section className="quest-content grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="quest-card p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Avatar</p>
              <h2 className="mt-2 text-2xl font-black text-slate-800">
                {selectedAvatar ? selectedAvatar.name : "Choose your guide"}
              </h2>
            </div>
            <div className="rounded-[24px] bg-gradient-to-br from-amber-50 via-orange-50 to-emerald-50 px-5 py-4 text-5xl shadow-inner">
              {selectedAvatar ? selectedAvatar.emoji : "🧝"}
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            {selectedAvatar
              ? selectedAvatar.description
              : "Pick an avatar first so the map feels like your own learning journey."}
          </p>
          <Link href="/avatar" className="quest-button-secondary mt-5 w-full">
            {selectedAvatar ? "Change avatar" : "Choose avatar"}
          </Link>
        </div>

        <div className="quest-card p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Journey setup</p>
              <h2 className="mt-2 text-2xl font-black text-slate-800">Grammar Quest Atlas</h2>
            </div>
            <div className="quest-chip quest-chip-gem">💎 Reward path</div>
          </div>
          <p className="mt-4 text-slate-600">
            Explore the grammar worlds in order, or jump into the first ready lesson inside Articles.
          </p>
        </div>
      </section>

      <section className="quest-content quest-card quest-map-grid overflow-hidden p-5 sm:p-7">
        <div className="grid gap-5">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">World route</p>
          </div>

          <div className="grid gap-5">
            {worldRoutes.map((world) => (
              <article key={world.id} className="quest-card p-5 sm:p-6">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-300 to-emerald-500 text-2xl shadow-md">
                        {world.icon}
                      </div>
                      <div>
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">World {world.sortOrder}</p>
                        <h2 className="text-2xl font-black text-slate-800">{world.name}</h2>
                      </div>
                    </div>
                    <p className="mt-4 text-slate-600">{world.description}</p>
                  </div>
                  <div className="quest-chip">{world.countries.length} topics</div>
                </div>

                <div className="mt-5 grid gap-3 lg:grid-cols-2">
                  {world.countries.map((country) => (
                    <div key={country.id} className="rounded-[24px] bg-white/78 p-4 shadow-sm">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-bold text-slate-800">{country.name}</p>
                          <p className="mt-2 text-sm leading-6 text-slate-600">{country.description}</p>
                        </div>
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                          {country.lesson ? "Ready" : "Soon"}
                        </span>
                      </div>
                      {country.lesson ? (
                        <Link href={`/lesson/${country.lesson.id}`} className="quest-button-primary mt-4 w-full">
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
        </div>
      </section>
    </main>
  );
}
