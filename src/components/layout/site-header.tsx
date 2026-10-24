import Link from "next/link";

import { siteConfig } from "@/config/site";
import { routes } from "@/config/routes";

import { Container } from "./container";

export function SiteHeader() {
  return (
    <header className="border-border border-b">
      <Container className="flex h-14 items-center justify-between">
        <Link href={routes.home} className="font-semibold">
          {siteConfig.name}
        </Link>
        <nav className="text-muted-foreground flex gap-4 text-sm">
          <Link href={routes.upload} className="hover:text-foreground">
            Get started
          </Link>
        </nav>
      </Container>
    </header>
  );
}
