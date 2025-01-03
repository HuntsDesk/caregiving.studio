import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { formatRxLogResponse } from '../utils/rxLogFormatters';
import { useToast } from '../contexts/ToastContext';
import { getTimeBlockForHour, getTimeBlockForFrequency } from '../utils/timeUtils';
import type { RxLogWithDetails } from '../types/rxLog';

export function useRxLogs(prescriptionId?: string, patientId?: string, dateRange?: { startDate: string; endDate: string }) {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [logs, setLogs] = useState<RxLogWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('rx_logs')
        .select(`
          *,
          administrator:administrator_profiles!administered_by(
            email,
            display_name
          ),
          prescription:prescriptions!inner(
            id,
            name,
            dosage,
            frequency,
            patient:contacts!prescriptions_patient_id_fkey(
              id,
              first_name,
              last_name
            )
          )
        `)
        .order('administered_at', { ascending: false });

      if (prescriptionId) {
        query = query.eq('prescription_id', prescriptionId);
      }

      if (patientId) {
        query = query.eq('prescription.patient_id', patientId);
      }

      if (dateRange) {
        query = query
          .gte('administered_at', `${dateRange.startDate}T00:00:00`)
          .lte('administered_at', `${dateRange.endDate}T23:59:59`);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      setLogs(data?.map(formatRxLogResponse) || []);
    } catch (err) {
      console.error('Error fetching logs:', err);
      const message = err instanceof Error ? err.message : 'Failed to load medication logs';
      setError(message);
      showToast(message, 'error');
    } finally {
      setLoading(false);
    }
  }, [user, prescriptionId, patientId, dateRange, showToast]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const addLog = async (prescriptionId: string, notes?: string) => {
    if (!user) throw new Error('User must be authenticated');

    try {
      // First get the prescription to determine time block
      const { data: prescription, error: prescriptionError } = await supabase
        .from('prescriptions')
        .select('frequency')
        .eq('id', prescriptionId)
        .single();

      if (prescriptionError) throw prescriptionError;

      const timeBlock = prescription 
        ? getTimeBlockForFrequency(prescription.frequency)
        : getTimeBlockForHour(new Date().getHours());

      const { error: insertError } = await supabase
        .from('rx_logs')
        .insert({
          prescription_id: prescriptionId,
          administered_at: new Date().toISOString(),
          administered_by: user.id,
          notes: notes || null,
          time_block: timeBlock
        });

      if (insertError) throw insertError;
      await fetchLogs();
    } catch (err) {
      console.error('Administration error:', err);
      const message = err instanceof Error ? err.message : 'Failed to log administration';
      showToast(message, 'error');
      throw new Error(message);
    }
  };

  const deleteLog = async (logId: string) => {
    if (!user) throw new Error('User must be authenticated');

    try {
      const { error: deleteError } = await supabase
        .from('rx_logs')
        .delete()
        .eq('id', logId);

      if (deleteError) throw deleteError;
      await fetchLogs();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete log';
      showToast(message, 'error');
      throw new Error(message);
    }
  };

  return {
    logs,
    loading,
    error,
    addLog,
    deleteLog,
    refresh: fetchLogs
  };
}