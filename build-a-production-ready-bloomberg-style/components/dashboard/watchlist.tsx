"use client";

import { FormEvent, useMemo, useState } from "react";
import { Plus, Search, SlidersHorizontal, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { cn, formatSigned } from "@/lib/utils";
import type { AssetClass, WatchlistItem } from "@/types/market";

type WatchlistProps = {
  initialItems: WatchlistItem[];
};

const categories: Array<AssetClass | "All"> = [
  "All",
  "Single Stock",
  "Equity Index",
  "Crypto",
  "Commodity",
  "FX"
];

export function Watchlist({ initialItems }: WatchlistProps) {
  const [items, setItems, isReady] = useLocalStorage<WatchlistItem[]>(
    "apex-watchlist",
    initialItems
  );
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<AssetClass | "All">("All");
  const [symbol, setSymbol] = useState("");

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesQuery =
        !normalized ||
        item.symbol.toLowerCase().includes(normalized) ||
        item.name.toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [category, items, query]);

  const stats = useMemo(() => {
    const up = items.filter((item) => item.changePercent > 0).length;
    const down = items.filter((item) => item.changePercent < 0).length;
    const average =
      items.reduce((total, item) => total + item.changePercent, 0) /
      Math.max(items.length, 1);
    return { up, down, average };
  }, [items]);

  const addSymbol = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextSymbol = symbol.trim().toUpperCase();
    if (!nextSymbol || items.some((item) => item.symbol === nextSymbol)) return;

    const seededMove = ((nextSymbol.charCodeAt(0) % 9) - 4) / 3;
    const nextItem: WatchlistItem = {
      symbol: nextSymbol,
      name: `${nextSymbol} Custom Instrument`,
      category: "Single Stock",
      region: "Americas",
      price: 100 + nextSymbol.length * 7.35,
      displayPrice: `$${(100 + nextSymbol.length * 7.35).toFixed(2)}`,
      changePercent: Number(seededMove.toFixed(2)),
      volume: "12.4M",
      marketCap: "Watch"
    };

    setItems((current) => [nextItem, ...current]);
    setSymbol("");
  };

  const removeSymbol = (target: string) => {
    setItems((current) => current.filter((item) => item.symbol !== target));
  };

  return (
    <Card className="p-4">
      <SectionHeading eyebrow="Portfolio" title="Watchlist" value={`${items.length} instruments`} />

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <div className="rounded-md border border-border/80 bg-muted/20 p-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Advancers
          </p>
          <p className="mt-1 font-mono text-xl font-semibold text-positive">
            {stats.up}
          </p>
        </div>
        <div className="rounded-md border border-border/80 bg-muted/20 p-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Decliners
          </p>
          <p className="mt-1 font-mono text-xl font-semibold text-negative">
            {stats.down}
          </p>
        </div>
        <div className="rounded-md border border-border/80 bg-muted/20 p-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Avg Move
          </p>
          <p
            className={cn(
              "mt-1 font-mono text-xl font-semibold",
              stats.average >= 0 ? "text-positive" : "text-negative"
            )}
          >
            {formatSigned(stats.average)}%
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-2 lg:grid-cols-[1fr_auto_auto]">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            aria-label="Search watchlist"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter by ticker or company"
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2 rounded-md border border-input bg-[#0b0e14] px-3">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" aria-hidden />
          <select
            aria-label="Filter category"
            value={category}
            onChange={(event) => setCategory(event.target.value as AssetClass | "All")}
            className="h-9 bg-transparent font-mono text-xs outline-none"
          >
            {categories.map((item) => (
              <option key={item} value={item} className="bg-[#0b0e14]">
                {item}
              </option>
            ))}
          </select>
        </div>
        <form onSubmit={addSymbol} className="flex gap-2">
          <Input
            aria-label="Add ticker"
            value={symbol}
            onChange={(event) => setSymbol(event.target.value)}
            placeholder="Ticker"
            className="w-28 font-mono uppercase"
            maxLength={6}
          />
          <Button type="submit" variant="secondary" size="icon" aria-label="Add symbol">
            <Plus className="h-4 w-4" aria-hidden />
          </Button>
        </form>
      </div>

      <div className="mt-4 overflow-hidden rounded-md border border-border/80">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead>Ticker</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Move</TableHead>
              <TableHead className="hidden md:table-cell">Volume</TableHead>
              <TableHead className="hidden lg:table-cell">Cap</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.length ? (
              filteredItems.map((item) => (
                <TableRow key={item.symbol}>
                  <TableCell className="font-mono font-semibold">
                    {item.symbol}
                  </TableCell>
                  <TableCell>
                    <div className="min-w-[150px]">
                      <p className="truncate text-sm">{item.name}</p>
                      <Badge variant="muted" className="mt-1">
                        {item.category}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono number-tabular">
                    {item.displayPrice}
                  </TableCell>
                  <TableCell
                    className={cn(
                      "font-mono number-tabular",
                      item.changePercent >= 0 ? "text-positive" : "text-negative"
                    )}
                  >
                    {formatSigned(item.changePercent)}%
                  </TableCell>
                  <TableCell className="hidden font-mono text-muted-foreground md:table-cell">
                    {item.volume}
                  </TableCell>
                  <TableCell className="hidden font-mono text-muted-foreground lg:table-cell">
                    {item.marketCap}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSymbol(item.symbol)}
                      aria-label={`Remove ${item.symbol}`}
                      title={`Remove ${item.symbol}`}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-28 text-center text-sm text-muted-foreground">
                  No instruments match the current search and category filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {!isReady ? (
        <p className="mt-3 font-mono text-[11px] text-muted-foreground">
          Loading saved local watchlist...
        </p>
      ) : null}
    </Card>
  );
}
