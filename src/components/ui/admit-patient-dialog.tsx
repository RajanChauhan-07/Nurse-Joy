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
import { useImageUpload } from "@/components/ui/dialog-utils/use-image-upload";
import { ImagePlus, UserPlus, X } from "lucide-react";
import type { PatientRecord } from "@/components/ui/patients-table";

interface AdmitPatientDialogProps {
  onPatientAdmitted: (patient: PatientRecord) => void;
}

export function AdmitPatientDialog({ onPatientAdmitted }: AdmitPatientDialogProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"Male" | "Female" | "Other">("Male");
  const [assignedDoctor, setAssignedDoctor] = useState("Dr. Evelyn Reed");
  const [room, setRoom] = useState("Room 106");

  const maxLength = 180;
  const {
    value: notes,
    characterCount,
    handleChange: handleNotesChange,
    maxLength: limit,
  } = useCharacterLimit({
    maxLength,
    initialValue: "Admitted for routine post-operative monitoring and recovery.",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim() || "New Patient";
    const newPatient: PatientRecord = {
      id: Date.now().toString(),
      name: fullName,
      age: parseInt(age, 10) || 28,
      gender,
      assignedDoctor: assignedDoctor.trim() || "Dr. Evelyn Reed",
      room: room.trim() || "Room 101",
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
        <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white gap-1.5 cursor-pointer">
          <UserPlus className="size-3.5" />
          Admit Patient
        </Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b border-border px-6 py-4 text-base font-semibold">
            Admit Patient
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="sr-only">
          Fill in patient admission details, assigned room, and attending physician.
        </DialogDescription>

        <div className="overflow-y-auto max-h-[75vh]">
          <PatientProfileBg defaultImage="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&auto=format&fit=crop&q=80" />
          <PatientAvatar defaultImage="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80" />

          <div className="px-6 pb-6 pt-4">
            <form id="admit-patient-form" onSubmit={handleSubmit} className="space-y-4">
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

              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="w-full sm:w-1/3 space-y-2">
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
                <div className="w-full sm:w-2/3 space-y-2">
                  <Label htmlFor={`${id}-gender`}>Gender</Label>
                  <select
                    id={`${id}-gender`}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={gender}
                    onChange={(e) => setGender(e.target.value as "Male" | "Female" | "Other")}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`${id}-doctor`}>Assigned Doctor</Label>
                  <Input
                    id={`${id}-doctor`}
                    placeholder="Dr. Evelyn Reed"
                    value={assignedDoctor}
                    onChange={(e) => setAssignedDoctor(e.target.value)}
                    required
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`${id}-room`}>Room / Ward</Label>
                  <Input
                    id={`${id}-room`}
                    placeholder="Room 102"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`${id}-notes`}>Admission Notes / Diagnosis Summary</Label>
                <Textarea
                  id={`${id}-notes`}
                  placeholder="Enter medical background or admission remarks"
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
        </div>

        <DialogFooter className="border-t border-border px-6 py-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" form="admit-patient-form" className="bg-orange-500 hover:bg-orange-600 text-white">
            Admit Patient
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function PatientProfileBg({ defaultImage }: { defaultImage?: string }) {
  const [hideDefault, setHideDefault] = useState(false);
  const {
    previewUrl,
    fileInputRef,
    handleThumbnailClick,
    handleFileChange,
    handleRemove,
  } = useImageUpload();

  const currentImage = previewUrl || (!hideDefault ? defaultImage : null);

  const handleImageRemove = () => {
    handleRemove();
    setHideDefault(true);
  };

  return (
    <div className="h-32">
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-muted">
        {currentImage && (
          <img
            className="h-full w-full object-cover"
            src={currentImage}
            alt={previewUrl ? "Uploaded preview" : "Patient cover banner"}
            width={512}
            height={96}
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          <button
            type="button"
            className="z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
            onClick={handleThumbnailClick}
            aria-label={currentImage ? "Change banner image" : "Upload banner image"}
          >
            <ImagePlus size={16} strokeWidth={2} aria-hidden="true" />
          </button>
          {currentImage && (
            <button
              type="button"
              className="z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
              onClick={handleImageRemove}
              aria-label="Remove banner image"
            >
              <X size={16} strokeWidth={2} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
        aria-label="Upload banner image file"
      />
    </div>
  );
}

function PatientAvatar({ defaultImage }: { defaultImage?: string }) {
  const { previewUrl, fileInputRef, handleThumbnailClick, handleFileChange } =
    useImageUpload();

  const currentImage = previewUrl || defaultImage;

  return (
    <div className="-mt-10 px-6">
      <div className="relative flex size-20 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-muted shadow-sm shadow-black/10">
        {currentImage && (
          <img
            src={currentImage}
            className="h-full w-full object-cover"
            width={80}
            height={80}
            alt="Patient avatar"
          />
        )}
        <button
          type="button"
          className="absolute flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
          onClick={handleThumbnailClick}
          aria-label="Change patient photo"
        >
          <ImagePlus size={16} strokeWidth={2} aria-hidden="true" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
          aria-label="Upload patient photo"
        />
      </div>
    </div>
  );
}

export default AdmitPatientDialog;
