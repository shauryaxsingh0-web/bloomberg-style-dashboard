"use client";

import { motion } from "framer-motion";
import { Layers3 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn, formatSigned } from "@/lib/utils";
import type { HeatmapCell } from "@/types/market";

type GlobalHeatmapProps = {
  cells: HeatmapCell[];
};

function heatClass(performance: number) {
  if (performance >= 1.25) return "border-positive/40 bg-positive/25 text-positive";
  if (performance >= 0.35) return "border-positive/30 bg-positive/15 text-positive";
  if (performance <= -0.8) return "border-negative/40 bg-negative/25 text-negative";
  if (performance < 0) return "border-negative/30 bg-negative/15 text-negative";
  return "border-border bg-muted/35 text-muted-foreground";
}

export function GlobalHeatmap({ cells }: GlobalHeatmapProps) {
  const sorted = [...cells].sort((a, b) => b.weight - a.weight);

  return (
    <Card className="p-4">
      <SectionHeading eyebrow="Global" title="Heatmap" value="sector breadth" />
      <div className="mt-4 grid auto-rows-[92px] grid-cols-2 gap-2 md:grid-cols-4">
        {sorted.map((cell, index) => (
          <motion.div
            key={cell.sector}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.24, delay: index * 0.03 }}
            className={cn(
              "relative overflow-hidden rounded-md border p-3 transition hover:scale-[1.015]",
              heatClass(cell.performance),
              cell.weight >= 16 && "md:col-span-2"
            )}
          >
            <div className="absolute right-2 top-2 opacity-35">
              <Layers3 className="h-5 w-5" aria-hidden />
            </div>
            <p className="max-w-[80%] truncate text-sm font-semibold text-foreground">
              {cell.sector}
            </p>
            <p className="mt-1 font-mono text-xl font-semibold number-tabular">
              {formatSigned(cell.performance)}%
            </p>
            <div className="absolute inset-x-3 bottom-3 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
              <span>{cell.region}</span>
              <span>{cell.topMover}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
