"use client";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { routes } from "@/config/routes";

import { useAnalysis } from "../hooks";

/** Placeholder results screen — proves data flow; real layout comes with the UI design. */
export function AnalysisView({ sessionId }: { sessionId: string }) {
  const { data, isLoading, error } = useAnalysis(sessionId);

  if (isLoading) return <p className="text-muted-foreground">Analyzing your profile…</p>;
  if (error) return <p className="text-danger">{error.message}</p>;
  if (!data) return null;

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-bold">Roles you&apos;re closest to</h1>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {data.role_matches.map((m) => (
            <Card key={m.role_id}>
              <CardTitle>{m.title}</CardTitle>
              <CardDescription className="mt-1">{m.readiness}% ready</CardDescription>
              <Progress value={m.readiness} label={`${m.title} readiness`} className="mt-3" />
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Top gaps</h2>
        <ul className="mt-3 space-y-2">
          {data.gaps.map((g) => (
            <li key={g.skill} className="text-sm">
              <span className="font-medium">{g.skill}</span>{" "}
              <span className="text-muted-foreground">
                — in {g.postings_count} of {g.postings_total} postings
              </span>
            </li>
          ))}
        </ul>
      </section>

      <Link href={routes.roadmap(sessionId)} className={buttonVariants()}>
        See my plan
      </Link>
    </div>
  );
}
