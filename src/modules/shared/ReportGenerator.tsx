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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { DIAGNOSTIC_REPORT, REPORTS_CENTER_GROUPS } from "@/lib/mock-data";
import { useAppStore } from "@/lib/store";
import {
  Printer, FileText, FileBarChart, Download, Search, QrCode,
  ShieldCheck, Stethoscope, Building2, Receipt, Truck, Package,
} from "lucide-react";

export function ReportGenerator() {
  const { toast } = useToast();
  return (
    <div className="space-y-4">
      <PageHeader title="Report Generator" subtitle="Generate diagnostic reports — patient, package, doctor-wise, corporate"
        actions={<Button size="sm" onClick={() => toast({ title: "Report Generated", description: "RPT-2026-028841 • PDF + QR ready" })}><FileText className="h-3.5 w-3.5" /> Generate Report</Button>} />
      <SectionCard title="Report Configuration">
        <FormGrid cols={3}>
          <Field label="Report Type" required>
            <Select defaultValue="package">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single Test Report</SelectItem>
                <SelectItem value="multi">Multi-Test Report</SelectItem>
                <SelectItem value="package">Package Report</SelectItem>
                <SelectItem value="biochem">Biochemistry Report</SelectItem>
                <SelectItem value="hemato">Hematology Report</SelectItem>
                <SelectItem value="hormone">Hormone Report</SelectItem>
                <SelectItem value="urine">Urine Report</SelectItem>
                <SelectItem value="micro">Microbiology Report</SelectItem>
                <SelectItem value="histo">Histopathology Report</SelectItem>
                <SelectItem value="culture">Culture & Sensitivity</SelectItem>
                <SelectItem value="consolidated">Consolidated Patient Report</SelectItem>
                <SelectItem value="doctor">Doctor-wise Report</SelectItem>
                <SelectItem value="corporate">Corporate Health Report</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Order ID" required><Input defaultValue="ORD-20260930-00452" /></Field>
          <Field label="Template">
            <Select defaultValue="default">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default LabNexus</SelectItem>
                <SelectItem value="minimal">Minimal</SelectItem>
                <SelectItem value="letterhead">Letterhead</SelectItem>
                <SelectItem value="corporate">Corporate Branded</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Report Header"><Input defaultValue="LabNexus Central Laboratory" /></Field>
          <Field label="Logo Position">
            <Select defaultValue="left"><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="left">Left</SelectItem><SelectItem value="center">Center</SelectItem><SelectItem value="right">Right</SelectItem></SelectContent>
            </Select>
          </Field>
          <Field label="Footer Note"><Input placeholder="Disclaimer text" defaultValue="Reports are computer generated. Please consult your physician." /></Field>
          <Field label="Pathologist"><Input defaultValue="Dr. Anjali Mehta (MD, MMC-22110)" /></Field>
          <Field label="Digital Signature">
            <Select defaultValue="on"><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="on">Show Signature</SelectItem><SelectItem value="off">Hide</SelectItem></SelectContent>
            </Select>
          </Field>
          <Field label="QR Verification">
            <Select defaultValue="on"><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="on">Show QR Code</SelectItem><SelectItem value="off">Hide</SelectItem></SelectContent>
            </Select>
          </Field>
        </FormGrid>
      </SectionCard>

      <DiagnosticReportView />
    </div>
  );
}

