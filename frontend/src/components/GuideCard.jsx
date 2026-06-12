import { useNavigate } from "react-router-dom";
import { deleteGuide } from "../services/api";


function GuideCard({ guide, isAdmin, onDeleted }) {
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (!window.confirm("Supprimer ce guide ?")) return;

        await deleteGuide(guide.guide_id);
        onDeleted();
    };

    return (
        <article className="GuideCard">
            <img src={`/images/guides/${guide.image}`}
                alt={guide.first_name}
                className="guide-image"
            />
            <div className="guide-content">
                <h3>
                    {guide.first_name} {guide.last_name}
                </h3>

                <p>{guide.bio}</p>

                <button
                    className="reserve-btn"
                    onClick={() =>
                        navigate(`/booking?guide_id=${guide.guide_id}`)
                    }
                >
                    Choisir ce guide
                </button>

                {isAdmin && (
                    <button className="delete-btn" onClick={handleDelete}>
                        Supprimer
                    </button>
                )}
            </div>
        </article>
    )
}

export default GuideCard;