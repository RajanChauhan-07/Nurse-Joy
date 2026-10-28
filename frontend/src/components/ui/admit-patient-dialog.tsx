"use client";

import { useState, useId, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCharacterLimit } from "@/components/ui/dialog-utils/use-character-limit";
import { ChevronDown, UserPlus } from "lucide-react";
import type { PatientRecord } from "@/components/ui/patients-table";

interface AdmitPatientDialogProps {
  onPatientAdmitted: (patient: PatientRecord) => void;
}

const specialtyDoctors: Record<string, string> = {
  General: "Dr. Evelyn Reed",
  Cardio: "Dr. Marcus Chen",
  Neuro: "Dr. Sophia Patel",
  Nephro: "Dr. Alex Rivera",
  Pediatrics: "Dr. Rachel Adams",
  Orthopedics: "Dr. Kevin Zhang",
  Pulmonology: "Dr. James Wilson",
  ICU: "Dr. Sophia Patel",
};

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] as const;

export function AdmitPatientDialog({ onPatientAdmitted }: AdmitPatientDialogProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"Male" | "Female" | "Other">("Male");
  const [bloodGroup, setBloodGroup] = useState<string>("O+");
  const [specialty, setSpecialty] = useState("General");
  const [assignedDoctor, setAssignedDoctor] = useState("Dr. Evelyn Reed");

  const maxLength = 180;
  const {
    value: notes,
    characterCount,
    handleChange: handleNotesChange,
    maxLength: limit,
  } = useCharacterLimit({
    maxLength,
    initialValue: "Admitted for clinical assessment and targeted therapy.",
  });

  const handleSpecialtyChange = (selected: string) => {
    setSpecialty(selected);
    if (specialtyDoctors[selected]) {
      setAssignedDoctor(specialtyDoctors[selected]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim() || "New Patient";
    const newPatient: PatientRecord = {
      id: Date.now().toString(),
      name: fullName,
      age: parseInt(age, 10) || 30,
      gender,
      bloodGroup,
      assignedDoctor: assignedDoctor.trim() || "Dr. Evelyn Reed",
      lastVisit: new Date().toISOString().split("T")[0],
    };

    onPatientAdmitted(newPatient);
    setOpen(false);

    // Reset form
    setFirstName("");
    setLastName("");
    setAge("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-[#e66f92] hover:bg-[#d4597d] text-white gap-1.5 cursor-pointer shadow-sm">
          <UserPlus className="size-3.5" />
          Admit Patient
        </Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col gap-0 p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="border-b border-border px-6 py-4 text-left">
          <DialogTitle className="text-base font-semibold text-foreground">
            Admit Patient
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground mt-0.5">
            Fill in patient medical admission details, blood group, and physician team.
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[75vh] px-6 py-5">
          <form id="admit-patient-form" onSubmit={handleSubmit} className="space-y-4">
            {/* First and Last Name */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1 space-y-2">
                <Label htmlFor={`${id}-first-name`}>First name</Label>
                <Input
                  id={`${id}-first-name`}
                  placeholder="e.g. Clara"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor={`${id}-last-name`}>Last name</Label>
                <Input
                  id={`${id}-last-name`}
                  placeholder="e.g. Vance"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Age, Gender, Blood Group */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`${id}-age`}>Age</Label>
                <Input
                  id={`${id}-age`}
                  type="number"
                  min="1"
                  max="125"
                  placeholder="35"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>

              {/* Fixed Gender Input */}
              <div className="space-y-2">
                <Label htmlFor={`${id}-gender`}>Gender</Label>
                <div className="relative">
                  <select
                    id={`${id}-gender`}
                    className="flex h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer transition-colors"
                    value={gender}
                    onChange={(e) => setGender(e.target.value as "Male" | "Female" | "Other")}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                </div>
              </div>

              {/* Blood Group */}
              <div className="space-y-2">
                <Label htmlFor={`${id}-blood-group`}>Blood Group</Label>
                <div className="relative">
                  <select
                    id={`${id}-blood-group`}
                    className="flex h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer transition-colors"
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                  >
                    {bloodGroups.map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Specialty & Assigned Doctor */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="w-full sm:w-1/2 space-y-2">
                <Label htmlFor={`${id}-specialty`}>Specialty</Label>
                <div className="relative">
                  <select
                    id={`${id}-specialty`}
                    className="flex h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer transition-colors"
                    value={specialty}
                    onChange={(e) => handleSpecialtyChange(e.target.value)}
                  >
                    <option value="General">General</option>
                    <option value="Neuro">Neuro</option>
                    <option value="Nephro">Nephro</option>
                    <option value="Cardio">Cardio</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Pulmonology">Pulmonology</option>
                    <option value="ICU">ICU & Critical Care</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                </div>
              </div>

              <div className="w-full sm:w-1/2 space-y-2">
                <Label htmlFor={`${id}-doctor`}>Assigned Doctor</Label>
                <Input
                  id={`${id}-doctor`}
                  placeholder="Dr. Evelyn Reed"
                  value={assignedDoctor}
                  onChange={(e) => setAssignedDoctor(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor={`${id}-notes`}>Admission Notes / Diagnosis Summary</Label>
              <Textarea
                id={`${id}-notes`}
                placeholder="Enter clinical condition or admission remarks"
                value={notes}
                maxLength={maxLength}
                onChange={handleNotesChange}
                aria-describedby={`${id}-notes-desc`}
              />
              <p
                id={`${id}-notes-desc`}
                className="mt-2 text-right text-xs text-muted-foreground"
                role="status"
                aria-live="polite"
              >
                <span className="tabular-nums">{limit - characterCount}</span> characters left
              </p>
            </div>
          </form>
        </div>

        <DialogFooter className="border-t border-border px-6 py-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" form="admit-patient-form" className="bg-[#e66f92] hover:bg-[#d4597d] text-white shadow-sm">
            Admit Patient
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AdmitPatientDialog;
