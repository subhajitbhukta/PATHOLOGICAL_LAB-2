"use client";

import { PageHeader, SectionCard, FormGrid, Field, EmptyState } from "@/components/common/Layout";
import { Timeline } from "@/components/common/Timeline";
import { StatusBadge } from "@/components/common/StatusBadge";
import { useAppStore } from "@/lib/store";
import { ORDERS, SAMPLE_TIMELINE, REJECTION_REASONS, LAB_DEPARTMENTS } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Search, QrCode, CheckCircle2, XCircle, MapPin, TestTube2, History, Activity,
} from "lucide-react";
import { useState } from "react";

export function SampleTracking() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Sample Tracking"
        subtitle="Real-time tracking of every sample from collection to report release"
      />
      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active Samples</TabsTrigger>
          <TabsTrigger value="timeline">Timeline View</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-4">
          <Card>
            <div className="p-3 flex gap-2 border-b">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input placeholder="Scan barcode or search Sample ID / Patient..." className="pl-8" />
              </div>
              <Button variant="outline"><QrCode className="h-3.5 w-3.5" /> Scan</Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sample ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Sample Type</TableHead>
                  <TableHead>Collected</TableHead>
                  <TableHead>Current Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Time In Stage</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ORDERS.slice(0, 10).map((o, i) => {
                  const statuses = ["Processing", "In Transit", "Accessioned", "Pathologist Review", "Result Pending", "Collected"];
                  const locations = ["Central Lab — Mumbai", "Andheri Hub", "In Transit (R-N3)", "Hematology Dept", "Biochemistry Dept"];
                  return (
                    <TableRow key={o.id} className="cursor-pointer hover:bg-accent/40">
                      <TableCell className="font-mono text-xs font-medium">SMP-20260930-{(991 + i).toString().padStart(5, "0")}</TableCell>
                      <TableCell className="text-sm font-medium">{o.patient}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Badge variant="secondary" className="text-[10px]">SERUM</Badge>
                          <Badge variant="secondary" className="text-[10px]">EDTA</Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{o.collected}</TableCell>
                      <TableCell className="text-xs">{locations[i % locations.length]}</TableCell>
                      <TableCell><StatusBadge status={statuses[i % statuses.length]} /></TableCell>
                      <TableCell className="text-xs font-mono">{["12m", "1h 5m", "2h 15m", "3h 22m", "5h 8m", "8m"][i % 6]}</TableCell>
                      <TableCell><Button size="sm" variant="ghost">Track</Button></TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
        <TabsContent value="timeline" className="mt-4">
          <SectionCard title={`SMP-20260930-00991 — Ramesh Patil`} description="Complete lifecycle of a sample">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <Timeline steps={SAMPLE_TIMELINE} />
              </div>
              <div className="space-y-3">
                <div className="rounded-lg border p-3 space-y-2">
                  <div className="text-xs text-muted-foreground">Sample Info</div>
                  {[
                    ["Sample ID", "SMP-20260930-00991"],
                    ["Barcode", "8901234567890"],
                    ["Order", "ORD-20260930-00452"],
                    ["Types", "SERUM, EDTA, FLUORIDE"],
                    ["Containers", "Yellow, Purple, Grey"],
                    ["Volume", "2 mL each"],
                    ["Temp Log", "4°C ✓"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-xs">
                      <span className="text-muted-foreground">{k}</span>
                      <span className="font-mono">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg border p-3 space-y-2">
                  <div className="text-xs text-muted-foreground">Chain of Custody</div>
                  {SAMPLE_TIMELINE.slice(0, 6).map((s, i) => (
                    <div key={i} className="text-xs">
                      <div className="font-medium">{s.by}</div>
                      <div className="text-muted-foreground">{s.time} — {s.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>
        </TabsContent>
        <TabsContent value="departments" className="mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {LAB_DEPARTMENTS.map((d) => (
              <Card key={d.name} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="h-2 w-2 rounded-full" style={{ background: d.color }} />
                  <Activity className="h-3.5 w-3.5 text-muted-foreground/50" />
                </div>
                <div className="text-sm font-medium">{d.name}</div>
                <div className="text-2xl font-semibold mt-1">{d.received}</div>
                <div className="text-xs text-muted-foreground">received today</div>
                <div className="mt-3 pt-3 border-t grid grid-cols-3 gap-1 text-center">
                  <div>
                    <div className="text-xs font-medium">{d.pending}</div>
                    <div className="text-[10px] text-muted-foreground">Pending</div>
                  </div>
                  <div>
                    <div className="text-xs font-medium">{d.processing}</div>
                    <div className="text-[10px] text-muted-foreground">Processing</div>
                  </div>
                  <div>
                    <div className="text-xs font-medium">{d.completed}</div>
                    <div className="text-[10px] text-muted-foreground">Done</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function SampleAccession() {
  const { toast } = useToast();
  const [action, setAction] = useState<"accept" | "reject" | null>(null);

  return (
    <div className="space-y-4">
      <PageHeader
        title="Sample Accession"
        subtitle="Scan barcode at lab reception — verify sample integrity — accept or reject"
        actions={<Button size="sm" variant="outline"><QrCode className="h-3.5 w-3.5" /> Open Scanner</Button>}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard title="Scan / Search" className="lg:col-span-1">
          <div className="space-y-3">
            <Field label="Barcode / Sample ID">
              <Input placeholder="8901234567890" defaultValue="8901234567890" />
            </Field>
            <Button className="w-full"><QrCode className="h-3.5 w-3.5" /> Scan & Pull Details</Button>
            <div className="text-xs text-muted-foreground">Or scan using a USB/Bluetooth barcode scanner — auto-pull on scan.</div>
          </div>
        </SectionCard>

        <SectionCard title="Sample Details" className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              ["Sample ID", "SMP-20260930-00991"],
              ["Barcode", "8901234567890"],
              ["Order ID", "ORD-20260930-00452"],
              ["Patient", "Ramesh Patil (PAT-00001245)"],
              ["Tests", "CBC, TSH, LFT, LIP, GLU"],
              ["Sample Type", "SERUM, EDTA, FLUORIDE"],
              ["Container", "Yellow, Purple, Grey"],
              ["Collected At", "10:32 AM"],
              ["Collector", "Phlebotomist R-42"],
              ["Franchise", "Andheri Health Hub"],
              ["Pickup", "11:05 AM — R-N3"],
              ["Reached Lab", "02:00 PM"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-md border p-2">
                <div className="text-[10px] uppercase text-muted-foreground tracking-wider">{k}</div>
                <div className="font-medium mt-0.5 text-xs">{v}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Button onClick={() => { setAction("accept"); toast({ title: "Sample Accepted", description: "Allocated to Hematology, Biochemistry, Hormones departments" }); }}>
              <CheckCircle2 className="h-3.5 w-3.5" /> Accept Sample
            </Button>
            <Button variant="destructive" onClick={() => setAction("reject")}>
              <XCircle className="h-3.5 w-3.5" /> Reject Sample
            </Button>
          </div>
        </SectionCard>
      </div>

      {action === "reject" && (
        <SectionCard title="Rejection Form" description="Record rejection reason — auto-generate Sample Rejection Report">
          <FormGrid cols={2}>
            <Field label="Rejection Reason" required>
              <Select>
                <SelectTrigger><SelectValue placeholder="Select reason" /></SelectTrigger>
                <SelectContent>
                  {REJECTION_REASONS.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Reject Quantity">
              <Select defaultValue="all">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="all">All samples in set</SelectItem><SelectItem value="partial">Partial</SelectItem></SelectContent>
              </Select>
            </Field>
            <Field label="Rejection Notes" className="sm:col-span-2">
              <Textarea rows={2} placeholder="Detailed notes for re-collection" />
            </Field>
            <Field label="Notify">
              <div className="flex items-center gap-4 text-xs pt-2">
                <label className="flex items-center gap-1.5"><input type="checkbox" defaultChecked /> Franchise</label>
                <label className="flex items-center gap-1.5"><input type="checkbox" defaultChecked /> Patient</label>
                <label className="flex items-center gap-1.5"><input type="checkbox" defaultChecked /> Doctor</label>
              </div>
            </Field>
          </FormGrid>
          <div className="flex justify-end gap-2 mt-3">
            <Button variant="outline" size="sm" onClick={() => setAction(null)}>Cancel</Button>
            <Button variant="destructive" size="sm" onClick={() => { setAction(null); toast({ title: "Sample Rejected", description: "Re-collection scheduled; notifications sent" }); }}>Confirm Rejection</Button>
          </div>
        </SectionCard>
      )}
    </div>
  );
}
