import { apiRequest } from "@/lib/api/client";
import { env } from "@/lib/env";
import { mockAnalysis } from "@/lib/mocks/data";
import { sleep } from "@/lib/utils";
import { AnalysisSchema, type Analysis, type RoleId } from "@/types/api";

/** GET /api/sessions/{id}/analysis — skills, role matches and gaps. */
export async function getAnalysis(sessionId: string): Promise<Analysis> {
  if (env.NEXT_PUBLIC_USE_MOCKS) {
    await sleep(500);
    return { ...mockAnalysis, session_id: sessionId };
  }
  return apiRequest(`/api/sessions/${sessionId}/analysis`, { schema: AnalysisSchema });
}

/** POST /api/sessions/{id}/role — pick a target role, returns recalculated gaps. */
export async function selectRole(sessionId: string, roleId: RoleId): Promise<Analysis> {
  if (env.NEXT_PUBLIC_USE_MOCKS) {
    await sleep(500);
    return { ...mockAnalysis, session_id: sessionId, selected_role: roleId };
  }
  return apiRequest(`/api/sessions/${sessionId}/role`, {
    method: "POST",
    body: { role_id: roleId },
    schema: AnalysisSchema,
  });
}
