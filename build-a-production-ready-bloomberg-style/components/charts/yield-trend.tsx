"use client";

import { Line, LineChart, ResponsiveContainer, YAxis } from "recharts";
import type { SparkPoint } from "@/types/market";

type YieldTrendProps = {
  data: SparkPoint[];
  positive: boolean;
};

export function YieldTrend({ data, positive }: YieldTrendProps) {
  return (
    <ResponsiveContainer width="100%" height={32}>
      <LineChart data={data} margin={{ top: 4, right: 2, bottom: 2, left: 2 }}>
        <YAxis hide domain={["dataMin", "dataMax"]} />
        <Line
          type="monotone"
          dataKey="value"
          stroke={positive ? "#22c55e" : "#ef4444"}
          strokeWidth={1.8}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
