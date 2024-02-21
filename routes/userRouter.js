import { Router } from "express";
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/userController.js";
import { authorizedPermissions } from "../middlewares/authMiddleware.js";
import { validateUpdateUserInput } from "../middlewares/validationMiddleware.js";
const router = Router();

router.get("/current-user", getCurrentUser);
router.get(
  "/admin/app-stats",
  authorizedPermissions("admin"),
  getApplicationStats
);
router.patch("/update-user", validateUpdateUserInput, updateUser);

export default router;
