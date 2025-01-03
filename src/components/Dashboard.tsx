import { Home, Clock, Calendar, AlertCircle, Bell, Plus } from 'lucide-react';
import Card from './shared/Card';
import Button from './shared/Button';
import PageHeader from './shared/PageHeader';

export default function Dashboard() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
        <Button
          variant="primary"
          icon={Plus}
          onClick={() => {}}
        >
          Add Task
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card title="Upcoming Medications" icon={Clock}>
          <p className="text-gray-600 dark:text-gray-400">Next: Vitamin D - 2:00 PM</p>
        </Card>

        <Card title="Appointments" icon={Calendar}>
          <p className="text-gray-600 dark:text-gray-400">Dr. Smith - Tomorrow 10:00 AM</p>
        </Card>

        <Card title="Refills Needed" icon={AlertCircle}>
          <p className="text-gray-600 dark:text-gray-400">2 medications need refills</p>
        </Card>
      </div>

      <Card title="Recent Updates" icon={Bell}>
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <p className="font-medium text-gray-900 dark:text-white">New prescription added</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Today at 9:30 AM</p>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <p className="font-medium text-gray-900 dark:text-white">Appointment rescheduled</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Yesterday at 2:15 PM</p>
          </div>
        </div>
      </Card>
    </div>
  );
}