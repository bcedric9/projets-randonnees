import { createUser, getAllUsers, getUserByEmail, getUserById, updateUser, hardDeleteUser, softDeleteUser } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.DB_JWT_SECRET;

export async function registerUser(req, res) {
    try {
        const { last_name, first_name, tel, mail, password } = req.body;

        const existingUser = await getUserByEmail(mail);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "Email déjà utilisé" });
        } if (!mail.includes("@")) {
            return res.status(400).json({ message: "Format d'email invalide" });
        }if (password.length < 8) {
            return res.status(400).json({ message: "Le mot de passe doit contenir au moins 8 caractères" });
        };

        const registration_date = new Date();
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await createUser(last_name, first_name, tel, mail, hashedPassword, registration_date);
        res.status(201).json({ message: "Utilisateur créé avec succès", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
};

export async function listUsers(req, res) {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs" });
    }
};

export async function userById(req, res) {
    try {
        const { id } = req.params; 
        const user = await getUserById(id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(200).json(user);
    } catch (error) {   
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur" });
    }   
};

export async function UpUser(req, res) {
    try {
        const { id } = req.params;
        const { last_name, first_name, role, tel, mail, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await updateUser(id, last_name, first_name, role, tel, mail, hashedPassword);      
        res.status(200).json({ message: "Utilisateur mis à jour avec succès" });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur" });
    }
};

export async function softDelUser(req, res) {
    try {
        const { id } = req.params;
        const user = await softDeleteUser(id);      
        res.status(200).json({ message: "Utilisateur mis à jour avec succès" });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur" });
    }
};

export async function hardDelUser(req, res) {
    try {
        const { id } = req.params;
        const user = await hardDeleteUser(id);      
        res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur" });
    }
};
