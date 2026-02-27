'use client';
// src/lib/auth.js
// Contexto global de sesión JWT en el cliente.
// Guarda token + usuario en localStorage y Context API.

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from './api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [token, setToken]     = useState(null);
  const [loading, setLoading] = useState(true);

  // Al montar, restaurar sesión desde localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('rs_token');
    const storedUser  = localStorage.getItem('rs_user');
    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('rs_token');
        localStorage.removeItem('rs_user');
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await authApi.login({ email, password });
    localStorage.setItem('rs_token', data.token);
    localStorage.setItem('rs_user', JSON.stringify(data.usuario));
    setToken(data.token);
    setUser(data.usuario);
    return data.usuario;
  }, []);

  const registro = useCallback(async (nombre, email, password) => {
    return authApi.registro({ nombre, email, password });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('rs_token');
    localStorage.removeItem('rs_user');
    setToken(null);
    setUser(null);
  }, []);

  const isAdmin = user?.rol === 'admin';

  return (
    <AuthContext.Provider value={{ user, token, loading, login, registro, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}
