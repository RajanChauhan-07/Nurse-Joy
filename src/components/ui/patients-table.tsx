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
import { Columns3 } from "lucide-react";
import { AdmitPatientDialog } from "@/components/ui/admit-patient-dialog";

export type PatientRecord = {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  assignedDoctor: string;
  room: string;
  lastVisit: string;
};

export const samplePatients: PatientRecord[] = [
  {
    id: "1",
    name: "Aiden Scott",
    age: 28,
    gender: "Male",
    assignedDoctor: "Dr. Evelyn Reed",
    room: "Room 102",
    lastVisit: "2026-10-24",
  },
  {
    id: "2",
    name: "Clara Vance",
    age: 64,
    gender: "Female",
    assignedDoctor: "Dr. Marcus Chen",
    room: "Room 204",
    lastVisit: "2026-10-25",
  },
  {
    id: "3",
    name: "Lucas Rivera",
    age: 19,
    gender: "Male",
    assignedDoctor: "Dr. Evelyn Reed",
    room: "Room 118",
    lastVisit: "2026-10-22",
  },
  {
    id: "4",
    name: "Eleanor Brooks",
    age: 72,
    gender: "Female",
    assignedDoctor: "Dr. Marcus Chen",
    room: "ICU - Bed 04",
    lastVisit: "2026-10-27",
  },
  {
    id: "5",
    name: "Maya Lin",
    age: 34,
    gender: "Female",
    assignedDoctor: "Dr. James Wilson",
    room: "Room 302",
    lastVisit: "2026-10-26",
  },
];

const patientColumns = [
  "Name",
  "Age",
  "Gender",
  "Assigned Doctor",
  "Room",
  "Last Visit",
] as const;

export function PatientsTable() {
  const [patients, setPatients] = useState<PatientRecord[]>(samplePatients);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    ...patientColumns,
  ]);
  const [searchFilter, setSearchFilter] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("");

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      !searchFilter ||
      patient.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      patient.room.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesDoctor =
      !doctorFilter ||
      patient.assignedDoctor.toLowerCase().includes(doctorFilter.toLowerCase());
    return matchesSearch && matchesDoctor;
  });

  const toggleColumn = (col: string) => {
    setVisibleColumns((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col],
    );
  };

  const handlePatientAdmitted = (newPatient: PatientRecord) => {
    setPatients((prev) => [newPatient, ...prev]);
  };

  return (
    <div className="w-full space-y-4 p-5 border border-border rounded-xl bg-background shadow-sm">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pb-2 border-b border-border">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Patients
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Hospital patient directory and doctor assignments
          </p>
        </div>

        <div className="flex items-center gap-2">
          <AdmitPatientDialog onPatientAdmitted={handlePatientAdmitted} />
        </div>
      </div>

      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-2 flex-wrap items-center">
          <Input
            placeholder="Search patient or room..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-56 h-9 text-xs"
          />
          <Input
            placeholder="Filter by doctor..."
            value={doctorFilter}
            onChange={(e) => setDoctorFilter(e.target.value)}
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
              {visibleColumns.includes("Name") && (
                <TableHead className="w-[200px]">Name</TableHead>
              )}
              {visibleColumns.includes("Age") && (
                <TableHead className="w-[100px]">Age</TableHead>
              )}
              {visibleColumns.includes("Gender") && (
                <TableHead className="w-[120px]">Gender</TableHead>
              )}
              {visibleColumns.includes("Assigned Doctor") && (
                <TableHead className="w-[200px]">Assigned Doctor</TableHead>
              )}
              {visibleColumns.includes("Room") && (
                <TableHead className="w-[140px]">Room</TableHead>
              )}
              {visibleColumns.includes("Last Visit") && (
                <TableHead className="w-[140px]">Last Visit</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.length ? (
              filteredPatients.map((patient) => (
                <TableRow key={patient.id} className="hover:bg-muted/40 transition-colors">
                  {visibleColumns.includes("Name") && (
                    <TableCell className="font-semibold text-foreground whitespace-nowrap">
                      {patient.name}
                    </TableCell>
                  )}
                  {visibleColumns.includes("Age") && (
                    <TableCell className="whitespace-nowrap text-muted-foreground text-sm">
                      {patient.age}
                    </TableCell>
                  )}
                  {visibleColumns.includes("Gender") && (
                    <TableCell className="whitespace-nowrap text-muted-foreground text-sm">
                      {patient.gender}
                    </TableCell>
                  )}
                  {visibleColumns.includes("Assigned Doctor") && (
                    <TableCell className="whitespace-nowrap font-medium text-foreground">
                      {patient.assignedDoctor}
                    </TableCell>
                  )}
                  {visibleColumns.includes("Room") && (
                    <TableCell className="whitespace-nowrap text-muted-foreground text-xs font-mono">
                      {patient.room}
                    </TableCell>
                  )}
                  {visibleColumns.includes("Last Visit") && (
                    <TableCell className="whitespace-nowrap text-muted-foreground text-xs font-mono">
                      {patient.lastVisit}
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
