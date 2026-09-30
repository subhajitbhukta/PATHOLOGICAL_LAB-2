"use client";

import { PageHeader, SectionCard, FormGrid, Field, EmptyState } from "@/components/common/Layout";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, Legend, Area, AreaChart,
} from "recharts";
import { WALLET_TRANSACTIONS, LEDGER_ROWS, FRANCHISES } from "@/lib/mock-data";
import {
  Plus, Download, Search, IndianRupee, Wallet as WalletIcon, Receipt,
  CreditCard, Landmark, ArrowUpRight, ArrowDownRight,
} from "lucide-react";

export function WalletView() {
  return (
    <div className="space-y-4">
      <PageHeader title="Wallet" subtitle="Wallet ledger — recharge, debit, refund, commission, material purchase"
        actions={<Button size="sm"><Plus className="h-3.5 w-3.5" /> Recharge Wallet</Button>} />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Opening Balance", value: "₹10,000", icon: WalletIcon },
          { label: "Total Recharges", value: "₹20,000", icon: ArrowUpRight, color: "text-emerald-600" },
          { label: "Total Debits", value: "₹5,949", icon: ArrowDownRight, color: "text-rose-600" },
          { label: "Closing Balance", value: "₹27,101", icon: WalletIcon },
        ].map((s) => (
          <Card key={s.label} className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[10px] uppercase text-muted-foreground tracking-wider">{s.label}</div>
                <div className={`text-xl font-semibold mt-1 ${s.color || ""}`}>{s.value}</div>
              </div>
              <s.icon className={`h-4 w-4 ${s.color || "text-muted-foreground/60"}`} />
            </div>
          </Card>
        ))}
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Txn ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Reference</TableHead>
              <TableHead className="text-right">Debit</TableHead>
              <TableHead className="text-right">Credit</TableHead>
              <TableHead className="text-right">Balance</TableHead>
              <TableHead>Remarks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {WALLET_TRANSACTIONS.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="font-mono text-xs">{t.id}</TableCell>
                <TableCell className="text-xs font-mono">{t.date}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={`text-xs ${t.type === "Recharge" || t.type === "Commission" || t.type === "Refund" ? "text-emerald-700 bg-emerald-50" : "text-rose-700 bg-rose-50"}`}>
                    {t.type}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-xs">{t.ref}</TableCell>
                <TableCell className="text-right text-xs text-rose-600 font-mono">{t.debit}</TableCell>
                <TableCell className="text-right text-xs text-emerald-700 font-mono">{t.credit}</TableCell>
                <TableCell className="text-right text-xs font-mono font-medium">{t.balance}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{t.remarks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export function LedgerView() {
  return (
    <div className="space-y-4">
      <PageHeader title="Ledger" subtitle="Financial ledger — separate from wallet transactions"
        actions={<Button size="sm" variant="outline"><Download className="h-3.5 w-3.5" /> Export</Button>} />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Account", value: "Andheri Health Hub", sub: "FR-001 • Gold plan" },
          { label: "Opening", value: "₹10,000", sub: "01 Oct 2026" },
          { label: "Closing", value: "₹29,351", sub: "22 Oct 2026" },
          { label: "Net Flow", value: "+₹19,351", sub: "credit" },
        ].map((s) => (
          <Card key={s.label} className="p-3">
            <div className="text-[10px] uppercase text-muted-foreground tracking-wider">{s.label}</div>
            <div className="text-lg font-semibold mt-1 truncate">{s.value}</div>
            <div className="text-[10px] text-muted-foreground">{s.sub}</div>
          </Card>
        ))}
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Particulars</TableHead>
              <TableHead className="text-right">Debit</TableHead>
              <TableHead className="text-right">Credit</TableHead>
              <TableHead className="text-right">Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {LEDGER_ROWS.map((r, i) => (
              <TableRow key={i}>
                <TableCell className="text-xs font-mono">{r.date}</TableCell>
                <TableCell className="text-xs">{r.particular}</TableCell>
                <TableCell className="text-right text-xs text-rose-600 font-mono">{r.debit}</TableCell>
                <TableCell className="text-right text-xs text-emerald-700 font-mono">{r.credit}</TableCell>
                <TableCell className="text-right text-xs font-mono font-medium">{r.balance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <SectionCard title="Ledger Reports">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {["Customer Ledger", "Franchise Ledger", "Sub-Franchise Ledger", "Supplier Ledger", "Logistics Partner Ledger", "Doctor Ledger"].map((r) => (
            <button key={r} className="rounded-md border p-2.5 text-xs text-left hover:bg-accent/60">{r}</button>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

export function PaymentsView() {
  return (
    <div className="space-y-4">
      <PageHeader title="Payments" subtitle="All payments received across channels"
        actions={<Button size="sm"><Plus className="h-3.5 w-3.5" /> Record Payment</Button>} />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Today's Collection", value: "₹4.82L" },
          { label: "Wallet Collection", value: "₹2.17L" },
          { label: "Cash", value: "₹0.84L" },
          { label: "UPI/Card/Bank", value: "₹1.81L" },
        ].map((s) => (
          <Card key={s.label} className="p-3">
            <div className="text-[10px] uppercase text-muted-foreground tracking-wider">{s.label}</div>
            <div className="text-lg font-semibold mt-1">{s.value}</div>
          </Card>
        ))}
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Payment ID</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Mode</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              ["PAY-2026-00882", "ORD-20260930-00452", "Ramesh Patil", "Wallet", "₹1,850", "Success", "10:32 AM"],
              ["PAY-2026-00883", "ORD-20260930-00453", "Anita Desai", "UPI", "₹3,499", "Success", "11:05 AM"],
              ["PAY-2026-00884", "ORD-20260930-00454", "Mohammed Khan", "Card", "₹1,100", "Success", "11:45 AM"],
              ["PAY-2026-00885", "ORD-20260930-00455", "Sunita Rao", "Credit", "₹4,299", "Pending", "12:10 PM"],
              ["PAY-2026-00886", "ORD-20260930-00456", "Vijay Mehta", "Wallet", "₹350", "Success", "12:35 PM"],
              ["PAY-2026-00887", "ORD-20260930-00457", "Priya Singh", "UPI", "₹2,299", "Success", "01:00 PM"],
              ["PAY-2026-00888", "ORD-20260930-00463", "Lakshmi Menon", "Bank", "₹3,699", "Refunded", "01:15 PM"],
            ].map((r) => (
              <TableRow key={r[0]}>
                <TableCell className="font-mono text-xs">{r[0]}</TableCell>
                <TableCell className="font-mono text-xs">{r[1]}</TableCell>
                <TableCell className="text-xs">{r[2]}</TableCell>
                <TableCell><Badge variant="secondary" className="text-xs">{r[3]}</Badge></TableCell>
                <TableCell className="text-right text-xs font-medium">{r[4]}</TableCell>
                <TableCell><StatusBadge status={r[5]} /></TableCell>
                <TableCell className="text-xs text-muted-foreground">{r[6]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export function Receivables() {
  return (
    <div className="space-y-4">
      <PageHeader title="Receivables" subtitle="Outstanding receivables by franchise and customer" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Receivable", value: "₹18.4L" },
          { label: "0-30 days", value: "₹12.1L" },
          { label: "31-60 days", value: "₹4.8L" },
          { label: "60+ days", value: "₹1.5L" },
        ].map((s) => (
          <Card key={s.label} className="p-3">
            <div className="text-[10px] uppercase text-muted-foreground tracking-wider">{s.label}</div>
            <div className="text-lg font-semibold mt-1">{s.value}</div>
          </Card>
        ))}
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Account</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Outstanding</TableHead>
              <TableHead className="text-right">Due Days</TableHead>
              <TableHead>Last Payment</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {FRANCHISES.filter((f) => !f.outstanding.includes("₹0")).map((f) => (
              <TableRow key={f.id}>
                <TableCell className="text-sm font-medium">{f.name}</TableCell>
                <TableCell className="text-xs">Franchise</TableCell>
                <TableCell className="text-right text-xs font-medium text-rose-600">{f.outstanding}</TableCell>
                <TableCell className="text-right text-xs">{Math.floor(Math.random() * 45) + 5} days</TableCell>
                <TableCell className="text-xs text-muted-foreground">2026-09-22</TableCell>
                <TableCell><Button size="sm" variant="outline">Send Reminder</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export function Settlement() {
  return (
    <div className="space-y-4">
      <PageHeader title="Settlement" subtitle="Franchise settlements — commission, material, adjustments"
        actions={<Button size="sm"><Plus className="h-3.5 w-3.5" /> New Settlement</Button>} />
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Settlement ID</TableHead>
              <TableHead>Franchise</TableHead>
              <TableHead>Period</TableHead>
              <TableHead className="text-right">Orders</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead className="text-right">Commission</TableHead>
              <TableHead className="text-right">Material</TableHead>
              <TableHead className="text-right">Net Payable</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {FRANCHISES.map((f, i) => (
              <TableRow key={f.id}>
                <TableCell className="font-mono text-xs">STL-2026-{1000 + i}</TableCell>
                <TableCell className="text-sm font-medium">{f.name}</TableCell>
                <TableCell className="text-xs">Sep 22-28, 2026</TableCell>
                <TableCell className="text-right text-xs">{f.ordersToday * 7}</TableCell>
                <TableCell className="text-right text-xs">{f.revenue.replace("₹", "₹")}</TableCell>
                <TableCell className="text-right text-xs text-emerald-700">{f.commission}</TableCell>
                <TableCell className="text-right text-xs">₹1,450</TableCell>
                <TableCell className="text-right text-xs font-medium">{f.commission}</TableCell>
                <TableCell><StatusBadge status={i % 3 === 0 ? "Pending" : "Approved"} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
