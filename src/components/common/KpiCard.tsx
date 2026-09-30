"use client";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

export function KpiCard({
  label,
  value,
  delta,
  trend,
  warn,
  icon: Icon,
}: {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "flat";
  warn?: boolean;
  icon?: LucideIcon;
}) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-[11px] uppercase tracking-wider font-medium text-muted-foreground">
            {label}
          </span>
          <span
            className={cn(
              "text-2xl font-semibold leading-tight",
              warn && "text-rose-600",
            )}
          >
            {value}
          </span>
        </div>
        {Icon && (
          <div className="rounded-lg bg-accent/60 p-2 text-accent-foreground shrink-0">
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>
      {delta && (
        <div className="mt-2 flex items-center gap-1 text-xs">
          {trend === "up" ? (
            <TrendingUp
              className={cn("h-3.5 w-3.5", warn ? "text-rose-500" : "text-emerald-600")}
            />
          ) : (
            <TrendingDown
              className={cn("h-3.5 w-3.5", warn ? "text-rose-500" : "text-emerald-600")}
            />
          )}
          <span
            className={cn(
              "font-medium",
              warn ? "text-rose-600" : "text-muted-foreground",
            )}
          >
            {delta}
          </span>
        </div>
      )}
    </Card>
  );
}
