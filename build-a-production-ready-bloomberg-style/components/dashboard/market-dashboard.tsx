import { AIMarketBrief } from "@/components/dashboard/ai-market-brief";
import { AnimatedShell } from "@/components/dashboard/animated-shell";
import { BondYieldPanel } from "@/components/dashboard/bond-yield-panel";
import { GlobalHeatmap } from "@/components/dashboard/global-heatmap";
import { MacroCalendar } from "@/components/dashboard/macro-calendar";
import { MarketOverviewGrid } from "@/components/dashboard/market-overview-grid";
import { NewsFeed } from "@/components/dashboard/news-feed";
import { TopNavigation } from "@/components/dashboard/top-navigation";
import { Watchlist } from "@/components/dashboard/watchlist";
import type { MarketDashboardData } from "@/types/market";

type MarketDashboardProps = {
  data: MarketDashboardData;
};

export function MarketDashboard({ data }: MarketDashboardProps) {
  return (
    <div className="min-h-screen text-foreground">
      <TopNavigation />
      <main className="mx-auto max-w-[1800px] space-y-4 px-4 py-4 sm:px-6 sm:py-5">
        <AnimatedShell>
          <div className="terminal-grid rounded-md border border-border/70 bg-[#080a0f]/72 p-3">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary">
                  Cross-Asset Command Center
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                  Global market pulse, rates risk, macro catalysts, and live-ready watchlists.
                </h2>
              </div>
              <div className="grid grid-cols-3 gap-2 font-mono text-xs text-muted-foreground md:min-w-[380px]">
                <div className="rounded border border-border bg-muted/20 p-2">
                  <p>Latency</p>
                  <p className="mt-1 text-foreground">12ms</p>
                </div>
                <div className="rounded border border-border bg-muted/20 p-2">
                  <p>Feeds</p>
                  <p className="mt-1 text-positive">Healthy</p>
                </div>
                <div className="rounded border border-border bg-muted/20 p-2">
                  <p>Mode</p>
                  <p className="mt-1 text-primary">Mock</p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedShell>

        <AnimatedShell delay={0.04}>
          <MarketOverviewGrid markets={data.overview} />
        </AnimatedShell>

        <div className="grid gap-4 xl:grid-cols-[1.18fr_0.82fr]">
          <div className="space-y-4">
            <AnimatedShell delay={0.08}>
              <Watchlist initialItems={data.watchlist} />
            </AnimatedShell>
            <AnimatedShell delay={0.12}>
              <GlobalHeatmap cells={data.heatmap} />
            </AnimatedShell>
          </div>
          <div className="space-y-4">
            <AnimatedShell delay={0.1}>
              <AIMarketBrief brief={data.brief} />
            </AnimatedShell>
            <AnimatedShell delay={0.14}>
              <BondYieldPanel bonds={data.bonds} />
            </AnimatedShell>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1fr_0.8fr]">
          <AnimatedShell delay={0.16}>
            <MacroCalendar events={data.calendar} />
          </AnimatedShell>
          <AnimatedShell delay={0.18}>
            <NewsFeed headlines={data.news} />
          </AnimatedShell>
        </div>
      </main>
    </div>
  );
}
