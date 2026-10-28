import { Router } from "express";
import {
  getAllPatients,
  getPatientById,
  createPatient,
  deletePatient,
} from "../controllers/patients.controller";

const router = Router();

router.get("/", getAllPatients);
router.get("/:id", getPatientById);
router.post("/", createPatient);
router.delete("/:id", deletePatient);

export default router;
