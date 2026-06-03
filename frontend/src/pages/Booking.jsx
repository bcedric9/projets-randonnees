import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllGuides, createBooking } from '../services/api';

function Booking() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const hikeId = searchParams.get("hike_id");

    const [guides, setGuides] = useState([]);
    const [formData, setFormData] = useState({
        guide_id: "",
        booking_date: "",
        number_participants: 1
    });

    useEffect(() => {
        getAllGuides()
            .then((response) => setGuides(response.data))
            .catch((error) => console.error(error));
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
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

        const bookingId = response.data.bookingId;

        navigate(`/payment?booking_id=${bookingId}`);
    };

    return (
        <main>
            <h1>Réserver une randonnée</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="date"
                    name="booking_date"
                    value={formData.booking_date}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="number_participants"
                    value={formData.number_participants}
                    onChange={handleChange}
                    min="1"
                />

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

                <button type="submit">Confirmer la réservation</button>
            </form>
        </main>
    );
}

export default Booking;