import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    last_name: "",
    first_name: "",
    tel: "",
    mail: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(formData);

      setSuccess("Compte créé avec succès !");
      setError("");

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Erreur lors de l'inscription"
      );
      setSuccess("");
    }
  };

  return (
    <main>
      <h1>Inscription</h1>

      {error && <p>{error}</p>}
      {success && <p>{success}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="last_name"
          placeholder="Nom"
          value={formData.last_name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="first_name"
          placeholder="Prénom"
          value={formData.first_name}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="tel"
          placeholder="Téléphone"
          value={formData.tel}
          onChange={handleChange}
          required
          pattern="\d{10}"
        />

        <input
          type="email"
          name="mail"
          placeholder="Email"
          value={formData.mail}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={8}
        />

        <button type="submit">Créer mon compte</button>
      </form>
    </main>
  );
}

export default Register;