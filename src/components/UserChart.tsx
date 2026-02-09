import React, { useMemo } from 'react'
import { BarChart3 } from 'lucide-react'
import type { User } from '../types/user'

interface UserChartProps {
  users: User[]
}

export default function UserChart({ users }: UserChartProps) {
  const chartData = useMemo(() => {
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date()
      date.setMonth(date.getMonth() - (5 - i))
      return {
        month: date.toLocaleString('default', { month: 'short' }),
        year: date.getFullYear(),
        users: 0
      }
    })

    users.forEach(user => {
      const userDate = new Date(user.createdAt)
      const monthYear = `${userDate.toLocaleString('default', { month: 'short' })} ${userDate.getFullYear()}`
      
      const dataPoint = last6Months.find(d => 
        `${d.month} ${d.year}` === monthYear
      )
      if (dataPoint) {
        dataPoint.users++
      }
    })

    return last6Months
  }, [users])

  const maxUsers = Math.max(...chartData.map(d => d.users), 1)

  const roleDistribution = useMemo(() => {
    const distribution: Record<string, number> = {}
    users.forEach(user => {
      distribution[user.role] = (distribution[user.role] || 0) + 1
    })
    return Object.entries(distribution).map(([role, count]) => ({
      role,
      count,
      percentage: (count / users.length) * 100
    }))
  }, [users])

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'lmnt-theme-danger-bg'
      case 'moderator':
        return 'lmnt-theme-secondary-bg'
      case 'user':
        return 'lmnt-theme-success-bg'
      default:
        return 'lmnt-theme-surface-variant-bg'
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* User Growth Chart */}
      <div className="lmnt-theme-background-bg rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-6 h-6 lmnt-theme-primary" />
          <h3 className="text-xl font-bold lmnt-theme-primary">User Growth (Last 6 Months)</h3>
        </div>
        
        <div className="space-y-4">
          {chartData.map((data, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="lmnt-theme-on-surface font-medium text-sm">
                  {data.month} {data.year}
                </span>
                <span className="lmnt-theme-primary font-bold">{data.users}</span>
              </div>
              <div className="w-full lmnt-theme-surface-variant-bg rounded-full h-3 overflow-hidden">
                <div
                  className="lmnt-theme-primary-bg h-full rounded-full transition-all duration-500"
                  style={{ width: `${(data.users / maxUsers) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t-2 lmnt-theme-divider-primary">
          <div className="flex items-center justify-between">
            <span className="lmnt-theme-on-surface font-semibold">Total Users</span>
            <span className="text-2xl font-bold lmnt-theme-primary">{users.length}</span>
          </div>
        </div>
      </div>

      {/* Role Distribution */}
      <div className="lmnt-theme-background-bg rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold lmnt-theme-primary mb-6">Role Distribution</h3>
        
        <div className="space-y-6">
          {roleDistribution.map(({ role, count, percentage }) => (
            <div key={role}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${getRoleColor(role)}`} />
                  <span className="lmnt-theme-on-surface font-medium capitalize">{role}</span>
                </div>
                <span className="lmnt-theme-primary font-bold">{count}</span>
              </div>
              <div className="w-full lmnt-theme-surface-variant-bg rounded-full h-3 overflow-hidden">
                <div
                  className={`${getRoleColor(role)} h-full rounded-full transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="text-right mt-1">
                <span className="text-sm lmnt-theme-on-surface">{percentage.toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Status Distribution */}
        <div className="mt-8 pt-6 border-t-2 lmnt-theme-divider-primary">
          <h4 className="font-bold lmnt-theme-secondary mb-4">Status Overview</h4>
          <div className="grid grid-cols-3 gap-4">
            {['active', 'inactive', 'pending'].map(status => {
              const count = users.filter(u => u.status === status).length
              return (
                <div key={status} className="text-center">
                  <div className="text-2xl font-bold lmnt-theme-primary">{count}</div>
                  <div className="text-sm lmnt-theme-on-surface capitalize">{status}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}