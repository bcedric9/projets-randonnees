import { useState, useEffect } from "react";
import { createReview, getAllHikes, getReviewsByHike, updateReview, deleteReview } from "../services/api";
import Header from "../components/Header";

function Reviews() {

    const [hikes, setHikes] = useState([]);
    const [formData, setFormData] = useState({
        commentary: "",
        rating: 5,
        hike_title: ""
    });

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

            await fetchReviews(formData.hike_id);

            setEditingReview(null);
        } catch (error) {
            console.error(
                "Erreur modification avis :",
                error.response?.data || error
            );
        }
    };

    const [message, setMessage] = useState("");

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

    const [reviews, setReviews] = useState([]);

    const fetchReviews = async (hikeId) => {
        try {
            const response = await getReviewsByHike(hikeId);
            setReviews(response.data);
        } catch (error) {
            console.error("Erreur avis :", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        if (name === "hike_id" && value) {
            fetchReviews(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createReview(formData);
            await fetchReviews(formData.hike_id);

            setMessage("Avis ajouté avec succès");

            setFormData({
                commentary: "",
                rating: 5,
                hike_title: ""
            });
        } catch (error) {
            console.error(error.response?.data || error);
            setMessage("Erreur lors de l'ajout de l'avis");
        }
    };

    return (
        <div className="Page">
      <Header />
            <h1>Laissez un avis</h1>

            {message && <p>{message}</p>}

            <form onSubmit={handleSubmit}>
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
                        value={formData.commentary}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Publier l'avis</button>
            </form>

            <section>
                <h2>Avis des clients</h2>

                {reviews.length === 0 ? (
                    <p>Aucun avis pour cette randonnée.</p>
                ) : (
                    reviews.map((review) => (
                        <article key={review.review_id}>
                            <p>Note : {review.rating}/5</p>
                            <p>{review.commentary}</p>
                            <p>Date : {new Date(review.created_at).toLocaleDateString("fr-FR")}</p>

                            <button onClick={() => handleEditReview(review)}>
                                Modifier
                            </button>
                        </article>
                    ))
                )}
            </section>
            {editingReview && (
                <form onSubmit={handleUpdateReview}>
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
                    />

                    <button type="submit">Enregistrer</button>

                    <button type="button" onClick={() => setEditingReview(null)}>
                        Annuler
                    </button>
                </form>
            )}
        </div>
    );
}

export default Reviews;
