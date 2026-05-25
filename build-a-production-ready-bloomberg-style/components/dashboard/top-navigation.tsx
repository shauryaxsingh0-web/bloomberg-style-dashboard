"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  Command,
  Globe2,
  Power,
  RefreshCcw,
  Search,
  UserCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Region } from "@/types/market";

const regions: Region[] = ["Americas", "Europe", "Asia", "Crypto", "Commodities"];

export function TopNavigation() {
  const [time, setTime] = useState<string>("--:--:--");
  const [region, setRegion] = useState<Region>("Americas");
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZoneName: "short"
        }).format(new Date())
      );
    };
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const sessionLabel = useMemo(() => {
    if (region === "Americas") return "US Cash";
    if (region === "Europe") return "EU Session";
    if (region === "Asia") return "Asia Close";
    if (region === "Crypto") return "24/7";
    return "Global Commods";
  }, [region]);

  const refresh = () => {
    setIsRefreshing(true);
    window.setTimeout(() => setIsRefreshing(false), 700);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-border/90 bg-[#050609]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1800px] flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-primary/30 bg-primary/10 shadow-glow">
            <Power className="h-5 w-5 text-primary" aria-hidden />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-base font-semibold uppercase tracking-[0.24em]">
                Apex Markets
              </h1>
              <Badge variant="positive" className="hidden sm:inline-flex">
                Live mock
              </Badge>
            </div>
            <p className="mt-0.5 font-mono text-xs text-muted-foreground">
              Institutional cross-asset terminal
            </p>
          </div>
        </div>

        <div className="grid gap-2 md:grid-cols-[minmax(220px,420px)_auto_auto] lg:flex lg:items-center">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              aria-label="Command search"
              placeholder="Search tickers, macro events, headlines"
              className="h-10 pl-9 pr-12 font-mono text-xs"
            />
            <Command
              className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex h-10 items-center gap-2 rounded-md border border-border bg-muted/25 px-3">
              <Globe2 className="h-4 w-4 text-primary" aria-hidden />
              <select
                aria-label="Market region"
                value={region}
                onChange={(event) => setRegion(event.target.value as Region)}
                className="max-w-[150px] bg-transparent font-mono text-xs text-foreground outline-none"
              >
                {regions.map((item) => (
                  <option key={item} value={item} className="bg-[#0b0e14]">
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="hidden h-10 items-center rounded-md border border-border bg-muted/25 px-3 font-mono text-xs text-muted-foreground sm:flex">
              {sessionLabel}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex h-10 min-w-[126px] items-center justify-center rounded-md border border-border bg-muted/25 px-3 font-mono text-xs number-tabular">
              {time}
            </div>
            <Button
              variant="secondary"
              size="icon"
              onClick={refresh}
              aria-label="Refresh market data"
              title="Refresh market data"
            >
              <RefreshCcw
                className={cn("h-4 w-4", isRefreshing && "animate-spin")}
                aria-hidden
              />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Notifications" title="Notifications">
              <Bell className="h-4 w-4" aria-hidden />
            </Button>
            <div className="flex h-10 items-center gap-2 rounded-md border border-border bg-muted/25 px-3">
              <UserCircle2 className="h-4 w-4 text-muted-foreground" aria-hidden />
              <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
                Analyst
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
