import { useEffect, useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    mail: "",
    password: ""
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData);

      localStorage.setItem("token", response.data.token);

      navigate("/hikes");
    } catch (error) {
      console.error(
        "Erreur lors de la connexion:",
        error.response?.data || error
      );
    }
  };

  return (
    <div>
      <h1>Page de Connexion</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="mail"
            value={formData.mail}
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