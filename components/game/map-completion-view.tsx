"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { StatCard } from "@/components/ui/stat-card";
import { readStoredProgress } from "@/lib/progress-storage";
import { buildLessonHref } from "@/lib/routes";

type WorldRoute = {
  id: string;
  icon: string;
  name: string;
  description: string;
  sortOrder: number;
  readyTopics: number;
  countries: {
    id: string;
    name: string;
    description: string;
    sortOrder: number;
    lesson?: {
      id: string;
      title: string;
    };
  }[];
};

type MapCompletionViewProps = {
  worlds: WorldRoute[];
};

export function MapCompletionView({ worlds }: MapCompletionViewProps) {
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);

  useEffect(() => {
    const syncState = () => {
      const progress = readStoredProgress();
      setCompletedLessonIds(progress.completedLessonIds);
    };

    syncState();
    window.addEventListener("storage", syncState);

    return () => {
      window.removeEventListener("storage", syncState);
    };
  }, []);

  const completedKingdomIds = useMemo(() => {
    return worlds
      .filter((world) => {
        const lessonIds = world.countries
          .map((country) => country.lesson?.id)
          .filter((lessonId): lessonId is string => Boolean(lessonId));

        return lessonIds.length > 0 && lessonIds.every((lessonId) => completedLessonIds.includes(lessonId));
      })
      .map((world) => world.id);
  }, [completedLessonIds, worlds]);

  const completedLessonsCount = completedLessonIds.length;

  return (
    <>
      <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Completed lessons" value={completedLessonsCount} />
        <StatCard label="Completed kingdoms" value={completedKingdomIds.length} />
        <StatCard label="Ready lessons" value={worlds.reduce((sum, world) => sum + world.readyTopics, 0)} />
        <StatCard label="Worlds" value={worlds.length} />
      </div>

      <div className="grid gap-4">
        {worlds.map((world) => {
          const isKingdomComplete = completedKingdomIds.includes(world.id);

          return (
            <article
              key={world.id}
              className={[
                "quest-card p-5 sm:p-6",
                isKingdomComplete ? "border border-emerald-200 bg-emerald-50/50" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-300 to-emerald-500 text-2xl shadow-md">
                      {world.icon}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="quest-kicker">World {world.sortOrder}</p>
                        {isKingdomComplete ? (
                          <span className="quest-chip bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-900">
                            Kingdom complete
                          </span>
                        ) : null}
                      </div>
                      <h3 className="text-2xl font-black text-slate-800">{world.name}</h3>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{world.description}</p>
                </div>

                <div className="grid min-w-[220px] gap-3 sm:grid-cols-2 xl:w-[260px] xl:grid-cols-1">
                  <StatCard
                    label="Topics in world"
                    value={world.countries.length}
                    valueClassName="mt-1 text-2xl font-black text-slate-800"
                  />
                  <StatCard
                    label="Completed"
                    value={
                      world.countries.filter((country) => country.lesson && completedLessonIds.includes(country.lesson.id))
                        .length
                    }
                    valueClassName="mt-1 text-2xl font-black text-slate-800"
                  />
                </div>
              </div>

              <div className="mt-5 grid gap-3 xl:grid-cols-2">
                {world.countries.map((country) => {
                  const isLessonCompleted = Boolean(
                    country.lesson && completedLessonIds.includes(country.lesson.id),
                  );

                  return (
                    <div
                      key={country.id}
                      className={[
                        "rounded-[24px] bg-white/78 p-4 shadow-sm",
                        isLessonCompleted ? "border border-emerald-200 bg-emerald-50/70" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-base font-black text-slate-800">{country.name}</p>
                          <p className="mt-2 text-sm leading-6 text-slate-600">{country.description}</p>
                        </div>
                        <span className="quest-chip px-2.5 py-1 text-xs">
                          {isLessonCompleted ? "Completed" : country.lesson ? "Ready" : "Soon"}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="quest-chip px-2.5 py-1 text-xs">
                          Order {country.sortOrder}
                        </span>
                        <span className="quest-chip px-2.5 py-1 text-xs">
                          {country.lesson ? "Lesson ready" : "No lesson yet"}
                        </span>
                        {isLessonCompleted ? (
                          <span className="quest-chip bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-900">
                            Lesson complete
                          </span>
                        ) : null}
                      </div>

                      {country.lesson ? (
                        <Link href={buildLessonHref(country.lesson.id)} className="quest-button-primary mt-4 w-full">
                          {isLessonCompleted ? "Review lesson" : "Open lesson"}
                        </Link>
                      ) : (
                        <div className="mt-4 rounded-full border border-dashed border-slate-300 px-4 py-2 text-center text-sm font-semibold text-slate-500">
                          Coming soon
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
