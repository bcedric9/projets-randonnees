import {connection} from "../config/db.js";

export async function createAvailability(available_date, guide_id) {
    const create = 'INSERT INTO guide_availability (available_date, guide_id) VALUES (?, ?)';
    const [result] = await connection.query(create, [available_date, guide_id]);
    return result;
};

export async function getAllAvailabilities() {
    const select = 'SELECT available_id, available_date, guide_id FROM guide_availability ORDER BY available_date ASC';
    const [result] = await connection.query(select);
    return result;
};

export async function getAvailabilityByGuide(guide_id) {
    const select = 'SELECT available_id, available_date, guide_id FROM guide_availability WHERE guide_id = ? ORDER BY available_date ASC';
    const [result] = await connection.query(select, [guide_id]);
    return result;
};

export async function getAvailabilityById(id) {
    const select = 'SELECT available_id, available_date, guide_id FROM guide_availability WHERE available_id = ?';
    const [result] = await connection.query(select, [id]);
    return result[0];
};

export async function deleteAvailability(id) {
    const remove = 'DELETE FROM guide_availability WHERE available_id = ?';
    const [result] = await connection.query(remove, [id]);
    return result;
};

export async function updateAvailability(id, available_date) {
    const update = 'UPDATE guide_availability SET available_date = ? WHERE available_id = ?';
    const [result] = await connection.query(update, [available_date, id]);
    return result;
};

