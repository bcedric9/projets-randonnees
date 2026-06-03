import {useEffect, useState} from 'react';
import {getAllHikes} from '../services/api';
import { useNavigate } from 'react-router-dom';

function Hikes() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

  const [hikes, setHikes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHikes = async () => {
      try {
        const response = await getAllHikes();
        setHikes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHikes();
  }, []);

  const handleBooking = (hikeId) => {
    navigate(`/booking?hike_id=${hikeId}`);
  };

  return (
    <main>
      <h1>Nos randonnées</h1>

      {hikes.map((hike) => (
        <article key={hike.hike_id}>
          <h2>{hike.title}</h2>
          <p>{hike.description}</p>
          <p>Durée : {hike.duration} h</p>
          <p>Niveau : {hike.level}</p>
          <p>Lieu : {hike.location}</p>
          <p>Prix : {hike.price} €</p>
          <p>Participants max : {hike.max_participants}</p>

          <button onClick={() => handleBooking(hike.hike_id)}>
            Réserver
          </button>
        </article>
      ))}
    </main>
  );
}

export default Hikes;

