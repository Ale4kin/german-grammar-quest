import Link from "next/link";
import { mockAvatars } from "@/data/avatars";

export default function AvatarSelectionPage() {
  const freeAvatars = mockAvatars.filter((avatar) => !avatar.cost).length;

  return (
    <main className="quest-page">
      <header className="quest-content grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="quest-card p-6 sm:p-7">
          <p className="quest-kicker">Avatar wardrobe</p>
          <h1 className="mt-3 quest-title text-4xl sm:text-5xl">Profile avatar selection</h1>
          <p className="mt-3 quest-subtitle max-w-2xl">
            This screen works better as a compact cosmetic picker: choose a free
            avatar now, and show locked ones as reward targets.
          </p>
        </div>

        <aside className="quest-card p-6 sm:p-7">
          <p className="quest-kicker">Unlock overview</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="quest-stat-card">
              <p className="text-sm text-slate-500">Available now</p>
              <p className="mt-1 text-3xl font-black text-slate-800">{freeAvatars}</p>
            </div>
            <div className="quest-stat-card">
              <p className="text-sm text-slate-500">Locked</p>
              <p className="mt-1 text-3xl font-black text-slate-800">
                {mockAvatars.length - freeAvatars}
              </p>
            </div>
            <div className="quest-stat-card">
              <p className="text-sm text-slate-500">Total styles</p>
              <p className="mt-1 text-3xl font-black text-slate-800">{mockAvatars.length}</p>
            </div>
          </div>
        </aside>
      </header>

      <section className="quest-content grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {mockAvatars.map((avatar) => {
          const isLocked = Boolean(avatar.cost && avatar.cost > 0);

          return (
            <article
              key={avatar.id}
              className="quest-card relative overflow-hidden p-5 transition hover:-translate-y-1 sm:p-6"
            >
              <div className="absolute right-4 top-4 rounded-full bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                {isLocked ? "Locked" : "Ready"}
              </div>
              <div className="rounded-[26px] bg-gradient-to-br from-amber-50 via-orange-50 to-emerald-50 p-5 text-center shadow-inner">
                <div className="text-6xl">{avatar.emoji}</div>
              </div>
              <h2 className="mt-5 text-xl font-black text-slate-800">{avatar.name}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{avatar.description}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-sm font-semibold text-slate-600">
                <span className="quest-chip px-2.5 py-1 text-xs">Profile cosmetic</span>
                {isLocked ? (
                  <span className="quest-chip quest-chip-gem px-2.5 py-1 text-xs">
                    Unlock for {avatar.cost} gems
                  </span>
                ) : (
                  <span className="quest-chip px-2.5 py-1 text-xs">Free</span>
                )}
              </div>
              {isLocked ? (
                <button
                  type="button"
                  disabled
                  className="quest-button-secondary mt-5 w-full cursor-not-allowed opacity-70"
                >
                  Not unlocked yet
                </button>
              ) : (
                <Link href={`/map?avatar=${avatar.id}`} className="quest-button-primary mt-5 w-full">
                  Use on map
                </Link>
              )}
            </article>
          );
        })}
      </section>
    </main>
  );
}
