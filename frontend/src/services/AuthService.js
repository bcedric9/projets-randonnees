import { jwtDecode } from "jwt-decode";

function IsConnected() {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }

  const decodedToken = jwtDecode(token);

  return decodedToken.exp * 1000 > Date.now();
}

export default IsConnected;