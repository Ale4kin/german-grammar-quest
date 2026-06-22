import type { Exercise } from "@/types";

export const a1_articles: Exercise[] = [
  {
    "id": "ex-001",
    "lessonId": "a1-articles",
    "type": "article-choice",
    "prompt": "Choose the correct definite article for the noun.",
    "noun": "Mann",
    "options": [
      "der",
      "die",
      "das"
    ],
    "correctAnswer": "der",
    "hint": "This noun is for an adult male person.",
    "explanation": "We say der Mann.",
    "difficulty": "A1"
  },
  {
    "id": "ex-002",
    "lessonId": "a1-articles",
    "type": "article-choice",
    "prompt": "Choose the correct definite article for the noun.",
    "noun": "Frau",
    "options": [
      "der",
      "die",
      "das"
    ],
    "correctAnswer": "die",
    "hint": "This noun is for an adult female person.",
    "explanation": "We say die Frau.",
    "difficulty": "A1"
  },
  {
    "id": "ex-003",
    "lessonId": "a1-articles",
    "type": "article-choice",
    "prompt": "Choose the correct definite article for the noun.",
    "noun": "Kind",
    "options": [
      "der",
      "die",
      "das"
    ],
    "correctAnswer": "das",
    "hint": "This noun is neuter in German.",
    "explanation": "We say das Kind.",
    "difficulty": "A1"
  },
  {
    "id": "ex-004",
    "lessonId": "a1-articles",
    "type": "article-choice",
    "prompt": "Choose the correct definite article for the noun.",
    "noun": "Tisch",
    "options": [
      "der",
      "die",
      "das"
    ],
    "correctAnswer": "der",
    "hint": "This furniture noun is masculine in German.",
    "explanation": "We say der Tisch.",
    "difficulty": "A1"
  },
  {
    "id": "ex-005",
    "lessonId": "a1-articles",
    "type": "article-choice",
    "prompt": "The noun was already mentioned once. Choose the article for the second sentence.",
    "noun": "___ Zimmer ist gemütlich.",
    "supportText": "Das ist ein Zimmer.",
    "options": [
      "der",
      "die",
      "das"
    ],
    "correctAnswer": "das",
    "hint": "Zimmer is neuter, and the second sentence talks about the same room again.",
    "explanation": "We now mean a specific room, so we say Das Zimmer ist gemütlich.",
    "difficulty": "A1"
  },
  {
    "id": "ex-006",
    "lessonId": "a1-articles",
    "type": "article-choice",
    "prompt": "The noun was already mentioned once. Choose the article for the second sentence.",
    "noun": "___ Kirschen sind süß.",
    "supportText": "Das sind Kirschen.",
    "options": [
      "der",
      "die",
      "das"
    ],
    "correctAnswer": "die",
    "hint": "Kirschen is plural, and the second sentence is about the same cherries again.",
    "explanation": "Plural nouns use die here: Die Kirschen sind süß.",
    "difficulty": "A1"
  },
  {
    "id": "ex-007",
    "lessonId": "a1-articles",
    "type": "article-choice",
    "prompt": "Choose the article for the noun that is already clear from the context.",
    "noun": "___ Tisch ist rund.",
    "supportText": "Hier steht ein Tisch.",
    "options": [
      "der",
      "die",
      "das"
    ],
    "correctAnswer": "der",
    "hint": "The table was named in the first sentence, so it is specific now.",
    "explanation": "Now we talk about one known table, so we say Der Tisch ist rund.",
    "difficulty": "A1"
  },
  {
    "id": "ex-008",
    "lessonId": "a1-articles",
    "type": "article-choice",
    "prompt": "Choose the article for the noun that is clear in this classroom situation.",
    "noun": "___ Lehrer öffnet das Buch.",
    "supportText": "The teacher comes into the classroom.",
    "options": [
      "der",
      "die",
      "das"
    ],
    "correctAnswer": "der",
    "hint": "In this situation, everyone knows which teacher is meant.",
    "explanation": "We mean the specific teacher in the room, so we say der Lehrer.",
    "difficulty": "A1"
  },
  {
    "id": "ex-009",
    "lessonId": "a1-articles",
    "type": "article-choice",
    "prompt": "Choose the article for the noun with extra words that define it clearly.",
    "noun": "___ Haus an der Ecke gehört meinem Freund.",
    "options": [
      "der",
      "die",
      "das"
    ],
    "correctAnswer": "das",
    "hint": "The phrase an der Ecke tells you exactly which house it is.",
    "explanation": "The extra phrase defines the noun, so we use the definite article: das Haus an der Ecke.",
    "difficulty": "A1"
  },
  {
    "id": "ex-010",
    "lessonId": "a1-articles",
    "type": "article-choice",
    "prompt": "Choose the article for the noun with an ordinal word.",
    "noun": "Mir gefällt ___ erste Film.",
    "options": [
      "der",
      "die",
      "das"
    ],
    "correctAnswer": "der",
    "hint": "Erste points to one specific film.",
    "explanation": "Ordinal words often make the noun specific, so we say der erste Film.",
    "difficulty": "A1"
  },
  {
    "id": "ex-011",
    "lessonId": "a1-articles",
    "type": "article-choice",
    "prompt": "Choose the article for the noun made specific by position.",
    "noun": "___ Mädchen rechts ist meine Schwester.",
    "options": [
      "der",
      "die",
      "das"
    ],
    "correctAnswer": "das",
    "hint": "Rechts helps identify exactly which girl we mean.",
    "explanation": "The position makes the noun specific, and Mädchen is neuter: das Mädchen rechts.",
    "difficulty": "A1"
  },
  {
    "id": "ex-012",
    "lessonId": "a1-articles",
    "type": "article-choice",
    "prompt": "Choose the article for a one-of-a-kind noun.",
    "noun": "___ Sonne scheint hell.",
    "options": [
      "der",
      "die",
      "das"
    ],
    "correctAnswer": "die",
    "hint": "There is one sun in this everyday meaning.",
    "explanation": "With one-of-a-kind things like the sun, German often uses the definite article: die Sonne.",
    "difficulty": "A1"
  }
] as Exercise[];

export default a1_articles;
