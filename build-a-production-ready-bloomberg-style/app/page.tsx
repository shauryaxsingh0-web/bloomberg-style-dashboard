import { MarketDashboard } from "@/components/dashboard/market-dashboard";
import { getMarketDashboardData } from "@/services/market-service";

export default async function Home() {
  const data = await getMarketDashboardData();

  return <MarketDashboard data={data} />;
}
