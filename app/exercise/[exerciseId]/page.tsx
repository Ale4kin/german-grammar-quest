import { notFound } from "next/navigation";
import { ExerciseRunner } from "@/components/game/exercise-runner";
import { getExerciseById, getExercisesByLesson } from "@/lib/game";

type ExercisePageProps = {
  params: Promise<{
    exerciseId: string;
  }>;
};

export default async function ExercisePage({ params }: ExercisePageProps) {
  const { exerciseId } = await params;
  const exercise = getExerciseById(exerciseId);

  if (!exercise) {
    notFound();
  }

  const lessonExercises = getExercisesByLesson(exercise.lessonId);

  return <ExerciseRunner exercises={lessonExercises} initialExerciseId={exerciseId} />;
}
