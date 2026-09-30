"use client";

import { useState } from "react";
import { PageHeader, SectionCard, Field, FormGrid } from "@/components/common/Layout";
import { useAppStore } from "@/lib/store";
import {
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { TEST_MASTER, PACKAGE_MASTER } from "@/lib/mock-data";
import {
  Search, User, MapPin, TestTube2, CalendarClock, QrCode, IndianRupee, CheckCircle2,
  ChevronRight, ChevronLeft, Plus, X, Home, Building2, Tent, Users, ArrowRight,
} from "lucide-react";

const STEPS = [
  { id: 1, label: "Customer", icon: User },
  { id: 2, label: "Patient", icon: User },
  { id: 3, label: "Collection", icon: MapPin },
  { id: 4, label: "Tests", icon: TestTube2 },
  { id: 5, label: "Appointment", icon: CalendarClock },
  { id: 6, label: "Sample / Barcode", icon: QrCode },
  { id: 7, label: "Payment", icon: IndianRupee },
  { id: 8, label: "Confirm", icon: CheckCircle2 },
];

export function BookTestWizard({ portal }: { portal: string }) {
  const navigate = useAppStore((s) => s.navigate);
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [patientType, setPatientType] = useState<"existing" | "new">("new");
  const [collectionType, setCollectionType] = useState("home");
  const [selectedTests, setSelectedTests] = useState<string[]>(["CBC", "TSH"]);
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [paymentMode, setPaymentMode] = useState("wallet");

  const toggleTest = (code: string) => {
    setSelectedTests((s) => s.includes(code) ? s.filter((c) => c !== code) : [...s, code]);
  };
  const togglePackage = (code: string) => {
    setSelectedPackages((s) => s.includes(code) ? s.filter((c) => c !== code) : [...s, code]);
  };

  const totalTests = selectedTests.length + selectedPackages.reduce((acc, p) => acc + (PACKAGE_MASTER.find((x) => x.code === p)?.tests || 0), 0);
  const mrpTotal = selectedTests.reduce((acc, t) => acc + (TEST_MASTER.find((x) => x.code === t)?.mrp || 0), 0) +
    selectedPackages.reduce((acc, p) => acc + (PACKAGE_MASTER.find((x) => x.code === p)?.mrp || 0), 0);
  const franchiseTotal = selectedTests.reduce((acc, t) => acc + (TEST_MASTER.find((x) => x.code === t)?.mrp || 0) * 0.6, 0) +
    selectedPackages.reduce((acc, p) => acc + (PACKAGE_MASTER.find((x) => x.code === p)?.franchise || 0), 0);
  const finalAmount = Math.round(franchiseTotal);

  const next = () => setStep((s) => Math.min(8, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const confirm = () => {
    toast({
      title: "Order Created Successfully",
      description: `Order ID: ORD-20260930-00464 • Sample ID: SMP-20260930-00992`,
    });
    navigate(portal as any, portal === "super-admin" ? "sa.orders" : "fr.orders");
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title="Book Test / Create Order"
        subtitle="Follow the multi-step flow — Customer → Patient → Collection → Tests → Appointment → Sample → Payment → Confirm"
        actions={
          <Button size="sm" variant="outline" onClick={() => navigate(portal as any, portal === "super-admin" ? "sa.orders" : "fr.orders")}>
            Cancel
          </Button>
        }
      />

      {/* Stepper */}
      <Card className="p-3">
        <div className="flex items-center overflow-x-auto scroll-thin gap-1">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center shrink-0">
              <button
                onClick={() => setStep(s.id)}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  step === s.id
                    ? "bg-primary text-primary-foreground"
                    : step > s.id
                      ? "text-emerald-600"
                      : "text-muted-foreground hover:bg-accent"
                }`}
              >
                <div className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] ${
                  step === s.id ? "bg-primary-foreground text-primary" :
                  step > s.id ? "bg-emerald-500 text-white" : "bg-muted"
                }`}>
                  {step > s.id ? <CheckCircle2 className="h-3 w-3" /> : s.id}
                </div>
                {s.label}
              </button>
              {i < STEPS.length - 1 && <ChevronRight className="h-3 w-3 text-muted-foreground/50 mx-1" />}
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          {/* Step 1: Customer */}
          {step === 1 && (
            <SectionCard title="Select Customer">
              <RadioGroup value={patientType} onValueChange={(v) => setPatientType(v as any)}>
                <div className="grid grid-cols-2 gap-3">
                  <Label htmlFor="existing" className="cursor-pointer">
                    <div className={`rounded-lg border p-3 ${patientType === "existing" ? "border-primary bg-accent/30" : ""}`}>
                      <RadioGroupItem value="existing" id="existing" className="mb-2" />
                      <div className="font-medium text-sm">Existing Patient</div>
                      <div className="text-xs text-muted-foreground mt-0.5">Search by Mobile / Patient ID</div>
                    </div>
                  </Label>
                  <Label htmlFor="new" className="cursor-pointer">
                    <div className={`rounded-lg border p-3 ${patientType === "new" ? "border-primary bg-accent/30" : ""}`}>
                      <RadioGroupItem value="new" id="new" className="mb-2" />
                      <div className="font-medium text-sm">New Patient</div>
                      <div className="text-xs text-muted-foreground mt-0.5">Register a new patient</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>

              {patientType === "existing" && (
                <div className="mt-4 space-y-3">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <Input placeholder="Search by Mobile / Patient ID / Name" className="pl-8" />
                  </div>
                  <div className="rounded-lg border divide-y">
                    {[
                      { id: "PAT-00001245", name: "Ramesh Patil", mobile: "+91 98200 11223", age: 42 },
                      { id: "PAT-00001247", name: "Mohammed Khan", mobile: "+91 98200 44556", age: 35 },
                      { id: "PAT-00001250", name: "Priya Singh", mobile: "+91 98200 77889", age: 29 },
                    ].map((p) => (
                      <div key={p.id} className="flex items-center justify-between p-2.5 hover:bg-accent/40 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                            {p.name.split(" ").map((w) => w[0]).join("")}
                          </div>
                          <div>
                            <div className="text-sm font-medium">{p.name}</div>
                            <div className="text-xs text-muted-foreground font-mono">{p.id} • {p.mobile}</div>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs">{p.age}y / M</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {patientType === "new" && (
                <div className="mt-4 text-sm text-muted-foreground">
                  New patient registration will be captured in the next step.
                </div>
              )}
            </SectionCard>
          )}

          {/* Step 2: Patient */}
          {step === 2 && (
            <SectionCard title="Patient Details">
              <FormGrid cols={3}>
                <Field label="Full Name" required>
                  <Input placeholder="e.g. Ramesh Patil" defaultValue="Ramesh Patil" />
                </Field>
                <Field label="Date of Birth" required>
                  <Input type="date" defaultValue="1984-03-15" />
                </Field>
                <Field label="Age" required>
                  <Input defaultValue="42" />
                </Field>
                <Field label="Gender" required>
                  <Select defaultValue="male">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Mobile" required>
                  <Input placeholder="+91" defaultValue="+91 98200 11223" />
                </Field>
                <Field label="Alternate Mobile">
                  <Input placeholder="+91" />
                </Field>
                <Field label="Email">
                  <Input type="email" placeholder="patient@email.com" />
                </Field>
                <Field label="Blood Group">
                  <Select defaultValue="b+">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((b) => (
                        <SelectItem key={b} value={b}>{b}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="ID Proof Type">
                  <Select defaultValue="aadhaar">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aadhaar">Aadhaar</SelectItem>
                      <SelectItem value="pan">PAN</SelectItem>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="driving">Driving License</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="ID Number">
                  <Input placeholder="XXXX-XXXX-XXXX" />
                </Field>
                <Field label="Emergency Contact">
                  <Input placeholder="+91" />
                </Field>
                <Field label="Address" className="sm:col-span-2 lg:col-span-3">
                  <Textarea placeholder="Full address" rows={2} />
                </Field>
                <Field label="Pincode">
                  <Input placeholder="400093" />
                </Field>
                <Field label="City">
                  <Input defaultValue="Mumbai" />
                </Field>
                <Field label="State">
                  <Input defaultValue="Maharashtra" />
                </Field>
              </FormGrid>

              <Separator className="my-4" />
              <h4 className="text-sm font-medium mb-3">Medical Information (Optional)</h4>
              <FormGrid cols={3}>
                <Field label="Referring Doctor">
                  <Input placeholder="Dr. Ramesh Sharma" />
                </Field>
                <Field label="Hospital">
                  <Input placeholder="Lilavati Hospital" />
                </Field>
                <Field label="Corporate">
                  <Input placeholder="—" />
                </Field>
                <Field label="Existing Conditions">
                  <Input placeholder="Diabetes, Hypertension..." />
                </Field>
                <Field label="Allergies">
                  <Input placeholder="—" />
                </Field>
                <Field label="Current Medication">
                  <Input placeholder="—" />
                </Field>
                <Field label="Pregnancy Status">
                  <Select defaultValue="no">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no">N/A</SelectItem>
                      <SelectItem value="yes">Pregnant</SelectItem>
                      <SelectItem value="lactating">Lactating</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Fasting Status">
                  <Select defaultValue="fasting">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fasting">Fasting</SelectItem>
                      <SelectItem value="non-fasting">Non-Fasting</SelectItem>
                      <SelectItem value="random">Random</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Patient Notes">
                  <Input placeholder="Special instructions" />
                </Field>
              </FormGrid>
            </SectionCard>
          )}

          {/* Step 3: Collection */}
          {step === 3 && (
            <SectionCard title="Collection Type">
              <RadioGroup value={collectionType} onValueChange={setCollectionType}>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { id: "home", label: "Home Collection", desc: "Phlebotomist visits patient", icon: Home },
                    { id: "centre", label: "Collection Centre", desc: "Patient visits franchise", icon: Building2 },
                    { id: "walkin", label: "Walk-in Lab", desc: "Direct walk-in to lab", icon: Users },
                    { id: "camp", label: "Camp", desc: "Health camp booking", icon: Tent },
                    { id: "corporate", label: "Corporate", desc: "Employee health checkup", icon: Building2 },
                    { id: "franchise", label: "Franchise Collection", desc: "Franchise-managed collection", icon: Users },
                  ].map((c) => (
                    <Label key={c.id} htmlFor={c.id} className="cursor-pointer">
                      <div className={`rounded-lg border p-3 h-full ${collectionType === c.id ? "border-primary bg-accent/30" : ""}`}>
                        <RadioGroupItem value={c.id} id={c.id} className="mb-2" />
                        <c.icon className="h-4 w-4 mb-1.5 text-primary" />
                        <div className="font-medium text-sm">{c.label}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{c.desc}</div>
                      </div>
                    </Label>
                  ))}
                </div>
              </RadioGroup>

              <Separator className="my-4" />
              {collectionType === "home" && (
                <FormGrid cols={2}>
                  <Field label="Collection Address" className="sm:col-span-2">
                    <Textarea rows={2} placeholder="Flat / Building / Street / Area" defaultValue="A-204, Sunrise Apartments, Andheri East" />
                  </Field>
                  <Field label="Pincode">
                    <Input defaultValue="400093" />
                  </Field>
                  <Field label="GPS Location">
                    <Input defaultValue="19.1136, 72.8697" readOnly />
                  </Field>
                  <Field label="Landmark">
                    <Input placeholder="Near Metro Station" />
                  </Field>
                  <Field label="Special Instructions">
                    <Input placeholder="e.g. elderly patient, 2nd floor no lift" />
                  </Field>
                </FormGrid>
              )}
            </SectionCard>
          )}

          {/* Step 4: Tests */}
          {step === 4 && (
            <div className="space-y-4">
              <SectionCard title="Search & Add Tests" description="Search individual tests or pick popular chips">
                <div className="relative mb-3">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input placeholder="Search test / package / profile..." className="pl-8" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {TEST_MASTER.slice(0, 8).map((t) => (
                    <button
                      key={t.code}
                      onClick={() => toggleTest(t.code)}
                      className={`rounded-full px-3 py-1 text-xs border transition-colors ${
                        selectedTests.includes(t.code)
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card hover:bg-accent"
                      }`}
                    >
                      {t.name} · ₹{t.mrp}
                    </button>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="Available Tests">
                <div className="space-y-2">
                  {TEST_MASTER.map((t) => (
                    <div key={t.code} className="flex items-center justify-between p-2.5 rounded-md border text-xs">
                      <div className="flex items-center gap-3 min-w-0">
                        <Checkbox
                          checked={selectedTests.includes(t.code)}
                          onCheckedChange={() => toggleTest(t.code)}
                        />
                        <div className="min-w-0">
                          <div className="font-medium text-sm truncate">{t.name}</div>
                          <div className="text-muted-foreground">{t.dept} • {t.sample} • TAT {t.tat}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <Badge variant="outline" className="text-xs">{t.container}</Badge>
                        <span className="font-semibold">₹{t.mrp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="Packages / Profiles">
                <div className="space-y-2">
                  {PACKAGE_MASTER.map((p) => (
                    <div key={p.code} className="flex items-center justify-between p-2.5 rounded-md border text-xs">
                      <div className="flex items-center gap-3 min-w-0">
                        <Checkbox
                          checked={selectedPackages.includes(p.code)}
                          onCheckedChange={() => togglePackage(p.code)}
                        />
                        <div className="min-w-0">
                          <div className="font-medium text-sm truncate">{p.name}</div>
                          <div className="text-muted-foreground">{p.tests} tests • TAT {p.tat} • {p.fasting ? "Fasting" : "Non-fasting"}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-muted-foreground line-through">₹{p.mrp}</span>
                        <span className="font-semibold text-primary">₹{p.b2c}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>
          )}

          {/* Step 5: Appointment */}
          {step === 5 && (
            <SectionCard title="Appointment">
              <FormGrid cols={2}>
                <Field label="Collection Date" required>
                  <Input type="date" defaultValue="2026-09-30" />
                </Field>
                <Field label="Time Slot" required>
                  <Select defaultValue="10-12">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="06-08">06:00 – 08:00 AM</SelectItem>
                      <SelectItem value="08-10">08:00 – 10:00 AM</SelectItem>
                      <SelectItem value="10-12">10:00 – 12:00 PM</SelectItem>
                      <SelectItem value="12-14">12:00 – 02:00 PM</SelectItem>
                      <SelectItem value="14-16">02:00 – 04:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Collection Executive">
                  <Select defaultValue="auto">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto-assign</SelectItem>
                      <SelectItem value="r42">Phlebotomist R-42 (Andheri)</SelectItem>
                      <SelectItem value="r43">Phlebotomist R-43 (Bandra)</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Pickup Priority">
                  <Select defaultValue="normal">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="stat">STAT</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Special Instructions" className="sm:col-span-2">
                  <Textarea rows={2} placeholder="Fasting, medication, mobility..." />
                </Field>
              </FormGrid>
            </SectionCard>
          )}

          {/* Step 6: Sample/Barcode */}
          {step === 6 && (
            <SectionCard title="Sample & Barcode">
              <p className="text-xs text-muted-foreground mb-3">Barcodes are auto-generated based on selected tests and sample types. Verify before printing.</p>
              <div className="space-y-2">
                {[
                  { sample: "SERUM", vial: "Yellow SST", barcode: "8901234567890", tests: "TSH, LIP, LFT, KFT" },
                  { sample: "EDTA", vial: "Purple (K2 EDTA)", barcode: "8901234567891", tests: "CBC, HbA1c" },
                  { sample: "FLUORIDE", vial: "Grey (NaF)", barcode: "8901234567892", tests: "Fasting Glucose" },
                ].map((s) => (
                  <div key={s.barcode} className="rounded-lg border p-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <TestTube2 className="h-5 w-5 text-primary" />
                      <div className="min-w-0">
                        <div className="font-medium text-sm">{s.sample}</div>
                        <div className="text-xs text-muted-foreground">{s.vial} • {s.tests}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex flex-col items-center">
                        <div className="h-8 w-32 bg-black rounded flex items-center gap-px px-1">
                          {Array.from({ length: 24 }).map((_, i) => (
                            <div
                              key={i}
                              style={{ width: `${1 + (i % 3)}px` }}
                              className={i % 4 === 0 ? "bg-white h-full" : "bg-white h-full"}
                            />
                          ))}
                        </div>
                        <div className="text-[10px] font-mono mt-0.5">{s.barcode}</div>
                      </div>
                      <Button size="sm" variant="outline">Print</Button>
                    </div>
                  </div>
                ))}
              </div>
              <Separator className="my-3" />
              <FormGrid cols={2}>
                <Field label="Collection OTP (sent to patient)">
                  <Input placeholder="6-digit OTP" />
                </Field>
                <Field label="Collector Signature">
                  <Input placeholder="Draw / upload signature" />
                </Field>
              </FormGrid>
            </SectionCard>
          )}

          {/* Step 7: Payment */}
          {step === 7 && (
            <SectionCard title="Payment Summary">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">MRP Total</span><span>₹{mrpTotal}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Franchise Discount</span><span>-₹{mrpTotal - finalAmount}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Collection Charge</span><span>₹0</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">GST (Healthcare — 0%)</span><span>₹0</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Wallet Adjustment</span><span>-₹0</span></div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-semibold text-base"><span>Net Payable</span><span>₹{finalAmount}</span></div>
                </div>
                <div>
                  <Field label="Payment Mode">
                    <Select value={paymentMode} onValueChange={setPaymentMode}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wallet">Wallet (₹29,250 available)</SelectItem>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="upi">UPI</SelectItem>
                        <SelectItem value="card">Card</SelectItem>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                        <SelectItem value="credit">Credit (B2B)</SelectItem>
                        <SelectItem value="gateway">Payment Gateway</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Amount Received" className="mt-3">
                    <Input type="number" defaultValue={finalAmount} />
                  </Field>
                  {paymentMode === "credit" && (
                    <Field label="Credit Days" className="mt-3">
                      <Select defaultValue="15">
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">7 days</SelectItem>
                          <SelectItem value="15">15 days</SelectItem>
                          <SelectItem value="30">30 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  )}
                </div>
              </div>
            </SectionCard>
          )}

          {/* Step 8: Confirm */}
          {step === 8 && (
            <SectionCard title="Review & Confirm">
              <div className="space-y-3">
                <div className="rounded-lg border p-3 bg-emerald-50 border-emerald-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-700">Order ready to be created</span>
                  </div>
                  <div className="text-xs text-emerald-600 mt-1">On confirm, the system will generate: Order ID, Sample IDs, Barcodes, Invoice and Collection Slip.</div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <ReviewRow label="Patient" value="Ramesh Patil (PAT-00001245)" />
                  <ReviewRow label="Mobile" value="+91 98200 11223" />
                  <ReviewRow label="Collection" value="Home Collection — 10:00-12:00 AM" />
                  <ReviewRow label="Address" value="A-204, Sunrise Apartments, Andheri E" />
                  <ReviewRow label="Tests / Packages" value={`${selectedTests.length} tests + ${selectedPackages.length} packages (${totalTests} investigations)`} />
                  <ReviewRow label="Sample Types" value="SERUM, EDTA, FLUORIDE" />
                  <ReviewRow label="MRP" value={`₹${mrpTotal}`} />
                  <ReviewRow label="Net Payable" value={`₹${finalAmount}`} />
                  <ReviewRow label="Payment Mode" value={paymentMode.toUpperCase()} />
                  <ReviewRow label="Phlebotomist" value="Auto-assigned" />
                </div>
              </div>
            </SectionCard>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={back} disabled={step === 1}>
              <ChevronLeft className="h-3.5 w-3.5" /> Back
            </Button>
            {step < 8 ? (
              <Button onClick={next}>
                Next <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            ) : (
              <Button onClick={confirm}>
                <CheckCircle2 className="h-3.5 w-3.5" /> Confirm Order
              </Button>
            )}
          </div>
        </div>

        {/* Right summary */}
        <div className="space-y-4">
          <SectionCard title="Order Summary" description="Live calculation">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tests Selected</span>
                <span className="font-medium">{selectedTests.length} ({totalTests} params)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Packages</span>
                <span className="font-medium">{selectedPackages.length}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between"><span className="text-muted-foreground">MRP Total</span><span>₹{mrpTotal}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Discount</span><span className="text-emerald-600">-₹{mrpTotal - finalAmount}</span></div>
              <Separator className="my-2" />
              <div className="flex justify-between font-semibold text-base"><span>Net</span><span>₹{finalAmount}</span></div>
            </div>
            <Separator className="my-3" />
            <div className="space-y-1.5">
              {selectedTests.map((c) => {
                const t = TEST_MASTER.find((x) => x.code === c);
                return (
                  <div key={c} className="flex items-center justify-between text-xs">
                    <span>{t?.name}</span>
                    <span>₹{t?.mrp}</span>
                  </div>
                );
              })}
              {selectedPackages.map((c) => {
                const p = PACKAGE_MASTER.find((x) => x.code === c);
                return (
                  <div key={c} className="flex items-center justify-between text-xs">
                    <span>{p?.name}</span>
                    <span>₹{p?.b2c}</span>
                  </div>
                );
              })}
            </div>
          </SectionCard>

          <SectionCard title="IDs Preview">
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between"><span className="text-muted-foreground">Order ID</span><span className="font-medium">ORD-20260930-00464</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Patient ID</span><span className="font-medium">PAT-00001245</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Sample ID</span><span className="font-medium">SMP-20260930-00992</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Barcode</span><span className="font-medium">8901234567890</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Invoice</span><span className="font-medium">INV-2026-00464</span></div>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border p-2">
      <div className="text-[10px] uppercase text-muted-foreground tracking-wider">{label}</div>
      <div className="font-medium mt-0.5">{value}</div>
    </div>
  );
}
