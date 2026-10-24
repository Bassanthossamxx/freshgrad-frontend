import { apiRequest } from "@/lib/api/client";
import { env } from "@/lib/env";
import { mockChatReply } from "@/lib/mocks/data";
import { sleep } from "@/lib/utils";
import { ChatReplySchema, type ChatReply } from "@/types/api";

/** POST /api/sessions/{id}/chat — answer the AI's gap questions; may update readiness. */
export async function sendChatMessage(sessionId: string, content: string): Promise<ChatReply> {
  if (env.NEXT_PUBLIC_USE_MOCKS) {
    await sleep(700);
    return mockChatReply;
  }
  return apiRequest(`/api/sessions/${sessionId}/chat`, {
    method: "POST",
    body: { content },
    schema: ChatReplySchema,
  });
}
