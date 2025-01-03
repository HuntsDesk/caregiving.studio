import React from 'react';

interface BadgeProps {
  variant?: 'primary' | 'neutral' | 'success';
  children: React.ReactNode;
}

export default function Badge({ variant = 'neutral', children }: BadgeProps) {
  const variants = {
    primary: 'bg-blue-100 text-blue-800',
    neutral: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800'
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}