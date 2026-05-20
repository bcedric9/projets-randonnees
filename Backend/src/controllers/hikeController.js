import { createHike, getAllHikes, getHikeById, updateHike, deleteHike } from "../models/hikeModel.js";

export async function createHikeController(req, res) {
    try {
        const { image, title, description, duration, level, max_participants, price, location } = req.body;
        const result = await createHike(image, title, description, duration, level, max_participants, price, location);
        res.status(201).json({ message: "Randonnée créée avec succès", hikeId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de la randonnée" });
    }
};

export async function listHikes(req, res) {
    try {
        const hikes = await getAllHikes();
        res.status(200).json(hikes);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des randonnées" });
    }
};

export async function hikeById(req, res) {
    try {
        const id = req.params.id; 
        const hike = await getHikeById(id);
        if (!hike) {
            return res.status(404).json({ message: "Randonnée non trouvée" });
        }
        res.status(200).json(hike);
    } catch (error) {   
        res.status(500).json({ message: "Erreur lors de la récupération de la randonnée" });
    }
};

export async function UpHike(req, res) {
    try {
        const id = req.params.id;
        const { image, title, description, duration, level, max_participants, price, location } = req.body;
        const hike = await updateHike(id, image, title, description, duration, level, max_participants, price, location);      
        res.status(200).json({ message: "Randonnée mise à jour avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour de la randonnée" });
    }
};

export async function delHike(req, res) {
    try {
        const id = req.params.id;
        const hike = await deleteHike(id);      
        res.status(200).json({ message: "Randonnée supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de la randonnée" });
    }
};