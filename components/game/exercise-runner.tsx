"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { buildProgressFromResults, scoreAnswer } from "@/lib/game";
import type { Exercise, ExerciseRoundResult } from "@/types";

type ExerciseRunnerProps = {
  exercises: Exercise[];
  initialExerciseId: string;
};

export function ExerciseRunner({ exercises, initialExerciseId }: ExerciseRunnerProps) {
  const router = useRouter();
  const initialIndex = Math.max(
    0,
    exercises.findIndex((exercise) => exercise.id === initialExerciseId),
  );

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [results, setResults] = useState<ExerciseRoundResult[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [usedHint, setUsedHint] = useState(false);

  const currentExercise = exercises[currentIndex];
  const roundIndex = currentIndex - initialIndex;
  const currentResult = results[roundIndex];
  const hasAnswered = Boolean(currentResult);
  const exerciseType = currentExercise.type ?? "article-choice";

  const progress = useMemo(() => {
    const lessonId = exercises[0]?.lessonId ?? "a1-articles";
    return buildProgressFromResults(results, lessonId);
  }, [exercises, results]);

  if (!currentExercise) {
    return (
      <main className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center gap-4 px-6 py-12">
        <h1 className="text-3xl font-bold">No exercises found.</h1>
      </main>
    );
  }

  function handleUseHint() {
    if (hasAnswered) {
      return;
    }

    setUsedHint(true);
  }

  function handleAnswer(option: string) {
    if (hasAnswered) {
      return;
    }

    const isCorrect = option === currentExercise.correctAnswer;
    const previousStreak = roundIndex === 0 ? 0 : results[roundIndex - 1]?.streakAfterAnswer ?? 0;
    const nextStreak = isCorrect ? previousStreak + 1 : 0;
    const { gemsEarned, bonusGemsEarned } = scoreAnswer(isCorrect, usedHint, nextStreak);

    const nextResult: ExerciseRoundResult = {
      exerciseId: currentExercise.id,
      selectedAnswer: option,
      isCorrect,
      usedHint,
      gemsEarned,
      streakAfterAnswer: nextStreak,
      bonusGemsEarned,
    };

    setSelectedAnswer(option);
    setResults((prev) => [...prev, nextResult]);
  }

  function handleNext() {
    const isLastQuestion = currentIndex === exercises.length - 1;

    if (isLastQuestion) {
      const nextProgress = buildProgressFromResults(results, currentExercise.lessonId);
      const bestStreak = results.reduce((best, result) => Math.max(best, result.streakAfterAnswer), 0);

      router.push(
        `/result?lessonId=${currentExercise.lessonId}&gems=${nextProgress.gems}&correct=${nextProgress.correctAnswers}&total=${exercises.length}&streak=${nextProgress.streak}&bestStreak=${bestStreak}&hints=${nextProgress.hintUses}`,
      );
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setSelectedAnswer(null);
    setUsedHint(false);
  }

  function getOptionState(option: string) {
    if (!hasAnswered) {
      return "border-white/70 bg-white/80 text-slate-800 hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-white";
    }

    if (option === currentExercise.correctAnswer) {
      return "border-emerald-400 bg-emerald-50 text-emerald-900";
    }

    if (option === selectedAnswer) {
      return "border-rose-400 bg-rose-50 text-rose-900";
    }

    return "border-slate-200 bg-slate-100/90 text-slate-500";
  }

  function getFeedbackContent() {
    if (!currentResult) {
      return null;
    }

    if (currentResult.isCorrect && currentResult.usedHint) {
      return {
        title: "Correct after hint",
        toneClass: "border-amber-200 bg-amber-50/80",
        summary: "Nice recovery. The hint helped you find the right article.",
      };
    }

    if (currentResult.isCorrect) {
      return {
        title: "Correct",
        toneClass: "border-emerald-200 bg-emerald-50/80",
        summary: "Great job. You chose the right article on your own.",
      };
    }

    return {
      title: "Wrong answer",
      toneClass: "border-rose-200 bg-rose-50/80",
      summary: `The correct answer is ${currentExercise.correctAnswer}. Try to remember the full form that fits this situation.`,
    };
  }

  const feedbackContent = getFeedbackContent();

  function getExerciseTypeMeta() {
    switch (exerciseType) {
      case "pronoun-choice":
        return {
          badge: "Pronoun choice",
          helper: "Choose the pronoun that replaces the noun correctly.",
        };
      case "possessive-choice":
        return {
          badge: "Possessive choice",
          helper: "Choose the possessive form that matches the owner and the noun.",
        };
      case "case-form":
        return {
          badge: "Case form",
          helper: "Choose the form that matches the noun's role in the sentence.",
        };
      case "phrase-choice":
        return {
          badge: "Phrase choice",
          helper: "Choose the full phrase that fits the grammar and the situation.",
        };
      case "question-word":
        return {
          badge: "Question word",
          helper: "Choose the question word that matches the case.",
        };
      case "ending-choice":
        return {
          badge: "Ending choice",
          helper: "Choose the ending that completes the noun form correctly.",
        };
      default:
        return {
          badge: "Article choice",
          helper: "Choose the article that fits this noun or sentence.",
        };
    }
  }

  const exerciseTypeMeta = getExerciseTypeMeta();

  return (
    <main className="quest-page">
      <header className="quest-content space-y-5">
        <div className="flex flex-wrap gap-3">
          <span className="quest-chip">Question {currentIndex + 1} / {exercises.length}</span>
          <span className="quest-chip quest-chip-gem">💎 {progress.gems} gems</span>
          <span className="quest-chip quest-chip-streak">🔥 streak {progress.streak}</span>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">Step 4</p>
          <h1 className="quest-title text-4xl sm:text-5xl">Grammar encounter</h1>
          <p className="quest-subtitle max-w-2xl">{currentExercise.prompt}</p>
        </div>
        <div className="quest-card p-4 sm:p-5">
          <div className="flex items-center justify-between text-sm font-semibold text-slate-600">
            <span>Quest progress</span>
            <span>{currentIndex + 1} of {exercises.length}</span>
          </div>
          <div className="quest-progress-track mt-3">
            <div
              className="quest-progress-fill transition-all"
              style={{ width: `${((currentIndex + 1) / exercises.length) * 100}%` }}
            />
          </div>
        </div>
      </header>

      <section className="quest-content quest-card overflow-hidden p-5 sm:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">Challenge</p>
            <p className="mt-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-600">
              {exerciseTypeMeta.badge}
            </p>
            {currentExercise.supportText ? (
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                Context: {currentExercise.supportText}
              </p>
            ) : null}
            <p className="mt-3 text-4xl font-black text-slate-800 sm:text-5xl">{currentExercise.noun}</p>
          </div>
          <div className="rounded-[24px] bg-gradient-to-br from-amber-100 via-orange-100 to-emerald-100 px-5 py-4 text-sm font-bold text-slate-700 shadow-inner">
            {exerciseTypeMeta.helper}
          </div>
        </div>

        <div className="mt-6 rounded-[24px] border border-amber-100 bg-gradient-to-r from-amber-50/90 to-orange-50/90 p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-amber-900">Hint panel</p>
              <p className="mt-1 text-sm leading-6 text-slate-700">
                Use a hint if you are unsure. You will still learn the rule, but you earn fewer gems.
              </p>
            </div>
            <button
              type="button"
              onClick={handleUseHint}
              disabled={usedHint || hasAnswered}
              className="inline-flex items-center justify-center rounded-full border border-amber-200 bg-white/90 px-4 py-2 text-sm font-bold text-amber-900 transition disabled:cursor-not-allowed disabled:opacity-60"
            >
              {usedHint ? "✨ Hint used" : "✨ Show hint"}
            </button>
          </div>
          <div className="mt-3 rounded-[18px] bg-white/70 px-4 py-3 text-sm leading-6 text-slate-600">
            {usedHint ? currentExercise.hint : "No hint open yet. Try the question first if you can."}
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          {currentExercise.options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleAnswer(option)}
              disabled={hasAnswered}
              className={`rounded-[24px] border px-5 py-4 text-left text-lg font-black transition ${getOptionState(option)} disabled:cursor-not-allowed`}
            >
              {option}
            </button>
          ))}
        </div>

        {currentResult && feedbackContent ? (
          <div className={`mt-6 rounded-[28px] border p-5 sm:p-6 ${feedbackContent.toneClass}`}>
            <h2 className="text-xl font-black text-slate-800">{feedbackContent.title}</h2>
            <p className="mt-2 text-sm font-semibold text-slate-700">{feedbackContent.summary}</p>
            <div className="mt-4 rounded-[20px] bg-white/70 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Explanation</p>
              <p className="mt-2 text-slate-700">{currentExercise.explanation}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-700">
              <span className="quest-chip quest-chip-gem">
                Gems earned {currentResult.gemsEarned + currentResult.bonusGemsEarned}
              </span>
              <span className="quest-chip">Hint {currentResult.usedHint ? "used" : "not used"}</span>
              <span className="quest-chip quest-chip-streak">Streak {currentResult.streakAfterAnswer}</span>
              {currentResult.bonusGemsEarned > 0 ? (
                <span className="quest-chip bg-emerald-100 font-bold text-emerald-800">
                  3-correct bonus +{currentResult.bonusGemsEarned}
                </span>
              ) : null}
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="quest-button-primary mt-5"
            >
              {currentIndex === exercises.length - 1 ? "See results" : "Next"}
            </button>
          </div>
        ) : null}
      </section>
    </main>
  );
}
