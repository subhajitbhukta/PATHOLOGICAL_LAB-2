// Centralized mock data for the entire platform.
// All values are illustrative/sample only.

export const PORTALS = [
  { id: "super-admin", name: "Super Admin", short: "Admin", color: "teal" },
  { id: "franchise", name: "Franchise", short: "Franchise", color: "violet" },
  { id: "patient", name: "Patient", short: "Patient", color: "emerald" },
  { id: "logistics", name: "Logistics", short: "Logistics", color: "amber" },
  { id: "pathologist", name: "Pathologist", short: "Path", color: "rose" },
] as const;

export const SUPER_ADMIN_KPI = [
  { label: "Today's Orders", value: "1,245", delta: "+8.2%", trend: "up" },
  { label: "Today's Patients", value: "1,089", delta: "+5.4%", trend: "up" },
  { label: "Samples Collected", value: "982", delta: "+3.1%", trend: "up" },
  { label: "Samples Received", value: "871", delta: "+1.8%", trend: "up" },
  { label: "Samples Processing", value: "743", delta: "+4.6%", trend: "up" },
  { label: "Reports Pending", value: "42", delta: "-12", trend: "down" },
  { label: "Reports Released", value: "539", delta: "+11.2%", trend: "up" },
  { label: "Delayed Reports", value: "18", delta: "+3", trend: "up", warn: true },
  { label: "Rejected Samples", value: "11", delta: "+2", trend: "up", warn: true },
  { label: "Critical Results", value: "6", delta: "+1", trend: "up", warn: true },
  { label: "Today's Revenue", value: "₹4.82L", delta: "+9.1%", trend: "up" },
  { label: "Wallet Collection", value: "₹2.17L", delta: "+6.7%", trend: "up" },
  { label: "Outstanding", value: "₹18.4L", delta: "-2.3%", trend: "down" },
  { label: "Franchise Revenue", value: "₹2.94L", delta: "+7.8%", trend: "up" },
];

export const ORDER_PIPELINE = [
  { stage: "Booked", count: 1245, color: "bg-slate-400" },
  { stage: "Collected", count: 982, color: "bg-amber-500" },
  { stage: "Processing", count: 743, color: "bg-teal-500" },
  { stage: "Validated", count: 581, color: "bg-violet-500" },
  { stage: "Released", count: 539, color: "bg-emerald-600" },
  { stage: "Pending", count: 42, color: "bg-rose-500" },
];

export const TAT_DASHBOARD = {
  averageTAT: "4h 12m",
  breachCount: 18,
  criticalPending: 6,
  byTest: [
    { test: "CBC", avg: "1h 45m", breach: 1 },
    { test: "Lipid Profile", avg: "3h 20m", breach: 2 },
    { test: "TSH", avg: "5h 10m", breach: 4 },
    { test: "HbA1c", avg: "2h 50m", breach: 1 },
    { test: "Vitamin D", avg: "6h 30m", breach: 5 },
    { test: "LFT", avg: "3h 05m", breach: 2 },
    { test: "KFT", avg: "3h 15m", breach: 1 },
    { test: "Urine Routine", avg: "1h 20m", breach: 0 },
  ],
  byLab: [
    { lab: "Central Lab — Mumbai", avg: "3h 50m", breach: 8 },
    { lab: "Hub — Pune", avg: "4h 30m", breach: 5 },
    { lab: "Hub — Nashik", avg: "5h 10m", breach: 5 },
  ],
  byPathologist: [
    { name: "Dr. Mehta, R.", pending: 6 },
    { name: "Dr. Iyer, S.", pending: 4 },
    { name: "Dr. Khan, A.", pending: 3 },
    { name: "Dr. Nair, P.", pending: 5 },
  ],
};

export const REVENUE_LAST_7D = [
  { day: "Mon", b2c: 38, b2b: 64, franchise: 92 },
  { day: "Tue", b2c: 42, b2b: 71, franchise: 105 },
  { day: "Wed", b2c: 51, b2b: 68, franchise: 118 },
  { day: "Thu", b2c: 48, b2b: 79, franchise: 124 },
  { day: "Fri", b2c: 62, b2b: 88, franchise: 142 },
  { day: "Sat", b2c: 74, b2b: 95, franchise: 168 },
  { day: "Sun", b2c: 35, b2b: 41, franchise: 78 },
];

export const DEPARTMENT_VOLUME = [
  { name: "Biochemistry", value: 412, color: "#0d9488" },
  { name: "Hematology", value: 298, color: "#8b5cf6" },
  { name: "Serology", value: 187, color: "#f59e0b" },
  { name: "Immunology", value: 142, color: "#10b981" },
  { name: "Microbiology", value: 76, color: "#ef4444" },
  { name: "Hormones", value: 121, color: "#6366f1" },
  { name: "Clinical Path.", value: 54, color: "#ec4899" },
  { name: "Molecular", value: 38, color: "#14b8a6" },
];

