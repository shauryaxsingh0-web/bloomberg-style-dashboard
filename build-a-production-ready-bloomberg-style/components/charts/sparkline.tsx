"use client";

import { useId } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  YAxis
} from "recharts";
import type { SparkPoint } from "@/types/market";

type SparklineProps = {
  data: SparkPoint[];
  positive?: boolean;
  height?: number;
};

export function Sparkline({ data, positive = true, height = 54 }: SparklineProps) {
  const gradientId = useId().replace(/:/g, "");
  const stroke = positive ? "#22c55e" : "#ef4444";
  const fill = positive ? "rgba(34,197,94,0.18)" : "rgba(239,68,68,0.16)";

  return (
    <div className="h-full w-full" style={{ minHeight: height }}>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 6, right: 2, bottom: 0, left: 2 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={fill} stopOpacity={1} />
              <stop offset="95%" stopColor={fill} stopOpacity={0} />
            </linearGradient>
          </defs>
          <YAxis hide domain={["dataMin", "dataMax"]} />
          <Tooltip
            cursor={false}
            contentStyle={{
              background: "#0b0e14",
              border: "1px solid #293241",
              borderRadius: 6,
              color: "#e5e7eb",
              fontSize: 11
            }}
            formatter={(value) => [Number(value).toLocaleString(), "Level"]}
            labelFormatter={() => "Intraday"}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={stroke}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
            dot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
