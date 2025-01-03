import { useLocalStorage } from './useLocalStorage';
import type { Contact } from '../types/contact';

const initialContacts: Contact[] = [
  {
    id: '1',
    type: 'patient',
    firstName: 'John',
    lastName: 'Smith',
    phone: '(555) 123-4567',
    email: 'john.smith@example.com',
    address: '123 Main St, Anytown, USA',
    prescriptions: ['1', '2']
  },
  {
    id: '2',
    type: 'doctor',
    firstName: 'Sarah',
    lastName: 'Williams',
    specialty: 'Primary Care Physician',
    phone: '(555) 987-6543',
    email: 'dr.williams@hospital.com',
    address: '456 Medical Center Dr.',
    facility: 'City General Hospital'
  },
  {
    id: '3',
    type: 'pharmacy',
    firstName: 'Health Plus',
    lastName: 'Downtown',
    phone: '(555) 456-7890',
    email: 'healthplus@example.com',
    address: '789 Pharmacy Ave',
    facility: 'Health Plus Pharmacy Network'
  }
];

export function useContacts() {
  const [contacts, setContacts] = useLocalStorage<Contact[]>('contacts', initialContacts);

  const updateContact = (id: string, updates: Partial<Contact>) => {
    setContacts(prevContacts =>
      prevContacts.map(contact =>
        contact.id === id ? { ...contact, ...updates } : contact
      )
    );
  };

  const addContact = (contact: Omit<Contact, 'id'>) => {
    const newContact = {
      ...contact,
      id: crypto.randomUUID()
    };
    setContacts(prev => [...prev, newContact]);
  };

  const deleteContact = (id: string) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  return {
    contacts,
    updateContact,
    addContact,
    deleteContact
  };
}