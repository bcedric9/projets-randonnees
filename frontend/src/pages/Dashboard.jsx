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
    createGuide,
    createHike
} from "../services/api";
import Footer from "../components/Footer";

function Dashboard() {
    const [bookings, setBookings] = useState([]);
    const [guides, setGuides] = useState([]);
    const [guideId, setGuideId] = useState("");
    const [bookingDate, setBookingDate] = useState("");
    const [payments, setPayments] = useState([]);
    const [statusUpdates, setStatusUpdates] = useState({});

    const [hikeData, setHikeData] = useState({
        title: "",
        description: "",
        location: "",
        duration: "",
        level: "easy",
        price: "",
        max_participants: "",
        image: ""
    });

    const [guideData, setGuideData] = useState({
        last_name: "",
        first_name: "",
        bio: "",
        image: ""
    });

    const handleHikeChange = (e) => {
        setHikeData({
            ...hikeData,
            [e.target.name]: e.target.value
        });
    };

    const handleGuideChange = (e) => {
        setGuideData({
            ...guideData,
            [e.target.name]: e.target.value
        });
    };

    const handleCreateHike = async (e) => {
        e.preventDefault();

        try {
            await createHike(hikeData);

            alert("Randonnée ajoutée");

            setHikeData({
                title: "",
                description: "",
                location: "",
                duration: "",
                level: "easy",
                price: "",
                max_participants: "",
                image: ""
            });
        } catch (error) {
            console.error(error.response?.data || error);
        }
    };

    const handleCreateGuide = async (e) => {
        e.preventDefault();

        try {
            await createGuide(guideData);

            alert("Guide ajouté");

            setGuideData({
                last_name: "",
                first_name: "",
                bio: "",
                image: ""
            });
        } catch (error) {
            console.error(error.response?.data || error);
        }
    };

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
                <section className="filter-reservation">
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
            </section>

            <section>
                <h2>Liste des réservations</h2>

                <div className="reservation-container"> {bookings.length === 0 ? (
                    <h3>Aucune réservation</h3>
                ) : (
                    bookings.map((booking) => (
                        <article key={booking.booking_id} className="reservation-list">
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
                </div>
            </section>

            <section>
                <h2>Liste des paiements</h2>

                <div className="reservation-container"> {payments.length === 0 ? (
                    <h3>Aucun paiement</h3>
                ) : (
                    payments.map((payment) => (
                        <article key={payment.payment_id} className="reservation-list">
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
                )} </div>
            </section>

            <section>
                <h2>Ajouter une randonnée</h2>
            
                <form onSubmit={handleCreateHike} className="add-hike">
                    <input name="title" placeholder="Titre" value={hikeData.title} onChange={handleHikeChange} required />

                    <textarea name="description" placeholder="Description" value={hikeData.description} onChange={handleHikeChange} style={{ resize: 'none' }}  required />

                    <input name="location" placeholder="Lieu" value={hikeData.location} onChange={handleHikeChange} required />

                    <input name="duration" type="number" placeholder="Durée en heures" value={hikeData.duration} onChange={handleHikeChange} required />

                    <select name="level" value={hikeData.level} onChange={handleHikeChange}>
                        <option value="easy">Facile</option>
                        <option value="medium">Moyen</option>
                        <option value="hard">Difficile</option>
                    </select>

                    <input name="price" type="number" step="10" placeholder="Prix" value={hikeData.price} onChange={handleHikeChange} required />

                    <input name="max_participants" type="number" placeholder="Participants max" value={hikeData.max_participants} onChange={handleHikeChange} required />

                    <input name="image" placeholder="Nom image ex: lac-blanc.jpg" value={hikeData.image} onChange={handleHikeChange} />

                    <button type="submit">Ajouter la randonnée</button>
                </form>
            </section>

            <section>
                <h2>Ajouter un guide</h2>

                <form onSubmit={handleCreateGuide} className="add-guide">
                    <input name="last_name" placeholder="Nom" value={guideData.last_name} onChange={handleGuideChange} required />

                    <input name="first_name" placeholder="Prénom" value={guideData.first_name} onChange={handleGuideChange} required />

                    <textarea name="bio" placeholder="Biographie" value={guideData.bio} onChange={handleGuideChange} style={{ resize: 'none' }} required />

                    <input name="image" placeholder="Nom image ex: antoine.jpg" value={guideData.image} onChange={handleGuideChange} />

                    <button type="submit">Ajouter le guide</button>
                </form>
            </section>
            <Footer />
        </main>
    );
}

export default Dashboard;