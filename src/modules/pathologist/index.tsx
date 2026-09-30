"use client";

import { KpiCard } from "@/components/common/KpiCard";
import { PageHeader, SectionCard, FormGrid, Field } from "@/components/common/Layout";
import { StatusBadge, CriticalBadge } from "@/components/common/StatusBadge";
import { Timeline } from "@/components/common/Timeline";
import { useAppStore } from "@/lib/store";
import { PATHOLOGIST_QUEUE, CRITICAL_RESULTS, SAMPLE_TIMELINE, DIAGNOSTIC_REPORT } from "@/lib/mock-data";
import { DiagnosticReportView } from "@/modules/shared/ReportGenerator";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  CheckCircle2, XCircle, AlertTriangle, FileClock, Activity,
  RotateCcw, ArrowLeft, Phone, Mail, MessageSquare, Stethoscope,
} from "lucide-react";

function PathologistDashboard() {
  return (
    <div className="space-y-5">
      <PageHeader title="Pathologist Dashboard" subtitle="Dr. Anjali Mehta — MD (Pathology) — MMC-22110" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <KpiCard label="Pending Validation" value="6" delta="+2" trend="up" warn icon={FileClock} />
        <KpiCard label="Critical Results" value="3" warn trend="up" delta="+1" icon={AlertTriangle} />
        <KpiCard label="Approved Today" value="24" delta="+8" trend="up" icon={CheckCircle2} />
        <KpiCard label="Avg Validation Time" value="6m 20s" icon={Activity} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard title="Pending Validation Queue" className="lg:col-span-2">
          <div className="space-y-2">
            {PATHOLOGIST_QUEUE.map((q) => (
              <div key={q.id} className="flex items-center justify-between rounded-md border p-2.5">
                <div className="flex items-center gap-3">
                  {q.critical && <CriticalBadge />}
                  <div>
                    <div className="font-medium text-sm">{q.patient}</div>
                    <div className="text-xs text-muted-foreground">{q.age}/{q.sex} • {q.id} • {q.tests}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-[10px] text-muted-foreground">Submitted</div>
                    <div className="text-xs font-mono">{q.submitted}</div>
                  </div>
                  {q.abnormal > 0 && <Badge className="bg-amber-100 text-amber-800 border-amber-200 text-xs">{q.abnormal} abnormal</Badge>}
                  <Button size="sm">Review</Button>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Critical Results">
          <div className="space-y-2">
            {CRITICAL_RESULTS.filter((c) => !c.contacted).map((c) => (
              <div key={c.patient + c.test} className="rounded-md border border-rose-200 bg-rose-50 p-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{c.patient}</span>
                  <Badge className="bg-rose-600 text-white border-rose-700 text-[10px]">CRITICAL</Badge>
                </div>
                <div className="text-xs mt-1">{c.test} — <span className="font-mono font-semibold text-rose-700">{c.result}</span> {c.unit}</div>
                <div className="text-[10px] text-muted-foreground">Range: {c.range} • Critical: {c.critical}</div>
                <div className="mt-2 flex items-center gap-1">
                  <Button size="sm" variant="outline"><Phone className="h-3 w-3" /> Call</Button>
                  <Button size="sm" variant="outline"><Mail className="h-3 w-3" /> Email</Button>
                  <Button size="sm" variant="outline"><MessageSquare className="h-3 w-3" /> WhatsApp</Button>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function PendingValidation() {
  const { toast } = useToast();
  const q = PATHOLOGIST_QUEUE[0];
  return (
    <div className="space-y-4">
      <PageHeader
        title="Pending Validation"
        subtitle={`${q.patient} • ${q.age}/${q.sex} • ${q.id}`}
        actions={
          <>
            <Button size="sm" variant="outline"><ArrowLeft className="h-3.5 w-3.5" /> Back to Queue</Button>
            <Button size="sm" variant="destructive"><XCircle className="h-3.5 w-3.5" /> Reject</Button>
            <Button size="sm" variant="outline"><RotateCcw className="h-3.5 w-3.5" /> Re-test</Button>
            <Button size="sm" onClick={() => toast({ title: "Report Approved", description: `${q.id} — notifications sent` })}>
              <CheckCircle2 className="h-3.5 w-3.5" /> Approve & Release
            </Button>
          </>
        }
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard title="Patient & Order" className="lg:col-span-1">
          <div className="space-y-2 text-xs">
            {[
              ["Patient ID", q.id],
              ["Name", q.patient],
              ["Age / Sex", `${q.age} / ${q.sex}`],
              ["Doctor", "Dr. Mehta"],
              ["Franchise", "Powai MedLab"],
              ["Sample ID", "SMP-20260930-00995"],
              ["Collected", "12:10 PM"],
              ["Received", "02:00 PM"],
              ["Tests", q.tests],
              ["Department", q.dept],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between">
                <span className="text-muted-foreground">{k}</span>
                <span className="font-medium text-right">{v}</span>
              </div>
            ))}
          </div>
          <Separator className="my-3" />
          <div className="text-xs">
            <div className="text-muted-foreground">Clinical History</div>
            <p className="mt-1">Routine annual health checkup. No specific complaints.</p>
          </div>
        </SectionCard>
        <SectionCard title="Result Review" className="lg:col-span-2">
          <div className="space-y-4">
            {DIAGNOSTIC_REPORT.tests.map((t) => (
              <div key={t.name}>
                <h4 className="text-sm font-medium mb-2">{t.name}</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Parameter</TableHead>
                      <TableHead>Result</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Reference Range</TableHead>
                      <TableHead>Flag</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {t.params.slice(0, 5).map((p) => (
                      <TableRow key={p.p}>
                        <TableCell className="text-xs font-medium">{p.p}</TableCell>
                        <TableCell className="font-mono text-xs font-semibold">{p.r}</TableCell>
                        <TableCell className="text-xs">{p.u}</TableCell>
                        <TableCell className="text-xs font-mono">{p.ref}</TableCell>
                        <TableCell>
                          {p.flag === "H" && <Badge className="bg-amber-100 text-amber-800 border-amber-200">↑ High</Badge>}
                          {p.flag === "L" && <Badge className="bg-rose-100 text-rose-700 border-rose-200">↓ Low</Badge>}
                          {!p.flag && <span className="text-emerald-600 text-xs">Normal</span>}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ))}
          </div>
          <FormGrid cols={2} className="mt-4">
            <Field label="Pathologist Remarks">
              <Textarea rows={2} defaultValue={DIAGNOSTIC_REPORT.remarks} />
            </Field>
            <Field label="Technician Notes">
              <Textarea rows={2} placeholder="Tech remarks..." />
            </Field>
          </FormGrid>
        </SectionCard>
      </div>
      <SectionCard title="Sample Lifecycle">
        <Timeline steps={SAMPLE_TIMELINE} />
      </SectionCard>
    </div>
  );
}

function CriticalResultsView() {
  return (
    <div className="space-y-4">
      <PageHeader title="Critical Results" subtitle="Results crossing critical limits — communication log required" />
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Test</TableHead>
              <TableHead>Result</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Reference Range</TableHead>
              <TableHead>Critical Limit</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Contacted?</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {CRITICAL_RESULTS.map((c, i) => (
              <TableRow key={i}>
                <TableCell className="text-sm font-medium">{c.patient}</TableCell>
                <TableCell className="text-xs">{c.test}</TableCell>
                <TableCell className="font-mono text-xs font-semibold text-rose-700">{c.result}</TableCell>
                <TableCell className="text-xs">{c.unit}</TableCell>
                <TableCell className="font-mono text-xs">{c.range}</TableCell>
                <TableCell className="font-mono text-xs text-rose-700">{c.critical}</TableCell>
                <TableCell className="text-xs">{c.doctor}</TableCell>
                <TableCell>
                  {c.contacted ? <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">✓ Yes</Badge> : <Badge className="bg-rose-100 text-rose-700 border-rose-200 text-xs">Pending</Badge>}
                </TableCell>
                <TableCell><Button size="sm" variant="outline">Log Call</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

function ApprovedReports() {
  return (
    <div className="space-y-4">
      <PageHeader title="Approved Reports" subtitle="Reports approved & released today" />
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report ID</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Tests</TableHead>
              <TableHead>Approved At</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              ["RPT-2026-028841", "Ramesh Patil", "CBC, LIP, TSH", "05:40 PM"],
              ["RPT-2026-028840", "Meera Iyer", "CBC, LFT, KFT, TSH, URINE", "05:25 PM"],
              ["RPT-2026-028839", "Sunita Rao", "VITD, GLU", "05:10 PM"],
              ["RPT-2026-028838", "Anita Desai", "HBA1, TSH", "04:55 PM"],
              ["RPT-2026-028837", "Arjun Nair", "LIP, GLU", "04:42 PM"],
            ].map((r) => (
              <TableRow key={r[0]}>
                <TableCell className="font-mono text-xs">{r[0]}</TableCell>
                <TableCell className="text-sm font-medium">{r[1]}</TableCell>
                <TableCell className="text-xs">{r[2]}</TableCell>
                <TableCell className="text-xs font-mono">{r[3]}</TableCell>
                <TableCell><Button size="sm" variant="ghost">View Report</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

function ReportHistory() {
  return <ApprovedReports />;
}

function PatientHistory() {
  return (
    <div className="space-y-4">
      <PageHeader title="Patient History" subtitle="Trend analysis across past reports" />
      <SectionCard title="Patient Lookup">
        <Input placeholder="Search patient by ID / mobile / name..." />
      </SectionCard>
    </div>
  );
}

function RetestQueue() {
  return (
    <div className="space-y-4">
      <PageHeader title="Re-test Queue" subtitle="Pathologist-initiated re-tests" />
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sample</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Test</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              ["SMP-996", "Vijay Mehta", "Troponin I", "Repeat value out of range"],
              ["SMP-998", "Suresh Pillai", "PSA", "Pathologist request"],
              ["SMP-1001", "Anita Desai", "TSH", "Hemolysis suspected"],
            ].map((r) => (
              <TableRow key={r[0]}>
                <TableCell className="font-mono text-xs">{r[0]}</TableCell>
                <TableCell className="text-sm">{r[1]}</TableCell>
                <TableCell className="text-xs">{r[2]}</TableCell>
                <TableCell className="text-xs">{r[3]}</TableCell>
                <TableCell><StatusBadge status="Pending" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

function ComingSoon({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Stethoscope className="h-10 w-10 text-muted-foreground/40 mb-3" />
      <h2 className="text-lg font-semibold">{name}</h2>
    </div>
  );
}

export function PathologistRouter({ page }: { page: string }) {
  switch (page) {
    case "ph.dashboard":
      return <PathologistDashboard />;
    case "ph.pending":
      return <PendingValidation />;
    case "ph.critical":
      return <CriticalResultsView />;
    case "ph.retest":
      return <RetestQueue />;
    case "ph.approved":
      return <ApprovedReports />;
    case "ph.report-history":
      return <ReportHistory />;
    case "ph.patient-history":
      return <PatientHistory />;
    default:
      return <ComingSoon name={page} />;
  }
}
