import AppRouter from "./routes/AppRouter";
import { useState } from "react";
import AuthContext from "./contexte/AuthContext";
import NavBar from "./components/NavBar";
import IsConnected from "./services/AuthService.js";

function App() {
  const [isLogged, setIsLogged] = useState(IsConnected());
  const [role, setRole] = useState("USER");

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        setIsLogged,
        role,
        setRole
      }}
    >
        <NavBar />
        <AppRouter />
    </AuthContext.Provider>
  );
}

export default App;
