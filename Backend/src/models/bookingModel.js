import { connection } from "../config/db.js";

export async function createBooking(booking_date, number_participants, guide_id, hike_id, user_id) {
    const create = 'INSERT INTO booking (booking_date, number_participants, guide_id, hike_id, user_id) VALUES (?, ?, ?, ?, ?)';
    const [result] = await connection.query(create, [booking_date, number_participants, guide_id, hike_id, user_id]);
    return result;
};

export async function getAllBookings() {
    const select = 'SELECT booking.booking_id, booking.booking_date, booking.number_participants, booking.status, user.first_name AS user_first_name, user.last_name AS user_last_name, guide.first_name AS guide_first_name, guide.last_name AS guide_last_name, hike.title AS hike_title FROM booking JOIN user ON booking.user_id = user.user_id JOIN guide ON booking.guide_id = guide.guide_id JOIN hike ON booking.hike_id = hike.hike_id ORDER BY booking.booking_date DESC';
    const [result] = await connection.query(select);
    return result;
};

export async function getBookingById(id) {
    const select = 'SELECT booking_id, booking_date, number_participants, status, guide_id, hike_id, user_id FROM booking WHERE booking_id = ?';
    const [result] = await connection.query(select, [id]);
    return result[0];
};

export async function getBookingsByGuide(guide_id) {
    const select = 'SELECT booking.booking_id, booking.booking_date, booking.number_participants, booking.status, user.first_name AS user_first_name, user.last_name AS user_last_name, guide.first_name AS guide_first_name, guide.last_name AS guide_last_name, hike.title AS hike_title FROM booking JOIN user ON booking.user_id = user.user_id JOIN guide ON booking.guide_id = guide.guide_id JOIN hike ON booking.hike_id = hike.hike_id WHERE booking.guide_id = ? ORDER BY booking.booking_date DESC';
    const [result] = await connection.query(select, [guide_id]);
    return result;
};

export async function getBookingByDate(booking_date) {
    const select = 'SELECT booking.booking_id, booking.booking_date, booking.number_participants, booking.status, user.first_name AS user_first_name, user.last_name AS user_last_name, guide.first_name AS guide_first_name, guide.last_name AS guide_last_name, hike.title AS hike_title FROM booking JOIN user ON booking.user_id = user.user_id JOIN guide ON booking.guide_id = guide.guide_id JOIN hike ON booking.hike_id = hike.hike_id WHERE booking.booking_date = ? ORDER BY booking.booking_date DESC';
    const [result] = await connection.query(select, [booking_date]);
    return result;
};

export async function getBookingDetails(booking_id) {
    const select = `SELECT booking.booking_id, booking.number_participants, hike.price, (booking.number_participants * hike.price) AS total
         FROM booking JOIN hike ON booking.hike_id = hike.hike_id WHERE booking.booking_id = ?`;
    const [result] = await connection.query(select, [booking_id]);
    return result[0];
};

export async function getBookingsByUser(user_id) {
    const select = `
        SELECT booking.*, hike.title AS hike_title, CONCAT(guide.first_name, ' ', guide.last_name) AS guide_name
        FROM booking
        JOIN hike ON booking.hike_id = hike.hike_id
        JOIN guide ON booking.guide_id = guide.guide_id
        WHERE booking.user_id = ?
    `;

    const [result] = await connection.query(select, [user_id]);
    return result;
}

export async function updateBooking(id, booking_date, number_participants, status, guide_id, hike_id) {
    const update = 'UPDATE booking SET booking_date = ?, number_participants = ?, status = ?, guide_id = ?, hike_id = ? WHERE booking_id = ?';
    const [result] = await connection.query(update, [booking_date, number_participants, status, guide_id, hike_id, id]);
    return result;
};

export async function cancelBooking(id) {
  const cancel = `UPDATE booking SET status = 'cancelled' WHERE booking_id = ? `;

  const [result] = await connection.query(cancel, [id]);
  return result;
};

export async function deleteBooking(id) {
    const del = 'DELETE FROM booking WHERE booking_id = ?';
    const [result] = await connection.query(del, [id]);
    return result;
};

export async function updateBookingStatus(id, status) {
  const [result] = await connection.query(
    "UPDATE booking SET status = ? WHERE booking_id = ?",
    [status, id]
  );

  return result;
}

export async function getExistingBooking(booking_date, guide_id, hike_id) {
  const [result] = await connection.execute(
    `SELECT booking_id
     FROM booking
     WHERE DATE(booking_date) = DATE(?)
     AND status != 'cancelled'
     AND (
       guide_id = ?
       OR hike_id = ?
     )`,
    [booking_date, guide_id, hike_id]
  );

  return result[0];
}