"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import { getRoadmap } from "./api";

export function useRoadmap(sessionId: string) {
  return useQuery({
    queryKey: queryKeys.roadmap(sessionId),
    queryFn: () => getRoadmap(sessionId),
  });
}
