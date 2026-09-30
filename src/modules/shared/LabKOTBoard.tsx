"use client";

import { useState } from "react";
import { PageHeader, SectionCard, FormGrid, Field, EmptyState } from "@/components/common/Layout";
import { StatusBadge, CriticalBadge } from "@/components/common/StatusBadge";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  FlaskConical, TestTube2, AlertTriangle, Clock, Activity, Zap, RefreshCw,
  Plus, QrCode, Beaker, Droplet, ScanLine, CheckCircle2, XCircle, RotateCcw,
} from "lucide-react";

// ============ KOT data: test-wise processing counts ============
const KOT_TILES = [
  { code: "HBA1", name: "HbA1c", dept: "Biochemistry", count: 10, stat: 2, urgent: 3, normal: 5, avgTat: "1h 45m", samples: ["SMP-991", "SMP-994", "SMP-997", "SMP-1001", "SMP-1005", "SMP-1008", "SMP-1011", "SMP-1014", "SMP-1018", "SMP-1021"], color: "#0d9488" },
  { code: "CBC", name: "CBC", dept: "Hematology", count: 6, stat: 1, urgent: 2, normal: 3, avgTat: "32m", samples: ["SMP-992", "SMP-996", "SMP-999", "SMP-1003", "SMP-1010", "SMP-1015"], color: "#8b5cf6" },
  { code: "TSH", name: "TSH", dept: "Hormones", count: 4, stat: 0, urgent: 1, normal: 3, avgTat: "4h 12m", samples: ["SMP-993", "SMP-998", "SMP-1006", "SMP-1012"], color: "#6366f1" },
  { code: "LIP", name: "Lipid Profile", dept: "Biochemistry", count: 5, stat: 0, urgent: 2, normal: 3, avgTat: "1h 20m", samples: ["SMP-995", "SMP-1000", "SMP-1004", "SMP-1009", "SMP-1016"], color: "#0d9488" },
  { code: "LFT", name: "LFT", dept: "Biochemistry", count: 3, stat: 0, urgent: 1, normal: 2, avgTat: "1h 10m", samples: ["SMP-1002", "SMP-1007", "SMP-1017"], color: "#0d9488" },
  { code: "KFT", name: "KFT", dept: "Biochemistry", count: 3, stat: 0, urgent: 0, normal: 3, avgTat: "1h 15m", samples: ["SMP-1003", "SMP-1011", "SMP-1020"], color: "#0d9488" },
  { code: "VITD", name: "Vitamin D", dept: "Immunology", count: 5, stat: 0, urgent: 0, normal: 5, avgTat: "5h 30m", samples: ["SMP-1004", "SMP-1009", "SMP-1013", "SMP-1019", "SMP-1023"], color: "#10b981" },
  { code: "GLU", name: "Fasting Glucose", dept: "Biochemistry", count: 4, stat: 1, urgent: 1, normal: 2, avgTat: "22m", samples: ["SMP-1005", "SMP-1010", "SMP-1014", "SMP-1022"], color: "#0d9488" },
  { code: "PSA", name: "PSA", dept: "Immunology", count: 2, stat: 0, urgent: 1, normal: 1, avgTat: "5h 45m", samples: ["SMP-1006", "SMP-1015"], color: "#10b981" },
  { code: "URINE", name: "Urine Routine", dept: "Clinical Path.", count: 2, stat: 0, urgent: 0, normal: 2, avgTat: "48m", samples: ["SMP-1016", "SMP-1024"], color: "#ec4899" },
  { code: "T3", name: "T3", dept: "Hormones", count: 2, stat: 0, urgent: 0, normal: 2, avgTat: "4h 18m", samples: ["SMP-1017", "SMP-1025"], color: "#6366f1" },
  { code: "T4", name: "T4", dept: "Hormones", count: 2, stat: 0, urgent: 0, normal: 2, avgTat: "4h 22m", samples: ["SMP-1018", "SMP-1026"], color: "#6366f1" },
];

