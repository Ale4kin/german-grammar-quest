import { mockLessons } from "@/data/lessons";

export type GrammarSkillDefinition = {
  id: string;
  label: string;
  lessonId: string;
};

export const grammarSkillDefinitions: GrammarSkillDefinition[] = mockLessons.map((lesson) => ({
  id: lesson.id,
  label: lesson.title,
  lessonId: lesson.id,
}));

const grammarSkillById = Object.fromEntries(
  grammarSkillDefinitions.map((skill) => [skill.id, skill]),
);

export function getGrammarSkillIdsForLesson(lessonId: string): string[] {
  return grammarSkillDefinitions
    .filter((skill) => skill.lessonId === lessonId)
    .map((skill) => skill.id);
}

export function getGrammarSkillLabel(skillId: string): string {
  return grammarSkillById[skillId]?.label ?? skillId;
}
