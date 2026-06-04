import { createPaymentController, listPayments, paymentById, paymentsByBooking, upPayment, delPayment, confirmPaymentController, cancelPaymentController, deletePaymentsByBookingController } from "../controllers/paymentController.js";
import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/payment", authMiddleware, createPaymentController);
router.get("/payment", authMiddleware, adminMiddleware, listPayments);
router.get("/payment/booking/:booking_id", authMiddleware, paymentsByBooking);
router.get("/payment/:payment_id", authMiddleware, paymentById);
router.put("/payment/:payment_id", authMiddleware, upPayment);
router.delete("/payment/:payment_id", authMiddleware, delPayment);
router.put("/payment/:payment_id/confirm", authMiddleware, adminMiddleware, confirmPaymentController);
router.put("/payment/:payment_id/cancel", authMiddleware, adminMiddleware, cancelPaymentController);
router.delete("/payment/booking/:booking_id", authMiddleware, adminMiddleware, deletePaymentsByBookingController);
export default router;
