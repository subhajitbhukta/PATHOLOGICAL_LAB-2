"use client";

import { useState } from "react";
import { PageHeader, SectionCard, FormGrid, Field, EmptyState } from "@/components/common/Layout";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
  const [withBackground, setWithBackground] = useState(true);
  const [headerEditable, setHeaderEditable] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);

  return (
    <div className="space-y-4">
      <PageHeader title="Report Generator" subtitle="Generate diagnostic reports — with/without branded background · editable invoice sample"
        actions={
          <>
            <Button size="sm" variant="outline" onClick={() => setShowInvoice((v) => !v)}>
              <Receipt className="h-3.5 w-3.5" /> {showInvoice ? "Hide" : "Show"} Invoice Sample
            </Button>
            <Button size="sm" onClick={() => toast({ title: "Report Generated", description: "RPT-2026-028841 • PDF + QR ready" })}>
              <FileText className="h-3.5 w-3.5" /> Generate Report
            </Button>
          </>
        } />

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
            <Select defaultValue="thyrocare">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default LabNexus</SelectItem>
                <SelectItem value="minimal">Minimal (Plain)</SelectItem>
                <SelectItem value="letterhead">Letterhead</SelectItem>
                <SelectItem value="corporate">Corporate Branded</SelectItem>
                <SelectItem value="thyrocare">Thyrocare-style (Branded)</SelectItem>
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

        <Separator className="my-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div>
              <div className="text-sm font-medium">Branded Background</div>
              <div className="text-xs text-muted-foreground">Show Thyrocare-style colored header band & footer strip (non-editable when locked)</div>
            </div>
            <Switch checked={withBackground} onCheckedChange={setWithBackground} />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div>
              <div className="text-sm font-medium">Header Editable</div>
              <div className="text-xs text-muted-foreground">Allow editing lab name, address, logo on report header</div>
            </div>
            <Switch checked={headerEditable} onCheckedChange={setHeaderEditable} />
          </div>
        </div>
      </SectionCard>

      <DiagnosticReportView withBackground={withBackground} headerEditable={headerEditable} />

      {showInvoice && <InvoiceSampleView />}
    </div>
  );
}

export function DiagnosticReportView({
  forPrint,
  withBackground = false,
  headerEditable = false,
}: {
  forPrint?: boolean;
  withBackground?: boolean;
  headerEditable?: boolean;
}) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md print-page relative overflow-hidden ${
        withBackground ? "border-2 border-teal-600" : "border"
      }`}
      id="report-print"
    >
      {/* Branded background — Thyrocare-style top band */}
      {withBackground && (
        <>
          {/* Top accent band */}
          <div className="h-2 bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-600" />
          {/* Watermark */}
          <div
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
            style={{ opacity: 0.04 }}
          >
            <div className="text-[160px] font-black tracking-tighter text-teal-900 -rotate-12">
              LabNexus
            </div>
          </div>
          {/* Side strip */}
          <div className="absolute left-0 top-2 bottom-0 w-1 bg-gradient-to-b from-teal-600 to-emerald-500" />
        </>
      )}

      {/* Header */}
      <div className={`relative flex items-start justify-between p-5 border-b ${withBackground ? "bg-gradient-to-r from-teal-50 to-emerald-50" : ""}`}>
        <div className="flex items-center gap-3">
          <div className={`h-12 w-12 rounded-lg flex items-center justify-center font-bold text-lg ${withBackground ? "bg-teal-700 text-white" : "bg-primary text-primary-foreground"}`}>
            LN
          </div>
          <div>
            {headerEditable ? (
              <div className="space-y-1">
                <Input defaultValue={DIAGNOSTIC_REPORT.labName} className="h-7 text-base font-bold p-1" />
                <Input defaultValue={DIAGNOSTIC_REPORT.labAddress} className="h-6 text-xs p-1" />
                <Input defaultValue={`${DIAGNOSTIC_REPORT.labPhone} • ${DIAGNOSTIC_REPORT.labEmail}`} className="h-6 text-xs p-1" />
                <Input defaultValue={DIAGNOSTIC_REPORT.accreditation} className="h-6 text-xs p-1 font-medium text-primary" />
              </div>
            ) : (
              <>
                <h2 className="text-lg font-bold tracking-tight">{DIAGNOSTIC_REPORT.labName}</h2>
                <p className="text-xs text-muted-foreground">{DIAGNOSTIC_REPORT.labAddress}</p>
                <p className="text-xs text-muted-foreground">{DIAGNOSTIC_REPORT.labPhone} • {DIAGNOSTIC_REPORT.labEmail}</p>
                <p className="text-xs font-medium mt-0.5 text-primary">{DIAGNOSTIC_REPORT.accreditation}</p>
              </>
            )}
            {withBackground && (
              <Badge className="mt-1.5 bg-teal-700 text-white border-teal-800 text-[10px]">
                ✓ NABL Accredited · ISO 15189
              </Badge>
            )}
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
      <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 p-5 border-b ${withBackground ? "bg-teal-50/40" : "bg-muted/30"}`}>
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
      <div className={`p-5 border-t flex items-start justify-between gap-3 ${withBackground ? "bg-gradient-to-r from-teal-50 to-emerald-50" : ""}`}>
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

      {/* Bottom branded strip */}
      {withBackground && (
        <div className="h-2 bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-600" />
      )}
    </div>
  );
}

