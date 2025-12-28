import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Settings, HelpCircle, LogOut } from 'lucide-react';
// import { base44 } from '@/api/base44Client';

export default function ProfileDropdown({ user }) {
  const initials = user?.full_name 
    ? user.full_name.split(' ').map(n => n[0]).join('').toUpperCase()
    : 'U';

  const handleLogout = () => {
    // base44.auth.logout(createPageUrl('Landing'));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-3 p-1.5 rounded-full hover:bg-gray-50 transition-colors">
          <Avatar className="w-9 h-9 border-2 border-gray-100">
            <AvatarImage src={user?.avatar_url} />
            <AvatarFallback className="bg-gradient-to-br from-[#2d6a4f] to-[#1b4332] text-white text-sm font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 mt-2 p-2">
        <div className="px-3 py-2 mb-2">
          <p className="text-sm font-medium text-gray-900">{user?.full_name || 'User'}</p>
          <p className="text-xs text-gray-500 truncate">{user?.email}</p>
        </div>
        <DropdownMenuSeparator />
        <Link to={createPageUrl('ManageAccount')}>
          <DropdownMenuItem className="cursor-pointer rounded-lg">
            <User className="w-4 h-4 mr-3 text-gray-500" />
            Manage Account
          </DropdownMenuItem>
        </Link>
        <Link to={createPageUrl('Settings')}>
          <DropdownMenuItem className="cursor-pointer rounded-lg">
            <Settings className="w-4 h-4 mr-3 text-gray-500" />
            Settings
          </DropdownMenuItem>
        </Link>
        <Link to={createPageUrl('Help')}>
          <DropdownMenuItem className="cursor-pointer rounded-lg">
            <HelpCircle className="w-4 h-4 mr-3 text-gray-500" />
            Help / FAQ
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="cursor-pointer rounded-lg text-red-600 focus:text-red-600 focus:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-3" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}