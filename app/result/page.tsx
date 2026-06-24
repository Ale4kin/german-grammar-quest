import Link from "next/link";
import { LessonRankChip } from "@/components/game/lesson-rank-chip";
import { ProgressSync } from "@/components/game/progress-sync";
import { StatCard } from "@/components/ui/stat-card";
import { evaluateLessonRank, evaluateLessonXp } from "@/lib/game/evaluators";
import { getLessonRankTitle } from "@/lib/game/ranks";
import { getCountryById, getExercisesByLesson, getKingdomById, getLessonById } from "@/lib/game/curriculum";
import { getUnlockedStreakMilestones } from "@/lib/game/session";
import { resolveGameMode } from "@/lib/game/modes";
import { buildExerciseHref } from "@/lib/game/routes";
import type { ExerciseRunType } from "@/types";

type ResultPageProps = {
  searchParams: Promise<{
    lessonId?: string;
    gems?: string;
    correct?: string;
    total?: string;
    streak?: string;
    bestStreak?: string;
    hints?: string;
    firstTryCount?: string;
    incorrectExerciseIds?: string;
    runId?: string;
    mode?: string;
    runType?: ExerciseRunType;
  }>;
};

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const {
    lessonId,
    gems,
    correct,
    total,
    streak,
    bestStreak,
    hints,
    firstTryCount,
    incorrectExerciseIds,
    runId,
    mode,
    runType,
  } =
    await searchParams;
  const lesson = lessonId ? getLessonById(lessonId) : undefined;
  const kingdom = lesson ? getKingdomById(lesson.kingdomId) : undefined;
  const country = lesson ? getCountryById(lesson.countryId) : undefined;
  const activeMode = resolveGameMode(mode);

  const replayExerciseId = lessonId ? getExercisesByLesson(lessonId)[0]?.id : undefined;
  const replayHref = replayExerciseId ? buildExerciseHref(replayExerciseId, activeMode.id) : "/map";
  const incorrectIds = incorrectExerciseIds
    ? incorrectExerciseIds.split(",").filter(Boolean)
    : [];
  const retryIncorrectHref =
    incorrectIds.length > 0
      ? `/exercise/${incorrectIds[0]}?mode=${activeMode.id}&set=${incorrectIds.join(",")}`
      : null;
  const resolvedRunType: ExerciseRunType = runType === "review" ? "review" : "lesson";

  const summary = {
    gems: Number(gems ?? 0),
    correct: Number(correct ?? 0),
    total: Number(total ?? 0),
    streak: Number(streak ?? 0),
    bestStreak: Number(bestStreak ?? 0),
    hints: Number(hints ?? 0),
    firstTryCount: Number(firstTryCount ?? 0),
  };

  const accuracy =
    summary.total > 0 ? Math.round((summary.correct / summary.total) * 100) : 0;
  const unlockedMilestones = getUnlockedStreakMilestones(summary.bestStreak);
  const lessonResult = {
    runId: runId ?? "current-run",
    lessonId: lessonId ?? "",
    completedAt: new Date().toISOString(),
    accuracy,
    correctCount: summary.correct,
    totalQuestions: summary.total,
    hintCount: summary.hints,
    bestStreak: summary.bestStreak,
    perfectRun: summary.total > 0 && summary.correct === summary.total && summary.hints === 0,
    firstTryCount: summary.firstTryCount,
    totalGemsEarned: summary.gems,
    modeUsed: activeMode.id,
  } as const;
  const xpEarned = evaluateLessonXp(lessonResult, resolvedRunType);
  const rankEvaluation = evaluateLessonRank(lessonResult);

  return (
    <main className="quest-page justify-center">
      {lesson ? (
        <ProgressSync
          runId={runId}
          lessonId={lesson.id}
          kingdomId={kingdom?.id ?? lesson.kingdomId}
          countryId={country?.id ?? lesson.countryId}
          modeUsed={activeMode.id}
          correctAnswers={summary.correct}
          totalAnswers={summary.total}
          hintsUsed={summary.hints}
          bestStreak={summary.bestStreak}
          firstTryCount={summary.firstTryCount}
          gemsEarned={summary.gems}
          xpEarned={xpEarned}
        />
      ) : null}
      <section className="quest-content grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="quest-card p-6 sm:p-8">
          <div className="flex flex-wrap gap-3">
            <span className="quest-chip">Mode: {activeMode.name}</span>
            <span className="quest-chip">
              {resolvedRunType === "review" ? "Review complete" : "Session complete"}
            </span>
            {lesson ? (
              <span className="quest-chip bg-emerald-100 font-bold text-emerald-900">
                {resolvedRunType === "review" ? "Review set cleared" : "Lesson completed"}
              </span>
            ) : null}
            <span className="quest-chip quest-chip-gem">💎 {summary.gems} gems earned</span>
            <span className="quest-chip quest-chip-streak">🔥 best streak {summary.bestStreak}</span>
          </div>

          <p className="quest-kicker mt-6">Results</p>
          <h1 className="mt-3 quest-title text-4xl sm:text-5xl">Lesson summary</h1>
          <p className="mt-3 quest-subtitle">
            {lesson
              ? resolvedRunType === "review"
                ? `${lesson.title} review set finished. Clean up missed questions, then return to the full lesson when ready.`
                : `${lesson.title} finished. Review the run, replay it, or return to the map.`
              : "This screen summarizes the full exercise run for the lesson."}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <StatCard label="Accuracy" value={`${accuracy}%`} />
            <StatCard label="Correct answers" value={`${summary.correct} / ${summary.total}`} />
            <StatCard label="Final streak" value={summary.streak} />
            <StatCard label="Hints used" value={summary.hints} />
          </div>

          <div className="mt-5 rounded-[20px] bg-white/72 p-4">
            <p className="quest-kicker">Lesson rank</p>
            <div className="mt-2 flex items-center justify-between gap-3">
              <p className="text-lg font-black text-slate-800">
                {getLessonRankTitle(rankEvaluation.rank)}
              </p>
              <span className="quest-chip px-2.5 py-1 text-xs">
                {rankEvaluation.reasons.join(" · ")}
              </span>
            </div>
            {lesson ? (
              <div className="mt-3">
                <LessonRankChip lessonId={lesson.id} prefix="Best saved" showWhenEmpty />
              </div>
            ) : null}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={replayHref} className="quest-button-primary">
              Replay lesson
            </Link>
            {retryIncorrectHref ? (
              <Link href={retryIncorrectHref} className="quest-button-secondary">
                Retry missed questions
              </Link>
            ) : null}
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
                <StatCard
                  key={milestone.streak}
                  label={
                    milestone.rewardType === "gems"
                      ? `🔥 Streak ${milestone.streak}`
                      : milestone.rewardType === "chest"
                        ? "🧰 Small chest"
                        : "🏅 Perfect combo badge"
                  }
                  labelClassName="text-sm font-bold text-slate-800"
                >
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {milestone.description}
                  </p>
                </StatCard>
              ))
            ) : (
              <StatCard
                label="No streak reward unlocked"
                labelClassName="text-sm font-bold text-slate-800"
              >
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Reach 3 correct answers in a row without hints to trigger the first combo reward.
                </p>
              </StatCard>
            )}
          </div>

          <div className="mt-6 rounded-[24px] bg-white/72 p-5">
            <p className="quest-kicker">XP reward</p>
            <h2 className="mt-3 quest-panel-title">+{xpEarned} XP earned</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {resolvedRunType === "review"
                ? "Review runs pay less than a full lesson, but still give useful gems and XP for fixing weak spots."
                : "Gems are your spendable reward. XP is granted once for finishing the lesson and feeds long-term progression."}
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
