import React from "react";

const AuthContext = React.createContext({ 
    // key : value par défaut
    isLogged : false,
    setIsLogged : () => {},

});

export default AuthContext;