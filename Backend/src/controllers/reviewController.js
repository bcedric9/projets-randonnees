import { createReview, getAllReviews, getReviewById, getReviewsByHike, getReviewsByUser, getReviewsByUserAndHike, getAverageRatingByHikeId, deleteReview, updateReview } from "../models/reviewModel.js";

export async function createReviewController(req, res) {
  try {
    const { commentary, rating, hike_id } = req.body;

    const user_id = req.user.user_id;

    if (!commentary || !rating || !hike_id) {
      return res.status(400).json({
        error: "Tous les champs sont requis"
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        error: "La note doit être comprise entre 1 et 5"
      });
    }

    const existingReviews = await getReviewsByUserAndHike(
      user_id,
      hike_id
    );

    if (existingReviews.length > 0) {
      return res.status(400).json({
        error: "Vous avez déjà laissé un avis pour cette randonnée"
      });
    }

    const review = await createReview(
      commentary,
      rating,
      hike_id,
      user_id
    );

    res.status(201).json({
      message: "Avis créé avec succès",
      reviewId: review.insertId
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Erreur lors de la création de l'avis"
    });

  }
};

export async function listReviews(req, res) {
  try {
    const reviews = await getAllReviews();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "erreur lors de la récupération des avis" });
  }
};

export async function reviewById(req, res) {
  try {
    const { review_id } = req.params;
    const review = await getReviewById(review_id);
    if (!review) {
      return res.status(404).json({ error: "avis non trouvé" });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: "erreur lors de la récupération de l'avis" });
  }
};

export async function reviewsByHike(req, res) {
  try {
    const { hike_id } = req.params;
    const reviews = await getReviewsByHike(hike_id);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "erreur lors de la récupération des avis" });
  }
};

export async function reviewsByUser(req, res) {
    try {
        const { user_id } = req.params;
        const reviews = await getReviewsByUser(user_id);
        res.status(200).json(reviews);
    }
        catch (error) {
        res.status(500).json({ error: "erreur lors de la récupération des avis" });
    }
};

export async function reviewsByUserAndHike(req, res) {
    try {
        const { user_id, hike_id } = req.params;
        const reviews = await getReviewsByUserAndHike(user_id, hike_id);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: "erreur lors de la récupération des avis" });
    }
};

export async function averageRatingByHikeId(req, res) { 
    try {
        const { hike_id } = req.params;
        const averageRating = await getAverageRatingByHikeId(hike_id);
        res.status(200).json({ averageRating });
    } catch (error) {
        res.status(500).json({ error: "erreur lors de la récupération de la note moyenne" });
    }
};

export async function delReview(req, res) {

    try {

        const { review_id } = req.params;

        const review = await getReviewById(review_id);

        if (!review) {
            return res.status(404).json({
                error: "Avis non trouvé"
            });
        }

        if (
            req.user.user_id !== review.user_id &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({
                error: "Vous n'êtes pas autorisé à supprimer cet avis"
            });
        }

        await deleteReview(review_id);

        res.status(200).json({
            message: "Avis supprimé avec succès"
        });

    } catch (error) {

        res.status(500).json({
            error: "Erreur lors de la suppression de l'avis"
        });

    }
};

export async function UpReview(req, res) {
    try {
        const { review_id } = req.params;
        const { commentary, rating } = req.body;
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ error: "La note doit être comprise entre 1 et 5" });
        }

        const review = await getReviewById(review_id);
        if (!review) {
            return res.status(404).json({ error: "avis non trouvé" });
        }

        if (!(req.user.user_id === review.user_id || req.user.role === "admin")) {
            return res.status(403).json({ error: "Vous n'êtes pas autorisé à modifier cet avis" });
        }

        const updatedReview = await updateReview(review_id, commentary, rating);
        res.status(200).json({message: "Avis mis à jour avec succès" });
    } catch (error) {
        res.status(500).json({ error: "erreur lors de la mise à jour de l'avis" });
    }
};


