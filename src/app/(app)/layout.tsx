import { Container } from "@/components/layout/container";
import { SiteHeader } from "@/components/layout/site-header";

/** Shell for the product flow: upload → analysis → roadmap. */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Container className="py-10">{children}</Container>
      </main>
    </>
  );
}
