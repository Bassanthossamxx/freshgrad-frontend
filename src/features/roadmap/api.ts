import { apiRequest } from "@/lib/api/client";
import { env } from "@/lib/env";
import { mockRoadmap } from "@/lib/mocks/data";
import { sleep } from "@/lib/utils";
import { RoadmapSchema, type Roadmap } from "@/types/api";

/** GET /api/sessions/{id}/roadmap — week-by-week plan, project and career path. */
export async function getRoadmap(sessionId: string): Promise<Roadmap> {
  if (env.NEXT_PUBLIC_USE_MOCKS) {
    await sleep(500);
    return { ...mockRoadmap, session_id: sessionId };
  }
  return apiRequest(`/api/sessions/${sessionId}/roadmap`, { schema: RoadmapSchema });
}
