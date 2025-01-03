import React from 'react';
import { Mail } from 'lucide-react';

interface EmailLinkProps {
  email: string;
  showIcon?: boolean;
  className?: string;
}

export default function EmailLink({ email, showIcon = true, className = '' }: EmailLinkProps) {
  return (
    <a 
      href={`mailto:${email}`}
      className={`inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 ${className}`}
    >
      {showIcon && <Mail className="w-4 h-4" />}
      <span>{email}</span>
    </a>
  );
}