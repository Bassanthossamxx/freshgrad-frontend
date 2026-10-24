"use client";

import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="text-muted-foreground text-sm">{error.message}</p>
      <Button variant="outline" onClick={reset}>
        Try again
      </Button>
    </main>
  );
}
