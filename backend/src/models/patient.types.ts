export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  bloodGroup: string;
  assignedDoctor: string;
  room?: string;
  lastVisit: string;
  notes?: string;
  createdAt: string;
}

export type CreatePatientInput = Omit<Patient, "id" | "createdAt">;
