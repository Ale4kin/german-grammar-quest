import { notFound } from "next/navigation";
import { ExerciseRunner } from "@/components/game/exercise-runner";
import { getExerciseById, getExercisesByLesson } from "@/lib/game/curriculum";
import { resolveGameModeId } from "@/lib/game/modes";

type ExercisePageProps = {
  params: Promise<{
    exerciseId: string;
  }>;
  searchParams?: Promise<{
    mode?: string;
    set?: string;
  }>;
};

export default async function ExercisePage({ params, searchParams }: ExercisePageProps) {
  const { exerciseId } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const exercise = getExerciseById(exerciseId);

  if (!exercise) {
    notFound();
  }

  const lessonExercises = getExercisesByLesson(exercise.lessonId);
  const selectedExerciseIds = resolvedSearchParams?.set
    ? resolvedSearchParams.set.split(",").filter(Boolean)
    : [];
  const exerciseSet =
    selectedExerciseIds.length > 0
      ? lessonExercises.filter((entry) => selectedExerciseIds.includes(entry.id))
      : lessonExercises;
  const modeId = resolveGameModeId(resolvedSearchParams?.mode);
  const runType =
    selectedExerciseIds.length > 0 && selectedExerciseIds.length < lessonExercises.length
      ? "review"
      : "lesson";

  return (
    <ExerciseRunner
      exercises={exerciseSet}
      initialExerciseId={exerciseId}
      modeId={modeId}
      runType={runType}
    />
  );
}
