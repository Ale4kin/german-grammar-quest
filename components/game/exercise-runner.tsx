"use client";

import Link from "next/link";
import { getGameMode } from "@/data/game-modes";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  buildProgressFromResults,
  getLessonById,
  getNextStreakMilestone,
  getRemainingAnswersForMilestone,
  getUnlockedStreakMilestones,
  scoreAnswer,
} from "@/lib/game";
import { buildLessonHref, buildResultHref } from "@/lib/routes";
import type { Exercise, ExerciseRoundResult, GameModeId } from "@/types";

type ExerciseRunnerProps = {
  exercises: Exercise[];
  initialExerciseId: string;
  modeId: GameModeId;
};

export function ExerciseRunner({ exercises, initialExerciseId, modeId }: ExerciseRunnerProps) {
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
  const exerciseType = currentExercise?.type ?? "article-choice";
  const lesson = currentExercise ? getLessonById(currentExercise.lessonId) : undefined;
  const mode = getGameMode(modeId);

  const progress = useMemo(() => {
    const lessonId = exercises[0]?.lessonId ?? "a1-articles";
    return buildProgressFromResults(results, lessonId);
  }, [exercises, results]);

  if (!currentExercise) {
    return (
      <main className="quest-page justify-center">
        <section className="quest-content quest-card p-6 sm:p-8">
          <h1 className="text-3xl font-bold">No exercises found.</h1>
        </section>
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
    const extendsStreak = isCorrect && !usedHint;
    const nextStreak = extendsStreak ? previousStreak + 1 : 0;
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
      const bestStreak = results.reduce(
        (best, result) => Math.max(best, result.streakAfterAnswer),
        0,
      );
      const runId =
        typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : `${currentExercise.lessonId}-${Date.now()}`;

      router.push(
        buildResultHref({
          runId,
          lessonId: currentExercise.lessonId,
          modeId: mode.id,
          gems: nextProgress.gems,
          correct: nextProgress.correctAnswers,
          total: exercises.length,
          streak: nextProgress.streak,
          bestStreak,
          hints: nextProgress.hintUses,
        }),
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
        summary: "You recovered well. The hint cost gems and reset the combo streak.",
      };
    }

    if (currentResult.isCorrect) {
      return {
        title: "Correct",
        toneClass: "border-emerald-200 bg-emerald-50/80",
        summary: "Good answer. You got the form right without support.",
      };
    }

    return {
      title: "Incorrect",
      toneClass: "border-rose-200 bg-rose-50/80",
      summary: `The correct answer is ${currentExercise.correctAnswer}. Read the explanation, then continue the run.`,
    };
  }

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

  const feedbackContent = getFeedbackContent();
  const exerciseTypeMeta = getExerciseTypeMeta();
  const progressWidth = ((currentIndex + 1) / exercises.length) * 100;
  const nextMilestone = getNextStreakMilestone(progress.streak);
  const answersToNextMilestone = nextMilestone
    ? getRemainingAnswersForMilestone(progress.streak, nextMilestone.streak)
    : 0;
  const unlockedMilestones = getUnlockedStreakMilestones(progress.streak);

  return (
    <main className="quest-page">
      <header className="quest-content grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="quest-card p-6 sm:p-7">
          <div className="flex flex-wrap items-center gap-3">
            <span className="quest-chip">Mode: {mode.name}</span>
            <span className="quest-chip">
              Question {currentIndex + 1} / {exercises.length}
            </span>
            <span className="quest-chip quest-chip-gem">💎 {progress.gems} gems</span>
            <span className="quest-chip quest-chip-streak">🔥 streak {progress.streak}</span>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="quest-kicker">Active exercise</p>
              <h1 className="mt-2 quest-title text-4xl sm:text-5xl">
                {lesson?.title ?? "Grammar encounter"}
              </h1>
            </div>
            <Link href={buildLessonHref(currentExercise.lessonId, mode.id)} className="quest-button-secondary">
              Exit to lesson
            </Link>
          </div>

          <p className="mt-4 quest-subtitle max-w-2xl">{currentExercise.prompt}</p>

          <div className="mt-6 quest-card p-4 sm:p-5">
            <div className="flex items-center justify-between text-sm font-semibold text-slate-600">
              <span>Run progress</span>
              <span>{currentIndex + 1} of {exercises.length}</span>
            </div>
            <div className="quest-progress-track mt-3">
              <div
                className="quest-progress-fill transition-all"
                style={{ width: `${progressWidth}%` }}
              />
            </div>
          </div>
        </div>

        <aside className="quest-card p-6 sm:p-7">
          <p className="quest-kicker">Question framing</p>
          <h2 className="mt-3 quest-panel-title">{exerciseTypeMeta.badge}</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">{exerciseTypeMeta.helper}</p>

          <div className="mt-5 rounded-[24px] bg-white/72 p-5">
            <p className="quest-kicker">Current mode</p>
            <h3 className="mt-2 text-lg font-black text-slate-800">Mode: {mode.name}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{mode.summary}</p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            <div className="quest-stat-card">
              <p className="text-sm text-slate-500">Streak status</p>
              <p className="mt-1 text-lg font-black text-slate-800">
                🔥 Streak {progress.streak}
                {nextMilestone ? ` / ${nextMilestone.streak}` : ""}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {nextMilestone
                  ? `Answer ${answersToNextMilestone} more correctly without a hint to get ${
                      nextMilestone.rewardType === "gems"
                        ? `+${nextMilestone.gemBonus ?? 0} bonus gems`
                        : nextMilestone.rewardType === "chest"
                          ? "a small chest"
                          : "the perfect combo badge"
                    }.`
                  : "Top reward reached. Keep the combo alive."}
              </p>
            </div>
            <div className="quest-stat-card">
              <p className="text-sm text-slate-500">Run status</p>
              <p className="mt-1 text-lg font-black text-slate-800">
                {progress.correctAnswers} / {results.length}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {usedHint
                  ? "Hint already used on this question. This answer cannot extend the streak."
                  : "No hint used on this question yet."}
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-[24px] bg-white/72 p-5">
            <p className="quest-kicker">Unlocked this run</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {unlockedMilestones.length > 0 ? (
                unlockedMilestones.map((milestone) => (
                  <span
                    key={milestone.streak}
                    className="quest-chip px-2.5 py-1 text-xs font-bold"
                  >
                    {milestone.rewardType === "gems"
                      ? `🔥 ${milestone.streak}: +${milestone.gemBonus ?? 0} gems`
                      : milestone.rewardType === "chest"
                        ? `🧰 ${milestone.title}`
                        : `🏅 ${milestone.title}`}
                  </span>
                ))
              ) : (
                <p className="text-sm leading-6 text-slate-600">
                  No streak milestone unlocked yet.
                </p>
              )}
            </div>
          </div>
        </aside>
      </header>

      <section className="quest-content grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="quest-card overflow-hidden p-5 sm:p-7">
          <div>
            <p className="quest-kicker">Prompt</p>
            {currentExercise.supportText ? (
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                Context: {currentExercise.supportText}
              </p>
            ) : null}
            <p className="mt-4 text-4xl font-black text-slate-800 sm:text-5xl">
              {currentExercise.noun}
            </p>
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
                <p className="quest-kicker">Explanation</p>
                <p className="mt-2 text-slate-700">{currentExercise.explanation}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-700">
                <span className="quest-chip quest-chip-gem">
                  Gems earned {currentResult.gemsEarned + currentResult.bonusGemsEarned}
                </span>
                <span className="quest-chip">Hint {currentResult.usedHint ? "used" : "not used"}</span>
                <span className="quest-chip quest-chip-streak">
                  Streak {currentResult.streakAfterAnswer}
                </span>
                {currentResult.isCorrect && currentResult.usedHint ? (
                  <span className="quest-chip bg-amber-100 font-bold text-amber-900">
                    Combo reset by hint
                  </span>
                ) : null}
                {currentResult.bonusGemsEarned > 0 ? (
                  <span className="quest-chip bg-emerald-100 font-bold text-emerald-800">
                    🔥 Streak reward +{currentResult.bonusGemsEarned}
                  </span>
                ) : null}
                {currentResult.streakAfterAnswer === 5 ? (
                  <span className="quest-chip bg-amber-100 font-bold text-amber-900">
                    🧰 Small chest opened
                  </span>
                ) : null}
                {currentResult.streakAfterAnswer === 10 ? (
                  <span className="quest-chip bg-sky-100 font-bold text-sky-900">
                    🏅 Perfect combo badge
                  </span>
                ) : null}
              </div>
              <button type="button" onClick={handleNext} className="quest-button-primary mt-5">
                {currentIndex === exercises.length - 1 ? "See results" : "Next question"}
              </button>
            </div>
          ) : null}
        </div>

        <aside className="quest-card p-5 sm:p-6">
          <p className="quest-kicker">Hint panel</p>
          <h2 className="mt-3 quest-panel-title">Use support only when needed</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Hints keep the run moving, but they reduce the reward for that answer.
          </p>

          <button
            type="button"
            onClick={handleUseHint}
            disabled={usedHint || hasAnswered}
            className="quest-button-secondary mt-5 w-full disabled:cursor-not-allowed disabled:opacity-60"
          >
            {usedHint ? "Hint already used" : "Show hint"}
          </button>

          <div className="mt-4 rounded-[24px] border border-amber-100 bg-gradient-to-r from-amber-50/90 to-orange-50/90 p-4">
            <p className="quest-kicker text-amber-900">Hint text</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {usedHint ? currentExercise.hint : "No hint open yet. Try the answer first if you can."}
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
