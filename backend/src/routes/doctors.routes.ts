import { Router } from "express";
import {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  deleteDoctor,
} from "../controllers/doctors.controller";

const router = Router();

router.get("/", getAllDoctors);
router.get("/:id", getDoctorById);
router.post("/", createDoctor);
router.delete("/:id", deleteDoctor);

export default router;
