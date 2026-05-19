import { registerUser, listUsers, userById, UpUser, softDelUser, hardDelUser } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import express from "express";

const router = express.Router();

router.post("/register", authMiddleware, adminMiddleware, registerUser);
router.get("/user", authMiddleware, adminMiddleware, listUsers);
router.get("/user/:id", authMiddleware, userById);
router.put("/user/:id", authMiddleware, UpUser);
router.patch("/user/:id/soft-delete", authMiddleware, adminMiddleware, softDelUser);
router.delete("/user/:id", authMiddleware, adminMiddleware, hardDelUser);

export default router;
