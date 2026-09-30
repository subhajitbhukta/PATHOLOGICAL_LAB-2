"use client";

import { useAppStore, PortalId } from "@/lib/store";
import { PORTAL_NAV } from "@/lib/nav-config";
import { PORTALS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Microscope,
  ChevronDown,
  Bell,
  Search,
  Settings,
  HelpCircle,
  LogOut,
  User,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const PORTAL_ACCENTS: Record<PortalId, { bar: string; pill: string; ring: string }> = {
  "super-admin": { bar: "bg-teal-600", pill: "data-[active=true]:bg-teal-600 data-[active=true]:text-white", ring: "ring-teal-500" },
  franchise: { bar: "bg-violet-600", pill: "data-[active=true]:bg-violet-600 data-[active=true]:text-white", ring: "ring-violet-500" },
  patient: { bar: "bg-emerald-600", pill: "data-[active=true]:bg-emerald-600 data-[active=true]:text-white", ring: "ring-emerald-500" },
  logistics: { bar: "bg-amber-500", pill: "data-[active=true]:bg-amber-500 data-[active=true]:text-white", ring: "ring-amber-500" },
  pathologist: { bar: "bg-rose-600", pill: "data-[active=true]:bg-rose-600 data-[active=true]:text-white", ring: "ring-rose-500" },
};

const PORTAL_USER: Record<PortalId, { name: string; role: string; location: string }> = {
  "super-admin": { name: "Aditya Verma", role: "Super Admin", location: "Central Lab — Mumbai" },
  franchise: { name: "Rajesh Shah", role: "Franchise Owner", location: "Andheri Health Hub" },
  patient: { name: "Ramesh Patil", role: "Patient", location: "PAT-00001245" },
  logistics: { name: "Sandeep Kumar", role: "Rider R-N3", location: "Route R-North-3" },
  pathologist: { name: "Dr. Anjali Mehta", role: "Pathologist — MD", location: "MD (Pathology), MMC-22110" },
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const { portal, page, setPage, setPortal } = useAppStore();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const nav = PORTAL_NAV[portal];
  const accents = PORTAL_ACCENTS[portal];
  const user = PORTAL_USER[portal];

  const currentSection =
    nav.find((s) => s.items.find((i) => i.id === page)) || nav[0];
  const currentItem =
    currentSection.items.find((i) => i.id === page) || currentSection.items[0];

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-card border-b">
        <div className="flex items-center h-14 gap-2 px-3 lg:px-5">
          <button
            className="lg:hidden rounded-md p-2 hover:bg-accent"
            onClick={() => setMobileSidebarOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <div className="flex items-center gap-2.5 shrink-0">
            <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-primary text-primary-foreground">
              <Microscope className="h-5 w-5" />
            </div>
            <div className="hidden md:flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-tight">LabNexus</span>
              <span className="text-[10px] text-muted-foreground">Referral Lab OS</span>
            </div>
          </div>

          {/* Portal switcher */}
          <div className="flex items-center gap-1 ml-2 overflow-x-auto scroll-thin -mx-1 px-1">
            {PORTALS.map((p) => (
              <button
                key={p.id}
                data-active={portal === p.id}
                onClick={() => setPortal(p.id)}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  "data-[active=true]:shadow-sm data-[active=true]:ring-1",
                  portal === p.id
                    ? PORTAL_ACCENTS[p.id].pill + " " + PORTAL_ACCENTS[p.id].ring
                    : "hover:bg-accent text-muted-foreground hover:text-foreground",
                )}
              >
                {p.name}
              </button>
            ))}
          </div>

          <div className="flex-1" />

          <div className="hidden md:flex items-center gap-2 max-w-sm flex-1">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                placeholder="Search orders, patients, samples..."
                className="w-full rounded-md bg-muted pl-8 pr-3 py-1.5 text-xs border border-transparent focus:border-primary focus:bg-background outline-none"
              />
            </div>
          </div>

          <button className="relative rounded-md p-2 hover:bg-accent">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-rose-500" />
          </button>
          <button className="rounded-md p-2 hover:bg-accent hidden sm:block">
            <HelpCircle className="h-4 w-4" />
          </button>
          <button className="rounded-md p-2 hover:bg-accent hidden sm:block">
            <Settings className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2 pl-2 ml-1 border-l">
            <div className="hidden sm:flex flex-col items-end leading-tight">
              <span className="text-xs font-medium">{user.name}</span>
              <span className="text-[10px] text-muted-foreground">{user.role}</span>
            </div>
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 text-white text-xs font-semibold flex items-center justify-center">
              {user.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
            </div>
          </div>
        </div>
        {/* Accent line */}
        <div className={cn("h-0.5", accents.bar)} />
      </header>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed lg:sticky top-[3.75rem] z-30 lg:z-0 w-64 shrink-0 bg-card border-r h-[calc(100vh-3.75rem)] overflow-hidden transition-transform",
            mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          )}
        >
          <ScrollArea className="h-full">
            <div className="px-3 py-4 space-y-5">
              {nav.map((section) => (
                <div key={section.label} className="space-y-1">
                  <h4 className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground/80 px-2 mb-1">
                    {section.label}
                  </h4>
                  {section.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setPage(item.id);
                        setMobileSidebarOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors",
                        page === item.id
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                      )}
                    >
                      <item.icon className="h-3.5 w-3.5 shrink-0" />
                      <span className="flex-1 text-left truncate">{item.label}</span>
                      {item.badge && (
                        <Badge className="h-4 px-1 text-[9px] bg-rose-500 text-white border-rose-600">
                          {item.badge}
                        </Badge>
                      )}
                    </button>
                  ))}
                </div>
              ))}
              <div className="pt-3 mt-3 border-t">
                <button className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:bg-accent/60 hover:text-foreground">
                  <LogOut className="h-3.5 w-3.5" /> Sign Out
                </button>
              </div>
            </div>
          </ScrollArea>
        </aside>

        {/* Mobile overlay */}
        {mobileSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 top-[3.75rem] bg-black/30 z-20"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* Content area */}
        <main className="flex-1 min-w-0">
          {/* Breadcrumb */}
          <div className="sticky top-14 z-20 bg-background/95 backdrop-blur border-b px-4 lg:px-6 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{PORTALS.find((p) => p.id === portal)?.name}</span>
              <span className="text-muted-foreground/50">/</span>
              <span>{currentSection.label}</span>
              <span className="text-muted-foreground/50">/</span>
              <span className="text-foreground/80">{currentItem.label}</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-[10px] text-muted-foreground">
              <span className="rounded-full bg-emerald-100 text-emerald-700 px-2 py-0.5 font-medium">
                ● Live
              </span>
              <span className="font-mono">{new Date().toLocaleString("en-IN", { hour12: false })}</span>
            </div>
          </div>

          <div className="p-4 lg:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
