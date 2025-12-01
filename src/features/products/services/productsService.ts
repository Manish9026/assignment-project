import apiClient from '@/common/utils/apiClient';
import { API_ENDPOINTS } from '@/common/utils/constants';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const productsService = {
  getProducts: async (limit: number = 10, skip: number = 0): Promise<ProductsResponse> => {
    const response = await apiClient.get<ProductsResponse>(
      `${API_ENDPOINTS.PRODUCTS.LIST}?limit=${limit}&skip=${skip}`
    );
    return response.data;
  },

  getProductById: async (id: number): Promise<Product> => {
    const response = await apiClient.get<Product>(API_ENDPOINTS.PRODUCTS.SINGLE(id));
    return response.data;
  },

  searchProducts: async (query: string, limit: number = 10): Promise<ProductsResponse> => {
    const response = await apiClient.get<ProductsResponse>(
      `${API_ENDPOINTS.PRODUCTS.SEARCH}?q=${query}&limit=${limit}`
    );
    return response.data;
  },

  getProductsByCategory: async (category: string, limit: number = 10): Promise<ProductsResponse> => {
    const response = await apiClient.get<ProductsResponse>(
      `${API_ENDPOINTS.PRODUCTS.CATEGORY(category)}?limit=${limit}`
    );
    return response.data;
  },

  getCategories: async (): Promise<string[]> => {
    const response = await apiClient.get<string[]>(API_ENDPOINTS.PRODUCTS.CATEGORIES);

    console.log("api",response?.data);
    
    return response?.data ?? [];
  },
};
