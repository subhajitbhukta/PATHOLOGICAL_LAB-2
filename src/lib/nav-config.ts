import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Microscope,
  FlaskConical,
  FileText,
  Building2,
  Truck,
  Wallet,
  ShoppingBag,
  Package,
  Stethoscope,
  HeartPulse,
  Tent,
  BellRing,
  Headset,
  Settings,
  Database,
  FileBarChart,
  ShieldCheck,
  UserPlus,
  QrCode,
  TestTube2,
  Vial,
  FileSpreadsheet,
  Receipt,
  Coins,
  BarChart3,
  Network,
  MapPin,
  CalendarDays,
  CreditCard,
  FolderTree,
  Boxes,
  Landmark,
  ClipboardCheck,
  CheckCircle2,
  Clock,
  Activity,
  AlertTriangle,
  RotateCcw,
  Box,
} from "lucide-react";

export type NavItem = {
  id: string;
  label: string;
  icon: any;
  group?: string;
  badge?: string;
};

export type NavSection = {
  label: string;
  items: NavItem[];
};

export const SUPER_ADMIN_NAV: NavSection[] = [
  {
    label: "Operations",
    items: [
      { id: "sa.dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "sa.patients", label: "Patients", icon: Users },
      { id: "sa.orders", label: "Orders", icon: ClipboardList, badge: "42" },
      { id: "sa.sample-tracking", label: "Sample Tracking", icon: TestTube2 },
      { id: "sa.book-test", label: "Book Test (Front Office)", icon: UserPlus },
      { id: "sa.patient-reg", label: "Patient Registration", icon: UserPlus },
    ],
  },
  {
    label: "Laboratory",
    items: [
      { id: "sa.accession", label: "Sample Accession", icon: QrCode },
      { id: "sa.worklist", label: "Daily Worklist", icon: ClipboardList },
      { id: "sa.processing", label: "Processing", icon: FlaskConical },
      { id: "sa.result-entry", label: "Result Entry", icon: FileText },
      { id: "sa.qc", label: "QC", icon: ShieldCheck },
      { id: "sa.retest", label: "Re-test", icon: RotateCcw },
      { id: "sa.pathologist", label: "Pathologist Review", icon: Stethoscope, badge: "6" },
    ],
  },
  {
    label: "Reports",
    items: [
      { id: "sa.report-generator", label: "Report Generator", icon: FileText },
      { id: "sa.report-types", label: "Report Templates", icon: FileBarChart },
      { id: "sa.reports-center", label: "Reports Centre", icon: BarChart3 },
      { id: "sa.printable-reports", label: "Printable Documents", icon: FileText },
    ],
  },
  {
    label: "Franchise & Network",
    items: [
      { id: "sa.franchise", label: "Franchises", icon: Building2 },
      { id: "sa.sub-franchise", label: "Sub-Franchises", icon: Network },
      { id: "sa.rates", label: "Rates Master", icon: Coins },
      { id: "sa.commission", label: "Commission Engine", icon: Coins },
      { id: "sa.franchise-performance", label: "Franchise Performance", icon: BarChart3 },
    ],
  },
  {
    label: "Logistics",
    items: [
      { id: "sa.pickup", label: "Pickups", icon: Truck },
      { id: "sa.routes", label: "Routes", icon: MapPin },
      { id: "sa.drivers", label: "Drivers", icon: Users },
      { id: "sa.gps", label: "GPS Tracking", icon: MapPin },
      { id: "sa.handover", label: "Sample Handover", icon: ClipboardCheck },
      { id: "sa.sla", label: "Logistics SLA", icon: Clock },
    ],
  },
  {
    label: "Finance",
    items: [
      { id: "sa.payments", label: "Payments", icon: CreditCard },
      { id: "sa.wallet", label: "Wallet", icon: Wallet },
      { id: "sa.ledger", label: "Ledger", icon: FileSpreadsheet },
      { id: "sa.receivables", label: "Receivables", icon: Receipt },
      { id: "sa.settlement", label: "Settlement", icon: Landmark },
    ],
  },
  {
    label: "E-Commerce & Inventory",
    items: [
      { id: "sa.products", label: "Products", icon: ShoppingBag },
      { id: "sa.material-orders", label: "Material Orders", icon: Box },
      { id: "sa.warehouse", label: "Warehouse", icon: Boxes },
      { id: "sa.dispatch", label: "Dispatch", icon: Truck },
      { id: "sa.inventory", label: "Inventory", icon: Package },
      { id: "sa.purchase-order", label: "Purchase Orders", icon: Receipt },
      { id: "sa.grn", label: "GRN", icon: ClipboardCheck },
    ],
  },
  {
    label: "Network",
    items: [
      { id: "sa.doctors", label: "Doctors", icon: Stethoscope },
      { id: "sa.corporate", label: "Corporate", icon: Building2 },
      { id: "sa.camps", label: "Health Camps", icon: Tent },
    ],
  },
  {
    label: "System",
    items: [
      { id: "sa.notifications", label: "Notifications", icon: BellRing },
      { id: "sa.support", label: "Support", icon: Headset, badge: "5" },
      { id: "sa.masters", label: "Masters", icon: Database },
      { id: "sa.audit", label: "Audit Trail", icon: ShieldCheck },
      { id: "sa.settings", label: "Settings", icon: Settings },
    ],
  },
];

export const FRANCHISE_NAV: NavSection[] = [
  {
    label: "Franchise",
    items: [
      { id: "fr.dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "fr.book-test", label: "Book Test", icon: UserPlus },
      { id: "fr.patients", label: "Patients", icon: Users },
      { id: "fr.orders", label: "Orders", icon: ClipboardList },
      { id: "fr.samples", label: "Samples", icon: TestTube2 },
      { id: "fr.reports", label: "Reports", icon: FileText },
    ],
  },
  {
    label: "Billing",
    items: [
      { id: "fr.invoices", label: "Invoices", icon: Receipt },
      { id: "fr.wallet", label: "Wallet", icon: Wallet },
      { id: "fr.ledger", label: "Ledger", icon: FileSpreadsheet },
    ],
  },
  {
    label: "Network",
    items: [
      { id: "fr.sub-franchise", label: "Sub-Franchise", icon: Network },
      { id: "fr.logistics", label: "Logistics", icon: Truck },
      { id: "fr.material-store", label: "Material Store", icon: ShoppingBag },
      { id: "fr.rates", label: "Rates", icon: Coins },
      { id: "fr.commission", label: "Commission", icon: Coins },
    ],
  },
  {
    label: "Support",
    items: [
      { id: "fr.support", label: "Support", icon: Headset },
      { id: "fr.profile", label: "Profile", icon: Settings },
    ],
  },
];

export const PATIENT_NAV: NavSection[] = [
  {
    label: "Patient",
    items: [
      { id: "pt.dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "pt.book-test", label: "Book Test", icon: UserPlus },
      { id: "pt.orders", label: "My Orders", icon: ClipboardList },
      { id: "pt.reports", label: "My Reports", icon: FileText },
      { id: "pt.family", label: "Family Members", icon: Users },
      { id: "pt.appointments", label: "Appointments", icon: CalendarDays },
      { id: "pt.invoices", label: "Invoices", icon: Receipt },
      { id: "pt.profile", label: "Profile", icon: Settings },
      { id: "pt.support", label: "Support", icon: Headset },
    ],
  },
];

export const LOGISTICS_NAV: NavSection[] = [
  {
    label: "Logistics",
    items: [
      { id: "lg.dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "lg.pickups", label: "Pickup Requests", icon: Truck, badge: "4" },
      { id: "lg.today-route", label: "Today's Route", icon: MapPin },
      { id: "lg.live-tracking", label: "Live Tracking", icon: Activity },
      { id: "lg.handover", label: "Sample Handover", icon: ClipboardCheck },
      { id: "lg.completed", label: "Completed", icon: CheckCircle2 },
      { id: "lg.exceptions", label: "Exceptions", icon: AlertTriangle, badge: "2" },
      { id: "lg.performance", label: "Performance", icon: BarChart3 },
    ],
  },
];

export const PATHOLOGIST_NAV: NavSection[] = [
  {
    label: "Pathologist",
    items: [
      { id: "ph.dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "ph.pending", label: "Pending Validation", icon: ClipboardCheck, badge: "6" },
      { id: "ph.critical", label: "Critical Results", icon: AlertTriangle, badge: "3" },
      { id: "ph.retest", label: "Re-test", icon: RotateCcw },
      { id: "ph.approved", label: "Approved", icon: CheckCircle2 },
      { id: "ph.report-history", label: "Report History", icon: FileText },
      { id: "ph.patient-history", label: "Patient History", icon: Users },
    ],
  },
];

export const PORTAL_NAV = {
  "super-admin": SUPER_ADMIN_NAV,
  franchise: FRANCHISE_NAV,
  patient: PATIENT_NAV,
  logistics: LOGISTICS_NAV,
  pathologist: PATHOLOGIST_NAV,
};
