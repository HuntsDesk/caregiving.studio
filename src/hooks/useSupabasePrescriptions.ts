import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { mapSupabasePrescription } from '../utils/prescriptionMappers';
import type { Prescription, PrescriptionFormData } from '../types/prescription';
import { useToast } from '../contexts/ToastContext';

export function useSupabasePrescriptions() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrescriptions = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('prescriptions')
        .select(`
          *,
          patient:contacts!patient_id (
            id,
            first_name,
            last_name,
            phone,
            email
          ),
          doctor:contacts!doctor_id (
            id,
            first_name,
            last_name,
            specialty,
            phone,
            email
          ),
          pharmacy:contacts!pharmacy_id (
            id,
            first_name,
            last_name,
            facility,
            phone,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setPrescriptions(data.map(mapSupabasePrescription));
    } catch (err) {
      console.error('Error fetching prescriptions:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchPrescriptions();
    }
  }, [user, fetchPrescriptions]);

  const updatePrescription = async (id: string, updates: Partial<Prescription>) => {
    if (!user) throw new Error('User must be authenticated');

    try {
      const updateData: Record<string, any> = {
        updated_at: new Date().toISOString()
      };

      // Map fields to database column names
      if (updates.name) updateData.name = updates.name;
      if (updates.dosage) updateData.dosage = updates.dosage;
      if (updates.frequency) updateData.frequency = updates.frequency;
      if (updates.startDate) updateData.start_date = updates.startDate;
      if ('endDate' in updates) updateData.end_date = updates.endDate;
      if ('active' in updates) updateData.active = updates.active;
      if ('takeWithFood' in updates) updateData.take_with_food = updates.takeWithFood;
      if ('notes' in updates) updateData.notes = updates.notes;
      if ('adverseReaction' in updates) updateData.adverse_reaction = updates.adverseReaction;

      // Handle contact IDs
      if ('patientId' in updates) updateData.patient_id = updates.patientId;
      if ('doctorId' in updates) updateData.doctor_id = updates.doctorId;
      if ('pharmacyId' in updates) updateData.pharmacy_id = updates.pharmacyId;

      const { error } = await supabase
        .from('prescriptions')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;

      // Show success toast
      showToast('Prescription updated successfully', 'success');

      // Refresh prescriptions to get updated data
      await fetchPrescriptions();
    } catch (err) {
      console.error('Error updating prescription:', err);
      showToast('Failed to update prescription', 'error');
      throw new Error('Failed to update prescription');
    }
  };

  const deletePrescription = async (id: string) => {
    if (!user) throw new Error('User must be authenticated');

    try {
      const { error } = await supabase
        .from('prescriptions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      showToast('Prescription deleted successfully', 'success');
      await fetchPrescriptions();
    } catch (err) {
      console.error('Error deleting prescription:', err);
      showToast('Failed to delete prescription', 'error');
      throw new Error('Failed to delete prescription');
    }
  };

  return {
    prescriptions,
    loading,
    error,
    updatePrescription,
    deletePrescription,
    refresh: fetchPrescriptions
  };
}