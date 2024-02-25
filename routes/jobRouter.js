import { Router } from "express";
const router = Router();

import {
  createJob,
  deleteJob,
  getAllJobs,
  getJob,
  updateJob,
} from "../controllers/jobController.js";
import { checkForTestUser } from "../middlewares/authMiddleware.js";
import {
  validateIdParam,
  validateJobInput,
} from "../middlewares/validationMiddleware.js";

router.get("/", getAllJobs);
router.post("/", checkForTestUser, validateJobInput, createJob);
router.get("/:id", validateIdParam, getJob);
router.patch(
  "/:id",
  checkForTestUser,
  validateJobInput,
  validateIdParam,
  updateJob
);
router.delete("/:id", checkForTestUser, validateIdParam, deleteJob);

export default router;
