import React from 'react';
import { useState } from 'react';
import Header from '../shared/Header';
import Sidebar from '../Sidebar';
import PageContent from './PageContent';

export default function MainLayout() {
  const [activeTab, setActiveTab] = useState('schedule');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(false);

  const handleMenuClick = () => {
    setIsSidebarOpen(true);
  };

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <Header 
          title="Caregiving.Studio"
          onMenuClick={handleMenuClick}
          onNavigate={handleNavigate}
        />
      </div>

      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={handleNavigate}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          isDesktopExpanded={isDesktopExpanded}
          onDesktopExpandedChange={setIsDesktopExpanded}
        />
        <main className={`flex-1 overflow-y-auto transition-all duration-300 ${
          isDesktopExpanded ? "lg:ml-64" : "lg:ml-[4.5rem]"
        }`}>
          <PageContent activeTab={activeTab} />
        </main>
      </div>
    </div>
  );
}