export const TEST_MASTER = [
  { code: "CBC", name: "Complete Blood Count", dept: "Hematology", sample: "EDTA", container: "Vial — K2/K3 EDTA · Purple", tat: "2h", mrp: 350, inhouse: true, active: true },
  { code: "LIP", name: "Lipid Profile", dept: "Biochemistry", sample: "Serum", container: "Vial — Clot Activator (SST) · Yellow", tat: "4h", mrp: 800, inhouse: true, active: true },
  { code: "TSH", name: "Thyroid Stimulating Hormone", dept: "Hormones", sample: "Serum", container: "Vial — Clot Activator (SST) · Yellow", tat: "6h", mrp: 650, inhouse: true, active: true },
  { code: "HBA1", name: "HbA1c", dept: "Biochemistry", sample: "EDTA", container: "Vial — K2/K3 EDTA · Purple", tat: "3h", mrp: 550, inhouse: true, active: true },
  { code: "VITD", name: "Vitamin D Total", dept: "Immunology", sample: "Serum", container: "Vial — Clot Activator (SST) · Yellow", tat: "8h", mrp: 1200, inhouse: false, active: true },
  { code: "LFT", name: "Liver Function Test", dept: "Biochemistry", sample: "Serum", container: "Vial — Clot Activator (SST) · Yellow", tat: "3h", mrp: 700, inhouse: true, active: true },
  { code: "KFT", name: "Kidney Function Test", dept: "Biochemistry", sample: "Serum", container: "Vial — Clot Activator (SST) · Yellow", tat: "3h", mrp: 700, inhouse: true, active: true },
  { code: "URINE", name: "Urine Routine", dept: "Clinical Path.", sample: "Urine", container: "Container — Sterile Cup", tat: "2h", mrp: 150, inhouse: true, active: true },
  { code: "T3", name: "Triiodothyronine", dept: "Hormones", sample: "Serum", container: "Vial — Clot Activator (SST) · Yellow", tat: "6h", mrp: 450, inhouse: true, active: true },
  { code: "T4", name: "Thyroxine", dept: "Hormones", sample: "Serum", container: "Vial — Clot Activator (SST) · Yellow", tat: "6h", mrp: 450, inhouse: true, active: true },
  { code: "GLU", name: "Fasting Blood Glucose", dept: "Biochemistry", sample: "Sodium Fluoride", container: "Vial — Sodium Fluoride (NaF) · Grey", tat: "1h", mrp: 120, inhouse: true, active: true },
  { code: "PSA", name: "Prostate Specific Ag", dept: "Immunology", sample: "Serum", container: "Vial — Clot Activator (SST) · Yellow", tat: "8h", mrp: 800, inhouse: false, active: true },
];

export const SAMPLE_MASTER = [
  { type: "Serum", container: "Vial — Clot Activator (SST) · Yellow cap", color: "#facc15", minVol: "2 mL", maxVol: "5 mL", storage: "2-8°C", stability: "8h", transport: "2-8°C" },
  { type: "EDTA", container: "Vial — K2/K3 EDTA · Purple cap", color: "#a855f7", minVol: "2 mL", maxVol: "4 mL", storage: "RT", stability: "6h", transport: "RT" },
  { type: "Sodium Fluoride", container: "Vial — Sodium Fluoride (NaF) · Grey cap", color: "#94a3b8", minVol: "2 mL", maxVol: "4 mL", storage: "RT", stability: "24h", transport: "RT" },
  { type: "Citrate", container: "Vial — Sodium Citrate 3.2% · Light Blue cap", color: "#60a5fa", minVol: "3 mL", maxVol: "5 mL", storage: "RT", stability: "4h", transport: "RT" },
  { type: "Urine", container: "Container — Sterile Cup (Urine)", color: "#fde68a", minVol: "10 mL", maxVol: "50 mL", storage: "RT", stability: "2h", transport: "2-8°C" },
  { type: "Stool", container: "Container — Sterile Container (Stool)", color: "#a3a3a3", minVol: "5 g", maxVol: "20 g", storage: "2-8°C", stability: "2h", transport: "2-8°C" },
  { type: "Heparin / Plasma", container: "Vial — Lithium Heparin · Green cap", color: "#22c55e", minVol: "2 mL", maxVol: "5 mL", storage: "2-8°C", stability: "4h", transport: "2-8°C" },
  { type: "Whole Blood", container: "Vial — K2/K3 EDTA · Purple cap", color: "#7c3aed", minVol: "2 mL", maxVol: "4 mL", storage: "RT", stability: "6h", transport: "RT" },
];

export const PACKAGE_MASTER = [
  { code: "FBP-A", name: "Full Body Checkup — Advanced", mrp: 3499, b2b: 1750, b2c: 2999, franchise: 2100, subFranchise: 2450, tests: 64, fasting: true, tat: "12h" },
  { code: "FBP-S", name: "Full Body Checkup — Standard", mrp: 1999, b2b: 950, b2c: 1699, franchise: 1150, subFranchise: 1380, tests: 48, fasting: true, tat: "10h" },
  { code: "DIA-S", name: "Diabetes Screen", mrp: 1299, b2b: 620, b2c: 999, franchise: 750, subFranchise: 880, tests: 12, fasting: true, tat: "4h" },
  { code: "THY-P", name: "Thyroid Profile Plus", mrp: 1499, b2b: 720, b2c: 1199, franchise: 870, subFranchise: 1010, tests: 6, fasting: false, tat: "6h" },
  { code: "LIP-C", name: "Lipid & Cardiac", mrp: 1799, b2b: 850, b2c: 1499, franchise: 1010, subFranchise: 1180, tests: 9, fasting: true, tat: "5h" },
  { code: "VIT-D", name: "Vitamin Profile", mrp: 2499, b2b: 1180, b2c: 2099, franchise: 1410, subFranchise: 1650, tests: 4, fasting: false, tat: "10h" },
  { code: "WOM", name: "Women's Wellness", mrp: 3999, b2b: 1900, b2c: 3499, franchise: 2280, subFranchise: 2660, tests: 38, fasting: true, tat: "14h" },
  { code: "MEN", name: "Men's Wellness", mrp: 3799, b2b: 1800, b2c: 3299, franchise: 2160, subFranchise: 2520, tests: 35, fasting: true, tat: "14h" },
];

export const RATE_MASTER = [
  { code: "CBC", name: "Complete Blood Count", mrp: 350, b2c: 280, b2b: 175, franchise: 210, subFranchise: 245, corporate: 195, camp: 165, effective: "2026-04-01" },
  { code: "TSH", name: "Thyroid Stimulating Hormone", mrp: 650, b2c: 520, b2b: 325, franchise: 390, subFranchise: 455, corporate: 360, camp: 305, effective: "2026-04-01" },
  { code: "LIP", name: "Lipid Profile", mrp: 800, b2c: 640, b2b: 400, franchise: 480, subFranchise: 560, corporate: 440, camp: 375, effective: "2026-04-01" },
  { code: "HBA1", name: "HbA1c", mrp: 550, b2c: 440, b2b: 275, franchise: 330, subFranchise: 385, corporate: 305, camp: 260, effective: "2026-04-01" },
  { code: "VITD", name: "Vitamin D Total", mrp: 1200, b2c: 960, b2b: 600, franchise: 720, subFranchise: 840, corporate: 660, camp: 560, effective: "2026-04-01" },
];

