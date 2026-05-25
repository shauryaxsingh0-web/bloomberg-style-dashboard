import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground">
      <section className="terminal-panel max-w-md p-6">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
          404
        </p>
        <h1 className="mt-3 text-2xl font-semibold">Market route unavailable</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This terminal route is not configured in the local dashboard.
        </p>
        <Button asChild className="mt-5">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden />
            Back to dashboard
          </Link>
        </Button>
      </section>
    </main>
  );
}
