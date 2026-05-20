import dotenv from "dotenv";


dotenv.config();

export default function adminMiddleware(req, res, next) {
    if (!req.user)
        return res.status(401).json({ message: "Utilisateur non authentifié" })

    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Accès refusé : privilèges insuffisants" });
    }
    next();
};

