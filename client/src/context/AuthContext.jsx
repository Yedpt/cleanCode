import React, { createContext, useState, useEffect } from 'react';
import * as api from '../services/CodeYedServices';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('cy_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('cy_token') || null);

  useEffect(() => {
    if (token) localStorage.setItem('cy_token', token);
    else localStorage.removeItem('cy_token');
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem('cy_user', JSON.stringify(user));
    else localStorage.removeItem('cy_user');
  }, [user]);

  const login = async (email, password) => {
    const res = await api.login({ email, password });
    if (res.token) {
      setToken(res.token);
      setUser(res.user);
      return { ok: true };
    }
    return { ok: false, error: res };
  };

  const register = async (email, password, name) => {
    const res = await api.register({ email, password, name });
    return res;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const value = { user, token, login, logout, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
