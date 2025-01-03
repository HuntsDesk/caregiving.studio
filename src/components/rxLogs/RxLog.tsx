import React from 'react';
import { ClipboardList } from 'lucide-react';
import PatientFilter from '../schedule/PatientFilter';
import RxLogTable from './RxLogTable';
import DateRangeFilter from './DateRangeFilter';
import { useDateRange } from '../../hooks/useDateRange';

export default function RxLog() {
  const [selectedPatient, setSelectedPatient] = React.useState<string>('all');
  const { startDate, endDate, setStartDate, setEndDate } = useDateRange();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <ClipboardList className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Medication Log</h2>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <DateRangeFilter
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
        <PatientFilter
          selectedPatient={selectedPatient}
          onPatientChange={setSelectedPatient}
        />
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
        <RxLogTable 
          patientId={selectedPatient === 'all' ? undefined : selectedPatient}
          dateRange={{ startDate, endDate }}
        />
      </div>
    </div>
  );
}