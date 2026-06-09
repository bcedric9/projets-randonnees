import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllGuides, createBooking, getAllHikes } from '../services/api';
import Footer from "../components/Footer";

function Booking() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);


    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const hikeId = searchParams.get("hike_id");
    const [hikes, setHikes] = useState([]);
    const [selectedHike, setSelectedHike] = useState(null);
    const guideId = searchParams.get("guide_id");

    const [guides, setGuides] = useState([]);
    const [formData, setFormData] = useState({
        hike_id: hikeId || "",
        guide_id: guideId || "",
        booking_date: "",
        number_participants: 1
    });

    useEffect(() => {
        getAllHikes()
            .then((response) => setHikes(response.data))
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        getAllGuides()
            .then((response) => setGuides(response.data))
            .catch((error) => console.error(error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "hike_id") {
            const hike = hikes.find(
                (hike) => hike.hike_id === Number(value)
            );

            setSelectedHike(hike);

            setFormData({
                ...formData,
                hike_id: value,
                number_participants: 1
            });

            return;
        }

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await createBooking({
            booking_date: formData.booking_date,
            number_participants: formData.number_participants,
            guide_id: formData.guide_id,
            hike_id: hikeId
        });

        if (
            selectedHike &&
            Number(formData.number_participants) > selectedHike.max_participants
        ) {
            alert(`Maximum ${selectedHike.max_participants} participants`);
            return;
        }

        const bookingId = response.data.bookingId;

        navigate(`/payment?booking_id=${bookingId}`);
    };

    return (
        <main>
            <section className="reservation-header">
                <h2>Réservation</h2>
            </section>

            <form onSubmit={handleSubmit} className="reservation-form">

                <div className="form-group">
                    <label>Randonnée</label>
                    <select
                        name="hike_id"
                        required
                        value={formData.hike_id}
                        onChange={handleChange}
                    >
                        <option value="">Sélectionnez une randonnée</option>

                        {hikes.map((hike) => (
                            <option key={hike.hike_id} value={hike.hike_id}>
                                {hike.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Date</label>
                    <input
                        type="date"
                        name="booking_date"
                        value={formData.booking_date}
                        onChange={handleChange}
                        min={new Date().toISOString().split("T")[0]}
                    />
                    </div>

                    <div className="form-group">
                    <label>Participants</label>
                    <input
                        type="number"
                        name="number_participants"
                        value={formData.number_participants}
                        onChange={handleChange}
                        min="1"
                        max={selectedHike?.max_participants || 1}
                    />
                </div>

                <div className="form-group">
                    <label>Guide</label>
                    <select
                        name="guide_id"
                        value={formData.guide_id}
                        onChange={handleChange}
                    >
                        <option value="">Choisir un guide</option>
                        {guides.map((guide) => (
                            <option key={guide.guide_id} value={guide.guide_id}>
                                {guide.first_name} {guide.last_name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit">Confirmer la réservation</button>
            </form>
            <Footer />
        </main>
    );
}

export default Booking;