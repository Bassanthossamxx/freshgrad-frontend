import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { routes } from "@/config/routes";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-2xl font-bold">Page not found</h1>
      <Link href={routes.home} className={buttonVariants({ variant: "outline" })}>
        Back home
      </Link>
    </main>
  );
}
