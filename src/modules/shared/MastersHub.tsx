"use client";

import { PageHeader, SectionCard, FormGrid, Field } from "@/components/common/Layout";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { TEST_MASTER, SAMPLE_MASTER, PACKAGE_MASTER, RATE_MASTER } from "@/lib/mock-data";
import { VIAL_REFERENCE } from "@/modules/shared/BookTestWizard";
import { Plus, Search, Download, Beaker, TestTube2, Package2, Coins } from "lucide-react";
import { useState } from "react";

// Local VialSvg to avoid circular import runtime issues
function VialSvgMini({ color, capColor, size = "sm" }: { color: string; capColor: string; size?: "sm" | "md" }) {
  const h = size === "sm" ? 28 : 40;
  const w = size === "sm" ? 14 : 18;
  const isContainer = capColor === "—";
  return (
    <svg width={w} height={h} viewBox="0 0 18 40" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      {isContainer ? (
        <>
          <rect x="2" y="8" width="14" height="28" rx="2" fill="white" stroke="#94a3b8" strokeWidth="1" />
          <rect x="2" y="20" width="14" height="16" rx="2" fill={color} opacity="0.5" />
          <rect x="2" y="8" width="14" height="3" fill="#64748b" />
        </>
      ) : (
        <>
          <rect x="3" y="6" width="12" height="3" rx="1" fill={capColor} stroke="#475569" strokeWidth="0.5" />
          <rect x="6" y="3" width="6" height="3" fill="#94a3b8" />
          <path d="M 4 9 L 14 9 L 14 36 Q 14 38 12 38 L 6 38 Q 4 38 4 36 Z" fill="white" stroke="#94a3b8" strokeWidth="0.5" />
          <path d="M 4 9 L 14 9 L 14 36 Q 14 38 12 38 L 6 38 Q 4 38 4 36 Z" fill={color} opacity="0.55" />
          <rect x="4" y="20" width="10" height="2" fill="white" opacity="0.5" />
        </>
      )}
    </svg>
  );
}

export function MastersHub() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Master Management"
        subtitle="Centralised masters — Tests, Samples, Packages, Rates, Departments, Locations"
        actions={<Button size="sm" variant="outline"><Download className="h-3.5 w-3.5" /> Export</Button>}
      />
      <Tabs defaultValue="test">
        <TabsList>
          <TabsTrigger value="test"><TestTube2 className="h-3.5 w-3.5 mr-1" /> Test Master</TabsTrigger>
          <TabsTrigger value="sample"><Beaker className="h-3.5 w-3.5 mr-1" /> Sample Master</TabsTrigger>
          <TabsTrigger value="package"><Package2 className="h-3.5 w-3.5 mr-1" /> Package Master</TabsTrigger>
          <TabsTrigger value="rate"><Coins className="h-3.5 w-3.5 mr-1" /> Rate Master</TabsTrigger>
        </TabsList>
        <TabsContent value="test" className="mt-4"><TestMasterView /></TabsContent>
        <TabsContent value="sample" className="mt-4"><SampleMasterView /></TabsContent>
        <TabsContent value="package" className="mt-4"><PackageMasterView /></TabsContent>
        <TabsContent value="rate" className="mt-4"><RateMasterView /></TabsContent>
      </Tabs>
    </div>
  );
}

