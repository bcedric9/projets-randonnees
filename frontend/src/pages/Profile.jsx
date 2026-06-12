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
  const [editingReview, setEditingReview] = useState(null);
  const [editForm, setEditForm] = useState({
    commentary: "",
    rating: 5
  });

  const handleEditReview = (review) => {
    setEditingReview(review);

    setEditForm({
      commentary: review.commentary,
      rating: review.rating
    });
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

    const fetchReviews = async () => {
      try {
        const response = await getReviewsByUser(user.user_id);
        setReviews(response.data);
      } catch (error) {
        console.error("Erreur avis :", error);
      }
    };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getBookingsByUser(user.user_id);
        setBookings(response.data);
      } catch (error) {
        console.error("Erreur réservations :", error);
      }
    };

    if (user?.user_id) {
      fetchBookings();
      fetchReviews();
    }
  }, [user?.user_id]);

  const handleUpdateReview = async (e) => {
    e.preventDefault();

    try {
      await updateReview(editingReview.review_id, editForm);

      await fetchReviews();

      setEditingReview(null);
    } catch (error) {
      console.error(
        "Erreur modification avis :",
        error.response?.data || error
      );
    }
  };

  const handleDeleteReview = async (reviewId) => {
    const confirmDelete = window.confirm(
      "Voulez-vous supprimer cet avis ?"
    );

    if (!confirmDelete) return;

    try {
      await deleteReview(reviewId);

      await fetchReviews();
    } catch (error) {
      console.error(
        "Erreur suppression avis :",
        error.response?.data || error
      );
    }
  };

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
                <p>
                  <strong>Statut :</strong>{" "}
                  {
                    {
                      pending: "En attente",
                      confirmed: "Confirmée",
                      cancelled: "Annulée"
                    }[booking.status]
                  }
                </p>
                <p>Randonnée : {booking.hike_title}</p>
                <p>Guide : {booking.guide_name}</p>

                {booking.status !== "confirmed" && (
                  <button onClick={() => handleEdit(booking)}>
                    Modifier
                  </button>
                )}

                {booking.status !== "confirmed" && booking.status !== "cancelled" && (
                  <button onClick={() => handleDelete(booking.booking_id)}>
                    Annuler
                  </button>
                )}
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
                <p>{review.commentary}</p>
                <p>Date : {new Date(review.created_at).toLocaleDateString("fr-FR")}</p>
                <p>Randonnée : {review.hike_title}</p>

                {user && Number(user.user_id) === Number(review.user_id) && (
                  <>
                    <button className="button-edit" onClick={() => handleEditReview(review)}>
                      Modifier
                    </button>

                    <button className="button-edit"
                      onClick={() => handleDeleteReview(review.review_id)}
                    >
                      Supprimer
                    </button>
                  </>
                )}
              </article>
            ))
          )}
        </div>
      </section>

      {editingReview && (
        <form onSubmit={handleUpdateReview} className="review-form">
          <h3>Modifier mon avis</h3>

          <select
            name="rating"
            value={editForm.rating}
            onChange={handleEditChange}
          >
            <option value="1">1 étoile</option>
            <option value="2">2 étoiles</option>
            <option value="3">3 étoiles</option>
            <option value="4">4 étoiles</option>
            <option value="5">5 étoiles</option>
          </select>

          <textarea
            name="commentary"
            value={editForm.commentary}
            onChange={handleEditChange}
            style={{ resize: 'none' }}
            rows="4"

          />

          <button type="submit">Enregistrer</button>

          <button type="button" onClick={() => setEditingReview(null)}>
            Annuler
          </button>
        </form>
      )}
    </main>
  );
}

export default Profile;