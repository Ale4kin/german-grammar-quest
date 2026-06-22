import type { Exercise } from "@/types";

export const a1_genitive: Exercise[] = [
  {
    "id": "ex-501",
    "lessonId": "a1-genitive",
    "type": "article-choice",
    "prompt": "Choose the correct genitive article.",
    "noun": "das Buch ___ Lehrers",
    "options": [
      "des",
      "dem",
      "den"
    ],
    "correctAnswer": "des",
    "hint": "Lehrer is masculine, and the phrase shows belonging.",
    "explanation": "Masculine singular usually takes des in the genitive: das Buch des Lehrers.",
    "difficulty": "A1"
  },
  {
    "id": "ex-502",
    "lessonId": "a1-genitive",
    "type": "article-choice",
    "prompt": "Choose the correct genitive article.",
    "noun": "die Tasche ___ Frau",
    "options": [
      "der",
      "die",
      "des"
    ],
    "correctAnswer": "der",
    "hint": "Frau is feminine, so the genitive article is different from masculine.",
    "explanation": "Feminine nouns use der in the genitive: die Tasche der Frau.",
    "difficulty": "A1"
  },
  {
    "id": "ex-503",
    "lessonId": "a1-genitive",
    "type": "article-choice",
    "prompt": "Choose the correct genitive article.",
    "noun": "das Fenster ___ Hauses",
    "options": [
      "des",
      "dem",
      "der"
    ],
    "correctAnswer": "des",
    "hint": "Haus is neuter, and neuter singular takes the same genitive article as masculine.",
    "explanation": "Neuter singular uses des in the genitive: das Fenster des Hauses.",
    "difficulty": "A1"
  },
  {
    "id": "ex-504",
    "lessonId": "a1-genitive",
    "type": "article-choice",
    "prompt": "Choose the correct genitive article.",
    "noun": "die Bücher ___ Kinder",
    "options": [
      "der",
      "des",
      "den"
    ],
    "correctAnswer": "der",
    "hint": "Kinder is plural here.",
    "explanation": "Plural nouns use der in the genitive: die Bücher der Kinder.",
    "difficulty": "A1"
  },
  {
    "id": "ex-505",
    "lessonId": "a1-genitive",
    "type": "phrase-choice",
    "prompt": "Choose the genitive phrase that shows belonging.",
    "noun": "Heft, Schüler",
    "supportText": "Build a noun phrase like in a book exercise.",
    "options": [
      "das Heft des Schülers",
      "das Heft dem Schüler",
      "das Heft den Schüler"
    ],
    "correctAnswer": "das Heft des Schülers",
    "hint": "The notebook belongs to the student.",
    "explanation": "The correct genitive group is das Heft des Schülers.",
    "difficulty": "A1"
  },
  {
    "id": "ex-506",
    "lessonId": "a1-genitive",
    "type": "phrase-choice",
    "prompt": "Choose the sentence that correctly rewrites the idea with the genitive.",
    "noun": "Der Onkel hat ein Auto.",
    "supportText": "Turn it into: This is ...",
    "options": [
      "Das ist das Auto des Onkels.",
      "Das ist dem Onkel das Auto.",
      "Das ist das Auto den Onkel."
    ],
    "correctAnswer": "Das ist das Auto des Onkels.",
    "hint": "You need a genitive phrase showing whose car it is.",
    "explanation": "The correct sentence is Das ist das Auto des Onkels.",
    "difficulty": "A1"
  },
  {
    "id": "ex-507",
    "lessonId": "a1-genitive",
    "type": "question-word",
    "prompt": "Choose the correct question word for the genitive.",
    "noun": "___ Hund ist im Garten?",
    "options": [
      "Wessen",
      "Wem",
      "Wen"
    ],
    "correctAnswer": "Wessen",
    "hint": "The question asks about possession.",
    "explanation": "Use Wessen? to ask whose something is.",
    "difficulty": "A1"
  },
  {
    "id": "ex-508",
    "lessonId": "a1-genitive",
    "type": "question-word",
    "prompt": "Choose the correct question word for the genitive.",
    "noun": "___ Adresse schreibt sie auf?",
    "options": [
      "Wessen",
      "Wer",
      "Wem"
    ],
    "correctAnswer": "Wessen",
    "hint": "The sentence asks whose address it is.",
    "explanation": "Use Wessen? because the question is about belonging.",
    "difficulty": "A1"
  },
  {
    "id": "ex-509",
    "lessonId": "a1-genitive",
    "type": "case-form",
    "prompt": "Choose the correct weak noun form in the genitive.",
    "noun": "die Mappe ___ Studenten",
    "options": [
      "des",
      "dem",
      "den"
    ],
    "correctAnswer": "des",
    "hint": "Student is a weak masculine noun, and the whole phrase is genitive.",
    "explanation": "Weak masculine nouns keep -en in the genitive: die Mappe des Studenten.",
    "difficulty": "A1"
  },
  {
    "id": "ex-510",
    "lessonId": "a1-genitive",
    "type": "ending-choice",
    "prompt": "Choose the missing ending for the masculine genitive noun.",
    "noun": "das Zimmer des Bruder__",
    "options": [
      "s",
      "es",
      "n"
    ],
    "correctAnswer": "s",
    "hint": "Bruder usually adds -s in the genitive singular.",
    "explanation": "The correct form is des Bruders.",
    "difficulty": "A1"
  },
  {
    "id": "ex-511",
    "lessonId": "a1-genitive",
    "type": "ending-choice",
    "prompt": "Choose the missing ending for the neuter genitive noun.",
    "noun": "die Tür des Haus__",
    "options": [
      "es",
      "s",
      "en"
    ],
    "correctAnswer": "es",
    "hint": "Haus usually takes -es in the genitive singular.",
    "explanation": "The correct genitive form is des Hauses.",
    "difficulty": "A1"
  },
  {
    "id": "ex-512",
    "lessonId": "a1-genitive",
    "type": "case-form",
    "prompt": "Choose the full genitive phrase that fits the sentence.",
    "noun": "Er versteht die Bedeutung ___ nicht.",
    "supportText": "The noun is Wörter, and the sentence means several words.",
    "options": [
      "der Wörter",
      "den Wörtern",
      "des Wortes"
    ],
    "correctAnswer": "der Wörter",
    "hint": "The sentence is about several words, and plural genitive uses der.",
    "explanation": "Because the meaning belongs to several words, the correct phrase is die Bedeutung der Wörter.",
    "difficulty": "A1"
  }
] as Exercise[];

export default a1_genitive;
