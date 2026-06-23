import Link from "next/link";
import { getGameMode } from "@/data/game-modes";
import {
  getExercisesByLesson,
  getLessonById,
  getUnlockedStreakMilestones,
} from "@/lib/game";

type ResultPageProps = {
  searchParams: Promise<{
    lessonId?: string;
    gems?: string;
    correct?: string;
    total?: string;
    streak?: string;
    bestStreak?: string;
    hints?: string;
    mode?: string;
  }>;
};

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const { lessonId, gems, correct, total, streak, bestStreak, hints, mode } = await searchParams;
  const lesson = lessonId ? getLessonById(lessonId) : undefined;
  const activeMode = getGameMode(mode === "explorer" ? "explorer" : "explorer");

  const replayExerciseId = lessonId ? getExercisesByLesson(lessonId)[0]?.id : undefined;
  const replayHref = replayExerciseId ? `/exercise/${replayExerciseId}?mode=${activeMode.id}` : "/map";

  const summary = {
    gems: Number(gems ?? 0),
    correct: Number(correct ?? 0),
    total: Number(total ?? 0),
    streak: Number(streak ?? 0),
    bestStreak: Number(bestStreak ?? 0),
    hints: Number(hints ?? 0),
  };

  const accuracy =
    summary.total > 0 ? Math.round((summary.correct / summary.total) * 100) : 0;
  const unlockedMilestones = getUnlockedStreakMilestones(summary.bestStreak);

  return (
    <main className="quest-page justify-center">
      <section className="quest-content grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="quest-card p-6 sm:p-8">
          <div className="flex flex-wrap gap-3">
            <span className="quest-chip">Mode: {activeMode.name}</span>
            <span className="quest-chip">Session complete</span>
            <span className="quest-chip quest-chip-gem">💎 {summary.gems} gems earned</span>
            <span className="quest-chip quest-chip-streak">🔥 best streak {summary.bestStreak}</span>
          </div>

          <p className="quest-kicker mt-6">Results</p>
          <h1 className="mt-3 quest-title text-4xl sm:text-5xl">Lesson summary</h1>
          <p className="mt-3 quest-subtitle">
            {lesson
              ? `${lesson.title} finished. Review the run, replay it, or return to the map.`
              : "This screen summarizes the full exercise run for the lesson."}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="quest-stat-card">
              <p className="text-sm text-slate-500">Accuracy</p>
              <p className="mt-1 text-3xl font-black text-slate-800">{accuracy}%</p>
            </div>
            <div className="quest-stat-card">
              <p className="text-sm text-slate-500">Correct answers</p>
              <p className="mt-1 text-3xl font-black text-slate-800">
                {summary.correct} / {summary.total}
              </p>
            </div>
            <div className="quest-stat-card">
              <p className="text-sm text-slate-500">Final streak</p>
              <p className="mt-1 text-3xl font-black text-slate-800">{summary.streak}</p>
            </div>
            <div className="quest-stat-card">
              <p className="text-sm text-slate-500">Hints used</p>
              <p className="mt-1 text-3xl font-black text-slate-800">{summary.hints}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={replayHref} className="quest-button-primary">
              Replay lesson
            </Link>
            <Link href="/map" className="quest-button-secondary">
              Back to map
            </Link>
          </div>
        </div>

        <aside className="quest-card p-6 sm:p-8">
          <p className="quest-kicker">Mode summary</p>
          <h2 className="mt-3 quest-panel-title">Mode: {activeMode.name}</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">{activeMode.summary}</p>

          <div className="mt-5 rounded-[24px] bg-white/72 p-5">
            <p className="quest-kicker">Explorer rules</p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
              {activeMode.rules.map((rule) => (
                <li key={rule}>• {rule}</li>
              ))}
            </ul>
          </div>

          <p className="quest-kicker mt-6">Combo rewards</p>
          <h2 className="mt-3 quest-panel-title">Unlocked in this run</h2>
          <div className="mt-5 grid gap-3">
            {unlockedMilestones.length > 0 ? (
              unlockedMilestones.map((milestone) => (
                <div key={milestone.streak} className="quest-stat-card">
                  <p className="text-sm font-bold text-slate-800">
                    {milestone.rewardType === "gems"
                      ? `🔥 Streak ${milestone.streak}`
                      : milestone.rewardType === "chest"
                        ? "🧰 Small chest"
                        : "🏅 Perfect combo badge"}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {milestone.description}
                  </p>
                </div>
              ))
            ) : (
              <div className="quest-stat-card">
                <p className="text-sm font-bold text-slate-800">No streak reward unlocked</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Reach 3 correct answers in a row without hints to trigger the first combo reward.
                </p>
              </div>
            )}
          </div>
        </aside>
      </section>
    </main>
  );
}
