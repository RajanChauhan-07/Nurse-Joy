import { Router } from "express";
import patientsRouter from "./patients.routes";
import doctorsRouter from "./doctors.routes";

const router = Router();

router.use("/patients", patientsRouter);
router.use("/doctors", doctorsRouter);

export default router;