export const ORDERS = [
  { id: "ORD-20260930-00452", patient: "Ramesh Patil", patientId: "PAT-00001245", doctor: "Dr. Sharma", franchise: "Andheri Health Hub", tests: 3, amount: 1850, status: "Released", payment: "Paid", collected: "10:32 AM", released: "05:45 PM" },
  { id: "ORD-20260930-00453", patient: "Anita Desai", patientId: "PAT-00001246", doctor: "Dr. Iyer", franchise: "Bandra Care Hub", tests: 5, amount: 3499, status: "Pathologist Review", payment: "Paid", collected: "11:05 AM", released: "—" },
  { id: "ORD-20260930-00454", patient: "Mohammed Khan", patientId: "PAT-00001247", doctor: "Self", franchise: "Direct B2C", tests: 2, amount: 1100, status: "Processing", payment: "Paid", collected: "11:45 AM", released: "—" },
  { id: "ORD-20260930-00455", patient: "Sunita Rao", patientId: "PAT-00001248", doctor: "Dr. Mehta", franchise: "Powai MedLab", tests: 8, amount: 4299, status: "Result Pending", payment: "Credit", collected: "12:10 PM", released: "—" },
  { id: "ORD-20260930-00456", patient: "Vijay Mehta", patientId: "PAT-00001249", doctor: "Dr. Nair", franchise: "Andheri Health Hub", tests: 1, amount: 350, status: "Collected", payment: "Paid", collected: "12:35 PM", released: "—" },
  { id: "ORD-20260930-00457", patient: "Priya Singh", patientId: "PAT-00001250", doctor: "Self", franchise: "Direct B2C", tests: 4, amount: 2299, status: "In Transit", payment: "Paid", collected: "01:00 PM", released: "—" },
  { id: "ORD-20260930-00458", patient: "Arjun Nair", patientId: "PAT-00001251", doctor: "Dr. Iyer", franchise: "Bandra Care Hub", tests: 6, amount: 3799, status: "Accessioned", payment: "Paid", collected: "01:15 PM", released: "—" },
  { id: "ORD-20260930-00459", patient: "Kavya Reddy", patientId: "PAT-00001252", doctor: "Self", franchise: "Direct B2C", tests: 3, amount: 1699, status: "Booked", payment: "Pending", collected: "—", released: "—" },
  { id: "ORD-20260930-00460", patient: "Rohit Joshi", patientId: "PAT-00001253", doctor: "Dr. Sharma", franchise: "Powai MedLab", tests: 2, amount: 999, status: "Rejected", payment: "Paid", collected: "02:00 PM", released: "—" },
  { id: "ORD-20260930-00461", patient: "Meera Iyer", patientId: "PAT-00001254", doctor: "Dr. Mehta", franchise: "Andheri Health Hub", tests: 5, amount: 2899, status: "Approved", payment: "Paid", collected: "02:25 PM", released: "—" },
  { id: "ORD-20260930-00462", patient: "Suresh Pillai", patientId: "PAT-00001255", doctor: "Dr. Khan", franchise: "Bandra Care Hub", tests: 4, amount: 2099, status: "Validation Pending", payment: "Paid", collected: "02:50 PM", released: "—" },
  { id: "ORD-20260930-00463", patient: "Lakshmi Menon", patientId: "PAT-00001256", doctor: "Self", franchise: "Direct B2C", tests: 7, amount: 3699, status: "Cancelled", payment: "Refunded", collected: "—", released: "—" },
];

export const ORDER_STATUSES = [
  "Draft", "Booked", "Confirmed", "Assigned", "Collection Pending",
  "Collected", "Pickup Pending", "In Transit", "Received", "Accessioned",
  "Processing", "Result Pending", "Validation Pending", "Pathologist Review",
  "Approved", "Report Released", "Cancelled", "Rejected", "Refunded",
];

export const SAMPLE_TIMELINE = [
  { time: "10:05 AM", status: "Booked", by: "System", note: "Order placed by Andheri Health Hub" },
  { time: "10:32 AM", status: "Collected", by: "Phlebotomist R-42", note: "Home collection; OTP verified" },
  { time: "11:05 AM", status: "Pickup assigned", by: "Logistics", note: "Assigned to Route R-North-3" },
  { time: "12:10 PM", status: "Reached Hub", by: "Andheri Hub", note: "Count verified: 3 samples" },
  { time: "01:05 PM", status: "Dispatched to Lab", by: "Driver D-12", note: "Temp log: 4°C" },
  { time: "02:00 PM", status: "Received at Lab", by: "Lab Reception", note: "All barcodes matched" },
  { time: "02:15 PM", status: "Accessioned", by: "Tech T-08", note: "Allocated: Hematology, Biochemistry" },
  { time: "03:10 PM", status: "Processing", by: "System", note: "CBC: analyzer Sysmex XN-1000" },
  { time: "05:20 PM", status: "Result Ready", by: "Tech T-08", note: "Auto-validation passed" },
  { time: "05:40 PM", status: "Pathologist Approved", by: "Dr. Mehta", note: "No critical values" },
  { time: "05:45 PM", status: "Report Released", by: "System", note: "SMS/WhatsApp sent" },
];

export const REJECTION_REASONS = [
  "Insufficient sample",
  "Hemolysed",
  "Clotted",
  "Wrong container",
  "Wrong patient",
  "Leakage",
  "Delayed transport",
  "Improper storage",
  "Barcode mismatch",
  "Sample expired",
];

export const LAB_DEPARTMENTS = [
  { name: "Hematology", received: 42, pending: 18, processing: 14, rerun: 3, qc: 5, completed: 22, color: "#8b5cf6" },
  { name: "Biochemistry", received: 88, pending: 24, processing: 31, rerun: 4, qc: 8, completed: 45, color: "#0d9488" },
  { name: "Clinical Path.", received: 14, pending: 6, processing: 4, rerun: 1, qc: 2, completed: 7, color: "#ec4899" },
  { name: "Immunology", received: 36, pending: 12, processing: 11, rerun: 2, qc: 4, completed: 14, color: "#10b981" },
  { name: "Serology", received: 28, pending: 10, processing: 8, rerun: 1, qc: 3, completed: 11, color: "#f59e0b" },
  { name: "Microbiology", received: 12, pending: 6, processing: 3, rerun: 0, qc: 2, completed: 4, color: "#ef4444" },
  { name: "Hormones", received: 24, pending: 8, processing: 7, rerun: 1, qc: 3, completed: 9, color: "#6366f1" },
  { name: "Molecular Biology", received: 8, pending: 4, processing: 2, rerun: 0, qc: 1, completed: 2, color: "#14b8a6" },
];

