import apiClient from '@/common/utils/apiClient';
import { API_ENDPOINTS } from '@/common/utils/constants';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
  accessToken: string;
  refreshToken: string;
}

export const authService = {
  /**
   * Login user with DummyJSON API
   * Test credentials: username: 'emilys', password: 'emilyspass'
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    return response.data;
  },

  /**
   * Logout user (client-side only)
   */
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },
};
