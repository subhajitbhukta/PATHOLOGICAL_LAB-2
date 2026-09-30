"use client";

import { useState } from "react";
import { PageHeader, SectionCard, FormGrid, Field } from "@/components/common/Layout";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useToast } from "@/hooks/use-toast";
import { DIAGNOSTIC_REPORT } from "@/lib/mock-data";
import {
  Search, FileText, Download, Printer, QrCode, Eye, FileBarChart,
  Building2, User, CheckCircle2, Clock, AlertTriangle, Receipt,
} from "lucide-react";

// Patient list with report generation status
const PATIENT_REPORT_LIST = [
  { id: "PAT-00001245", name: "Ramesh Patil", age: 42, sex: "M", mobile: "+91 98200 11223", tests: "CBC, LIP, TSH", reportId: "RPT-2026-028841", status: "Released", releasedAt: "2026-09-30 05:45 PM", pathologist: "Dr. Anjali Mehta" },
  { id: "PAT-00001246", name: "Anita Desai", age: 47, sex: "F", mobile: "+91 98200 44556", tests: "CBC, LIP, TSH, VITD, HBA1", reportId: "RPT-2026-028842", status: "Released", releasedAt: "2026-09-30 05:32 PM", pathologist: "Dr. Anjali Mehta" },
  { id: "PAT-00001247", name: "Mohammed Khan", age: 35, sex: "M", mobile: "+91 98200 77889", tests: "CBC, GLU", reportId: "RPT-2026-028843", status: "Released", releasedAt: "2026-09-30 04:50 PM", pathologist: "Dr. Anjali Mehta" },
  { id: "PAT-00001248", name: "Sunita Rao", age: 42, sex: "F", mobile: "+91 98200 99001", tests: "VITD, GLU, LFT, KFT", reportId: "RPT-2026-028844", status: "Pathologist Review", releasedAt: "—", pathologist: "Dr. Anjali Mehta" },
  { id: "PAT-00001249", name: "Vijay Mehta", age: 55, sex: "M", mobile: "+91 98200 22334", tests: "CBC", reportId: "—", status: "Processing", releasedAt: "—", pathologist: "—" },
  { id: "PAT-00001250", name: "Priya Singh", age: 29, sex: "F", mobile: "+91 98200 55667", tests: "TSH, T3, T4", reportId: "—", status: "Collected", releasedAt: "—", pathologist: "—" },
  { id: "PAT-00001251", name: "Arjun Nair", age: 38, sex: "M", mobile: "+91 98200 88990", tests: "TSH, LFT, KFT, HBA1", reportId: "RPT-2026-028845", status: "Released", releasedAt: "2026-09-30 04:30 PM", pathologist: "Dr. Anjali Mehta" },
  { id: "PAT-00001252", name: "Kavya Reddy", age: 31, sex: "F", mobile: "+91 98200 11223", tests: "CBC, LIP, GLU", reportId: "—", status: "Booked", releasedAt: "—", pathologist: "—" },
  { id: "PAT-00001253", name: "Rohit Joshi", age: 44, sex: "M", mobile: "+91 98200 44556", tests: "CBC, TROP", reportId: "—", status: "Rejected", releasedAt: "—", pathologist: "—" },
  { id: "PAT-00001254", name: "Meera Iyer", age: 33, sex: "F", mobile: "+91 98200 77889", tests: "CBC, LFT, KFT, TSH, URINE", reportId: "RPT-2026-028846", status: "Released", releasedAt: "2026-09-30 03:45 PM", pathologist: "Dr. Anjali Mehta" },
  { id: "PAT-00001255", name: "Suresh Pillai", age: 55, sex: "M", mobile: "+91 98200 99001", tests: "CBC, PSA, LIP, GLU", reportId: "RPT-2026-028847", status: "Critical Pending", releasedAt: "—", pathologist: "Dr. Anjali Mehta" },
  { id: "PAT-00001256", name: "Lakshmi Menon", age: 48, sex: "F", mobile: "+91 98200 22334", tests: "CBC, TSH, HBA1", reportId: "—", status: "Cancelled", releasedAt: "—", pathologist: "—" },
];

