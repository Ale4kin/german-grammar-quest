import { notFound } from "next/navigation";
import { ExerciseRunner } from "@/components/game/exercise-runner";
import { getExerciseById, getExercisesByLesson } from "@/lib/game";
import { resolveGameModeId } from "@/lib/modes";

type ExercisePageProps = {
  params: Promise<{
    exerciseId: string;
  }>;
  searchParams?: Promise<{
    mode?: string;
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
  const modeId = resolveGameModeId(resolvedSearchParams?.mode);

  return <ExerciseRunner exercises={lessonExercises} initialExerciseId={exerciseId} modeId={modeId} />;
}