function TestMasterView() {
  return (
    <div className="space-y-4">
      <SectionCard title="New Test Master" description="Add a new test / investigation to the system">
        <FormGrid cols={3}>
          <Field label="Test Code" required><Input placeholder="CBC" /></Field>
          <Field label="Test Name" required><Input placeholder="Complete Blood Count" /></Field>
          <Field label="Short Name"><Input placeholder="CBC" /></Field>
          <Field label="Department" required>
            <Select>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                {["Hematology", "Biochemistry", "Clinical Path.", "Immunology", "Serology", "Microbiology", "Histopathology", "Molecular Biology", "Hormones"].map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Category">
            <Select>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="routine">Routine</SelectItem>
                <SelectItem value="special">Special</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="super-special">Super-Special</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Sample Type" required>
            <Select>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                {SAMPLE_MASTER.map((s) => <SelectItem key={s.type} value={s.type}>{s.type}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Vial / Container">
            <Select>
              <SelectTrigger><SelectValue placeholder="Select vial / container" /></SelectTrigger>
              <SelectContent>
                {/* Blood — Vials with chemical additive */}
                <SelectItem value="serum-sst">Vial — Clot Activator (SST) · Yellow cap</SelectItem>
                <SelectItem value="edta">Vial — K2/K3 EDTA · Purple cap</SelectItem>
                <SelectItem value="fluoride">Vial — Sodium Fluoride (NaF) · Grey cap</SelectItem>
                <SelectItem value="citrate">Vial — Sodium Citrate 3.2% · Light Blue cap</SelectItem>
                <SelectItem value="heparin">Vial — Lithium Heparin · Green cap</SelectItem>
                <SelectItem value="plain">Vial — Plain (No Additive) · Red cap</SelectItem>
                {/* Non-blood — Containers */}
                <SelectItem value="urine-cup">Container — Sterile Cup (Urine)</SelectItem>
                <SelectItem value="stool-cup">Container — Sterile Container (Stool)</SelectItem>
                <SelectItem value="swab">Container — Swab / Transport Medium</SelectItem>
                <SelectItem value="sputum">Container — Sputum Container</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Sample Volume"><Input placeholder="2 mL" /></Field>
          <Field label="Fasting Required">
            <Select defaultValue="no">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="yes">Yes</SelectItem><SelectItem value="no">No</SelectItem></SelectContent>
            </Select>
          </Field>
          <Field label="Patient Preparation"><Input placeholder="e.g. Fasting 8-12h" /></Field>
          <Field label="Gender">
            <Select defaultValue="both"><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="both">Both</SelectItem><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent>
            </Select>
          </Field>
          <Field label="Age Range"><Input placeholder="0 - 120" /></Field>
          <Field label="Reference Range"><Textarea rows={1} placeholder="13.0 - 17.0" /></Field>
          <Field label="Critical Range"><Input placeholder="&lt; 7" /></Field>
          <Field label="Unit"><Input placeholder="g/dL" /></Field>
          <Field label="Method"><Input placeholder="5-Part Analyzer" /></Field>
          <Field label="Machine / Analyzer"><Input placeholder="Sysmex XN-1000" /></Field>
          <Field label="Processing Lab"><Input placeholder="Central Lab — Mumbai" /></Field>
          <Field label="TAT"><Input placeholder="2h" /></Field>
          <Field label="Report Format">
            <Select><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="standard">Standard</SelectItem><SelectItem value="detailed">Detailed</SelectItem><SelectItem value="narrative">Narrative</SelectItem></SelectContent>
            </Select>
          </Field>
          <Field label="Outsourced / In-house">
            <Select defaultValue="inhouse"><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="inhouse">In-house</SelectItem><SelectItem value="outsourced">Outsourced</SelectItem></SelectContent>
            </Select>
          </Field>
          <Field label="MRP"><Input type="number" placeholder="₹" /></Field>
          <Field label="Active">
            <div className="flex items-center h-9"><Switch defaultChecked /></div>
          </Field>
        </FormGrid>
        <div className="flex justify-end gap-2 mt-3">
          <Button variant="outline" size="sm">Reset</Button>
          <Button size="sm"><Plus className="h-3.5 w-3.5" /> Save Test</Button>
        </div>
      </SectionCard>

      <SectionCard title="Existing Tests" description={`${TEST_MASTER.length} tests configured`}>
        <div className="relative mb-3">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input placeholder="Search by code, name, department..." className="pl-8" />
        </div>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Dept</TableHead>
                <TableHead>Sample</TableHead>
                <TableHead>Container</TableHead>
                <TableHead>TAT</TableHead>
                <TableHead className="text-right">MRP</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {TEST_MASTER.map((t) => (
                <TableRow key={t.code} className="cursor-pointer hover:bg-accent/40">
                  <TableCell className="font-mono text-xs font-medium">{t.code}</TableCell>
                  <TableCell className="font-medium text-sm">{t.name}</TableCell>
                  <TableCell className="text-xs">{t.dept}</TableCell>
                  <TableCell className="text-xs"><Badge variant="secondary">{t.sample}</Badge></TableCell>
                  <TableCell className="text-xs">{t.container}</TableCell>
                  <TableCell className="text-xs font-mono">{t.tat}</TableCell>
                  <TableCell className="text-right font-medium">₹{t.mrp}</TableCell>
                  <TableCell className="text-xs">{t.inhouse ? "In-house" : "Outsourced"}</TableCell>
                  <TableCell><StatusBadge status={t.active ? "Active" : "Inactive"} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </SectionCard>
    </div>
  );
}

function SampleMasterView() {
  return (
    <div className="space-y-4">
      {/* Vial / Container visual reference */}
      <SectionCard
        title="Vial & Container Reference"
        description="Blood samples use colour-coded Vials (Vacutainers) with chemical additives · Stool/Urine/etc. use sterile Containers"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {VIAL_REFERENCE.map((v) => (
            <div key={v.sample} className="rounded-lg border p-3 flex flex-col items-center text-center">
              <VialSvgMini color={v.fluidColor} capColor={v.capColor} size="md" />
              <div className="mt-2 text-xs font-medium">{v.sample}</div>
              <div className="text-[10px] text-muted-foreground leading-tight mt-0.5">{v.additive}</div>
              {v.capColor !== "—" && (
                <Badge variant="outline" className="text-[9px] mt-1">{v.capColor} cap</Badge>
              )}
              <div className="text-[9px] text-muted-foreground mt-1">
                {v.category === "blood" ? "Vial" : "Container"}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="New Sample Type" description="Define sample, vial/container, storage and rejection criteria">
        <FormGrid cols={3}>
          <Field label="Sample Type" required><Input placeholder="Serum / EDTA / Urine..." /></Field>
          <Field label="Sample Category" required>
            <Select defaultValue="blood">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="blood">Blood (Vial)</SelectItem>
                <SelectItem value="urine">Urine (Container)</SelectItem>
                <SelectItem value="stool">Stool (Container)</SelectItem>
                <SelectItem value="swab">Swab</SelectItem>
                <SelectItem value="sputum">Sputum</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Vial / Container" required>
            <Select>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="serum-sst">Vial — Clot Activator (SST) · Yellow</SelectItem>
                <SelectItem value="edta">Vial — K2/K3 EDTA · Purple</SelectItem>
                <SelectItem value="fluoride">Vial — Sodium Fluoride (NaF) · Grey</SelectItem>
                <SelectItem value="citrate">Vial — Sodium Citrate 3.2% · Light Blue</SelectItem>
                <SelectItem value="heparin">Vial — Lithium Heparin · Green</SelectItem>
                <SelectItem value="plain">Vial — Plain · Red</SelectItem>
                <SelectItem value="urine-cup">Container — Sterile Cup (Urine)</SelectItem>
                <SelectItem value="stool-cup">Container — Sterile Container (Stool)</SelectItem>
                <SelectItem value="swab">Container — Swab / Transport Medium</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Additive / Preservative"><Input placeholder="K2 EDTA / NaF / Sodium Citrate..." /></Field>
          <Field label="Cap Colour"><Input placeholder="Purple / Yellow / Grey..." /></Field>
          <Field label="Fluid / Sample Colour"><Input placeholder="#a855f7" /></Field>
          <Field label="Minimum Volume" required><Input placeholder="2 mL" /></Field>
          <Field label="Maximum Volume"><Input placeholder="5 mL" /></Field>
          <Field label="Storage Condition"><Input placeholder="2-8°C" /></Field>
          <Field label="Stability"><Input placeholder="8h" /></Field>
          <Field label="Transportation Temp"><Input placeholder="2-8°C" /></Field>
          <Field label="Processing Requirement"><Input placeholder="Centrifuge within 1h" /></Field>
          <Field label="Rejection Criteria" className="sm:col-span-2 lg:col-span-3"><Textarea rows={2} placeholder="Hemolysed, insufficient, clotted..." /></Field>
        </FormGrid>
      </SectionCard>
      <SectionCard title="Sample Types Catalogue">
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sample</TableHead>
                <TableHead>Vial / Container</TableHead>
                <TableHead>Visual</TableHead>
                <TableHead>Min/Max Vol</TableHead>
                <TableHead>Storage</TableHead>
                <TableHead>Stability</TableHead>
                <TableHead>Transport</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SAMPLE_MASTER.map((s) => {
                // Map sample to vial ref
                const ref = VIAL_REFERENCE.find((v) =>
                  v.sample.toLowerCase().includes(s.type.toLowerCase()) ||
                  s.type.toLowerCase().includes(v.sample.toLowerCase())
                ) || VIAL_REFERENCE[0];
                return (
                  <TableRow key={s.type}>
                    <TableCell className="font-medium text-sm">{s.type}</TableCell>
                    <TableCell className="text-xs">
                      <div className="font-medium">{s.container}</div>
                      {ref && <div className="text-[10px] text-muted-foreground">{ref.additive}</div>}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <VialSvgMini color={s.color} capColor={ref.capColor} />
                        <span className="text-[10px] text-muted-foreground font-mono">{s.color}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs font-mono">{s.minVol} / {s.maxVol}</TableCell>
                    <TableCell className="text-xs">{s.storage}</TableCell>
                    <TableCell className="text-xs">{s.stability}</TableCell>
                    <TableCell className="text-xs">{s.transport}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      </SectionCard>
    </div>
  );
}

function PackageMasterView() {
  return (
    <div className="space-y-4">
      <SectionCard title="New Package / Profile" description="Bundle tests into a package with hierarchical pricing">
        <FormGrid cols={3}>
          <Field label="Package Code" required><Input placeholder="FBP-A" /></Field>
          <Field label="Package Name" required><Input placeholder="Full Body Checkup — Advanced" /></Field>
          <Field label="MRP" required><Input type="number" placeholder="₹" /></Field>
          <Field label="B2C Price"><Input type="number" /></Field>
          <Field label="B2B Price"><Input type="number" /></Field>
          <Field label="Franchise Price"><Input type="number" /></Field>
          <Field label="Sub-Franchise Price"><Input type="number" /></Field>
          <Field label="Discount %"><Input type="number" placeholder="10" /></Field>
          <Field label="Commission %"><Input type="number" placeholder="5" /></Field>
          <Field label="Fasting Required">
            <Select defaultValue="yes"><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="yes">Yes</SelectItem><SelectItem value="no">No</SelectItem></SelectContent>
            </Select>
          </Field>
          <Field label="Gender">
            <Select defaultValue="both"><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="both">Both</SelectItem><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent>
            </Select>
          </Field>
          <Field label="Age Range"><Input placeholder="0 - 120" /></Field>
          <Field label="TAT"><Input placeholder="12h" /></Field>
          <Field label="Tests Included" className="sm:col-span-2 lg:col-span-2">
            <Textarea rows={2} placeholder="CBC, TSH, HbA1c, Lipid Profile, LFT, KFT, Glucose..." />
          </Field>
          <Field label="Sample Types" className="lg:col-span-3">
            <Input placeholder="Serum, EDTA, Fluoride, Urine" />
          </Field>
        </FormGrid>
        <div className="flex justify-end mt-3">
          <Button size="sm"><Plus className="h-3.5 w-3.5" /> Save Package</Button>
        </div>
      </SectionCard>

      <SectionCard title="Packages Catalogue">
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Package Name</TableHead>
                <TableHead className="text-center">Tests</TableHead>
                <TableHead>Fasting</TableHead>
                <TableHead>TAT</TableHead>
                <TableHead className="text-right">MRP</TableHead>
                <TableHead className="text-right">B2C</TableHead>
                <TableHead className="text-right">B2B</TableHead>
                <TableHead className="text-right">Franchise</TableHead>
                <TableHead className="text-right">Sub-Fr.</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PACKAGE_MASTER.map((p) => (
                <TableRow key={p.code} className="cursor-pointer hover:bg-accent/40">
                  <TableCell className="font-mono text-xs font-medium">{p.code}</TableCell>
                  <TableCell className="font-medium text-sm">{p.name}</TableCell>
                  <TableCell className="text-center text-xs">{p.tests}</TableCell>
                  <TableCell className="text-xs">{p.fasting ? "Yes" : "No"}</TableCell>
                  <TableCell className="text-xs font-mono">{p.tat}</TableCell>
                  <TableCell className="text-right text-xs line-through text-muted-foreground">₹{p.mrp}</TableCell>
                  <TableCell className="text-right text-xs font-medium">₹{p.b2c}</TableCell>
                  <TableCell className="text-right text-xs">₹{p.b2b}</TableCell>
                  <TableCell className="text-right text-xs">₹{p.franchise}</TableCell>
                  <TableCell className="text-right text-xs">₹{p.subFranchise}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </SectionCard>
    </div>
  );
}

function RateMasterView() {
  return (
    <div className="space-y-4">
      <SectionCard title="Rate Hierarchy" description="MRP → B2C → B2B → Franchise → Sub-Franchise → Corporate → Camp">
        <FormGrid cols={3}>
          <Field label="Test / Package" required>
            <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                {TEST_MASTER.map((t) => <SelectItem key={t.code} value={t.code}>{t.name}</SelectItem>)}
                {PACKAGE_MASTER.map((p) => <SelectItem key={p.code} value={p.code}>{p.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
          <Field label="MRP" required><Input type="number" /></Field>
          <Field label="B2C Rate"><Input type="number" /></Field>
          <Field label="B2B Rate"><Input type="number" /></Field>
          <Field label="Franchise Rate"><Input type="number" /></Field>
          <Field label="Sub-Franchise Rate"><Input type="number" /></Field>
          <Field label="Special Corporate Rate"><Input type="number" /></Field>
          <Field label="Camp Rate"><Input type="number" /></Field>
          <Field label="Effective From"><Input type="date" /></Field>
          <Field label="Effective To"><Input type="date" /></Field>
          <Field label="GST %"><Input type="number" defaultValue={0} /></Field>
          <Field label="Discount %"><Input type="number" /></Field>
          <Field label="Commission %"><Input type="number" /></Field>
          <Field label="Incentive %"><Input type="number" /></Field>
          <Field label="Margin %"><Input type="number" /></Field>
          <Field label="Minimum Quantity"><Input type="number" /></Field>
          <Field label="Special Rate" className="sm:col-span-2"><Input placeholder="Negotiated corporate rate" /></Field>
        </FormGrid>
      </SectionCard>

      <SectionCard title="Rate Master Catalogue">
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
                <TableHead className="text-right">Sub-Fr.</TableHead>
                <TableHead className="text-right">Corporate</TableHead>
                <TableHead className="text-right">Camp</TableHead>
                <TableHead>Effective</TableHead>
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
                  <TableCell className="text-xs text-muted-foreground font-mono">{r.effective}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </SectionCard>
    </div>
  );
}
