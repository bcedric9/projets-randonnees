import { loginUser} from "../controllers/authController.js";
import { logoutUser } from "../controllers/authController.js";
import { registerUser } from "../controllers/userController.js";
import express from "express";

const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/register", registerUser);

export default router;