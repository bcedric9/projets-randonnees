import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import { createPayment } from "../models/paymentModel.js";

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { amount, booking_id } = req.body;

    await createPayment(amount, "card", booking_id);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Réservation randonnée #${booking_id}`,
            },
            unit_amount: Math.round(Number(amount) * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/profile`,
      cancel_url: `${process.env.FRONTEND_URL}/payment?booking_id=${booking_id}`,
      metadata: {
        booking_id,
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Erreur Stripe :", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;