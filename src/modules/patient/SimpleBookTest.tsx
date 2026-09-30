"use client";

import { useState } from "react";
import { PageHeader, SectionCard, Field, FormGrid } from "@/components/common/Layout";
import { useAppStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { TEST_MASTER, PACKAGE_MASTER } from "@/lib/mock-data";
import {
  Search, User, TestTube2, IndianRupee, CheckCircle2,
  ChevronRight, ChevronLeft, Plus, X, Home, Building2, Users, ShoppingCart,
} from "lucide-react";

const STEPS = [
  { id: 1, label: "Patient", icon: User },
  { id: 2, label: "Select Test", icon: TestTube2 },
  { id: 3, label: "Payment", icon: IndianRupee },
  { id: 4, label: "Confirm", icon: CheckCircle2 },
];

export function SimpleBookTest() {
  const navigate = useAppStore((s) => s.navigate);
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [collectionType, setCollectionType] = useState("home");
  const [selectedTests, setSelectedTests] = useState<string[]>(["CBC", "TSH"]);
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [paymentMode, setPaymentMode] = useState("upi");

  const toggleTest = (code: string) => {
    setSelectedTests((s) => s.includes(code) ? s.filter((c) => c !== code) : [...s, code]);
  };
  const togglePackage = (code: string) => {
    setSelectedPackages((s) => s.includes(code) ? s.filter((c) => c !== code) : [...s, code]);
  };

  const mrpTotal = selectedTests.reduce((acc, t) => acc + (TEST_MASTER.find((x) => x.code === t)?.mrp || 0), 0) +
    selectedPackages.reduce((acc, p) => acc + (PACKAGE_MASTER.find((x) => x.code === p)?.b2c || 0), 0);
  const discount = Math.round(mrpTotal * 0.18);
  const finalAmount = mrpTotal - discount;

  const next = () => setStep((s) => Math.min(4, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const confirm = () => {
    toast({
      title: "Booking Confirmed!",
      description: "Order ID: ORD-20260930-00464 • Phlebotomist will be assigned shortly",
    });
    navigate("patient", "pt.orders");
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <PageHeader
        title="Book a Test"
        subtitle="Quick 4-step booking — Patient → Test → Payment → Confirm"
      />

      {/* Stepper */}
      <Card className="p-3">
        <div className="flex items-center justify-between overflow-x-auto scroll-thin gap-1">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center shrink-0">
              <button
                onClick={() => setStep(s.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
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
          {/* Step 1: Patient */}
          {step === 1 && (
            <SectionCard title="Patient Details" description="Just name & mobile — we'll handle the rest">
              <FormGrid cols={2}>
                <Field label="Patient Name" required>
                  <Input placeholder="e.g. Ramesh Patil" defaultValue="Ramesh Patil" />
                </Field>
                <Field label="Mobile Number" required>
                  <Input placeholder="+91" defaultValue="+91 98200 11223" />
                </Field>
                <Field label="Email (optional)">
                  <Input type="email" placeholder="patient@email.com" />
                </Field>
                <Field label="Collection Type" required>
                  <RadioGroup value={collectionType} onValueChange={setCollectionType} className="flex gap-2 pt-1">
                    <div className="flex items-center gap-1.5">
                      <RadioGroupItem value="home" id="home" /><Label htmlFor="home" className="text-xs cursor-pointer">🏠 Home</Label>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <RadioGroupItem value="centre" id="centre" /><Label htmlFor="centre" className="text-xs cursor-pointer">🏢 Centre</Label>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <RadioGroupItem value="walkin" id="walkin" /><Label htmlFor="walkin" className="text-xs cursor-pointer">🚶 Walk-in</Label>
                    </div>
                  </RadioGroup>
                </Field>
                {collectionType === "home" && (
                  <>
                    <Field label="Address" className="sm:col-span-2">
                      <Input placeholder="Flat / Building / Street / Area / Pincode" defaultValue="A-204, Sunrise Apartments, Andheri East 400093" />
                    </Field>
                    <Field label="Preferred Date"><Input type="date" defaultValue="2026-10-01" /></Field>
                    <Field label="Preferred Time Slot">
                      <Select defaultValue="06-08">
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="06-08">06:00 – 08:00 AM</SelectItem>
                          <SelectItem value="08-10">08:00 – 10:00 AM</SelectItem>
                          <SelectItem value="10-12">10:00 – 12:00 PM</SelectItem>
                          <SelectItem value="16-18">04:00 – 06:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  </>
                )}
                {collectionType === "walkin" && (
                  <Field label="Nearest Centre" className="sm:col-span-2">
                    <Select defaultValue="andheri">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="andheri">LabNexus Andheri — Andheri East</SelectItem>
                        <SelectItem value="bandra">LabNexus Bandra — Bandra West</SelectItem>
                        <SelectItem value="powai">LabNexus Powai — Hiranandani</SelectItem>
                        <SelectItem value="thane">LabNexus Thane — Ghodbunder Rd</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              </FormGrid>
            </SectionCard>
          )}

          {/* Step 2: Select Test */}
          {step === 2 && (
            <div className="space-y-4">
              <SectionCard title="Popular Tests" description="Tap to add — tap again to remove">
                <div className="flex flex-wrap gap-2">
                  {TEST_MASTER.slice(0, 8).map((t) => (
                    <button
                      key={t.code}
                      onClick={() => toggleTest(t.code)}
                      className={`rounded-full px-3 py-1.5 text-xs border transition-colors ${
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

              <SectionCard title="Health Packages" description="Save more with bundled tests">
                <div className="space-y-2">
                  {PACKAGE_MASTER.slice(0, 5).map((p) => (
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

              <SectionCard title="All Tests (A-Z)">
                <div className="space-y-1">
                  {TEST_MASTER.map((t) => (
                    <div key={t.code} className="flex items-center justify-between p-2 rounded-md hover:bg-accent/40">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={selectedTests.includes(t.code)}
                          onCheckedChange={() => toggleTest(t.code)}
                        />
                        <div>
                          <div className="text-sm font-medium">{t.name}</div>
                          <div className="text-[10px] text-muted-foreground">{t.dept} • {t.tat} TAT</div>
                        </div>
                      </div>
                      <span className="font-semibold text-sm">₹{t.mrp}</span>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <SectionCard title="Payment" description="Choose how you'd like to pay">
              <FormGrid cols={2}>
                <Field label="Payment Mode" required>
                  <Select value={paymentMode} onValueChange={setPaymentMode}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upi">UPI (GPay / PhonePe / Paytm)</SelectItem>
                      <SelectItem value="card">Debit / Credit Card</SelectItem>
                      <SelectItem value="netbanking">Net Banking</SelectItem>
                      <SelectItem value="cash">Cash on Collection</SelectItem>
                      <SelectItem value="wallet">LabNexus Wallet (₹0)</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Mobile for UPI / OTP">
                  <Input defaultValue="+91 98200 11223" />
                </Field>
              </FormGrid>

              <Separator className="my-3" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">MRP Total</span><span>₹{mrpTotal}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Discount (18%)</span><span className="text-emerald-600">-₹{discount}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Home Collection</span><span>₹0 (Free)</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">GST (Healthcare — 0%)</span><span>₹0</span></div>
                <Separator className="my-1" />
                <div className="flex justify-between font-semibold text-base"><span>Payable Now</span><span>₹{finalAmount}</span></div>
              </div>

              {paymentMode === "upi" && (
                <div className="mt-3 rounded-lg border border-teal-300 bg-teal-50 p-3 text-center">
                  <div className="text-xs text-muted-foreground mb-2">Scan to pay ₹{finalAmount}</div>
                  <div className="h-32 w-32 mx-auto bg-white border-2 rounded-lg flex items-center justify-center">
                    <div className="grid grid-cols-8 gap-px">
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div key={i} className={`w-2 h-2 ${i % 3 === 0 ? "bg-black" : i % 5 === 0 ? "bg-teal-700" : "bg-white"}`} />
                      ))}
                    </div>
                  </div>
                  <div className="text-xs font-mono mt-2">labnexus@upi · Ref: 8829134456</div>
                </div>
              )}
            </SectionCard>
          )}

          {/* Step 4: Confirm */}
          {step === 4 && (
            <SectionCard title="Confirm Your Booking">
              <div className="space-y-3">
                <div className="rounded-lg border p-3 bg-emerald-50 border-emerald-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-700">Ready to book!</span>
                  </div>
                  <div className="text-xs text-emerald-600 mt-1">On confirm, the system will generate Order ID, sample barcodes, and an invoice.</div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  {[
                    ["Patient Name", "Ramesh Patil"],
                    ["Mobile", "+91 98200 11223"],
                    ["Collection", collectionType === "home" ? "Home Collection" : collectionType === "walkin" ? "Walk-in" : "Centre"],
                    ["Date / Time", "2026-10-01, 06-08 AM"],
                    ["Tests", `${selectedTests.length} tests`],
                    ["Packages", `${selectedPackages.length}`],
                    ["MRP", `₹${mrpTotal}`],
                    ["Discount", `-₹${discount}`],
                    ["Net Payable", `₹${finalAmount}`],
                    ["Payment", paymentMode.toUpperCase()],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-md border p-2">
                      <div className="text-[10px] uppercase text-muted-foreground tracking-wider">{k}</div>
                      <div className="font-medium mt-0.5">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionCard>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={back} disabled={step === 1}>
              <ChevronLeft className="h-3.5 w-3.5" /> Back
            </Button>
            {step < 4 ? (
              <Button onClick={next}>
                Next <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            ) : (
              <Button onClick={confirm}>
                <CheckCircle2 className="h-3.5 w-3.5" /> Confirm Booking
              </Button>
            )}
          </div>
        </div>

        {/* Right side: live order summary */}
        <div className="space-y-4">
          <SectionCard title="Order Summary" description="Live calculation">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tests</span>
                <span className="font-medium">{selectedTests.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Packages</span>
                <span className="font-medium">{selectedPackages.length}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between"><span className="text-muted-foreground">MRP</span><span>₹{mrpTotal}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Discount</span><span className="text-emerald-600">-₹{discount}</span></div>
              <Separator className="my-2" />
              <div className="flex justify-between font-semibold text-base"><span>Payable</span><span>₹{finalAmount}</span></div>
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
              {selectedTests.length === 0 && selectedPackages.length === 0 && (
                <div className="text-xs text-muted-foreground text-center py-2">No tests selected yet</div>
              )}
            </div>
          </SectionCard>

          <SectionCard title="Your Booking IDs">
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between"><span className="text-muted-foreground">Order ID</span><span className="font-medium">ORD-20260930-00464</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Patient ID</span><span className="font-medium">PAT-00001245</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Invoice</span><span className="font-medium">INV-2026-00464</span></div>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
