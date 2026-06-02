import { createHikeController, listHikes, hikeById, UpHike, delHike } from "../controllers/hikeController.js";
import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/hike", authMiddleware, adminMiddleware, createHikeController);
router.get("/hike", listHikes);
router.get("/hike/:id", hikeById);
router.put("/hike/:id", authMiddleware, adminMiddleware, UpHike);
router.delete("/hike/:id", authMiddleware, adminMiddleware, delHike);

export default router;
