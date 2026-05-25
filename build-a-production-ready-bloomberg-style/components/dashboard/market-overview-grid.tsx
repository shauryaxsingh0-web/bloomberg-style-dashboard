import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { Sparkline } from "@/components/charts/sparkline";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatSigned } from "@/lib/utils";
import type { MarketInstrument } from "@/types/market";

type MarketOverviewGridProps = {
  markets: MarketInstrument[];
};

export function MarketOverviewGrid({ markets }: MarketOverviewGridProps) {
  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
      {markets.map((market) => {
        const isPositive = market.dailyChangePercent > 0;
        const isFlat = market.dailyChangePercent === 0;
        const Icon = isFlat ? Minus : isPositive ? ArrowUpRight : ArrowDownRight;

        return (
          <Card
            key={market.symbol}
            className="group overflow-hidden p-3 transition duration-200 hover:border-primary/35 hover:bg-[#141821]/95 hover:shadow-glow"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                  {market.symbol}
                </p>
                <h3 className="mt-1 truncate text-sm font-semibold">
                  {market.name}
                </h3>
              </div>
              <Badge variant={isPositive ? "positive" : isFlat ? "muted" : "negative"}>
                <Icon className="mr-1 h-3 w-3" aria-hidden />
                {formatSigned(market.dailyChangePercent)}%
              </Badge>
            </div>
            <div className="mt-4 grid grid-cols-[1fr_112px] items-end gap-2">
              <div>
                <p className="font-mono text-2xl font-semibold leading-none number-tabular">
                  {market.displayPrice}
                </p>
                <p
                  className={
                    isPositive
                      ? "mt-2 font-mono text-xs text-positive"
                      : "mt-2 font-mono text-xs text-negative"
                  }
                >
                  {formatSigned(market.dailyChangeValue)} pts
                </p>
              </div>
              <Sparkline data={market.sparkline} positive={isPositive} />
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-border/70 pt-2 font-mono text-[11px] text-muted-foreground">
              <span>{market.region}</span>
              <span>VOL {market.volume}</span>
            </div>
          </Card>
        );
      })}
    </section>
  );
}
