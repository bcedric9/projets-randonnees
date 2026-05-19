import { createHikeController, listHikes, hikeById, UpHike, delHike } from "../controllers/hikeController.js";
import express from "express";

const router = express.Router();
router.post("/hike", createHikeController);
router.get("/hike", listHikes);
router.get("/hike/:id", hikeById);
router.put("/hike/:id", UpHike);
router.delete("/hike/:id", delHike);

export default router;
