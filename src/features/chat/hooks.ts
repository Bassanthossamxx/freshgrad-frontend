"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import { sendChatMessage } from "./api";

export function useSendChatMessage(sessionId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (content: string) => sendChatMessage(sessionId, content),
    // The score may have moved: refetch analysis + roadmap
    onSuccess: (reply) => {
      if (reply.readiness !== null) {
        qc.invalidateQueries({ queryKey: queryKeys.analysis(sessionId) });
        qc.invalidateQueries({ queryKey: queryKeys.roadmap(sessionId) });
      }
    },
  });
}
