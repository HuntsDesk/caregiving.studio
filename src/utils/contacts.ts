import type { Contact } from '../types/contact';

export function formatContactName(contact: any): string {
  if (!contact) return 'Not specified';
  return `${contact.first_name} ${contact.last_name}`;
}

export function formatDoctorName(contact: any): string {
  if (!contact) return 'Not specified';
  const name = formatContactName(contact);
  return contact.specialty ? `Dr. ${name} (${contact.specialty})` : `Dr. ${name}`;
}

export function formatPharmacyName(contact: any): string {
  if (!contact) return 'Not specified';
  const name = formatContactName(contact);
  return contact.facility ? `${name} - ${contact.facility}` : name;
}