import {connection} from "../config/db.js";

export async function createBooking(booking_date, number_participants, guide_id, hike_id, user_id) {
    const create = 'INSERT INTO booking (booking_date, number_participants, guide_id, hike_id, user_id) VALUES (?, ?, ?, ?, ?)';
    const [result] = await connection.query(create, [booking_date, number_participants, guide_id, hike_id, user_id]);
    return result;
};

export async function getAllBookings() {
    const select = 'SELECT * FROM booking ORDER BY booking_date DESC';
    const [result] = await connection.query(select);
    return result;
};

export async function getBookingById(id) {
    const select = 'SELECT * FROM booking WHERE booking_id = ?';
    const [result] = await connection.query(select, [id]);
    return result[0];
};

export async function getBookingsByGuide(guide_id) {
    const select = 'SELECT * FROM booking WHERE guide_id = ? ORDER BY booking_date DESC';
    const [result] = await connection.query(select, [guide_id]);
    return result;
};

export async function getBookingByDate(booking_date) {
    const select = 'SELECT * FROM booking WHERE booking_date = ? ORDER BY booking_date DESC';
    const [result] = await connection.query(select, [booking_date]);
    return result;
};

export async function getBookingsByUser(user_id) {
    const select = 'SELECT * FROM booking WHERE user_id = ? ORDER BY booking_date DESC';
    const [result] = await connection.query(select, [user_id]);
    return result;
};

export async function updateBooking(id, booking_date, number_participants, status, guide_id, hike_id) {
    const update = 'UPDATE booking SET booking_date = ?, number_participants = ?, status = ?, guide_id = ?, hike_id = ? WHERE booking_id = ?';
    const [result] = await connection.query(update, [booking_date, number_participants, status, guide_id, hike_id, id]);
    return result;
};

export async function deleteBooking(id) {
    const del = 'DELETE FROM booking WHERE booking_id = ?';
    const [result] = await connection.query(del, [id]);
    return result;
};

