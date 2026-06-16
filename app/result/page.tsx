import Link from "next/link";

type ResultPageProps = {
  searchParams: Promise<{
    gems?: string;
    correct?: string;
    total?: string;
    streak?: string;
    bestStreak?: string;
    hints?: string;
  }>;
};

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const { gems, correct, total, streak, bestStreak, hints } = await searchParams;

  const summary = {
    gems: Number(gems ?? 0),
    correct: Number(correct ?? 0),
    total: Number(total ?? 0),
    streak: Number(streak ?? 0),
    bestStreak: Number(bestStreak ?? 0),
    hints: Number(hints ?? 0),
  };

  return (
    <main className="quest-page justify-center">
      <section className="quest-content quest-card p-6 sm:p-8">
        <div className="flex flex-wrap gap-3">
          <span className="quest-chip">Step 5</span>
          <span className="quest-chip quest-chip-gem">💎 Final treasure</span>
        </div>
        <h1 className="quest-title mt-4 text-4xl sm:text-5xl">Quest complete</h1>
        <p className="quest-subtitle mt-3">This screen summarizes the full exercise run for the lesson.</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[24px] bg-white/78 p-4">
            <p className="text-sm text-slate-500">Total gems</p>
            <p className="mt-1 text-3xl font-black text-slate-800">{summary.gems}</p>
          </div>
          <div className="rounded-[24px] bg-white/78 p-4">
            <p className="text-sm text-slate-500">Correct answers</p>
            <p className="mt-1 text-3xl font-black text-slate-800">
              {summary.correct} / {summary.total}
            </p>
          </div>
          <div className="rounded-[24px] bg-white/78 p-4">
            <p className="text-sm text-slate-500">Final streak</p>
            <p className="mt-1 text-3xl font-black text-slate-800">{summary.streak}</p>
          </div>
          <div className="rounded-[24px] bg-white/78 p-4">
            <p className="text-sm text-slate-500">Best streak</p>
            <p className="mt-1 text-3xl font-black text-slate-800">{summary.bestStreak}</p>
          </div>
          <div className="rounded-[24px] bg-white/78 p-4 sm:col-span-2">
            <p className="text-sm text-slate-500">Hints used</p>
            <p className="mt-1 text-3xl font-black text-slate-800">{summary.hints}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/exercise/ex-001"
            className="quest-button-primary"
          >
            Play again
          </Link>
          <Link
            href="/map"
            className="quest-button-secondary"
          >
            Back to map
          </Link>
        </div>
      </section>
    </main>
  );
}
