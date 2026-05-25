import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  value?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  value,
  className
}: SectionHeadingProps) {
  return (
    <div className={cn("flex items-start justify-between gap-3", className)}>
      <div>
        {eyebrow ? (
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary/80">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-1 text-sm font-semibold uppercase tracking-[0.2em]">
          {title}
        </h2>
      </div>
      {value ? (
        <span className="font-mono text-xs text-muted-foreground">{value}</span>
      ) : null}
    </div>
  );
}
