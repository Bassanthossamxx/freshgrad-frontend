/**
 * API contract with the FastAPI backend.
 * Keep these in sync with the backend Pydantic models.
 * Zod schemas validate responses at runtime; types are inferred from them.
 */
import { z } from "zod";

export const RoleIdSchema = z.enum([
  "backend",
  "frontend",
  "data_analyst",
  "ai_ml",
  "qa",
  "devops",
]);
export type RoleId = z.infer<typeof RoleIdSchema>;

export const SkillLevelSchema = z.enum(["strong", "basic", "none"]);
export type SkillLevel = z.infer<typeof SkillLevelSchema>;

/** A skill extracted from the CV or curriculum. Every skill must carry evidence. */
export const SkillSchema = z.object({
  name: z.string(),
  level: SkillLevelSchema,
  evidence: z.array(z.string()),
  source: z.enum(["cv", "curriculum", "chat"]),
});
export type Skill = z.infer<typeof SkillSchema>;

export const SessionSchema = z.object({
  session_id: z.string(),
  status: z.enum(["processing", "ready", "failed"]),
});
export type Session = z.infer<typeof SessionSchema>;

export const RoleMatchSchema = z.object({
  role_id: RoleIdSchema,
  title: z.string(),
  readiness: z.number().min(0).max(100),
});
export type RoleMatch = z.infer<typeof RoleMatchSchema>;

export const GapSchema = z.object({
  skill: z.string(),
  importance: z.enum(["must_have", "nice_to_have", "rare"]),
  /** e.g. 34 of 50 postings mention this skill */
  postings_count: z.number(),
  postings_total: z.number(),
  user_level: SkillLevelSchema,
});
export type Gap = z.infer<typeof GapSchema>;

export const AnalysisSchema = z.object({
  session_id: z.string(),
  skills: z.array(SkillSchema),
  role_matches: z.array(RoleMatchSchema),
  selected_role: RoleIdSchema.nullable(),
  gaps: z.array(GapSchema),
});
export type Analysis = z.infer<typeof AnalysisSchema>;

export const RoadmapWeekSchema = z.object({
  week: z.number(),
  focus: z.string(),
  tasks: z.array(z.string()),
  resources: z.array(z.object({ title: z.string(), url: z.string() })),
});

export const RoadmapSchema = z.object({
  session_id: z.string(),
  role_id: RoleIdSchema,
  current_readiness: z.number(),
  projected_readiness: z.number(),
  weeks: z.array(RoadmapWeekSchema),
  project: z.object({ title: z.string(), description: z.string() }),
  career_path: z.array(z.object({ title: z.string(), years: z.string() })),
});
export type Roadmap = z.infer<typeof RoadmapSchema>;

export const ChatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

export const ChatReplySchema = z.object({
  message: ChatMessageSchema,
  /** Updated readiness after the answer, if the score moved */
  readiness: z.number().nullable(),
});
export type ChatReply = z.infer<typeof ChatReplySchema>;