export const PATHOLOGIST_QUEUE = [
  { id: "ORD-20260930-00455", patient: "Sunita Rao", age: 42, sex: "F", tests: "CBC, LIP, LFT, KFT, TSH, HBA1, VITD, GLU", critical: false, abnormal: 3, submitted: "04:55 PM", dept: "Multi" },
  { id: "ORD-20260930-00462", patient: "Suresh Pillai", age: 55, sex: "M", tests: "CBC, PSA, LIP, GLU", critical: true, abnormal: 2, submitted: "05:10 PM", dept: "Multi" },
  { id: "ORD-20260930-00458", patient: "Arjun Nair", age: 38, sex: "M", tests: "TSH, T3, T4, LFT, KFT, HBA1", critical: false, abnormal: 1, submitted: "05:18 PM", dept: "Hormones" },
  { id: "ORD-20260930-00453", patient: "Anita Desai", age: 47, sex: "F", tests: "CBC, LIP, TSH, VITD, HBA1", critical: false, abnormal: 2, submitted: "05:25 PM", dept: "Multi" },
  { id: "ORD-20260930-00461", patient: "Meera Iyer", age: 33, sex: "F", tests: "CBC, LFT, KFT, TSH, URINE", critical: false, abnormal: 0, submitted: "05:32 PM", dept: "Multi" },
];

export const CRITICAL_RESULTS = [
  { patient: "Suresh Pillai", test: "PSA", result: "28.6", unit: "ng/mL", range: "0 - 4", critical: "> 4", doctor: "Dr. Nair", contacted: false },
  { patient: "Sunita Rao", test: "Glucose (F)", result: "312", unit: "mg/dL", range: "70-100", critical: "> 250", doctor: "Dr. Mehta", contacted: true },
  { patient: "Vijay Mehta", test: "Potassium", result: "6.4", unit: "mmol/L", range: "3.5-5.1", critical: "> 6.0", doctor: "Dr. Nair", contacted: true },
  { patient: "Anita Desai", test: "TSH", result: "18.4", unit: "µIU/mL", range: "0.4-4.0", critical: "> 10", doctor: "Dr. Iyer", contacted: false },
  { patient: "Rohit Joshi", test: "Troponin I", result: "1.8", unit: "ng/mL", range: "< 0.04", critical: "> 0.5", doctor: "Self", contacted: true },
  { patient: "Kavya Reddy", test: "Hemoglobin", result: "6.8", unit: "g/dL", range: "12-15", critical: "< 7", doctor: "Self", contacted: false },
];

export const FRANCHISES = [
  { id: "FR-001", name: "Andheri Health Hub", owner: "Rajesh Shah", city: "Mumbai", subCount: 4, ordersToday: 38, revenue: "₹84,200", walletBalance: "₹12,500", outstanding: "₹8,400", commission: "₹5,200", status: "Active", plan: "Gold" },
  { id: "FR-002", name: "Bandra Care Hub", owner: "Sunil Patel", city: "Mumbai", subCount: 2, ordersToday: 27, revenue: "₹61,300", walletBalance: "₹-2,100", outstanding: "₹15,200", commission: "₹3,800", status: "Active", plan: "Silver" },
  { id: "FR-003", name: "Powai MedLab", owner: "Anita Rao", city: "Mumbai", subCount: 3, ordersToday: 19, revenue: "₹43,900", walletBalance: "₹7,800", outstanding: "₹3,200", commission: "₹2,900", status: "Active", plan: "Silver" },
  { id: "FR-004", name: "Thane Wellness", owner: "Vivek Joshi", city: "Thane", subCount: 0, ordersToday: 12, revenue: "₹22,100", walletBalance: "₹1,200", outstanding: "₹0", commission: "₹1,400", status: "Active", plan: "Starter" },
  { id: "FR-005", name: "Navi Mumbai Diagnostics", owner: "Priya Desai", city: "Navi Mumbai", subCount: 5, ordersToday: 31, revenue: "₹72,400", walletBalance: "₹15,000", outstanding: "₹11,800", commission: "₹4,100", status: "Active", plan: "Gold" },
  { id: "FR-006", name: "Pune Central Lab", owner: "Manoj Kulkarni", city: "Pune", subCount: 6, ordersToday: 44, revenue: "₹98,600", walletBalance: "₹22,400", outstanding: "₹18,200", commission: "₹6,300", status: "Active", plan: "Platinum" },
];

export const SUB_FRANCHISES = [
  { id: "SF-0101", parent: "Andheri Health Hub", name: "Andheri East — Kapole", owner: "Sanjay Iyer", ordersToday: 9, revenue: "₹18,400", walletBalance: "₹2,100", commission: "₹1,400" },
  { id: "SF-0102", parent: "Andheri Health Hub", name: "Andheri West — Lokhandwala", owner: "Reena Mehta", ordersToday: 6, revenue: "₹12,800", walletBalance: "₹3,400", commission: "₹890" },
  { id: "SF-0103", parent: "Andheri Health Hub", name: "Versova Collection Centre", owner: "Akshay Rao", ordersToday: 4, revenue: "₹7,200", walletBalance: "₹1,800", commission: "₹520" },
  { id: "SF-0104", parent: "Andheri Health Hub", name: "Sakinaka Pickup Point", owner: "Imran Khan", ordersToday: 3, revenue: "₹4,600", walletBalance: "₹800", commission: "₹340" },
  { id: "SF-0201", parent: "Bandra Care Hub", name: "Bandra West — Carter Rd", owner: "Mala S", ordersToday: 8, revenue: "₹16,900", walletBalance: "₹2,800", commission: "₹1,100" },
  { id: "SF-0202", parent: "Bandra Care Hub", name: "Khar Collection Centre", owner: "Faisal A", ordersToday: 5, revenue: "₹9,800", walletBalance: "₹1,200", commission: "₹680" },
];