// Department-wise queue
const DEPT_QUEUE = [
  { dept: "Hematology", color: "#8b5cf6", received: 42, pending: 18, processing: 14, qc: 5, completed: 22, samples: ["SMP-991", "SMP-992", "SMP-996", "SMP-999"] },
  { dept: "Biochemistry", color: "#0d9488", received: 88, pending: 24, processing: 31, qc: 8, completed: 45, samples: ["SMP-993", "SMP-995", "SMP-997", "SMP-1000", "SMP-1001"] },
  { dept: "Hormones", color: "#6366f1", received: 24, pending: 8, processing: 7, qc: 3, completed: 9, samples: ["SMP-993", "SMP-998", "SMP-1006"] },
  { dept: "Immunology", color: "#10b981", received: 36, pending: 12, processing: 11, qc: 4, completed: 14, samples: ["SMP-1004", "SMP-1009", "SMP-1013"] },
  { dept: "Clinical Path.", color: "#ec4899", received: 14, pending: 6, processing: 4, qc: 2, completed: 7, samples: ["SMP-1016", "SMP-1024"] },
  { dept: "Microbiology", color: "#ef4444", received: 12, pending: 6, processing: 3, qc: 2, completed: 4, samples: [] },
];

// Reagent assignment data
const REAGENT_MASTER = [
  { id: "REA-001", name: "HbA1c Reagent Kit", brand: "Bio-Rad", lotNo: "LOT-HBA1-2026-A08", stock: 18, unit: "vials", daysLeft: 42, status: "OK", assignedTo: ["HBA1"] },
  { id: "REA-002", name: "CBC Diluent (Sysmex)", brand: "Sysmex", lotNo: "LOT-CBC-2026-D12", stock: 8, unit: "L", daysLeft: 12, status: "Low", assignedTo: ["CBC"] },
  { id: "REA-003", name: "Lysis Solution", brand: "Sysmex", lotNo: "LOT-LYSIS-2026-L07", stock: 4, unit: "L", daysLeft: 6, status: "Low", assignedTo: ["CBC"] },
  { id: "REA-004", name: "TSH ELISA Reagent", brand: "Roche", lotNo: "LOT-TSH-2026-T03", stock: 22, unit: "vials", daysLeft: 65, status: "OK", assignedTo: ["TSH"] },
  { id: "REA-005", name: "Lipid Profile Reagent Kit", brand: "Roche", lotNo: "LOT-LIP-2026-P11", stock: 14, unit: "vials", daysLeft: 28, status: "OK", assignedTo: ["LIP", "LFT", "KFT"] },
  { id: "REA-006", name: "Glucose Reagent (Hexokinase)", brand: "Roche", lotNo: "LOT-GLU-2026-G05", stock: 3, unit: "vials", daysLeft: 2, status: "Critical", assignedTo: ["GLU"] },
  { id: "REA-007", name: "Vitamin D CLIA Reagent", brand: "Roche", lotNo: "LOT-VITD-2026-V09", stock: 11, unit: "vials", daysLeft: 22, status: "OK", assignedTo: ["VITD"] },
  { id: "REA-008", name: "PSA Immunoassay Reagent", brand: "Roche", lotNo: "LOT-PSA-2026-P02", stock: 6, unit: "vials", daysLeft: 9, status: "Low", assignedTo: ["PSA"] },
  { id: "REA-009", name: "Urine Strip (10 Param)", brand: "Siemens", lotNo: "LOT-URINE-2026-U11", stock: 32, unit: "tubs", daysLeft: 88, status: "OK", assignedTo: ["URINE"] },
  { id: "REA-010", name: "T3 Reagent", brand: "Roche", lotNo: "LOT-T3-2026-T08", stock: 5, unit: "vials", daysLeft: 14, status: "Low", assignedTo: ["T3"] },
  { id: "REA-011", name: "T4 Reagent", brand: "Roche", lotNo: "LOT-T4-2026-T09", stock: 9, unit: "vials", daysLeft: 21, status: "OK", assignedTo: ["T4"] },
  { id: "REA-012", name: "QC Level 1 (Normal)", brand: "Bio-Rad", lotNo: "LOT-QC1-2026-N04", stock: 7, unit: "vials", daysLeft: 18, status: "OK", assignedTo: ["QC-H-001", "QC-B-001"] },
];

