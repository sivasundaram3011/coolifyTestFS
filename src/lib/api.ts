// API client for connecting frontend to backend
// Usage: import { api } from './lib/api'

const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3000';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    total: number;
    page: number;
    pages: number;
  };
}

interface Item {
  _id: string;
  name: string;
  description?: string;
  status: 'active' | 'inactive' | 'pending';
  metadata?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

class ApiClient {
  private readonly baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }

  // Items API
  async getItems(params?: { page?: number; limit?: number; status?: string }) {
    const queryString = params
      ? '?' + new URLSearchParams(params as any).toString()
      : '';
    return this.request<Item[]>(`/api/items${queryString}`);
  }

  async getItem(id: string) {
    return this.request<Item>(`/api/items/${id}`);
  }

  async createItem(data: Omit<Item, '_id' | 'createdAt' | 'updatedAt'>) {
    return this.request<Item>('/api/items', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateItem(id: string, data: Partial<Item>) {
    return this.request<Item>(`/api/items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteItem(id: string) {
    return this.request(`/api/items/${id}`, {
      method: 'DELETE',
    });
  }
}

export const api = new ApiClient(API_URL);
export type { Item, ApiResponse };
