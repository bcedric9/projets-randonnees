import {useEffect, useState} from 'react';



function Login() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

const [formData, setFormData] = useState({
    email: '',
    password: ''});

const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });};

const handleSubmit = (e) => {
    e.preventDefault();
    try {
        // Envoyer les données de connexion à l'API
        // Exemple : api.post('/auth/login', formData)
        console.log('Données de connexion:', formData);
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
    }

    // Réinitialiser le formulaire après soumission
    setFormData({
        email: '',
        password: ''
    });
};

return (
    <div>
        <h1>Page de Connexion</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Mot de passe:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Se connecter</button>
        </form>
    </div>
);

}

export default Login;