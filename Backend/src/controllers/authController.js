import { getUserByEmail } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.DB_JWT_SECRET;

export async function loginUser(req, res) {
    try {
        const mail = req.body.mail;
        const password = req.body.password || req.body.HashedPassword;

        if (!mail || !password) {
            return res.status(400).json({ message: "Email et mot de passe requis" });
        }

        const user = await getUserByEmail(mail);
        if (!user.length === 0) {
        return res.status(404).json({ message: "email ou mot de passe incorrect" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
        }

        const token = jwt.sign({ id: user.user_id }, JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ message: "Connexion réussie", token });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Erreur lors de la connexion de l'utilisateur" });
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

