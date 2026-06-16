import Link from "next/link";
import { mockAvatars } from "@/data/avatars";

export default function AvatarSelectionPage() {
  return (
    <main className="quest-page">
      <header className="quest-content space-y-4">
        <div className="flex flex-wrap gap-3">
          <span className="quest-chip">Pick your companion</span>
          <span className="quest-chip">Choose before you enter the map</span>
        </div>
        <h1 className="quest-title text-4xl sm:text-5xl">Choose your avatar guide</h1>
        <p className="quest-subtitle max-w-2xl">
          Each guide gives the quest a different personality. The MVP keeps selection simple, but the cards should already feel collectible.
        </p>
      </header>

      <section className="quest-content grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {mockAvatars.map((avatar) => (
          <article
            key={avatar.id}
            className="quest-card relative overflow-hidden p-5 transition hover:-translate-y-1 sm:p-6"
          >
            <div className="absolute right-4 top-4 rounded-full bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
              Scout
            </div>
            <div className="rounded-[26px] bg-gradient-to-br from-amber-50 via-orange-50 to-emerald-50 p-5 text-center shadow-inner">
              <div className="text-6xl">{avatar.emoji}</div>
            </div>
            <h2 className="mt-5 text-xl font-black text-slate-800">{avatar.name}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{avatar.description}</p>
            <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-600">
              <span className="quest-chip quest-chip-gem px-2.5 py-1 text-xs">+15 start gems vibe</span>
            </div>
            <Link
              href={`/map?avatar=${avatar.id}`}
              className="quest-button-primary mt-5 w-full"
            >
              Select
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
