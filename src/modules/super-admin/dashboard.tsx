"use client";

import { KpiCard } from "@/components/common/KpiCard";
import { PageHeader, SectionCard } from "@/components/common/Layout";
import { Timeline } from "@/components/common/Timeline";
import { StatusBadge } from "@/components/common/StatusBadge";
import {
  SUPER_ADMIN_KPI,
  ORDER_PIPELINE,
  TAT_DASHBOARD,
  REVENUE_LAST_7D,
  DEPARTMENT_VOLUME,
  SAMPLE_TIMELINE,
} from "@/lib/mock-data";
import {
  ShoppingCart,
  Users,
  TestTube2,
  FlaskConical,
  FileClock,
  FileCheck2,
  AlertTriangle,
  RotateCcw,
  IndianRupee,
  Wallet,
  Receipt,
  Building2,
  Truck,
  MapPin,
  Activity,
  Bell,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Pie,
  PieChart,
  Cell,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import { useAppStore } from "@/lib/store";

const KPI_ICONS = [
  ShoppingCart, Users, TestTube2, FlaskConical, FlaskConical, FileClock,
  FileCheck2, AlertTriangle, RotateCcw, AlertTriangle, IndianRupee, Wallet,
  Receipt, Building2,
];

export function SuperAdminDashboard() {
  const navigate = useAppStore((s) => s.navigate);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Super Admin Dashboard"
        subtitle="Live operational view of the entire LabNexus network — Central Lab Mumbai, Pune & Navi Mumbai."
        actions={
          <>
            <Button size="sm" variant="outline" onClick={() => navigate("super-admin", "sa.easy-reports")}>
              Easy Report Generator
            </Button>
            <Button size="sm" variant="outline">Export Today</Button>
            <Button size="sm" onClick={() => navigate("super-admin", "sa.book-test")}>
              + Book New Test
            </Button>
          </>
        }
      />

      {/* KPI cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        {SUPER_ADMIN_KPI.map((kpi, i) => (
          <KpiCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            delta={kpi.delta}
            trend={kpi.trend as any}
            warn={kpi.warn}
            icon={KPI_ICONS[i]}
          />
        ))}
      </div>

      {/* Pipeline + TAT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard
          title="Live Order Pipeline"
          description="Today's order status funnel — auto-refresh every 30s"
          className="lg:col-span-2"
          actions={<Button size="sm" variant="ghost" onClick={() => navigate("super-admin", "sa.orders")}>View All <ChevronRight className="h-3 w-3" /></Button>}
        >
          <div className="space-y-3">
            <div className="grid grid-cols-6 gap-1.5">
              {ORDER_PIPELINE.map((stage) => {
                const max = Math.max(...ORDER_PIPELINE.map((s) => s.count));
                const pct = Math.round((stage.count / max) * 100);
                return (
                  <div key={stage.stage} className="flex flex-col gap-1.5">
                    <div className="text-center text-lg font-semibold">{stage.count}</div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full ${stage.color} rounded-full`} style={{ width: `${pct}%` }} />
                    </div>
                    <div className="text-[10px] text-center text-muted-foreground">{stage.stage}</div>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t">
              <div className="text-xs font-medium text-muted-foreground mb-2">Sample Lifecycle (Latest)</div>
              <Timeline steps={SAMPLE_TIMELINE.slice(-4)} />
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="TAT Dashboard"
          description="Turn-around time summary"
          actions={<StatusBadge status="TAT Breach" className="!bg-rose-100 !text-rose-700" />}
        >
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg border p-3">
                <div className="text-[10px] uppercase text-muted-foreground">Average TAT</div>
                <div className="text-lg font-semibold mt-0.5">{TAT_DASHBOARD.averageTAT}</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-[10px] uppercase text-muted-foreground">Breaches</div>
                <div className="text-lg font-semibold mt-0.5 text-rose-600">{TAT_DASHBOARD.breachCount}</div>
              </div>
            </div>
            <div>
              <div className="text-xs font-medium mb-1.5">By Pathologist (pending)</div>
              <div className="space-y-1">
                {TAT_DASHBOARD.byPathologist.map((p) => (
                  <div key={p.name} className="flex items-center justify-between text-xs">
                    <span>{p.name}</span>
                    <Badge variant="secondary" className="font-mono">{p.pending}</Badge>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-medium mb-1.5">Test-wise TAT</div>
              <div className="space-y-1">
                {TAT_DASHBOARD.byTest.slice(0, 5).map((t) => (
                  <div key={t.test} className="flex items-center justify-between text-xs">
                    <span>{t.test}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-muted-foreground">{t.avg}</span>
                      {t.breach > 0 && <Badge className="bg-rose-100 text-rose-700 border-rose-200 text-[9px]">{t.breach} breach</Badge>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Revenue + Departments + Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard
          title="Revenue — Last 7 Days"
          description="B2C, B2B & Franchise revenue in ₹ thousands"
          className="lg:col-span-2"
        >
          <div className="h-72 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_LAST_7D}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0 0)" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="oklch(0.6 0 0)" />
                <YAxis tick={{ fontSize: 11 }} stroke="oklch(0.6 0 0)" />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid",
                    borderColor: "oklch(0.9 0 0)",
                    fontSize: 12,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="b2c" name="B2C" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="b2b" name="B2B" fill="#0d9488" radius={[4, 4, 0, 0]} />
                <Bar dataKey="franchise" name="Franchise" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard
          title="Department Volume"
          description="Today's tests by department"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DEPARTMENT_VOLUME}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={2}
                >
                  {DEPARTMENT_VOLUME.map((d) => (
                    <Cell key={d.name} fill={d.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid",
                    borderColor: "oklch(0.9 0 0)",
                    fontSize: 12,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 10 }} layout="vertical" align="right" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      {/* Logistics Map + Critical alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard
          title="Logistics Live Map"
          description="Active riders, hubs and routes across Mumbai + Pune"
          className="lg:col-span-2"
          actions={
            <Button size="sm" variant="ghost" onClick={() => navigate("super-admin", "sa.gps")}>
              Open Full Map <ChevronRight className="h-3 w-3" />
            </Button>
          }
        >
          <div className="relative h-80 rounded-lg overflow-hidden bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 border">
            {/* Decorative map grid */}
            <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="oklch(0.5 0.05 200)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              <path d="M 50 100 Q 200 80 350 200 T 600 280" stroke="#0d9488" strokeWidth="2" fill="none" strokeDasharray="4 4" opacity="0.6" />
              <path d="M 100 250 Q 250 230 400 180 T 700 150" stroke="#8b5cf6" strokeWidth="2" fill="none" strokeDasharray="4 4" opacity="0.6" />
            </svg>

            {/* Map markers */}
            <MapMarker className="absolute left-[12%] top-[20%]" type="hub" label="Andheri Hub" />
            <MapMarker className="absolute left-[35%] top-[40%]" type="hub" label="Bandra Hub" />
            <MapMarker className="absolute left-[60%] top-[30%]" type="lab" label="Central Lab — Mumbai" big />
            <MapMarker className="absolute left-[80%] top-[55%]" type="hub" label="Vashi Hub" />
            <MapMarker className="absolute left-[45%] top-[15%]" type="rider" label="R-N3" />
            <MapMarker className="absolute left-[28%] top-[55%]" type="rider" label="R-S1" pulse />
            <MapMarker className="absolute left-[70%] top-[65%]" type="rider" label="R-S2" pulse />
            <MapMarker className="absolute left-[88%] top-[78%]" type="lab" label="Pune Lab" />

            {/* Legend */}
            <div className="absolute bottom-3 right-3 bg-card/95 rounded-md border px-2.5 py-2 text-[10px] space-y-1">
              <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-rose-500" /> Rider</div>
              <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-500" /> Hub</div>
              <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-teal-600" /> Lab</div>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Critical & SLA Alerts"
          description="Items requiring immediate attention"
        >
          <div className="space-y-2">
            {[
              { type: "Critical Result", txt: "Suresh Pillai — PSA: 28.6 ng/mL", when: "8m ago", sev: "rose" },
              { type: "TAT Breach", txt: "Vitamin D — 5 breaches", when: "12m ago", sev: "amber" },
              { type: "Sample Rejected", txt: "Rohit Joshi — hemolysed", when: "25m ago", sev: "amber" },
              { type: "Pickup Delayed", txt: "Vashi route — 45 min late", when: "30m ago", sev: "amber" },
              { type: "Wallet Low", txt: "Bandra Care Hub — ₹-2,100", when: "1h ago", sev: "rose" },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-2 rounded-md border p-2.5 text-xs">
                <span className={`mt-0.5 h-2 w-2 rounded-full ${a.sev === "rose" ? "bg-rose-500" : "bg-amber-500"} pulse-dot shrink-0`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{a.type}</span>
                    <span className="text-muted-foreground text-[10px]">{a.when}</span>
                  </div>
                  <div className="text-muted-foreground mt-0.5">{a.txt}</div>
                </div>
              </div>
            ))}
            <Button size="sm" variant="outline" className="w-full mt-2">View All Alerts</Button>
          </div>
        </SectionCard>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <QuickStat icon={Truck} label="Active Pickups" value="14" sub="3 delayed" />
        <QuickStat icon={Activity} label="Samples In Transit" value="89" sub="temp 2-8°C" />
        <QuickStat icon={Bell} label="Notif. Sent Today" value="3,841" sub="SMS+WhatsApp" />
        <QuickStat icon={Building2} label="Active Franchises" value="46" sub="6 sub-franchises" />
      </div>
    </div>
  );
}

