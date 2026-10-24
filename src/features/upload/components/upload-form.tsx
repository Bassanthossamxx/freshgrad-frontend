"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";

import { useCreateSession } from "../hooks";

/** Placeholder upload form — wired to the API, styling comes with the UI design. */
export function UploadForm({ className }: { className?: string }) {
  const router = useRouter();
  const createSession = useCreateSession();
  const [cv, setCv] = useState<File | null>(null);
  const [curriculum, setCurriculum] = useState<File | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!cv) return;
    createSession.mutate(
      { cv, curriculum: curriculum ?? undefined, industry: "tech" },
      { onSuccess: (s) => router.push(routes.analysis(s.session_id)) },
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("space-y-6", className)}>
      <label className="block space-y-2">
        <span className="text-sm font-medium">CV (PDF) *</span>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setCv(e.target.files?.[0] ?? null)}
          className="block w-full text-sm"
        />
      </label>
      <label className="block space-y-2">
        <span className="text-sm font-medium">Curriculum / transcript (PDF)</span>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setCurriculum(e.target.files?.[0] ?? null)}
          className="block w-full text-sm"
        />
      </label>
      {createSession.error && <p className="text-danger text-sm">{createSession.error.message}</p>}
      <Button type="submit" disabled={!cv || createSession.isPending}>
        {createSession.isPending ? "Analyzing…" : "Analyze"}
      </Button>
    </form>
  );
}
