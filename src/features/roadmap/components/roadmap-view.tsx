"use client";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";

import { useRoadmap } from "../hooks";

/** Placeholder roadmap screen — real layout comes with the UI design. */
export function RoadmapView({ sessionId }: { sessionId: string }) {
  const { data, isLoading, error } = useRoadmap(sessionId);

  if (isLoading) return <p className="text-muted-foreground">Building your plan…</p>;
  if (error) return <p className="text-danger">{error.message}</p>;
  if (!data) return null;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">
        {data.current_readiness}% → {data.projected_readiness}% in {data.weeks.length} weeks
      </h1>

      <div className="grid gap-4 sm:grid-cols-2">
        {data.weeks.map((w) => (
          <Card key={w.week}>
            <CardTitle>
              Week {w.week}: {w.focus}
            </CardTitle>
            <ul className="mt-2 list-disc pl-5 text-sm">
              {w.tasks.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <Card>
        <CardTitle>Project: {data.project.title}</CardTitle>
        <CardDescription className="mt-1">{data.project.description}</CardDescription>
      </Card>
    </div>
  );
}
