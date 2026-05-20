import { createAvailabilityController, availabilityById, availabilityByGuide, listAvailabilities, delAvailability, UpAvailability } from "../controllers/guideAvailabilityController.js";
import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();
router.post("/availability", authMiddleware, adminMiddleware, createAvailabilityController);
router.get("/availability", listAvailabilities);
router.get("/availability/guide/:guide_id", availabilityByGuide);
router.get("/availability/:id", availabilityById);
router.delete("/availability/:id", authMiddleware, adminMiddleware, delAvailability);
router.put("/availability/:id", authMiddleware, adminMiddleware, UpAvailability);

export default router;
