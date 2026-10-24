"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";
import type { RoleId } from "@/types/api";

import { getAnalysis, selectRole } from "./api";

export function useAnalysis(sessionId: string) {
  return useQuery({
    queryKey: queryKeys.analysis(sessionId),
    queryFn: () => getAnalysis(sessionId),
  });
}

export function useSelectRole(sessionId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (roleId: RoleId) => selectRole(sessionId, roleId),
    onSuccess: (data) => qc.setQueryData(queryKeys.analysis(sessionId), data),
  });
}
