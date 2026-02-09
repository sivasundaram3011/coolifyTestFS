export interface User {
  _id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'moderator'
  status: 'active' | 'inactive' | 'pending'
  department?: string
  phone?: string
  lastActive: string
  createdAt: string
  updatedAt: string
}

export interface UserStats {
  totalUsers: number
  activeUsers: number
  inactiveUsers: number
  newThisMonth: number
  userGrowth: number
  activeGrowth: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}