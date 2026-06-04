import { useEffect, useState } from "react";
import { getAllGuides } from "../services/api";

function Guides() {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
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

  if (loading) {
    return <p>Chargement des guides...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <h1>Nos guides</h1>

      {guides.length === 0 ? (
        <p>Aucun guide disponible.</p>
      ) : (
        <section>
          {guides.map((guide) => (
            <article key={guide.guide_id}>
              {guide.image && (
                <img
                  src={`http://localhost:3000/uploads/guides/${guide.image}`}
                  alt={`${guide.first_name} ${guide.last_name}`}
                  width="200"
                />
              )}

              <h2>
               Nom : {guide.first_name} {guide.last_name}
              </h2>

              <p>Biographie :{guide.bio}</p>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default Guides;