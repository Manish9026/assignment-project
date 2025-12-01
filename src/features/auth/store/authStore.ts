import { create } from 'zustand';
import { authService, AuthResponse } from '../services/authService';

interface AuthState {
  user: AuthResponse | null;
  token: string | null;
  isAuthenticated: boolean | string;
  isLoading: boolean;
  error: string | null;
  isAuthenticState: 'initial' | 'authenticated' | 'unauthenticated';

  // Actions
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  initAuth: () => Promise<void>;

  setLoading?: (isLoading: boolean) => void;
  clearError: () => void;
}

/**
 * Zustand store for authentication state
 * Why Zustand?
 * - Lightweight and simple API
 * - Built-in async support
 * - No boilerplate like Redux
 * - Easy to use with TypeScript
 * - Minimal re-renders
 */
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isAuthenticState: 'initial',

  login: async (username: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const data = await authService.login({ username, password });

      // Store token and user in localStorage for persistence
      localStorage.setItem('authToken', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data));

      set({
        user: data,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Login failed',
        isLoading: false,
      });
      throw error;
    }
  },

  logout: () => {
    authService.logout();
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
  },

  // initAuth: async () => {
  //   set({ isLoading: true, error: null });
  //   const token = localStorage.getItem('authToken');
  //   const userStr = localStorage.getItem('user');

  //   if (token && userStr) {
  //     try {
  //       console.log(token, userStr);

  //       const user = JSON.parse(userStr);
  //       set({
  //         user,
  //         token,
  //         isAuthenticated: true,
  //         isLoading: false,
  //       });

  //     } catch (error) {
  //       // Invalid stored data, clear it
  //       localStorage.removeItem('authToken');
  //       localStorage.removeItem('user');
  //       set({
  //         user: null,
  //         token: null,
  //         isAuthenticated: false,
  //         isLoading: false,
  //       });
  //     }
  //   }
  // },
  initAuth: async () => {
    console.log("initAuth start");
    // set({ isLoading: true });
    set({ isLoading: true, error: null });
    console.log("after set true", useAuthStore.getState().isLoading);

    const token = localStorage.getItem('authToken');
    const userStr = localStorage.getItem('user');
    await new Promise((resolve) => setTimeout(resolve, 500));

    console.log(token);

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
          isAuthenticState: 'authenticated',
        });
      } catch (error) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          isAuthenticState: 'unauthenticated',
        });
      }
    } else {
      // 🚨 Missing in your code!
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        isAuthenticState: 'unauthenticated',
      });
    }
  },
  setLoading: (isLoading: boolean) => set({ isLoading }),


  clearError: () => set({ error: null }),
}));
