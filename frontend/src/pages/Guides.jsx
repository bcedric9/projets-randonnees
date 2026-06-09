import { useEffect, useState } from "react";
import { getAllGuides } from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GuideCard from "../components/GuideCard";

function Guides() {

  useEffect(() => {
  window.scrollTo(0,0);
}, []);

  const [guides, setGuides] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await getAllGuides();
        setGuides(response.data);
      } catch (error) {
        console.error(error);
        setError("Impossible de récupérer les guides");
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, []);

  return (
    <div className="Page">
      <Header />
      <h2>Nos guides</h2>

      <p className='presentation'>Découvrez notre équipe de guides professionnels. Chacun possède sa propre expertise, 
        des balades familiales aux treks les plus sportifs, pour vous faire vivre une expérience 
        unique au cœur de la montagne.</p>

      {guides.length === 0 ? (
        <p>Aucun guide disponible.</p>
      ) : (
        <div className="cards-container">
          {guides.map((guide) => (
            <GuideCard
              key={guide.guide_id}
              guide={guide}
            />
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Guides;