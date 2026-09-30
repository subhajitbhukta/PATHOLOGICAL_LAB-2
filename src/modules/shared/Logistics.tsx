"use client";

import { PageHeader, SectionCard, FormGrid, Field, EmptyState } from "@/components/common/Layout";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, Legend,
} from "recharts";
import { LOGISTICS_PICKUPS, LOGISTICS_DRIVERS, ROUTES } from "@/lib/mock-data";
import {
  Plus, Truck, MapPin, User, ClipboardCheck, Clock, Activity, AlertTriangle,
  CheckCircle2, Navigation, Route as RouteIcon, Thermometer, QrCode,
} from "lucide-react";

export function PickupManagement() {
  return (
    <div className="space-y-4">
      <PageHeader title="Pickup Management" subtitle="All pickup requests across the network"
        actions={<Button size="sm"><Plus className="h-3.5 w-3.5" /> New Pickup Request</Button>} />
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pickup ID</TableHead>
              <TableHead>Franchise</TableHead>
              <TableHead>Address</TableHead>
              <TableHead className="text-center">Samples</TableHead>
              <TableHead>Ready</TableHead>
              <TableHead>Preferred</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Partner</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>ETA</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {LOGISTICS_PICKUPS.map((p) => (
              <TableRow key={p.id} className="cursor-pointer hover:bg-accent/40">
                <TableCell className="font-mono text-xs font-medium">{p.id}</TableCell>
                <TableCell className="text-sm font-medium">{p.franchise}</TableCell>
                <TableCell className="text-xs">{p.address}</TableCell>
                <TableCell className="text-center text-xs font-semibold">{p.samples}</TableCell>
                <TableCell className="text-xs">{p.ready}</TableCell>
                <TableCell className="text-xs">{p.preferred}</TableCell>
                <TableCell><StatusBadge status={p.priority} /></TableCell>
                <TableCell className="text-xs">{p.partner}</TableCell>
                <TableCell><StatusBadge status={p.status} /></TableCell>
                <TableCell className="text-xs font-mono">{p.eta}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export function RoutesManagement() {
  return (
    <div className="space-y-4">
      <PageHeader title="Route Management" subtitle="Hub-and-spoke routes — franchises → hub → lab"
        actions={<Button size="sm"><Plus className="h-3.5 w-3.5" /> New Route</Button>} />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Active Routes", value: "12", icon: RouteIcon },
          { label: "Avg Transit", value: "1h 22m", icon: Clock },
          { label: "SLA Breaches", value: "2", icon: AlertTriangle },
          { label: "Samples Today", value: "342", icon: Truck },
        ].map((s) => (
          <Card key={s.label} className="p-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-[10px] uppercase text-muted-foreground tracking-wider">{s.label}</div>
                <div className="text-xl font-semibold">{s.value}</div>
              </div>
              <s.icon className="h-4 w-4 text-muted-foreground/60" />
            </div>
          </Card>
        ))}
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Route ID</TableHead>
              <TableHead>Area</TableHead>
              <TableHead className="text-center">Stops</TableHead>
              <TableHead className="text-center">Franchises</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Hub</TableHead>
              <TableHead>Pickup Time</TableHead>
              <TableHead>Lab</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ROUTES.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-mono text-xs">{r.id}</TableCell>
                <TableCell className="text-sm font-medium">{r.area}</TableCell>
                <TableCell className="text-center text-xs">{r.stops}</TableCell>
                <TableCell className="text-center text-xs">{r.franchises}</TableCell>
                <TableCell className="text-xs">{r.driver}</TableCell>
                <TableCell className="text-xs">{r.vehicle}</TableCell>
                <TableCell className="text-xs">{r.hub}</TableCell>
                <TableCell className="text-xs">{r.pickupTime}</TableCell>
                <TableCell className="text-xs">{r.lab}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export function DriversManagement() {
  return (
    <div className="space-y-4">
      <PageHeader title="Drivers" subtitle="All riders, vehicles & assignments" />
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Driver ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>GPS Location</TableHead>
              <TableHead className="text-center">Speed</TableHead>
              <TableHead>Last Update</TableHead>
              <TableHead className="text-center">Samples</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {LOGISTICS_DRIVERS.map((d) => (
              <TableRow key={d.id}>
                <TableCell className="font-mono text-xs">{d.id}</TableCell>
                <TableCell className="text-sm font-medium">{d.name}</TableCell>
                <TableCell className="text-xs">{d.vehicle}</TableCell>
                <TableCell className="font-mono text-xs">{d.route}</TableCell>
                <TableCell className="text-xs"><MapPin className="h-3 w-3 inline mr-1" />{d.gps}</TableCell>
                <TableCell className="text-center text-xs font-mono">{d.speed}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{d.lastUpdate}</TableCell>
                <TableCell className="text-center text-xs">{d.samples}</TableCell>
                <TableCell><StatusBadge status={d.status} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export function GPSTracking() {
  return (
    <div className="space-y-4">
      <PageHeader title="GPS Tracking" subtitle="Live location of every rider, hub and lab"
        actions={<Button size="sm" variant="outline"><Navigation className="h-3.5 w-3.5" /> Refresh</Button>} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard title="Live Map" className="lg:col-span-2">
          <div className="relative h-96 rounded-lg overflow-hidden bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 border">
            <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid2" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="oklch(0.5 0.05 200)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid2)" />
              <path d="M 50 100 Q 200 80 350 200 T 600 280" stroke="#0d9488" strokeWidth="3" fill="none" opacity="0.6" />
              <path d="M 100 250 Q 250 230 400 180 T 700 150" stroke="#8b5cf6" strokeWidth="3" fill="none" opacity="0.6" />
            </svg>
            <MapMarker className="absolute left-[12%] top-[20%]" color="bg-amber-500" label="Andheri Hub" />
            <MapMarker className="absolute left-[35%] top-[40%]" color="bg-amber-500" label="Bandra Hub" />
            <MapMarker className="absolute left-[60%] top-[30%]" color="bg-teal-600" label="Central Lab" big />
            <MapMarker className="absolute left-[80%] top-[55%]" color="bg-amber-500" label="Vashi Hub" />
            <MapMarker className="absolute left-[45%] top-[15%]" color="bg-rose-500" label="R-N3" pulse />
            <MapMarker className="absolute left-[28%] top-[55%]" color="bg-rose-500" label="R-S1" />
            <MapMarker className="absolute left-[70%] top-[65%]" color="bg-rose-500" label="R-S2" pulse />
            <MapMarker className="absolute left-[88%] top-[78%]" color="bg-teal-600" label="Pune Lab" big />
            <div className="absolute bottom-3 right-3 bg-card/95 rounded-md border px-2.5 py-2 text-[10px] space-y-1">
              <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-rose-500" /> Rider (active)</div>
              <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" /> Rider (moving)</div>
              <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-500" /> Hub</div>
              <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-teal-600" /> Lab</div>
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Active Riders">
          <div className="space-y-2">
            {LOGISTICS_DRIVERS.map((d) => (
              <div key={d.id} className="rounded-md border p-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{d.name}</span>
                  <StatusBadge status={d.status} />
                </div>
                <div className="text-muted-foreground mt-1">{d.gps} • {d.speed}</div>
                <div className="text-muted-foreground">{d.samples} samples • Updated {d.lastUpdate}</div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function MapMarker({ className, color, label, big, pulse }: { className?: string; color: string; label: string; big?: boolean; pulse?: boolean; }) {
  return (
    <div className={`flex flex-col items-center gap-0.5 ${className}`}>
      <div className={`relative ${pulse ? "pulse-dot" : ""}`}>
        <span className={`absolute inset-0 rounded-full ${color} ${pulse ? "opacity-30" : "opacity-0"} ${big ? "h-8 w-8" : "h-5 w-5"}`} />
        <span className={`relative block rounded-full ring-2 ring-card ${color} ${big ? "h-4 w-4" : "h-3 w-3"}`} />
      </div>
      <span className="text-[9px] font-medium bg-card/90 px-1.5 py-0.5 rounded border whitespace-nowrap">{label}</span>
    </div>
  );
}

export function SampleHandover() {
  return (
    <div className="space-y-4">
      <PageHeader title="Sample Handover" subtitle="Manifests for pickup, hub transfer & lab receiving"
        actions={<Button size="sm"><Plus className="h-3.5 w-3.5" /> New Handover</Button>} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard title="Pickup Manifest" className="lg:col-span-2">
          <FormGrid cols={3}>
            <Field label="Pickup ID"><Input defaultValue="PKP-2026-1842" readOnly /></Field>
            <Field label="Franchise"><Input defaultValue="Andheri Health Hub" readOnly /></Field>
            <Field label="Pickup Time"><Input defaultValue="01:30 PM" readOnly /></Field>
            <Field label="Driver"><Input defaultValue="Sandeep Kumar (R-N3)" readOnly /></Field>
            <Field label="Vehicle"><Input defaultValue="MH-02-AB-1234" readOnly /></Field>
            <Field label="Temperature Log"><Input defaultValue="4°C ✓" readOnly /></Field>
          </FormGrid>
          <div className="mt-3 rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sample ID</TableHead>
                  <TableHead>Barcode</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Condition</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  ["SMP-991", "8901234567890", "Ramesh Patil", "SERUM", "Good"],
                  ["SMP-992", "8901234567891", "Anita Desai", "EDTA", "Good"],
                  ["SMP-993", "8901234567892", "Mohammed Khan", "FLUORIDE", "Good"],
                  ["SMP-994", "8901234567893", "Sunita Rao", "SERUM", "Good"],
                  ["SMP-995", "8901234567894", "Vijay Mehta", "EDTA", "Good"],
                ].map((r) => (
                  <TableRow key={r[0]}>
                    <TableCell className="font-mono text-xs">{r[0]}</TableCell>
                    <TableCell className="font-mono text-xs">{r[1]}</TableCell>
                    <TableCell className="text-xs">{r[2]}</TableCell>
                    <TableCell><Badge variant="secondary" className="text-xs">{r[3]}</Badge></TableCell>
                    <TableCell><StatusBadge status="Approved" /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Button size="sm"><CheckCircle2 className="h-3.5 w-3.5" /> Verify & Accept</Button>
            <Button size="sm" variant="outline"><QrCode className="h-3.5 w-3.5" /> Scan All</Button>
            <Button size="sm" variant="outline"><Thermometer className="h-3.5 w-3.5" /> Log Temperature</Button>
          </div>
        </SectionCard>
        <SectionCard title="Signatures">
          <div className="space-y-3">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Collector Signature</div>
              <div className="h-16 border-2 border-dashed rounded-md flex items-center justify-center text-xs text-muted-foreground">Sign here</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Driver Signature</div>
              <div className="h-16 border-2 border-dashed rounded-md flex items-center justify-center text-xs text-muted-foreground">Sign here</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Hub Receiver Signature</div>
              <div className="h-16 border-2 border-dashed rounded-md flex items-center justify-center text-xs text-muted-foreground">Sign here</div>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

export function LogisticsSLA() {
  return (
    <div className="space-y-4">
      <PageHeader title="Logistics SLA" subtitle="Track SLA breaches across pickup, transit, hub & receiving"
        actions={<Button size="sm" variant="outline"><AlertTriangle className="h-3.5 w-3.5" /> View Breaches</Button>} />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Pickup SLA", value: "94%", sub: "12 breaches / 30d", icon: Truck },
          { label: "Transit SLA", value: "88%", sub: "24 breaches / 30d", icon: RouteIcon },
          { label: "Hub SLA", value: "97%", sub: "4 breaches / 30d", icon: ClipboardCheck },
          { label: "Receiving SLA", value: "99%", sub: "1 breach / 30d", icon: CheckCircle2 },
        ].map((s) => (
          <Card key={s.label} className="p-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-[10px] uppercase text-muted-foreground tracking-wider">{s.label}</div>
                <div className="text-xl font-semibold">{s.value}</div>
                <div className="text-[10px] text-muted-foreground">{s.sub}</div>
              </div>
              <s.icon className="h-4 w-4 text-muted-foreground/60" />
            </div>
          </Card>
        ))}
      </div>
      <SectionCard title="SLA Breaches (Today)">
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pickup ID</TableHead>
                <TableHead>SLA Type</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Actual</TableHead>
                <TableHead>Delay</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Severity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                ["PKP-2026-1846", "Pickup SLA", "30 min", "75 min", "+45 min", "Driver unavailable", "High"],
                ["PKP-2026-1841", "Transit SLA", "2h", "3h 12m", "+1h 12m", "Traffic", "Medium"],
                ["PKP-2026-1838", "Hub SLA", "1h", "1h 18m", "+18 min", "Volume overload", "Low"],
              ].map((r) => (
                <TableRow key={r[0]}>
                  <TableCell className="font-mono text-xs">{r[0]}</TableCell>
                  <TableCell className="text-xs">{r[1]}</TableCell>
                  <TableCell className="font-mono text-xs">{r[2]}</TableCell>
                  <TableCell className="font-mono text-xs">{r[3]}</TableCell>
                  <TableCell className="font-mono text-xs text-rose-600">{r[4]}</TableCell>
                  <TableCell className="text-xs">{r[5]}</TableCell>
                  <TableCell><StatusBadge status={r[6]} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </SectionCard>
    </div>
  );
}
