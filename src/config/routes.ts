/** All app routes in one place. Use these instead of hardcoded strings. */
export const routes = {
  home: "/",
  upload: "/upload",
  analysis: (sessionId: string) => `/analysis/${sessionId}`,
  roadmap: (sessionId: string) => `/roadmap/${sessionId}`,
} as const;
