import {connection} from "../config/db.js";

export async function createUser(last_name, first_name, tel, mail, password, registration_date) {
    const create = 'INSERT INTO user (last_name, first_name, tel, mail, password, registration_date) VALUES (?, ?, ?, ?, ?, ?)';
    const [result] = await connection.query(create, [last_name, first_name, tel, mail, password, registration_date]);
    return result;
};

export async function getAllUsers() {
    const select = 'SELECT user_id, last_name, first_name, role, tel, mail, password, registration_date, is_active FROM user';
    const [result] = await connection.query(select);
    return result;
};

export async function getUserById(id) {
    const select = 'SELECT user_id, last_name, first_name, role, tel, mail, password, registration_date, is_active FROM user WHERE user_id = ?';
    const [result] = await connection.query(select, [id]);
    return result[0];
}

export async function getUserByEmail(mail) {
    const select = 'SELECT user_id, last_name, first_name, role, tel, mail, password, registration_date, is_active FROM user WHERE mail = ?';
    const [result] = await connection.query(select, [mail]);
    return result;
};

export async function updateUser(id, last_name, first_name, tel, mail, password) {
    const update = 'UPDATE user SET last_name = ?, first_name = ?, tel = ?, mail = ?, password = ? WHERE user_id = ?';
    const [result] = await connection.query(update, [last_name, first_name, tel, mail, password, id]);
    return result;
};

export async function hardDeleteUser(id) {
    const del = 'DELETE FROM user WHERE user_id = ?';
    const [result] = await connection.query(del, [id]);
    return result;
}

export async function softDeleteUser(id, is_active) {
    const del = 'UPDATE user SET is_active = ? WHERE user_id = ?';
    const [result] = await connection.query(del, [is_active, id]);
    return result;
};