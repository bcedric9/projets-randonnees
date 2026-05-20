import { createAvailability, getAvailabilityById, getAllAvailabilities, getAvailabilityByGuide, deleteAvailability, updateAvailability } from "../models/guideAvailabilityModel.js";

export async function createAvailabilityController(req, res) {
    try {
        const { available_date, guide_id } = req.body;

        if (!available_date || !guide_id) {
            return res.status(400).json({
                message: "Date et guide requis"
            });
        }
        const result = await createAvailability(available_date, guide_id);
        res.status(201).json({ message: "Disponibilité créée avec succès", availableId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de la disponibilité", error: error.message });
    }
};

export async function availabilityById(req, res) {
    try {
        const { id } = req.params;
        const availability = await getAvailabilityById(id);
        if (!availability) {
            return res.status(404).json({ message: "Disponibilité non trouvée" });
        }
        res.status(200).json(availability);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de la disponibilité", error: error.message });
    }
};

export async function listAvailabilities(req, res) {
    try {
        const availabilities = await getAllAvailabilities();
        res.status(200).json(availabilities);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des disponibilités", error: error.message });
    }
};

export async function availabilityByGuide(req, res) {
    try {
        const { guide_id } = req.params;
        const availability = await getAvailabilityByGuide(guide_id);
        if (availability.length === 0) {
            return res.status(404).json({ message: "Disponibilité non trouvée pour ce guide" });
        }
        res.status(200).json(availability);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de la disponibilité", error: error.message });
    }
};

export async function delAvailability(req, res) {
    try {
        const { id } = req.params;
        const availability = await getAvailabilityById(id);

        if (!availability) {
            return res.status(404).json({
                message: "Disponibilité non trouvée"
            });
        }

        await deleteAvailability(id);
        res.status(200).json({ message: "Disponibilité supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de la disponibilité", error: error.message });
    }
};

export async function UpAvailability(req, res) {
    try {

        const { id } = req.params;
        const { available_date } = req.body;

        if (!available_date) {
            return res.status(400).json({
                message: "Date requise"
            });
        };

        const availability = await getAvailabilityById(id);

        if (!availability) {
            return res.status(404).json({
                message: "Disponibilité non trouvée"
            });
        }

        await updateAvailability(id, available_date);
        res.status(200).json({ message: "Disponibilité mise à jour avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour de la disponibilité", error: error.message });
    }
};

