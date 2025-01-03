import React, { createContext, useContext, useState, useEffect } from 'react';
import { testSupabaseConnection } from '../lib/supabase';
import { useToast } from './ToastContext';
import Alert from '../components/shared/Alert';

interface ConnectionContextType {
  isConnected: boolean;
  error: string | null;
}

const ConnectionContext = createContext<ConnectionContextType | undefined>(undefined);

export function ConnectionProvider({ children }: { children: React.ReactNode }) {
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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <Alert
          type="error"
          title="Connection Error"
          message={error}
        />
      </div>
    );
  }

  return (
    <ConnectionContext.Provider value={{ isConnected, error }}>
      {children}
    </ConnectionContext.Provider>
  );
}

export function useConnection() {
  const context = useContext(ConnectionContext);
  if (context === undefined) {
    throw new Error('useConnection must be used within a ConnectionProvider');
  }
  return context;
}

export default ConnectionProvider;