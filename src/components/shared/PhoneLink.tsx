import React from 'react';
import { Phone } from 'lucide-react';
import { formatPhoneNumber } from '../../utils/formatters';

interface PhoneLinkProps {
  phone: string;
  showIcon?: boolean;
  className?: string;
}

export default function PhoneLink({ phone, showIcon = true, className = '' }: PhoneLinkProps) {
  const formattedPhone = formatPhoneNumber(phone);
  const phoneUrl = `tel:${phone.replace(/\D/g, '')}`;

  return (
    <a 
      href={phoneUrl}
      className={`inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 ${className}`}
    >
      {showIcon && <Phone className="w-4 h-4" />}
      <span>{formattedPhone}</span>
    </a>
  );
}