export const WALLET_TRANSACTIONS = [
  { id: "WTRX-08821", date: "2026-09-30 09:12", type: "Recharge", ref: "UPI-882913", debit: "", credit: "₹20,000", balance: "₹29,250", remarks: "Recharge via UPI" },
  { id: "WTRX-08822", date: "2026-09-30 10:32", type: "Order Debit", ref: "ORD-20260930-00452", debit: "₹1,850", credit: "", balance: "₹27,400", remarks: "Andheri Health Hub order" },
  { id: "WTRX-08823", date: "2026-09-30 11:45", type: "Order Debit", ref: "ORD-20260930-00454", debit: "₹1,100", credit: "", balance: "₹26,300", remarks: "Direct B2C order" },
  { id: "WTRX-08824", date: "2026-09-30 12:00", type: "Commission", ref: "COMM-Sep-29", debit: "", credit: "₹3,800", balance: "₹30,100", remarks: "Commission credit Sep-29" },
  { id: "WTRX-08825", date: "2026-09-30 12:35", type: "Order Debit", ref: "ORD-20260930-00456", debit: "₹350", credit: "", balance: "₹29,750", remarks: "Andheri Health Hub order" },
  { id: "WTRX-08826", date: "2026-09-30 13:00", type: "Order Debit", ref: "ORD-20260930-00457", debit: "₹2,299", credit: "", balance: "₹27,451", remarks: "Direct B2C order" },
  { id: "WTRX-08827", date: "2026-09-30 14:10", type: "Material Purchase", ref: "MAT-1024", debit: "₹1,450", credit: "", balance: "₹26,001", remarks: "Vials & barcode rolls" },
  { id: "WTRX-08828", date: "2026-09-30 14:30", type: "Refund", ref: "RFD-2026-441", debit: "", credit: "₹1,100", balance: "₹27,101", remarks: "Order cancelled refund" },
];

export const LEDGER_ROWS = [
  { date: "2026-10-01", particular: "Opening Balance", debit: "", credit: "₹10,000", balance: "₹10,000" },
  { date: "2026-10-02", particular: "Order #1023 — CBC, TSH", debit: "₹750", credit: "", balance: "₹9,250" },
  { date: "2026-10-03", particular: "Wallet Recharge", debit: "", credit: "₹20,000", balance: "₹29,250" },
  { date: "2026-10-05", particular: "Order #1034 — Full Body Package", debit: "₹1,250", credit: "", balance: "₹28,000" },
  { date: "2026-10-08", particular: "Commission Credit", debit: "", credit: "₹3,800", balance: "₹31,800" },
  { date: "2026-10-12", particular: "Material Order — Vials", debit: "₹1,450", credit: "", balance: "₹30,350" },
  { date: "2026-10-15", particular: "Order #1102 — Vitamin Profile", debit: "₹2,099", credit: "", balance: "₹28,251" },
  { date: "2026-10-22", particular: "Refund — Order #1098", debit: "", credit: "₹1,100", balance: "₹29,351" },
];

export const PRODUCTS = [
  { sku: "BAR-VL-001", name: "Barcode Vials (100 pcs)", cat: "Consumables", brand: "Vacuette", pack: 100, stock: 1840, price: 450, frPrice: 380, reorder: 500, expiry: "2027-08" },
  { sku: "BAR-RL-002", name: "Barcode Rolls (1000 pcs)", cat: "Consumables", brand: "Zebra", pack: 1000, stock: 240, price: 850, frPrice: 720, reorder: 100, expiry: "2028-01" },
  { sku: "TBE-ED-001", name: "EDTA Tube (Purple)", cat: "Tubes", brand: "BD", pack: 100, stock: 650, price: 680, frPrice: 560, reorder: 200, expiry: "2027-05" },
  { sku: "TBE-SE-001", name: "Serum Tube (Yellow SST)", cat: "Tubes", brand: "BD", pack: 100, stock: 420, price: 720, frPrice: 600, reorder: 150, expiry: "2027-05" },
  { sku: "TBE-FL-001", name: "Fluoride Tube (Grey)", cat: "Tubes", brand: "BD", pack: 100, stock: 80, price: 700, frPrice: 580, reorder: 150, expiry: "2027-05" },
  { sku: "CON-UR-001", name: "Urine Container (Sterile)", cat: "Containers", brand: "Tarson", pack: 500, stock: 2200, price: 1200, frPrice: 980, reorder: 400, expiry: "—" },
  { sku: "CON-ST-001", name: "Stool Container", cat: "Containers", brand: "Tarson", pack: 500, stock: 1800, price: 950, frPrice: 780, reorder: 300, expiry: "—" },
  { sku: "PPE-GL-001", name: "Gloves (Nitrile, M)", cat: "PPE", brand: "SafeTouch", pack: 100, stock: 340, price: 380, frPrice: 320, reorder: 100, expiry: "2028-06" },
  { sku: "PPE-MS-001", name: "Surgical Mask (3-ply)", cat: "PPE", brand: "Halyard", pack: 50, stock: 580, price: 240, frPrice: 200, reorder: 200, expiry: "2027-12" },
  { sku: "PAP-RP-001", name: "Report Paper (A4, 500)", cat: "Stationery", brand: "JK", pack: 500, stock: 920, price: 320, frPrice: 280, reorder: 200, expiry: "—" },
  { sku: "ENV-LE-001", name: "Letterhead (500)", cat: "Stationery", brand: "JK", pack: 500, stock: 120, price: 480, frPrice: 420, reorder: 100, expiry: "—" },
  { sku: "BAG-CO-001", name: "Collection Bag (Biohazard)", cat: "Bags", brand: "Himedia", pack: 100, stock: 750, price: 280, frPrice: 240, reorder: 200, expiry: "—" },
];

