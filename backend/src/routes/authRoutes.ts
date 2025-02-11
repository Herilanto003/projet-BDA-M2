import { Router } from "express";
import {
  register,
  registerForAdmin,
  login,
} from "../controllers/authController";

const router = Router();

router.post("/register", register);
router.post("/register-admin", registerForAdmin);
router.post("/login", login);

export default router;