export function DiagnosticReportView({ forPrint }: { forPrint?: boolean }) {
  return (
    <div className="bg-white rounded-lg shadow-md border print-page" id="report-print">
      {/* Header */}
      <div className="flex items-start justify-between p-5 border-b">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">LN</div>
          <div>
            <h2 className="text-lg font-bold tracking-tight">{DIAGNOSTIC_REPORT.labName}</h2>
            <p className="text-xs text-muted-foreground">{DIAGNOSTIC_REPORT.labAddress}</p>
            <p className="text-xs text-muted-foreground">{DIAGNOSTIC_REPORT.labPhone} • {DIAGNOSTIC_REPORT.labEmail}</p>
            <p className="text-xs font-medium mt-0.5 text-primary">{DIAGNOSTIC_REPORT.accreditation}</p>
          </div>
        </div>
        <div className="text-right text-xs">
          <div className="font-mono font-semibold text-sm">{DIAGNOSTIC_REPORT.reportId}</div>
          <div className="text-muted-foreground mt-1">QR: 8901234567890</div>
          <div className="w-16 h-16 ml-auto mt-1 bg-white border-2 flex items-center justify-center">
            <div className="grid grid-cols-5 gap-px">
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 ${i % 2 === 0 ? "bg-black" : "bg-white border"}`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Patient info */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-5 border-b bg-muted/30">
        <Info label="Patient Name" value={DIAGNOSTIC_REPORT.patientName} />
        <Info label="Patient ID" value={DIAGNOSTIC_REPORT.patientId} mono />
        <Info label="Age / Sex" value={`${DIAGNOSTIC_REPORT.age} / ${DIAGNOSTIC_REPORT.sex}`} />
        <Info label="Sample ID" value={DIAGNOSTIC_REPORT.sampleId} mono />
        <Info label="Order ID" value={DIAGNOSTIC_REPORT.orderId} mono />
        <Info label="Collected At" value={DIAGNOSTIC_REPORT.collectedAt} />
        <Info label="Received At" value={DIAGNOSTIC_REPORT.receivedAt} />
        <Info label="Reported At" value={DIAGNOSTIC_REPORT.reportedAt} />
        <Info label="Referring Doctor" value={DIAGNOSTIC_REPORT.referringDoctor} span2 />
        <Info label="Barcode" value={DIAGNOSTIC_REPORT.barcode} mono />
      </div>

      {/* Tests */}
      <div className="p-5 space-y-5">
        {DIAGNOSTIC_REPORT.tests.map((t) => (
          <div key={t.name}>
            <div className="flex items-center justify-between mb-2 pb-1 border-b-2 border-primary/30">
              <div>
                <h3 className="font-semibold text-sm">{t.name}</h3>
                <p className="text-[10px] text-muted-foreground">{t.department} • Method: {t.method} • Analyzer: {t.machine}</p>
              </div>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-muted-foreground border-b">
                  <th className="py-1.5 font-medium">Investigation</th>
                  <th className="py-1.5 font-medium">Result</th>
                  <th className="py-1.5 font-medium">Unit</th>
                  <th className="py-1.5 font-medium">Reference Range</th>
                  <th className="py-1.5 font-medium">Flag</th>
                </tr>
              </thead>
              <tbody>
                {t.params.map((p) => (
                  <tr key={p.p} className="border-b border-muted/50">
                    <td className="py-1.5 font-medium">{p.p}</td>
                    <td className="py-1.5 font-mono font-semibold">{p.r}</td>
                    <td className="py-1.5">{p.u}</td>
                    <td className="py-1.5 font-mono">{p.ref}</td>
                    <td className="py-1.5">
                      {p.flag === "H" && <span className="text-amber-600 font-bold">↑ High</span>}
                      {p.flag === "L" && <span className="text-rose-600 font-bold">↓ Low</span>}
                      {!p.flag && <span className="text-emerald-600">Normal</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* Remarks */}
      <div className="px-5 py-3 border-t bg-amber-50/40">
        <div className="text-xs font-semibold mb-1">Pathologist Remarks</div>
        <p className="text-xs">{DIAGNOSTIC_REPORT.remarks}</p>
      </div>

      {/* Footer */}
      <div className="p-5 border-t flex items-start justify-between gap-3">
        <div className="text-xs space-y-1 max-w-md">
          <div className="font-medium">Report Verification</div>
          <p className="text-muted-foreground">Scan the QR code above or visit labnexus.in/verify/{DIAGNOSTIC_REPORT.reportId} to verify this report.</p>
          <p className="text-muted-foreground">** End of Report **</p>
        </div>
        <div className="text-center text-xs">
          <div className="border-b border-dashed border-foreground/40 pb-1 px-4 mb-1 italic" style={{ fontFamily: "cursive" }}>
            {DIAGNOSTIC_REPORT.pathologist.name}
          </div>
          <div className="font-semibold">{DIAGNOSTIC_REPORT.pathologist.name}</div>
          <div className="text-muted-foreground">{DIAGNOSTIC_REPORT.pathologist.qualification}</div>
          <div className="text-muted-foreground">Reg: {DIAGNOSTIC_REPORT.pathologist.reg}</div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value, mono, span2 }: { label: string; value: string; mono?: boolean; span2?: boolean }) {
  return (
    <div className={span2 ? "sm:col-span-2" : ""}>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`text-sm font-medium ${mono ? "font-mono" : ""}`}>{value}</div>
    </div>
  );
}

export function ReportTypes() {
  return (
    <div className="space-y-4">
      <PageHeader title="Report Templates" subtitle="Configurable templates for different report types" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {[
          { name: "Single Test Report", icon: FileText, count: 12 },
          { name: "Multi-Test Report", icon: FileText, count: 8 },
          { name: "Package Report", icon: FileText, count: 24 },
          { name: "Biochemistry Report", icon: FileBarChart, count: 14 },
          { name: "Hematology Report", icon: FileBarChart, count: 9 },
          { name: "Hormone Report", icon: FileBarChart, count: 6 },
          { name: "Urine Report", icon: FileText, count: 5 },
          { name: "Microbiology Report", icon: FileBarChart, count: 7 },
          { name: "Histopathology Report", icon: FileText, count: 4 },
          { name: "Culture & Sensitivity", icon: FileBarChart, count: 3 },
          { name: "Consolidated Patient", icon: FileText, count: 1 },
          { name: "Doctor-wise Report", icon: Stethoscope, count: 1 },
          { name: "Corporate Health Report", icon: Building2, count: 1 },
          { name: "PDF Report", icon: FileText, count: 1 },
        ].map((t) => (
          <Card key={t.name} className="p-3 hover:shadow-md cursor-pointer transition-shadow">
            <t.icon className="h-5 w-5 text-primary mb-2" />
            <div className="text-sm font-medium">{t.name}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{t.count} templates</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function ReportsCentre() {
  return (
    <div className="space-y-4">
      <PageHeader title="Reports Centre" subtitle="Operational & business analytics — across patients, lab, franchise, logistics & inventory"
        actions={<Button size="sm" variant="outline"><Download className="h-3.5 w-3.5" /> Export Centre</Button>} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {REPORTS_CENTER_GROUPS.map((g) => (
          <SectionCard key={g.group} title={g.group}>
            <div className="space-y-1">
              {g.reports.map((r) => (
                <button key={r} className="w-full text-left flex items-center justify-between text-xs p-1.5 rounded hover:bg-accent/60">
                  <span>{r}</span>
                  <FileBarChart className="h-3 w-3 text-muted-foreground" />
                </button>
              ))}
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  );
}

export function PrintableReports() {
  const { toast } = useToast();
  const categories = [
    { group: "Patient", icon: FileText, items: ["Patient Registration Form", "Patient History", "Patient Consent Form", "Patient ID Card"] },
    { group: "Booking", icon: Receipt, items: ["Booking Confirmation", "Appointment Slip", "Order Invoice", "Payment Receipt", "Collection Slip", "Barcode Label", "Sample Collection Sheet"] },
    { group: "Sample", icon: QrCode, items: ["Sample Manifest", "Sample Handover Sheet", "Sample Receiving Sheet", "Sample Rejection Report", "Sample Tracking Report"] },
    { group: "Lab", icon: FileText, items: ["Daily Worklist", "Department Worklist", "Result Entry Sheet", "QC Report", "Re-test Report", "Pending Result Report", "TAT Report"] },
    { group: "Pathology", icon: Stethoscope, items: ["Pathologist Pending Report", "Approved Report", "Critical Value Report", "Report Amendment Report"] },
    { group: "Final", icon: FileText, items: ["Diagnostic Report", "Consolidated Report", "Package Report", "Doctor-wise Report", "Patient History Report", "Report Verification Page"] },
    { group: "Finance", icon: Receipt, items: ["Invoice", "Receipt", "Credit Note", "Debit Note", "Wallet Statement", "Ledger", "Payment Reconciliation", "Outstanding Statement", "Franchise Settlement"] },
    { group: "Logistics", icon: Truck, items: ["Pickup Sheet", "Route Sheet", "Driver Assignment", "Sample Handover Manifest", "Delivery Confirmation", "GPS Tracking Report", "Logistics SLA Report"] },
    { group: "Inventory", icon: Package, items: ["Purchase Order", "GRN", "Stock Transfer", "Stock Issue", "Stock Adjustment", "Stock Consumption", "Expiry Report", "Low Stock Report", "Inventory Valuation"] },
    { group: "Franchise", icon: Building2, items: ["Franchise Agreement", "Franchise Registration", "Franchise Statement", "Commission Statement", "Franchise Performance"] },
    { group: "Corporate", icon: Building2, items: ["Employee Registration", "Camp Registration", "Corporate Invoice", "Corporate Patient Report", "Corporate Summary"] },
  ];

  return (
    <div className="space-y-4">
      <PageHeader title="Printable Documents" subtitle="All printable forms and reports — across patient, lab, finance, logistics, inventory, franchise"
        actions={<Button size="sm" variant="outline"><Printer className="h-3.5 w-3.5" /> Print All</Button>} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {categories.map((c) => (
          <SectionCard key={c.group} title={c.group}>
            <div className="space-y-1">
              {c.items.map((it) => (
                <button
                  key={it}
                  onClick={() => toast({ title: "Generating PDF", description: it })}
                  className="w-full text-left flex items-center gap-2 text-xs p-1.5 rounded hover:bg-accent/60"
                >
                  <c.icon className="h-3 w-3 text-muted-foreground" />
                  <span className="flex-1">{it}</span>
                  <Printer className="h-3 w-3 text-muted-foreground/50" />
                </button>
              ))}
            </div>
          </SectionCard>
        ))}
      </div>

      <SectionCard title="Sample Diagnostic Report Preview" description="Live preview of the LabNexus diagnostic report">
        <DiagnosticReportView />
      </SectionCard>
    </div>
  );
}
