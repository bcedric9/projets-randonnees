import {connection} from "../config/db.js";

export async function createGuide(last_name, first_name, bio, image) {
    const create = 'INSERT INTO guide (last_name, first_name, bio, image) VALUES (?, ?, ?, ?)';
    const [result] = await connection.query(create, [last_name, first_name, bio, image]);
    return result;
};

export async function getAllGuides() {
    const select = 'SELECT guide_id, last_name, first_name, bio, is_active, image FROM guide';
    const [result] = await connection.query(select);
    return result;
};

export async function getGuideById(id) {
    const select = 'SELECT guide_id, last_name, first_name, bio, is_active, image FROM guide WHERE guide_id = ?';
    const [result] = await connection.query(select, [id]);
    return result[0];
};

export async function updateGuide(id, last_name, first_name, bio, image) {
    const update = 'UPDATE guide SET last_name = ?, first_name = ?, bio = ?, image = ? WHERE guide_id = ?';
    const [result] = await connection.query(update, [last_name, first_name, bio, image, id]);
    return result;
};

export async function HardDeleteGuide(id) {
    const remove = 'DELETE FROM guide WHERE guide_id = ?';
    const [result] = await connection.query(remove, [id]);
    return result;
};

export async function SoftDeleteGuide(id, is_active) {
    const remove = 'UPDATE guide SET is_active = ? WHERE guide_id = ?';
    const [result] = await connection.query(remove, [is_active, id]);
    return result;
};



