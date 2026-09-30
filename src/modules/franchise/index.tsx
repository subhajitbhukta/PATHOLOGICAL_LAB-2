"use client";

import { FranchiseDashboard } from "./dashboard";
import { OrdersList as Orders } from "@/modules/shared/OrdersList";
import { OrderDetail as OrderD } from "@/modules/shared/OrderDetail";
import { BookTestWizard } from "@/modules/shared/BookTestWizard";
import { PatientsList, PatientRegistration } from "@/modules/shared/PatientsList";
import { SampleTracking } from "@/modules/shared/SampleTracking";
import { ReportGenerator, PrintableReports } from "@/modules/shared/ReportGenerator";
import { RatesMaster, CommissionEngine, SubFranchiseList, FranchisePerformance } from "@/modules/shared/Franchise";
import { WalletView, LedgerView } from "@/modules/shared/Finance";
import { ProductsList, MaterialOrders } from "@/modules/shared/Ecommerce";
import { PickupManagement, SampleHandover } from "@/modules/shared/Logistics";
import { SupportCenter, SystemSettings } from "@/modules/shared/NetworkSystem";
import { PageHeader, SectionCard } from "@/components/common/Layout";
import { Construction } from "lucide-react";

function ComingSoon({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Construction className="h-10 w-10 text-muted-foreground/40 mb-3" />
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-sm text-muted-foreground mt-1">Reusing shared LabNexus data model.</p>
    </div>
  );
}

export function FranchiseRouter({ page }: { page: string }) {
  switch (page) {
    case "fr.dashboard":
      return <FranchiseDashboard />;
    case "fr.book-test":
      return <BookTestWizard portal="franchise" />;
    case "fr.patients":
      return <PatientsList />;
    case "fr.orders":
      return <Orders portal="franchise" />;
    case "fr.order-detail":
      return <OrderD portal="franchise" />;
    case "fr.samples":
      return <SampleTracking />;
    case "fr.reports":
      return <ReportGenerator />;
    case "fr.invoices":
      return <ComingSoon name="Invoices" />;
    case "fr.wallet":
      return <WalletView />;
    case "fr.ledger":
      return <LedgerView />;
    case "fr.sub-franchise":
      return <SubFranchiseList />;
    case "fr.logistics":
      return <PickupManagement />;
    case "fr.material-store":
      return <ProductsList />;
    case "fr.rates":
      return <RatesMaster />;
    case "fr.commission":
      return <CommissionEngine />;
    case "fr.support":
      return <SupportCenter />;
    case "fr.profile":
      return <SystemSettings />;
    default:
      return <ComingSoon name={page} />;
  }
}
