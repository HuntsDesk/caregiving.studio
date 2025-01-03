import { Save } from 'lucide-react';
import Card from './shared/Card';
import Button from './shared/Button';
import Toggle from './shared/Toggle';
import { useTheme } from '../contexts/ThemeContext';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
      </div>

      <div className="space-y-6">
        <Card title="Appearance">
          <div className="space-y-4">
            <Toggle
              checked={theme === 'dark'}
              onChange={toggleTheme}
              label="Dark Mode"
            />
          </div>
        </Card>

        <Card title="Account">
          <div className="space-y-4">
            <div className="flex justify-end">
              <Button variant="primary" icon={Save}>
                Save Changes
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}