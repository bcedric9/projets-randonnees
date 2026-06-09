import { useNavigate } from "react-router-dom";


function GuideCard({ guide }) {
    const navigate = useNavigate();

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
            </div>
        </article>
    )
}

export default GuideCard;