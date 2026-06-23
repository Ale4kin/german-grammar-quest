import { notFound } from "next/navigation";
import { ExerciseRunner } from "@/components/game/exercise-runner";
import type { GameModeId } from "@/types";
import { getExerciseById, getExercisesByLesson } from "@/lib/game";

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
  const modeId: GameModeId = resolvedSearchParams?.mode === "explorer" ? "explorer" : "explorer";

  return <ExerciseRunner exercises={lessonExercises} initialExerciseId={exerciseId} modeId={modeId} />;
}
