"use client";

import { PageHeader, SectionCard, FormGrid, Field, EmptyState } from "@/components/common/Layout";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Search, Download, Plus, Users, UserPlus } from "lucide-react";

const PATIENTS = [
  { id: "PAT-00001245", name: "Ramesh Patil", age: 42, sex: "M", mobile: "+91 98200 11223", city: "Mumbai", orders: 8, lastVisit: "Today", status: "Active" },
  { id: "PAT-00001246", name: "Anita Desai", age: 47, sex: "F", mobile: "+91 98200 44556", city: "Mumbai", orders: 12, lastVisit: "Today", status: "Active" },
  { id: "PAT-00001247", name: "Mohammed Khan", age: 35, sex: "M", mobile: "+91 98200 77889", city: "Mumbai", orders: 3, lastVisit: "Today", status: "Active" },
  { id: "PAT-00001248", name: "Sunita Rao", age: 42, sex: "F", mobile: "+91 98200 99001", city: "Mumbai", orders: 6, lastVisit: "Today", status: "Active" },
  { id: "PAT-00001249", name: "Vijay Mehta", age: 55, sex: "M", mobile: "+91 98200 22334", city: "Mumbai", orders: 14, lastVisit: "Today", status: "Active" },
  { id: "PAT-00001250", name: "Priya Singh", age: 29, sex: "F", mobile: "+91 98200 55667", city: "Pune", orders: 2, lastVisit: "Today", status: "Active" },
  { id: "PAT-00001251", name: "Arjun Nair", age: 38, sex: "M", mobile: "+91 98200 88990", city: "Mumbai", orders: 5, lastVisit: "Yesterday", status: "Active" },
  { id: "PAT-00001252", name: "Kavya Reddy", age: 31, sex: "F", mobile: "+91 98200 11223", city: "Mumbai", orders: 1, lastVisit: "Today", status: "New" },
  { id: "PAT-00001253", name: "Rohit Joshi", age: 44, sex: "M", mobile: "+91 98200 44556", city: "Thane", orders: 4, lastVisit: "Today", status: "Active" },
  { id: "PAT-00001254", name: "Meera Iyer", age: 33, sex: "F", mobile: "+91 98200 77889", city: "Mumbai", orders: 7, lastVisit: "Today", status: "Active" },
  { id: "PAT-00001255", name: "Suresh Pillai", age: 55, sex: "M", mobile: "+91 98200 99001", city: "Mumbai", orders: 11, lastVisit: "Today", status: "Active" },
  { id: "PAT-00001256", name: "Lakshmi Menon", age: 48, sex: "F", mobile: "+91 98200 22334", city: "Pune", orders: 9, lastVisit: "Yesterday", status: "Active" },
];

export function PatientsList() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Patients"
        subtitle="All registered patients across the network"
        actions={
          <>
            <Button size="sm" variant="outline"><Download className="h-3.5 w-3.5" /> Export</Button>
            <Button size="sm"><UserPlus className="h-3.5 w-3.5" /> New Patient</Button>
          </>
        }
      />
      <Card className="p-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input placeholder="Search by Patient ID / Mobile / Name..." className="pl-8" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              <SelectItem value="mumbai">Mumbai</SelectItem>
              <SelectItem value="pune">Pune</SelectItem>
              <SelectItem value="thane">Thane</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="repeat">Repeat</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Age/Sex</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>City</TableHead>
              <TableHead className="text-center">Orders</TableHead>
              <TableHead>Last Visit</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PATIENTS.map((p) => (
              <TableRow key={p.id} className="cursor-pointer hover:bg-accent/40">
                <TableCell className="font-mono text-xs">{p.id}</TableCell>
                <TableCell className="font-medium text-sm">{p.name}</TableCell>
                <TableCell className="text-xs">{p.age}/{p.sex}</TableCell>
                <TableCell className="text-xs">{p.mobile}</TableCell>
                <TableCell className="text-xs">{p.city}</TableCell>
                <TableCell className="text-center text-xs font-medium">{p.orders}</TableCell>
                <TableCell className="text-xs">{p.lastVisit}</TableCell>
                <TableCell><StatusBadge status={p.status} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export function PatientRegistration() {
  return (
    <div className="space-y-4">
      <PageHeader title="Patient Registration" subtitle="Register a new patient in the system" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard title="Patient Information" className="lg:col-span-2">
          <FormGrid cols={3}>
            <Field label="Patient ID" hint="Auto-generated"><Input defaultValue="PAT-00001257" readOnly /></Field>
            <Field label="Full Name" required><Input placeholder="Patient name" /></Field>
            <Field label="Date of Birth" required><Input type="date" /></Field>
            <Field label="Age" required><Input type="number" placeholder="Years" /></Field>
            <Field label="Gender" required>
              <Select><SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem><SelectItem value="other">Other</SelectItem></SelectContent>
              </Select>
            </Field>
            <Field label="Blood Group">
              <Select><SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
            <Field label="Mobile" required><Input placeholder="+91" /></Field>
            <Field label="Alternate Mobile"><Input placeholder="+91" /></Field>
            <Field label="Email"><Input type="email" /></Field>
            <Field label="ID Proof Type">
              <Select><SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="aadhaar">Aadhaar</SelectItem><SelectItem value="pan">PAN</SelectItem><SelectItem value="passport">Passport</SelectItem></SelectContent>
              </Select>
            </Field>
            <Field label="ID Number"><Input /></Field>
            <Field label="Emergency Contact"><Input placeholder="+91" /></Field>
            <Field label="Address" className="sm:col-span-2 lg:col-span-3"><Textarea rows={2} /></Field>
            <Field label="Pincode"><Input /></Field>
            <Field label="City"><Input /></Field>
            <Field label="State"><Input /></Field>
          </FormGrid>
          <h4 className="text-sm font-medium mt-4 mb-3">Referral & Medical</h4>
          <FormGrid cols={3}>
            <Field label="Referring Doctor"><Input placeholder="Dr. Sharma" /></Field>
            <Field label="Hospital"><Input /></Field>
            <Field label="Corporate"><Input /></Field>
            <Field label="Existing Conditions"><Input /></Field>
            <Field label="Allergies"><Input /></Field>
            <Field label="Current Medication"><Input /></Field>
            <Field label="Patient Notes" className="sm:col-span-2 lg:col-span-3"><Textarea rows={2} /></Field>
          </FormGrid>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" size="sm">Reset</Button>
            <Button size="sm"><Plus className="h-3.5 w-3.5" /> Register Patient</Button>
          </div>
        </SectionCard>
        <SectionCard title="Recent Registrations" className="lg:col-span-1">
          <div className="space-y-2">
            {PATIENTS.slice(0, 6).map((p) => (
              <div key={p.id} className="rounded-md border p-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{p.name}</span>
                  <span className="text-muted-foreground font-mono">{p.id}</span>
                </div>
                <div className="text-muted-foreground mt-0.5">{p.age}/{p.sex} • {p.mobile}</div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