export const LOGISTICS_PICKUPS = [
  { id: "PKP-2026-1842", franchise: "Andheri Health Hub", address: "Kapole Mall, Andheri E", samples: 8, ready: "01:00 PM", preferred: "01:30 PM", priority: "High", partner: "Rider R-N3", status: "On Way", eta: "8 min" },
  { id: "PKP-2026-1843", franchise: "Bandra Care Hub", address: "Carter Rd, Bandra W", samples: 5, ready: "01:15 PM", preferred: "02:00 PM", priority: "Medium", partner: "Rider R-S1", status: "Assigned", eta: "22 min" },
  { id: "PKP-2026-1844", franchise: "Powai MedLab", address: "Hiranandani, Powai", samples: 12, ready: "12:45 PM", preferred: "01:00 PM", priority: "High", partner: "Rider R-N3", status: "Collected", eta: "—" },
  { id: "PKP-2026-1845", franchise: "Thane Wellness", address: "Ghodbunder Rd, Thane", samples: 4, ready: "02:00 PM", preferred: "02:30 PM", priority: "Low", partner: "—", status: "Pending", eta: "—" },
  { id: "PKP-2026-1846", franchise: "Navi Mumbai Diagnostics", address: "Vashi, Navi Mumbai", samples: 9, ready: "01:30 PM", preferred: "02:00 PM", priority: "Medium", partner: "Rider R-S2", status: "Delayed", eta: "45 min" },
  { id: "PKP-2026-1847", franchise: "Pune Central Lab", address: "FC Rd, Pune", samples: 16, ready: "12:00 PM", preferred: "12:30 PM", priority: "High", partner: "Rider R-P1", status: "Reached Hub", eta: "—" },
];

export const LOGISTICS_DRIVERS = [
  { id: "R-N3", name: "Sandeep Kumar", vehicle: "MH-02-AB-1234 (Bike)", route: "R-North-3", gps: "Andheri E", speed: "32 km/h", lastUpdate: "1 min ago", samples: 12, status: "On Route" },
  { id: "R-S1", name: "Iqbal Ahmed", vehicle: "MH-02-CD-5678 (Bike)", route: "R-South-1", gps: "Bandra W", speed: "0 km/h", lastUpdate: "3 min ago", samples: 5, status: "Idle" },
  { id: "R-S2", name: "Manoj Yadav", vehicle: "MH-04-EF-9012 (Van)", route: "R-South-2", gps: "Vashi", speed: "0 km/h", lastUpdate: "12 min ago", samples: 9, status: "Delayed" },
  { id: "R-P1", name: "Anil Pawar", vehicle: "MH-12-GH-3456 (Van)", route: "R-Pune-1", gps: "FC Rd, Pune", speed: "45 km/h", lastUpdate: "30 sec ago", samples: 16, status: "On Route" },
  { id: "R-N5", name: "Vijay Salunkhe", vehicle: "MH-02-IJ-7890 (Bike)", route: "R-North-5", gps: "Hub — Andheri", speed: "0 km/h", lastUpdate: "5 min ago", samples: 0, status: "At Hub" },
];

export const ROUTES = [
  { id: "R-North-3", area: "Andheri East", stops: 6, franchises: 3, driver: "Sandeep Kumar", vehicle: "Bike", hub: "Andheri Hub", pickupTime: "01:30 PM", lab: "Central Lab — Mumbai" },
  { id: "R-South-1", area: "Bandra W & Khar", stops: 4, franchises: 2, driver: "Iqbal Ahmed", vehicle: "Bike", hub: "Bandra Hub", pickupTime: "02:00 PM", lab: "Central Lab — Mumbai" },
  { id: "R-South-2", area: "Vashi & Belapur", stops: 5, franchises: 2, driver: "Manoj Yadav", vehicle: "Van", hub: "Vashi Hub", pickupTime: "02:00 PM", lab: "Central Lab — Mumbai" },
  { id: "R-Pune-1", area: "Pune Central", stops: 8, franchises: 4, driver: "Anil Pawar", vehicle: "Van", hub: "Pune Hub", pickupTime: "12:30 PM", lab: "Pune Lab" },
];

export const SUPPORT_TICKETS = [
  { id: "TKT-2026-4412", type: "Report Issue", subject: "TSH report QR not scanning", requester: "Andheri Health Hub", priority: "Medium", status: "Open", assigned: "Support — T2", created: "10 min ago" },
  { id: "TKT-2026-4411", type: "Refund", subject: "Order #ORD-20260930-00463 cancelled — refund pending", requester: "Lakshmi Menon", priority: "High", status: "In Progress", assigned: "Finance — T1", created: "1 hr ago" },
  { id: "TKT-2026-4410", type: "Sample Issue", subject: "Sample hemolysed — re-collection needed", requester: "Bandra Care Hub", priority: "High", status: "Assigned", assigned: "Lab — T3", created: "2 hr ago" },
  { id: "TKT-2026-4409", type: "Billing", subject: "Invoice mismatch — ₹350 extra charged", requester: "Powai MedLab", priority: "Low", status: "Resolved", assigned: "Finance — T1", created: "Yesterday" },
  { id: "TKT-2026-4408", type: "Booking Cancellation", subject: "Wrong test booked — please cancel", requester: "Direct B2C", priority: "Medium", status: "Closed", assigned: "Support — T2", created: "Yesterday" },
];

export const AUDIT_TRAIL = [
  { time: "2026-09-30 14:32:11", user: "dr.mehta", role: "Pathologist", action: "Report Approved", ref: "ORD-20260930-00461", field: "report_status", old: "Pending", new: "Approved", ip: "10.4.2.18" },
  { time: "2026-09-30 14:28:54", user: "tech.t08", role: "Lab Technician", action: "Result Modified", ref: "ORD-20260930-00455", field: "glucose_fasting", old: "305", new: "312", ip: "10.4.2.42" },
  { time: "2026-09-30 14:25:09", user: "rajesh.shah", role: "Franchise", action: "Rate Changed", ref: "Test Master — CBC", field: "franchise_rate", old: "₹200", new: "₹210", ip: "10.4.1.9" },
  { time: "2026-09-30 14:20:31", user: "rajesh.shah", role: "Franchise", action: "Order Created", ref: "ORD-20260930-00461", field: "—", old: "—", new: "₹2,899", ip: "10.4.1.9" },
  { time: "2026-09-30 14:15:00", user: "system", role: "System", action: "Wallet Debit", ref: "WTRX-08827", field: "balance", old: "₹27,451", new: "₹26,001", ip: "—" },
  { time: "2026-09-30 14:10:48", user: "admin", role: "Super Admin", action: "User Role Modified", ref: "USR-0241", field: "role", old: "Front Office", new: "Lab Technician", ip: "10.4.0.1" },
  { time: "2026-09-30 13:58:12", user: "rider.rn3", role: "Logistics", action: "Sample Handover", ref: "PKP-2026-1844", field: "handover_status", old: "Collected", new: "Reached Hub", ip: "10.5.3.22" },
];

