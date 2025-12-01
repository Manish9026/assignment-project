import { create } from 'zustand';
import { usersService, User, UsersResponse } from '../services/usersService';
import { PAGINATION, CACHE_DURATION } from '@/common/utils/constants';

interface UsersState {
  users: User[];
  selectedUser: User | null;
  total: number;
  skip: number;
  limit: number;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  lastFetch: number | null;
  
  // Actions
  fetchUsers: (limit?: number, skip?: number) => Promise<void>;
  fetchUserById: (id: number) => Promise<void>;
  searchUsers: (query: string) => Promise<void>;
  setPage: (page: number) => void;
  clearSelectedUser: () => void;
}

export const useUsersStore = create<UsersState>((set, get) => ({
  users: [],
  selectedUser: null,
  total: 0,
  skip: PAGINATION.DEFAULT_SKIP,
  limit: PAGINATION.DEFAULT_LIMIT,
  searchQuery: '',
  isLoading: false,
  error: null,
  lastFetch: null,

  fetchUsers: async (limit = PAGINATION.DEFAULT_LIMIT, skip = PAGINATION.DEFAULT_SKIP) => {
    const { lastFetch, searchQuery } = get();
    
    // Simple cache: skip fetch if data is fresh and no search query
    if (lastFetch && Date.now() - lastFetch < CACHE_DURATION && !searchQuery && skip === get().skip) {
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const data = await usersService.getUsers(limit, skip);
      set({
        users: data.users,
        total: data.total,
        skip: data.skip,
        limit: data.limit,
        isLoading: false,
        lastFetch: Date.now(),
        searchQuery: '',
      });
    } catch (error: any) {
      set({
        error: error.message || 'Failed to fetch users',
        isLoading: false,
      });
    }
  },

  fetchUserById: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      const user = await usersService.getUserById(id);
      set({
        selectedUser: user,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || 'Failed to fetch user',
        isLoading: false,
      });
    }
  },

  searchUsers: async (query: string) => {
    set({ isLoading: true, error: null, searchQuery: query });
    try {
      const data = await usersService.searchUsers(query, get().limit);
      set({
        users: data.users,
        total: data.total,
        skip: 0,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || 'Search failed',
        isLoading: false,
      });
    }
  },

  setPage: (page: number) => {
    const { limit } = get();
    const skip = page * limit;
    get().fetchUsers(limit, skip);
  },

  clearSelectedUser: () => set({ selectedUser: null }),
}));
