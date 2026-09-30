"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const STATUS_STYLES: Record<string, string> = {
  // Status colors
  Booked: "bg-slate-100 text-slate-700 border-slate-200",
  Confirmed: "bg-slate-100 text-slate-700 border-slate-200",
  Draft: "bg-slate-100 text-slate-500 border-slate-200",
  Assigned: "bg-indigo-100 text-indigo-700 border-indigo-200",
  "Collection Pending": "bg-amber-100 text-amber-800 border-amber-200",
  Collected: "bg-cyan-100 text-cyan-800 border-cyan-200",
  "Pickup Pending": "bg-amber-100 text-amber-800 border-amber-200",
  "In Transit": "bg-cyan-100 text-cyan-800 border-cyan-200",
  Received: "bg-teal-100 text-teal-800 border-teal-200",
  Accessioned: "bg-teal-100 text-teal-800 border-teal-200",
  Processing: "bg-teal-100 text-teal-800 border-teal-200",
  "Result Pending": "bg-amber-100 text-amber-800 border-amber-200",
  "Validation Pending": "bg-amber-100 text-amber-800 border-amber-200",
  "Pathologist Review": "bg-violet-100 text-violet-800 border-violet-200",
  Approved: "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Report Released": "bg-emerald-100 text-emerald-800 border-emerald-200",
  Released: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Cancelled: "bg-rose-100 text-rose-700 border-rose-200",
  Rejected: "bg-rose-100 text-rose-700 border-rose-200",
  Refunded: "bg-rose-100 text-rose-700 border-rose-200",
  // Payment
  Paid: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Pending: "bg-amber-100 text-amber-800 border-amber-200",
  Credit: "bg-violet-100 text-violet-800 border-violet-200",
  "Partially Paid": "bg-amber-100 text-amber-800 border-amber-200",
  // Priority
  High: "bg-rose-100 text-rose-700 border-rose-200",
  Medium: "bg-amber-100 text-amber-800 border-amber-200",
  Low: "bg-slate-100 text-slate-700 border-slate-200",
  // Logistics
  "On Way": "bg-cyan-100 text-cyan-800 border-cyan-200",
  "On Route": "bg-cyan-100 text-cyan-800 border-cyan-200",
  Delayed: "bg-rose-100 text-rose-700 border-rose-200",
  "At Hub": "bg-slate-100 text-slate-700 border-slate-200",
  Idle: "bg-slate-100 text-slate-500 border-slate-200",
  "Reached Hub": "bg-teal-100 text-teal-800 border-teal-200",
  // Tickets
  Open: "bg-amber-100 text-amber-800 border-amber-200",
  "In Progress": "bg-cyan-100 text-cyan-800 border-cyan-200",
  Resolved: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Closed: "bg-slate-100 text-slate-500 border-slate-200",
  // Active states
  Active: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Inactive: "bg-slate-100 text-slate-500 border-slate-200",
  Scheduled: "bg-indigo-100 text-indigo-700 border-indigo-200",
  Completed: "bg-emerald-100 text-emerald-800 border-emerald-200",
};

export function StatusBadge({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  const style = STATUS_STYLES[status] || "bg-slate-100 text-slate-700 border-slate-200";
  return (
    <Badge variant="outline" className={cn("font-medium border", style, className)}>
      {status}
    </Badge>
  );
}

export function CriticalBadge() {
  return (
    <Badge className="bg-rose-600 text-white border-rose-700 animate-pulse">
      CRITICAL
    </Badge>
  );
}
