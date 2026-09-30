"use client";

import { KpiCard } from "@/components/common/KpiCard";
import { PageHeader, SectionCard } from "@/components/common/Layout";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Timeline } from "@/components/common/Timeline";
import { useAppStore } from "@/lib/store";
import { WALLET_TRANSACTIONS, ORDERS, SAMPLE_TIMELINE } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Area, AreaChart,
} from "recharts";
import {
  ShoppingCart, Users, TestTube2, FileClock, FileCheck2, AlertTriangle,
  IndianRupee, Wallet, Receipt, Plus, ChevronRight, UserPlus, Activity,
} from "lucide-react";

const REVENUE_7D = [
  { day: "Mon", rev: 68 },
  { day: "Tue", rev: 72 },
  { day: "Wed", rev: 88 },
  { day: "Thu", rev: 94 },
  { day: "Fri", rev: 112 },
  { day: "Sat", rev: 128 },
  { day: "Sun", rev: 58 },
];

export function FranchiseDashboard() {
  const navigate = useAppStore((s) => s.navigate);
  return (
    <div className="space-y-5">
      <PageHeader
        title="Andheri Health Hub — Dashboard"
        subtitle="FR-001 • Owner: Rajesh Shah • Gold Plan • Mumbai"
        actions={
          <>
            <Button size="sm" variant="outline" onClick={() => navigate("franchise", "fr.wallet")}>
              <Wallet className="h-3.5 w-3.5" /> Wallet
            </Button>
            <Button size="sm" onClick={() => navigate("franchise", "fr.book-test")}>
              <Plus className="h-3.5 w-3.5" /> Book Test
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        <KpiCard label="Today's Orders" value="38" delta="+8%" trend="up" icon={ShoppingCart} />
        <KpiCard label="Patients" value="32" delta="+5" trend="up" icon={Users} />
        <KpiCard label="Samples Collected" value="42" delta="+4" trend="up" icon={TestTube2} />
        <KpiCard label="Reports Pending" value="6" delta="-2" trend="down" icon={FileClock} />
        <KpiCard label="Reports Released" value="22" delta="+11%" trend="up" icon={FileCheck2} />
        <KpiCard label="Today's Revenue" value="₹84,200" delta="+9.1%" trend="up" icon={IndianRupee} />
        <KpiCard label="Wallet Balance" value="₹12,500" delta="+₹3.8K" trend="up" icon={Wallet} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard title="Revenue — Last 7 Days" description="₹ thousands" className="lg:col-span-2">
          <div className="h-64 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_7D}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0d9488" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#0d9488" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0 0)" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="oklch(0.6 0 0)" />
                <YAxis tick={{ fontSize: 11 }} stroke="oklch(0.6 0 0)" />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid", borderColor: "oklch(0.9 0 0)", fontSize: 12 }} />
                <Area type="monotone" dataKey="rev" stroke="#0d9488" strokeWidth={2} fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
        <SectionCard title="Wallet Snapshot">
          <div className="space-y-3">
            <div className="rounded-lg bg-gradient-to-br from-teal-600 to-emerald-700 text-white p-4">
              <div className="text-xs opacity-80">Wallet Balance</div>
              <div className="text-2xl font-semibold mt-1">₹12,500</div>
              <div className="text-xs opacity-80 mt-2">Last txn: 14:30 — Refund ₹1,100</div>
            </div>
            <Button size="sm" className="w-full" onClick={() => navigate("franchise", "fr.wallet")}>
              <Plus className="h-3.5 w-3.5" /> Recharge Wallet
            </Button>
            <div className="text-xs text-muted-foreground">Recent transactions</div>
            <div className="space-y-1.5">
              {WALLET_TRANSACTIONS.slice(0, 4).map((t) => (
                <div key={t.id} className="flex items-center justify-between text-xs">
                  <div>
                    <div className="font-medium">{t.type}</div>
                    <div className="text-muted-foreground font-mono text-[10px]">{t.ref}</div>
                  </div>
                  <div className={t.credit ? "text-emerald-600 font-medium" : "text-rose-600 font-medium"}>
                    {t.credit || t.debit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard
          title="Recent Orders"
          actions={<Button size="sm" variant="ghost" onClick={() => navigate("franchise", "fr.orders")}>View All <ChevronRight className="h-3 w-3" /></Button>}
        >
          <div className="space-y-2">
            {ORDERS.slice(0, 6).map((o) => (
              <div
                key={o.id}
                className="flex items-center justify-between rounded-md border p-2 cursor-pointer hover:bg-accent/40"
                onClick={() => navigate("franchise", "fr.order-detail")}
              >
                <div>
                  <div className="font-mono text-xs">{o.id}</div>
                  <div className="text-xs text-muted-foreground">{o.patient} • {o.tests} tests</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{o.amount}</span>
                  <StatusBadge status={o.status} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Latest Sample Lifecycle" actions={<Button size="sm" variant="ghost" onClick={() => navigate("franchise", "fr.samples")}>Track <ChevronRight className="h-3 w-3" /></Button>}>
          <Timeline steps={SAMPLE_TIMELINE.slice(0, 5)} />
        </SectionCard>
      </div>
    </div>
  );
}
