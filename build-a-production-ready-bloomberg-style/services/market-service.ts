import {
  bondYields,
  headlines,
  heatmap,
  macroCalendar,
  marketOverview,
  watchlist
} from "@/data/markets";
import type {
  BondYield,
  HeatmapCell,
  MacroEvent,
  MarketBrief,
  MarketDashboardData,
  MarketInstrument
} from "@/types/market";

function buildMarketBrief(
  overview: MarketInstrument[],
  bonds: BondYield[],
  calendar: MacroEvent[],
  map: HeatmapCell[]
): MarketBrief {
  const gainers = overview.filter((item) => item.dailyChangePercent > 0);
  const losers = overview.filter((item) => item.dailyChangePercent < 0);
  const averageRiskChange =
    overview.reduce((total, item) => total + item.dailyChangePercent, 0) /
    overview.length;
  const highImportanceEvents = calendar.filter(
    (event) => event.importance === "high"
  );
  const bestSector = [...map].sort((a, b) => b.performance - a.performance)[0];
  const worstSector = [...map].sort((a, b) => a.performance - b.performance)[0];
  const frontEndMove = bonds.find((bond) => bond.code === "US2Y");
  const longEndMove = bonds.find((bond) => bond.code === "US10Y");

  const riskTone =
    averageRiskChange > 0.35
      ? "risk-on"
      : averageRiskChange < -0.2
        ? "risk-off"
        : "mixed";

  return {
    title:
      riskTone === "risk-on"
        ? "Risk appetite improves as growth assets lead"
        : riskTone === "risk-off"
          ? "Defensive tone builds across cross-asset screens"
          : "Markets trade mixed ahead of macro catalysts",
    summary:
      `The terminal shows ${gainers.length} of ${overview.length} core markets trading higher, led by ${bestSector.sector} and crypto breadth. ` +
      `Rates are nuanced: ${frontEndMove?.label ?? "front-end"} is ${frontEndMove && frontEndMove.basisPointMove >= 0 ? "higher" : "lower"} while ${longEndMove?.label ?? "long-end"} holds near ${longEndMove?.yield.toFixed(2) ?? "4.40"}%. ` +
      `${highImportanceEvents.length} high-importance macro releases remain on deck, keeping intraday positioning event-sensitive.`,
    bullets: [
      `${bestSector.sector} is the strongest heatmap pocket at +${bestSector.performance.toFixed(2)}%, while ${worstSector.sector} lags at ${worstSector.performance.toFixed(2)}%.`,
      `${losers.length ? losers.map((item) => item.name).join(", ") : "No core screens"} are negative on the session, limiting full risk-on confirmation.`,
      `Calendar focus sits on ${highImportanceEvents.map((event) => event.event).join(", ")} with inflation and policy path repricing as the main volatility channels.`
    ],
    riskTone,
    generatedAt: "Local rules engine"
  };
}

export async function getMarketDashboardData(): Promise<MarketDashboardData> {
  const overview = marketOverview;
  const bonds = bondYields;
  const calendar = macroCalendar;

  return {
    overview,
    bonds,
    calendar,
    news: headlines,
    watchlist,
    heatmap,
    brief: buildMarketBrief(overview, bonds, calendar, heatmap)
  };
}
