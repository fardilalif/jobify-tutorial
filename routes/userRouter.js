import { Router } from "express";
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/userController.js";
import { authorizedPermissions } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";
import { validateUpdateUserInput } from "../middlewares/validationMiddleware.js";
const router = Router();

router.get("/current-user", getCurrentUser);
router.get(
  "/admin/app-stats",
  authorizedPermissions("admin"),
  getApplicationStats
);
router.patch(
  "/update-user",
  upload.single("avatar"),
  validateUpdateUserInput,
  updateUser
);

export default router;
