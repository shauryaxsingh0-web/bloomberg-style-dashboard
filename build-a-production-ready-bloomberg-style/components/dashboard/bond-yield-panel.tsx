import { MoveDownRight, MoveUpRight } from "lucide-react";
import { YieldTrend } from "@/components/charts/yield-trend";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { formatSigned } from "@/lib/utils";
import type { BondYield } from "@/types/market";

type BondYieldPanelProps = {
  bonds: BondYield[];
};

export function BondYieldPanel({ bonds }: BondYieldPanelProps) {
  return (
    <Card className="p-4">
      <SectionHeading eyebrow="Rates" title="Bond Yield Panel" value="bps move" />
      <div className="mt-4 space-y-3">
        {bonds.map((bond) => {
          const positive = bond.basisPointMove >= 0;
          const Icon = positive ? MoveUpRight : MoveDownRight;

          return (
            <div
              key={bond.code}
              className="grid grid-cols-[84px_1fr_82px] items-center gap-3 rounded-md border border-border/70 bg-muted/20 p-3 transition-colors hover:bg-muted/35"
            >
              <div>
                <p className="font-mono text-xs font-semibold">{bond.label}</p>
                <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                  {bond.country}
                </p>
              </div>
              <YieldTrend data={bond.curve} positive={positive} />
              <div className="text-right">
                <p className="font-mono text-sm font-semibold number-tabular">
                  {bond.yield.toFixed(2)}%
                </p>
                <p
                  className={
                    positive
                      ? "mt-0.5 flex items-center justify-end font-mono text-xs text-positive"
                      : "mt-0.5 flex items-center justify-end font-mono text-xs text-negative"
                  }
                >
                  <Icon className="mr-1 h-3 w-3" aria-hidden />
                  {formatSigned(bond.basisPointMove, 1)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
