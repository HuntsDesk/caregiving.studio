import React, { useState } from 'react';
import { Check, Undo } from 'lucide-react';
import { useRxLogs } from '../../hooks/useRxLogs';
import Button from '../shared/Button';

interface AdministerButtonProps {
  prescriptionId: string;
  onAdministered: () => void;
}

export default function AdministerButton({ prescriptionId, onAdministered }: AdministerButtonProps) {
  const { logs, addLog, deleteLog } = useRxLogs(prescriptionId);
  const [loading, setLoading] = useState(false);
  
  const latestLog = logs[0];
  const isAdministered = latestLog && 
    new Date(latestLog.administeredAt).toDateString() === new Date().toDateString();

  const handleAdminister = async () => {
    try {
      setLoading(true);
      await addLog(prescriptionId);
      onAdministered();
    } catch (err) {
      console.error('Administration error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUndo = async () => {
    if (!latestLog) return;
    
    try {
      setLoading(true);
      await deleteLog(latestLog.id);
      onAdministered();
    } catch (err) {
      console.error('Undo error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center h-full">
      {isAdministered ? (
        <Button
          variant="outline"
          size="sm"
          icon={Undo}
          onClick={handleUndo}
          disabled={loading}
          className="min-w-[100px]"
        >
          Undo
        </Button>
      ) : (
        <Button
          variant="primary"
          size="sm"
          icon={Check}
          onClick={handleAdminister}
          disabled={loading}
          className="min-w-[100px]"
        >
          {loading ? 'Adding...' : 'Administer'}
        </Button>
      )}
    </div>
  );
}