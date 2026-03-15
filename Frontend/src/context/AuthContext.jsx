import React, { createContext, useState, useEffect, useContext } from "react";
import { use } from "react";
import axios from "axios";

// १. Context तयार करा
const AuthContext = createContext();

// २. Provider Component
export const AuthProvider = ({ children }) => {
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Invalid Token or Session Expired")
        return;
      }

      try {
        const res = await axios.get("http://localhost:3000/api/auth/me", {
          headers: {
            "x-auth-token": token, 
          },
        });

        setUser(res.data); 
        setIsLoggedIn(true);
      } catch (err) {
        console.error(err,"Invalid Token or Session Expired");
        localStorage.removeItem("token"); 
      } finally {
        setToken(token);
      }
    };

    fetchUser();
  }, []);

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const login = (userData, userToken) => {
    setToken(userToken);
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("token", userToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
    window.location.href = "/signin";
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
