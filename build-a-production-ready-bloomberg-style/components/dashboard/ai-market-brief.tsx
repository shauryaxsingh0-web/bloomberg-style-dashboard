import { BrainCircuit, ShieldAlert, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import type { MarketBrief } from "@/types/market";

type AIMarketBriefProps = {
  brief: MarketBrief;
};

export function AIMarketBrief({ brief }: AIMarketBriefProps) {
  const badgeVariant =
    brief.riskTone === "risk-on"
      ? "positive"
      : brief.riskTone === "risk-off"
        ? "negative"
        : "warning";

  return (
    <Card className="relative overflow-hidden p-4">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/80 to-transparent" />
      <SectionHeading
        eyebrow="Rules Engine"
        title="AI Market Brief"
        value={brief.generatedAt}
      />
      <div className="mt-4 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-primary/35 bg-primary/10">
          <BrainCircuit className="h-5 w-5 text-primary" aria-hidden />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold leading-tight">{brief.title}</h3>
            <Badge variant={badgeVariant}>{brief.riskTone}</Badge>
          </div>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {brief.summary}
          </p>
        </div>
      </div>
      <div className="mt-5 grid gap-2">
        {brief.bullets.map((bullet, index) => (
          <div
            key={bullet}
            className="flex gap-3 rounded-md border border-border/70 bg-muted/20 p-3"
          >
            {index === 2 ? (
              <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-warning" aria-hidden />
            ) : (
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
            )}
            <p className="text-sm leading-5 text-muted-foreground">{bullet}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
