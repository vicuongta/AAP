import React, { useState } from 'react';
import PermanentSidebar from '@/components/navigation/PermanentSidebar';
import AppHeader from '@/components/navigation/AppHeader';
import { cn } from '@/lib/utils';

export default function AppLayout({ children, user, title, breadcrumb }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#f6f8f6]">
      {/* Fixed Permanent Sidebar - Always visible, collapsible */}
      <PermanentSidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      {/* Main Content Area - offset by sidebar width */}
      <div className={cn("transition-all duration-300", sidebarCollapsed ? "ml-18" : "ml-67.5")}>
        <AppHeader user={user} title={title} breadcrumb={breadcrumb} />
        <main className="p-6 lg:p-8">
          <div className="mx-auto w-full max-w-7xl 2xl:max-w-380">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}