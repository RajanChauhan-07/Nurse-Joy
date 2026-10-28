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
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Columns3, UserPlus } from "lucide-react";

export type DoctorProfile = {
  id: string;
  name: string;
  badgeId: string;
  specialty: string;
  department: string;
  shiftHours: string;
  contactNumber: string;
};

export const sampleDoctors: DoctorProfile[] = [
  {
    id: "1",
    name: "Dr. Evelyn Reed, MD",
    badgeId: "DOC-401",
    specialty: "General & Trauma Surgery",
    department: "Surgical Services",
    shiftHours: "08:00 - 18:00",
    contactNumber: "+1 (555) 234-5678",
  },
  {
    id: "2",
    name: "Dr. Marcus Chen, MD",
    badgeId: "DOC-402",
    specialty: "Cardiology",
    department: "Cardiovascular Wing",
    shiftHours: "07:00 - 16:00",
    contactNumber: "+1 (555) 345-6789",
  },
  {
    id: "3",
    name: "Dr. Sophia Patel, MD",
    badgeId: "DOC-403",
    specialty: "Critical Care & ICU",
    department: "Emergency & ICU",
    shiftHours: "18:00 - 06:00",
    contactNumber: "+1 (555) 456-7890",
  },
  {
    id: "4",
    name: "Dr. James Wilson, MD",
    badgeId: "DOC-404",
    specialty: "Pulmonology & Internal",
    department: "Pulmonary Medicine",
    shiftHours: "08:30 - 17:00",
    contactNumber: "+1 (555) 567-8901",
  },
  {
    id: "5",
    name: "Dr. Rachel Adams, MD",
    badgeId: "DOC-405",
    specialty: "Pediatrics & Neonatology",
    department: "Pediatric Unit",
    shiftHours: "09:00 - 17:00",
    contactNumber: "+1 (555) 678-9012",
  },
];

const doctorColumns = [
  "Physician - Name",
  "Badge ID",
  "Specialty",
  "Department",
  "Shift Hours",
  "Contact",
] as const;

export function DoctorsTable() {
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    ...doctorColumns,
  ]);
  const [searchFilter, setSearchFilter] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("");

  const filteredDoctors = sampleDoctors.filter((doc) => {
    const matchesSearch =
      !searchFilter ||
      doc.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      doc.department.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesSpecialty =
      !specialtyFilter ||
      doc.specialty.toLowerCase().includes(specialtyFilter.toLowerCase());
    return matchesSearch && matchesSpecialty;
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
          <h3 className="text-lg font-semibold text-foreground">
            Doctors
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Active physician roster, medical departments, and contact details
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
            placeholder="Search doctor or department..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-56 h-9 text-xs"
          />
          <Input
            placeholder="Filter by specialty..."
            value={specialtyFilter}
            onChange={(e) => setSpecialtyFilter(e.target.value)}
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
              {visibleColumns.includes("Physician - Name") && (
                <TableHead className="w-[220px]">Physician - Name</TableHead>
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
                <TableHead className="w-[140px]">Shift Hours</TableHead>
              )}
              {visibleColumns.includes("Contact") && (
                <TableHead className="w-[160px]">Contact</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDoctors.length ? (
              filteredDoctors.map((doc) => (
                <TableRow key={doc.id} className="hover:bg-muted/40 transition-colors">
                  {visibleColumns.includes("Physician - Name") && (
                    <TableCell className="font-semibold text-foreground whitespace-nowrap">
                      {doc.name}
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
                  {visibleColumns.includes("Contact") && (
                    <TableCell className="whitespace-nowrap text-muted-foreground text-xs font-mono">
                      {doc.contactNumber}
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
