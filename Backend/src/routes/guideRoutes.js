import { createGuideController, listGuides, guideById, UpGuide, delGuide, softDelGuide } from "../controllers/guideController.js";
import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();
router.post("/guide", authMiddleware, adminMiddleware, createGuideController);
router.get("/guide", listGuides);
router.get("/guide/:id", guideById);
router.put("/guide/:id", authMiddleware, adminMiddleware, UpGuide);
router.delete("/guide/:id", authMiddleware, adminMiddleware, delGuide);
router.patch("/guide/:id/soft-delete", authMiddleware, adminMiddleware, softDelGuide);

export default router;