import { useEffect, useState } from "react";
import { getBookingsByUser, updateBooking, deleteBooking, getReviewsByUser, updateReview, deleteReview } from "../services/api";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);

  const [formData, setFormData] = useState({
    booking_date: "",
    number_participants: "",
    guide_id: "",
    hike_id: ""
  });

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getBookingsByUser(user.user_id);
        setBookings(response.data);
      } catch (error) {
        console.error("Erreur réservations :", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await getReviewsByUser(user.user_id);
        setReviews(response.data);
      } catch (error) {
        console.error("Erreur avis :", error);
      }
    };

    if (user?.user_id) {
      fetchBookings();
      fetchReviews();
    }
  }, [user?.user_id]);

  const handleEdit = (booking) => {
    setEditingBooking(booking);

    setFormData({
      booking_date: booking.booking_date?.slice(0, 10),
      number_participants: booking.number_participants,
      guide_id: booking.guide_id,
      hike_id: booking.hike_id
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateBooking(editingBooking.booking_id, formData);

      const response = await getBookingsByUser(user.user_id);
      setBookings(response.data);

      setEditingBooking(null);
    } catch (error) {
      console.error(
        "Erreur modification réservation :",
        error.response?.data || error
      );
    }
  };

  const handleDelete = async (bookingId) => {
    const confirmDelete = window.confirm(
      "Voulez-vous vraiment annuler cette réservation ?"
    );

    if (!confirmDelete) return;

    try {
      await deleteBooking(bookingId);

      setBookings(
        bookings.filter((booking) => booking.booking_id !== bookingId)
      );
    } catch (error) {
      console.error(
        "Erreur suppression réservation :",
        error.response?.data || error
      );
    }
  };

  if (!user) {
    return <p>Vous devez être connecté.</p>;
  }

  return (
    <main>
      <h2>Mon profil</h2>
      <div className="profil-container">
        <section className="review-card">
          <p>
            Nom : {user.first_name} {user.last_name}
          </p>
          <p>Email : {user.mail}</p>
        </section>
      </div>

      <section>
        <h2>Mes réservations</h2>
<div className="profil-container">
        {bookings.length === 0 ? (
          <p>Aucune réservation pour le moment.</p>
        ) : (
          bookings.map((booking) => (
            <article key={booking.booking_id} className="profil-card">
              <p>Date : {new Date(booking.booking_date).toLocaleDateString("fr-FR")}</p>
              <p>Participants : {booking.number_participants}</p>
              <p>Statut : {booking.status}</p>
              <p>Randonnée : {booking.hike_title}</p>
              <p>Guide : {booking.guide_name}</p>

              <button onClick={() => handleEdit(booking)}>
                Modifier
              </button>

              <button onClick={() => handleDelete(booking.booking_id)}>
                Annuler la réservation
              </button>
            </article>
          ))
        )}
        </div>
      </section>

      {editingBooking && (
        <section className="profil-container">
          <form onSubmit={handleUpdate} className="profil-card">
            <h3>Modifier la réservation</h3>

            <div>
              <label>Date</label>
              <input
                type="date"
                name="booking_date"
                value={formData.booking_date}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    booking_date: e.target.value
                  })
                }
              />
            </div>

            <div>
              <label>Participants</label>
              <input
                type="number"
                name="number_participants"
                value={formData.number_participants}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    number_participants: e.target.value
                  })
                }
              />
            </div>

            <button type="submit">Enregistrer</button>

            <button type="button" onClick={() => setEditingBooking(null)}>
              Annuler
            </button>
          </form>
          
        </section>
      )}

      <section>
        <h2>Mes avis</h2>
<div className="profil-container">
        {reviews.length === 0 ? (
          <p>Vous n'avez pas encore laissé d'avis.</p>
        ) : (
          reviews.map((review) => (
            <article key={review.review_id} className="profil-card">
              <p>Note : {review.rating}/5</p>
              <p>Commentaire : {review.commentary}</p>
              <p>Date : {new Date(review.created_at).toLocaleDateString("fr-FR")}</p>
              <p>Randonnée : {review.hike_title}</p>
            </article>
          ))
        )}
        </div>
      </section>
    </main>
  );
}

export default Profile;