export function LabKOTBoard() {
  const { toast } = useToast();
  const [selectedTile, setSelectedTile] = useState<typeof KOT_TILES[number] | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const totalProcessing = KOT_TILES.reduce((a, t) => a + t.count, 0);
  const totalStat = KOT_TILES.reduce((a, t) => a + t.stat, 0);
  const totalUrgent = KOT_TILES.reduce((a, t) => a + t.urgent, 0);
  const criticalReagents = REAGENT_MASTER.filter((r) => r.status === "Critical").length;
  const lowReagents = REAGENT_MASTER.filter((r) => r.status === "Low").length;

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast({ title: "KOT Board Refreshed", description: `${totalProcessing} samples in active processing` });
    }, 800);
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title="Lab KOT Board — At-a-Glance"
        subtitle="Live processing tiles (like restaurant KOT) + sample queue + reagent assignment"
        actions={
          <>
            <Button size="sm" variant="outline" onClick={handleRefresh}>
              <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} /> Refresh
            </Button>
            <Button size="sm" onClick={() => toast({ title: "Auto-refresh enabled", description: "Updates every 30 seconds" })}>
              <Zap className="h-3.5 w-3.5" /> Live Mode
            </Button>
          </>
        }
      />

      {/* Top KPI strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="p-3 bg-gradient-to-br from-teal-50 to-emerald-50 border-teal-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase text-muted-foreground tracking-wider">Total Processing</div>
              <div className="text-2xl font-bold text-teal-700">{totalProcessing}</div>
            </div>
            <Activity className="h-5 w-5 text-teal-600" />
          </div>
        </Card>
        <Card className="p-3 bg-gradient-to-br from-rose-50 to-amber-50 border-rose-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase text-muted-foreground tracking-wider">STAT Priority</div>
              <div className="text-2xl font-bold text-rose-600 pulse-dot">{totalStat}</div>
            </div>
            <Zap className="h-5 w-5 text-rose-600" />
          </div>
        </Card>
        <Card className="p-3 bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase text-muted-foreground tracking-wider">Urgent Priority</div>
              <div className="text-2xl font-bold text-amber-600">{totalUrgent}</div>
            </div>
            <Clock className="h-5 w-5 text-amber-600" />
          </div>
        </Card>
        <Card className={`p-3 ${criticalReagents > 0 ? "bg-gradient-to-br from-rose-50 to-rose-100 border-rose-300" : "bg-muted/30"}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase text-muted-foreground tracking-wider">Reagent Alerts</div>
              <div className="text-2xl font-bold text-rose-600">{criticalReagents + lowReagents}</div>
              <div className="text-[10px] text-muted-foreground">{criticalReagents} critical · {lowReagents} low</div>
            </div>
            <Droplet className="h-5 w-5 text-rose-600" />
          </div>
        </Card>
      </div>

      <Tabs defaultValue="kot">
        <TabsList>
          <TabsTrigger value="kot"><Activity className="h-3.5 w-3.5 mr-1" /> KOT At-a-Glance</TabsTrigger>
          <TabsTrigger value="queue"><FlaskConical className="h-3.5 w-3.5 mr-1" /> Department Queue</TabsTrigger>
          <TabsTrigger value="reagents"><Droplet className="h-3.5 w-3.5 mr-1" /> Reagent Assignment</TabsTrigger>
        </TabsList>

        {/* =================== KOT At-a-Glance =================== */}
        <TabsContent value="kot" className="mt-4 space-y-4">
          <SectionCard
            title="Test-wise Processing Tiles"
            description="Like a restaurant KOT screen — each tile shows the test code, name, and number of samples currently being processed. STAT tiles pulse red."
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
              {KOT_TILES.map((t) => {
                const isStat = t.stat > 0;
                const isUrgent = t.urgent > 0 && t.stat === 0;
                return (
                  <button
                    key={t.code}
                    onClick={() => setSelectedTile(t)}
                    className={`relative rounded-xl border-2 p-3 text-left transition-all hover:shadow-md hover:scale-[1.02] ${
                      selectedTile?.code === t.code ? "ring-2 ring-primary ring-offset-1" : ""
                    } ${
                      isStat ? "border-rose-400 bg-gradient-to-br from-rose-50 to-rose-100" :
                      isUrgent ? "border-amber-300 bg-gradient-to-br from-amber-50 to-amber-100" :
                      "border-border bg-card"
                    }`}
                  >
                    {isStat && (
                      <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full pulse-dot">
                        STAT ×{t.stat}
                      </span>
                    )}
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{t.dept}</div>
                        <div className="font-mono text-xs text-muted-foreground">{t.code}</div>
                      </div>
                      <div className="h-2 w-2 rounded-full" style={{ background: t.color }} />
                    </div>
                    <div className="mt-1.5 font-bold text-sm leading-tight">{t.name}</div>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className={`text-3xl font-bold ${isStat ? "text-rose-600" : isUrgent ? "text-amber-700" : "text-foreground"}`}>
                        {t.count}
                      </span>
                      <span className="text-[10px] text-muted-foreground">samples</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
                      <span>Avg TAT: <span className="font-mono font-medium text-foreground">{t.avgTat}</span></span>
                      {isUrgent && <Badge className="bg-amber-100 text-amber-800 border-amber-200 text-[9px]">{t.urgent} urgent</Badge>}
                    </div>
                  </button>
                );
              })}
            </div>
          </SectionCard>

          {/* Selected tile detail */}
          {selectedTile && (
            <SectionCard
              title={`Processing Detail — ${selectedTile.name} (${selectedTile.code})`}
              description={`${selectedTile.count} samples in active processing · Department: ${selectedTile.dept}`}
              actions={
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline"><QrCode className="h-3.5 w-3.5" /> Scan Batch</Button>
                  <Button size="sm" variant="outline"><Droplet className="h-3.5 w-3.5" /> Assign Reagent</Button>
                  <Button size="sm" onClick={() => toast({ title: "Result Entry Opened", description: `${selectedTile.name} — ${selectedTile.count} samples` })}>
                    <CheckCircle2 className="h-3.5 w-3.5" /> Enter Results
                  </Button>
                </div>
              }
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                  <div className="text-xs font-medium mb-2">Sample IDs in this batch</div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedTile.samples.map((s) => (
                      <button
                        key={s}
                        onClick={() => toast({ title: "Sample Pulled", description: `${s} — opened in result entry` })}
                        className="rounded-md border px-2 py-1 font-mono text-[11px] hover:bg-accent/60 hover:border-primary"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <Separator className="my-3" />
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="rounded-md border bg-rose-50 border-rose-200 p-2">
                      <div className="text-[10px] uppercase text-rose-700 tracking-wider">STAT</div>
                      <div className="text-xl font-bold text-rose-600">{selectedTile.stat}</div>
                    </div>
                    <div className="rounded-md border bg-amber-50 border-amber-200 p-2">
                      <div className="text-[10px] uppercase text-amber-700 tracking-wider">Urgent</div>
                      <div className="text-xl font-bold text-amber-600">{selectedTile.urgent}</div>
                    </div>
                    <div className="rounded-md border bg-teal-50 border-teal-200 p-2">
                      <div className="text-[10px] uppercase text-teal-700 tracking-wider">Normal</div>
                      <div className="text-xl font-bold text-teal-600">{selectedTile.normal}</div>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border p-3 bg-muted/30">
                  <div className="text-xs font-medium mb-2">Reagent Suggested</div>
                  {REAGENT_MASTER.filter((r) => r.assignedTo.includes(selectedTile.code)).map((r) => (
                    <div key={r.id} className="rounded-md border bg-card p-2 text-xs mb-1.5">
                      <div className="font-medium">{r.name}</div>
                      <div className="text-muted-foreground text-[10px] mt-0.5">{r.brand} · {r.lotNo}</div>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-[10px]">Stock: <span className="font-mono font-medium">{r.stock} {r.unit}</span></span>
                        <StatusBadge status={r.status === "OK" ? "Active" : r.status === "Low" ? "Pending" : "Critical Pending"} />
                      </div>
                    </div>
                  ))}
                  {REAGENT_MASTER.filter((r) => r.assignedTo.includes(selectedTile.code)).length === 0 && (
                    <div className="text-xs text-muted-foreground">No reagent assigned yet.</div>
                  )}
                </div>
              </div>
            </SectionCard>
          )}
        </TabsContent>

        {/* =================== Department Queue =================== */}
        <TabsContent value="queue" className="mt-4 space-y-4">
          <SectionCard
            title="Department-wise Processing Queue"
            description="Hematology, Biochemistry, Hormones, Immunology, Microbiology, Clinical Pathology — each as a swimlane"
          >
            <div className="space-y-3">
              {DEPT_QUEUE.map((d) => (
                <div key={d.dept} className="rounded-lg border overflow-hidden">
                  <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/40">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ background: d.color }} />
                      <h3 className="font-semibold text-sm">{d.dept}</h3>
                      <Badge variant="secondary" className="text-[10px]">{d.received} received</Badge>
                    </div>
                    <div className="flex items-center gap-3 text-[10px]">
                      <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-400" /> {d.pending} pending</div>
                      <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-teal-500" /> {d.processing} processing</div>
                      <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-violet-500" /> {d.qc} QC</div>
                      <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-600" /> {d.completed} done</div>
                    </div>
                  </div>
                  {/* Sample chips */}
                  <div className="p-3 bg-card">
                    {d.samples.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {d.samples.map((s) => (
                          <span key={s} className="rounded-md border px-2 py-0.5 font-mono text-[11px] hover:bg-accent/60 cursor-pointer">
                            {s}
                          </span>
                        ))}
                        <span className="rounded-md border border-dashed px-2 py-0.5 text-[11px] text-muted-foreground">
                          +{(d.processing - d.samples.length) > 0 ? d.processing - d.samples.length : 0} more in queue
                        </span>
                      </div>
                    ) : (
                      <div className="text-xs text-muted-foreground">No active samples in this department</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </TabsContent>

        {/* =================== Reagent Assignment =================== */}
        <TabsContent value="reagents" className="mt-4 space-y-4">
          <SectionCard
            title="Reagent Assignment"
            description="Assign reagent lots to tests/analyzers · track stock, lot expiry, days-left"
            actions={<Button size="sm"><Plus className="h-3.5 w-3.5" /> Add Reagent</Button>}
          >
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reagent ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Lot No.</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                    <TableHead className="text-right">Days Left</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {REAGENT_MASTER.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-mono text-xs">{r.id}</TableCell>
                      <TableCell className="font-medium text-sm">{r.name}</TableCell>
                      <TableCell className="text-xs">{r.brand}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">{r.lotNo}</TableCell>
                      <TableCell className="text-right">
                        <span className={`font-mono text-xs font-medium ${r.stock < 5 ? "text-rose-600" : ""}`}>{r.stock} {r.unit}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={`font-mono text-xs ${r.daysLeft < 7 ? "text-rose-600 font-bold" : r.daysLeft < 14 ? "text-amber-600" : "text-muted-foreground"}`}>{r.daysLeft}d</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {r.assignedTo.map((t) => (
                            <Badge key={t} variant="secondary" className="font-mono text-[10px]">{t}</Badge>
                          ))}
                          <button
                            onClick={() => toast({ title: "Assign Reagent to Test", description: `${r.name} → select tests` })}
                            className="rounded-md border border-dashed px-1.5 py-0 text-[10px] text-muted-foreground hover:bg-accent/60"
                          >
                            + assign
                          </button>
                        </div>
                      </TableCell>
                      <TableCell>
                        {r.status === "Critical" ? (
                          <Badge className="bg-rose-600 text-white border-rose-700 text-xs animate-pulse">CRITICAL</Badge>
                        ) : r.status === "Low" ? (
                          <StatusBadge status="Pending" />
                        ) : (
                          <StatusBadge status="Active" />
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toast({ title: "Reagent Assigned", description: `${r.name} assigned to analyzer` })}
                          >
                            <Droplet className="h-3.5 w-3.5" />
                          </Button>
                          <Button size="sm" variant="ghost"><ScanLine className="h-3.5 w-3.5" /></Button>
                          <Button size="sm" variant="ghost"><RotateCcw className="h-3.5 w-3.5" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </SectionCard>

          {/* Assign reagent form */}
          <SectionCard title="Assign Reagent to Test / Analyzer" description="Pick a reagent lot + select tests + choose analyzer">
            <FormGrid cols={3}>
              <Field label="Reagent" required>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select reagent lot" /></SelectTrigger>
                  <SelectContent>
                    {REAGENT_MASTER.map((r) => (
                      <SelectItem key={r.id} value={r.id}>
                        {r.name} · {r.lotNo} · {r.stock} {r.unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Test / Tests" required>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select test(s)" /></SelectTrigger>
                  <SelectContent>
                    {KOT_TILES.map((t) => (
                      <SelectItem key={t.code} value={t.code}>{t.name} ({t.code})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Analyzer / Machine" required>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select analyzer" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sysmex">Sysmex XN-1000 (Hematology)</SelectItem>
                    <SelectItem value="cobas-c">Roche Cobas c311 (Biochemistry)</SelectItem>
                    <SelectItem value="cobas-e">Roche Cobas e411 (Hormones/Immuno)</SelectItem>
                    <SelectItem value="vitros">Vitros 350 (Clinical Path.)</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Loaded Volume"><Input placeholder="e.g. 50 mL" /></Field>
              <Field label="Loaded At"><Input type="datetime-local" /></Field>
              <Field label="Expiry (Lot)"><Input type="date" /></Field>
              <Field label="Operator"><Input placeholder="Tech ID" /></Field>
              <Field label="QC Sample ID"><Input placeholder="QC-2026-XX" /></Field>
              <Field label="Notes"><Input placeholder="e.g. new lot calibrated" /></Field>
            </FormGrid>
            <div className="flex justify-end gap-2 mt-3">
              <Button size="sm" variant="outline">Reset</Button>
              <Button size="sm" onClick={() => toast({ title: "Reagent Assigned", description: "Lot loaded on analyzer · QC scheduled" })}>
                <CheckCircle2 className="h-3.5 w-3.5" /> Assign Reagent
              </Button>
            </div>
          </SectionCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
