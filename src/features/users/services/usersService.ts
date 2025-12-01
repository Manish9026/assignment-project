import apiClient from '@/common/utils/apiClient';
import { API_ENDPOINTS } from '@/common/utils/constants';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  domain: string;
  ip: string;
  address: {
    address: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    postalCode: string;
    state: string;
  };
  macAddress: string;
  university: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company: {
    department: string;
    name: string;
    title: string;
    address: {
      address: string;
      city: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      postalCode: string;
      state: string;
    };
  };
  ein: string;
  ssn: string;
  userAgent: string;
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export const usersService = {
  getUsers: async (limit: number = 10, skip: number = 0): Promise<UsersResponse> => {
    const response = await apiClient.get<UsersResponse>(
      `${API_ENDPOINTS.USERS.LIST}?limit=${limit}&skip=${skip}`
    );
    return response.data;
  },

  getUserById: async (id: number): Promise<User> => {
    const response = await apiClient.get<User>(API_ENDPOINTS.USERS.SINGLE(id));
    return response.data;
  },

  searchUsers: async (query: string, limit: number = 10): Promise<UsersResponse> => {
    const response = await apiClient.get<UsersResponse>(
      `${API_ENDPOINTS.USERS.SEARCH}?q=${query}&limit=${limit}`
    );
    return response.data;
  },
};