export const NOTIFICATIONS = [
  { event: "Booking Confirmed", sms: true, email: true, whatsapp: true, push: true, enabled: true },
  { event: "Collection Assigned", sms: true, email: false, whatsapp: true, push: true, enabled: true },
  { event: "Collector On Way", sms: true, email: false, whatsapp: true, push: true, enabled: true },
  { event: "Sample Collected", sms: true, email: true, whatsapp: true, push: false, enabled: true },
  { event: "Sample Received", sms: true, email: false, whatsapp: false, push: false, enabled: true },
  { event: "Sample Rejected", sms: true, email: true, whatsapp: true, push: true, enabled: true },
  { event: "Report Ready", sms: true, email: true, whatsapp: true, push: true, enabled: true },
  { event: "Critical Result", sms: true, email: true, whatsapp: true, push: true, enabled: true },
  { event: "Payment Received", sms: true, email: false, whatsapp: false, push: false, enabled: true },
  { event: "Wallet Low", sms: true, email: true, whatsapp: true, push: false, enabled: true },
  { event: "Wallet Recharge", sms: true, email: false, whatsapp: false, push: false, enabled: true },
  { event: "Material Dispatched", sms: true, email: true, whatsapp: false, push: false, enabled: true },
];

export const REPORTS_CENTER_GROUPS = [
  { group: "Sales", reports: ["Daily Sales", "Monthly Sales", "Franchise Sales", "Test Sales", "Package Sales", "B2C Sales", "B2B Sales"] },
  { group: "Patient", reports: ["New Patients", "Repeat Patients", "Age Distribution", "Gender Distribution", "Area-wise"] },
  { group: "Laboratory", reports: ["Test Volume", "Department Volume", "Sample Rejection", "Re-test", "TAT", "Pending Results"] },
  { group: "Pathologist", reports: ["Reports Approved", "Pending", "Average Validation Time"] },
  { group: "Franchise", reports: ["Active Franchise", "Inactive Franchise", "Top Orders by Volume", "Revenue", "Commission", "Outstanding"] },
  { group: "Logistics", reports: ["Pickup Performance", "Driver Performance", "Route Performance", "SLA Breach", "Average Transit Time"] },
  { group: "Inventory", reports: ["Stock", "Consumption", "Expiry", "Low Stock", "Purchase"] },
];

export const DOCTORS = [
  { id: "DOC-001", name: "Dr. Ramesh Sharma", spec: "General Physician", reg: "MMC-20145", hospital: "Lilavati Hospital", mobile: "+91-98200-11223", patients: 142, reports: 380, pending: 4, critical: 1 },
  { id: "DOC-002", name: "Dr. S. Iyer", spec: "Endocrinologist", reg: "MMC-18902", hospital: "Hinduja Hospital", mobile: "+91-98203-44556", patients: 88, reports: 240, pending: 2, critical: 0 },
  { id: "DOC-003", name: "Dr. Anjali Mehta", spec: "Physician", reg: "MMC-22110", hospital: "Nanavati Hospital", mobile: "+91-98204-77889", patients: 124, reports: 312, pending: 6, critical: 1 },
  { id: "DOC-004", name: "Dr. Prakash Nair", spec: "Urologist", reg: "MMC-19987", hospital: "Kokilaben Hospital", mobile: "+91-98205-99001", patients: 67, reports: 158, pending: 1, critical: 1 },
  { id: "DOC-005", name: "Dr. Aamir Khan", spec: "Cardiologist", reg: "MMC-17888", hospital: "Fortis Hospital", mobile: "+91-98206-22334", patients: 51, reports: 122, pending: 0, critical: 0 },
];

export const CORPORATES = [
  { id: "CRP-001", name: "Tata Consultancy Services", employees: 12400, contractFrom: "2026-01-01", contractTo: "2026-12-31", package: "FBP-A", rate: 2100, orders: 312, billed: "₹6.55L", status: "Active" },
  { id: "CRP-002", name: "Infosys Ltd.", employees: 9800, contractFrom: "2026-04-01", contractTo: "2027-03-31", package: "FBP-S", rate: 1699, orders: 248, billed: "₹4.21L", status: "Active" },
  { id: "CRP-003", name: "Wipro Technologies", employees: 6500, contractFrom: "2026-02-01", contractTo: "2027-01-31", package: "FBP-A", rate: 2299, orders: 184, billed: "₹4.23L", status: "Active" },
  { id: "CRP-004", name: "L&T Construction", employees: 4200, contractFrom: "2026-06-01", contractTo: "2027-05-31", package: "DIA-S", rate: 999, orders: 96, billed: "₹0.96L", status: "Active" },
];

export const HEALTH_CAMPS = [
  { id: "CAMP-2026-014", name: "TCS Diwali Camp", location: "TCS Andheri", organizer: "Tata Consultancy", date: "2026-10-12", package: "FBP-A", rate: 2100, expected: 280, collected: 0, status: "Scheduled" },
  { id: "CAMP-2026-013", name: "Infosys Health Drive", location: "Infosys Hinjewadi", organizer: "Infosys", date: "2026-10-08", package: "FBP-S", rate: 1699, expected: 220, collected: 0, status: "Scheduled" },
  { id: "CAMP-2026-012", name: "Wipro Wellness", location: "Wipro Kothrud", organizer: "Wipro", date: "2026-09-25", package: "FBP-A", rate: 2299, expected: 180, collected: 142, status: "Completed" },
  { id: "CAMP-2026-011", name: "L&T Worker Camp", location: "L&T Site Powai", organizer: "L&T", date: "2026-09-22", package: "DIA-S", rate: 999, expected: 120, collected: 96, status: "Completed" },
];

