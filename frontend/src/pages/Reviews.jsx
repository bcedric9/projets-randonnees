import { useState, useEffect } from "react";
import { createReview, getAllHikes, getReviewsByHike, updateReview, deleteReview, getAllReviews } from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Reviews() {

    const user = JSON.parse(localStorage.getItem("user"));
    const [reviews, setReviews] = useState([]);
    const [hikes, setHikes] = useState([]);
    const [formData, setFormData] = useState({
        commentary: "",
        rating: 5,
        hike_id: ""
    });

    const fetchAllReviews = async () => {
        try {
            const response = await getAllReviews();
            setReviews(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAllReviews();
    }, []);

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

    const handleUpdateReview = async (e) => {
        e.preventDefault();

        try {
            await updateReview(editingReview.review_id, editForm);

            await fetchAllReviews();

            setEditingReview(null);
        } catch (error) {
            console.error(
                "Erreur modification avis :",
                error.response?.data || error
            );
        }
    };

    useEffect(() => {
        const fetchHikes = async () => {
            try {
                const response = await getAllHikes();
                setHikes(response.data);
            } catch (error) {
                console.error("Erreur randonnées :", error);
            }
        };

        fetchHikes();
    }, []);



    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createReview(formData);
            await fetchAllReviews();

            setFormData({
                commentary: "",
                rating: 5,
                hike_id: ""
            });
        } catch (error) {
            console.error(error.response?.data || error);
            setMessage("Erreur lors de l'ajout de l'avis");
        }
    };

    const handleDeleteReview = async (reviewId) => {
        const confirmDelete = window.confirm(
            "Voulez-vous supprimer cet avis ?"
        );

        if (!confirmDelete) return;

        try {
            await deleteReview(reviewId);

            await fetchAllReviews();
        } catch (error) {
            console.error(
                "Erreur suppression avis :",
                error.response?.data || error
            );
        }
    };

    return (
        <div className="Page">
            <Header />
            {user && (<h2>Laissez un avis</h2>)}

            {user && (<form onSubmit={handleSubmit} className="review-form">
                <div>
                    <label>Randonnée</label>
                    <select
                        name="hike_id"
                        value={formData.hike_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Choisir une randonnée</option>

                        {hikes.map((hike) => (
                            <option key={hike.hike_id} value={hike.hike_id}>
                                {hike.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Note</label>
                    <select
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                    >
                        <option value="1">1 étoile</option>
                        <option value="2">2 étoiles</option>
                        <option value="3">3 étoiles</option>
                        <option value="4">4 étoiles</option>
                        <option value="5">5 étoiles</option>
                    </select>
                </div>

                <div>
                    <label>Commentaire</label>
                    <textarea
                        name="commentary"
                        rows="4"
                        value={formData.commentary}
                        onChange={handleChange}
                        style={{ resize: 'none' }}
                        required
                    />
                </div>

                <button type="submit">Publier l'avis</button>
            </form>
            )}

            <section className="review">
                <h2>Avis des randonneurs</h2>

              <section className="reviews-container">  {reviews.length === 0 ? (
                    <p>Aucun avis pour le moment.</p>
                ) : (
                    reviews.map((review) => (
                        <article key={review.review_id} className="review-card">
                            <h3>
                                {review.first_name} {review.last_name}
                            </h3>

                            <p>
                                <strong>Randonnée :</strong> {review.hike_title}
                            </p>

                            <p>
                                <strong>Note :</strong> {review.rating}/5
                            </p>

                            <p>{review.commentary}</p>

                            <p>
                                {new Date(review.created_at).toLocaleDateString("fr-FR")}
                            </p>

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
            </section>
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
            <Footer />
        </div>
    );
}

export default Reviews;
