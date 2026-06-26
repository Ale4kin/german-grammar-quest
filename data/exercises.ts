import type { Exercise } from "@/types";
import { a1_articles } from "./exercises/topics/a1-articles";
import { a1_indefinite_articles } from "./exercises/topics/a1-indefinite-articles";
import { a1_zero_article } from "./exercises/topics/a1-zero-article";
import { a1_accusative } from "./exercises/topics/a1-accusative";
import { a1_dative } from "./exercises/topics/a1-dative";
import { a1_genitive } from "./exercises/topics/a1-genitive";
import { a1_personal_pronouns } from "./exercises/topics/a1-personal-pronouns";
import { a1_possessive_pronouns } from "./exercises/topics/a1-possessive-pronouns";
import { a1_man } from "./exercises/topics/a1-man";
import { a1_es } from "./exercises/topics/a1-es";
import { a1_prepositions_dative } from "./exercises/topics/a1-prepositions-dative";
import { a1_prepositions_accusative } from "./exercises/topics/a1-prepositions-accusative";
import { a1_prepositions_genitive } from "./exercises/topics/a1-prepositions-genitive";
import { a1_two_way_prepositions } from "./exercises/topics/a1-two-way-prepositions";
import { a1_degrees_of_comparison } from "./exercises/topics/a1-degrees-of-comparison";
import { a1_present_weak_verbs } from "./exercises/topics/a1-present-weak-verbs";
import { a1_present_irregular_verbs } from "./exercises/topics/a1-present-irregular-verbs";
import { a1_present_strong_verbs } from "./exercises/topics/a1-present-strong-verbs";
import { a1_present_modal_verbs } from "./exercises/topics/a1-present-modal-verbs";

export const mockExercises: Exercise[] = ([] as Exercise[]).concat(
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
);

export default mockExercises;
