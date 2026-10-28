import { Request, Response } from "express";
import { Doctor, CreateDoctorInput } from "../models/doctor.types";

let doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Evelyn Reed, MD",
    badgeId: "DOC-401",
    specialty: "General & Trauma Surgery",
    department: "Surgical Services",
    shiftHours: "08:00 - 18:00",
    contactNumber: "+1 (555) 234-5678",
    bio: "Chief of surgical care and trauma resuscitation.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Dr. Marcus Chen, MD",
    badgeId: "DOC-402",
    specialty: "Cardiology",
    department: "Cardiovascular Wing",
    shiftHours: "07:00 - 16:00",
    contactNumber: "+1 (555) 345-6789",
    bio: "Interventional cardiologist with focus on acute coronary syndromes.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Dr. Sophia Patel, MD",
    badgeId: "DOC-403",
    specialty: "Critical Care & ICU",
    department: "Emergency & ICU",
    shiftHours: "18:00 - 06:00",
    contactNumber: "+1 (555) 456-7890",
    bio: "Lead intensivist overseeing overnight ICU coverage.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Dr. James Wilson, MD",
    badgeId: "DOC-404",
    specialty: "Pulmonology & Internal",
    department: "Pulmonary Medicine",
    shiftHours: "08:30 - 17:00",
    contactNumber: "+1 (555) 567-8901",
    bio: "Pulmonologist specializing in critical respiratory support.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Dr. Rachel Adams, MD",
    badgeId: "DOC-405",
    specialty: "Pediatrics & Neonatology",
    department: "Pediatric Unit",
    shiftHours: "09:00 - 17:00",
    contactNumber: "+1 (555) 678-9012",
    bio: "Pediatric specialist and neonatal emergency consultant.",
    createdAt: new Date().toISOString(),
  },
];

export const getAllDoctors = (_req: Request, res: Response) => {
  res.json({ success: true, count: doctors.length, data: doctors });
};

export const getDoctorById = (req: Request, res: Response) => {
  const doctor = doctors.find((d) => d.id === req.params.id);
  if (!doctor) {
    return res.status(404).json({ success: false, message: "Doctor not found" });
  }
  return res.json({ success: true, data: doctor });
};

export const createDoctor = (req: Request, res: Response) => {
  const input: CreateDoctorInput = req.body;

  if (!input.name || !input.badgeId || !input.specialty) {
    return res.status(400).json({
      success: false,
      message: "Name, badgeId, and specialty are required fields.",
    });
  }

  const newDoctor: Doctor = {
    id: Date.now().toString(),
    ...input,
    createdAt: new Date().toISOString(),
  };

  doctors.unshift(newDoctor);
  return res.status(201).json({ success: true, data: newDoctor });
};

export const deleteDoctor = (req: Request, res: Response) => {
  const initialLength = doctors.length;
  doctors = doctors.filter((d) => d.id !== req.params.id);

  if (doctors.length === initialLength) {
    return res.status(404).json({ success: false, message: "Doctor not found" });
  }

  return res.json({ success: true, message: "Doctor deleted successfully" });
};
