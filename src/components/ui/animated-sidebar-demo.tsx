"use client";

import {
  AnimatedSidebar,
  AnimatedSidebarClose,
  AnimatedSidebarContent,
  AnimatedSidebarFooter,
  AnimatedSidebarGroup,
  AnimatedSidebarGroupContent,
  AnimatedSidebarGroupLabel,
  AnimatedSidebarHeader,
  AnimatedSidebarInset,
  AnimatedSidebarMenu,
  AnimatedSidebarMenuButton,
  AnimatedSidebarMenuItem,
  AnimatedSidebarMenuSub,
  AnimatedSidebarMenuSubButton,
  AnimatedSidebarMenuSubItem,
  AnimatedSidebarProvider,
  AnimatedSidebarRail,
  AnimatedSidebarTrigger,
} from "@/components/ui/animated-sidebar";
import {
  ChevronRight,
  ChevronsUpDown,
  CircleUserRound,
  Command,
  PanelLeft,
  Stethoscope,
  X,
} from "lucide-react";
import { useState } from "react";
import { PatientsTable } from "@/components/ui/patients-table";
import { DoctorsTable } from "@/components/ui/doctors-table";

const destinations = [
  {
    label: "Patients",
    icon: CircleUserRound,
    children: ["All patients", "Recent admissions", "Appointments"],
  },
  {
    label: "Doctors",
    icon: Stethoscope,
    children: ["All doctors", "On duty", "Schedules"],
  },
] satisfies {
  label: string;
  icon: typeof CircleUserRound | typeof Stethoscope;
  children?: string[];
}[];

export default function AnimatedSidebarPreview() {
  const [active, setActive] = useState("Patients");
  const [openSection, setOpenSection] = useState<string | null>(null);

  const isDoctorView =
    active === "Doctors" ||
    active === "All doctors" ||
    active === "On duty" ||
    active === "Schedules";

  return (
    <div className="w-full h-screen">
      <AnimatedSidebarProvider className="h-full min-h-0 overflow-hidden bg-background">
        <AnimatedSidebar
          ariaLabel="Records workspace"
          collapsible="icon"
          className="min-h-0"
          panelClassName="h-full border-foreground/[0.08]"
        >
          <AnimatedSidebarHeader className="p-3 pb-2">
            <div className="flex min-h-11 items-center gap-3 overflow-hidden px-2">
              <div className="grid size-7 shrink-0 place-items-center rounded-lg bg-foreground text-background">
                <Command aria-hidden="true" className="size-4" />
              </div>
              <button
                type="button"
                className="flex min-w-0 flex-1 items-center gap-2 rounded-lg text-left outline-none focus-visible:ring-2 focus-visible:ring-ring group-data-[state=collapsed]/sidebar:hidden"
              >
                <span className="truncate text-sm font-semibold text-foreground">
                  Nurse Joy
                </span>
                <ChevronsUpDown
                  aria-hidden="true"
                  className="size-3.5 shrink-0 text-muted-foreground"
                />
              </button>
              <AnimatedSidebarClose className="ml-auto text-muted-foreground hover:bg-muted md:hidden">
                <X aria-hidden="true" className="size-4" />
              </AnimatedSidebarClose>
            </div>
          </AnimatedSidebarHeader>

          <AnimatedSidebarContent className="px-2 pt-1">
            <AnimatedSidebarGroup className="pt-1">
              <AnimatedSidebarGroupLabel>RECORDS</AnimatedSidebarGroupLabel>
              <AnimatedSidebarGroupContent>
                <AnimatedSidebarMenu>
                  {destinations.map(({ label, icon: Icon, children }) => (
                    <AnimatedSidebarMenuItem key={label}>
                      <AnimatedSidebarMenuButton
                        isActive={
                          active === label ||
                          children?.includes(active) === true
                        }
                        ariaExpanded={
                          children ? openSection === label : undefined
                        }
                        icon={<Icon className="size-4" />}
                        onSelect={() => {
                          setOpenSection((current) => {
                            if (!children) {
                              setActive(label);
                              return null;
                            }
                            return current === label ? null : label;
                          });
                        }}
                      >
                        {label}
                      </AnimatedSidebarMenuButton>
                      {children ? (
                        <AnimatedSidebarMenuSub open={openSection === label}>
                          {children.map((child) => (
                            <AnimatedSidebarMenuSubItem key={child}>
                              <AnimatedSidebarMenuSubButton
                                isActive={active === child}
                                onSelect={() => setActive(child)}
                              >
                                {child}
                              </AnimatedSidebarMenuSubButton>
                            </AnimatedSidebarMenuSubItem>
                          ))}
                        </AnimatedSidebarMenuSub>
                      ) : null}
                    </AnimatedSidebarMenuItem>
                  ))}
                </AnimatedSidebarMenu>
              </AnimatedSidebarGroupContent>
            </AnimatedSidebarGroup>
          </AnimatedSidebarContent>

          <AnimatedSidebarFooter className="gap-3 border-none p-3">
            <button
              type="button"
              className="flex min-h-11 w-full items-center gap-3 overflow-hidden rounded-xl p-1 text-left outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#d5ff66] text-xs font-semibold text-[#172000]">
                NJ
              </span>
              <span className="min-w-0 flex-1 group-data-[state=collapsed]/sidebar:hidden">
                <span className="block truncate text-sm font-medium text-foreground">
                  Nurse Joy
                </span>
                <span className="block truncate text-xs text-muted-foreground">
                  joy@pokemoncenter.org
                </span>
              </span>
              <ChevronRight
                aria-hidden="true"
                className="size-4 shrink-0 text-muted-foreground group-data-[state=collapsed]/sidebar:hidden"
              />
            </button>
          </AnimatedSidebarFooter>

          <AnimatedSidebarRail />
        </AnimatedSidebar>

        <AnimatedSidebarInset className="min-h-0 bg-background">
          <header className="flex h-16 shrink-0 items-center gap-3 border-border border-b px-4">
            <AnimatedSidebarTrigger className="text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <PanelLeft aria-hidden="true" className="size-4" />
            </AnimatedSidebarTrigger>
            <div className="h-5 w-px bg-border" />
            <p className="text-sm font-medium text-foreground">{active}</p>
          </header>

          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-5 sm:p-7 space-y-6">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Hospital Records Management
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground">
                {isDoctorView ? "Doctor Roster & Shifts" : "Patient Admissions & Records"}
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                {isDoctorView
                  ? "View all active doctors, duty status, departments, and coverage schedules."
                  : "View all admitted patients, medical conditions, and assigned physician teams."}
              </p>
            </div>

            {/* Dynamic Table Screen View */}
            <div className="w-full">
              {isDoctorView ? <DoctorsTable /> : <PatientsTable />}
            </div>

            <div className="flex items-center justify-between border-border border-t pt-4 text-xs text-muted-foreground">
              <p>
                Showing view: <span className="font-semibold text-foreground">{active}</span>
              </p>
              <p className="hidden sm:block">Press ⌘B to collapse or expand sidebar</p>
            </div>
          </div>
        </AnimatedSidebarInset>
      </AnimatedSidebarProvider>
    </div>
  );
}