function MapMarker({
  className,
  type,
  label,
  big,
  pulse,
}: {
  className?: string;
  type: "hub" | "lab" | "rider";
  label: string;
  big?: boolean;
  pulse?: boolean;
}) {
  const colors = {
    hub: "bg-amber-500 ring-amber-200",
    lab: "bg-teal-600 ring-teal-200",
    rider: "bg-rose-500 ring-rose-200",
  };
  return (
    <div className={`flex flex-col items-center gap-0.5 ${className}`}>
      <div className={`relative ${pulse ? "pulse-dot" : ""}`}>
        <span className={`absolute inset-0 rounded-full ${colors[type]} ${pulse ? "opacity-30" : "opacity-0"} ${big ? "h-8 w-8" : "h-5 w-5"}`} />
        <span
          className={`relative block rounded-full ring-2 ${colors[type]} ${big ? "h-4 w-4" : "h-3 w-3"}`}
        />
      </div>
      <span className="text-[9px] font-medium bg-card/90 px-1.5 py-0.5 rounded border whitespace-nowrap">{label}</span>
    </div>
  );
}

function QuickStat({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: any;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <Card className="p-3">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="text-[10px] uppercase text-muted-foreground tracking-wider">{label}</div>
          <div className="text-xl font-semibold">{value}</div>
          <div className="text-[10px] text-muted-foreground">{sub}</div>
        </div>
        <Icon className="h-5 w-5 text-muted-foreground/60" />
      </div>
    </Card>
  );
}
