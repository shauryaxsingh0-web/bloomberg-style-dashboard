export type TrendDirection = "up" | "down" | "flat";

export type AssetClass =
  | "Equity Index"
  | "Crypto"
  | "Commodity"
  | "FX"
  | "Single Stock";

export type Region = "Americas" | "Europe" | "Asia" | "Crypto" | "Commodities";

export type Sentiment = "bullish" | "bearish" | "neutral";

export type Importance = "high" | "medium" | "low";

export interface SparkPoint {
  time: string;
  value: number;
}

export interface MarketInstrument {
  symbol: string;
  name: string;
  assetClass: AssetClass;
  region: Region;
  price: number;
  displayPrice: string;
  dailyChangePercent: number;
  dailyChangeValue: number;
  volume: string;
  sparkline: SparkPoint[];
}

export interface BondYield {
  code: string;
  label: string;
  country: string;
  yield: number;
  basisPointMove: number;
  curve: SparkPoint[];
}

export interface MacroEvent {
  id: string;
  event: string;
  country: string;
  time: string;
  importance: Importance;
  previous: string;
  forecast: string;
}

export interface NewsHeadline {
  id: string;
  headline: string;
  source: string;
  timestamp: string;
  category: string;
  sentiment: Sentiment;
}

export interface WatchlistItem {
  symbol: string;
  name: string;
  category: AssetClass;
  region: Region;
  price: number;
  displayPrice: string;
  changePercent: number;
  volume: string;
  marketCap: string;
}

export interface HeatmapCell {
  sector: string;
  region: Region;
  performance: number;
  weight: number;
  topMover: string;
}

export interface MarketBrief {
  title: string;
  summary: string;
  bullets: string[];
  riskTone: "risk-on" | "risk-off" | "mixed";
  generatedAt: string;
}

export interface MarketDashboardData {
  overview: MarketInstrument[];
  bonds: BondYield[];
  calendar: MacroEvent[];
  news: NewsHeadline[];
  watchlist: WatchlistItem[];
  heatmap: HeatmapCell[];
  brief: MarketBrief;
}
