import {useEffect, useState} from 'react';
import {getAllHikes} from '../services/api';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import HikeCard from '../components/HikeCard';
import '/style/global.css';

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
    <div className="Page">
      <Header/>
      <h2>Nos randonnées</h2>

      <p className='presentation'>La randonnée en montagne permet de se ressourcer en pleine nature tout en améliorant sa condition physique. 
        Elle réduit le stress, favorise le bien-être mental et offre un véritable moment de déconnexion. 
        C'est aussi une excellente façon de se reconnecter à soi et à l'environnement.</p>

      <div className="cards-container">
        {hikes.map((hike) => (
          <HikeCard
            key={hike.hike_id}
            hike={hike}
          />
        ))}
      </div>
    </div>
  );
}

export default Hikes;

