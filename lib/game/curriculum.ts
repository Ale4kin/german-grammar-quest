import { mockCountries } from "@/data/countries";
import {
  getExerciseById as getTopicExerciseById,
  getExercisesByLesson as getTopicExercisesByLesson,
} from "@/data/exercises/topics";
import { mockKingdoms } from "@/data/kingdoms";
import { mockLessons } from "@/data/lessons";
import type { Country, Exercise, Kingdom, Lesson } from "@/types";

export function getKingdomById(kingdomId: string): Kingdom | undefined {
  return mockKingdoms.find((kingdom) => kingdom.id === kingdomId);
}

export function getCountryById(countryId: string): Country | undefined {
  return mockCountries.find((country) => country.id === countryId);
}

export function getLessonById(lessonId: string): Lesson | undefined {
  return mockLessons.find((lesson) => lesson.id === lessonId);
}

export function getLessonByCountryId(countryId: string): Lesson | undefined {
  return mockLessons.find((lesson) => lesson.countryId === countryId);
}

export function getExerciseById(exerciseId: string): Exercise | undefined {
  return getTopicExerciseById(exerciseId);
}

export function getExercisesByLesson(lessonId: string): Exercise[] {
  return getTopicExercisesByLesson(lessonId);
}
