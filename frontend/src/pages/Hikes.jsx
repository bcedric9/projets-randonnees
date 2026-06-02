import {useEffect, useState} from 'react';
import api from '../services/api';

function Hikes() {
    const [hikes, setHikes] = useState([]);

    useEffect(() => {
        api.get("/hike/hike")
            .then((response) => {
                setHikes(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <h1>Liste des randonnées</h1>

            {hikes.map((hike) => (
                <div key={hike.hike_id}>
                    <h3>{hike.title}</h3>
                </div>
            ))}
        </div>
    );
}

export default Hikes;