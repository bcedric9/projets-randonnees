import { useEffect, useState } from "react";
import {
    getAllBookings,
    getBookingsByGuide,
    getBookingsByDate,
    cancelBooking,
    deleteBooking,
    getAllGuides,
    updateBooking,
    updateBookingStatus,
    getAllPayments,
    confirmPayment,
    cancelPayment,
} from "../services/api";
import Footer from "../components/Footer";

function Dashboard() {
    const [bookings, setBookings] = useState([]);
    const [guides, setGuides] = useState([]);
    const [guideId, setGuideId] = useState("");
    const [bookingDate, setBookingDate] = useState("");
    const [payments, setPayments] = useState([]);
    const [statusUpdates, setStatusUpdates] = useState({});

    const fetchAllPayments = async () => {
        const response = await getAllPayments();
        setPayments(response.data);
    };

    const fetchAllBookings = async () => {
        const response = await getAllBookings();
        setBookings(response.data);
    };

    useEffect(() => {
        fetchAllBookings();
        fetchAllPayments();

        getAllGuides()
            .then((response) => setGuides(response.data))
            .catch((error) => console.error(error));
    }, []);

    const handleBookingStatusChange = async (booking, newStatus) => {
        await updateBooking(booking.booking_id, {
            booking_date: booking.booking_date?.slice(0, 10),
            number_participants: booking.number_participants,
            status: newStatus,
            guide_id: booking.guide_id,
            hike_id: booking.hike_id
        });

        fetchAllBookings();
    };

    const handleStatusSelect = (bookingId, value) => {
        setStatusUpdates({
            ...statusUpdates,
            [bookingId]: value
        });
    };

    const handleValidateStatus = async (booking) => {
        const newStatus =
            statusUpdates[booking.booking_id] || booking.status;

        try {
            await updateBookingStatus(booking.booking_id, {
                status: newStatus
            });

            fetchAllBookings();
        } catch (error) {
            console.error(
                "Erreur modification statut :",
                error.response?.data || error
            );
        }
    };

    const handleConfirmPayment = async (paymentId) => {
        await confirmPayment(paymentId);
        fetchAllPayments();
    };

    const handleCancelPayment = async (paymentId) => {
        await cancelPayment(paymentId);
        fetchAllPayments();
    };

    const handleFilterByGuide = async () => {
        const response = await getBookingsByGuide(guideId);
        setBookings(response.data);
    };

    const handleFilterByDate = async () => {
        const response = await getBookingsByDate(bookingDate);
        setBookings(response.data);
    };

    const handleCancel = async (bookingId) => {
        if (
            !window.confirm(
                "Supprimer définitivement cette réservation ?"
            )
        ) {
            return;
        }

        try {
            await deleteBooking(bookingId);

            fetchAllBookings();
        } catch (error) {
            console.error(
                "Erreur suppression réservation :",
                error.response?.data || error
            );
        }
    };

    const handleCancelAll = async () => {
        if (!window.confirm("Annuler toutes les réservations affichées ?")) return;

        for (const booking of bookings) {
            await cancelBooking(booking.booking_id);
        }

        fetchAllBookings();
    };

    return (
        <main>
            <h2>Dashboard Admin</h2>

            <section>
                <h2>Filtres réservations</h2>

                <button onClick={fetchAllBookings}>
                    Toutes les réservations
                </button>

                <div>
                    <select value={guideId} onChange={(e) => setGuideId(e.target.value)}>
                        <option value="">Choisir un guide</option>

                        {guides.map((guide) => (
                            <option key={guide.guide_id} value={guide.guide_id}>
                                {guide.first_name} {guide.last_name}
                            </option>
                        ))}
                    </select>

                    <button onClick={handleFilterByGuide}>
                        Réservations par guide
                    </button>
                </div>

                <div>
                    <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                    />

                    <button onClick={handleFilterByDate}>
                        Réservations par date
                    </button>
                </div>

                <button onClick={handleCancelAll}>
                    Annuler toutes les réservations affichées
                </button>
            </section>

            <section>
                <h2>Liste des réservations</h2>

                {bookings.length === 0 ? (
                    <p>Aucune réservation.</p>
                ) : (
                    bookings.map((booking) => (
                        <article key={booking.booking_id}>
                            <p>ID : {booking.booking_id}</p>
                            <p>Date : {new Date(booking.booking_date).toLocaleDateString("fr-FR")}</p>
                            <p>Participants : {booking.number_participants}</p>
                            <label>Statut réservation :</label>
                            <select
                                value={
                                    statusUpdates[booking.booking_id] || booking.status
                                }
                                onChange={(e) =>
                                    handleStatusSelect(
                                        booking.booking_id,
                                        e.target.value
                                    )
                                }
                            >
                                <option value="pending">En attente</option>
                                <option value="confirmed">Confirmée</option>
                                <option value="cancelled">Annulée</option>
                            </select>
                            <button
                                onClick={() => handleValidateStatus(booking)}
                            >
                                Valider
                            </button>
                            <p>
                                <strong>Client :</strong>
                                {" "}
                                {booking.user_first_name} {booking.user_last_name}
                            </p>

                            <p>
                                <strong>Guide :</strong>
                                {" "}
                                {booking.guide_first_name} {booking.guide_last_name}
                            </p>

                            <p>
                                <strong>Randonnée :</strong>
                                {" "}
                                {booking.hike_title}
                            </p>

                            {booking.status !== "cancelled" && (
                                <button onClick={() => handleCancel(booking.booking_id)}>
                                    Supprimer définitivement
                                </button>
                            )}
                        </article>
                    ))
                )}
            </section>

            <section>
                <h2>Liste des paiements</h2>

                {payments.length === 0 ? (
                    <p>Aucun paiement.</p>
                ) : (
                    payments.map((payment) => (
                        <article key={payment.payment_id}>
                            <p>ID paiement : {payment.payment_id}</p>
                            <p>Montant : {payment.amount} €</p>
                            <p>Méthode : {payment.payment_method}</p>
                            <p>Statut : {payment.status}</p>
                            <p>Réservation ID : {payment.booking_id}</p>

                            {payment.status !== "confirmed" && (
                                <button onClick={() => handleConfirmPayment(payment.payment_id)}>
                                    Confirmer paiement
                                </button>
                            )}

                            {payment.status !== "cancelled" && (
                                <button onClick={() => handleCancelPayment(payment.payment_id)}>
                                    Annuler paiement
                                </button>
                            )}
                        </article>
                    ))
                )}
            </section>
            <Footer />
        </main>
    );
}

export default Dashboard;