// src/context/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../services/auth';
import { User, LoginCredentials, RegisterData, AuthContextData } from '../types/auth';

const STORAGE_KEYS = {
  USER: '@InvestApp:user',
  TOKEN: '@InvestApp:token',
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    async function loadInitialData() {
        try {
            await authService.loadRegisteredUsers();
            const storedUser = await authService.getStoredUser();
            if (storedUser) {
                setUser(storedUser);
            }
        } catch (error) {
            console.error('Erro ao carregar dados iniciais:', error);
        } finally {
            setLoading(false);
        }
    }
    loadInitialData();
  }, []);

  const signIn = async (credentials: LoginCredentials) => {
    // Validação de campos vazios
    if (!credentials.email || !credentials.password) {
      setAuthError("Por favor, preencha todos os campos.");
      throw new Error("Campos vazios.");
    }

    setAuthLoading(true);
    setAuthError(null);
    try {
      const response = await authService.signIn(credentials);
      setUser(response.user);
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
      await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
    } catch (error: any) {
      setAuthError(error.message || 'Email ou senha inválidos');
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    // Validação de campos vazios
    if (!data.name || !data.email || !data.password) {
      setAuthError("Por favor, preencha todos os campos.");
      throw new Error("Campos vazios.");
    }
    
    setAuthLoading(true);
    setAuthError(null);
    try {
      const response = await authService.register(data);
      // Após o registo, não fazemos login automático, apenas informamos o sucesso.
      // O utilizador será redirecionado para a tela de login.
    } catch (error: any) {
      setAuthError(error.message || 'Erro ao criar conta.');
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await authService.signOut();
      setUser(null);
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
      await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, authLoading, authError, signIn, register, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};