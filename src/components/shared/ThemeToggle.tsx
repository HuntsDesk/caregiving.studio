import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400 hidden dark:block" />
      <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400 block dark:hidden" />
    </button>
  );
}