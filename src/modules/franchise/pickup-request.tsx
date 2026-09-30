"use client";

import { PageHeader, SectionCard, FormGrid, Field, EmptyState } from "@/components/common/Layout";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { LOGISTICS_PICKUPS } from "@/lib/mock-data";
import {
  Plus, Truck, MapPin, Clock, AlertTriangle, CheckCircle2, XCircle,
  QrCode, Thermometer, CalendarClock, Building2, User, Phone,
} from "lucide-react";
import { useState } from "react";

export function FranchisePickupRequest() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    toast({
      title: "Pickup Request Submitted",
      description: "PKP-2026-1848 — assigned to Route R-North-3, ETA 25 min",
    });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title="Pickup Requests"
        subtitle="Request sample pickup from your collection point — auto-assigned to nearest available rider"
        actions={<Button size="sm"><Plus className="h-3.5 w-3.5" /> New Pickup Request</Button>}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Pending", value: "2", icon: Clock, color: "text-amber-600" },
          { label: "Assigned", value: "1", icon: Truck, color: "text-cyan-600" },
          { label: "Collected Today", value: "8", icon: CheckCircle2, color: "text-emerald-600" },
          { label: "Delayed", value: "0", icon: AlertTriangle, color: "text-rose-600" },
        ].map((s) => (
          <Card key={s.label} className="p-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-[10px] uppercase text-muted-foreground tracking-wider">{s.label}</div>
                <div className={`text-xl font-semibold ${s.color}`}>{s.value}</div>
              </div>
              <s.icon className={`h-4 w-4 ${s.color}`} />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* New pickup request form */}
        <SectionCard title="New Pickup Request" className="lg:col-span-2">
          <FormGrid cols={2}>
            <Field label="Franchise / Collection Centre" required>
              <Select defaultValue="andheri">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="andheri">Andheri Health Hub (FR-001)</SelectItem>
                  <SelectItem value="kapole">Sub — Andheri East Kapole</SelectItem>
                  <SelectItem value="lokhandwala">Sub — Lokhandwala</SelectItem>
                  <SelectItem value="versova">Sub — Versova Collection Centre</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Pickup Address" required>
              <Input defaultValue="Kapole Mall, Andheri East, Mumbai 400093" />
            </Field>
            <Field label="Contact Person" required>
              <Input defaultValue="Sanjay Iyer" />
            </Field>
            <Field label="Contact Number" required>
              <Input defaultValue="+91 98200 33445" />
            </Field>
            <Field label="Number of Samples" required>
              <Input type="number" defaultValue={8} />
            </Field>
            <Field label="Sample Ready Time" required>
              <Input type="time" defaultValue="14:00" />
            </Field>
            <Field label="Preferred Pickup Time" required>
              <Select defaultValue="14-30">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="13-00">01:00 PM</SelectItem>
                  <SelectItem value="14-30">02:30 PM</SelectItem>
                  <SelectItem value="16-00">04:00 PM</SelectItem>
                  <SelectItem value="18-00">06:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Priority">
              <Select defaultValue="normal">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="stat">STAT (Critical Samples)</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Sample Types" className="sm:col-span-2">
              <Input defaultValue="SERUM (3), EDTA (3), Sodium Fluoride (2)" />
            </Field>
            <Field label="Storage Condition">
              <Select defaultValue="2-8c">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="rt">Room Temperature</SelectItem>
                  <SelectItem value="2-8c">2-8°C (Cold Chain)</SelectItem>
                  <SelectItem value="frozen">Frozen (-20°C)</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Cold Box Available?">
              <Select defaultValue="yes">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No — request from rider</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Special Instructions" className="sm:col-span-2">
              <Textarea rows={2} placeholder="e.g. Stat samples — please collect by 3 PM" />
            </Field>
          </FormGrid>
          <Separator className="my-4" />
          <div className="flex items-center justify-between gap-3">
            <div className="text-xs text-muted-foreground flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" />
              Nearest available rider: <span className="font-medium text-foreground">Sandeep Kumar (R-N3)</span> · Route R-North-3 · ETA 25 min
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">Save Draft</Button>
              <Button size="sm" onClick={handleSubmit}>
                <Truck className="h-3.5 w-3.5" /> Submit Pickup Request
              </Button>
            </div>
          </div>
          {submitted && (
            <div className="mt-3 rounded-lg border border-emerald-300 bg-emerald-50 p-3 text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <div>
                <div className="font-medium">Pickup Request PKP-2026-1848 created</div>
                <div>Auto-assigned to Rider R-N3 · SMS sent to patient · WhatsApp alert sent</div>
              </div>
            </div>
          )}
        </SectionCard>

        {/* Quick info */}
        <SectionCard title="Pickup SLA & Help">
          <div className="space-y-3 text-xs">
            <div className="rounded-md border p-3 bg-muted/30">
              <div className="font-medium mb-1.5 flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-primary" /> Service Levels</div>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Normal: 60 min pickup window</li>
                <li>• High: 30 min pickup window</li>
                <li>• STAT: 15 min (critical samples)</li>
              </ul>
            </div>
            <div className="rounded-md border p-3 bg-muted/30">
              <div className="font-medium mb-1.5 flex items-center gap-1.5"><Thermometer className="h-3.5 w-3.5 text-cyan-600" /> Cold Chain</div>
              <p className="text-muted-foreground">For samples requiring 2-8°C, ensure cold box is ready. Rider will log temperature at pickup, hub, and lab.</p>
            </div>
            <div className="rounded-md border p-3 bg-muted/30">
              <div className="font-medium mb-1.5 flex items-center gap-1.5"><QrCode className="h-3.5 w-3.5 text-violet-600" /> Handover</div>
              <p className="text-muted-foreground">Rider will scan each vial barcode at pickup and confirm sample count. Manifest will be generated automatically.</p>
            </div>
            <div className="rounded-md border p-3 bg-amber-50 border-amber-200">
              <div className="font-medium mb-1 text-amber-800 flex items-center gap-1.5"><AlertTriangle className="h-3.5 w-3.5" /> Emergency Contact</div>
              <p className="text-amber-700 text-[11px]">Logistics Hub — Andheri: +91-22-4002-8800</p>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Active pickup requests */}
      <SectionCard title="Active Pickup Requests" description="Track all your pending and in-progress pickups">
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pickup ID</TableHead>
                <TableHead>Collection Point</TableHead>
                <TableHead className="text-center">Samples</TableHead>
                <TableHead>Ready</TableHead>
                <TableHead>Preferred</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Rider</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>ETA</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {LOGISTICS_PICKUPS.slice(0, 5).map((p) => (
                <TableRow key={p.id} className="cursor-pointer hover:bg-accent/40">
                  <TableCell className="font-mono text-xs font-medium">{p.id}</TableCell>
                  <TableCell>
                    <div className="text-sm font-medium">{p.franchise}</div>
                    <div className="text-[10px] text-muted-foreground">{p.address}</div>
                  </TableCell>
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
      </SectionCard>

      {/* Recent completed */}
      <SectionCard title="Recent Completed Pickups" description="Last 7 days pickup history">
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pickup ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-center">Samples</TableHead>
                <TableHead>Rider</TableHead>
                <TableHead>Temp Log</TableHead>
                <TableHead>Hub Reached</TableHead>
                <TableHead>Lab Received</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                ["PKP-2026-1840", "2026-09-30", 6, "R-N3", "4°C ✓", "12:45 PM", "02:00 PM", "Completed"],
                ["PKP-2026-1839", "2026-09-30", 4, "R-N3", "4°C ✓", "11:30 AM", "01:15 PM", "Completed"],
                ["PKP-2026-1838", "2026-09-29", 12, "R-S1", "4°C ✓", "06:45 PM", "08:30 PM", "Completed"],
                ["PKP-2026-1837", "2026-09-29", 8, "R-N3", "5°C ✓", "04:30 PM", "06:15 PM", "Completed"],
                ["PKP-2026-1836", "2026-09-29", 5, "R-N3", "4°C ✓", "01:15 PM", "03:00 PM", "Completed"],
              ].map((r) => (
                <TableRow key={r[0]}>
                  <TableCell className="font-mono text-xs">{r[0]}</TableCell>
                  <TableCell className="text-xs font-mono">{r[1]}</TableCell>
                  <TableCell className="text-center text-xs">{r[2]}</TableCell>
                  <TableCell className="font-mono text-xs">{r[3]}</TableCell>
                  <TableCell><Badge variant="secondary" className="text-xs">{r[4]}</Badge></TableCell>
                  <TableCell className="text-xs font-mono">{r[5]}</TableCell>
                  <TableCell className="text-xs font-mono">{r[6]}</TableCell>
                  <TableCell><StatusBadge status={r[7]} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </SectionCard>
    </div>
  );
}
