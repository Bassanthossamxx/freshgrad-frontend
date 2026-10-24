import type { z } from "zod";

import { env } from "@/lib/env";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public body?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type RequestOptions<T> = Omit<RequestInit, "body"> & {
  /** Zod schema used to validate the response */
  schema: z.ZodType<T>;
  /** JSON body (serialized automatically) or FormData for file uploads */
  body?: unknown;
};

/** Typed fetch wrapper for the FastAPI backend. */
export async function apiRequest<T>(
  path: string,
  { schema, body, headers, ...init }: RequestOptions<T>,
): Promise<T> {
  const isForm = body instanceof FormData;

  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(body !== undefined && !isForm ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: body === undefined ? undefined : isForm ? body : JSON.stringify(body),
  });

  const data: unknown = await res.json().catch(() => null);

  if (!res.ok) {
    const detail =
      data && typeof data === "object" && "detail" in data ? String(data.detail) : res.statusText;
    throw new ApiError(res.status, detail, data);
  }

  return schema.parse(data);
}
