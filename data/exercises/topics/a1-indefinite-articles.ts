import type { Exercise } from "@/types";

export const a1_indefinite_articles: Exercise[] = [
  {
    "id": "ex-101",
    "lessonId": "a1-indefinite-articles",
    "type": "article-choice",
    "prompt": "Choose the correct indefinite article for the noun.",
    "noun": "Tisch",
    "options": [
      "ein",
      "eine",
      "einen"
    ],
    "correctAnswer": "ein",
    "hint": "Tisch is masculine, and here it is the basic dictionary form.",
    "explanation": "We say ein Tisch.",
    "difficulty": "A1"
  },
  {
    "id": "ex-102",
    "lessonId": "a1-indefinite-articles",
    "type": "article-choice",
    "prompt": "Choose the correct indefinite article for the noun.",
    "noun": "Lampe",
    "options": [
      "ein",
      "eine",
      "einen"
    ],
    "correctAnswer": "eine",
    "hint": "Lampe is feminine.",
    "explanation": "We say eine Lampe.",
    "difficulty": "A1"
  },
  {
    "id": "ex-103",
    "lessonId": "a1-indefinite-articles",
    "type": "article-choice",
    "prompt": "Choose the correct indefinite article for the noun.",
    "noun": "Buch",
    "options": [
      "ein",
      "eine",
      "einen"
    ],
    "correctAnswer": "ein",
    "hint": "Buch is neuter in German.",
    "explanation": "We say ein Buch.",
    "difficulty": "A1"
  },
  {
    "id": "ex-104",
    "lessonId": "a1-indefinite-articles",
    "type": "article-choice",
    "prompt": "Choose the article for a noun you mention for the first time.",
    "noun": "Auf dem Tisch liegt ___ Buch.",
    "supportText": "You are introducing the book for the first time.",
    "options": [
      "ein",
      "eine",
      "einen"
    ],
    "correctAnswer": "ein",
    "hint": "A new singular noun often starts with an indefinite article.",
    "explanation": "The book is new information here, so we say ein Buch.",
    "difficulty": "A1"
  },
  {
    "id": "ex-105",
    "lessonId": "a1-indefinite-articles",
    "type": "article-choice",
    "prompt": "Choose the article for a new noun in a simple scene.",
    "noun": "Im Hof wächst ___ Baum.",
    "supportText": "You are talking about one tree, but not a specific known tree.",
    "options": [
      "ein",
      "eine",
      "einen"
    ],
    "correctAnswer": "ein",
    "hint": "Baum is masculine, and this sentence introduces it as new information.",
    "explanation": "This is a new, non-specific tree, so we say ein Baum.",
    "difficulty": "A1"
  },
  {
    "id": "ex-106",
    "lessonId": "a1-indefinite-articles",
    "type": "phrase-choice",
    "prompt": "Choose the article in a classification sentence.",
    "noun": "Berlin ist ___ große Stadt.",
    "options": [
      "ein",
      "eine",
      "einen"
    ],
    "correctAnswer": "eine",
    "hint": "Stadt is feminine, and the sentence tells us what Berlin is.",
    "explanation": "When we classify Berlin as a city, we say eine große Stadt.",
    "difficulty": "A1"
  },
  {
    "id": "ex-107",
    "lessonId": "a1-indefinite-articles",
    "type": "phrase-choice",
    "prompt": "Choose the article in a grammar definition.",
    "noun": "Das Wort „Haus“ ist ___ Substantiv.",
    "options": [
      "ein",
      "eine",
      "einen"
    ],
    "correctAnswer": "ein",
    "hint": "Substantiv is neuter, and the sentence tells us what the word is.",
    "explanation": "We classify the word, so we say ein Substantiv.",
    "difficulty": "A1"
  },
  {
    "id": "ex-108",
    "lessonId": "a1-indefinite-articles",
    "type": "phrase-choice",
    "prompt": "Choose the article with a profession that has an adjective.",
    "noun": "Sie ist ___ fleißige Studentin.",
    "options": [
      "ein",
      "eine",
      "einen"
    ],
    "correctAnswer": "eine",
    "hint": "Studentin is feminine, and the adjective makes the description more specific.",
    "explanation": "With an added adjective, German uses the article here: eine fleißige Studentin.",
    "difficulty": "A1"
  },
  {
    "id": "ex-109",
    "lessonId": "a1-indefinite-articles",
    "type": "phrase-choice",
    "prompt": "Choose the article in a comparison.",
    "noun": "Er schwimmt wie ___ Fisch.",
    "options": [
      "ein",
      "eine",
      "einen"
    ],
    "correctAnswer": "ein",
    "hint": "Fisch is masculine, and this is a comparison.",
    "explanation": "In this comparison, German says wie ein Fisch.",
    "difficulty": "A1"
  },
  {
    "id": "ex-110",
    "lessonId": "a1-indefinite-articles",
    "type": "case-form",
    "prompt": "Choose the article after the verb haben.",
    "noun": "Wir haben ___ Garten.",
    "options": [
      "ein",
      "eine",
      "einen"
    ],
    "correctAnswer": "einen",
    "hint": "Garten is masculine, and after haben it is the object.",
    "explanation": "Masculine objects often change to einen in the accusative: Wir haben einen Garten.",
    "difficulty": "A1"
  },
  {
    "id": "ex-111",
    "lessonId": "a1-indefinite-articles",
    "type": "case-form",
    "prompt": "Choose the article after the verb brauchen.",
    "noun": "Ich brauche ___ Jacke.",
    "options": [
      "ein",
      "eine",
      "einen"
    ],
    "correctAnswer": "eine",
    "hint": "Jacke is feminine, so the article stays feminine here.",
    "explanation": "We say eine Jacke because Jacke is feminine.",
    "difficulty": "A1"
  },
  {
    "id": "ex-112",
    "lessonId": "a1-indefinite-articles",
    "type": "phrase-choice",
    "prompt": "Choose the article after es gibt.",
    "noun": "In der Stadt gibt es ___ Museum.",
    "options": [
      "ein",
      "eine",
      "einen"
    ],
    "correctAnswer": "ein",
    "hint": "Museum is neuter, and es gibt often introduces something new.",
    "explanation": "The noun is neuter and new here, so we say ein Museum.",
    "difficulty": "A1"
  }
] as Exercise[];

export default a1_indefinite_articles;
