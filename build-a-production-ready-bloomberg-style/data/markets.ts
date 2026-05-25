import type {
  BondYield,
  HeatmapCell,
  MacroEvent,
  MarketInstrument,
  NewsHeadline,
  WatchlistItem
} from "@/types/market";

const spark = (base: number, offsets: number[]) =>
  offsets.map((offset, index) => ({
    time: `${index + 1}`,
    value: Number((base + offset).toFixed(2))
  }));

export const marketOverview: MarketInstrument[] = [
  {
    symbol: "SPX",
    name: "S&P 500",
    assetClass: "Equity Index",
    region: "Americas",
    price: 5328.41,
    displayPrice: "5,328.41",
    dailyChangePercent: 0.62,
    dailyChangeValue: 32.86,
    volume: "3.9B",
    sparkline: spark(5288, [0, 12, 8, 22, 18, 31, 28, 39, 35, 40])
  },
  {
    symbol: "NDX",
    name: "Nasdaq",
    assetClass: "Equity Index",
    region: "Americas",
    price: 18814.42,
    displayPrice: "18,814.42",
    dailyChangePercent: 0.91,
    dailyChangeValue: 169.38,
    volume: "5.2B",
    sparkline: spark(18580, [0, 45, 39, 96, 88, 142, 136, 190, 178, 214])
  },
  {
    symbol: "DJI",
    name: "Dow Jones",
    assetClass: "Equity Index",
    region: "Americas",
    price: 39872.99,
    displayPrice: "39,872.99",
    dailyChangePercent: -0.18,
    dailyChangeValue: -71.44,
    volume: "426M",
    sparkline: spark(39990, [0, -22, -14, -48, -35, -76, -68, -101, -84, -118])
  },
  {
    symbol: "UKX",
    name: "FTSE 100",
    assetClass: "Equity Index",
    region: "Europe",
    price: 8420.26,
    displayPrice: "8,420.26",
    dailyChangePercent: 0.21,
    dailyChangeValue: 17.61,
    volume: "734M",
    sparkline: spark(8392, [0, 8, 4, 12, 10, 20, 15, 25, 22, 28])
  },
  {
    symbol: "NKY",
    name: "Nikkei 225",
    assetClass: "Equity Index",
    region: "Asia",
    price: 38945.53,
    displayPrice: "38,945.53",
    dailyChangePercent: -0.43,
    dailyChangeValue: -168.27,
    volume: "1.1B",
    sparkline: spark(39120, [0, -38, -52, -79, -68, -110, -104, -139, -128, -175])
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    assetClass: "Crypto",
    region: "Crypto",
    price: 68320.7,
    displayPrice: "$68,320.70",
    dailyChangePercent: 1.84,
    dailyChangeValue: 1231.4,
    volume: "$44.8B",
    sparkline: spark(66980, [0, 210, 140, 510, 460, 720, 665, 980, 910, 1340])
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    assetClass: "Crypto",
    region: "Crypto",
    price: 3618.12,
    displayPrice: "$3,618.12",
    dailyChangePercent: 1.16,
    dailyChangeValue: 41.5,
    volume: "$18.2B",
    sparkline: spark(3572, [0, 11, 8, 23, 20, 33, 29, 41, 36, 46])
  },
  {
    symbol: "XAU",
    name: "Gold",
    assetClass: "Commodity",
    region: "Commodities",
    price: 2372.8,
    displayPrice: "$2,372.80",
    dailyChangePercent: -0.29,
    dailyChangeValue: -6.9,
    volume: "182K",
    sparkline: spark(2382, [0, -3, -2, -7, -5, -10, -8, -13, -11, -9])
  },
  {
    symbol: "BRENT",
    name: "Brent Crude",
    assetClass: "Commodity",
    region: "Commodities",
    price: 83.64,
    displayPrice: "$83.64",
    dailyChangePercent: 0.48,
    dailyChangeValue: 0.4,
    volume: "287K",
    sparkline: spark(83.1, [0, 0.08, 0.03, 0.19, 0.14, 0.31, 0.26, 0.45, 0.39, 0.54])
  }
];

export const bondYields: BondYield[] = [
  {
    code: "US2Y",
    label: "US 2Y",
    country: "United States",
    yield: 4.84,
    basisPointMove: 3.2,
    curve: spark(4.77, [0, 0.01, 0.03, 0.02, 0.04, 0.06, 0.05, 0.07])
  },
  {
    code: "US10Y",
    label: "US 10Y",
    country: "United States",
    yield: 4.42,
    basisPointMove: -1.7,
    curve: spark(4.46, [0, -0.01, -0.02, -0.01, -0.03, -0.04, -0.03, -0.04])
  },
  {
    code: "UK10Y",
    label: "UK 10Y",
    country: "United Kingdom",
    yield: 4.18,
    basisPointMove: 2.5,
    curve: spark(4.12, [0, 0.02, 0.01, 0.03, 0.04, 0.03, 0.05, 0.06])
  },
  {
    code: "JP10Y",
    label: "Japan 10Y",
    country: "Japan",
    yield: 0.96,
    basisPointMove: 0.6,
    curve: spark(0.93, [0, 0, 0.01, 0.01, 0.02, 0.02, 0.03, 0.03])
  }
];

