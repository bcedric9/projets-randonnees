import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
});

try {
    await connection.connect();
    console.log('Connected to the database successfully!');
} catch (error) {
    console.error('Error connecting to the database:', error);
}; 

export default connection;
