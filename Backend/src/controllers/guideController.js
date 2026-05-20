import { createGuide, getAllGuides, getGuideById, updateGuide, SoftDeleteGuide, HardDeleteGuide } from "../models/guideModel.js";

export async function createGuideController(req, res) {
    try {
        const { last_name, first_name, bio, image } = req.body;
        const result = await createGuide(last_name, first_name, bio, image);
        res.status(201).json({ message: "Guide créé avec succès", guideId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création du guide", error: error.message });
    }
};

export async function listGuides(req, res) { 
    try {
        const guides = await getAllGuides();
        res.status(200).json(guides);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des guides", error: error.message });
    }
};

export async function guideById(req, res) {
    try {
        const { id } = req.params;
        const guide = await getGuideById(id);
        if (!guide) {
            return res.status(404).json({ message: "Guide non trouvé" });
        }
        res.status(200).json(guide);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération du guide", error: error.message });
    }
}

export async function UpGuide(req, res) {
    try {
        const { id } = req.params;
        const { last_name, first_name, bio, image } = req.body;
        const guide = await updateGuide(id, last_name, first_name, bio, image);
        res.status(200).json({ message: "Guide mis à jour avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour du guide", error: error.message });
    }       
};

export async function delGuide(req, res) { 
    try {
        const { id } = req.params;
        await HardDeleteGuide(id);
        res.status(200).json({ message: "Guide supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression du guide", error: error.message });
    }
};

export async function softDelGuide(req, res) {
    try {
        const { id } = req.params;
        const { is_active } = req.body;
        await SoftDeleteGuide(id, is_active);
        res.status(200).json({ message: "Guide mis à jour avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour du guide", error: error.message });
    }
};