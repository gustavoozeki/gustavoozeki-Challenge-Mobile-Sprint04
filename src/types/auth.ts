// src/types/auth.ts (ou onde o seu tipo AuthContextData estiver)

// As suas outras definições de tipo (User, LoginCredentials, etc.) continuam aqui.
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// --- AQUI ESTÁ A CORREÇÃO ---
// Adicionámos as novas propriedades à interface do contexto.
export interface AuthContextData {
  user: User | null;
  loading: boolean;
  authLoading: boolean; // Estado de loading para login/registo
  authError: string | null; // Estado de erro para login/registo
  signIn(credentials: LoginCredentials): Promise<void>;
  register(data: RegisterData): Promise<void>;
  signOut(): Promise<void>;
}