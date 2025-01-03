import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  icon: LucideIcon;
  action?: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
  };
}

export default function PageHeader({ title, icon: Icon, action }: PageHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-3">
        <div className="bg-primary-50 p-3 rounded-xl">
          <Icon className="w-6 h-6 text-primary-500" />
        </div>
        <h2 className="text-2xl font-semibold text-neutral-850">{title}</h2>
      </div>
      
      {action && (
        <button 
          onClick={action.onClick}
          className="flex items-center gap-2 bg-primary-500 text-white px-4 py-2.5 rounded-xl hover:bg-primary-600 transition-colors duration-200"
        >
          <action.icon className="w-5 h-5" />
          <span>{action.label}</span>
        </button>
      )}
    </div>
  );
}