# German Grammar Quest

German Grammar Quest is a gamified German grammar learning app built with Next.js.

It is designed as a structured study journey rather than a simple flashcard app:

- the learner moves through grammar worlds and lesson topics
- each lesson opens into a guided exercise run
- answers reward gems, streaks, XP, ranks, and unlocks
- long-term progress is tracked locally in the browser

## What the app is

The app combines three layers:

1. Curriculum layer  
   German grammar lessons and exercises grouped into kingdoms, topics, and lessons.

2. Game layer  
   Gems, streaks, lesson ranks, kingdom trophies, XP, levels, badges, cosmetics, daily quests, and review runs.

3. UI layer  
   Map, lesson briefing, exercise flow, result summary, and profile/progress surfaces.

At the moment the app uses local mock curriculum data and stores player progress in browser storage.

## What the app can do

### Learning flow

- Browse grammar worlds on the map
- Open a lesson briefing with rule summary, examples, and reward preview
- Start a lesson exercise run
- Use hints in Explorer mode
- See explanations after answers
- Finish a lesson and review the result screen
- Retry missed questions in a smaller review run

### Progress systems

- Track completed lessons
- Save best lesson score and best lesson rank
- Derive kingdom completion and gold kingdom trophies
- Earn gems and XP
- Level up using XP thresholds
- Track daily streaks
- Unlock badges
- Unlock cosmetics
- Generate daily quests
- Track weak grammar areas from wrong answers

### UI surfaces

- `/` home dashboard
- `/map` curriculum map and progress
- `/lesson/[lessonId]` lesson briefing
- `/exercise/[exerciseId]` exercise runner
- `/result` lesson result summary
- `/profile` player progress and cosmetics

## Current game rules

### Available mode

Only **Explorer Mode** is currently playable.

Explorer rules:

- Hints are available
- No penalty for mistakes
- Correct after hint: `+5` gems
- Correct without hint: `+15` gems
- Streak bonus after `3` correct answers without hints
- Explanations appear after every answer

Planned but not yet playable:

- Adventurer
- Master

### Streak system

Current streak milestones:

- Streak `3` -> `+10` bonus gems
- Streak `5` -> small chest reward
- Streak `10` -> perfect combo badge

Hints break streak extension for the current answer.

### Lesson ranks

Each completed lesson gets a rank:

- Bronze: `60%+` accuracy
- Silver: `80%+` accuracy and at most `2` hints
- Gold: `100%` accuracy, `0` hints, perfect run

Best rank is stored per lesson and shown across the app.

### XP and levels

XP is granted on lesson completion, not per tiny action.

Current XP model:

- base lesson completion XP
- extra XP from higher accuracy
- bonus XP for hint-free runs
- bonus XP for perfect runs
- review runs pay less XP than full lessons

### Daily quests

The app rotates `2-3` daily quests from templates such as:

- finish a lesson
- complete a lesson without hints
- reach a 3-answer streak
- earn 40 gems in one lesson
- finish a perfect run

### Badges

Current badge examples:

- Perfect Runner
- Combo Starter
- Lesson Veteran
- Hint-Free Hat Trick

### Cosmetics

Cosmetics unlock from:

- gems
- badges
- kingdom completion

## Study structure

The curriculum is organized like this:

- kingdoms -> broad grammar areas
- countries/topics -> subtopics within a kingdom
- lessons -> grammar rule + examples + learning tip
- exercises -> playable question set for the lesson

Examples of grammar areas already represented in the data:

- articles
- nouns and cases
- pronouns
- prepositions
- adjectives
- verbs

## Tech stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS

## Project structure

High-level structure:

- `app/`  
  Routes and page entry points

- `components/`  
  UI components and game-specific front-end components

- `data/`  
  Static curriculum, game rules, modes, kingdoms, cosmetics, avatars

- `lib/game/`  
  Game logic, evaluators, storage helpers, progression logic, route helpers

- `types/`  
  Shared domain types for lessons, exercises, rewards, progress, and systems

- `docs/`  
  Local documentation such as the accessibility audit

## Important implementation notes

- Player progress is stored locally in browser storage
- Game systems are evaluated from structured lesson results and player progress
- Lesson content is intentionally separated from game rules
- Event-style updates are used for key progress changes such as:
  - lesson started
  - answer submitted
  - lesson completed
  - quest claimed
  - cosmetic unlocked

## Run locally

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## Current limitations

- Only Explorer mode is playable
- Progress is local-only and not synced to an account
- Curriculum still uses static in-repo data
- `next lint` is not fully configured yet in this repo

## Purpose of the project

The project is currently positioned as a front-end prototype for a grammar learning game:

- curriculum-driven
- game-like progression
- strong lesson/result/profile loop
- flexible enough to keep evolving rules, rewards, and content separately
