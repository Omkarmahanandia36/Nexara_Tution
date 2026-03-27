import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// Student credentials
const STUDENT_CREDS = { id: "student", password: "sovan123" };
// Admin credentials
const ADMIN_CREDS = { id: "admin", password: "sovan@admin" };

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("sovan_auth") === "true"
  );
  const [isAdmin, setIsAdmin] = useState(
    () => localStorage.getItem("sovan_admin") === "true"
  );

  const login = (id, password) => {
    if (id === STUDENT_CREDS.id && password === STUDENT_CREDS.password) {
      setIsAuthenticated(true);
      localStorage.setItem("sovan_auth", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("sovan_auth");
  };

  const adminLogin = (id, password) => {
    if (id === ADMIN_CREDS.id && password === ADMIN_CREDS.password) {
      setIsAdmin(true);
      localStorage.setItem("sovan_admin", "true");
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem("sovan_admin");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isAdmin, adminLogin, adminLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
