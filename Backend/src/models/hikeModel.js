import {connection} from "../config/db.js";

export async function createHike(image, title, description, duration, level, max_participants, price, location, is_active) {
    const create = 'INSERT INTO hike (image, title, description, duration, level, max_participants, price, location, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const [result] = await connection.query(create, [image, title, description, duration, level, max_participants, price, location, is_active]);
    return result;
}

export async function getAllHikes() {
    const select = 'SELECT * FROM hike';
    const [result] = await connection.query(select);
    return result;
}

export async function getHikeById(id) {
    const select = 'SELECT * FROM hike WHERE hike_id = ?';
    const [result] = await connection.query(select, [id]);
    return result[0];
}

export async function updateHike(id, image, title, description, duration, level, max_participants, price, location, is_active) {
    const update = 'UPDATE hike SET image = ?, title = ?, description = ?, duration = ?, level = ?, max_participants = ?, price = ?, location = ?, is_active = ? WHERE hike_id = ?';
    const [result] = await connection.query(update, [image, title, description, duration, level, max_participants, price, location, is_active, id]);
    return result;
}

export async function deleteHike(id) {
    const del = 'DELETE FROM hike WHERE hike_id = ?';
    const [result] = await connection.query(del, [id]);
    return result;
}