import {connection} from "../config/db.js";

export async function createHike(image, title, description, duration, level, max_participants, price, location) {
    const create = 'INSERT INTO hike (image, title, description, duration, level, max_participants, price, location) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const [result] = await connection.query(create, [image, title, description, duration, level, max_participants, price, location]);
    return result;
}

export async function getAllHikes() {
    const select = 'SELECT hike_id, image, title, description, duration, level, max_participants, price, location, is_active FROM hike';
    const [result] = await connection.query(select);
    return result;
}

export async function getHikeById(id) {
    const select = 'SELECT hike_id, image, title, description, duration, level, max_participants, price, location, is_active FROM hike WHERE hike_id = ?';
    const [result] = await connection.query(select, [id]);
    return result[0];
}

export async function updateHike(id, image, title, description, duration, level, max_participants, price, location) {
    const update = 'UPDATE hike SET image = ?, title = ?, description = ?, duration = ?, level = ?, max_participants = ?, price = ?, location = ? WHERE hike_id = ?';
    const [result] = await connection.query(update, [image, title, description, duration, level, max_participants, price, location, id]);
    return result;
}

export async function deleteHike(id) {
    const del = 'DELETE FROM hike WHERE hike_id = ?';
    const [result] = await connection.query(del, [id]);
    return result;
}