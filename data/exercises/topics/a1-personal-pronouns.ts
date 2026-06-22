import type { Exercise } from "@/types";

export const a1_personal_pronouns: Exercise[] = [
  {
    "id": "ex-601",
    "lessonId": "a1-personal-pronouns",
    "type": "pronoun-choice",
    "prompt": "Choose the correct subject pronoun.",
    "noun": "Das ist mein Freund. ___ heißt Thomas.",
    "options": [
      "Er",
      "Sie",
      "Es"
    ],
    "correctAnswer": "Er",
    "hint": "Freund is masculine and singular.",
    "explanation": "The noun Freund is replaced by er: Er heißt Thomas.",
    "difficulty": "A1"
  },
  {
    "id": "ex-602",
    "lessonId": "a1-personal-pronouns",
    "type": "pronoun-choice",
    "prompt": "Choose the correct subject pronoun.",
    "noun": "Das ist meine Freundin. ___ spricht gut Deutsch.",
    "options": [
      "Sie",
      "Er",
      "Es"
    ],
    "correctAnswer": "Sie",
    "hint": "Freundin is feminine and singular.",
    "explanation": "The noun Freundin is replaced by sie: Sie spricht gut Deutsch.",
    "difficulty": "A1"
  },
  {
    "id": "ex-603",
    "lessonId": "a1-personal-pronouns",
    "type": "pronoun-choice",
    "prompt": "Choose the correct subject pronoun.",
    "noun": "Wo ist dein Telefon? ___ steht auf dem Tisch.",
    "options": [
      "Es",
      "Er",
      "Sie"
    ],
    "correctAnswer": "Es",
    "hint": "Telefon is a neuter noun in German.",
    "explanation": "Das Telefon becomes es: Es steht auf dem Tisch.",
    "difficulty": "A1"
  },
  {
    "id": "ex-604",
    "lessonId": "a1-personal-pronouns",
    "type": "pronoun-choice",
    "prompt": "Choose the correct subject pronoun.",
    "noun": "Im Zimmer sind viele Kinder. ___ spielen.",
    "options": [
      "Sie",
      "Ihr",
      "Wir"
    ],
    "correctAnswer": "Sie",
    "hint": "Kinder is plural, so the subject pronoun is plural too.",
    "explanation": "Many children are replaced by sie: Sie spielen.",
    "difficulty": "A1"
  },
  {
    "id": "ex-605",
    "lessonId": "a1-personal-pronouns",
    "type": "case-form",
    "prompt": "Choose the correct object pronoun.",
    "noun": "Ich verstehe ___ nicht.",
    "supportText": "The noun is er.",
    "options": [
      "ihn",
      "ihm",
      "er"
    ],
    "correctAnswer": "ihn",
    "hint": "Verstehen takes a direct object, so you need the accusative form.",
    "explanation": "The accusative form of er is ihn: Ich verstehe ihn nicht.",
    "difficulty": "A1"
  },
  {
    "id": "ex-606",
    "lessonId": "a1-personal-pronouns",
    "type": "case-form",
    "prompt": "Choose the correct object pronoun.",
    "noun": "Hans bringt ___ das Buch.",
    "supportText": "The noun is ich.",
    "options": [
      "mir",
      "mich",
      "ich"
    ],
    "correctAnswer": "mir",
    "hint": "Bringen here has a receiver, so you need a dative pronoun.",
    "explanation": "The dative form of ich is mir: Hans bringt mir das Buch.",
    "difficulty": "A1"
  },
  {
    "id": "ex-607",
    "lessonId": "a1-personal-pronouns",
    "type": "case-form",
    "prompt": "Choose the correct object pronoun.",
    "noun": "Wir sprechen oft mit ___.",
    "supportText": "The nouns are Anna und Tom.",
    "options": [
      "ihnen",
      "sie",
      "ihr"
    ],
    "correctAnswer": "ihnen",
    "hint": "Mit always takes the dative, and the noun is plural.",
    "explanation": "Anna und Tom become ihnen after mit: Wir sprechen oft mit ihnen.",
    "difficulty": "A1"
  },
  {
    "id": "ex-608",
    "lessonId": "a1-personal-pronouns",
    "type": "phrase-choice",
    "prompt": "Choose the answer with the correct pronoun replacement.",
    "noun": "Lesen Sie diese Zeitung?",
    "options": [
      "Ja, ich lese sie.",
      "Ja, ich lese ihr.",
      "Ja, ich lese es."
    ],
    "correctAnswer": "Ja, ich lese sie.",
    "hint": "Zeitung is feminine, and lesen takes an accusative object.",
    "explanation": "Die Zeitung becomes sie in the accusative: Ja, ich lese sie.",
    "difficulty": "A1"
  },
  {
    "id": "ex-609",
    "lessonId": "a1-personal-pronouns",
    "type": "phrase-choice",
    "prompt": "Choose the sentence with the correct pronoun replacement.",
    "noun": "Der Hut gehört dem Vater.",
    "options": [
      "Er gehört ihm.",
      "Er gehört ihn.",
      "Ihn gehört er."
    ],
    "correctAnswer": "Er gehört ihm.",
    "hint": "Der Hut becomes er, and dem Vater becomes ihm.",
    "explanation": "The correct replacement is Er gehört ihm.",
    "difficulty": "A1"
  },
  {
    "id": "ex-610",
    "lessonId": "a1-personal-pronouns",
    "type": "phrase-choice",
    "prompt": "Choose the sentence where both objects are replaced correctly.",
    "noun": "Sie zeigt den Touristen die Stadt.",
    "options": [
      "Sie zeigt sie ihnen.",
      "Sie zeigt ihnen sie.",
      "Sie zeigt ihr sie."
    ],
    "correctAnswer": "Sie zeigt sie ihnen.",
    "hint": "Die Stadt is the accusative object, and den Touristen is the dative object.",
    "explanation": "The correct full replacement is Sie zeigt sie ihnen.",
    "difficulty": "A1"
  },
  {
    "id": "ex-611",
    "lessonId": "a1-personal-pronouns",
    "type": "question-word",
    "prompt": "Choose the pronoun that fits polite speech.",
    "noun": "Herr Braun, was lesen ___?",
    "options": [
      "Sie",
      "ihr",
      "du"
    ],
    "correctAnswer": "Sie",
    "hint": "The sentence addresses one person politely.",
    "explanation": "Polite you in German is Sie with a capital S.",
    "difficulty": "A1"
  },
  {
    "id": "ex-612",
    "lessonId": "a1-personal-pronouns",
    "type": "case-form",
    "prompt": "Choose the correct pronoun form in context.",
    "noun": "Die Freunde wollen Anna helfen. Sie sagen: „Braucht ___ Hilfe? Wir helfen ___.“",
    "options": [
      "sie / ihr",
      "ihr / sie",
      "sie / sie"
    ],
    "correctAnswer": "sie / ihr",
    "hint": "First ask about Anna as the subject of brauchen, then replace Anna after helfen.",
    "explanation": "Anna is sie as the subject, but after helfen you need the dative form ihr: Braucht sie Hilfe? Wir helfen ihr.",
    "difficulty": "A1"
  }
] as Exercise[];

export default a1_personal_pronouns;
