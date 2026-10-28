"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Columns3, HeartPulse, UserPlus } from "lucide-react";

export type AssignedCaregiver = {
  name: string;
  email: string;
  avatar: string;
  role: string;
};

export type PatientRecord = {
  id: string;
  patientId: string;
  name: string;
  ageGender: string;
  condition: string;
  wardRoom: string;
  admittedAt: string;
  status: "Admitted" | "In Treatment" | "Discharged" | "Critical";
  caregivers: AssignedCaregiver[];
};

export const samplePatients: PatientRecord[] = [
  {
    id: "1",
    patientId: "PAT-1082",
    name: "Aiden Scott",
    ageGender: "28 / Male",
    condition: "Acute Appendicitis",
    wardRoom: "Ward A - Room 102",
    admittedAt: "2026-10-24",
    status: "In Treatment",
    caregivers: [
      {
        name: "Dr. Evelyn Reed",
        email: "evelyn.reed@pokemoncenter.org",
        avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=120&auto=format&fit=crop&q=80",
        role: "Lead Surgeon",
      },
      {
        name: "Nurse Joy",
        email: "joy@pokemoncenter.org",
        avatar: "https://images.unsplash.com/photo-1594824813583-059ba6d5be9b?w=120&auto=format&fit=crop&q=80",
        role: "Primary Care Nurse",
      },
    ],
  },
  {
    id: "2",
    patientId: "PAT-1083",
    name: "Clara Vance",
    ageGender: "64 / Female",
    condition: "Hypertension Stage 2",
    wardRoom: "Cardio Wing - 204",
    admittedAt: "2026-10-25",
    status: "Admitted",
    caregivers: [
      {
        name: "Dr. Marcus Chen",
        email: "marcus.chen@pokemoncenter.org",
        avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=120&auto=format&fit=crop&q=80",
        role: "Cardiologist",
      },
      {
        name: "Nurse Joy",
        email: "joy@pokemoncenter.org",
        avatar: "https://images.unsplash.com/photo-1594824813583-059ba6d5be9b?w=120&auto=format&fit=crop&q=80",
        role: "Monitoring Nurse",
      },
    ],
  },
  {
    id: "3",
    patientId: "PAT-1084",
    name: "Lucas Rivera",
    ageGender: "19 / Male",
    condition: "Fractured Tibia",
    wardRoom: "Ortho Unit - 118",
    admittedAt: "2026-10-22",
    status: "Discharged",
    caregivers: [
      {
        name: "Dr. Evelyn Reed",
        email: "evelyn.reed@pokemoncenter.org",
        avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=120&auto=format&fit=crop&q=80",
        role: "Orthopedic Surgeon",
      },
    ],
  },
  {
    id: "4",
    patientId: "PAT-1085",
    name: "Eleanor Brooks",
    ageGender: "72 / Female",
    condition: "Cardiac Arrhythmia",
    wardRoom: "ICU - Bed 04",
    admittedAt: "2026-10-27",
    status: "Critical",
    caregivers: [
      {
        name: "Dr. Marcus Chen",
        email: "marcus.chen@pokemoncenter.org",
        avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=120&auto=format&fit=crop&q=80",
        role: "Lead Cardiologist",
      },
      {
        name: "Dr. Sophia Patel",
        email: "sophia.patel@pokemoncenter.org",
        avatar: "https://images.unsplash.com/photo-1594824813603-ee838882894b?w=120&auto=format&fit=crop&q=80",
        role: "Intensivist",
      },
    ],
  },
  {
    id: "5",
    patientId: "PAT-1086",
    name: "Maya Lin",
    ageGender: "34 / Female",
    condition: "Severe Pneumonia",
    wardRoom: "Pulmonology - 302",
    admittedAt: "2026-10-26",
    status: "In Treatment",
    caregivers: [
      {
        name: "Dr. James Wilson",
        email: "james.wilson@pokemoncenter.org",
        avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=120&auto=format&fit=crop&q=80",
        role: "Pulmonologist",
      },
    ],
  },
];

const patientColumns = [
  "Patient",
  "ID",
  "Condition",
  "Ward / Room",
  "Admitted",
  "Care Team",
  "Status",
] as const;

