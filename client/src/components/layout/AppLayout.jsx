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
      <div className={cn("transition-all duration-300", sidebarCollapsed ? "ml-[72px]" : "ml-[270px]")}>
        <AppHeader user={user} title={title} breadcrumb={breadcrumb} />
        <main className="p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}