// ===== Invoice Sample with editable header =====
export function InvoiceSampleView() {
  const { toast } = useToast();
  const [headerEditable, setHeaderEditable] = useState(true);

  return (
    <SectionCard
      title="Sample Invoice (Editable Header)"
      description="Toggle header editing to edit logo text, lab name, address, GST — same header used across all invoices"
      actions={
        <div className="flex items-center gap-2">
          <Label className="text-xs flex items-center gap-1.5">
            <Switch checked={headerEditable} onCheckedChange={setHeaderEditable} /> Edit Header
          </Label>
          <Button size="sm" variant="outline" onClick={() => toast({ title: "Invoice PDF Generated", description: "INV-2026-00452.pdf" })}>
            <Printer className="h-3.5 w-3.5" /> Print Invoice
          </Button>
        </div>
      }
    >
      <div className="bg-white rounded-lg border shadow-md overflow-hidden">
        {/* Header — editable */}
        <div className={`flex items-start justify-between p-5 border-b ${headerEditable ? "bg-amber-50/40 border-amber-200" : "bg-gradient-to-r from-teal-50 to-emerald-50"}`}>
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 rounded-lg bg-teal-700 text-white flex items-center justify-center font-bold text-lg">
              {headerEditable ? <Input defaultValue="LN" className="h-9 w-12 text-center text-sm p-1" /> : "LN"}
            </div>
            <div className="space-y-1">
              {headerEditable ? (
                <>
                  <Input defaultValue="LabNexus Central Laboratory" className="h-8 text-base font-bold p-1.5" />
                  <Input defaultValue="Plot 14, MIDC Andheri East, Mumbai 400093" className="h-7 text-xs p-1" />
                  <Input defaultValue="+91-22-4002-8800 • billing@labnexus.in" className="h-7 text-xs p-1" />
                  <div className="flex gap-2">
                    <Input defaultValue="GST: 27AAACL1234M1Z5" className="h-6 text-[10px] font-mono p-1 w-44" />
                    <Input defaultValue="PAN: AAACL1234M" className="h-6 text-[10px] font-mono p-1 w-36" />
                  </div>
                  <Input defaultValue="NABL — MC-1987" className="h-6 text-[10px] p-1 font-medium text-teal-700 w-32" />
                </>
              ) : (
                <>
                  <h2 className="text-lg font-bold tracking-tight">LabNexus Central Laboratory</h2>
                  <p className="text-xs text-muted-foreground">Plot 14, MIDC Andheri East, Mumbai 400093</p>
                  <p className="text-xs text-muted-foreground">+91-22-4002-8800 • billing@labnexus.in</p>
                  <p className="text-[10px] font-mono text-muted-foreground">GST: 27AAACL1234M1Z5 • PAN: AAACL1234M</p>
                  <p className="text-[10px] font-medium text-teal-700">NABL — MC-1987</p>
                </>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Tax Invoice</div>
            <div className="text-xl font-bold tracking-tight">INV-2026-00452</div>
            <div className="text-xs text-muted-foreground mt-1">Date: 2026-09-30</div>
            <div className="text-xs text-muted-foreground">Due: 2026-10-15</div>
          </div>
        </div>

        {/* Bill To / Ship To */}
        <div className="grid grid-cols-2 gap-4 p-5 border-b">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Bill To</div>
            <div className="text-sm font-medium">Ramesh Patil</div>
            <div className="text-xs text-muted-foreground">PAT-00001245</div>
            <div className="text-xs text-muted-foreground">A-204, Sunrise Apartments, Andheri E</div>
            <div className="text-xs text-muted-foreground">Mumbai 400093 · +91 98200 11223</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Collection / Service</div>
            <div className="text-sm font-medium">Home Collection</div>
            <div className="text-xs text-muted-foreground">Order: ORD-20260930-00452</div>
            <div className="text-xs text-muted-foreground">Phlebotomist: Sandeep Kumar (R-N3)</div>
            <div className="text-xs text-muted-foreground">Collected: 2026-09-30 10:32 AM</div>
          </div>
        </div>

        {/* Line items */}
        <table className="w-full text-xs">
          <thead className="bg-muted/40">
            <tr className="text-left border-b">
              <th className="py-2 px-4 font-medium">#</th>
              <th className="py-2 px-4 font-medium">Test / Package</th>
              <th className="py-2 px-4 font-medium">Sample Type</th>
              <th className="py-2 px-4 font-medium">Vial</th>
              <th className="py-2 px-4 font-medium text-right">Qty</th>
              <th className="py-2 px-4 font-medium text-right">MRP</th>
              <th className="py-2 px-4 font-medium text-right">Disc.</th>
              <th className="py-2 px-4 font-medium text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["1", "Complete Blood Count (CBC)", "EDTA Blood", "Vial — K2/K3 EDTA · Purple", "1", "350", "70", "280"],
              ["2", "Lipid Profile", "Serum", "Vial — Clot Activator · Yellow", "1", "800", "160", "640"],
              ["3", "Thyroid Stimulating Hormone (TSH)", "Serum", "Vial — Clot Activator · Yellow", "1", "650", "130", "520"],
              ["4", "Home Collection Charge", "—", "—", "1", "0", "0", "0"],
            ].map((r) => (
              <tr key={r[0]} className="border-b">
                <td className="py-2 px-4">{r[0]}</td>
                <td className="py-2 px-4 font-medium">{r[1]}</td>
                <td className="py-2 px-4 text-muted-foreground">{r[2]}</td>
                <td className="py-2 px-4 text-muted-foreground">{r[3]}</td>
                <td className="py-2 px-4 text-right">{r[4]}</td>
                <td className="py-2 px-4 text-right">₹{r[5]}</td>
                <td className="py-2 px-4 text-right text-rose-600">-₹{r[6]}</td>
                <td className="py-2 px-4 text-right font-medium">₹{r[7]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end p-5">
          <div className="w-72 space-y-1.5 text-xs">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹1,950</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Discount</span><span className="text-rose-600">-₹360</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Collection Charge</span><span>₹0</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">GST (Healthcare — 0%)</span><span>₹0</span></div>
            <Separator className="my-1" />
            <div className="flex justify-between text-base font-bold"><span>Total</span><span>₹1,590</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Paid (Wallet)</span><span className="text-emerald-700 font-medium">₹1,590</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Balance Due</span><span>₹0</span></div>
          </div>
        </div>

        {/* Payment mode */}
        <div className="px-5 pb-5 text-xs">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Payment Mode</div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">Wallet</Badge>
            <span className="text-muted-foreground">Ref: WTRX-08822 · 2026-09-30 10:32 AM</span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t bg-muted/30 text-[10px] text-muted-foreground flex items-center justify-between">
          <div>This is a computer-generated invoice and does not require a signature.</div>
          <div>Thank you for choosing LabNexus!</div>
        </div>
      </div>
    </SectionCard>
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

      <SectionCard title="Sample Diagnostic Report Preview (Branded — Thyrocare-style)" description="Toggle background & header edit switches to see plain vs branded layouts">
        <DiagnosticReportView withBackground />
      </SectionCard>

      <InvoiceSampleView />
    </div>
  );
}
