import { useState, useCallback } from 'react';

interface ErrorState {
  message: string | null;
  field?: string | null;
}

export function useError() {
  const [error, setError] = useState<ErrorState>({ message: null, field: null });

  const handleError = useCallback((error: unknown, field?: string) => {
    const message = error instanceof Error ? error.message : 'An error occurred';
    setError({ message, field: field || null });
  }, []);

  const clearError = useCallback(() => {
    setError({ message: null, field: null });
  }, []);

  return {
    error,
    handleError,
    clearError
  };
}