import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import Logo from '@/components/ui/Logo';
import { 
  LayoutDashboard, 
  Upload, 
  Calendar, 
  CheckSquare, 
  Settings, 
  HelpCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, page: 'Dashboard' },
  { name: 'Upload Syllabus', icon: Upload, page: 'UploadSyllabus' },
  { name: 'Weekly Planner', icon: Calendar, page: 'WeeklyPlanner' },
  { name: 'Task List', icon: CheckSquare, page: 'TaskList' },
  { name: 'Settings', icon: Settings, page: 'Settings' },
  { name: 'Help', icon: HelpCircle, page: 'Help' },
];

export default function Sidebar({ collapsed, onToggle }) {
  const location = useLocation();
  
  const isActive = (page) => {
    return location.pathname.includes(page);
  };

  return (
    <aside className={cn(
      "fixed left-0 top-0 h-screen bg-white border-r border-gray-100 z-40 transition-all duration-300",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="flex flex-col h-full">
        <div className={cn(
          "h-16 flex items-center border-b border-gray-100 px-4",
          collapsed ? "justify-center" : "justify-between"
        )}>
          <Logo showText={!collapsed} />
          <button 
            onClick={onToggle}
            className={cn(
              "w-8 h-8 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors",
              collapsed && "hidden"
            )}
          >
            <ChevronLeft className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        
        {collapsed && (
          <button 
            onClick={onToggle}
            className="w-full py-3 flex justify-center hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </button>
        )}
        
        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={createPageUrl(item.page)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                isActive(item.page) 
                  ? "bg-[#2d6a4f]/10 text-[#2d6a4f]" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                collapsed && "justify-center"
              )}
            >
              <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive(item.page) && "text-[#2d6a4f]")} />
              {!collapsed && (
                <span className="text-sm font-medium">{item.name}</span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}