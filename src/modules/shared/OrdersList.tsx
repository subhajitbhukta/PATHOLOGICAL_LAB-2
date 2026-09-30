"use client";

import { PageHeader, SectionCard, Field, FormGrid, EmptyState } from "@/components/common/Layout";
import { StatusBadge } from "@/components/common/StatusBadge";
import { useAppStore } from "@/lib/store";
import { ORDERS, ORDER_STATUSES } from "@/lib/mock-data";
import {
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Filter,
  Download,
  Plus,
  ClipboardList,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

export function OrdersList({ portal }: { portal: string }) {
  const navigate = useAppStore((s) => s.navigate);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const filtered = ORDERS.filter((o) => {
    if (status !== "all" && o.status !== status) return false;
    if (search && !`${o.id} ${o.patient} ${o.patientId} ${o.doctor} ${o.franchise}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <PageHeader
        title="Orders"
        subtitle="Complete order lifecycle — Draft → Booked → Collected → Processing → Released"
        actions={
          <>
            <Button size="sm" variant="outline"><Download className="h-3.5 w-3.5" /> Export</Button>
            <Button size="sm" onClick={() => navigate(portal === "super-admin" ? "super-admin" : "franchise", portal === "super-admin" ? "sa.book-test" : "fr.book-test")}>
              <Plus className="h-3.5 w-3.5" /> New Order
            </Button>
          </>
        }
      />

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search by Order ID, Patient, Mobile, Doctor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-3.5 w-3.5 mr-1.5" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {ORDER_STATUSES.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Payment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="credit">Credit</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="today">
            <SelectTrigger className="w-full sm:w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Franchise / Channel</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead className="text-center">Tests</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-right">Released</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((o) => (
              <TableRow
                key={o.id}
                className="cursor-pointer hover:bg-accent/40"
                onClick={() => navigate(portal === "super-admin" ? "super-admin" : "franchise", portal === "super-admin" ? "sa.order-detail" : "fr.order-detail")}
              >
                <TableCell className="font-mono text-xs font-medium">{o.id}</TableCell>
                <TableCell>
                  <div className="font-medium">{o.patient}</div>
                  <div className="text-[10px] text-muted-foreground font-mono">{o.patientId}</div>
                </TableCell>
                <TableCell className="text-xs">{o.franchise}</TableCell>
                <TableCell className="text-xs">{o.doctor}</TableCell>
                <TableCell className="text-center text-xs">{o.tests}</TableCell>
                <TableCell className="text-right font-medium">{o.amount}</TableCell>
                <TableCell><StatusBadge status={o.status} /></TableCell>
                <TableCell><StatusBadge status={o.payment} /></TableCell>
                <TableCell className="text-right text-xs font-mono text-muted-foreground">{o.released}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filtered.length === 0 && (
          <EmptyState icon={ClipboardList} title="No orders found" description="Try adjusting filters" />
        )}
      </Card>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Showing {filtered.length} of {ORDERS.length} orders</span>
        <div className="flex items-center gap-1">
          <Button size="sm" variant="outline" disabled>Previous</Button>
          <Button size="sm" variant="outline">Next</Button>
        </div>
      </div>
    </div>
  );
}
