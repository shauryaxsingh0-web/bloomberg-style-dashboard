import { Newspaper } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import type { NewsHeadline } from "@/types/market";

type NewsFeedProps = {
  headlines: NewsHeadline[];
};

export function NewsFeed({ headlines }: NewsFeedProps) {
  return (
    <Card className="p-4">
      <SectionHeading eyebrow="Wire" title="News Feed" value={`${headlines.length} items`} />
      <div className="mt-4 max-h-[390px] space-y-2 overflow-y-auto pr-1">
        {headlines.map((item) => (
          <article
            key={item.id}
            className="group rounded-md border border-border/70 bg-muted/20 p-3 transition duration-200 hover:border-primary/35 hover:bg-muted/35"
          >
            <div className="mb-2 flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2">
                <Newspaper className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden />
                <span className="truncate font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  {item.source}
                </span>
              </div>
              <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                {item.timestamp}
              </span>
            </div>
            <p className="text-sm leading-5">{item.headline}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="muted">{item.category}</Badge>
              <Badge
                variant={
                  item.sentiment === "bullish"
                    ? "positive"
                    : item.sentiment === "bearish"
                      ? "negative"
                      : "default"
                }
              >
                {item.sentiment}
              </Badge>
            </div>
          </article>
        ))}
      </div>
    </Card>
  );
}
