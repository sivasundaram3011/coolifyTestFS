const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3000'

import type { User, UserStats, ApiResponse } from '../types/user'

class UserApiClient {
  private readonly baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'API request failed')
      }

      return data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }

  async getUsers() {
    return this.request<User[]>('/api/users')
  }

  async getUser(id: string) {
    return this.request<User>(`/api/users/${id}`)
  }

  async createUser(data: Omit<User, '_id' | 'createdAt' | 'updatedAt' | 'lastActive'>) {
    return this.request<User>('/api/users', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateUser(id: string, data: Partial<User>) {
    return this.request<User>(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteUser(id: string) {
    return this.request(`/api/users/${id}`, {
      method: 'DELETE',
    })
  }

  async getStats() {
    return this.request<UserStats>('/api/users/stats/overview')
  }
}

export const api = new UserApiClient(API_URL)