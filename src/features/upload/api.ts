import { apiRequest } from "@/lib/api/client";
import { env } from "@/lib/env";
import { mockSession } from "@/lib/mocks/data";
import { sleep } from "@/lib/utils";
import { SessionSchema, type Session } from "@/types/api";

export type UploadInput = {
  cv: File;
  curriculum?: File;
  industry: string;
};

/** POST /api/sessions — upload CV (+ optional curriculum) and start analysis. */
export async function createSession(input: UploadInput): Promise<Session> {
  if (env.NEXT_PUBLIC_USE_MOCKS) {
    await sleep(800);
    return mockSession;
  }

  const form = new FormData();
  form.append("cv", input.cv);
  if (input.curriculum) form.append("curriculum", input.curriculum);
  form.append("industry", input.industry);

  return apiRequest("/api/sessions", { method: "POST", body: form, schema: SessionSchema });
}
