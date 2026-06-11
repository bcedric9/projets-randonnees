import { createBooking, getAllBookings, getBookingByDate, getBookingById, getBookingsByGuide, getBookingsByUser, updateBooking, deleteBooking, getBookingDetails, cancelBooking, updateBookingStatus } from "../models/bookingModel.js";
import { deletePaymentsByBooking } from "../models/paymentModel.js";

export async function createBookingController(req, res) {
    try {
        const { booking_date, number_participants, guide_id, hike_id } = req.body;

        if (!booking_date || !number_participants || !guide_id || !hike_id) {
            return res.status(400).json({ message: "Tous les champs sont requis" });
        }

        const user_id = req.user.user_id;
        const result = await createBooking(booking_date, number_participants, guide_id, hike_id, user_id);
        res.status(201).json({ message: "Réservation créée avec succès", bookingId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de la réservation", error: error.message });
    }
};

export async function listBookings(req, res) {
    try {
        const bookings = await getAllBookings();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des réservations", error: error.message });
    }
};

export async function bookingById(req, res) {
    try {
        const { id } = req.params;
        const booking = await getBookingById(id);
        if (!booking) {
            return res.status(404).json({ message: "Réservation non trouvée" });
        }

        if (
            req.user.user_id !== booking.user_id &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({
                message: "Accès refusé"
            });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de la réservation", error: error.message });
    }
};


export async function bookingsByGuide(req, res) {
    try {
        const { guide_id } = req.params;
        const bookings = await getBookingsByGuide(guide_id);
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des réservations", error: error.message });
    }
};

export async function bookingDetails(req, res) {
    try {
        const { booking_id } = req.params;

        const details = await getBookingDetails(booking_id);

        if (!details) {
            return res.status(404).json({
                message: "Réservation non trouvée"
            });
        }

        res.status(200).json(details);

    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur"
        });
    }
};

export async function bookingsByUser(req, res) {
    try {

        if (req.user.user_id != req.params.user_id && req.user.role !== "admin") {
            return res.status(403).json({
                message: "Accès refusé"
            });
        };

        const { user_id } = req.params;
        const bookings = await getBookingsByUser(user_id);
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des réservations", error: error.message });
    }
};

export async function UpBooking(req, res) {
    try {
        const { id } = req.params;

        const booking = await getBookingById(id);

        if (!booking) {
            return res.status(404).json({
                message: "Réservation non trouvée"
            });
        }

        if (
            req.user.user_id !== booking.user_id &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({
                message: "Accès refusé"
            });

        };

        const { booking_date, number_participants, status, guide_id, hike_id } = req.body;

        if (
            req.user.role !== "admin" &&
            status !== undefined
        ) {
            return res.status(403).json({
                message: "Vous ne pouvez pas modifier le statut"
            });
        }

        const updatedStatus =
            req.user.role === "admin" && status !== undefined
                ? status
                : booking.status;

        await updateBooking(
            id,
            booking_date ?? booking.booking_date,
            number_participants ?? booking.number_participants,
            updatedStatus,
            guide_id ?? booking.guide_id,
            hike_id ?? booking.hike_id
        );
        res.status(200).json({ message: "Réservation mise à jour avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour de la réservation", error: error.message });
    }
};

export async function delBooking(req, res) {
    try {

        const { id } = req.params;

        const booking = await getBookingById(id);

        if (!booking) {
            return res.status(404).json({
                message: "Réservation non trouvée"
            });
        }

        if (
            req.user.user_id !== booking.user_id &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({
                message: "Accès refusé"
            });
        }

        await deletePaymentsByBooking(id);
        await deleteBooking(id);

        res.status(200).json({
            message: "Réservation supprimée avec succès"
        });

    } catch (error) {

        res.status(500).json({
            message: "Erreur lors de la suppression de la réservation",
            error: error.message
        });

    }
};

export async function bookingsByDate(req, res) {
    try {
        const { booking_date } = req.params;
        const bookings = await getBookingByDate(booking_date);
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des réservations", error: error.message });
    }
};

export async function cancelBookingController(req, res) {
  try {
    const { id } = req.params;

    const booking = await getBookingById(id);

    if (!booking) {
      return res.status(404).json({
        message: "Réservation non trouvée"
      });
    }

    if (
      req.user.user_id !== booking.user_id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Accès refusé"
      });
    }

    await cancelBooking(id);

    res.status(200).json({
      message: "Réservation annulée avec succès"
    });

  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de l'annulation",
      error: error.message
    });
  }
};

export async function updateBookingStatusController(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await updateBookingStatus(id, status);

    res.status(200).json({
      message: "Statut mis à jour"
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur statut",
      error: error.message
    });
  }
}