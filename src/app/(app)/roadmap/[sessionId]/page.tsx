import type { Metadata } from "next";
import { Suspense } from "react";

import { RoadmapView } from "@/features/roadmap/components/roadmap-view";

export const metadata: Metadata = { title: "Your plan" };

async function Content({ params }: { params: PageProps<"/roadmap/[sessionId]">["params"] }) {
  const { sessionId } = await params;
  return <RoadmapView sessionId={sessionId} />;
}

export default function RoadmapPage(props: PageProps<"/roadmap/[sessionId]">) {
  return (
    <Suspense fallback={<p className="text-muted-foreground">Loading…</p>}>
      <Content params={props.params} />
    </Suspense>
  );
}
