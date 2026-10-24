/** Central React Query keys, so invalidation stays consistent across features. */
export const queryKeys = {
  analysis: (sessionId: string) => ["sessions", sessionId, "analysis"] as const,
  roadmap: (sessionId: string) => ["sessions", sessionId, "roadmap"] as const,
  chat: (sessionId: string) => ["sessions", sessionId, "chat"] as const,
};
