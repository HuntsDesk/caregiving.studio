import { Menu } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import UserMenu from './UserMenu';

interface HeaderProps {
  title: string;
  onMenuClick?: () => void;
  onNavigate: (tab: string) => void;
}

export default function Header({ title, onMenuClick, onNavigate }: HeaderProps) {
  return (
    <div className="h-16 px-4 flex items-center justify-between max-w-[1920px] mx-auto">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          Caregiving.Studio
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <UserMenu onNavigate={onNavigate} />
      </div>
    </div>
  );
}