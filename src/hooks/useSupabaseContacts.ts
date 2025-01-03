import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import type { Contact } from '../types/contact';

export function useSupabaseContacts() {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContacts = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setContacts(data.map(contact => ({
        id: contact.id,
        type: contact.type as Contact['type'],
        firstName: contact.first_name,
        lastName: contact.last_name,
        phone: contact.phone || '',
        email: contact.email || '',
        specialty: contact.specialty,
        facility: contact.facility,
        address: [contact.street, contact.city, contact.state, contact.zip_code]
          .filter(Boolean)
          .join(', '),
        notes: contact.notes
      })));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchContacts();
    }
  }, [user, fetchContacts]);

  const deleteContact = useCallback(async (id: string) => {
    if (!user) throw new Error('User must be authenticated');

    try {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchContacts();
    } catch (err) {
      throw err;
    }
  }, [user, fetchContacts]);

  return {
    contacts,
    loading,
    error,
    deleteContact,
    refresh: fetchContacts
  };
}