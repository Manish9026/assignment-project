export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REFRESH: '/auth/refresh',
  },
  USERS: {
    LIST: '/users',
    SINGLE: (id: number) => `/users/${id}`,
    SEARCH: '/users/search',
  },
  PRODUCTS: {
    LIST: '/products',
    SINGLE: (id: number) => `/products/${id}`,
    SEARCH: '/products/search',
    CATEGORY: (category: string) => `/products/category/${category}`,
    CATEGORIES: '/products/categories',
  },
};

export const PAGINATION = {
  DEFAULT_LIMIT: 10,
  DEFAULT_SKIP: 0,
};

export const ROUTES={
  LOGIN: '/auth/login',
  DASHBOARD: '/dashboard',
}

export const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
