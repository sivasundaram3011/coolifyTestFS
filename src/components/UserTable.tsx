import React, { useState } from 'react'
import { Edit2, Trash2, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import type { User } from '../types/user'

interface UserTableProps {
  users: User[]
  loading: boolean
  onEdit: (user: User) => void
  onDelete: (id: string) => void
}

export default function UserTable({ users, loading, onEdit, onDelete }: UserTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'lmnt-theme-success-bg lmnt-theme-on-success'
      case 'inactive':
        return 'lmnt-theme-surface-variant-bg lmnt-theme-on-surface'
      case 'pending':
        return 'bg-bayer-secondary-200 text-bayer-secondary-900'
      default:
        return 'lmnt-theme-surface-variant-bg lmnt-theme-on-surface'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="lmnt-theme-primary text-xl">Loading users...</div>
      </div>
    )
  }

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 lmnt-theme-on-surface w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name, email, or role..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full pl-10 pr-4 py-3 lmnt-theme-surface-variant-bg lmnt-theme-on-surface rounded-lg border-2 lmnt-theme-primary-border focus:outline-none focus:ring-2 focus:ring-bayer-primary-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="lmnt-theme-primary-bg lmnt-theme-on-primary">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Role</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Last Active</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center lmnt-theme-on-surface">
                  {searchTerm ? 'No users found matching your search.' : 'No users yet. Add your first user!'}
                </td>
              </tr>
            ) : (
              paginatedUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full lmnt-theme-primary-bg lmnt-theme-on-primary flex items-center justify-center font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium lmnt-theme-on-surface">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 lmnt-theme-on-surface">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold lmnt-theme-secondary-bg lmnt-theme-on-secondary">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 lmnt-theme-on-surface text-sm">
                    {formatDate(user.lastActive)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEdit(user)}
                        className="p-2 lmnt-theme-secondary-bg lmnt-theme-on-secondary rounded hover:opacity-80 transition-opacity"
                        title="Edit user"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(user._id)}
                        className="p-2 lmnt-theme-danger-bg lmnt-theme-on-danger rounded hover:opacity-80 transition-opacity"
                        title="Delete user"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="lmnt-theme-on-surface text-sm">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 lmnt-theme-primary-bg lmnt-theme-on-primary rounded disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="lmnt-theme-on-surface font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 lmnt-theme-primary-bg lmnt-theme-on-primary rounded disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}