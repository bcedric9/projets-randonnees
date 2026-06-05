import '/style/global.css';
import header from '../assets/header.jpg'
import Header from '../components/Header';
import HikeCard from '../components/HikeCard';
import { useEffect, useState } from "react";
import { getAllHikes } from '../services/api';

function Home() {
  const [hikes, setHikes] = useState([]);

  useEffect(() => {
    const fetchHikes = async () => {
      try {
        const response = await getAllHikes();
        setHikes(response.data.slice(0, 3));
      } catch (error) {
        console.error("Erreur randonnées :", error);
      }
    };

    fetchHikes();
  }, []);

  return (

    <div className="Page">
      <Header />
      <h1 className="Titre">Bienvenue</h1>
      <p className='presentation'>Les plus belles randonnées en montagne en France
        vous ouvrent les bras.
        Plongez dans nos suggestions et laissez vous porter par la nature.
      </p>

      <div className='suggestion'>
        <h2>Suggestions</h2>
     
        <div className="cards-container">
          {hikes.map((hike) => (
            <HikeCard
              key={hike.hike_id}
              hike={hike}
            />
          ))}
        </div>

      </div>
  
    </div>



  );
}

export default Home;