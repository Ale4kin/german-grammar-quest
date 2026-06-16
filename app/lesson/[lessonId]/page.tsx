import Link from "next/link";
import { notFound } from "next/navigation";
import { mockExercises } from "@/data/exercises";
import { mockLessons } from "@/data/lessons";

type LessonPageProps = {
  params: Promise<{
    lessonId: string;
  }>;
};

export default async function LessonPage({ params }: LessonPageProps) {
  const { lessonId } = await params;
  const lesson = mockLessons.find((entry) => entry.id === lessonId);
  const lessonExercises = mockExercises.filter((exercise) => exercise.lessonId === lessonId);

  if (!lesson) {
    notFound();
  }

  return (
    <main className="quest-page">
      <header className="quest-content space-y-4">
        <div className="flex flex-wrap gap-3">
          <span className="quest-chip">Step 3</span>
          <span className="quest-chip">Lesson camp</span>
        </div>
        <h1 className="quest-title text-4xl sm:text-5xl">Lesson overview</h1>
        <p className="quest-subtitle">
          Lesson id: <span className="font-mono">{lessonId}</span>
        </p>
      </header>

      <section className="quest-content grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="quest-card p-6 sm:p-7">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">Chapter focus</p>
          <h2 className="mt-3 text-3xl font-black text-slate-800">{lesson.title}</h2>
          <p className="mt-3 max-w-xl text-slate-600">
            This lesson contains {lessonExercises.length} exercise{lessonExercises.length === 1 ? "" : "s"} with short noun prompts, hints, and gem rewards.
          </p>
          <div className="mt-6 rounded-[24px] bg-white/72 p-5">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">Quick rule</p>
            <h3 className="mt-2 text-xl font-black text-slate-800">{lesson.grammarRuleTitle}</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {lesson.grammarRuleExamples.map((example) => (
                <div
                  key={example.article}
                  className={
                    example.article === "der"
                      ? "rounded-[20px] bg-emerald-50 p-4"
                      : example.article === "die"
                        ? "rounded-[20px] bg-rose-50 p-4"
                        : "rounded-[20px] bg-amber-50 p-4"
                  }
                >
                  <p
                    className={
                      example.article === "der"
                        ? "text-sm font-bold text-emerald-800"
                        : example.article === "die"
                          ? "text-sm font-bold text-rose-800"
                          : "text-sm font-bold text-amber-800"
                    }
                  >
                    {example.article}
                  </p>
                  <p className="mt-1 text-sm text-slate-700">{example.label}</p>
                  <p className="mt-2 text-sm font-semibold text-slate-800">{example.example}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">{lesson.learningTip}</p>
          </div>
          <div className="mt-6 quest-progress-track">
            <div className="quest-progress-fill w-1/3" />
          </div>
          <div className="mt-3 flex items-center justify-between text-sm font-semibold text-slate-600">
            <span>Chapter path</span>
            <span>1 / 3</span>
          </div>
          {lessonExercises.length > 0 ? (
            <Link href={`/exercise/${lessonExercises[0].id}`} className="quest-button-primary mt-6">
              Start first exercise
            </Link>
          ) : (
            <div className="mt-6 rounded-full border border-dashed border-slate-300 px-5 py-3 text-center text-sm font-semibold text-slate-500">
              Exercises coming soon
            </div>
          )}
        </div>

        <div className="quest-card p-6">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">Lesson intro</p>
          <div className="mt-4 grid gap-3">
            <div className="rounded-[22px] bg-white/70 p-4">
              <p className="text-sm text-slate-500">What to do</p>
              <p className="mt-1 text-base font-bold leading-6 text-slate-800">
                Read the noun, choose the article, use a hint only if needed.
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
