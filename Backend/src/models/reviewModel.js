import {connection} from "../config/db.js";

export async function createReview(commentary, rating, hike_id, user_id) {
  const [result] = await connection.execute(
    "INSERT INTO review (commentary, rating, hike_id, user_id) VALUES (?, ?, ?, ?)",
    [commentary, rating, hike_id, user_id]
  );
  return result;
};

export async function getAllReviews() {
  const [result] = await connection.execute(
    "SELECT review_id, commentary, rating, created_at, hike_id, user_id FROM review ORDER BY created_at DESC"
  );
  return result;
};

export async function getReviewById(review_id) {
  const [result] = await connection.execute(
    "SELECT review_id, commentary, rating, created_at, hike_id, user_id FROM review WHERE review_id = ?",
    [review_id]
  );
  return result[0];
};

export async function getReviewsByHike(hike_id) {
  const [result] = await connection.execute(
    "SELECT review_id, commentary, rating, created_at, hike_id, user_id FROM review WHERE hike_id = ? ORDER BY created_at DESC",
    [hike_id]
  );
  return result;
};

export async function getReviewsByUser(user_id) {
  const [result] = await connection.execute(
    "SELECT review.review_id, review.commentary, review.rating, review.created_at, review.hike_id, review.user_id, hike.title AS hike_title FROM review JOIN hike ON review.hike_id = hike.hike_id WHERE review.user_id = ? ORDER BY review.created_at DESC",
    [user_id]
  );
  return result;
};

export async function getReviewsByUserAndHike(user_id, hike_id) {
  const [result] = await connection.execute(
    "SELECT review_id, commentary, rating, created_at, hike_id, user_id FROM review WHERE user_id = ? AND hike_id = ?",
    [user_id, hike_id]
  );
  return result;
};

export async function getAverageRatingByHikeId(hike_id) {
  const [result] = await connection.execute(
    "SELECT AVG(rating) AS average_rating FROM review WHERE hike_id = ?",
    [hike_id]
  );
  return result[0].average_rating;
};

export async function deleteReview(review_id) {
  const [result] = await connection.execute(
    "DELETE FROM review WHERE review_id = ?",
    [review_id]
  );
  return result;
};

export async function updateReview(review_id, commentary, rating) {
  const [result] = await connection.execute(
    "UPDATE review SET commentary = ?, rating = ? WHERE review_id = ?",
    [commentary, rating, review_id]
  );
  return result;
};
