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
import { PRODUCTS, INVENTORY_STOCK } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";
import {
  Plus, Search, Download, ShoppingBag, Package, Truck, Boxes, Receipt,
  ClipboardCheck, ShoppingCart, AlertTriangle,
} from "lucide-react";

export function ProductsList() {
  return (
    <div className="space-y-4">
      <PageHeader title="Products" subtitle="E-commerce / Material Store product master"
        actions={<Button size="sm"><Plus className="h-3.5 w-3.5" /> Add Product</Button>} />
      <SectionCard title="New Product">
        <FormGrid cols={3}>
          <Field label="SKU" required><Input placeholder="BAR-VL-001" /></Field>
          <Field label="Product Name" required><Input placeholder="Barcode Vials (100 pcs)" /></Field>
          <Field label="Category">
            <Select defaultValue="consumables"><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="consumables">Consumables</SelectItem>
                <SelectItem value="tubes">Tubes</SelectItem>
                <SelectItem value="containers">Containers</SelectItem>
                <SelectItem value="ppe">PPE</SelectItem>
                <SelectItem value="stationery">Stationery</SelectItem>
                <SelectItem value="bags">Bags</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Brand"><Input /></Field>
          <Field label="Unit"><Input placeholder="pcs" /></Field>
          <Field label="Pack Size"><Input type="number" /></Field>
          <Field label="Purchase Price"><Input type="number" /></Field>
          <Field label="Selling Price"><Input type="number" /></Field>
          <Field label="Franchise Price"><Input type="number" /></Field>
          <Field label="GST %"><Input type="number" defaultValue={0} /></Field>
          <Field label="Reorder Level"><Input type="number" /></Field>
          <Field label="Expiry"><Input type="month" /></Field>
        </FormGrid>
      </SectionCard>
      <Card>
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input placeholder="Search by SKU, name, brand..." className="pl-8" />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead className="text-center">Pack</TableHead>
              <TableHead className="text-center">Stock</TableHead>
              <TableHead className="text-right">MRP</TableHead>
              <TableHead className="text-right">Fr Price</TableHead>
              <TableHead>Expiry</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PRODUCTS.map((p) => (
              <TableRow key={p.sku} className="cursor-pointer hover:bg-accent/40">
                <TableCell className="font-mono text-xs">{p.sku}</TableCell>
                <TableCell className="text-sm font-medium">{p.name}</TableCell>
                <TableCell className="text-xs">{p.cat}</TableCell>
                <TableCell className="text-xs">{p.brand}</TableCell>
                <TableCell className="text-center text-xs">{p.pack}</TableCell>
                <TableCell className="text-center text-xs font-medium">
                  <span className={p.stock < p.reorder ? "text-rose-600" : ""}>{p.stock}</span>
                  <span className="text-muted-foreground">/{p.reorder}</span>
                </TableCell>
                <TableCell className="text-right text-xs">₹{p.price}</TableCell>
                <TableCell className="text-right text-xs font-medium">₹{p.frPrice}</TableCell>
                <TableCell className="text-xs font-mono">{p.expiry}</TableCell>
                <TableCell><StatusBadge status={p.stock < p.reorder ? "Rejected" : "Active"} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export function MaterialOrders() {
  return (
    <div className="space-y-4">
      <PageHeader title="Material Orders" subtitle="Franchise material orders — browse → cart → checkout → wallet"
        actions={<Button size="sm"><ShoppingCart className="h-3.5 w-3.5" /> New Order</Button>} />
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Franchise</TableHead>
              <TableHead className="text-center">Items</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Placed</TableHead>
              <TableHead>ETA</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              ["MAT-1024", "Andheri Health Hub", 8, "₹1,450", "Wallet", "Dispatched", "12:00 PM", "Tomorrow 10 AM"],
              ["MAT-1023", "Bandra Care Hub", 4, "₹820", "UPI", "Delivered", "Yesterday", "—"],
              ["MAT-1022", "Powai MedLab", 12, "₹2,180", "Wallet", "Processing", "Yesterday", "Tomorrow 5 PM"],
              ["MAT-1021", "Thane Wellness", 6, "₹1,120", "Credit", "Pending", "2 days ago", "Tomorrow 11 AM"],
              ["MAT-1020", "Navi Mumbai", 9, "₹1,890", "Wallet", "Delivered", "3 days ago", "—"],
              ["MAT-1019", "Pune Central", 14, "₹3,420", "Wallet", "Delivered", "4 days ago", "—"],
            ].map((r) => (
              <TableRow key={r[0]}>
                <TableCell className="font-mono text-xs">{r[0]}</TableCell>
                <TableCell className="text-sm font-medium">{r[1]}</TableCell>
                <TableCell className="text-center text-xs">{r[2]}</TableCell>
                <TableCell className="text-right text-xs">{r[3]}</TableCell>
                <TableCell><Badge variant="secondary" className="text-xs">{r[4]}</Badge></TableCell>
                <TableCell><StatusBadge status={r[5]} /></TableCell>
                <TableCell className="text-xs text-muted-foreground">{r[6]}</TableCell>
                <TableCell className="text-xs">{r[7]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export function Warehouse() {
  return (
    <div className="space-y-4">
      <PageHeader title="Warehouse" subtitle="Central warehouse stock view — by SKU, batch, expiry"
        actions={<Button size="sm"><Plus className="h-3.5 w-3.5" /> Stock In</Button>} />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total SKUs", value: "248", icon: Boxes },
          { label: "Stock Value", value: "₹4.82L", icon: Package },
          { label: "Low Stock", value: "12 SKUs", icon: AlertTriangle },
          { label: "Expiring (60d)", value: "3 SKUs", icon: AlertTriangle },
        ].map((s) => (
          <Card key={s.label} className="p-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-[10px] uppercase text-muted-foreground tracking-wider">{s.label}</div>
                <div className="text-lg font-semibold">{s.value}</div>
              </div>
              <s.icon className="h-4 w-4 text-muted-foreground/60" />
            </div>
          </Card>
        ))}
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Warehouse</TableHead>
              <TableHead className="text-right">Lab</TableHead>
              <TableHead className="text-right">Collection</TableHead>
              <TableHead className="text-right">Franchise</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Reorder</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {INVENTORY_STOCK.map((s) => (
              <TableRow key={s.sku}>
                <TableCell className="font-mono text-xs">{s.sku}</TableCell>
                <TableCell className="text-sm">{s.name}</TableCell>
                <TableCell className="text-right text-xs">{s.warehouse}</TableCell>
                <TableCell className="text-right text-xs">{s.lab}</TableCell>
                <TableCell className="text-right text-xs">{s.collection}</TableCell>
                <TableCell className="text-right text-xs">{s.franchise}</TableCell>
                <TableCell className="text-right text-xs font-medium">{s.total}</TableCell>
                <TableCell className="text-right text-xs">{s.reorder}</TableCell>
                <TableCell><StatusBadge status={s.status === "Reorder" ? "Rejected" : s.status === "Low" ? "Pending" : "Active"} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export function DispatchList() {
  return (
    <div className="space-y-4">
      <PageHeader title="Dispatch" subtitle="Pick → Pack → Dispatch → Logistics → Delivered"
        actions={<Button size="sm"><Plus className="h-3.5 w-3.5" /> New Dispatch</Button>} />
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Dispatch ID</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Franchise</TableHead>
              <TableHead className="text-center">Items</TableHead>
              <TableHead>Pick</TableHead>
              <TableHead>Pack</TableHead>
              <TableHead>Dispatched</TableHead>
              <TableHead>Delivered</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              ["DSP-2026-0421", "MAT-1024", "Andheri Health Hub", 8, "✓", "✓", "✓", "—", "In Transit"],
              ["DSP-2026-0420", "MAT-1022", "Powai MedLab", 12, "✓", "✓", "—", "—", "Packing"],
              ["DSP-2026-0419", "MAT-1021", "Thane Wellness", 6, "✓", "—", "—", "—", "Pick"],
              ["DSP-2026-0418", "MAT-1020", "Navi Mumbai", 9, "✓", "✓", "✓", "✓", "Delivered"],
              ["DSP-2026-0417", "MAT-1019", "Pune Central", 14, "✓", "✓", "✓", "✓", "Delivered"],
            ].map((r) => (
              <TableRow key={r[0]}>
                <TableCell className="font-mono text-xs">{r[0]}</TableCell>
                <TableCell className="font-mono text-xs">{r[1]}</TableCell>
                <TableCell className="text-sm">{r[2]}</TableCell>
                <TableCell className="text-center text-xs">{r[3]}</TableCell>
                <TableCell><span className={r[4] === "✓" ? "text-emerald-600" : "text-muted-foreground"}>{r[4]}</span></TableCell>
                <TableCell><span className={r[5] === "✓" ? "text-emerald-600" : "text-muted-foreground"}>{r[5]}</span></TableCell>
                <TableCell><span className={r[6] === "✓" ? "text-emerald-600" : "text-muted-foreground"}>{r[6]}</span></TableCell>
                <TableCell><span className={r[7] === "✓" ? "text-emerald-600" : "text-muted-foreground"}>{r[7]}</span></TableCell>
                <TableCell><StatusBadge status={r[8]} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export function InventoryView() {
  return (
    <div className="space-y-4">
      <PageHeader title="Inventory" subtitle="Multi-location inventory — Central, Lab, Collection, Franchise"
        actions={<Button size="sm"><Plus className="h-3.5 w-3.5" /> Stock Adjustment</Button>} />
      <SectionCard title="Stock Transactions">
        <FormGrid cols={3}>
          <Field label="Transaction Type">
            <Select defaultValue="transfer"><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="purchase">Purchase</SelectItem>
                <SelectItem value="grn">GRN</SelectItem>
                <SelectItem value="transfer">Stock Transfer</SelectItem>
                <SelectItem value="issue">Issue</SelectItem>
                <SelectItem value="consumption">Consumption</SelectItem>
                <SelectItem value="return">Return</SelectItem>
                <SelectItem value="damage">Damage</SelectItem>
                <SelectItem value="expiry">Expiry</SelectItem>
                <SelectItem value="adjustment">Adjustment</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="From Location">
            <Select><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="warehouse">Central Warehouse</SelectItem>
                <SelectItem value="lab">Lab Inventory</SelectItem>
                <SelectItem value="collection">Collection Centre</SelectItem>
                <SelectItem value="franchise">Franchise Inventory</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="To Location">
            <Select><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="warehouse">Central Warehouse</SelectItem>
                <SelectItem value="lab">Lab Inventory</SelectItem>
                <SelectItem value="collection">Collection Centre</SelectItem>
                <SelectItem value="franchise">Franchise Inventory</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </FormGrid>
      </SectionCard>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Txn ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead className="text-right">Qty</TableHead>
              <TableHead>Batch</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              ["INV-2026-1248", "Transfer", "BAR-VL-001", "Warehouse", "Andheri H.H.", "200", "B-2026-08", "10:32 AM"],
              ["INV-2026-1247", "Issue", "TBE-ED-001", "Lab", "Hematology Dept", "50", "B-2026-05", "10:15 AM"],
              ["INV-2026-1246", "Consumption", "PPE-GL-001", "Lab", "—", "10", "B-2026-06", "09:50 AM"],
              ["INV-2026-1245", "GRN", "TBE-SE-001", "Warehouse", "—", "500", "B-2026-05", "09:30 AM"],
              ["INV-2026-1244", "Damage", "CON-UR-001", "Lab", "—", "5", "B-2025-11", "09:00 AM"],
              ["INV-2026-1243", "Expiry", "PPE-MS-001", "Warehouse", "—", "20", "B-2024-12", "Yesterday"],
            ].map((r) => (
              <TableRow key={r[0]}>
                <TableCell className="font-mono text-xs">{r[0]}</TableCell>
                <TableCell><Badge variant="outline" className="text-xs">{r[1]}</Badge></TableCell>
                <TableCell className="font-mono text-xs">{r[2]}</TableCell>
                <TableCell className="text-xs">{r[3]}</TableCell>
                <TableCell className="text-xs">{r[4]}</TableCell>
                <TableCell className="text-right text-xs font-medium">{r[5]}</TableCell>
                <TableCell className="font-mono text-xs">{r[6]}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{r[7]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export function PurchaseOrders() {
  return (
    <div className="space-y-4">
      <PageHeader title="Purchase Orders" subtitle="PO to suppliers for consumables and materials"
        actions={<Button size="sm"><Plus className="h-3.5 w-3.5" /> New PO</Button>} />
      <SectionCard title="New Purchase Order">
        <FormGrid cols={3}>
          <Field label="PO Number" hint="Auto"><Input defaultValue="PO-2026-0142" readOnly /></Field>
          <Field label="Supplier" required>
            <Select><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="bd">BD (Tubes)</SelectItem>
                <SelectItem value="vacuette">Vacuette</SelectItem>
                <SelectItem value="zebra">Zebra (Barcode)</SelectItem>
                <SelectItem value="tarson">Tarson (Containers)</SelectItem>
                <SelectItem value="halyard">Halyard (PPE)</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="PO Date" required><Input type="date" /></Field>
          <Field label="Expected Delivery"><Input type="date" /></Field>
          <Field label="Payment Terms">
            <Select defaultValue="30"><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="15">Net 15</SelectItem><SelectItem value="30">Net 30</SelectItem><SelectItem value="45">Net 45</SelectItem></SelectContent>
            </Select>
          </Field>
          <Field label="Notes"><Textarea rows={1} /></Field>
        </FormGrid>
      </SectionCard>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>PO Number</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-center">Lines</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Expected</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              ["PO-2026-0142", "BD", "2026-09-30", 5, "₹48,200", "2026-10-08", "Pending"],
              ["PO-2026-0141", "Zebra", "2026-09-28", 3, "₹22,500", "2026-10-05", "Approved"],
              ["PO-2026-0140", "Vacuette", "2026-09-25", 8, "₹64,800", "2026-10-02", "Received"],
              ["PO-2026-0139", "Tarson", "2026-09-22", 2, "₹12,400", "2026-09-29", "Received"],
              ["PO-2026-0138", "Halyard", "2026-09-20", 4, "₹18,900", "2026-09-27", "Closed"],
            ].map((r) => (
              <TableRow key={r[0]}>
                <TableCell className="font-mono text-xs">{r[0]}</TableCell>
                <TableCell className="text-sm font-medium">{r[1]}</TableCell>
                <TableCell className="text-xs font-mono">{r[2]}</TableCell>
                <TableCell className="text-center text-xs">{r[3]}</TableCell>
                <TableCell className="text-right text-xs font-medium">{r[4]}</TableCell>
                <TableCell className="text-xs font-mono">{r[5]}</TableCell>
                <TableCell><StatusBadge status={r[6]} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export function GRN() {
  return (
    <div className="space-y-4">
      <PageHeader title="Goods Received Note (GRN)" subtitle="Receive supplier shipments against POs"
        actions={<Button size="sm"><Plus className="h-3.5 w-3.5" /> New GRN</Button>} />
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>GRN ID</TableHead>
              <TableHead>PO</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Received</TableHead>
              <TableHead className="text-center">Expected</TableHead>
              <TableHead className="text-center">Accepted</TableHead>
              <TableHead className="text-center">Rejected</TableHead>
              <TableHead>Batch</TableHead>
              <TableHead>Expiry</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              ["GRN-2026-0124", "PO-2026-0140", "Vacuette", "2026-10-02", 500, 480, 20, "B-2026-08", "2027-08"],
              ["GRN-2026-0123", "PO-2026-0139", "Tarson", "2026-09-29", 200, 200, 0, "B-2026-09", "—"],
              ["GRN-2026-0122", "PO-2026-0138", "Halyard", "2026-09-27", 400, 395, 5, "B-2026-07", "2027-12"],
              ["GRN-2026-0121", "PO-2026-0137", "BD", "2026-09-25", 1000, 1000, 0, "B-2026-05", "2027-05"],
            ].map((r) => (
              <TableRow key={r[0]}>
                <TableCell className="font-mono text-xs">{r[0]}</TableCell>
                <TableCell className="font-mono text-xs">{r[1]}</TableCell>
                <TableCell className="text-sm">{r[2]}</TableCell>
                <TableCell className="text-xs font-mono">{r[3]}</TableCell>
                <TableCell className="text-center text-xs">{r[4]}</TableCell>
                <TableCell className="text-center text-xs text-emerald-700 font-medium">{r[5]}</TableCell>
                <TableCell className="text-center text-xs text-rose-600">{r[6]}</TableCell>
                <TableCell className="font-mono text-xs">{r[7]}</TableCell>
                <TableCell className="font-mono text-xs">{r[8]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
