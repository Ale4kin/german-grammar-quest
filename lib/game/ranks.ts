import type { LessonRank } from "@/types";

export function getLessonRankTitle(rank: LessonRank): string {
  switch (rank) {
    case "gold":
      return "Gold";
    case "silver":
      return "Silver";
    default:
      return "Bronze";
  }
}

export function getLessonRankLabel(rank: LessonRank): string {
  return `${getLessonRankTitle(rank)} rank`;
}

export function getLessonRankChipClass(rank: LessonRank): string {
  switch (rank) {
    case "gold":
      return "bg-amber-100 font-bold text-amber-900";
    case "silver":
      return "bg-slate-200 font-bold text-slate-800";
    default:
      return "bg-orange-100 font-bold text-orange-900";
  }
}
