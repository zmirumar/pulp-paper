import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createJSONStorage } from 'zustand/middleware';

interface User {
  id: number;
  full_name: string;
  login: string;
  phone_number: string;
}

interface AuthState {
  token: string | null;
  isLogged: boolean;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isLogged: false,
      user: null,
      login: (token: string, user: User) => {
        set({ token, isLogged: true, user });
      },
      logout: () => {
        set({ token: null, isLogged: false, user: null });
      },
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
