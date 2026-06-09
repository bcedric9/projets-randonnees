import '/style/global.css';
import header from '../assets/header.jpg'
import Header from '../components/Header';
import HikeCard from '../components/HikeCard';
import { useEffect, useState } from "react";
import { getAllHikes } from '../services/api';
import Footer from '../components/Footer';
import picmidi from '../assets/picmidi.jpeg'

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

      <div className="about">
          <h2>About</h2>

<div className='about-us'>
          <img src={picmidi} alt="Mountain Adventure" className="pic-about" />
          <p className='paragraphe-about'>Bienvenue sur notre plateforme dédiée à la randonnée en montagne à travers la France.

            Ici, nous mettons en relation les passionnés de nature avec des guides locaux expérimentés, prêts à vous faire découvrir les plus beaux paysages, en toute sécurité. Que vous soyez débutant ou randonneur confirmé, vous pouvez choisir un guide adapté à votre niveau, à vos envies et au type d’expérience que vous recherchez.

            Notre mission est simple : rendre la montagne accessible à tous, tout en valorisant le savoir-faire des guides qui connaissent parfaitement leur territoire. Chaque guide présenté sur la plateforme est sélectionné avec soin pour garantir professionnalisme, sécurité et authenticité.

            Explorez, choisissez, partez : votre prochaine aventure commence ici.</p>
            </div>

        </div>
      <Footer />

    </div>



  );
}

export default Home;