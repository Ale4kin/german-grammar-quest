import type { Exercise } from "@/types";

export const a1_indefinite_articles: Exercise[] = [
  {
    id: "ex-101",
    lessonId: "a1-indefinite-articles",
    type: "article-choice",
    prompt:
      "Choose the indefinite article for something mentioned for the first time.",
    noun: "Im Hof wächst ___ Baum.",
    options: ["ein", "eine", "einen"],
    correctAnswer: "ein",
    hint: "Baum is masculine, and here it is the subject.",
    explanation:
      "We introduce a new, non-specific tree. Baum is masculine in the nominative, so we say: ein Baum.",
    difficulty: "A1",
  },
  {
    id: "ex-102",
    lessonId: "a1-indefinite-articles",
    type: "article-choice",
    prompt:
      "Choose the indefinite article for something mentioned for the first time.",
    noun: "Auf dem Tisch steht ___ Lampe.",
    options: ["ein", "eine", "einen"],
    correctAnswer: "eine",
    hint: "Lampe is feminine.",
    explanation:
      "The lamp is new information in the sentence. Lampe is feminine, so we say: eine Lampe.",
    difficulty: "A1",
  },
  {
    id: "ex-103",
    lessonId: "a1-indefinite-articles",
    type: "article-choice",
    prompt:
      "Choose the indefinite article for something mentioned for the first time.",
    noun: "An der Wand hängt ___ Bild.",
    options: ["ein", "eine", "einen"],
    correctAnswer: "ein",
    hint: "Bild is neuter.",
    explanation:
      "We mention the picture for the first time. Bild is neuter, so the indefinite article is ein.",
    difficulty: "A1",
  },
  {
    id: "ex-104",
    lessonId: "a1-indefinite-articles",
    type: "phrase-choice",
    prompt: "Choose the article in a classification sentence.",
    noun: "Das ist ___ Geschenk.",
    options: ["ein", "eine", "einen"],
    correctAnswer: "ein",
    hint: "Geschenk is neuter.",
    explanation:
      "We say what the thing is. Geschenk is neuter, so we use ein Geschenk.",
    difficulty: "A1",
  },
  {
    id: "ex-105",
    lessonId: "a1-indefinite-articles",
    type: "phrase-choice",
    prompt: "Choose the article in a classification sentence.",
    noun: "Sie ist ___ Studentin.",
    options: ["ein", "eine", "einen"],
    correctAnswer: "eine",
    hint: "Studentin is feminine.",
    explanation:
      "When we say what someone is, we often use an indefinite article with a described noun. Studentin is feminine: eine Studentin.",
    difficulty: "A1",
  },
  {
    id: "ex-106",
    lessonId: "a1-indefinite-articles",
    type: "phrase-choice",
    prompt: "Choose the article in a classification sentence.",
    noun: "Das Wort „Tag“ ist ___ Substantiv.",
    options: ["ein", "eine", "einen"],
    correctAnswer: "ein",
    hint: "Substantiv is neuter.",
    explanation:
      "The sentence classifies the word. Substantiv is neuter, so we say: ein Substantiv.",
    difficulty: "A1",
  },
  {
    id: "ex-107",
    lessonId: "a1-indefinite-articles",
    type: "phrase-choice",
    prompt: "Choose the article after es gibt.",
    noun: "In der Nähe gibt es ___ Spielplatz.",
    options: ["ein", "eine", "einen"],
    correctAnswer: "einen",
    hint: "Spielplatz is masculine, and es gibt takes the accusative.",
    explanation:
      "After es gibt, the noun is in the accusative. Masculine ein becomes einen: Es gibt einen Spielplatz.",
    difficulty: "A1",
  },
  {
    id: "ex-108",
    lessonId: "a1-indefinite-articles",
    type: "phrase-choice",
    prompt: "Choose the article after es gibt.",
    noun: "In der Wohnung gibt es ___ Küche.",
    options: ["ein", "eine", "einen"],
    correctAnswer: "eine",
    hint: "Küche is feminine.",
    explanation:
      "After es gibt we use the accusative, but feminine eine does not change: eine Küche.",
    difficulty: "A1",
  },
  {
    id: "ex-109",
    lessonId: "a1-indefinite-articles",
    type: "case-form",
    prompt: "Choose the article after haben.",
    noun: "Wir haben ___ Garten.",
    options: ["ein", "eine", "einen"],
    correctAnswer: "einen",
    hint: "Garten is masculine and is the object here.",
    explanation:
      "After haben, the noun is an object. Masculine ein changes to einen: Wir haben einen Garten.",
    difficulty: "A1",
  },
  {
    id: "ex-110",
    lessonId: "a1-indefinite-articles",
    type: "case-form",
    prompt: "Choose the article after brauchen.",
    noun: "Ich brauche ___ Wörterbuch.",
    options: ["ein", "eine", "einen"],
    correctAnswer: "ein",
    hint: "Wörterbuch is neuter.",
    explanation:
      "Brauchen takes an object, but neuter ein stays ein in the accusative: ein Wörterbuch.",
    difficulty: "A1",
  },
  {
    id: "ex-111",
    lessonId: "a1-indefinite-articles",
    type: "case-form",
    prompt: "Choose the article after kaufen.",
    noun: "Der Mann kauft ___ Zeitung.",
    options: ["ein", "eine", "einen"],
    correctAnswer: "eine",
    hint: "Zeitung is feminine.",
    explanation:
      "Zeitung is feminine. In the accusative, feminine eine stays eine: eine Zeitung.",
    difficulty: "A1",
  },
  {
    id: "ex-112",
    lessonId: "a1-indefinite-articles",
    type: "phrase-choice",
    prompt: "Choose the article in a comparison.",
    noun: "Er schwimmt wie ___ Fisch.",
    options: ["ein", "eine", "einen"],
    correctAnswer: "ein",
    hint: "Fisch is masculine, but here it stands after wie in the basic form.",
    explanation:
      "In this comparison, we use the nominative form: wie ein Fisch.",
    difficulty: "A1",
  },
] as Exercise[];

export default a1_indefinite_articles;
