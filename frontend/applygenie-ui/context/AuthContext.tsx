'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loginRequest, registerRequest } from '../lib/api';

interface AuthState {
  token: string | null;
  user: { name: string } | null;
  loading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (credentials: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = window.localStorage.getItem('applygenie_token');
    const storedName = window.localStorage.getItem('applygenie_name');

    if (storedToken) {
      setToken(storedToken);
    }
    if (storedName) {
      setUser({ name: storedName });
    }
    setLoading(false);
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    const data = await loginRequest(credentials);
    const jwt = data.token ?? data.accessToken ?? data.jwt;
    const name = data.name ?? data.user?.name ?? credentials.email;
    if (!jwt) {
      throw new Error('Missing authentication token');
    }
    window.localStorage.setItem('applygenie_token', jwt);
    window.localStorage.setItem('applygenie_name', name);
    setToken(jwt);
    setUser({ name });
  };

  const register = async (credentials: { name: string; email: string; password: string }) => {
    const data = await registerRequest(credentials);
    const jwt = data.token ?? data.accessToken ?? data.jwt;
    const name = data.name ?? data.user?.name ?? credentials.name;
    if (!jwt) {
      throw new Error('Missing authentication token');
    }
    window.localStorage.setItem('applygenie_token', jwt);
    window.localStorage.setItem('applygenie_name', name);
    setToken(jwt);
    setUser({ name });
  };

  const logout = () => {
    window.localStorage.removeItem('applygenie_token');
    window.localStorage.removeItem('applygenie_name');
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      login,
      register,
      logout,
    }),
    [token, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
