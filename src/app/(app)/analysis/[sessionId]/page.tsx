import type { Metadata } from "next";
import { Suspense } from "react";

import { AnalysisView } from "@/features/analysis/components/analysis-view";

export const metadata: Metadata = { title: "Your analysis" };

async function Content({ params }: { params: PageProps<"/analysis/[sessionId]">["params"] }) {
  const { sessionId } = await params;
  return <AnalysisView sessionId={sessionId} />;
}

export default function AnalysisPage(props: PageProps<"/analysis/[sessionId]">) {
  return (
    <Suspense fallback={<p className="text-muted-foreground">Loading…</p>}>
      <Content params={props.params} />
    </Suspense>
  );
}
