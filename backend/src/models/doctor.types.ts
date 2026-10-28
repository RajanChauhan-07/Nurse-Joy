export interface Doctor {
  id: string;
  name: string;
  badgeId: string;
  specialty: string;
  department: string;
  shiftHours: string;
  contactNumber: string;
  bio?: string;
  createdAt: string;
}

export type CreateDoctorInput = Omit<Doctor, "id" | "createdAt">;
