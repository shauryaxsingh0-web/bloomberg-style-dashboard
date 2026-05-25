import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <main className="min-h-screen bg-background p-4 text-foreground sm:p-6">
      <div className="mx-auto max-w-[1800px] space-y-4">
        <Skeleton className="h-16 w-full rounded-md" />
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-36 rounded-md" />
          ))}
        </div>
        <div className="grid gap-4 xl:grid-cols-[1.45fr_0.9fr]">
          <Skeleton className="h-96 rounded-md" />
          <Skeleton className="h-96 rounded-md" />
        </div>
      </div>
    </main>
  );
}
