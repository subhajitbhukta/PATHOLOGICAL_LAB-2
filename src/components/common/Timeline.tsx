"use client";

import { cn } from "@/lib/utils";

export interface TimelineStep {
  time: string;
  status: string;
  by: string;
  note: string;
}

export function Timeline({
  steps,
  className,
}: {
  steps: TimelineStep[];
  className?: string;
}) {
  return (
    <ol className={cn("relative border-l border-border ml-2 space-y-5", className)}>
      {steps.map((s, i) => (
        <li key={i} className="ml-5 relative">
          <span
            className={cn(
              "absolute -left-[26px] top-0.5 rounded-full h-3.5 w-3.5 border-2 border-background",
              i === steps.length - 1
                ? "bg-emerald-500 pulse-dot"
                : i < steps.length - 1
                  ? "bg-primary"
                  : "bg-slate-400",
            )}
          />
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-mono text-muted-foreground">{s.time}</span>
              <span className="font-medium text-foreground">{s.status}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              by <span className="font-medium text-foreground/80">{s.by}</span> — {s.note}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
