import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  colorClass: string;
  isRTL: boolean;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, trend, colorClass, isRTL }) => {
  return (
    <div className={`bg-white rounded-xl p-6 shadow-sm border border-slate-100 ${isRTL ? 'font-urdu' : ''}`}>
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
        </div>
        <div className={`p-3 rounded-full ${colorClass} bg-opacity-10`}>
          <Icon className={`w-6 h-6 ${colorClass.replace('bg-', 'text-')}`} />
        </div>
      </div>
      {trend && (
        <div className={`mt-4 text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
          <span className="text-emerald-500 font-medium">{trend}</span>
          <span className="text-slate-400 ml-1">vs last month</span>
        </div>
      )}
    </div>
  );
};