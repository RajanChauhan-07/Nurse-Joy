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
import { Check, ImagePlus, UserPlus, X } from "lucide-react";
import type { DoctorProfile } from "@/components/ui/doctors-table";

interface RegisterDoctorDialogProps {
  onDoctorRegistered: (doctor: DoctorProfile) => void;
}

export function RegisterDoctorDialog({ onDoctorRegistered }: RegisterDoctorDialogProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [badgeId, setBadgeId] = useState("DOC-406");
  const [specialty, setSpecialty] = useState("Neurology & Critical Care");
  const [department, setDepartment] = useState("Neurological Services");
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
    initialValue: "Board-certified neurologist specializing in acute stroke care and rehabilitation.",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formattedName = firstName.trim()
      ? `Dr. ${firstName.trim()} ${lastName.trim()}, MD`.replace(/^Dr\.\s*Dr\./, "Dr.")
      : "Dr. Alex Taylor, MD";

    const newDoctor: DoctorProfile = {
      id: Date.now().toString(),
      name: formattedName,
      badgeId: badgeId.trim() || `DOC-40${Math.floor(6 + Math.random() * 4)}`,
      specialty: specialty.trim() || "Internal Medicine",
      department: department.trim() || "General Medicine",
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
        <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white gap-1.5 cursor-pointer">
          <UserPlus className="size-3.5" />
          Register Doctor
        </Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b border-border px-6 py-4 text-base font-semibold">
            Register Doctor
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="sr-only">
          Register a new medical specialist, assign badge ID, department, and shift hours.
        </DialogDescription>

        <div className="overflow-y-auto max-h-[75vh]">
          <DoctorProfileBg defaultImage="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&auto=format&fit=crop&q=80" />
          <DoctorAvatar defaultImage="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80" />

          <div className="px-6 pb-6 pt-4">
            <form id="register-doctor-form" onSubmit={handleSubmit} className="space-y-4">
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
                <div className="w-full sm:w-1/2 space-y-2">
                  <Label htmlFor={`${id}-department`}>Department</Label>
                  <Input
                    id={`${id}-department`}
                    placeholder="Neurological Services"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`${id}-specialty`}>Specialty</Label>
                  <Input
                    id={`${id}-specialty`}
                    placeholder="Neurology"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    required
                  />
                </div>
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
              </div>

              <div className="space-y-2">
                <Label htmlFor={`${id}-contact`}>Direct Contact Number</Label>
                <Input
                  id={`${id}-contact`}
                  placeholder="+1 (555) 789-0123"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  required
                />
              </div>

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
        </div>

        <DialogFooter className="border-t border-border px-6 py-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" form="register-doctor-form" className="bg-orange-500 hover:bg-orange-600 text-white">
            Register Doctor
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DoctorProfileBg({ defaultImage }: { defaultImage?: string }) {
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
            alt={previewUrl ? "Uploaded preview" : "Doctor clinic banner"}
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

function DoctorAvatar({ defaultImage }: { defaultImage?: string }) {
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
            alt="Physician avatar"
          />
        )}
        <button
          type="button"
          className="absolute flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
          onClick={handleThumbnailClick}
          aria-label="Change physician photo"
        >
          <ImagePlus size={16} strokeWidth={2} aria-hidden="true" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
          aria-label="Upload physician photo"
        />
      </div>
    </div>
  );
}

export default RegisterDoctorDialog;
