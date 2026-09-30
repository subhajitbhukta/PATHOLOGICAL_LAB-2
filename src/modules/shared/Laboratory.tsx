"use client";

import { PageHeader, SectionCard, FormGrid, Field, EmptyState } from "@/components/common/Layout";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ORDERS, LAB_DEPARTMENTS } from "@/lib/mock-data";
import {
  ClipboardList, FlaskConical, FileText, ShieldCheck, RotateCcw,
  QrCode, Upload, FileSpreadsheet, CheckCircle2, XCircle, AlertTriangle,
} from "lucide-react";

export function Worklist() {
  return (
    <div className="space-y-4">
      <PageHeader title="Daily Worklist" subtitle="Tests to be processed today across all departments"
        actions={<Button size="sm" variant="outline"><Upload className="h-3.5 w-3.5" /> Bulk Assign</Button>} />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {LAB_DEPARTMENTS.slice(0, 4).map((d) => (
          <Card key={d.name} className="p-3">
            <div className="text-[10px] uppercase text-muted-foreground tracking-wider">{d.name}</div>
            <div className="text-2xl font-semibold mt-1">{d.received}</div>
            <div className="text-xs text-muted-foreground">{d.pending} pending</div>
          </Card>
        ))}
      </div>
      <Tabs defaultValue="today">
        <TabsList>
          <TabsTrigger value="today">Today's Worklist</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="today" className="mt-4">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sample ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Test</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Received</TableHead>
                  <TableHead>TAT Left</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ORDERS.slice(0, 10).map((o, i) => (
                  <TableRow key={o.id}>
                    <TableCell className="font-mono text-xs">SMP-{991 + i}</TableCell>
                    <TableCell className="text-sm font-medium">{o.patient}</TableCell>
                    <TableCell className="text-xs">{["CBC", "TSH", "LFT", "LIP", "GLU"][i % 5]}</TableCell>
                    <TableCell className="text-xs">{["Hematology", "Hormones", "Biochemistry"][i % 3]}</TableCell>
                    <TableCell><StatusBadge status={i % 3 === 0 ? "High" : "Medium"} /></TableCell>
                    <TableCell className="text-xs">{o.collected}</TableCell>
                    <TableCell className="text-xs font-mono">{["1h 45m", "3h 10m", "45m", "2h", "1h"][i % 5]}</TableCell>
                    <TableCell><StatusBadge status={["Processing", "Pending", "QC", "Completed"][i % 4]} /></TableCell>
                    <TableCell><Button size="sm" variant="ghost">Process</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function Processing() {
  return (
    <div className="space-y-4">
      <PageHeader title="Sample Processing" subtitle="Live processing queue by department" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {LAB_DEPARTMENTS.map((d) => (
          <Card key={d.name} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="h-2 w-2 rounded-full" style={{ background: d.color }} />
              <Badge variant="secondary" className="text-xs">{d.processing} active</Badge>
            </div>
            <div className="text-sm font-medium">{d.name}</div>
            <div className="grid grid-cols-3 gap-1 mt-3 pt-3 border-t text-center text-xs">
              <div><div className="font-medium">{d.pending}</div><div className="text-muted-foreground text-[10px]">Pending</div></div>
              <div><div className="font-medium">{d.qc}</div><div className="text-muted-foreground text-[10px]">QC</div></div>
              <div><div className="font-medium">{d.rerun}</div><div className="text-muted-foreground text-[10px]">Re-run</div></div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function ResultEntry() {
  const { toast } = useToast();
  const params = [
    { p: "Hemoglobin", r: "11.8", u: "g/dL", ref: "13.0 - 17.0", flag: "L" },
    { p: "RBC Count", r: "4.42", u: "millions/µL", ref: "4.5 - 5.5", flag: "L" },
    { p: "WBC Count", r: "7600", u: "/µL", ref: "4,000 - 11,000", flag: "" },
    { p: "Platelet Count", r: "218000", u: "/µL", ref: "150,000 - 450,000", flag: "" },
    { p: "Hematocrit (PCV)", r: "36.8", u: "%", ref: "40 - 50", flag: "L" },
    { p: "MCV", r: "83.2", u: "fL", ref: "80 - 100", flag: "" },
    { p: "MCH", r: "26.7", u: "pg", ref: "27 - 32", flag: "L" },
    { p: "MCHC", r: "32.1", u: "g/dL", ref: "32 - 36", flag: "" },
    { p: "Neutrophils", r: "58.2", u: "%", ref: "40 - 70", flag: "" },
    { p: "Lymphocytes", r: "32.4", u: "%", ref: "20 - 40", flag: "" },
    { p: "Eosinophils", r: "5.1", u: "%", ref: "1 - 6", flag: "" },
    { p: "Monocytes", r: "3.8", u: "%", ref: "2 - 10", flag: "" },
    { p: "Basophils", r: "0.5", u: "%", ref: "0 - 2", flag: "" },
  ];

  return (
    <div className="space-y-4">
      <PageHeader title="Result Entry" subtitle="Manual / Bulk / Analyzer-integrated result entry"
        actions={
          <>
            <Button size="sm" variant="outline"><FileSpreadsheet className="h-3.5 w-3.5" /> Bulk Upload CSV</Button>
            <Button size="sm" variant="outline"><Upload className="h-3.5 w-3.5" /> Pull from Analyzer</Button>
            <Button size="sm" onClick={() => toast({ title: "Results Submitted", description: "Sent for QC + Pathologist validation" })}>
              <CheckCircle2 className="h-3.5 w-3.5" /> Submit Results
            </Button>
          </>
        } />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard title="Sample Selection" className="lg:col-span-1">
          <div className="space-y-3">
            <Field label="Sample / Barcode">
              <div className="flex gap-2">
                <Input placeholder="Scan barcode" defaultValue="8901234567890" />
                <Button size="sm" variant="outline"><QrCode className="h-3.5 w-3.5" /></Button>
              </div>
            </Field>
            <div className="rounded-md border p-2 space-y-1 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Patient</span><span>Ramesh Patil</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Sample</span><span className="font-mono">SMP-991</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Test</span><span>Complete Blood Count</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Dept</span><span>Hematology</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Method</span><span>5-Part Analyzer</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Machine</span><span>Sysmex XN-1000</span></div>
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Result Entry — CBC" className="lg:col-span-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Parameter</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Reference Range</TableHead>
                <TableHead>Flag</TableHead>
                <TableHead>Comment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {params.map((p) => (
                <TableRow key={p.p}>
                  <TableCell className="text-xs font-medium">{p.p}</TableCell>
                  <TableCell><Input defaultValue={p.r} className="h-7 text-xs font-mono" /></TableCell>
                  <TableCell className="text-xs">{p.u}</TableCell>
                  <TableCell className="text-xs font-mono">{p.ref}</TableCell>
                  <TableCell>
                    {p.flag === "H" && <Badge className="bg-amber-100 text-amber-800 border-amber-200">↑ High</Badge>}
                    {p.flag === "L" && <Badge className="bg-rose-100 text-rose-700 border-rose-200">↓ Low</Badge>}
                    {!p.flag && <span className="text-muted-foreground text-xs">—</span>}
                  </TableCell>
                  <TableCell><Input className="h-7 text-xs" placeholder="Add comment" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <FormGrid cols={2} className="mt-3">
            <Field label="Technician Notes"><Textarea rows={2} placeholder="Remarks..." /></Field>
            <Field label="QC Sample ID"><Input placeholder="QC-2026-XX" /></Field>
          </FormGrid>
        </SectionCard>
      </div>
    </div>
  );
}

export function QC() {
  return (
    <div className="space-y-4">
      <PageHeader title="Quality Control (QC)" subtitle="Daily QC for analyzers and reagents"
        actions={<Button size="sm"><CheckCircle2 className="h-3.5 w-3.5" /> Run QC</Button>} />
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>QC Sample</TableHead>
              <TableHead>Analyzer</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Observed</TableHead>
              <TableHead>SD</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              ["QC-H-001", "Sysmex XN-1000", "Normal", "7.2", "7.3", "0.15", "Pass"],
              ["QC-H-002", "Sysmex XN-1000", "High", "15.5", "15.8", "0.22", "Pass"],
              ["QC-H-003", "Sysmex XN-1000", "Low", "3.8", "3.5", "0.18", "Warn"],
              ["QC-B-001", "Roche Cobas c311", "Normal", "95", "94", "2.1", "Pass"],
              ["QC-B-002", "Roche Cobas c311", "High", "215", "218", "3.4", "Pass"],
              ["QC-B-003", "Roche Cobas c311", "Low", "32", "28", "1.8", "Fail"],
              ["QC-E-001", "Roche Cobas e411", "Normal", "2.4", "2.5", "0.12", "Pass"],
              ["QC-E-002", "Roche Cobas e411", "High", "12.5", "12.4", "0.34", "Pass"],
            ].map((r) => (
              <TableRow key={r[0]}>
                <TableCell className="font-mono text-xs">{r[0]}</TableCell>
                <TableCell className="text-xs">{r[1]}</TableCell>
                <TableCell className="text-xs">{r[2]}</TableCell>
                <TableCell className="text-xs font-mono">{r[3]}</TableCell>
                <TableCell className="text-xs font-mono">{r[4]}</TableCell>
                <TableCell className="text-xs">{r[5]}</TableCell>
                <TableCell>
                  <StatusBadge status={r[6] === "Pass" ? "Approved" : r[6] === "Warn" ? "Pending" : "Rejected"} />
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">2026-09-30</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export function RetestQueue() {
  return (
    <div className="space-y-4">
      <PageHeader title="Re-test Queue" subtitle="Samples marked for re-test due to QC failure or pathologist request" />
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sample ID</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Test</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Requested By</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              ["SMP-993", "Mohammed Khan", "Glucose (F)", "QC Fail — Level Low", "System", "High", "Pending"],
              ["SMP-996", "Vijay Mehta", "Troponin I", "Pathologist request", "Dr. Mehta", "Stat", "Pending"],
              ["SMP-998", "Suresh Pillai", "PSA", "Repeat value out of range", "Tech T-08", "High", "In Progress"],
              ["SMP-1001", "Anita Desai", "TSH", "Hemolysis suspected", "Tech T-04", "Medium", "Pending"],
            ].map((r) => (
              <TableRow key={r[0]}>
                <TableCell className="font-mono text-xs">{r[0]}</TableCell>
                <TableCell className="text-sm">{r[1]}</TableCell>
                <TableCell className="text-xs">{r[2]}</TableCell>
                <TableCell className="text-xs">{r[3]}</TableCell>
                <TableCell className="text-xs">{r[4]}</TableCell>
                <TableCell><StatusBadge status={r[5]} /></TableCell>
                <TableCell><StatusBadge status={r[6]} /></TableCell>
                <TableCell><Button size="sm" variant="ghost">Process</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
