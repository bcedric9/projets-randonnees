import { useNavigate } from "react-router-dom";
import { deleteHike } from "../services/api";

function HikeCard({ hike, isAdmin, onDeleted }) {
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (!window.confirm("Supprimer cette randonnée ?")) return;

        await deleteHike(hike.hike_id);
        onDeleted();
    };

    return (
        <article className="hike-card">
            <img
                src={`/images/hikes/${hike.image}`}
                alt={hike.title}
                className="hike-image"
            />

            <div className="hike-content">
                <h3>{hike.title}</h3>

                <p>{hike.description}</p>

                <p>
                    <strong>Difficulté :</strong> {
                        {
                            easy: "Facile",
                            medium: "Moyen",
                            hard: "Difficile"
                        }[hike.level]
                    }
                </p>

                <p>
                    <strong>Durée (heures) :</strong> {hike.duration}
                </p>

                <p>
                    <strong>Participants :</strong> {hike.max_participants}
                </p>

                <p>
                    <strong>Prix :</strong> {hike.price}
                </p>

                <button
                    className="reserve-btn"
                    onClick={() =>
                        navigate(`/booking?hike_id=${hike.hike_id}`)
                    }
                >
                    Réserver
                </button>

                {isAdmin && (
                    <button className="delete-btn" onClick={handleDelete}>
                        Supprimer
                    </button>
                )}
            </div>
        </article>
    );
}

export default HikeCard;