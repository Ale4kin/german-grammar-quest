import { a1_articles } from './a1-articles';
import { a1_indefinite_articles } from './a1-indefinite-articles';
import { a1_zero_article } from './a1-zero-article';
import { a1_accusative } from './a1-accusative';
import { a1_dative } from './a1-dative';
import { a1_genitive } from './a1-genitive';
import { a1_personal_pronouns } from './a1-personal-pronouns';
import { a1_possessive_pronouns } from './a1-possessive-pronouns';
import { a1_man } from './a1-man';
import { a1_es } from './a1-es';
import { a1_prepositions_dative } from './a1-prepositions-dative';
import { a1_prepositions_accusative } from './a1-prepositions-accusative';
import { a1_prepositions_genitive } from './a1-prepositions-genitive';
import { a1_two_way_prepositions } from './a1-two-way-prepositions';
import { a1_degrees_of_comparison } from './a1-degrees-of-comparison';
import { a1_present_weak_verbs } from './a1-present-weak-verbs';
import { a1_present_irregular_verbs } from './a1-present-irregular-verbs';
import { a1_present_strong_verbs } from './a1-present-strong-verbs';
import { a1_present_modal_verbs } from './a1-present-modal-verbs';

export const allTopics = [
	a1_articles,
	a1_indefinite_articles,
	a1_zero_article,
	a1_accusative,
	a1_dative,
	a1_genitive,
	a1_personal_pronouns,
	a1_possessive_pronouns,
	a1_man,
	a1_es,
	a1_prepositions_dative,
	a1_prepositions_accusative,
	a1_prepositions_genitive,
	a1_two_way_prepositions,
	a1_degrees_of_comparison,
	a1_present_weak_verbs,
	a1_present_irregular_verbs,
	a1_present_strong_verbs,
	a1_present_modal_verbs,
];

export const topicsMockExercises = ([] as import('@/types').Exercise[]).concat(...allTopics);

export const exercisesByLesson = allTopics.reduce<Record<string, import('@/types').Exercise[]>>((map, topic) => {
  topic.forEach((exercise) => {
    if (!map[exercise.lessonId]) {
      map[exercise.lessonId] = [];
    }
    map[exercise.lessonId].push(exercise);
  });
  return map;
}, {});

export const exercisesById = allTopics.reduce<Record<string, import('@/types').Exercise>>((map, topic) => {
  topic.forEach((exercise) => {
    map[exercise.id] = exercise;
  });
  return map;
}, {});

export function getExercisesByLesson(lessonId: string) {
  return exercisesByLesson[lessonId] ?? [];
}

export function getExerciseById(exerciseId: string) {
  return exercisesById[exerciseId];
}

