import { useEffect, useState, useContext } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexte/AuthContext.js";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    mail: "",
    password: ""
  });

  const {setIsLogged} = useContext(AuthContext);

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
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setIsLogged(true);

      navigate("/hikes");
    } catch (error) {
      console.error(
        "Erreur lors de la connexion:",
        error.response?.data || error
      );
    }
  };

  return (
    <div className="Page">
      <Header />
      <h2>Page de Connexion</h2>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>E-mail :</label>
          <input
            type="email"
            name="mail"
            value={formData.mail}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Mot de passe :</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Se connecter</button>
      </form>

      <Footer />
    </div>
  );
}

export default Login;