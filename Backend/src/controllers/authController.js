import { getUserByEmail } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.DB_JWT_SECRET;

export async function loginUser(req, res) {

    try {

        const { mail, password } = req.body;

        if (!mail || !password) {
            return res.status(400).json({
                message: "Email et mot de passe requis"
            });
        }

        const user = await getUserByEmail(mail);

        if (user.length === 0) {
            return res.status(404).json({
                message: "Email ou mot de passe incorrect"
            });
        }

        const foundUser = user[0];

        const isMatch = await bcrypt.compare(
            password,
            foundUser.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Mot de passe incorrect"
            });
        }

        const token = jwt.sign(
            {
                user_id: foundUser.user_id,
                role: foundUser.role
            },
            JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.status(200).json({
            message: "Connexion réussie",
            token,
            user: {
                user_id: foundUser.user_id,
                first_name: foundUser.first_name,
                last_name: foundUser.last_name,
                mail: foundUser.mail,
                role: foundUser.role,
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Erreur lors de la connexion"
        });

    }

};

export async function logoutUser(req, res) {
    try {
        res.status(200).json({ message: "Déconnexion réussie" });
    } catch (error) {
        console.error("Error logging out user:", error);
        res.status(500).json({ message: "Erreur lors de la déconnexion de l'utilisateur" });
    }
};

