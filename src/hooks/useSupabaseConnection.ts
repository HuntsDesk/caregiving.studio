import { useState, useEffect } from 'react';
import { testSupabaseConnection } from '../lib/supabase';
import { useToast } from '../contexts/ToastContext';

export function useSupabaseConnection() {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const checkConnection = async () => {
      try {
        await testSupabaseConnection();
        setIsConnected(true);
        setError(null);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to connect to database';
        setError(message);
        setIsConnected(false);
        showToast(message, 'error');
      }
    };

    checkConnection();

    // Periodically check connection
    const interval = setInterval(checkConnection, 30000);
    return () => clearInterval(interval);
  }, [showToast]);

  return { isConnected, error };
}