import { useState } from "react";

export const useAuthToken = () => {
  const [token, setToken] = useState(sessionStorage.getItem("token") || null);

  const login = authToken => {
    sessionStorage.setItem("token", authToken);
    setToken(authToken);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setToken(null);
  };

  return [token, login, logout];
};
