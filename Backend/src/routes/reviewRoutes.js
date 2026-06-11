import { createReviewController, listReviews, reviewById, reviewsByHike, reviewsByUser, reviewsByUserAndHike, averageRatingByHikeId, delReview, UpReview } from "../controllers/reviewController.js";
import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/review", authMiddleware, createReviewController);
router.get("/review", listReviews);
router.get("/review/hike/:hike_id", authMiddleware, reviewsByHike);
router.get("/review/hike/:hike_id/average-rating", authMiddleware, averageRatingByHikeId);
router.get("/review/user/:user_id", authMiddleware, reviewsByUser);
router.get("/review/user/:user_id/hike/:hike_id", authMiddleware, reviewsByUserAndHike);
router.get("/review/:review_id", authMiddleware, reviewById);
router.put("/review/:review_id", authMiddleware, UpReview);
router.delete("/review/:review_id", authMiddleware, delReview);

export default router;