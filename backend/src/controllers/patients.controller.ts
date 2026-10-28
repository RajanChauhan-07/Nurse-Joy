import { Request, Response } from "express";
import { Patient, CreatePatientInput } from "../models/patient.types";

let patients: Patient[] = [
  {
    id: "1",
    name: "Aiden Scott",
    age: 28,
    gender: "Male",
    bloodGroup: "O+",
    assignedDoctor: "Dr. Evelyn Reed",
    lastVisit: "2026-10-24",
    notes: "Admitted for observation",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Clara Vance",
    age: 64,
    gender: "Female",
    bloodGroup: "A+",
    assignedDoctor: "Dr. Marcus Chen",
    lastVisit: "2026-10-25",
    notes: "Cardiac monitoring",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Lucas Rivera",
    age: 19,
    gender: "Male",
    bloodGroup: "B+",
    assignedDoctor: "Dr. Evelyn Reed",
    lastVisit: "2026-10-22",
    notes: "Orthopedic surgery recovery",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Eleanor Brooks",
    age: 72,
    gender: "Female",
    bloodGroup: "AB+",
    assignedDoctor: "Dr. Marcus Chen",
    lastVisit: "2026-10-27",
    notes: "Post-op ICU care",
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Maya Lin",
    age: 34,
    gender: "Female",
    bloodGroup: "O-",
    assignedDoctor: "Dr. James Wilson",
    lastVisit: "2026-10-26",
    notes: "Pulmonary rehabilitation",
    createdAt: new Date().toISOString(),
  },
];

export const getAllPatients = (_req: Request, res: Response) => {
  res.json({ success: true, count: patients.length, data: patients });
};

export const getPatientById = (req: Request, res: Response) => {
  const patient = patients.find((p) => p.id === req.params.id);
  if (!patient) {
    return res.status(404).json({ success: false, message: "Patient not found" });
  }
  return res.json({ success: true, data: patient });
};

export const createPatient = (req: Request, res: Response) => {
  const input: CreatePatientInput = req.body;

  if (!input.name || !input.age || !input.gender || !input.bloodGroup) {
    return res.status(400).json({
      success: false,
      message: "Name, age, gender, and bloodGroup are required fields.",
    });
  }

  const newPatient: Patient = {
    id: Date.now().toString(),
    ...input,
    createdAt: new Date().toISOString(),
  };

  patients.unshift(newPatient);
  return res.status(201).json({ success: true, data: newPatient });
};

export const deletePatient = (req: Request, res: Response) => {
  const initialLength = patients.length;
  patients = patients.filter((p) => p.id !== req.params.id);

  if (patients.length === initialLength) {
    return res.status(404).json({ success: false, message: "Patient not found" });
  }

  return res.json({ success: true, message: "Patient deleted successfully" });
};
