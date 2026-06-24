import Link from "next/link";
import { notFound } from "next/navigation";
import { LessonCompletionChip } from "@/components/game/lesson-completion-chip";
import { LessonRankChip } from "@/components/game/lesson-rank-chip";
import { StatCard } from "@/components/ui/stat-card";
import { lessonRankThresholds, rewardRules } from "@/data/game-rules";
import { getExercisesByLesson } from "@/data/exercises/topics";
import { getCountryById, getKingdomById, getLessonById } from "@/lib/game/curriculum";
import { resolveGameMode } from "@/lib/game/modes";
import { buildExerciseHref } from "@/lib/game/routes";

type LessonPageProps = {
  params: Promise<{
    lessonId: string;
  }>;
  searchParams?: Promise<{
    mode?: string;
  }>;
};

export default async function LessonPage({ params, searchParams }: LessonPageProps) {
  const { lessonId } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const lesson = getLessonById(lessonId);

  if (!lesson) {
    notFound();
  }

  const lessonExercises = getExercisesByLesson(lessonId);
  const kingdom = getKingdomById(lesson.kingdomId);
  const country = getCountryById(lesson.countryId);
  const isArticleLesson = lesson.kingdomId === "articles";
  const activeMode = resolveGameMode(resolvedSearchParams?.mode);
  const exampleGridClass =
    lesson.grammarRuleExamples.length > 6
      ? "mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
      : "mt-4 grid gap-3 sm:grid-cols-2";

  return (
    <main className="quest-page">
      <header className="quest-content grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="quest-card p-6 sm:p-7">
          <div className="flex flex-wrap gap-3">
            <span className="quest-chip quest-chip-mode">Mode on: {activeMode.name}</span>
            <LessonCompletionChip lessonId={lesson.id} />
            <LessonRankChip lessonId={lesson.id} />
            <span className="quest-chip">{kingdom?.name ?? "World"}</span>
            <span className="quest-chip">{country?.name ?? "Topic"}</span>
          </div>
          <p className="quest-kicker mt-6">Lesson briefing</p>
          <h1 className="mt-3 quest-title text-4xl sm:text-5xl">{lesson.title}</h1>
          <p className="mt-3 quest-subtitle max-w-2xl">{lesson.description}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <StatCard label="Exercises" value={lessonExercises.length} />
            <StatCard label="Perfect answer" value={`+${rewardRules.correctWithoutHintGems}`} />
            <StatCard label="Streak bonus" value={`+${rewardRules.streakBonusGems}`} />
          </div>
        </div>

        <aside className="quest-card p-6 sm:p-7">
          <p className="quest-kicker">Session plan</p>
          <h2 className="mt-3 quest-panel-title">What happens in this run</h2>
          <div className="mt-5 grid gap-3">
            <div className="quest-stat-card">
              <p className="text-sm font-bold text-slate-800">Review the rule</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Start with the lesson summary and examples before answering.
              </p>
            </div>
            <div className="quest-stat-card">
              <p className="text-sm font-bold text-slate-800">Answer fast or use hints</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {activeMode.summary}
              </p>
            </div>
            <div className="quest-stat-card">
              <p className="text-sm font-bold text-slate-800">Finish with a summary</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Results show gems, streaks, accuracy, and hint usage for the whole set.
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/map" className="quest-button-secondary">
              Back to map
            </Link>
            {lessonExercises.length > 0 ? (
              <Link href={buildExerciseHref(lessonExercises[0].id, activeMode.id)} className="quest-button-primary">
                Start lesson
              </Link>
            ) : null}
          </div>
        </aside>
      </header>

      <section className="quest-content grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="quest-card p-6 sm:p-7">
          <p className="quest-kicker">Rule summary</p>
          <h2 className="mt-3 quest-panel-title">{lesson.grammarRuleTitle}</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">{lesson.grammarRuleSummary}</p>

          <div className={exampleGridClass}>
            {lesson.grammarRuleExamples.map((example) => (
              <div
                key={`${example.article}-${example.example}`}
                className={
                  isArticleLesson && example.article === "der"
                    ? "rounded-[20px] bg-emerald-50 p-4"
                    : isArticleLesson && example.article === "die"
                      ? "rounded-[20px] bg-rose-50 p-4"
                      : "rounded-[20px] border border-amber-100 bg-amber-50/85 p-4"
                }
              >
                <p
                  className={
                    isArticleLesson && example.article === "der"
                      ? "text-sm font-bold text-emerald-800"
                      : isArticleLesson && example.article === "die"
                        ? "text-sm font-bold text-rose-800"
                        : "text-sm font-bold text-amber-900"
                  }
                >
                  {example.article}
                </p>
                <p className="mt-1 text-sm text-slate-700">{example.label}</p>
                <p className="mt-2 text-sm font-semibold text-slate-800">{example.example}</p>
              </div>
            ))}
          </div>

          {lesson.grammarNotes?.length ? (
            <div className="mt-5 rounded-[24px] bg-white/72 p-5">
              <p className="quest-kicker">Usage notes</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                {lesson.grammarNotes.map((note) => (
                  <li key={note}>• {note}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <aside className="quest-card p-6">
          <div className="rounded-[24px] bg-white/72 p-5">
            <p className="quest-kicker">Rank targets</p>
            <div className="mt-4 grid gap-3">
              <div className="rounded-[18px] bg-white/80 px-4 py-3">
                <p className="text-sm font-black text-amber-900">Gold</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {lessonRankThresholds.gold.minAccuracy}% accuracy, no hints, perfect run.
                </p>
              </div>
              <div className="rounded-[18px] bg-white/80 px-4 py-3">
                <p className="text-sm font-black text-slate-800">Silver</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {lessonRankThresholds.silver.minAccuracy}% accuracy and at most {lessonRankThresholds.silver.maxHints} hints.
                </p>
              </div>
              <div className="rounded-[18px] bg-white/80 px-4 py-3">
                <p className="text-sm font-black text-orange-900">Bronze</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {lessonRankThresholds.bronze.minAccuracy}% accuracy to clear the lesson.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-[24px] bg-white/72 p-5">
            <p className="quest-kicker">Rewards preview</p>
            <h2 className="mt-3 quest-panel-title">What this lesson can pay</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[18px] bg-white/80 px-4 py-3">
                <p className="text-sm font-black text-slate-800">Full lesson</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  +{rewardRules.correctWithoutHintGems} clean answer, +{rewardRules.correctWithHintGems} after hint, +{rewardRules.streakBonusGems} streak bonus.
                </p>
              </div>
              <div className="rounded-[18px] bg-white/80 px-4 py-3">
                <p className="text-sm font-black text-slate-800">Review set</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Missed-question replays pay less than a full lesson, but still grant gems and XP for cleanup work.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[24px] bg-white/72 p-5">
            <p className="quest-kicker">Streak ladder</p>
            <div className="mt-4 space-y-3 text-sm font-semibold text-slate-700">
              {rewardRules.streakMilestones.map((milestone) => (
                <div
                  key={milestone.streak}
                  className="flex items-start justify-between gap-4 rounded-[18px] bg-white/80 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-black text-slate-800">
                      🔥 Streak {milestone.streak}
                    </p>
                    <p className="mt-1 text-xs font-medium leading-5 text-slate-600">
                      {milestone.description}
                    </p>
                  </div>
                  <span className="quest-chip px-2.5 py-1 text-xs">
                    {milestone.rewardType === "gems"
                      ? `+${milestone.gemBonus ?? rewardRules.streakBonusGems} gems`
                      : milestone.rewardType === "chest"
                        ? "Chest"
                        : "Badge"}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-[18px] border border-amber-100 bg-amber-50/70 p-4 text-sm leading-6 text-slate-700">
              Start of lesson: <span className="font-black">🔥 Streak 0 / 3</span>
              <br />
              Answer 3 correctly in a row without hints to trigger the first bonus reward.
            </div>
          </div>

          <div className="mt-6 rounded-[24px] bg-white/72 p-5">
            <p className="quest-kicker">Learning tip</p>
            <h2 className="mt-3 quest-panel-title">Keep this in mind</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{lesson.learningTip}</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
