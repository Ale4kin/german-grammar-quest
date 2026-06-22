const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const exercisesPath = path.join(repoRoot, "data", "exercises.ts");
const outDir = path.join(repoRoot, "data", "exercises", "topics");

if (!fs.existsSync(exercisesPath)) {
  console.error("data/exercises.ts not found");
  process.exit(1);
}

const src = fs.readFileSync(exercisesPath, "utf8");

const match = src.match(/export const mockExercises[^=]*=\s*(\[[\s\S]*\]);/m);
if (!match) {
  console.error("Could not find mockExercises array in data/exercises.ts");
  process.exit(1);
}

const arrText = match[1];

// Evaluate the array text in a safe VM context
const vm = require("vm");
let mockExercises;
try {
  // Wrap in parentheses to make sure it's an expression
  mockExercises = vm.runInNewContext(`(${arrText})`, {console});
} catch (err) {
  console.error("Failed to evaluate mockExercises:", err);
  process.exit(1);
}

if (!Array.isArray(mockExercises)) {
  console.error("mockExercises is not an array after evaluation");
  process.exit(1);
}

// Group by lessonId
const groups = mockExercises.reduce((acc, ex) => {
  const id = ex.lessonId || "unknown";
  acc[id] = acc[id] || [];
  acc[id].push(ex);
  return acc;
}, {});

fs.mkdirSync(outDir, { recursive: true });

const sanitizeName = (s) => s.replace(/[^a-z0-9_]/gi, (c) => (c === '-' ? '_' : '_'));

Object.entries(groups).forEach(([lessonId, items]) => {
  const fileName = `${lessonId}.ts`;
  const exportName = `${sanitizeName(lessonId)}`;
  const filePath = path.join(outDir, fileName);

  const itemsText = JSON.stringify(items, null, 2);

  const fileContent = `import type { Exercise } from "@/types";

export const ${exportName}: Exercise[] = ${itemsText} as Exercise[];

export default ${exportName};
`;

  fs.writeFileSync(filePath, fileContent, "utf8");
  console.log("Wrote", filePath);
});

// Create an index file that exports all topic arrays
const indexLines = [];
const importNames = [];
Object.keys(groups).forEach((lessonId) => {
  const exportName = `${sanitizeName(lessonId)}`;
  const rel = `./${lessonId}`;
  indexLines.push(`export { ${exportName} } from '${rel}';`);
  importNames.push(exportName);
});

// Also export a helper that aggregates them
indexLines.push('');
indexLines.push(`export const allTopics = [${importNames.join(', ')}];`);
indexLines.push(`export const topicsMockExercises = ([] as import('@/types').Exercise[]).concat(...allTopics);`);

fs.writeFileSync(path.join(outDir, 'index.ts'), indexLines.join('\n') + '\n', 'utf8');
console.log('Wrote topics index');

// Replace root data/exercises.ts with an aggregator that re-exports mockExercises
const rootIndexPath = path.join(repoRoot, 'data', 'exercises.ts');
const rootImportLines = Object.keys(groups).map((lessonId) => {
  const exportName = `${sanitizeName(lessonId)}`;
  return `import { ${exportName} } from './exercises/topics/${lessonId}';`;
});

const rootContent = `import type { Exercise } from "@/types";
${rootImportLines.join('\n')}

export const mockExercises: Exercise[] = ([] as Exercise[]).concat(
  ${Object.keys(groups).map((id) => sanitizeName(id)).join(',\n  ')}
);

export default mockExercises;
`;

fs.writeFileSync(rootIndexPath, rootContent, 'utf8');
console.log('Rewrote', rootIndexPath);

console.log('Done.');
