import { Session } from 'next-auth';
import { create } from 'zustand';

interface AuthState {
  session: Session | null; 
  isAuthenticated: boolean; 
  setSession: (session: Session | null) => void; 
  clearSession: () => void; 
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  isAuthenticated: false,

  setSession: (session) => {
    set({
      session,
      isAuthenticated: !!session, // 세션 객체가 있으면 true, 없으면 false
    });
  },

  clearSession: () => {
    set({
      session: null,
      isAuthenticated: false,
    });
  },
}));
