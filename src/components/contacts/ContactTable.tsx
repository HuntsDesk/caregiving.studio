import React, { useState, useMemo } from 'react';
import { User, ChevronUp, ChevronDown } from 'lucide-react';
import { Contact } from '../../types/contact';
import { getContactTypeIcon, getContactTypeStyles } from '../../utils/contactTypes';
import PhoneLink from '../shared/PhoneLink';
import EmailLink from '../shared/EmailLink';

interface ContactTableProps {
  contacts: Contact[];
  onContactClick: (contact: Contact) => void;
}

type SortField = 'name' | 'phone' | 'email';
type SortDirection = 'asc' | 'desc';

export default function ContactTable({ contacts, onContactClick }: ContactTableProps) {
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const sortedContacts = useMemo(() => {
    return [...contacts].sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'name':
          comparison = `${a.lastName}, ${a.firstName}`.localeCompare(`${b.lastName}, ${b.firstName}`);
          break;
        case 'phone':
          comparison = (a.phone || '').localeCompare(b.phone || '');
          break;
        case 'email':
          comparison = (a.email || '').localeCompare(b.email || '');
          break;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [contacts, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4" /> : 
      <ChevronDown className="w-4 h-4" />;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-800">
            <th 
              className="text-left py-4 px-6 text-sm font-medium text-gray-600 dark:text-gray-400 cursor-pointer"
              onClick={() => handleSort('name')}
            >
              <div className="flex items-center gap-1">
                Name
                <SortIcon field="name" />
              </div>
            </th>
            <th 
              className="text-left py-4 px-6 text-sm font-medium text-gray-600 dark:text-gray-400 cursor-pointer"
              onClick={() => handleSort('phone')}
            >
              <div className="flex items-center gap-1">
                Contact
                <SortIcon field="phone" />
              </div>
            </th>
            <th 
              className="text-left py-4 px-6 text-sm font-medium text-gray-600 dark:text-gray-400 cursor-pointer"
              onClick={() => handleSort('email')}
            >
              <div className="flex items-center gap-1">
                Email
                <SortIcon field="email" />
              </div>
            </th>
            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600 dark:text-gray-400">
              Details
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {sortedContacts.map((contact) => {
            const Icon = getContactTypeIcon(contact.type);
            const { iconColor, bgColor } = getContactTypeStyles(contact.type);

            return (
              <tr 
                key={contact.id}
                onClick={() => onContactClick(contact)}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 ${bgColor} rounded-lg`}>
                      {Icon && <Icon className={`w-4 h-4 ${iconColor}`} />}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {contact.firstName} {contact.lastName}
                      </div>
                      {contact.type === 'doctor' && contact.specialty && (
                        <div className="text-sm text-gray-500">{contact.specialty}</div>
                      )}
                      {(contact.type === 'doctor' || contact.type === 'pharmacy') && contact.facility && (
                        <div className="text-sm text-gray-500">{contact.facility}</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  {contact.phone && (
                    <PhoneLink phone={contact.phone} />
                  )}
                </td>
                <td className="py-4 px-6">
                  {contact.email && (
                    <EmailLink email={contact.email} />
                  )}
                </td>
                <td className="py-4 px-6">
                  {contact.address && (
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {contact.address}
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {sortedContacts.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No contacts found
        </div>
      )}
    </div>
  );
}