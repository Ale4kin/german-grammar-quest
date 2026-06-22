import type { Exercise } from "@/types";

export const a1_dative: Exercise[] = [
  {
    "id": "ex-401",
    "lessonId": "a1-dative",
    "type": "article-choice",
    "prompt": "Choose the correct article for the dative object.",
    "noun": "Ich helfe ___ Mann.",
    "options": [
      "dem",
      "den",
      "der"
    ],
    "correctAnswer": "dem",
    "hint": "Mann is masculine, and helfen takes the dative.",
    "explanation": "The dative of der Mann is dem Mann.",
    "difficulty": "A1"
  },
  {
    "id": "ex-402",
    "lessonId": "a1-dative",
    "type": "article-choice",
    "prompt": "Choose the correct article for the dative object.",
    "noun": "Wir antworten ___ Lehrerin.",
    "options": [
      "der",
      "die",
      "dem"
    ],
    "correctAnswer": "der",
    "hint": "Lehrerin is feminine, and antworten takes the dative.",
    "explanation": "The dative of die Lehrerin is der Lehrerin.",
    "difficulty": "A1"
  },
  {
    "id": "ex-403",
    "lessonId": "a1-dative",
    "type": "article-choice",
    "prompt": "Choose the correct article for the dative object.",
    "noun": "Das Bild gefällt ___ Kind.",
    "options": [
      "dem",
      "das",
      "den"
    ],
    "correctAnswer": "dem",
    "hint": "Kind is neuter, and gefallen takes the dative.",
    "explanation": "The dative of das Kind is dem Kind.",
    "difficulty": "A1"
  },
  {
    "id": "ex-404",
    "lessonId": "a1-dative",
    "type": "article-choice",
    "prompt": "Choose the correct article for the dative plural object.",
    "noun": "Die Geschichte gefällt ___ Kindern.",
    "options": [
      "den",
      "die",
      "dem"
    ],
    "correctAnswer": "den",
    "hint": "Kindern is plural dative, so the article is den.",
    "explanation": "In the dative plural, the article is den: den Kindern.",
    "difficulty": "A1"
  },
  {
    "id": "ex-405",
    "lessonId": "a1-dative",
    "type": "phrase-choice",
    "prompt": "Choose the full form that completes the sentence.",
    "noun": "Unsere Lehrerin fragt. Wir antworten ___.",
    "supportText": "The second sentence refers to the same teacher.",
    "options": [
      "der Lehrerin",
      "die Lehrerin",
      "dem Lehrer"
    ],
    "correctAnswer": "der Lehrerin",
    "hint": "Antworten takes the dative, and Lehrerin is feminine.",
    "explanation": "The verb antworten needs the dative, so the correct form is der Lehrerin.",
    "difficulty": "A1"
  },
  {
    "id": "ex-406",
    "lessonId": "a1-dative",
    "type": "phrase-choice",
    "prompt": "Choose the full dative form that fits the verb.",
    "noun": "Das Haus gehört ___.",
    "supportText": "The noun is Onkel.",
    "options": [
      "dem Onkel",
      "den Onkel",
      "der Onkel"
    ],
    "correctAnswer": "dem Onkel",
    "hint": "Gehören takes the dative.",
    "explanation": "The correct dative phrase is dem Onkel: Das Haus gehört dem Onkel.",
    "difficulty": "A1"
  },
  {
    "id": "ex-407",
    "lessonId": "a1-dative",
    "type": "question-word",
    "prompt": "Choose the correct question word for the dative.",
    "noun": "___ hilft die Großmutter?",
    "options": [
      "Wem",
      "Wen",
      "Was"
    ],
    "correctAnswer": "Wem",
    "hint": "You ask about the receiver or affected person.",
    "explanation": "Use Wem? to ask about a dative person.",
    "difficulty": "A1"
  },
  {
    "id": "ex-408",
    "lessonId": "a1-dative",
    "type": "question-word",
    "prompt": "Choose the correct question word for the dative.",
    "noun": "___ gehört das Fahrrad?",
    "options": [
      "Wem",
      "Wer",
      "Wessen"
    ],
    "correctAnswer": "Wem",
    "hint": "The question asks to whom the bicycle belongs.",
    "explanation": "Use Wem? with gehören to ask about the dative owner.",
    "difficulty": "A1"
  },
  {
    "id": "ex-409",
    "lessonId": "a1-dative",
    "type": "case-form",
    "prompt": "Choose the correct weak noun form in the dative.",
    "noun": "Wir helfen ___.",
    "supportText": "The noun is Student.",
    "options": [
      "dem Studenten",
      "den Studenten",
      "der Student"
    ],
    "correctAnswer": "dem Studenten",
    "hint": "Student is a weak masculine noun and keeps -en in the dative.",
    "explanation": "The dative form is dem Studenten.",
    "difficulty": "A1"
  },
  {
    "id": "ex-410",
    "lessonId": "a1-dative",
    "type": "case-form",
    "prompt": "Choose the correct weak noun form in the dative.",
    "noun": "Der Direktor spricht mit ___.",
    "supportText": "The noun is Junge.",
    "options": [
      "dem Jungen",
      "den Jungen",
      "der Junge"
    ],
    "correctAnswer": "dem Jungen",
    "hint": "Junge is a weak masculine noun. With mit, you need the dative.",
    "explanation": "Mit takes the dative, and the correct weak form is dem Jungen.",
    "difficulty": "A1"
  },
  {
    "id": "ex-411",
    "lessonId": "a1-dative",
    "type": "ending-choice",
    "prompt": "Choose the missing ending for the dative plural form.",
    "noun": "Das Geschenk gefällt den Schüler__.",
    "options": [
      "n",
      "en",
      "e"
    ],
    "correctAnswer": "n",
    "hint": "Plural dative often adds -n if the plural does not already end in -n or -s.",
    "explanation": "The plural is Schüler, so the dative plural becomes den Schülern.",
    "difficulty": "A1"
  },
  {
    "id": "ex-412",
    "lessonId": "a1-dative",
    "type": "ending-choice",
    "prompt": "Choose the missing ending for the dative plural form.",
    "noun": "Wir helfen den Freund__.",
    "options": [
      "en",
      "n",
      "e"
    ],
    "correctAnswer": "en",
    "hint": "The plural is Freunde, so the dative plural adds -n to become Freunde-n.",
    "explanation": "The correct dative plural form is den Freunden.",
    "difficulty": "A1"
  }
] as Exercise[];

export default a1_dative;
