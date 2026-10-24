import Link from "next/link";

import { Container } from "@/components/layout/container";
import { SiteHeader } from "@/components/layout/site-header";
import { buttonVariants } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";

/** Landing page — placeholder until the UI/UX design is ready. */
export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 items-center">
        <Container className="py-24 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Find the tech role you&apos;re ready for
          </h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl">{siteConfig.description}</p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href={routes.upload} className={buttonVariants({ size: "lg" })}>
              Get started
            </Link>
            <Link
              href={routes.analysis("demo")}
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              View demo
            </Link>
          </div>
        </Container>
      </main>
    </>
  );
}
