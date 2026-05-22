import { createContext, useContext, useState } from "react";
import { router } from "expo-router";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  function login(email, password) {
    if (!email || !password) {
      return false;
    }

    setUser({ email, name: "Користувач" });
    setIsAuthenticated(true);
    router.replace("/");
    return true;
  }

  function register(email, password, name) {
    if (!email || !password || !name) {
      return false;
    }

    setUser({ email, name });
    setIsAuthenticated(true);
    router.replace("/");
    return true;
  }

  function logout() {
    setUser(null);
    setIsAuthenticated(false);
    router.replace("/login");
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
