import { create } from 'zustand';
import { productsService, Product, ProductsResponse } from '../services/productsService';
import { PAGINATION, CACHE_DURATION } from '@/common/utils/constants';

interface ProductsState {
  products: Product[];
  selectedProduct: Product | null;
  categories: string[];
  selectedCategory: string;
  total: number;
  skip: number;
  limit: number;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  lastFetch: number | null;
  
  // Actions
  fetchProducts: (limit?: number, skip?: number) => Promise<void>;
  fetchProductById: (id: number) => Promise<void>;
  searchProducts: (query: string) => Promise<void>;
  fetchProductsByCategory: (category: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
  setPage: (page: number) => void;
  clearSelectedProduct: () => void;
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  selectedProduct: null,
  categories: [],
  selectedCategory: 'all',
  total: 0,
  skip: PAGINATION.DEFAULT_SKIP,
  limit: PAGINATION.DEFAULT_LIMIT,
  searchQuery: '',
  isLoading: false,
  error: null,
  lastFetch: null,

  fetchProducts: async (limit = PAGINATION.DEFAULT_LIMIT, skip = PAGINATION.DEFAULT_SKIP) => {
    const { lastFetch, searchQuery, selectedCategory } = get();
    
    // Simple cache
    if (lastFetch && Date.now() - lastFetch < CACHE_DURATION && !searchQuery && !selectedCategory && skip === get().skip) {
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const data = await productsService.getProducts(limit, skip);
      set({
        products: data.products,
        total: data.total,
        skip: data.skip,
        limit: data.limit,
        isLoading: false,
        lastFetch: Date.now(),
        searchQuery: '',
        selectedCategory: 'all',
      });
    } catch (error: any) {
      set({
        error: error.message || 'Failed to fetch products',
        isLoading: false,
      });
    }
  },

  fetchProductById: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      const product = await productsService.getProductById(id);
      set({
        selectedProduct: product,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || 'Failed to fetch product',
        isLoading: false,
      });
    }
  },

  searchProducts: async (query: string) => {
    set({ isLoading: true, error: null, searchQuery: query, selectedCategory: '' });
    try {
      const data = await productsService.searchProducts(query, get().limit);
      set({
        products: data.products,
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

  fetchProductsByCategory: async (category: string) => {
    set({ isLoading: true, error: null, selectedCategory: category, searchQuery: '' });
    try {
      const data = await productsService.getProductsByCategory(category=='all'?"":category, get().limit);
      set({
        products: data.products,
        total: data.total,
        skip: 0,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || 'Failed to fetch products by category',
        isLoading: false,
      });
    }
  },

  fetchCategories: async () => {
    try {
      const categories = await productsService.getCategories();
      console.log("store ca",categories);
      
      set({ categories });
    } catch (error: any) {
      console.error('Failed to fetch categories:', error);
    }
  },

  setPage: (page: number) => {
    const { limit } = get();
    const skip = page * limit;
    get().fetchProducts(limit, skip);
  },

  clearSelectedProduct: () => set({ selectedProduct: null }),
}));
