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
import { Check, ChevronDown, UserPlus } from "lucide-react";
import type { DoctorProfile } from "@/components/ui/doctors-table";

interface RegisterDoctorDialogProps {
  onDoctorRegistered: (doctor: DoctorProfile) => void;
}

const specialtyDepartments: Record<string, string> = {
  General: "General Medicine & Surgery",
  Neuro: "Neurological Services",
  Nephro: "Nephrology & Dialysis",
  Cardio: "Cardiovascular Wing",
  Pediatrics: "Pediatric Unit",
  Orthopedics: "Orthopedics & Sports Medicine",
  Pulmonology: "Pulmonary Medicine",
  "ICU / Critical Care": "Emergency & ICU",
  Oncology: "Oncology Care Center",
  Dermatology: "Dermatology Clinic",
};

export function RegisterDoctorDialog({ onDoctorRegistered }: RegisterDoctorDialogProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [badgeId, setBadgeId] = useState("DOC-406");
  const [specialty, setSpecialty] = useState("General");
  const [department, setDepartment] = useState(specialtyDepartments["General"]);
  const [shiftHours, setShiftHours] = useState("08:00 - 17:00");
  const [contactNumber, setContactNumber] = useState("+1 (555) 789-0123");

  const maxLength = 180;
  const {
    value: bio,
    characterCount,
    handleChange: handleBioChange,
    maxLength: limit,
  } = useCharacterLimit({
    maxLength,
    initialValue: "Board-certified specialist dedicated to clinical excellence and compassionate care.",
  });

  const handleSpecialtyChange = (selected: string) => {
    setSpecialty(selected);
    if (specialtyDepartments[selected]) {
      setDepartment(specialtyDepartments[selected]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formattedName = firstName.trim()
      ? `Dr. ${firstName.trim()} ${lastName.trim()}, MD`.replace(/^Dr\.\s*Dr\./, "Dr.")
      : "Dr. Alex Taylor, MD";

    const newDoctor: DoctorProfile = {
      id: Date.now().toString(),
      name: formattedName,
      badgeId: badgeId.trim() || `DOC-40${Math.floor(6 + Math.random() * 4)}`,
      specialty: specialty.trim() || "General",
      department: department.trim() || "General Medicine & Surgery",
      shiftHours: shiftHours.trim() || "08:00 - 17:00",
      contactNumber: contactNumber.trim() || "+1 (555) 012-3456",
    };

    onDoctorRegistered(newDoctor);
    setOpen(false);

    // Reset form
    setFirstName("");
    setLastName("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-[#e66f92] hover:bg-[#d4597d] text-white gap-1.5 cursor-pointer shadow-sm">
          <UserPlus className="size-3.5" />
          Register Doctor
        </Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col gap-0 p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="border-b border-border px-6 py-4 text-left">
          <DialogTitle className="text-base font-semibold text-foreground">
            Register Doctor
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground mt-0.5">
            Register a new physician, select clinical specialty, and configure department & coverage.
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[75vh] px-6 py-5">
          <form id="register-doctor-form" onSubmit={handleSubmit} className="space-y-4">
            {/* First and Last Name */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1 space-y-2">
                <Label htmlFor={`${id}-doc-first-name`}>First name</Label>
                <Input
                  id={`${id}-doc-first-name`}
                  placeholder="e.g. Alex"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor={`${id}-doc-last-name`}>Last name</Label>
                <Input
                  id={`${id}-doc-last-name`}
                  placeholder="e.g. Taylor"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Badge ID and Specialty */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="w-full sm:w-1/2 space-y-2">
                <Label htmlFor={`${id}-badge`}>Badge ID</Label>
                <div className="relative">
                  <Input
                    id={`${id}-badge`}
                    className="peer pe-9 font-mono"
                    placeholder="DOC-406"
                    value={badgeId}
                    onChange={(e) => setBadgeId(e.target.value)}
                    required
                  />
                  <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                    <Check
                      size={16}
                      strokeWidth={2}
                      className="text-emerald-500"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>

              {/* Specialty input to choose General, Neuro, Nephro, Cardio ..etc.. based on type */}
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
                    <option value="ICU / Critical Care">ICU / Critical Care</option>
                    <option value="Oncology">Oncology</option>
                    <option value="Dermatology">Dermatology</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Department (auto-updated based on specialty type, but editable) */}
            <div className="space-y-2">
              <Label htmlFor={`${id}-department`}>Department</Label>
              <Input
                id={`${id}-department`}
                placeholder="Department name"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              />
            </div>

            {/* Shift Hours & Contact */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1 space-y-2">
                <Label htmlFor={`${id}-shifts`}>Shift Hours</Label>
                <Input
                  id={`${id}-shifts`}
                  placeholder="08:00 - 17:00"
                  value={shiftHours}
                  onChange={(e) => setShiftHours(e.target.value)}
                  required
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor={`${id}-contact`}>Direct Contact Number</Label>
                <Input
                  id={`${id}-contact`}
                  placeholder="+1 (555) 789-0123"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Biography & Credentials */}
            <div className="space-y-2">
              <Label htmlFor={`${id}-doc-bio`}>Physician Biography & Credentials</Label>
              <Textarea
                id={`${id}-doc-bio`}
                placeholder="Specializations, clinical certifications, board credentials..."
                value={bio}
                maxLength={maxLength}
                onChange={handleBioChange}
                aria-describedby={`${id}-doc-bio-desc`}
              />
              <p
                id={`${id}-doc-bio-desc`}
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
          <Button type="submit" form="register-doctor-form" className="bg-[#e66f92] hover:bg-[#d4597d] text-white shadow-sm">
            Register Doctor
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default RegisterDoctorDialog;
