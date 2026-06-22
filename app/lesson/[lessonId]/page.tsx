import Link from "next/link";
import { notFound } from "next/navigation";
import { getExercisesByLesson } from "@/data/exercises/topics";
import { mockLessons } from "@/data/lessons";

type LessonPageProps = {
  params: Promise<{
    lessonId: string;
  }>;
};

export default async function LessonPage({ params }: LessonPageProps) {
  const { lessonId } = await params;
  const lesson = mockLessons.find((entry) => entry.id === lessonId);

  if (!lesson) {
    notFound();
  }

  const lessonExercises = getExercisesByLesson(lessonId);
  const isArticleLesson = lesson.kingdomId === "articles";
  const exampleGridClass =
    lesson.grammarRuleExamples.length > 6
      ? "mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
      : "mt-4 grid gap-3 sm:grid-cols-3";

  return (
    <main className="quest-page">
      <header className="quest-content space-y-4">
        <div className="flex flex-wrap gap-3">
          <span className="quest-chip">Step 3</span>
          <span className="quest-chip">Lesson camp</span>
        </div>
        <h1 className="quest-title text-4xl sm:text-5xl">Lesson overview</h1>
      </header>

      <section className="quest-content grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="quest-card p-6 sm:p-7">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">
            Chapter focus
          </p>
          <h2 className="mt-3 text-3xl font-black text-slate-800">
            {lesson.title}
          </h2>
          <p className="mt-3 max-w-xl text-slate-600">
            This lesson contains {lessonExercises.length} exercise
            {lessonExercises.length === 1 ? "" : "s"} with short prompts, hints,
            and gem rewards.
          </p>
          <div className="mt-6 rounded-[24px] bg-white/72 p-5">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">
              Quick rule
            </p>
            <h3 className="mt-2 text-xl font-black text-slate-800">
              {lesson.grammarRuleTitle}
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {lesson.grammarRuleSummary}
            </p>
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
                  <p className="mt-2 text-sm font-semibold text-slate-800">
                    {example.example}
                  </p>
                </div>
              ))}
            </div>
            {lesson.grammarNotes?.length ? (
              <div className="mt-4 rounded-[20px] bg-white/70 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  When to use it
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                  {lesson.grammarNotes.map((note) => (
                    <li key={note}>• {note}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {lesson.learningTip}
            </p>
          </div>
          <div className="mt-6 quest-progress-track">
            <div className="quest-progress-fill w-1/3" />
          </div>
          <div className="mt-3 flex items-center justify-between text-sm font-semibold text-slate-600">
            <span>Chapter path</span>
            <span>1 / 3</span>
          </div>
          {lessonExercises.length > 0 ? (
            <Link
              href={`/exercise/${lessonExercises[0].id}`}
              className="quest-button-primary mt-6"
            >
              Start first exercise
            </Link>
          ) : (
            <div className="mt-6 rounded-full border border-dashed border-slate-300 px-5 py-3 text-center text-sm font-semibold text-slate-500">
              Exercises coming soon
            </div>
          )}
        </div>

        <div className="quest-card p-6">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">
            Lesson intro
          </p>
          <div className="mt-4 grid gap-3">
            <div className="rounded-[22px] bg-white/70 p-4">
              <p className="text-sm text-slate-500">What to do</p>
              <p className="mt-1 text-base font-bold leading-6 text-slate-800">
                Start with core form patterns, then move into short sentence
                contexts and usage rules.
              </p>
            </div>
            <div className="rounded-[22px] bg-white/70 p-4">
              <p className="text-sm text-slate-500">Scoring</p>
              <p className="mt-1 text-base font-bold leading-6 text-slate-800">
                +15 correct, +5 after hint, +10 bonus after 3 correct in a row.
              </p>
            </div>
            <div className="rounded-[22px] bg-white/70 p-4">
              <p className="text-sm text-slate-500">Learning tip</p>
              <p className="mt-1 text-base font-bold leading-6 text-slate-800">
                Pay attention to the short explanation after every answer.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
