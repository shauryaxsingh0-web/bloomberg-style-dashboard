import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded border px-2 py-0.5 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-primary/35 bg-primary/10 text-primary shadow-[0_0_18px_rgba(103,232,249,0.08)]",
        positive: "border-positive/35 bg-positive/10 text-positive",
        negative: "border-negative/35 bg-negative/10 text-negative",
        warning: "border-warning/35 bg-warning/10 text-warning",
        muted: "border-border bg-muted/60 text-muted-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
