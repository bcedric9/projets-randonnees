import { createBookingController, listBookings, bookingById, bookingsByGuide, bookingsByDate, bookingsByUser, UpBooking, delBooking, bookingDetails, cancelBookingController } from "../controllers/bookingController.js";
import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/booking", authMiddleware, createBookingController);
router.get("/booking", authMiddleware, adminMiddleware, listBookings);
router.get("/booking/:id", authMiddleware, bookingById);
router.get("/booking/guide/:guide_id", authMiddleware, adminMiddleware, bookingsByGuide);
router.get("/booking/user/:user_id", authMiddleware, bookingsByUser);
router.get("/booking/date/:booking_date", authMiddleware, adminMiddleware, bookingsByDate);
router.put("/booking/:id", authMiddleware, UpBooking);
router.delete("/booking/:id", authMiddleware, delBooking);
router.get("/booking/details/:booking_id", authMiddleware, bookingDetails);
router.patch("/booking/cancel/:id", authMiddleware, cancelBookingController);
export default router;
