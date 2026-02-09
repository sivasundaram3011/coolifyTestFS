import React, { useState, useEffect } from 'react'
import { Plus, Users, Activity, TrendingUp, TrendingDown } from 'lucide-react'
import UserTable from './UserTable'
import UserForm from './UserForm'
import UserChart from './UserChart'
import StatsCard from './StatsCard'
import { api } from '../lib/userApi'
import type { User, UserStats } from '../types/user'

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [stats, setStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  useEffect(() => {
    fetchUsers()
    fetchStats()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await api.getUsers()
      if (response.success && response.data) {
        setUsers(response.data)
      }
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await api.getStats()
      if (response.success && response.data) {
        setStats(response.data)
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  }

  const handleCreateUser = async (userData: Omit<User, '_id' | 'createdAt' | 'updatedAt' | 'lastActive'>) => {
    try {
      const response = await api.createUser(userData)
      if (response.success && response.data) {
        setUsers([response.data, ...users])
        setShowForm(false)
        fetchStats()
      }
    } catch (error) {
      console.error('Failed to create user:', error)
      alert('Failed to create user')
    }
  }

  const handleUpdateUser = async (id: string, userData: Partial<User>) => {
    try {
      const response = await api.updateUser(id, userData)
      if (response.success && response.data) {
        setUsers(users.map(u => u._id === id ? response.data! : u))
        setEditingUser(null)
        setShowForm(false)
        fetchStats()
      }
    } catch (error) {
      console.error('Failed to update user:', error)
      alert('Failed to update user')
    }
  }

  const handleDeleteUser = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    
    try {
      await api.deleteUser(id)
      setUsers(users.filter(u => u._id !== id))
      fetchStats()
    } catch (error) {
      console.error('Failed to delete user:', error)
      alert('Failed to delete user')
    }
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingUser(null)
  }

  return (
    <div className="min-h-screen lmnt-theme-surface-bg">
      {/* Header */}
      <header className="lmnt-theme-primary-bg lmnt-theme-on-primary shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8" />
              <div>
                <h1 className="text-3xl font-bold">User Dashboard</h1>
                <p className="lmnt-theme-on-primary-inactive text-sm">Track and manage user activities</p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="lmnt-theme-secondary-bg lmnt-theme-on-secondary px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Plus className="w-5 h-5" />
              Add User
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Users"
              value={stats.totalUsers}
              icon={<Users className="w-6 h-6" />}
              trend={stats.userGrowth}
              bgClass="lmnt-theme-primary-bg"
              textClass="lmnt-theme-on-primary"
            />
            <StatsCard
              title="Active Users"
              value={stats.activeUsers}
              icon={<Activity className="w-6 h-6" />}
              trend={stats.activeGrowth}
              bgClass="lmnt-theme-success-bg"
              textClass="lmnt-theme-on-success"
            />
            <StatsCard
              title="New This Month"
              value={stats.newThisMonth}
              icon={<TrendingUp className="w-6 h-6" />}
              bgClass="lmnt-theme-secondary-bg"
              textClass="lmnt-theme-on-secondary"
            />
            <StatsCard
              title="Inactive Users"
              value={stats.inactiveUsers}
              icon={<TrendingDown className="w-6 h-6" />}
              bgClass="lmnt-theme-surface-variant-bg"
              textClass="lmnt-theme-on-surface"
            />
          </div>
        )}

        {/* Chart Section */}
        <div className="mb-8">
          <UserChart users={users} />
        </div>

        {/* User Table */}
        <div className="lmnt-theme-background-bg rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold lmnt-theme-primary mb-6">User Management</h2>
          <UserTable
            users={users}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDeleteUser}
          />
        </div>
      </main>

      {/* User Form Modal */}
      {showForm && (
        <UserForm
          user={editingUser}
          onSubmit={editingUser ? (data) => handleUpdateUser(editingUser._id, data) : handleCreateUser}
          onClose={handleCloseForm}
        />
      )}
    </div>
  )
}