// ===== Diagnostic Report Mock (for printable sample report) =====
export const DIAGNOSTIC_REPORT = {
  labName: "LabNexus Central Laboratory",
  labAddress: "Plot 14, MIDC Andheri East, Mumbai 400093",
  labPhone: "+91-22-4002-8800",
  labEmail: "reports@labnexus.in",
  accreditation: "NABL — MC-1987",
  reportId: "RPT-2026-028841",
  orderId: "ORD-20260930-00452",
  sampleId: "SMP-20260930-00991",
  barcode: "8901234567890",
  patientName: "Ramesh Patil",
  patientId: "PAT-00001245",
  age: 42,
  sex: "Male",
  collectedAt: "2026-09-30 10:32 AM",
  receivedAt: "2026-09-30 02:00 PM",
  reportedAt: "2026-09-30 05:45 PM",
  referringDoctor: "Dr. Ramesh Sharma (MMC-20145)",
  tests: [
    {
      name: "Complete Blood Count (CBC)",
      department: "Hematology",
      method: "5-Part Analyzer",
      machine: "Sysmex XN-1000",
      params: [
        { p: "Hemoglobin", r: "11.8", u: "g/dL", ref: "13.0 - 17.0", flag: "L" },
        { p: "RBC Count", r: "4.42", u: "millions/µL", ref: "4.5 - 5.5", flag: "L" },
        { p: "WBC Count", r: "7,600", u: "/µL", ref: "4,000 - 11,000", flag: "" },
        { p: "Platelet Count", r: "2,18,000", u: "/µL", ref: "1,50,000 - 4,50,000", flag: "" },
        { p: "Hematocrit (PCV)", r: "36.8", u: "%", ref: "40 - 50", flag: "L" },
        { p: "MCV", r: "83.2", u: "fL", ref: "80 - 100", flag: "" },
        { p: "MCH", r: "26.7", u: "pg", ref: "27 - 32", flag: "L" },
        { p: "MCHC", r: "32.1", u: "g/dL", ref: "32 - 36", flag: "" },
        { p: "Neutrophils", r: "58.2", u: "%", ref: "40 - 70", flag: "" },
        { p: "Lymphocytes", r: "32.4", u: "%", ref: "20 - 40", flag: "" },
        { p: "Eosinophils", r: "5.1", u: "%", ref: "1 - 6", flag: "" },
        { p: "Monocytes", r: "3.8", u: "%", ref: "2 - 10", flag: "" },
        { p: "Basophils", r: "0.5", u: "%", ref: "0 - 2", flag: "" },
      ],
    },
    {
      name: "Lipid Profile",
      department: "Biochemistry",
      method: "Enzymatic, End-point",
      machine: "Roche Cobas c311",
      params: [
        { p: "Total Cholesterol", r: "208", u: "mg/dL", ref: "< 200", flag: "H" },
        { p: "Triglycerides", r: "172", u: "mg/dL", ref: "< 150", flag: "H" },
        { p: "HDL Cholesterol", r: "42", u: "mg/dL", ref: "> 40", flag: "" },
        { p: "LDL Cholesterol", r: "132", u: "mg/dL", ref: "< 100", flag: "H" },
        { p: "VLDL Cholesterol", r: "34", u: "mg/dL", ref: "< 30", flag: "H" },
        { p: "Total/HDL Ratio", r: "4.9", u: "", ref: "< 3.5", flag: "H" },
        { p: "LDL/HDL Ratio", r: "3.1", u: "", ref: "< 2.0", flag: "H" },
      ],
    },
    {
      name: "Thyroid Stimulating Hormone (TSH)",
      department: "Hormones",
      method: "CLIA",
      machine: "Roche Cobas e411",
      params: [
        { p: "TSH", r: "3.84", u: "µIU/mL", ref: "0.40 - 4.00", flag: "" },
      ],
    },
  ],
  pathologist: {
    name: "Dr. Anjali Mehta",
    qualification: "MD (Pathology)",
    reg: "MMC-22110",
  },
  remarks:
    "Mild microcytic hypochromic anemia with dyslipidemia. Recommend Iron studies and correlation with clinical condition. Lipid-lowering therapy review suggested.",
};

export const INVENTORY_STOCK = [
  { sku: "BAR-VL-001", name: "Barcode Vials (100 pcs)", warehouse: 1240, lab: 320, collection: 200, franchise: 80, total: 1840, reorder: 500, status: "OK" },
  { sku: "BAR-RL-002", name: "Barcode Rolls (1000 pcs)", warehouse: 180, lab: 40, collection: 20, franchise: 0, total: 240, reorder: 100, status: "Low" },
  { sku: "TBE-ED-001", name: "EDTA Tube (Purple)", warehouse: 420, lab: 130, collection: 80, franchise: 20, total: 650, reorder: 200, status: "OK" },
  { sku: "TBE-SE-001", name: "Serum Tube (Yellow SST)", warehouse: 280, lab: 100, collection: 40, franchise: 0, total: 420, reorder: 150, status: "OK" },
  { sku: "TBE-FL-001", name: "Fluoride Tube (Grey)", warehouse: 60, lab: 15, collection: 5, franchise: 0, total: 80, reorder: 150, status: "Reorder" },
  { sku: "CON-UR-001", name: "Urine Container (Sterile)", warehouse: 1500, lab: 400, collection: 200, franchise: 100, total: 2200, reorder: 400, status: "OK" },
  { sku: "PPE-GL-001", name: "Gloves (Nitrile, M)", warehouse: 240, lab: 60, collection: 40, franchise: 0, total: 340, reorder: 100, status: "OK" },
  { sku: "PPE-MS-001", name: "Surgical Mask (3-ply)", warehouse: 380, lab: 100, collection: 80, franchise: 20, total: 580, reorder: 200, status: "OK" },
];
