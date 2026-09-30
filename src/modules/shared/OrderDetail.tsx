"use client";

import { PageHeader, SectionCard, Field, FormGrid } from "@/components/common/Layout";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Timeline } from "@/components/common/Timeline";
import { useAppStore } from "@/lib/store";
import { ORDERS, SAMPLE_TIMELINE, DIAGNOSTIC_REPORT } from "@/lib/mock-data";
import {
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  ArrowLeft,
  FileText,
  QrCode,
  Printer,
  Mail,
  Share2,
  RefreshCw,
  MapPin,
  User,
  IndianRupee,
  TestTube2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export function OrderDetail({ portal }: { portal: string }) {
  const navigate = useAppStore((s) => s.navigate);
  const order = ORDERS[0];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => navigate(portal as any, portal === "super-admin" ? "sa.orders" : "fr.orders")}
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Orders
        </Button>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline"><Mail className="h-3.5 w-3.5" /> Email</Button>
          <Button size="sm" variant="outline"><Printer className="h-3.5 w-3.5" /> Print</Button>
          <Button size="sm" variant="outline"><RefreshCw className="h-3.5 w-3.5" /> Re-collect</Button>
          <Button size="sm"><FileText className="h-3.5 w-3.5" /> View Report</Button>
        </div>
      </div>

      <PageHeader
        title={order.id}
        subtitle={`Patient ${order.patient} • ${order.franchise}`}
        actions={<StatusBadge status={order.status} />}
      />

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <MiniCard icon={User} label="Patient" value={order.patient} sub={order.patientId} />
        <MiniCard icon={TestTube2} label="Samples" value="3" sub="SERUM, EDTA, FLUORIDE" />
        <MiniCard icon={IndianRupee} label="Amount" value={`₹${order.amount}`} sub={order.payment} />
        <MiniCard icon={CheckCircle2} label="Released" value={order.released} sub={order.released !== "—" ? "On time" : "Pending"} />
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tests">Tests & Results</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <SectionCard title="Patient Information" className="lg:col-span-1">
              <div className="space-y-2 text-xs">
                {[
                  ["Patient ID", order.patientId],
                  ["Name", order.patient],
                  ["Age / Sex", "42 / Male"],
                  ["Mobile", "+91 98200 11223"],
                  ["Doctor", order.doctor],
                  ["Franchise", order.franchise],
                  ["Collection Type", "Home Collection"],
                  ["Address", "Andheri East, Mumbai"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-2">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-medium text-right">{v}</span>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Sample & Barcode" className="lg:col-span-1">
              <div className="space-y-3">
                <div className="flex flex-col items-center">
                  <div className="w-full h-14 bg-gradient-to-r from-black via-black to-black rounded relative overflow-hidden flex items-center gap-px px-2">
                    {Array.from({ length: 38 }).map((_, i) => (
                      <div
                        key={i}
                        style={{ width: `${1 + (i % 3)}px`, height: "100%" }}
                        className={i % 4 === 0 ? "bg-white" : "bg-white"}
                      />
                    ))}
                  </div>
                  <div className="text-xs font-mono mt-1 text-center">8901234567890</div>
                </div>
                <div className="space-y-2 text-xs">
                  {[
                    ["Sample ID", "SMP-20260930-00991"],
                    ["Sample Types", "SERUM, EDTA, FLUORIDE"],
                    ["Containers", "Yellow, Purple, Grey"],
                    ["Collected At", "10:32 AM"],
                    ["Phlebotomist", "Phlebotomist R-42"],
                    ["Pickup", "11:05 AM — R-N3"],
                    ["Reached Lab", "02:00 PM"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span className="text-muted-foreground">{k}</span>
                      <span className="font-mono">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Quick Actions" className="lg:col-span-1">
              <div className="space-y-2">
                <Button size="sm" variant="outline" className="w-full justify-start"><QrCode className="h-3.5 w-3.5" /> Print Barcode</Button>
                <Button size="sm" variant="outline" className="w-full justify-start"><FileText className="h-3.5 w-3.5" /> Print Collection Slip</Button>
                <Button size="sm" variant="outline" className="w-full justify-start"><Printer className="h-3.5 w-3.5" /> Print Invoice</Button>
                <Button size="sm" variant="outline" className="w-full justify-start"><Mail className="h-3.5 w-3.5" /> Email Report</Button>
                <Button size="sm" variant="outline" className="w-full justify-start"><Share2 className="h-3.5 w-3.5" /> Share WhatsApp</Button>
                <Button size="sm" variant="outline" className="w-full justify-start"><MapPin className="h-3.5 w-3.5" /> Track Sample</Button>
                <Button size="sm" variant="outline" className="w-full justify-start text-rose-600 hover:text-rose-700"><RefreshCw className="h-3.5 w-3.5" /> Request Re-collection</Button>
              </div>
            </SectionCard>
          </div>
        </TabsContent>

        <TabsContent value="tests" className="mt-4">
          <SectionCard title="Tests & Parameters" description="Investigation results with reference ranges">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Investigation</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Reference Range</TableHead>
                  <TableHead>Flag</TableHead>
                  <TableHead>Method</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {DIAGNOSTIC_REPORT.tests.flatMap((t) =>
                  t.params.map((p, idx) => (
                    <TableRow key={`${t.name}-${p.p}`}>
                      <TableCell className="font-medium text-xs">{p.p}</TableCell>
                      <TableCell className="font-mono text-xs font-semibold">{p.r}</TableCell>
                      <TableCell className="text-xs">{p.u}</TableCell>
                      <TableCell className="text-xs font-mono">{p.ref}</TableCell>
                      <TableCell>
                        {p.flag === "H" && <Badge className="bg-amber-100 text-amber-800 border-amber-200">↑ High</Badge>}
                        {p.flag === "L" && <Badge className="bg-rose-100 text-rose-700 border-rose-200">↓ Low</Badge>}
                        {!p.flag && <span className="text-muted-foreground text-xs">Normal</span>}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{t.method}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </SectionCard>
        </TabsContent>

        <TabsContent value="timeline" className="mt-4">
          <SectionCard title="Sample Lifecycle" description="End-to-end status timeline">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Timeline steps={SAMPLE_TIMELINE} />
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Stage breakdown</h4>
                <div className="space-y-1.5">
                  {SAMPLE_TIMELINE.map((s) => (
                    <div key={s.time} className="flex items-center justify-between rounded-md border px-3 py-1.5 text-xs">
                      <span className="font-mono text-muted-foreground">{s.time}</span>
                      <span className="font-medium">{s.status}</span>
                      <span className="text-muted-foreground">{s.by}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="billing" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <SectionCard title="Invoice INV-2026-00452">
              <div className="space-y-2 text-xs">
                {[
                  ["MRP Total", "₹1,950"],
                  ["Franchise Discount", "-₹100"],
                  ["Collection Charge", "₹0"],
                  ["GST (0% on healthcare)", "₹0"],
                  ["Wallet Adjustment", "-₹0"],
                  ["Amount Paid", "₹1,850"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-medium">{v}</span>
                  </div>
                ))}
                <div className="flex justify-between border-t pt-2 text-sm font-semibold">
                  <span>Total</span>
                  <span>₹1,850</span>
                </div>
              </div>
            </SectionCard>
            <SectionCard title="Wallet & Commission">
              <div className="space-y-2 text-xs">
                {[
                  ["Patient Selling Price", "₹1,850"],
                  ["Lab B2B Rate", "₹950"],
                  ["Franchise Margin", "₹600"],
                  ["Sub-Franchise Margin", "₹0"],
                  ["Collection Charge", "₹50"],
                  ["Net Lab Revenue", "₹1,200"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-mono font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="mt-4">
          <SectionCard title="Attached Documents">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {["Prescription", "ID Proof", "Insurance Card", "Previous Report", "Referral Letter", "Consent Form"].map((d) => (
                <div key={d} className="rounded-lg border p-3 text-xs flex items-center gap-2 hover:bg-accent/40 cursor-pointer">
                  <FileText className="h-4 w-4 text-muted-foreground" /> {d}
                </div>
              ))}
            </div>
          </SectionCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function MiniCard({ icon: Icon, label, value, sub }: { icon: any; label: string; value: string; sub: string }) {
  return (
    <Card className="p-3">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="text-[10px] uppercase text-muted-foreground tracking-wider">{label}</div>
          <div className="text-base font-semibold">{value}</div>
          <div className="text-[10px] text-muted-foreground">{sub}</div>
        </div>
        <Icon className="h-4 w-4 text-muted-foreground/60" />
      </div>
    </Card>
  );
}
