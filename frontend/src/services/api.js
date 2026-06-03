import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth

export function loginUser(data) {
    return api.post('/auth/login', data);
}

export function logoutUser() {
    return api.post('/auth/logout');
}

// USER

export function registerUser(data) {
    try { return api.post('/user/register', data); }
    catch (error) { console.error('Erreur lors de l\'inscription', error); }
}

export function getAllUsers() {
    return api.get('/user/user');
}

export function getUserById(id) {
    return api.get(`/user/user/${id}`);
}

export function updateUser(id, data) {
    return api.put(`/user/user/${id}`, data);
}

export function softDeleteUser(id, data) {
    return api.patch(`/user/user/${id}/soft-delete`, data);
}

export function hardDeleteUser(id) {
    return api.delete(`/user/user/${id}`);
}

// Hikes

export function getAllHikes() {
    return api.get('/hike/hike');
}

export function getHikeById(id) {
    return api.get(`/hike/hike/${id}`);
}

export function createHike(data) {
    return api.post('/hike/hike', data);
}

export function updateHike(id, data) {
    return api.put(`/hike/hike/${id}`, data);
}

export function deleteHike(id) {
    return api.delete(`/hike/hike/${id}`);
}

// Guides

export function createGuide(data) {
    return api.post('/guide/guide', data);
}

export function getAllGuides() {
    return api.get('/guide/guide');
}

export function getGuideById(id) {
    return api.get(`/guide/guide/${id}`);
}

export function updateGuide(id,data) {
    return api.put(`/guide/guide/${id}`, data);
}

export function deleteGuide(id) {
    return api.delete(`/guide/guide/${id}`);
}

export function softDeleteGuide(id) {
    return api.patch(`/guide/guide/${id}/soft-delete`);
}

// Guide Availability

export function createGuideAvailability(data) {
    return api.post('/guide-availability/availability', data);
}

export function getAllGuideAvailabilities() {
    return api.get('/guide-availability/availability');
}

export function getGuideAvailabilityById(id) {
    return api.get(`/guide-availability/availability/${id}`);
}

export function getGuideAvailabilityByGuide(guide_id) {
    return api.get(`/guide-availability/availability/guide/${guide_id}`);
}

export function updateGuideAvailability(id, data) {
    return api.put(`/guide-availability/availability/${id}`, data);
}

export function deleteGuideAvailability(id) {
    return api.delete(`/guide-availability/availability/${id}`);
}

// Booking

export function createBooking(data) {
    return api.post('/booking/booking', data);
}

export function getAllBookings() {
    return api.get('/booking/booking');
}

export function getBookingById(id) {
    return api.get(`/booking/booking/${id}`);
}

export function getBookingsByGuide(guide_id) {
    return api.get(`/booking/booking/guide/${guide_id}`);
}

export function getBookingsByUser(user_id) {
    return api.get(`/booking/booking/user/${user_id}`);
}

export function getBookingsByDate(booking_date) {
    return api.get(`/booking/booking/date/${booking_date}`);

}

export function getBookingDetails(booking_id) {
    return api.get(`/booking/booking/details/${booking_id}`);
}

export function updateBooking(id, data) {
    return api.put(`/booking/booking/${id}`, data);
}

export function deleteBooking(id) {
    return api.delete(`/booking/booking/${id}`);
}

// Review

export function createReview(data) {
    return api.post('/review/review', data);
}

export function getAllReviews() {
    return api.get('/review/review');
}

export function getReviewById(review_id) {
    return api.get(`/review/review/${review_id}`);
}

export function getAverageRatingByHikeId(hike_id) {
    return api.get(`/review/review/hike/${hike_id}/average-rating`);
}

export function getReviewsByUser(user_id) {
    return api.get(`/review/review/user/${user_id}`);
}

export function getReviewsByUserAndHike(user_id, hike_id) {
    return api.get(`/review/review/user/${user_id}/hike/${hike_id}`);
}

export function getReviewsByHike(hike_id) {
    return api.get(`/review/review/hike/${hike_id}`);
}

export function updateReview(review_id, data) {
    return api.put(`/review/review/${review_id}`, data);
}

export function deleteReview(review_id) {
    return api.delete(`/review/review/${review_id}`);
}

// Payment

export function createPayment(data) {
    return api.post('/payment/payment', data);
}

export function getAllPayments() {
    return api.get('/payment/payment');
}

export function getPaymentById(payment_id) {
    return api.get(`/payment/payment/${payment_id}`);
}

export function getPaymentsByBooking(booking_id) {
    return api.get(`/payment/payment/booking/${booking_id}`);
}

export function updatePayment(payment_id, data) {
    return api.put(`/payment/payment/${payment_id}`, data);
}

export function deletePayment(payment_id) {
    return api.delete(`/payment/payment/${payment_id}`);
}

export function confirmPayment(payment_id) {
    return api.put(`/payment/payment/${payment_id}/confirm`);
}

export function cancelPayment(payment_id) {
    return api.put(`/payment/payment/${payment_id}/cancel`);
}

export default api;