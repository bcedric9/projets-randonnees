import { useNavigate } from "react-router-dom";

function HikeCard({ hike }) {
    const navigate = useNavigate();

    return (
        <article className="hike-card">
            <img
                src={hike.image}
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
                    <strong>Durée (minutes) :</strong> {hike.duration}
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
            </div>
        </article>
    );
}

export default HikeCard;