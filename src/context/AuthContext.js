import React, { createContext, useContext, useState, useCallback } from "react";
import authService from "../services/authService";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(authService.getUser());
  const [isAuthenticated, setIsAuthenticated] = useState(
    authService.isAuthenticated(),
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = useCallback(
    async (username, email, password, confirmPassword) => {
      setLoading(true);
      setError(null);
      try {
        const response = await authService.register(
          username,
          email,
          password,
          confirmPassword,
        );
        return response.data;
      } catch (err) {
        setError(err.response?.data?.message || "Registration failed");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const login = useCallback(async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(username, password);
      const token = response.data.token;
      authService.setToken(token);
      const userData = {
        userId: response.data.userId,
        username: response.data.username,
        properties: response.data.properties,
      };
      authService.setUser(userData);
      setUser(userData);
      setIsAuthenticated(true);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUserProperties = useCallback(
    (newProperties) => {
      const updatedUser = {
        ...user,
        properties: {
          ...user?.properties,
          ...newProperties,
        },
      };

      authService.setUser(updatedUser); // update localStorage
      setUser(updatedUser); // update React state
    },
    [user],
  );

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  }, []);

  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    register,
    login,
    logout,
    updateUserProperties,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
