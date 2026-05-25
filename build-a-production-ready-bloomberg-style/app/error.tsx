"use client";

import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground">
      <section className="terminal-panel max-w-xl p-6">
        <div className="mb-4 flex items-center gap-3 text-negative">
          <AlertTriangle className="h-5 w-5" aria-hidden />
          <h1 className="text-sm font-semibold uppercase tracking-[0.22em]">
            Terminal interrupted
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">
          A recoverable dashboard error occurred. The app is isolated from live
          market dependencies, so retrying should reload the local data feed.
        </p>
        <p className="mt-3 rounded border border-border bg-muted/40 p-3 font-mono text-xs text-muted-foreground">
          {error.message || "Unknown runtime fault"}
        </p>
        <Button className="mt-5" onClick={reset}>
          <RefreshCcw className="mr-2 h-4 w-4" aria-hidden />
          Retry session
        </Button>
      </section>
    </main>
  );
}
