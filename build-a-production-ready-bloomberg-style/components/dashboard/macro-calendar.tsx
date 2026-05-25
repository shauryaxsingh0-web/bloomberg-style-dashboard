import { CalendarClock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import type { MacroEvent } from "@/types/market";

type MacroCalendarProps = {
  events: MacroEvent[];
};

export function MacroCalendar({ events }: MacroCalendarProps) {
  return (
    <Card className="p-4">
      <SectionHeading eyebrow="Macro" title="Calendar" value="next 24h" />
      <div className="mt-4 overflow-hidden rounded-md border border-border/80">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead>Event</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Prev</TableHead>
              <TableHead>Forecast</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <CalendarClock
                      className="h-4 w-4 text-muted-foreground"
                      aria-hidden
                    />
                    <div>
                      <p className="font-medium">{event.event}</p>
                      <Badge
                        variant={
                          event.importance === "high"
                            ? "warning"
                            : event.importance === "medium"
                              ? "default"
                              : "muted"
                        }
                        className="mt-1"
                      >
                        {event.importance}
                      </Badge>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-xs">{event.country}</TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {event.time}
                </TableCell>
                <TableCell className="font-mono text-xs number-tabular">
                  {event.previous}
                </TableCell>
                <TableCell className="font-mono text-xs number-tabular">
                  {event.forecast}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
