import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  LayoutDashboard, 
  Upload, 
  Calendar, 
  CheckSquare, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import logo from '../../assets/QBtron.png';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, page: 'Dashboard' },
  { name: 'Upload Syllabus', icon: Upload, page: 'Upload-Syllabus' },
  { name: 'Weekly Planner', icon: Calendar, page: 'Weekly-Planner' },
  { name: 'Task List', icon: CheckSquare, page: 'Task-List' }
];

export default function PermanentSidebar({ collapsed, onToggle }) {
  const location = useLocation();
  
  const isActive = (page) => {
    return location.pathname.includes(page);
  };

  return (
    <aside className={cn(
      "fixed left-0 top-0 h-screen bg-white border-r border-gray-200 z-40 flex flex-col transition-all duration-300",
      collapsed ? "w-[72px]" : "w-[270px]"
    )}>
      {/* Logo Area */}
      <div className={cn("pt-6 pb-4 flex items-center justify-between", collapsed ? "px-4" : "px-6")}>
        <Link to={createPageUrl('Landing')} className="flex items-center gap-2.5">
          <img 
            src={logo}
            alt="QBtron Logo"
            className="w-8 h-8 object-contain flex-shrink-0"
          />
          {!collapsed && (
            <span className="text-xl font-semibold tracking-wide">
              <span className="text-[#2d6a4f]">QB</span>
              <span className="text-gray-700">tron</span>
            </span>
          )}
        </Link>
        <button
          onClick={onToggle}
          className={cn(
            "w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors",
            collapsed && "absolute -right-3 top-7 bg-white border border-gray-200 shadow-sm"
          )}
        >
          {collapsed ? <ChevronRight className="w-4 h-4 text-gray-500" /> : <ChevronLeft className="w-4 h-4 text-gray-500" />}
        </button>
      </div>
      
      {/* Navigation Menu */}
      <nav className={cn("flex-1 pt-4", collapsed ? "px-2" : "px-4")}>
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={createPageUrl(item.page)}
                title={collapsed ? item.name : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-xl transition-all duration-200 text-[18px]",
                  collapsed ? "px-3 py-3 justify-center" : "px-4 py-3",
                  isActive(item.page) 
                    ? "bg-[#2d6a4f]/10 text-[#2d6a4f] font-medium" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon className={cn(
                  "w-[18px] h-[18px] flex-shrink-0",
                  isActive(item.page) ? "text-[#2d6a4f]" : "text-gray-500"
                )} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}