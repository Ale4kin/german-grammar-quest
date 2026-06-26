import {
  badgeDefinitions,
  dailyQuestDefinitions,
  dailyQuestRules,
  lessonRankThresholds,
  lessonXpRules,
  levelThresholds,
  reviewXpMultiplier,
} from "@/data/game-rules";
import { cosmeticDefinitions } from "@/data/cosmetics";
import { getGrammarSkillLabel } from "@/data/grammar-skills";
import { mockKingdoms } from "@/data/kingdoms";
import { mockLessons } from "@/data/lessons";
import type {
  BadgeUnlockEvaluation,
  CosmeticUnlockEvaluation,
  DailyQuestDefinition,
  DailyQuestEvaluation,
  DailyQuestProgress,
  ExerciseRunType,
  KingdomCompletionEvaluation,
  KingdomTrophyTier,
  LessonRank,
  LessonRankEvaluation,
  LessonResultEntry,
  PlayerProgress,
  WeaknessProfileEntry,
  WeaknessProfileEvaluation,
} from "@/types";

export function getLocalDateKey(date: string | Date = new Date()): string {
  const normalizedDate = typeof date === "string" ? new Date(date) : date;
  const year = normalizedDate.getFullYear();
  const month = `${normalizedDate.getMonth() + 1}`.padStart(2, "0");
  const day = `${normalizedDate.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getDailyQuestPlan(dateKey: string): DailyQuestDefinition[] {
  const seed = dateKey
    .split("-")
    .map((chunk) => Number(chunk))
    .reduce((sum, value) => sum + value, 0);
  const questCount =
    dailyQuestRules.minActiveQuests +
    (seed % (dailyQuestRules.maxActiveQuests - dailyQuestRules.minActiveQuests + 1));

  return dailyQuestDefinitions
    .map((quest, index) => ({
      quest,
      index,
      score: (seed + index) % dailyQuestDefinitions.length,
    }))
    .sort((left, right) => left.score - right.score)
    .slice(0, questCount)
    .map((entry) => entry.quest);
}

function buildQuestProgress(
  questId: string,
  target: number,
  progress: number,
): DailyQuestProgress {
  return {
    questId,
    target,
    progress: Math.min(progress, target),
    completed: progress >= target,
    claimed: false,
  };
}

export function evaluateLessonRank(result: LessonResultEntry): LessonRankEvaluation {
  const ranks: LessonRank[] = ["gold", "silver", "bronze"];

  for (const rank of ranks) {
    const threshold = lessonRankThresholds[rank];
    const meetsAccuracy = result.accuracy >= threshold.minAccuracy;
    const meetsHintLimit = result.hintCount <= threshold.maxHints;
    const meetsPerfectRun = !threshold.requirePerfectRun || result.perfectRun;

    if (meetsAccuracy && meetsHintLimit && meetsPerfectRun) {
      const reasons = [`Accuracy ${result.accuracy}%`];

      if (result.hintCount === 0) {
        reasons.push("No hints used");
      }

      if (result.perfectRun) {
        reasons.push("Perfect run");
      }

      return { rank, reasons };
    }
  }

  return {
    rank: "bronze",
    reasons: [`Accuracy ${result.accuracy}%`],
  };
}

export function evaluateLessonXp(
  result: LessonResultEntry,
  runType: ExerciseRunType = "lesson",
): number {
  const accuracyBonus = lessonXpRules.accuracyBonuses.reduce((bestBonus, threshold) => {
    if (result.accuracy >= threshold.minAccuracy) {
      return Math.max(bestBonus, threshold.xpBonus);
    }

    return bestBonus;
  }, 0);

  const baseXp = (
    lessonXpRules.baseCompletionXp +
    accuracyBonus +
    (result.hintCount === 0 ? lessonXpRules.hintFreeBonus : 0) +
    (result.perfectRun ? lessonXpRules.perfectRunBonus : 0)
  );

  return runType === "review"
    ? Math.max(10, Math.round(baseXp * reviewXpMultiplier))
    : baseXp;
}

export function evaluateLevelProgress(xp: number) {
  const currentThreshold =
    levelThresholds
      .slice()
      .reverse()
      .find((threshold) => xp >= threshold.minXp) ?? levelThresholds[0];
  const nextThreshold = levelThresholds.find(
    (threshold) => threshold.level === currentThreshold.level + 1,
  );
  const currentLevelXp = xp - currentThreshold.minXp;
  const requiredXp = nextThreshold
    ? nextThreshold.minXp - currentThreshold.minXp
    : 0;
  const progressPercent = nextThreshold
    ? Math.round((currentLevelXp / requiredXp) * 100)
    : 100;

  return {
    level: currentThreshold.level,
    currentLevelXp,
    requiredXp,
    progressPercent,
    levelStartXp: currentThreshold.minXp,
    nextLevelXp: nextThreshold?.minXp ?? currentThreshold.minXp,
    nextLevel: nextThreshold?.level ?? null,
  };
}

export function evaluateKingdomCompletion(
  progress: PlayerProgress,
): KingdomCompletionEvaluation {
  const previousCompleted = new Set(
    Object.values(progress.kingdomProgress)
      .filter((kingdom) => kingdom.isCompleted)
      .map((kingdom) => kingdom.kingdomId),
  );
  const previousGold = new Set(
    Object.values(progress.kingdomProgress)
      .filter((kingdom) => kingdom.trophyTier === "gold")
      .map((kingdom) => kingdom.kingdomId),
  );

  const summaries = mockKingdoms.map((kingdom) => {
    const lessonIds = mockLessons
      .filter((lesson) => lesson.kingdomId === kingdom.id)
      .map((lesson) => lesson.id);
    const completedLessonIds = lessonIds.filter((lessonId) =>
      progress.completedLessonIds.includes(lessonId),
    );
    const isCompleted =
      lessonIds.length > 0 && completedLessonIds.length === lessonIds.length;
    const allLessonsGold =
      isCompleted &&
      lessonIds.every(
        (lessonId) => progress.lessonBestScores[lessonId]?.bestRank === "gold",
      );
    const trophyTier: KingdomTrophyTier = allLessonsGold
      ? "gold"
      : isCompleted
        ? "complete"
        : "none";

    return {
      kingdomId: kingdom.id,
      completedLessons: completedLessonIds.length,
      totalLessons: lessonIds.length,
      isCompleted,
      trophyTier,
      allLessonsGold,
    };
  });

  const completedKingdomIds = summaries
    .filter((summary) => summary.isCompleted)
    .map((summary) => summary.kingdomId);
  const goldKingdomIds = summaries
    .filter((summary) => summary.trophyTier === "gold")
    .map((summary) => summary.kingdomId);
  const newlyCompletedKingdomIds = completedKingdomIds.filter(
    (kingdomId) => !previousCompleted.has(kingdomId),
  );
  const newlyGoldKingdomIds = goldKingdomIds.filter(
    (kingdomId) => !previousGold.has(kingdomId),
  );

  return {
    completedKingdomIds,
    goldKingdomIds,
    newlyCompletedKingdomIds,
    newlyGoldKingdomIds,
    summaries,
  };
}

export function evaluateDailyQuests(
  result: LessonResultEntry,
  progress: PlayerProgress,
  today: string | Date,
): DailyQuestEvaluation {
  const dateKey = getLocalDateKey(today);
  const activeQuests = getDailyQuestPlan(dateKey);
  const existingState =
    progress.dailyQuestState.dateKey === dateKey
      ? progress.dailyQuestState.quests
      : {};

  const quests = Object.fromEntries(
    activeQuests.map((quest) => {
      const previousProgress = existingState[quest.id]?.progress ?? 0;
      let increment = 0;

      switch (quest.id) {
        case "finish-lesson":
          increment = 1;
          break;
        case "no-hint-run":
          increment = result.hintCount === 0 ? 1 : 0;
          break;
        case "streak-3":
          increment = result.bestStreak >= 3 ? 1 : 0;
          break;
        case "earn-40-gems":
          increment = result.totalGemsEarned >= 40 ? 1 : 0;
          break;
        case "perfect-run":
          increment = result.perfectRun ? 1 : 0;
          break;
        default:
          increment = 0;
      }

      return [
        quest.id,
        buildQuestProgress(quest.id, quest.target, previousProgress + increment),
      ];
    }),
  );

  const newlyCompletedQuestIds = Object.values(quests)
    .filter((quest) => quest.completed && !existingState[quest.questId]?.completed)
    .map((quest) => quest.questId);

  return {
    dateKey,
    activeQuestIds: activeQuests.map((quest) => quest.id),
    quests,
    newlyCompletedQuestIds,
  };
}

export function getDailyQuestStateView(progress: PlayerProgress, today: string | Date) {
  const dateKey = getLocalDateKey(today);
  const activeQuests = getDailyQuestPlan(dateKey);
  const existingState =
    progress.dailyQuestState.dateKey === dateKey
      ? progress.dailyQuestState.quests
      : {};

  return {
    dateKey,
    definitions: activeQuests,
    activeQuestIds: activeQuests.map((quest) => quest.id),
    quests: Object.fromEntries(
      activeQuests.map((quest) => [
        quest.id,
        existingState[quest.id] ?? buildQuestProgress(quest.id, quest.target, 0),
      ]),
    ),
  };
}

export function evaluateBadgeUnlocks(
  result: LessonResultEntry,
  progress: PlayerProgress,
): BadgeUnlockEvaluation {
  const unlockedBadgeIds = new Set(progress.unlockedBadges.map((badge) => badge.id));
  const totalCompletedLessons = progress.lessonResults.length + 1;
  const perfectRuns = [result, ...progress.lessonResults].filter(
    (entry) => entry.perfectRun,
  ).length;

  const matchedBadgeIds = badgeDefinitions
    .filter((badge) => {
      if (unlockedBadgeIds.has(badge.id)) {
        return false;
      }

      switch (badge.condition.type) {
        case "perfect-run":
          return result.perfectRun;
        case "best-streak":
          return result.bestStreak >= badge.condition.minStreak;
        case "completed-lessons":
          return totalCompletedLessons >= badge.condition.minLessons;
        case "perfect-runs-total":
          return perfectRuns >= badge.condition.minPerfectRuns;
        default:
          return false;
      }
    })
    .map((badge) => badge.id);

  return {
    unlockedBadgeIds: matchedBadgeIds,
    badgeDefinitions: badgeDefinitions.filter((badge) =>
      matchedBadgeIds.includes(badge.id),
    ),
  };
}

export function evaluateCosmeticUnlocks(
  progress: PlayerProgress,
): CosmeticUnlockEvaluation {
  const unlockedCosmeticIds = new Set(progress.unlockedCosmetics.map((cosmetic) => cosmetic.id));
  const unlockedBadgeIds = new Set(progress.unlockedBadges.map((badge) => badge.id));
  const completedKingdomIds = new Set(
    Object.values(progress.kingdomProgress)
      .filter((kingdom) => kingdom.isCompleted)
      .map((kingdom) => kingdom.kingdomId),
  );

  const matchedCosmeticIds = cosmeticDefinitions
    .filter((cosmetic) => {
      if (unlockedCosmeticIds.has(cosmetic.id)) {
        return false;
      }

      switch (cosmetic.unlockCondition.type) {
        case "free":
          return true;
        case "gems":
          return progress.gems >= cosmetic.unlockCondition.minGems;
        case "badge":
          return unlockedBadgeIds.has(cosmetic.unlockCondition.badgeId);
        case "kingdom-complete":
          return completedKingdomIds.has(cosmetic.unlockCondition.kingdomId);
        default:
          return false;
      }
    })
    .map((cosmetic) => cosmetic.id);

  return {
    unlockedCosmeticIds: matchedCosmeticIds,
    cosmeticDefinitions: cosmeticDefinitions.filter((cosmetic) =>
      matchedCosmeticIds.includes(cosmetic.id),
    ),
  };
}

export function evaluateWeaknessProfile(
  weaknessStats: PlayerProgress["weaknessStats"],
): WeaknessProfileEvaluation {
  return {
    weakestTopics: Object.values(weaknessStats)
      .filter((stat) => stat.totalAnswers > 0 && stat.incorrectAnswers > 0)
      .map((stat) => {
        const accuracy = Math.round(
          ((stat.totalAnswers - stat.incorrectAnswers) / stat.totalAnswers) * 100,
        );
        const hintRate = Math.round((stat.hintUses / stat.totalAnswers) * 100);
        const errorRate = Math.round((stat.incorrectAnswers / stat.totalAnswers) * 100);
        let severity: WeaknessProfileEntry["severity"] = "low";

        if (errorRate >= 45 || stat.incorrectAnswers >= 5) {
          severity = "high";
        } else if (errorRate >= 20 || stat.incorrectAnswers >= 3) {
          severity = "medium";
        }

        return {
          skillId: stat.skillId,
          skillLabel: getGrammarSkillLabel(stat.skillId),
          attempts: stat.totalAnswers,
          accuracy,
          hintRate,
          severity,
        };
      })
      .sort((left, right) => {
        const severityWeight = { high: 3, medium: 2, low: 1 };
        return (
          severityWeight[right.severity] - severityWeight[left.severity] ||
          left.accuracy - right.accuracy ||
          right.hintRate - left.hintRate ||
          right.attempts - left.attempts
        );
      })
      .slice(0, 5),
  };
}
