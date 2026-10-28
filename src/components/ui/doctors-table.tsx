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
import { Columns3, Stethoscope, UserPlus } from "lucide-react";

export type DoctorProfile = {
  id: string;
  badgeId: string;
  name: string;
  specialty: string;
  department: string;
  experience: string;
  shiftHours: string;
  status: "On Duty" | "In Surgery" | "On Call" | "Off Duty";
  avatar: string;
  email: string;
  contactNumber: string;
  patientsCount: number;
};

export const sampleDoctors: DoctorProfile[] = [
  {
    id: "1",
    badgeId: "DOC-401",
    name: "Dr. Evelyn Reed, MD",
    specialty: "General & Trauma Surgery",
    department: "Surgical Services",
    experience: "12 yrs",
    shiftHours: "08:00 - 18:00",
    status: "In Surgery",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=120&auto=format&fit=crop&q=80",
    email: "evelyn.reed@pokemoncenter.org",
    contactNumber: "+1 (555) 234-5678",
    patientsCount: 6,
  },
  {
    id: "2",
    badgeId: "DOC-402",
    name: "Dr. Marcus Chen, MD",
    specialty: "Cardiology",
    department: "Cardiovascular Wing",
    experience: "15 yrs",
    shiftHours: "07:00 - 16:00",
    status: "On Duty",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=120&auto=format&fit=crop&q=80",
    email: "marcus.chen@pokemoncenter.org",
    contactNumber: "+1 (555) 345-6789",
    patientsCount: 11,
  },
  {
    id: "3",
    badgeId: "DOC-403",
    name: "Dr. Sophia Patel, MD",
    specialty: "Critical Care & ICU",
    department: "Emergency & ICU",
    experience: "9 yrs",
    shiftHours: "18:00 - 06:00",
    status: "On Call",
    avatar: "https://images.unsplash.com/photo-1594824813603-ee838882894b?w=120&auto=format&fit=crop&q=80",
    email: "sophia.patel@pokemoncenter.org",
    contactNumber: "+1 (555) 456-7890",
    patientsCount: 4,
  },
  {
    id: "4",
    badgeId: "DOC-404",
    name: "Dr. James Wilson, MD",
    specialty: "Pulmonology & Internal",
    department: "Pulmonary Medicine",
    experience: "18 yrs",
    shiftHours: "08:30 - 17:00",
    status: "On Duty",
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=120&auto=format&fit=crop&q=80",
    email: "james.wilson@pokemoncenter.org",
    contactNumber: "+1 (555) 567-8901",
    patientsCount: 8,
  },
  {
    id: "5",
    badgeId: "DOC-405",
    name: "Dr. Rachel Adams, MD",
    specialty: "Pediatrics & Neonatology",
    department: "Pediatric Unit",
    experience: "7 yrs",
    shiftHours: "09:00 - 17:00",
    status: "Off Duty",
    avatar: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=120&auto=format&fit=crop&q=80",
    email: "rachel.adams@pokemoncenter.org",
    contactNumber: "+1 (555) 678-9012",
    patientsCount: 0,
  },
];

const doctorColumns = [
  "Doctor",
  "Badge ID",
  "Specialty",
  "Department",
  "Shift Hours",
  "Patients",
  "Status",
] as const;

export function DoctorsTable() {
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    ...doctorColumns,
  ]);
  const [searchFilter, setSearchFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredDoctors = sampleDoctors.filter((doc) => {
    const matchesSearch =
      !searchFilter ||
      doc.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchFilter.toLowerCase()) ||
      doc.department.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesStatus =
      !statusFilter ||
      doc.status.toLowerCase().includes(statusFilter.toLowerCase());
    return matchesSearch && matchesStatus;
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
            <Stethoscope className="size-5 text-orange-500" />
            Medical Staff & Specialists
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Active physician roster, specialty departments, and shift coverage
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white gap-1.5">
            <UserPlus className="size-3.5" />
            Register Doctor
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-2 flex-wrap items-center">
          <Input
            placeholder="Search doctor or specialty..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-56 h-9 text-xs"
          />
          <Input
            placeholder="Filter by status (e.g. On Duty)..."
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
            {doctorColumns.map((col) => (
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
              {visibleColumns.includes("Doctor") && (
                <TableHead className="w-[220px]">Physician</TableHead>
              )}
              {visibleColumns.includes("Badge ID") && (
                <TableHead className="w-[120px]">Badge ID</TableHead>
              )}
              {visibleColumns.includes("Specialty") && (
                <TableHead className="w-[200px]">Specialty</TableHead>
              )}
              {visibleColumns.includes("Department") && (
                <TableHead className="w-[180px]">Department</TableHead>
              )}
              {visibleColumns.includes("Shift Hours") && (
                <TableHead className="w-[140px]">Shift Schedule</TableHead>
              )}
              {visibleColumns.includes("Patients") && (
                <TableHead className="w-[100px]">Patients</TableHead>
              )}
              {visibleColumns.includes("Status") && (
                <TableHead className="w-[120px]">Duty Status</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDoctors.length ? (
              filteredDoctors.map((doc) => (
                <TableRow key={doc.id} className="hover:bg-muted/40 transition-colors">
                  {visibleColumns.includes("Doctor") && (
                    <TableCell className="font-medium whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Avatar className="h-9 w-9 ring-1 ring-border cursor-pointer">
                                <AvatarImage src={doc.avatar} alt={doc.name} />
                                <AvatarFallback className="bg-orange-100 text-orange-800 text-xs">
                                  {doc.name.slice(4, 6)}
                                </AvatarFallback>
                              </Avatar>
                            </TooltipTrigger>
                            <TooltipContent className="text-sm bg-neutral-900 text-white p-2">
                              <p className="font-semibold">{doc.name}</p>
                              <p className="text-xs text-neutral-300">{doc.email}</p>
                              <p className="text-xs text-neutral-300">{doc.contactNumber}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <div>
                          <span className="font-semibold text-foreground block">
                            {doc.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {doc.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                  )}
                  {visibleColumns.includes("Badge ID") && (
                    <TableCell className="whitespace-nowrap font-mono text-xs text-muted-foreground">
                      {doc.badgeId}
                    </TableCell>
                  )}
                  {visibleColumns.includes("Specialty") && (
                    <TableCell className="whitespace-nowrap font-medium text-foreground">
                      {doc.specialty}
                    </TableCell>
                  )}
                  {visibleColumns.includes("Department") && (
                    <TableCell className="whitespace-nowrap text-muted-foreground text-xs">
                      {doc.department}
                    </TableCell>
                  )}
                  {visibleColumns.includes("Shift Hours") && (
                    <TableCell className="whitespace-nowrap text-muted-foreground text-xs font-mono">
                      {doc.shiftHours}
                    </TableCell>
                  )}
                  {visibleColumns.includes("Patients") && (
                    <TableCell className="whitespace-nowrap">
                      <span className="inline-flex items-center justify-center font-semibold text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-800 border border-neutral-200">
                        {doc.patientsCount} active
                      </span>
                    </TableCell>
                  )}
                  {visibleColumns.includes("Status") && (
                    <TableCell className="whitespace-nowrap">
                      <Badge
                        className={cn(
                          "whitespace-nowrap text-[11px] font-medium border-none",
                          doc.status === "On Duty" && "bg-emerald-600 text-white",
                          doc.status === "In Surgery" && "bg-purple-600 text-white",
                          doc.status === "On Call" && "bg-amber-500 text-white",
                          doc.status === "Off Duty" && "bg-gray-400 text-white",
                        )}
                      >
                        {doc.status}
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
                  No matching doctors found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default DoctorsTable;
