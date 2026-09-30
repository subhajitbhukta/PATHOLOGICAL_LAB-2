import { create } from "zustand";

export type PortalId =
  | "super-admin"
  | "franchise"
  | "patient"
  | "logistics"
  | "pathologist";

export type PortalPageId = string; // e.g. "sa.dashboard", "fr.book-test"

interface AppState {
  portal: PortalId;
  page: PortalPageId;
  setPortal: (p: PortalId) => void;
  setPage: (p: PortalPageId) => void;
  navigate: (portal: PortalId, page: PortalPageId) => void;
}

const DEFAULT_PAGE_BY_PORTAL: Record<PortalId, PortalPageId> = {
  "super-admin": "sa.dashboard",
  franchise: "fr.dashboard",
  patient: "pt.dashboard",
  logistics: "lg.dashboard",
  pathologist: "ph.dashboard",
};

export const useAppStore = create<AppState>((set) => ({
  portal: "super-admin",
  page: "sa.dashboard",
  setPortal: (portal) =>
    set({ portal, page: DEFAULT_PAGE_BY_PORTAL[portal] }),
  setPage: (page) => set({ page }),
  navigate: (portal, page) => set({ portal, page }),
}));