export function EasyReportGenerator() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedPatient, setSelectedPatient] = useState(PATIENT_REPORT_LIST[0]);
  const [withBackground, setWithBackground] = useState(true);
  const [withHeader, setWithHeader] = useState(true);
  const [showInvoice, setShowInvoice] = useState(false);

  const filtered = PATIENT_REPORT_LIST.filter((p) => {
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    if (search && !`${p.id} ${p.name} ${p.mobile} ${p.tests} ${p.reportId}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const isReportReady = (s: string) => s === "Released";
  const totalPatients = PATIENT_REPORT_LIST.length;
  const totalReleased = PATIENT_REPORT_LIST.filter((p) => p.status === "Released").length;
  const totalPending = PATIENT_REPORT_LIST.filter((p) => ["Processing", "Pathologist Review", "Collected", "Booked", "Critical Pending"].includes(p.status)).length;
  const totalCritical = PATIENT_REPORT_LIST.filter((p) => p.status === "Critical Pending").length;

  return (
    <div className="space-y-4">
      <PageHeader
        title="Easy Report Generator"
        subtitle="One-click PDF report generation per patient — choose With Header (Thyrocare-style branded) or Without Header (plain)"
        actions={
          <>
            <Button size="sm" variant="outline" onClick={() => setShowInvoice((v) => !v)}>
              <Receipt className="h-3.5 w-3.5" /> {showInvoice ? "Hide" : "Show"} Sample Invoice
            </Button>
            <Button size="sm" onClick={() => toast({ title: "Bulk PDF Generated", description: `${totalReleased} reports downloaded as ZIP` })}>
              <Download className="h-3.5 w-3.5" /> Bulk Download Released
            </Button>
          </>
        }
      />

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Patients", value: totalPatients, icon: User, color: "text-foreground" },
          { label: "Reports Released", value: totalReleased, icon: CheckCircle2, color: "text-emerald-600" },
          { label: "In Progress", value: totalPending, icon: Clock, color: "text-amber-600" },
          { label: "Critical Pending", value: totalCritical, icon: AlertTriangle, color: "text-rose-600" },
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

      {/* Patient table */}
      <SectionCard
        title="Patient Report List"
        description="Click a patient row to preview their report. With-Header / Without-Header buttons appear next to ready reports."
      >
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-2 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search by Patient ID / Name / Mobile / Test / Report ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Released">Released</SelectItem>
              <SelectItem value="Pathologist Review">Pathologist Review</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Collected">Collected</SelectItem>
              <SelectItem value="Booked">Booked</SelectItem>
              <SelectItem value="Critical Pending">Critical Pending</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Age / Sex</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Tests</TableHead>
                <TableHead>Report ID</TableHead>
                <TableHead>Released At</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow
                  key={p.id}
                  className={`cursor-pointer hover:bg-accent/40 ${selectedPatient.id === p.id ? "bg-accent/30" : ""}`}
                  onClick={() => setSelectedPatient(p)}
                >
                  <TableCell>
                    <div className="font-medium text-sm">{p.name}</div>
                    <div className="text-[10px] text-muted-foreground font-mono">{p.id}</div>
                  </TableCell>
                  <TableCell className="text-xs">{p.age}/{p.sex}</TableCell>
                  <TableCell className="text-xs">{p.mobile}</TableCell>
                  <TableCell className="text-xs">{p.tests}</TableCell>
                  <TableCell className="font-mono text-xs">{p.reportId}</TableCell>
                  <TableCell className="text-xs font-mono text-muted-foreground">{p.releasedAt}</TableCell>
                  <TableCell><StatusBadge status={p.status} /></TableCell>
                  <TableCell className="text-right">
                    {isReportReady(p.status) ? (
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPatient(p);
                            setWithBackground(true);
                            setWithHeader(true);
                            toast({ title: "Generating PDF (With Header)", description: `${p.reportId}.pdf · Thyrocare-style branded` });
                          }}
                          title="PDF with branded header (Thyrocare-style)"
                        >
                          <FileText className="h-3 w-3" /> With Header
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPatient(p);
                            setWithBackground(false);
                            setWithHeader(false);
                            toast({ title: "Generating PDF (Plain)", description: `${p.reportId}.pdf · no header / no background` });
                          }}
                          title="PDF without header (plain)"
                        >
                          <FileBarChart className="h-3 w-3" /> Without Header
                        </Button>
                      </div>
                    ) : (
                      <span className="text-[10px] text-muted-foreground">Report not ready</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        <div className="text-xs text-muted-foreground mt-2">
          Showing {filtered.length} of {PATIENT_REPORT_LIST.length} patients
        </div>
      </SectionCard>

      {/* Live preview options */}
      <SectionCard
        title={`Live Report Preview — ${selectedPatient.name}`}
        description="Toggle the background and header to see the report as it will be generated"
        actions={
          <div className="flex items-center gap-3">
            <Label className="text-xs flex items-center gap-1.5">
              <Switch checked={withBackground} onCheckedChange={setWithBackground} /> Background
            </Label>
            <Label className="text-xs flex items-center gap-1.5">
              <Switch checked={withHeader} onCheckedChange={setWithHeader} /> Header
            </Label>
            <Button
              size="sm"
              variant="outline"
              onClick={() => toast({ title: "PDF Generated", description: `${selectedPatient.reportId}.pdf · ${withBackground ? "Branded" : "Plain"}` })}
            >
              <Printer className="h-3.5 w-3.5" /> Print
            </Button>
            <Button
              size="sm"
              onClick={() => toast({ title: "PDF Downloaded", description: `${selectedPatient.reportId}.pdf` })}
            >
              <Download className="h-3.5 w-3.5" /> Download PDF
            </Button>
          </div>
        }
      >
        <EasyReportPreview withBackground={withBackground} withHeader={withHeader} patient={selectedPatient} />
      </SectionCard>

      {/* Optional invoice preview */}
      {showInvoice && (
        <SectionCard title="Sample Invoice (Editable Header)" description="Same invoice available across all portals">
          <InvoiceInline />
        </SectionCard>
      )}
    </div>
  );
}

// Inline lightweight report preview that respects both toggles
function EasyReportPreview({
  withBackground,
  withHeader,
  patient,
}: {
  withBackground: boolean;
  withHeader: boolean;
  patient: typeof PATIENT_REPORT_LIST[number];
}) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md print-page relative overflow-hidden ${
        withBackground ? "border-2 border-teal-600" : "border"
      }`}
    >
      {withBackground && (
        <>
          <div className="h-2 bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-600" />
          <div
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
            style={{ opacity: 0.04 }}
          >
            <div className="text-[160px] font-black tracking-tighter text-teal-900 -rotate-12">LabNexus</div>
          </div>
          <div className="absolute left-0 top-2 bottom-0 w-1 bg-gradient-to-b from-teal-600 to-emerald-500" />
        </>
      )}

      {/* Header — respects both toggles */}
      {withHeader ? (
        <div className={`relative flex items-start justify-between p-5 border-b ${withBackground ? "bg-gradient-to-r from-teal-50 to-emerald-50" : ""}`}>
          <div className="flex items-center gap-3">
            <div className={`h-12 w-12 rounded-lg flex items-center justify-center font-bold text-lg ${withBackground ? "bg-teal-700 text-white" : "bg-primary text-primary-foreground"}`}>
              LN
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight">{DIAGNOSTIC_REPORT.labName}</h2>
              <p className="text-xs text-muted-foreground">{DIAGNOSTIC_REPORT.labAddress}</p>
              <p className="text-xs text-muted-foreground">{DIAGNOSTIC_REPORT.labPhone} • {DIAGNOSTIC_REPORT.labEmail}</p>
              <p className="text-xs font-medium mt-0.5 text-primary">{DIAGNOSTIC_REPORT.accreditation}</p>
              {withBackground && (
                <Badge className="mt-1.5 bg-teal-700 text-white border-teal-800 text-[10px]">✓ NABL Accredited · ISO 15189</Badge>
              )}
            </div>
          </div>
          <div className="text-right text-xs">
            <div className="font-mono font-semibold text-sm">{patient.reportId !== "—" ? patient.reportId : "RPT-2026-028841"}</div>
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
      ) : (
        // Without header — minimal patient banner
        <div className="px-5 py-3 border-b bg-muted/30 flex items-center justify-between text-xs">
          <div className="font-mono">{patient.reportId !== "—" ? patient.reportId : "RPT-2026-028841"}</div>
          <div className="text-muted-foreground">{DIAGNOSTIC_REPORT.reportedAt}</div>
        </div>
      )}

      {/* Patient info */}
      <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 p-5 border-b ${withBackground ? "bg-teal-50/40" : "bg-muted/30"}`}>
        <Info label="Patient Name" value={patient.name} />
        <Info label="Patient ID" value={patient.id} mono />
        <Info label="Age / Sex" value={`${patient.age} / ${patient.sex === "M" ? "Male" : "Female"}`} />
        <Info label="Mobile" value={patient.mobile} mono />
        <Info label="Tests" value={patient.tests} span2 />
        <Info label="Pathologist" value={patient.pathologist} />
        <Info label="Released At" value={patient.releasedAt} />
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

      {/* Footer — only when header present */}
      {withHeader ? (
        <div className={`p-5 border-t flex items-start justify-between gap-3 ${withBackground ? "bg-gradient-to-r from-teal-50 to-emerald-50" : ""}`}>
          <div className="text-xs space-y-1 max-w-md">
            <div className="font-medium">Report Verification</div>
            <p className="text-muted-foreground">Scan the QR code above or visit labnexus.in/verify/{patient.reportId !== "—" ? patient.reportId : "RPT-2026-028841"} to verify this report.</p>
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
      ) : (
        <div className="px-5 py-2 border-t text-[10px] text-muted-foreground text-center">
          ** End of Report · LabNexus · NABL Accredited · labnexus.in/verify/{patient.reportId !== "—" ? patient.reportId : "RPT-2026-028841"} **
        </div>
      )}

      {withBackground && (
        <div className="h-2 bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-600" />
      )}
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

// Inline invoice (so this page is self-contained)
function InvoiceInline() {
  return (
    <div className="bg-white rounded-lg border shadow-md overflow-hidden">
      <div className="flex items-start justify-between p-5 border-b bg-gradient-to-r from-teal-50 to-emerald-50">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-lg bg-teal-700 text-white flex items-center justify-center font-bold text-lg">LN</div>
          <div>
            <h2 className="text-lg font-bold tracking-tight">LabNexus Central Laboratory</h2>
            <p className="text-xs text-muted-foreground">Plot 14, MIDC Andheri East, Mumbai 400093</p>
            <p className="text-xs text-muted-foreground">+91-22-4002-8800 • billing@labnexus.in</p>
            <p className="text-[10px] font-mono text-muted-foreground">GST: 27AAACL1234M1Z5 • PAN: AAACL1234M</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Tax Invoice</div>
          <div className="text-xl font-bold tracking-tight">INV-2026-00452</div>
          <div className="text-xs text-muted-foreground mt-1">Date: 2026-09-30</div>
        </div>
      </div>
      <table className="w-full text-xs">
        <thead className="bg-muted/40">
          <tr className="text-left border-b">
            <th className="py-2 px-4 font-medium">#</th>
            <th className="py-2 px-4 font-medium">Test</th>
            <th className="py-2 px-4 font-medium text-right">MRP</th>
            <th className="py-2 px-4 font-medium text-right">Disc.</th>
            <th className="py-2 px-4 font-medium text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["1", "Complete Blood Count (CBC)", "350", "70", "280"],
            ["2", "Lipid Profile", "800", "160", "640"],
            ["3", "Thyroid Stimulating Hormone (TSH)", "650", "130", "520"],
          ].map((r) => (
            <tr key={r[0]} className="border-b">
              <td className="py-2 px-4">{r[0]}</td>
              <td className="py-2 px-4 font-medium">{r[1]}</td>
              <td className="py-2 px-4 text-right">₹{r[2]}</td>
              <td className="py-2 px-4 text-right text-rose-600">-₹{r[3]}</td>
              <td className="py-2 px-4 text-right font-medium">₹{r[4]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end p-5">
        <div className="w-72 space-y-1.5 text-xs">
          <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹1,800</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Discount</span><span className="text-rose-600">-₹360</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">GST (0%)</span><span>₹0</span></div>
          <Separator className="my-1" />
          <div className="flex justify-between text-base font-bold"><span>Total</span><span>₹1,440</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Paid (Wallet)</span><span className="text-emerald-700 font-medium">₹1,440</span></div>
        </div>
      </div>
    </div>
  );
}
