"use client";

import { PageHeader, SectionCard, FormGrid, Field, EmptyState } from "@/components/common/Layout";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { DOCTORS, CORPORATES, HEALTH_CAMPS, NOTIFICATIONS, SUPPORT_TICKETS } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";
import {
  Plus, Search, Download, Stethoscope, Building2, Tent, BellRing, Headset,
  MessageSquare, Phone, Mail, Smartphone, AlertTriangle, Settings, ShieldCheck, User,
} from "lucide-react";

export function DoctorsList() {
  return (
    <div className="space-y-4">
      <PageHeader title="Doctors" subtitle="Referring doctors portal & directory"
        actions={<Button size="sm"><Plus className="h-3.5 w-3.5" /> Add Doctor</Button>} />
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Doctor ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead>Reg No</TableHead>
              <TableHead>Hospital</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead className="text-center">Patients</TableHead>
              <TableHead className="text-center">Reports</TableHead>
              <TableHead className="text-center">Pending</TableHead>
              <TableHead className="text-center">Critical</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DOCTORS.map((d) => (
              <TableRow key={d.id} className="cursor-pointer hover:bg-accent/40">
                <TableCell className="font-mono text-xs">{d.id}</TableCell>
                <TableCell className="text-sm font-medium">{d.name}</TableCell>
                <TableCell className="text-xs">{d.spec}</TableCell>
                <TableCell className="font-mono text-xs">{d.reg}</TableCell>
                <TableCell className="text-xs">{d.hospital}</TableCell>
                <TableCell className="text-xs">{d.mobile}</TableCell>
                <TableCell className="text-center text-xs">{d.patients}</TableCell>
                <TableCell className="text-center text-xs">{d.reports}</TableCell>
                <TableCell className="text-center text-xs">{d.pending}</TableCell>
                <TableCell className="text-center">
                  {d.critical > 0 ? <Badge className="bg-rose-100 text-rose-700 border-rose-200 text-xs">{d.critical}</Badge> : <span className="text-muted-foreground text-xs">0</span>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export function CorporateList() {
  return (
    <div className="space-y-4">
      <PageHeader title="Corporate" subtitle="Corporate contracts — employees, packages, billing"
        actions={<Button size="sm"><Plus className="h-3.5 w-3.5" /> Add Corporate</Button>} />
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="text-center">Employees</TableHead>
              <TableHead>Contract Period</TableHead>
              <TableHead>Package</TableHead>
              <TableHead className="text-right">Rate</TableHead>
              <TableHead className="text-center">Orders</TableHead>
              <TableHead className="text-right">Billed</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {CORPORATES.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-mono text-xs">{c.id}</TableCell>
                <TableCell className="text-sm font-medium">{c.name}</TableCell>
                <TableCell className="text-center text-xs">{c.employees.toLocaleString()}</TableCell>
                <TableCell className="text-xs font-mono">{c.contractFrom} → {c.contractTo}</TableCell>
                <TableCell><Badge variant="secondary" className="text-xs">{c.package}</Badge></TableCell>
                <TableCell className="text-right text-xs">₹{c.rate}</TableCell>
                <TableCell className="text-center text-xs">{c.orders}</TableCell>
                <TableCell className="text-right text-xs font-medium">{c.billed}</TableCell>
                <TableCell><StatusBadge status={c.status} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export function HealthCamps() {
  return (
    <div className="space-y-4">
      <PageHeader title="Health Camps" subtitle="Camp lifecycle — create → organize → register → collect → process → report → billing"
        actions={<Button size="sm"><Plus className="h-3.5 w-3.5" /> New Camp</Button>} />
      <SectionCard title="New Camp">
        <FormGrid cols={3}>
          <Field label="Camp Name" required><Input placeholder="TCS Diwali Camp" /></Field>
          <Field label="Location" required><Input placeholder="TCS Andheri" /></Field>
          <Field label="Organizer"><Input placeholder="Tata Consultancy" /></Field>
          <Field label="Date" required><Input type="date" /></Field>
          <Field label="Package" required>
            <Select><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="fbp-a">Full Body Checkup — Advanced</SelectItem>
                <SelectItem value="fbp-s">Full Body Checkup — Standard</SelectItem>
                <SelectItem value="dia-s">Diabetes Screen</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Rate" required><Input type="number" /></Field>
          <Field label="Expected Patients"><Input type="number" /></Field>
          <Field label="Collection Staff"><Input placeholder="6 phlebotomists" /></Field>
          <Field label="Barcode Allocation"><Input placeholder="280 barcodes" /></Field>
        </FormGrid>
      </SectionCard>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Camp ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Organizer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Package</TableHead>
              <TableHead className="text-right">Rate</TableHead>
              <TableHead className="text-center">Expected</TableHead>
              <TableHead className="text-center">Collected</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {HEALTH_CAMPS.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-mono text-xs">{c.id}</TableCell>
                <TableCell className="text-sm font-medium">{c.name}</TableCell>
                <TableCell className="text-xs">{c.location}</TableCell>
                <TableCell className="text-xs">{c.organizer}</TableCell>
                <TableCell className="font-mono text-xs">{c.date}</TableCell>
                <TableCell><Badge variant="secondary" className="text-xs">{c.package}</Badge></TableCell>
                <TableCell className="text-right text-xs">₹{c.rate}</TableCell>
                <TableCell className="text-center text-xs">{c.expected}</TableCell>
                <TableCell className="text-center text-xs">{c.collected}</TableCell>
                <TableCell><StatusBadge status={c.status} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export function NotificationsEngine() {
  return (
    <div className="space-y-4">
      <PageHeader title="Notifications Engine" subtitle="Configure events × channels — SMS, Email, WhatsApp, Push"
        actions={<Button size="sm" variant="outline"><BellRing className="h-3.5 w-3.5" /> Test All</Button>} />
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead className="text-center">SMS</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">WhatsApp</TableHead>
              <TableHead className="text-center">Push</TableHead>
              <TableHead className="text-center">Enabled</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {NOTIFICATIONS.map((n) => (
              <TableRow key={n.event}>
                <TableCell className="text-sm font-medium">{n.event}</TableCell>
                <TableCell className="text-center"><Switch defaultChecked={n.sms} /></TableCell>
                <TableCell className="text-center"><Switch defaultChecked={n.email} /></TableCell>
                <TableCell className="text-center"><Switch defaultChecked={n.whatsapp} /></TableCell>
                <TableCell className="text-center"><Switch defaultChecked={n.push} /></TableCell>
                <TableCell className="text-center"><Switch defaultChecked={n.enabled} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <SectionCard title="Reminder Engine" description="Automatic reminders — patient & franchise">
        <FormGrid cols={3}>
          <Field label="Appointment Reminder">
            <Select defaultValue="60"><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="30">30 min before</SelectItem><SelectItem value="60">1 hour before</SelectItem><SelectItem value="120">2 hours before</SelectItem></SelectContent>
            </Select>
          </Field>
          <Field label="Fasting Reminder">
            <Select defaultValue="720"><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="480">8 hours before</SelectItem><SelectItem value="720">12 hours before</SelectItem></SelectContent>
            </Select>
          </Field>
          <Field label="Report Ready">
            <Select defaultValue="0"><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="0">Immediately</SelectItem><SelectItem value="15">15 min after</SelectItem></SelectContent>
            </Select>
          </Field>
          <Field label="Wallet Low Threshold"><Input type="number" defaultValue={1000} /></Field>
          <Field label="Payment Due Reminder">
            <Select defaultValue="1"><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="1">1 day after</SelectItem><SelectItem value="3">3 days after</SelectItem><SelectItem value="7">7 days after</SelectItem></SelectContent>
            </Select>
          </Field>
          <Field label="TAT Approaching">
            <Select defaultValue="80"><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="50">50% TAT</SelectItem><SelectItem value="80">80% TAT</SelectItem><SelectItem value="100">100% TAT</SelectItem></SelectContent>
            </Select>
          </Field>
        </FormGrid>
      </SectionCard>
    </div>
  );
}

export function SupportCenter() {
  return (
    <div className="space-y-4">
      <PageHeader title="Support" subtitle="Customer & franchise support tickets"
        actions={<Button size="sm"><Plus className="h-3.5 w-3.5" /> New Ticket</Button>} />
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: "Open", value: "8", color: "text-amber-600" },
          { label: "In Progress", value: "3", color: "text-cyan-600" },
          { label: "Resolved", value: "24", color: "text-emerald-600" },
          { label: "Closed", value: "18", color: "text-muted-foreground" },
          { label: "Critical", value: "2", color: "text-rose-600" },
        ].map((s) => (
          <Card key={s.label} className="p-3">
            <div className="text-[10px] uppercase text-muted-foreground tracking-wider">{s.label}</div>
            <div className={`text-2xl font-semibold mt-1 ${s.color}`}>{s.value}</div>
          </Card>
        ))}
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticket ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Requester</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {SUPPORT_TICKETS.map((t) => (
              <TableRow key={t.id} className="cursor-pointer hover:bg-accent/40">
                <TableCell className="font-mono text-xs">{t.id}</TableCell>
                <TableCell><Badge variant="outline" className="text-xs">{t.type}</Badge></TableCell>
                <TableCell className="text-xs">{t.subject}</TableCell>
                <TableCell className="text-xs">{t.requester}</TableCell>
                <TableCell><StatusBadge status={t.priority} /></TableCell>
                <TableCell><StatusBadge status={t.status} /></TableCell>
                <TableCell className="text-xs">{t.assigned}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{t.created}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export function SystemSettings() {
  return (
    <div className="space-y-4">
      <PageHeader title="System Settings" subtitle="Users, roles, permissions, organisation profile" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard title="Organization Profile">
          <FormGrid cols={2}>
            <Field label="Lab Name"><Input defaultValue="LabNexus Central Laboratory" /></Field>
            <Field label="NABL Acc. No"><Input defaultValue="MC-1987" /></Field>
            <Field label="Address" className="sm:col-span-2"><Textarea rows={2} defaultValue="Plot 14, MIDC Andheri East, Mumbai 400093" /></Field>
            <Field label="Phone"><Input defaultValue="+91-22-4002-8800" /></Field>
            <Field label="Email"><Input defaultValue="reports@labnexus.in" /></Field>
            <Field label="GST"><Input defaultValue="27AAACL1234M1Z5" /></Field>
            <Field label="PAN"><Input defaultValue="AAACL1234M" /></Field>
          </FormGrid>
        </SectionCard>
        <SectionCard title="Roles & Permissions (RBAC)">
          <div className="space-y-2">
            {[
              "Super Admin",
              "Front Office / Reception",
              "Collection Executive / Phlebotomist",
              "Lab Technician",
              "Pathologist",
              "Logistics Manager",
              "Logistics Partner",
              "Franchise",
              "Sub-Franchise",
              "B2B Customer",
              "B2C Patient",
              "Finance",
              "Inventory Manager",
              "Customer Support",
            ].map((r) => (
              <div key={r} className="flex items-center justify-between p-2 rounded-md border">
                <span className="text-sm">{r}</span>
                <div className="flex items-center gap-2 text-xs">
                  <Badge variant="secondary" className="text-xs">View</Badge>
                  <Badge variant="secondary" className="text-xs">Edit</Badge>
                  <Badge variant="secondary" className="text-xs">Approve</Badge>
                  <Button size="sm" variant="ghost">Edit</Button>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
      <SectionCard title="Users">
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                ["USR-0001", "Aditya Verma", "Super Admin", "LabNexus", "10 min ago", "Active"],
                ["USR-0241", "Reena Front Office", "Front Office", "Central Lab — Mumbai", "2 min ago", "Active"],
                ["USR-0242", "Rajesh Shah", "Franchise", "Andheri Health Hub", "5 min ago", "Active"],
                ["USR-0243", "Phlebotomist R-42", "Collection Executive", "Andheri Hub", "1 hr ago", "Active"],
                ["USR-0244", "Tech T-08", "Lab Technician", "Hematology Dept", "3 min ago", "Active"],
                ["USR-0245", "Dr. Anjali Mehta", "Pathologist", "LabNexus", "12 min ago", "Active"],
                ["USR-0246", "Rider R-N3", "Logistics Partner", "Andheri Hub", "2 min ago", "Active"],
                ["USR-0247", "Sandeep Kumar", "Driver", "Andheri Hub", "1 min ago", "Active"],
              ].map((r) => (
                <TableRow key={r[0]}>
                  <TableCell className="font-mono text-xs">{r[0]}</TableCell>
                  <TableCell className="text-sm font-medium">{r[1]}</TableCell>
                  <TableCell className="text-xs">{r[2]}</TableCell>
                  <TableCell className="text-xs">{r[3]}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{r[4]}</TableCell>
                  <TableCell><StatusBadge status={r[5]} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </SectionCard>
    </div>
  );
}
