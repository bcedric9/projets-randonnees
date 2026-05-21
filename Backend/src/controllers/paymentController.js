import { createPayment, getAllPayments, getPaymentById, getPaymentsByBooking, updatePayment, deletePayment, confirmPayment, cancelPayment } from "../models/paymentModel.js";
import { getBookingById } from "../models/bookingModel.js";

export async function createPaymentController(req, res) {
    try {

        const { amount, payment_method, booking_id } = req.body;

        if (!amount || !payment_method || !booking_id) {
            return res.status(400).json({ error: "tous les champs sont requis" });
        }

        const booking = await getBookingById(booking_id);

        if (!booking) {
            return res.status(404).json({
                error: "réservation non trouvée"
            });
        }

        if (
            booking.user_id !== req.user.user_id &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({
                error: "accès refusé"
            });
        }

        const result = await createPayment(amount, payment_method, booking_id);
        res.status(201).json({ message: "paiement créé avec succès", payment_id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: "erreur lors de la création du paiement" });
    }
};

export async function listPayments(req, res) {
    try {
        const payments = await getAllPayments();
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ error: "erreur lors de la récupération des paiements" });
    }
};

export async function paymentById(req, res) {
    try {
        const { payment_id } = req.params;
        const payment = await getPaymentById(payment_id);

        if (!payment) {
            return res.status(404).json({ error: "paiement non trouvé" });
        }

        if (payment.user_id !== req.user.user_id && req.user.role !== "admin") {
            return res.status(403).json({ error: "vous n'êtes pas autorisé à accéder à ce paiement" });
        }

        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ error: "erreur lors de la récupération du paiement" });
    }
};

export async function paymentsByBooking(req, res) {
    try {

        const { booking_id } = req.params;

        const payments = await getPaymentsByBooking(booking_id);

        if (payments.length === 0) {
            return res.status(404).json({
                error: "aucun paiement trouvé"
            });
        }

        if (
            payments[0].user_id !== req.user.user_id &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({
                error: "accès refusé"
            });
        }

        res.status(200).json(payments);

    } catch (error) {

        res.status(500).json({
            error: "erreur lors de la récupération des paiements"
        });

    }
};

export async function upPayment(req, res) {
    try {
        const { payment_id } = req.params;
        const payment = await getPaymentById(payment_id);

        if (!payment) {
            return res.status(404).json({ error: "paiement non trouvé" });
        }

        const { amount, payment_method, status } = req.body;

        if (req.user.role !== "admin" && status !== undefined) {
            return res.status(403).json({
                error: "vous ne pouvez pas modifier le statut"
            });
        }

        if (
            payment.user_id !== req.user.user_id &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({ error: "vous n'êtes pas autorisé à modifier ce paiement" });
        }
        
        await updatePayment(payment_id, amount, payment_method, status);

        res.status(200).json({ message: "paiement mis à jour avec succès" });
    }
    catch (error) {
        res.status(500).json({ error: "erreur lors de la mise à jour du paiement" });
    }
};

export async function delPayment(req, res) {
    try {
        const { payment_id } = req.params;
        const payment = await getPaymentById(payment_id);

        if (!payment) {
            return res.status(404).json({ error: "paiement non trouvé" });
        }

        if (
            payment.user_id !== req.user.user_id &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({ error: "vous n'êtes pas autorisé à supprimer ce paiement" });
        }



        await deletePayment(payment_id);
        res.status(200).json({ message: "paiement supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ error: "erreur lors de la suppression du paiement" });
    }
};

export async function confirmPaymentController(req, res) {
    try {
        const { payment_id } = req.params;
        const payment = await getPaymentById(payment_id);

        if (!payment) {
            return res.status(404).json({ error: "paiement non trouvé" });
        }

        await confirmPayment(payment_id);
        res.status(200).json({ message: "paiement confirmé avec succès" });
    } catch (error) {
        res.status(500).json({ error: "erreur lors de la confirmation du paiement" });
    }
};

export async function cancelPaymentController(req, res) {
    try {
        const { payment_id } = req.params;
        const payment = await getPaymentById(payment_id);
        if (!payment) {
            return res.status(404).json({ error: "paiement non trouvé" });
        }

        await cancelPayment(payment_id);
        res.status(200).json({ message: "paiement annulé avec succès" });
    } catch (error) {
        res.status(500).json({ error: "erreur lors de l'annulation du paiement" });
    }
};
