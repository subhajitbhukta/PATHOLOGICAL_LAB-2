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
import { FRANCHISES, SUB_FRANCHISES, RATE_MASTER, AUDIT_TRAIL } from "@/lib/mock-data";
import {
  Plus, Download, Search, Building2, Network, Coins, BarChart3, IndianRupee,
  ShieldCheck, FileText, Receipt, Wallet as WalletIcon,
} from "lucide-react";

export function FranchiseList() {
  return (
    <div className="space-y-4">
      <PageHeader title="Franchises" subtitle="All registered franchises across the network"
        actions={<Button size="sm"><Plus className="h-3.5 w-3.5" /> Register Franchise</Button>} />
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Franchise ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead className="text-center">Sub-Fr</TableHead>
              <TableHead className="text-center">Orders Today</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead className="text-right">Wallet</TableHead>
              <TableHead className="text-right">Outstanding</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {FRANCHISES.map((f) => (
              <TableRow key={f.id} className="cursor-pointer hover:bg-accent/40">
                <TableCell className="font-mono text-xs">{f.id}</TableCell>
                <TableCell className="font-medium text-sm">{f.name}</TableCell>
                <TableCell className="text-xs">{f.owner}</TableCell>
                <TableCell className="text-xs">{f.city}</TableCell>
                <TableCell><Badge variant="secondary" className="text-xs">{f.plan}</Badge></TableCell>
                <TableCell className="text-center text-xs">{f.subCount}</TableCell>
                <TableCell className="text-center text-xs">{f.ordersToday}</TableCell>
                <TableCell className="text-right text-xs font-medium">{f.revenue}</TableCell>
                <TableCell className={`text-right text-xs font-medium ${f.walletBalance.includes("-") ? "text-rose-600" : ""}`}>{f.walletBalance}</TableCell>
                <TableCell className="text-right text-xs">{f.outstanding}</TableCell>
                <TableCell><StatusBadge status={f.status} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export function SubFranchiseList() {
  return (
    <div className="space-y-4">
      <PageHeader title="Sub-Franchises" subtitle="Sub-franchises managed by parent franchises"
        actions={<Button size="sm"><Plus className="h-3.5 w-3.5" /> Add Sub-Franchise</Button>} />
      <SectionCard title="Hierarchy">
        <div className="rounded-lg border p-4 bg-muted/30 text-xs space-y-3">
          <div className="font-medium">Central Lab — Mumbai</div>
          <div className="ml-4 space-y-2">
            {FRANCHISES.slice(0, 3).map((f) => (
              <div key={f.id}>
                <div className="flex items-center gap-2">
                  <Building2 className="h-3.5 w-3.5 text-primary" />
                  <span className="font-medium">{f.name}</span>
                  <Badge variant="secondary" className="text-[10px]">{f.id}</Badge>
                </div>
                <div className="ml-5 mt-1 space-y-1 border-l pl-3">
                  {SUB_FRANCHISES.filter((s) => s.parent === f.name).map((s) => (
                    <div key={s.id} className="flex items-center gap-2">
                      <Network className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs">{s.name}</span>
                      <span className="text-[10px] text-muted-foreground">— {s.owner}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sub-Franchise ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Parent Franchise</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead className="text-center">Orders Today</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead className="text-right">Wallet</TableHead>
              <TableHead className="text-right">Commission</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {SUB_FRANCHISES.map((s) => (
              <TableRow key={s.id} className="cursor-pointer hover:bg-accent/40">
                <TableCell className="font-mono text-xs">{s.id}</TableCell>
                <TableCell className="font-medium text-sm">{s.name}</TableCell>
                <TableCell className="text-xs">{s.parent}</TableCell>
                <TableCell className="text-xs">{s.owner}</TableCell>
                <TableCell className="text-center text-xs">{s.ordersToday}</TableCell>
                <TableCell className="text-right text-xs">{s.revenue}</TableCell>
                <TableCell className="text-right text-xs">{s.walletBalance}</TableCell>
                <TableCell className="text-right text-xs">{s.commission}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export function RatesMaster() {
  return (
    <div className="space-y-4">
      <PageHeader title="Rates Master" subtitle="Hierarchical rates — MRP → B2C → B2B → Franchise → Sub-Franchise → Corporate → Camp"
        actions={<Button size="sm"><Plus className="h-3.5 w-3.5" /> Add Rate</Button>} />
      <SectionCard title="Rate Hierarchy Calculator" description="Pick a test to see margin breakdown">
        <FormGrid cols={3}>
          <Field label="Select Test">
            <Select defaultValue="CBC">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {RATE_MASTER.map((r) => <SelectItem key={r.code} value={r.code}>{r.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
          <Field label="MRP"><Input defaultValue="₹350" readOnly /></Field>
          <Field label="B2C Rate"><Input defaultValue="₹280" readOnly /></Field>
        </FormGrid>
        <div className="mt-4 rounded-lg border p-3 bg-muted/30">
          <div className="text-xs font-medium mb-2">Margin Breakdown</div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between"><span>MRP</span><span>₹350</span></div>
            <div className="flex justify-between"><span>B2C Selling Price</span><span>₹280</span></div>
            <div className="flex justify-between"><span>Lab B2B Rate</span><span>₹175</span></div>
            <div className="flex justify-between text-emerald-700"><span>Franchise Margin</span><span>₹35</span></div>
            <div className="flex justify-between text-emerald-700"><span>Sub-Franchise Margin</span><span>₹35</span></div>
            <div className="flex justify-between"><span>Collection Charge</span><span>₹0</span></div>
            <Separator className="my-1" />
            <div className="flex justify-between font-semibold"><span>Net Lab Revenue</span><span>₹210</span></div>
          </div>
        </div>
      </SectionCard>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">MRP</TableHead>
              <TableHead className="text-right">B2C</TableHead>
              <TableHead className="text-right">B2B</TableHead>
              <TableHead className="text-right">Franchise</TableHead>
              <TableHead className="text-right">Sub-Fr</TableHead>
              <TableHead className="text-right">Corporate</TableHead>
              <TableHead className="text-right">Camp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {RATE_MASTER.map((r) => (
              <TableRow key={r.code}>
                <TableCell className="font-mono text-xs">{r.code}</TableCell>
                <TableCell className="text-sm font-medium">{r.name}</TableCell>
                <TableCell className="text-right text-xs">₹{r.mrp}</TableCell>
                <TableCell className="text-right text-xs">₹{r.b2c}</TableCell>
                <TableCell className="text-right text-xs">₹{r.b2b}</TableCell>
                <TableCell className="text-right text-xs font-medium">₹{r.franchise}</TableCell>
                <TableCell className="text-right text-xs">₹{r.subFranchise}</TableCell>
                <TableCell className="text-right text-xs">₹{r.corporate}</TableCell>
                <TableCell className="text-right text-xs">₹{r.camp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export function CommissionEngine() {
  return (
    <div className="space-y-4">
      <PageHeader title="Commission Engine" subtitle="Configurable commission rules — per franchise, sub-franchise, test, package" />
      <SectionCard title="Commission Calculation Example">
        <div className="rounded-lg border p-4 bg-muted/30">
          <div className="text-xs font-medium mb-3">Patient Price: ₹1,000</div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Lab B2B Rate</span><span className="font-mono">₹500</span></div>
            <div className="flex justify-between text-emerald-700"><span>Franchise Margin</span><span className="font-mono">₹200</span></div>
            <div className="flex justify-between text-emerald-700"><span>Sub-Franchise Margin</span><span className="font-mono">₹100</span></div>
            <div className="flex justify-between"><span>Collection Charge</span><span className="font-mono">₹50</span></div>
            <Separator />
            <div className="flex justify-between font-semibold"><span>Net Lab Revenue</span><span className="font-mono">₹650</span></div>
          </div>
        </div>
      </SectionCard>
      <SectionCard title="Commission Rules">
        <FormGrid cols={3}>
          <Field label="Rule Name"><Input defaultValue="Default Franchise" /></Field>
          <Field label="Applies To">
            <Select><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="franchise">Franchise</SelectItem><SelectItem value="sub">Sub-Franchise</SelectItem><SelectItem value="corporate">Corporate</SelectItem></SelectContent>
            </Select>
          </Field>
          <Field label="Target"><Input placeholder="All franchises" /></Field>
          <Field label="Commission Type">
            <Select defaultValue="fixed"><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="fixed">Fixed ₹</SelectItem><SelectItem value="percent">Percentage %</SelectItem></SelectContent>
            </Select>
          </Field>
          <Field label="Commission Value"><Input defaultValue="200" /></Field>
          <Field label="Collection Charge"><Input defaultValue="50" /></Field>
          <Field label="Min Test Count"><Input type="number" placeholder="0" /></Field>
          <Field label="Effective From"><Input type="date" /></Field>
          <Field label="Effective To"><Input type="date" /></Field>
        </FormGrid>
      </SectionCard>
      <SectionCard title="Franchise-wise Commission (this month)">
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Franchise</TableHead>
                <TableHead className="text-center">Orders</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Commission</TableHead>
                <TableHead className="text-right">Collection Charges</TableHead>
                <TableHead className="text-right">Net Payout</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {FRANCHISES.map((f) => (
                <TableRow key={f.id}>
                  <TableCell className="text-sm font-medium">{f.name}</TableCell>
                  <TableCell className="text-center text-xs">{f.ordersToday * 22}</TableCell>
                  <TableCell className="text-right text-xs">{f.revenue}</TableCell>
                  <TableCell className="text-right text-xs font-medium text-emerald-700">{f.commission}</TableCell>
                  <TableCell className="text-right text-xs">₹{(f.ordersToday * 25).toLocaleString()}</TableCell>
                  <TableCell className="text-right text-xs font-medium">{f.commission}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </SectionCard>
    </div>
  );
}

export function FranchisePerformance() {
  return (
    <div className="space-y-4">
      <PageHeader title="Franchise Performance" subtitle="Comparative performance across the franchise network" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Active Franchises", value: "46", sub: "6 sub-franchises" },
          { label: "Top Performer", value: "Pune Central", sub: "₹98,600 today" },
          { label: "Avg Order Value", value: "₹1,420", sub: "+5.2% WoW" },
          { label: "Inactive (7d)", value: "3", sub: "follow-up needed" },
        ].map((s) => (
          <Card key={s.label} className="p-4">
            <div className="text-[10px] uppercase text-muted-foreground tracking-wider">{s.label}</div>
            <div className="text-xl font-semibold mt-1">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.sub}</div>
          </Card>
        ))}
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Franchise</TableHead>
              <TableHead className="text-center">Orders (30d)</TableHead>
              <TableHead className="text-right">Revenue (30d)</TableHead>
              <TableHead className="text-center">TAT Compliance</TableHead>
              <TableHead className="text-center">Rejection %</TableHead>
              <TableHead className="text-center">Settlement</TableHead>
              <TableHead className="text-right">Outstanding</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {FRANCHISES.map((f) => (
              <TableRow key={f.id}>
                <TableCell className="text-sm font-medium">{f.name}</TableCell>
                <TableCell className="text-center text-xs">{f.ordersToday * 22}</TableCell>
                <TableCell className="text-right text-xs">{f.revenue}</TableCell>
                <TableCell className="text-center"><Badge variant="secondary" className="text-xs">{92 - Math.floor(Math.random() * 8)}%</Badge></TableCell>
                <TableCell className="text-center text-xs">{(1.8 + Math.random()).toFixed(1)}%</TableCell>
                <TableCell className="text-center"><StatusBadge status="Active" /></TableCell>
                <TableCell className="text-right text-xs">{f.outstanding}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export function AuditTrail() {
  return (
    <div className="space-y-4">
      <PageHeader title="Audit Trail" subtitle="Every important action logged with user, role, IP, old & new values"
        actions={<Button size="sm" variant="outline"><Download className="h-3.5 w-3.5" /> Export Audit Log</Button>} />
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Reference</TableHead>
              <TableHead>Field</TableHead>
              <TableHead>Old Value</TableHead>
              <TableHead>New Value</TableHead>
              <TableHead>IP</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {AUDIT_TRAIL.map((a, i) => (
              <TableRow key={i}>
                <TableCell className="font-mono text-xs text-muted-foreground">{a.time}</TableCell>
                <TableCell className="text-xs font-medium">{a.user}</TableCell>
                <TableCell className="text-xs">{a.role}</TableCell>
                <TableCell className="text-xs"><Badge variant="outline" className="text-xs">{a.action}</Badge></TableCell>
                <TableCell className="font-mono text-xs">{a.ref}</TableCell>
                <TableCell className="text-xs">{a.field}</TableCell>
                <TableCell className="text-xs text-rose-600">{a.old}</TableCell>
                <TableCell className="text-xs text-emerald-700">{a.new}</TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">{a.ip}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
