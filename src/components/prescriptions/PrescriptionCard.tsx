import React from 'react';
import { Clock, Pill, Calendar } from 'lucide-react';
import type { Prescription } from '../../types';

interface PrescriptionCardProps {
  prescription: Prescription;
}

export default function PrescriptionCard({ prescription }: PrescriptionCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{prescription.name}</h3>
          <p className="text-gray-600">{prescription.dosage}</p>
        </div>
        <span className={`px-2 py-1 rounded text-sm ${
          prescription.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {prescription.active ? 'Active' : 'Inactive'}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{prescription.frequency}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Pill className="w-4 h-4" />
          <span>{prescription.pharmacy}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Refill: {prescription.refillDate}</span>
        </div>
      </div>

      {prescription.notes && (
        <p className="mt-4 text-sm text-gray-500">{prescription.notes}</p>
      )}
    </div>
  );
}