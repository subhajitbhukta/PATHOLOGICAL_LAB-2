"use client";

import { KpiCard } from "@/components/common/KpiCard";
import { PageHeader, SectionCard } from "@/components/common/Layout";
import { StatusBadge } from "@/components/common/StatusBadge";
import { LOGISTICS_PICKUPS, LOGISTICS_DRIVERS, ROUTES } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import {
  Truck, MapPin, Activity, AlertTriangle, CheckCircle2, Navigation,
  ClipboardCheck, Clock, Plus, ChevronRight,
} from "lucide-react";
import { GPSTracking, SampleHandover } from "@/modules/shared/Logistics";

function LogisticsDashboard() {
  const PERFORM = [
    { day: "Mon", pickups: 38, completed: 36 },
    { day: "Tue", pickups: 42, completed: 41 },
    { day: "Wed", pickups: 51, completed: 48 },
    { day: "Thu", pickups: 48, completed: 47 },
    { day: "Fri", pickups: 62, completed: 59 },
    { day: "Sat", pickups: 74, completed: 70 },
    { day: "Sun", pickups: 35, completed: 32 },
  ];
  return (
    <div className="space-y-5">
      <PageHeader
        title="Logistics Dashboard"
        subtitle="Rider R-N3 — Route: R-North-3 — Andheri East"
        actions={<Button size="sm"><Plus className="h-3.5 w-3.5" /> New Pickup</Button>}
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <KpiCard label="Today's Pickups" value="14" delta="+2" trend="up" icon={Truck} />
        <KpiCard label="Active Routes" value="6" icon={MapPin} />
        <KpiCard label="Samples In Transit" value="89" icon={Activity} />
        <KpiCard label="Delayed" value="3" warn trend="up" delta="+1" icon={AlertTriangle} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard title="Pickup Performance (7 days)" className="lg:col-span-2">
          <div className="h-64 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PERFORM}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0 0)" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="oklch(0.6 0 0)" />
                <YAxis tick={{ fontSize: 11 }} stroke="oklch(0.6 0 0)" />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid", borderColor: "oklch(0.9 0 0)", fontSize: 12 }} />
                <Bar dataKey="pickups" name="Pickups" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completed" name="Completed" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
        <SectionCard title="My Route Today">
          <div className="space-y-2">
            <div className="rounded-md border p-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm">R-North-3</span>
                <Badge variant="secondary">Andheri East</Badge>
              </div>
              <div className="text-xs text-muted-foreground mt-1">6 stops • 3 franchises • Andheri Hub</div>
            </div>
            <div className="space-y-1.5">
              {[
                { stop: 1, name: "Andheri Health Hub", samples: 8, status: "Collected" },
                { stop: 2, name: "Kapole Collection Centre", samples: 5, status: "On Way" },
                { stop: 3, name: "Versova Pickup", samples: 3, status: "Pending" },
                { stop: 4, name: "Sakinaka Pickup", samples: 2, status: "Pending" },
              ].map((s) => (
                <div key={s.stop} className="flex items-center justify-between text-xs rounded-md border p-2">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold">{s.stop}</div>
                    <span>{s.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-[10px]">{s.samples} samp</Badge>
                    <StatusBadge status={s.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function TodayRoute() {
  return (
    <div className="space-y-4">
      <PageHeader title="Today's Route" subtitle="Stops and pickup plan" />
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Stop</TableHead>
              <TableHead>Franchise</TableHead>
              <TableHead>Address</TableHead>
              <TableHead className="text-center">Samples</TableHead>
              <TableHead>Pickup Time</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {LOGISTICS_PICKUPS.map((p, i) => (
              <TableRow key={p.id}>
                <TableCell><div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">{i + 1}</div></TableCell>
                <TableCell className="text-sm font-medium">{p.franchise}</TableCell>
                <TableCell className="text-xs">{p.address}</TableCell>
                <TableCell className="text-center text-xs">{p.samples}</TableCell>
                <TableCell className="text-xs">{p.preferred}</TableCell>
                <TableCell><StatusBadge status={p.status} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

function CompletedPickups() {
  return (
    <div className="space-y-4">
      <PageHeader title="Completed Pickups" subtitle="Pickups completed today" />
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pickup ID</TableHead>
              <TableHead>Franchise</TableHead>
              <TableHead className="text-center">Samples</TableHead>
              <TableHead>Completed At</TableHead>
              <TableHead>Hub</TableHead>
              <TableHead>Temp</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {LOGISTICS_PICKUPS.filter((p) => ["Reached Hub", "Collected"].includes(p.status)).map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-mono text-xs">{p.id}</TableCell>
                <TableCell className="text-sm">{p.franchise}</TableCell>
                <TableCell className="text-center text-xs">{p.samples}</TableCell>
                <TableCell className="text-xs">{p.ready}</TableCell>
                <TableCell className="text-xs">{p.partner.includes("P") ? "Pune Hub" : "Andheri Hub"}</TableCell>
                <TableCell><Badge variant="secondary" className="text-xs">4°C ✓</Badge></TableCell>
                <TableCell><StatusBadge status="Completed" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

function Exceptions() {
  return (
    <div className="space-y-4">
      <PageHeader title="Exceptions" subtitle="Delayed / failed pickups" />
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pickup ID</TableHead>
              <TableHead>Franchise</TableHead>
              <TableHead>Exception Type</TableHead>
              <TableHead>Delay</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {LOGISTICS_PICKUPS.filter((p) => p.status === "Delayed").map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-mono text-xs">{p.id}</TableCell>
                <TableCell className="text-sm">{p.franchise}</TableCell>
                <TableCell><Badge className="bg-rose-100 text-rose-700 border-rose-200 text-xs">Delayed</Badge></TableCell>
                <TableCell className="font-mono text-xs text-rose-600">{p.eta}</TableCell>
                <TableCell className="text-xs">Traffic — Vashi bridge</TableCell>
                <TableCell><Button size="sm" variant="outline">Re-route</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

function Performance() {
  return (
    <div className="space-y-4">
      <PageHeader title="Performance" subtitle="Your logistics KPIs" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "On-time %", value: "94%", icon: Clock },
          { label: "Avg Pickup Time", value: "8 min", icon: Truck },
          { label: "Avg Transit", value: "1h 22m", icon: Navigation },
          { label: "SLA Score", value: "8.4/10", icon: CheckCircle2 },
        ].map((s) => (
          <Card key={s.label} className="p-3">
            <div className="flex items-center justify-between">
              <div><div className="text-[10px] uppercase text-muted-foreground tracking-wider">{s.label}</div><div className="text-xl font-semibold mt-1">{s.value}</div></div>
              <s.icon className="h-4 w-4 text-muted-foreground/60" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ComingSoon({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Truck className="h-10 w-10 text-muted-foreground/40 mb-3" />
      <h2 className="text-lg font-semibold">{name}</h2>
    </div>
  );
}

export function LogisticsRouter({ page }: { page: string }) {
  switch (page) {
    case "lg.dashboard":
      return <LogisticsDashboard />;
    case "lg.pickups":
      return <PickupPickupManagement />;
    case "lg.today-route":
      return <TodayRoute />;
    case "lg.live-tracking":
      return <GPSTracking />;
    case "lg.handover":
      return <SampleHandover />;
    case "lg.completed":
      return <CompletedPickups />;
    case "lg.exceptions":
      return <Exceptions />;
    case "lg.performance":
      return <Performance />;
    default:
      return <ComingSoon name={page} />;
  }
}

// Re-export to avoid circular — PickupManagement alias
import { PickupManagement } from "@/modules/shared/Logistics";
function PickupPickupManagement() {
  return <PickupManagement />;
}
