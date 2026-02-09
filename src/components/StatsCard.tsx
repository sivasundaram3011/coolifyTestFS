import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: number
  icon: React.ReactNode
  trend?: number
  bgClass: string
  textClass: string
}

export default function StatsCard({ title, value, icon, trend, bgClass, textClass }: StatsCardProps) {
  const isPositive = trend !== undefined && trend >= 0

  return (
    <div className={`${bgClass} ${textClass} rounded-lg shadow-lg p-6 transition-transform hover:scale-105`}>
      <div className="flex items-center justify-between mb-4">
        <div className="opacity-80">{icon}</div>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 text-sm font-semibold ${isPositive ? 'opacity-100' : 'opacity-80'}`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <div className="text-3xl font-bold mb-1">{value.toLocaleString()}</div>
      <div className="text-sm opacity-80">{title}</div>
    </div>
  )
}