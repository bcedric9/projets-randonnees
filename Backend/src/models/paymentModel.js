import {connection} from "../config/db.js";

export async function createPayment(amount, payment_method, booking_id) {
  const [result] = await connection.execute(
    "INSERT INTO payment (amount, payment_method, booking_id) VALUES (?, ?, ?)",
    [amount, payment_method, booking_id]
  );
  return result;
};

export async function getAllPayments() {
  const [result] = await connection.execute(
    "SELECT * FROM payment"
  );
  return result;
};

export async function getPaymentById(payment_id) {
  const [result] = await connection.execute(
    "SELECT payment.*, booking.user_id FROM payment JOIN booking ON payment.booking_id = booking.booking_id WHERE payment.payment_id = ?",
    [payment_id]
  );
  return result[0];
};

export async function getPaymentsByBooking(booking_id) {
  const [result] = await connection.execute(
    "SELECT payment.*, booking.user_id FROM payment JOIN booking ON payment.booking_id = booking.booking_id WHERE payment.booking_id = ?",
    [booking_id]
  );
  return result;
};

export async function updatePayment(payment_id, amount, payment_method, status) {
  const [result] = await connection.execute(
    "UPDATE payment SET amount = ?, payment_method = ?, status = ? WHERE payment_id = ?",
    [amount, payment_method, status, payment_id]
  );
  return result;
}

export async function deletePayment(payment_id) {
  const [result] = await connection.execute(
    "DELETE FROM payment WHERE payment_id = ?",
    [payment_id]
  );
  return result;
};

export async function confirmPayment(payment_id) {
  const [result] = await connection.execute(
    "UPDATE payment SET status = 'confirmed' WHERE payment_id = ?",
    [payment_id]
  );
  return result;
};

export async function cancelPayment(payment_id) {
  const [result] = await connection.execute(
    "UPDATE payment SET status = 'cancelled' WHERE payment_id = ?",
    [payment_id]
  );
  return result;
};
