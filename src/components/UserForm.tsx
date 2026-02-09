import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import type { User } from '../types/user'

interface UserFormProps {
  user: User | null
  onSubmit: (data: Omit<User, '_id' | 'createdAt' | 'updatedAt' | 'lastActive'>) => void
  onClose: () => void
}

export default function UserForm({ user, onSubmit, onClose }: UserFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user' as 'admin' | 'user' | 'moderator',
    status: 'active' as 'active' | 'inactive' | 'pending',
    department: '',
    phone: ''
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        department: user.department || '',
        phone: user.phone || ''
      })
    }
  }, [user])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="lmnt-theme-background-bg rounded-lg shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="lmnt-theme-primary-bg lmnt-theme-on-primary px-6 py-4 rounded-t-lg flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {user ? 'Edit User' : 'Add New User'}
          </h2>
          <button
            onClick={onClose}
            className="hover:opacity-80 transition-opacity"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="name" className="block lmnt-theme-on-surface font-semibold mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 lmnt-theme-surface-variant-bg lmnt-theme-on-surface rounded-lg border-2 lmnt-theme-primary-border focus:outline-none focus:ring-2 focus:ring-bayer-primary-400"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block lmnt-theme-on-surface font-semibold mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 lmnt-theme-surface-variant-bg lmnt-theme-on-surface rounded-lg border-2 lmnt-theme-primary-border focus:outline-none focus:ring-2 focus:ring-bayer-primary-400"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block lmnt-theme-on-surface font-semibold mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 lmnt-theme-surface-variant-bg lmnt-theme-on-surface rounded-lg border-2 lmnt-theme-primary-border focus:outline-none focus:ring-2 focus:ring-bayer-primary-400"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <label htmlFor="department" className="block lmnt-theme-on-surface font-semibold mb-2">
              Department
            </label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-4 py-2 lmnt-theme-surface-variant-bg lmnt-theme-on-surface rounded-lg border-2 lmnt-theme-primary-border focus:outline-none focus:ring-2 focus:ring-bayer-primary-400"
              placeholder="Engineering"
            />
          </div>

          <div>
            <label htmlFor="role" className="block lmnt-theme-on-surface font-semibold mb-2">
              Role *
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 lmnt-theme-surface-variant-bg lmnt-theme-on-surface rounded-lg border-2 lmnt-theme-primary-border focus:outline-none focus:ring-2 focus:ring-bayer-primary-400"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
            </select>
          </div>

          <div>
            <label htmlFor="status" className="block lmnt-theme-on-surface font-semibold mb-2">
              Status *
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 lmnt-theme-surface-variant-bg lmnt-theme-on-surface rounded-lg border-2 lmnt-theme-primary-border focus:outline-none focus:ring-2 focus:ring-bayer-primary-400"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 lmnt-theme-surface-variant-bg lmnt-theme-on-surface rounded-lg font-semibold hover:opacity-80 transition-opacity"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 lmnt-theme-primary-bg lmnt-theme-on-primary rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              {user ? 'Update User' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}