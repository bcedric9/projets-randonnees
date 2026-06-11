import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthContext from "../contexte/AuthContext";
import logo from "../assets/logo.svg";

const NavBar = () => {
  const { isLogged, setIsLogged } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLogged(false);

    navigate("/login");
  };

  return (
    <nav>
      <div className="navbar-left">
        <div className="brand">
          <img src={logo} alt="Mountain Adventure" className="logo" />
          <span>Mountain Adventure</span>
        </div>
      </div>

      <div className="navbar-right">
        <button
          className="nav-btn"
          onClick={() => navigate("/")}
        >
          Accueil
        </button>

        <button
          className="nav-btn"
          onClick={() => navigate("/hikes")}
        >
          Randonnées
        </button>

        <button
          className="nav-btn"
          onClick={() => navigate("/guides")}
        >
          Guides
        </button>

        <button
          className="nav-btn"
          onClick={() => navigate("/reviews")}
        >
          Avis
        </button>

        {isLogged && role === "admin" && (
          <button
            className="nav-btn"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
        )}

        {isLogged ? (
          <>
            <button
              className="nav-btn"
              onClick={() => navigate("/profile")}
            >
              Profil
            </button>

            <button
              className="nav-btn"
              onClick={handleLogout}
            >
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <button
              className="nav-btn"
              onClick={() => navigate("/register")}
            >
              Inscription
            </button>

            <button
              className="nav-btn"
              onClick={() => navigate("/login")}
            >
              Connexion
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;