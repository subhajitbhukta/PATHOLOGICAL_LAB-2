"use client";

import { SuperAdminDashboard } from "./dashboard";
import { OrdersList } from "@/modules/shared/OrdersList";
import { OrderDetail } from "@/modules/shared/OrderDetail";
import { SampleTracking, SampleAccession } from "@/modules/shared/SampleTracking";
import { PatientsList, PatientRegistration } from "@/modules/shared/PatientsList";
import { BookTestWizard } from "@/modules/shared/BookTestWizard";
import { Worklist, Processing, ResultEntry, QC, RetestQueue } from "@/modules/shared/Laboratory";
import { ReportGenerator, ReportTypes, ReportsCentre, PrintableReports } from "@/modules/shared/ReportGenerator";
import { EasyReportGenerator } from "@/modules/shared/EasyReportGenerator";
import { FranchiseList, SubFranchiseList, RatesMaster, CommissionEngine, FranchisePerformance, AuditTrail } from "@/modules/shared/Franchise";
import { PickupManagement, RoutesManagement, DriversManagement, GPSTracking, SampleHandover, LogisticsSLA } from "@/modules/shared/Logistics";
import { PaymentsView, WalletView, LedgerView, Receivables, Settlement } from "@/modules/shared/Finance";
import { ProductsList, MaterialOrders, Warehouse, DispatchList, InventoryView, PurchaseOrders, GRN } from "@/modules/shared/Ecommerce";
import { DoctorsList, CorporateList, HealthCamps, NotificationsEngine, SupportCenter, SystemSettings } from "@/modules/shared/NetworkSystem";
import { MastersHub } from "@/modules/shared/MastersHub";
import { PageHeader, SectionCard } from "@/components/common/Layout";
import { Construction } from "lucide-react";

function ComingSoon({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Construction className="h-10 w-10 text-muted-foreground/40 mb-3" />
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-sm text-muted-foreground mt-1">
        This screen is part of the unified LabNexus data model — design is shown elsewhere in the platform.
      </p>
    </div>
  );
}

export function SuperAdminRouter({ page }: { page: string }) {
  switch (page) {
    case "sa.dashboard":
      return <SuperAdminDashboard />;
    case "sa.patients":
      return <PatientsList />;
    case "sa.orders":
      return <OrdersList portal="super-admin" />;
    case "sa.order-detail":
      return <OrderDetail portal="super-admin" />;
    case "sa.sample-tracking":
      return <SampleTracking />;
    case "sa.accession":
      return <SampleAccession />;
    case "sa.book-test":
      return <BookTestWizard portal="super-admin" />;
    case "sa.patient-reg":
      return <PatientRegistration />;
    case "sa.worklist":
      return <Worklist />;
    case "sa.processing":
      return <Processing />;
    case "sa.result-entry":
      return <ResultEntry />;
    case "sa.qc":
      return <QC />;
    case "sa.retest":
      return <RetestQueue />;
    case "sa.pathologist":
      return <ComingSoon name="Pathologist Review Queue" />;
    case "sa.easy-reports":
      return <EasyReportGenerator />;
    case "sa.report-generator":
      return <ReportGenerator />;
    case "sa.report-types":
      return <ReportTypes />;
    case "sa.reports-center":
      return <ReportsCentre />;
    case "sa.printable-reports":
      return <PrintableReports />;
    case "sa.franchise":
      return <FranchiseList />;
    case "sa.sub-franchise":
      return <SubFranchiseList />;
    case "sa.rates":
      return <RatesMaster />;
    case "sa.commission":
      return <CommissionEngine />;
    case "sa.franchise-performance":
      return <FranchisePerformance />;
    case "sa.pickup":
      return <PickupManagement />;
    case "sa.routes":
      return <RoutesManagement />;
    case "sa.drivers":
      return <DriversManagement />;
    case "sa.gps":
      return <GPSTracking />;
    case "sa.handover":
      return <SampleHandover />;
    case "sa.sla":
      return <LogisticsSLA />;
    case "sa.payments":
      return <PaymentsView />;
    case "sa.wallet":
      return <WalletView />;
    case "sa.ledger":
      return <LedgerView />;
    case "sa.receivables":
      return <Receivables />;
    case "sa.settlement":
      return <Settlement />;
    case "sa.products":
      return <ProductsList />;
    case "sa.material-orders":
      return <MaterialOrders />;
    case "sa.warehouse":
      return <Warehouse />;
    case "sa.dispatch":
      return <DispatchList />;
    case "sa.inventory":
      return <InventoryView />;
    case "sa.purchase-order":
      return <PurchaseOrders />;
    case "sa.grn":
      return <GRN />;
    case "sa.doctors":
      return <DoctorsList />;
    case "sa.corporate":
      return <CorporateList />;
    case "sa.camps":
      return <HealthCamps />;
    case "sa.notifications":
      return <NotificationsEngine />;
    case "sa.support":
      return <SupportCenter />;
    case "sa.masters":
      return <MastersHub />;
    case "sa.audit":
      return <AuditTrail />;
    case "sa.settings":
      return <SystemSettings />;
    default:
      return <ComingSoon name={page} />;
  }
}
