"use client";

import { useAppStore } from "@/lib/store";
import { AppShell } from "@/components/shell/AppShell";
import { SuperAdminRouter } from "@/modules/super-admin";
import { FranchiseRouter } from "@/modules/franchise";
import { PatientRouter } from "@/modules/patient";
import { LogisticsRouter } from "@/modules/logistics";
import { PathologistRouter } from "@/modules/pathologist";

export default function Home() {
  const portal = useAppStore((s) => s.portal);
  const page = useAppStore((s) => s.page);

  let router;
  switch (portal) {
    case "super-admin":
      router = <SuperAdminRouter page={page} />;
      break;
    case "franchise":
      router = <FranchiseRouter page={page} />;
      break;
    case "patient":
      router = <PatientRouter page={page} />;
      break;
    case "logistics":
      router = <LogisticsRouter page={page} />;
      break;
    case "pathologist":
      router = <PathologistRouter page={page} />;
      break;
  }

  return <AppShell>{router}</AppShell>;
}
