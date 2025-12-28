import React from 'react';
import ProfileDropdown from './ProfileDropdown';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AppHeader({ user, title, breadcrumb }) {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6">
      <div className="flex flex-col">
        {breadcrumb && (
          <nav className="text-xs text-gray-400 mb-0.5">
            {breadcrumb}
          </nav>
        )}
        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative text-gray-500 hover:text-gray-700">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full"></span>
        </Button>
        <ProfileDropdown user={user} />
      </div>
    </header>
  );
}