export const macroCalendar: MacroEvent[] = [
  {
    id: "cpi-us",
    event: "CPI YoY",
    country: "US",
    time: "08:30 ET",
    importance: "high",
    previous: "3.4%",
    forecast: "3.3%"
  },
  {
    id: "fomc",
    event: "FOMC Minutes",
    country: "US",
    time: "14:00 ET",
    importance: "high",
    previous: "Hold",
    forecast: "Hold"
  },
  {
    id: "gdp-uk",
    event: "GDP QoQ",
    country: "UK",
    time: "07:00 BST",
    importance: "medium",
    previous: "0.6%",
    forecast: "0.5%"
  },
  {
    id: "jobs-us",
    event: "Unemployment",
    country: "US",
    time: "08:30 ET",
    importance: "high",
    previous: "3.9%",
    forecast: "3.9%"
  },
  {
    id: "pmi-eu",
    event: "PMI Composite",
    country: "EU",
    time: "10:00 CET",
    importance: "medium",
    previous: "51.7",
    forecast: "52.1"
  }
];

export const headlines: NewsHeadline[] = [
  {
    id: "n1",
    headline:
      "US equity futures edge higher as megacap tech extends leadership into the cash open",
    source: "Apex Wire",
    timestamp: "2m ago",
    category: "Equities",
    sentiment: "bullish"
  },
  {
    id: "n2",
    headline:
      "Treasury curve flattens after short-end yields rise on sticky services inflation concern",
    source: "Rates Desk",
    timestamp: "7m ago",
    category: "Rates",
    sentiment: "bearish"
  },
  {
    id: "n3",
    headline:
      "Brent crude holds above $83 as physical market tightness offsets dollar strength",
    source: "Commodities",
    timestamp: "12m ago",
    category: "Energy",
    sentiment: "neutral"
  },
  {
    id: "n4",
    headline:
      "Bitcoin liquidity improves across US session as ETF flows remain net positive",
    source: "Crypto Desk",
    timestamp: "18m ago",
    category: "Crypto",
    sentiment: "bullish"
  },
  {
    id: "n5",
    headline:
      "European banks outperform after capital return guidance lifts sector breadth",
    source: "EMEA Markets",
    timestamp: "24m ago",
    category: "Europe",
    sentiment: "bullish"
  },
  {
    id: "n6",
    headline:
      "Japan exporters slip as yen rebound trims earnings sensitivity in morning trade",
    source: "Asia Close",
    timestamp: "31m ago",
    category: "Asia",
    sentiment: "bearish"
  }
];

export const watchlist: WatchlistItem[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    category: "Single Stock",
    region: "Americas",
    price: 191.04,
    displayPrice: "$191.04",
    changePercent: 0.44,
    volume: "49.1M",
    marketCap: "$2.93T"
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    category: "Single Stock",
    region: "Americas",
    price: 424.52,
    displayPrice: "$424.52",
    changePercent: 0.72,
    volume: "22.3M",
    marketCap: "$3.15T"
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    category: "Single Stock",
    region: "Americas",
    price: 947.8,
    displayPrice: "$947.80",
    changePercent: 1.36,
    volume: "41.7M",
    marketCap: "$2.34T"
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    category: "Single Stock",
    region: "Americas",
    price: 178.22,
    displayPrice: "$178.22",
    changePercent: -1.08,
    volume: "81.9M",
    marketCap: "$568B"
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    category: "Crypto",
    region: "Crypto",
    price: 68320.7,
    displayPrice: "$68,320.70",
    changePercent: 1.84,
    volume: "$44.8B",
    marketCap: "$1.35T"
  },
  {
    symbol: "XAU",
    name: "Gold Spot",
    category: "Commodity",
    region: "Commodities",
    price: 2372.8,
    displayPrice: "$2,372.80",
    changePercent: -0.29,
    volume: "182K",
    marketCap: "N/A"
  }
];

export const heatmap: HeatmapCell[] = [
  {
    sector: "Semiconductors",
    region: "Americas",
    performance: 1.82,
    weight: 18,
    topMover: "NVDA"
  },
  {
    sector: "Software",
    region: "Americas",
    performance: 0.74,
    weight: 16,
    topMover: "MSFT"
  },
  {
    sector: "Banks",
    region: "Europe",
    performance: 1.12,
    weight: 13,
    topMover: "HSBA"
  },
  {
    sector: "Energy",
    region: "Commodities",
    performance: 0.48,
    weight: 11,
    topMover: "SHEL"
  },
  {
    sector: "Autos",
    region: "Europe",
    performance: -0.66,
    weight: 9,
    topMover: "VOW3"
  },
  {
    sector: "Japan Exporters",
    region: "Asia",
    performance: -1.04,
    weight: 10,
    topMover: "7203"
  },
  {
    sector: "Crypto Majors",
    region: "Crypto",
    performance: 1.54,
    weight: 12,
    topMover: "BTC"
  },
  {
    sector: "Defensives",
    region: "Americas",
    performance: -0.21,
    weight: 11,
    topMover: "PG"
  }
];