export function PatientsTable() {
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    ...patientColumns,
  ]);
  const [conditionFilter, setConditionFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredPatients = samplePatients.filter((patient) => {
    const matchesCondition =
      !conditionFilter ||
      patient.condition.toLowerCase().includes(conditionFilter.toLowerCase()) ||
      patient.name.toLowerCase().includes(conditionFilter.toLowerCase());
    const matchesStatus =
      !statusFilter ||
      patient.status.toLowerCase().includes(statusFilter.toLowerCase());
    return matchesCondition && matchesStatus;
  });

  const toggleColumn = (col: string) => {
    setVisibleColumns((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col],
    );
  };

  return (
    <div className="w-full space-y-4 p-5 border border-border rounded-xl bg-background shadow-sm">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pb-2 border-b border-border">
        <div>
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <HeartPulse className="size-5 text-orange-500" />
            Registered Patients
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Active admissions, medical status, and assigned care staff
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white gap-1.5">
            <UserPlus className="size-3.5" />
            Admit Patient
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-2 flex-wrap items-center">
          <Input
            placeholder="Search patient or condition..."
            value={conditionFilter}
            onChange={(e) => setConditionFilter(e.target.value)}
            className="w-56 h-9 text-xs"
          />
          <Input
            placeholder="Filter by status (e.g. Critical)..."
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-52 h-9 text-xs"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 text-xs h-9">
              <Columns3 className="size-3.5" />
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-white border shadow-md">
            {patientColumns.map((col) => (
              <DropdownMenuCheckboxItem
                key={col}
                checked={visibleColumns.includes(col)}
                onCheckedChange={() => toggleColumn(col)}
              >
                {col}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-muted/30">
              {visibleColumns.includes("Patient") && (
                <TableHead className="w-[200px]">Patient Name</TableHead>
              )}
              {visibleColumns.includes("ID") && (
                <TableHead className="w-[120px]">Patient ID</TableHead>
              )}
              {visibleColumns.includes("Condition") && (
                <TableHead className="w-[180px]">Diagnosis / Condition</TableHead>
              )}
              {visibleColumns.includes("Ward / Room") && (
                <TableHead className="w-[160px]">Ward / Room</TableHead>
              )}
              {visibleColumns.includes("Admitted") && (
                <TableHead className="w-[130px]">Admitted Date</TableHead>
              )}
              {visibleColumns.includes("Care Team") && (
                <TableHead className="w-[150px]">Care Team</TableHead>
              )}
              {visibleColumns.includes("Status") && (
                <TableHead className="w-[120px]">Status</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.length ? (
              filteredPatients.map((patient) => (
                <TableRow key={patient.id} className="hover:bg-muted/40 transition-colors">
                  {visibleColumns.includes("Patient") && (
                    <TableCell className="font-medium whitespace-nowrap">
                      <div>
                        <span className="font-semibold text-foreground block">
                          {patient.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {patient.ageGender}
                        </span>
                      </div>
                    </TableCell>
                  )}
                  {visibleColumns.includes("ID") && (
                    <TableCell className="whitespace-nowrap font-mono text-xs text-muted-foreground">
                      {patient.patientId}
                    </TableCell>
                  )}
                  {visibleColumns.includes("Condition") && (
                    <TableCell className="whitespace-nowrap font-medium text-foreground">
                      {patient.condition}
                    </TableCell>
                  )}
                  {visibleColumns.includes("Ward / Room") && (
                    <TableCell className="whitespace-nowrap text-muted-foreground text-xs">
                      {patient.wardRoom}
                    </TableCell>
                  )}
                  {visibleColumns.includes("Admitted") && (
                    <TableCell className="whitespace-nowrap text-muted-foreground text-xs font-mono">
                      {patient.admittedAt}
                    </TableCell>
                  )}
                  {visibleColumns.includes("Care Team") && (
                    <TableCell className="min-w-[120px]">
                      <div className="flex -space-x-2">
                        <TooltipProvider>
                          {patient.caregivers.map((staff, idx) => (
                            <Tooltip key={idx}>
                              <TooltipTrigger asChild>
                                <Avatar className="h-8 w-8 ring-2 ring-white hover:z-10 cursor-pointer">
                                  <AvatarImage src={staff.avatar} alt={staff.name} />
                                  <AvatarFallback className="bg-orange-100 text-orange-800 text-xs">
                                    {staff.name[0]}
                                  </AvatarFallback>
                                </Avatar>
                              </TooltipTrigger>
                              <TooltipContent className="text-sm bg-neutral-900 text-white p-2">
                                <p className="font-semibold">{staff.name}</p>
                                <p className="text-xs text-neutral-300">{staff.email}</p>
                                <p className="text-xs italic text-orange-400">{staff.role}</p>
                              </TooltipContent>
                            </Tooltip>
                          ))}
                        </TooltipProvider>
                      </div>
                    </TableCell>
                  )}
                  {visibleColumns.includes("Status") && (
                    <TableCell className="whitespace-nowrap">
                      <Badge
                        className={cn(
                          "whitespace-nowrap text-[11px] font-medium border-none",
                          patient.status === "Admitted" && "bg-blue-500 text-white",
                          patient.status === "In Treatment" && "bg-yellow-500 text-white",
                          patient.status === "Discharged" && "bg-emerald-600 text-white",
                          patient.status === "Critical" && "bg-rose-600 text-white",
                        )}
                      >
                        {patient.status}
                      </Badge>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={visibleColumns.length}
                  className="text-center py-8 text-muted-foreground"
                >
                  No matching patient records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default PatientsTable;
