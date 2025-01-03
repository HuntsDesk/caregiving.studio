import { Calendar, Users, PillIcon, ClipboardList } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
  isDesktopExpanded: boolean;
  onDesktopExpandedChange: (expanded: boolean) => void;
}

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  isOpen, 
  onClose,
  isDesktopExpanded,
  onDesktopExpandedChange
}: SidebarProps) {
  const menuItems = [
    { id: 'schedule', icon: Calendar, label: 'Schedule' },
    { id: 'contacts', icon: Users, label: 'Contacts' },
    { id: 'prescriptions', icon: PillIcon, label: 'Prescriptions' },
    { id: 'rxlog', icon: ClipboardList, label: 'Rx Log' },
  ];

  const baseClasses = "bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 py-4 flex flex-col z-30";
  const mobileClasses = "fixed inset-y-16 left-0 w-64 transform transition-transform duration-200 ease-in-out lg:hidden";
  const desktopClasses = cn(
    "fixed top-16 bottom-0 left-0 hidden lg:flex transition-all duration-300",
    isDesktopExpanded ? "w-64" : "w-[4.5rem]"
  );

  const handleMouseEnter = () => {
    onDesktopExpandedChange(true);
  };

  const handleMouseLeave = () => {
    onDesktopExpandedChange(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={cn(
        baseClasses,
        mobileClasses,
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <nav className="space-y-1 px-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                onClose?.();
              }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                activeTab === item.id
                  ? "bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-900/50 dark:to-blue-800/30 text-blue-600 dark:text-blue-400 font-medium shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5",
                activeTab === item.id ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"
              )} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <div 
        className={cn(baseClasses, desktopClasses)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <nav className="space-y-1 px-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                activeTab === item.id
                  ? "bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-900/50 dark:to-blue-800/30 text-blue-600 dark:text-blue-400 font-medium shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 min-w-[1.25rem]",
                activeTab === item.id ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"
              )} />
              <span className={cn(
                "truncate transition-opacity duration-300",
                isDesktopExpanded ? "opacity-100" : "opacity-0"
              )}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}