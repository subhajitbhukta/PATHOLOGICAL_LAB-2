"use client";

import { KpiCard } from "@/components/common/KpiCard";
import { PageHeader, SectionCard, FormGrid, Field } from "@/components/common/Layout";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Timeline } from "@/components/common/Timeline";
import { useAppStore } from "@/lib/store";
import { ORDERS, SAMPLE_TIMELINE, DIAGNOSTIC_REPORT } from "@/lib/mock-data";
import { DiagnosticReportView, InvoiceSampleView } from "@/modules/shared/ReportGenerator";
import { SimpleBookTest } from "@/modules/patient/SimpleBookTest";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  ShoppingCart, FileText, Calendar, Users, IndianRupee, Plus,
  ChevronRight, Download, Share2, Mail, QrCode, UserPlus,
} from "lucide-react";

function PatientDashboard() {
  const navigate = useAppStore((s) => s.navigate);
  return (
    <div className="space-y-5">
      <PageHeader
        title="Patient Dashboard"
        subtitle="Welcome back, Ramesh Patil — PAT-00001245"
        actions={
          <Button size="sm" onClick={() => navigate("patient", "pt.book-test")}>
            <Plus className="h-3.5 w-3.5" /> Book New Test
          </Button>
        }
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <KpiCard label="Total Orders" value="8" icon={ShoppingCart} />
        <KpiCard label="Reports Available" value="6" icon={FileText} />
        <KpiCard label="Upcoming Collection" value="1" icon={Calendar} />
        <KpiCard label="Family Members" value="3" icon={Users} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard title="Upcoming Collection" className="lg:col-span-2">
          <div className="rounded-lg border p-4 bg-gradient-to-br from-teal-50 to-emerald-50">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs uppercase text-muted-foreground tracking-wider">Next Collection</div>
                <div className="text-lg font-semibold mt-1">Full Body Checkup — Advanced</div>
                <div className="text-sm text-muted-foreground mt-0.5">Tomorrow, 06:00 – 08:00 AM</div>
                <div className="text-xs text-muted-foreground mt-2">Phlebotomist: Sandeep Kumar (R-N3) • Andheri East</div>
              </div>
              <Badge className="bg-amber-100 text-amber-800 border-amber-200">Fasting required</Badge>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <Button size="sm" variant="outline">Reschedule</Button>
              <Button size="sm" variant="outline">Cancel</Button>
              <Button size="sm" variant="ghost">View Details</Button>
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Quick Actions">
          <div className="space-y-2">
            <Button size="sm" variant="outline" className="w-full justify-start" onClick={() => navigate("patient", "pt.book-test")}>
              <Plus className="h-3.5 w-3.5" /> Book Test
            </Button>
            <Button size="sm" variant="outline" className="w-full justify-start" onClick={() => navigate("patient", "pt.reports")}>
              <FileText className="h-3.5 w-3.5" /> My Reports
            </Button>
            <Button size="sm" variant="outline" className="w-full justify-start" onClick={() => navigate("patient", "pt.family")}>
              <UserPlus className="h-3.5 w-3.5" /> Add Family Member
            </Button>
            <Button size="sm" variant="outline" className="w-full justify-start" onClick={() => navigate("patient", "pt.appointments")}>
              <Calendar className="h-3.5 w-3.5" /> Appointments
            </Button>
            <Button size="sm" variant="outline" className="w-full justify-start" onClick={() => navigate("patient", "pt.invoices")}>
              <IndianRupee className="h-3.5 w-3.5" /> Invoices
            </Button>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Recent Orders" actions={<Button size="sm" variant="ghost" onClick={() => navigate("patient", "pt.orders")}>View All <ChevronRight className="h-3 w-3" /></Button>}>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Tests</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Released</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ORDERS.slice(0, 6).map((o) => (
                <TableRow key={o.id} className="cursor-pointer hover:bg-accent/40">
                  <TableCell className="font-mono text-xs">{o.id}</TableCell>
                  <TableCell className="text-xs">{o.tests} investigations</TableCell>
                  <TableCell className="text-right text-xs font-medium">{o.amount}</TableCell>
                  <TableCell><StatusBadge status={o.status} /></TableCell>
                  <TableCell className="text-xs font-mono">{o.released}</TableCell>
                  <TableCell>
                    {o.status === "Released" && <Button size="sm" variant="ghost" onClick={() => navigate("patient", "pt.reports")}>View Report</Button>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </SectionCard>
    </div>
  );
}

function PatientOrders() {
  return (
    <div className="space-y-4">
      <PageHeader title="My Orders" subtitle="All your test bookings" />
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Tests</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Released</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ORDERS.map((o) => (
              <TableRow key={o.id}>
                <TableCell className="font-mono text-xs">{o.id}</TableCell>
                <TableCell className="text-xs">{o.tests} investigations</TableCell>
                <TableCell className="text-xs">2026-09-30</TableCell>
                <TableCell className="text-right text-xs font-medium">{o.amount}</TableCell>
                <TableCell><StatusBadge status={o.status} /></TableCell>
                <TableCell className="text-xs font-mono">{o.released}</TableCell>
                <TableCell><Button size="sm" variant="ghost">View</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

function PatientReports() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="My Reports"
        subtitle="Download, share, or verify your diagnostic reports"
        actions={<Button size="sm" variant="outline"><Mail className="h-3.5 w-3.5" /> Email All</Button>}
      />
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report ID</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Tests</TableHead>
              <TableHead>Reported</TableHead>
              <TableHead>Pathologist</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ORDERS.filter((o) => o.status === "Released").slice(0, 8).map((o, i) => (
              <TableRow key={o.id}>
                <TableCell className="font-mono text-xs">RPT-2026-028{841 + i}</TableCell>
                <TableCell className="font-mono text-xs">{o.id}</TableCell>
                <TableCell className="text-xs">{o.tests} investigations</TableCell>
                <TableCell className="text-xs">{o.released}</TableCell>
                <TableCell className="text-xs">Dr. Anjali Mehta</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button size="sm" variant="ghost"><Download className="h-3.5 w-3.5" /></Button>
                    <Button size="sm" variant="ghost"><Share2 className="h-3.5 w-3.5" /></Button>
                    <Button size="sm" variant="ghost"><QrCode className="h-3.5 w-3.5" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <SectionCard
        title="Latest Report — LabNexus Branded (Thyrocare-style)"
        description="All patient reports are generated with the branded header and background for authenticity"
        actions={
          <>
            <Button size="sm" variant="outline"><Download className="h-3.5 w-3.5" /> Download PDF</Button>
            <Button size="sm" variant="outline"><Share2 className="h-3.5 w-3.5" /> Share</Button>
            <Button size="sm" variant="outline"><Mail className="h-3.5 w-3.5" /> Email</Button>
          </>
        }
      >
        <DiagnosticReportView withBackground headerEditable={false} />
      </SectionCard>
    </div>
  );
}

function PatientFamily() {
  return (
    <div className="space-y-4">
      <PageHeader title="Family Members" subtitle="Book tests for family members"
        actions={<Button size="sm"><Plus className="h-3.5 w-3.5" /> Add Member</Button>} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {[
          { name: "Sunita Patil", rel: "Spouse", age: 39, mobile: "+91 98200 22001", orders: 6 },
          { name: "Aarav Patil", rel: "Son", age: 12, mobile: "—", orders: 2 },
          { name: "Diya Patil", rel: "Daughter", age: 8, mobile: "—", orders: 3 },
        ].map((m) => (
          <Card key={m.name} className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center font-semibold">
                {m.name.split(" ").map((w) => w[0]).join("")}
              </div>
              <div>
                <div className="font-medium">{m.name}</div>
                <div className="text-xs text-muted-foreground">{m.rel} • {m.age}y</div>
                <div className="text-xs text-muted-foreground">{m.mobile}</div>
              </div>
            </div>
            <Separator className="my-3" />
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{m.orders} past orders</span>
              <Button size="sm" variant="outline">Book Test</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

import { Separator } from "@/components/ui/separator";

function PatientInvoices() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="My Invoices"
        subtitle="All your past invoices — click to download or share"
        actions={<Button size="sm" variant="outline"><Mail className="h-3.5 w-3.5" /> Email All</Button>}
      />
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              ["INV-2026-00452", "ORD-20260930-00452", "2026-09-30", "₹1,850", "Wallet", "Paid"],
              ["INV-2026-00451", "ORD-20260929-00441", "2026-09-29", "₹3,499", "UPI", "Paid"],
              ["INV-2026-00450", "ORD-20260928-00432", "2026-09-28", "₹1,100", "Card", "Paid"],
              ["INV-2026-00449", "ORD-20260927-00421", "2026-09-27", "₹2,299", "UPI", "Paid"],
              ["INV-2026-00448", "ORD-20260926-00412", "2026-09-26", "₹999", "Cash", "Paid"],
            ].map((r) => (
              <TableRow key={r[0]}>
                <TableCell className="font-mono text-xs">{r[0]}</TableCell>
                <TableCell className="font-mono text-xs">{r[1]}</TableCell>
                <TableCell className="text-xs font-mono">{r[2]}</TableCell>
                <TableCell className="text-right text-xs font-medium">{r[3]}</TableCell>
                <TableCell><Badge variant="secondary" className="text-xs">{r[4]}</Badge></TableCell>
                <TableCell><StatusBadge status={r[5]} /></TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button size="sm" variant="ghost"><Download className="h-3.5 w-3.5" /></Button>
                    <Button size="sm" variant="ghost"><Share2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <SectionCard
        title="Sample Invoice Preview"
        description="The invoice below is editable — toggle Edit Header to change logo, lab name, GST etc."
      >
        <InvoiceSampleView />
      </SectionCard>
    </div>
  );
}

function ComingSoon({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <FileText className="h-10 w-10 text-muted-foreground/40 mb-3" />
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-sm text-muted-foreground mt-1">Patient portal module</p>
    </div>
  );
}

export function PatientRouter({ page }: { page: string }) {
  switch (page) {
    case "pt.dashboard":
      return <PatientDashboard />;
    case "pt.book-test":
      return <SimpleBookTest />;
    case "pt.orders":
      return <PatientOrders />;
    case "pt.reports":
      return <PatientReports />;
    case "pt.family":
      return <PatientFamily />;
    case "pt.appointments":
      return <ComingSoon name="Appointments" />;
    case "pt.invoices":
      return <PatientInvoices />;
    case "pt.profile":
      return <ComingSoon name="Profile" />;
    case "pt.support":
      return <ComingSoon name="Support" />;
    default:
      return <ComingSoon name={page} />;
  }
}
