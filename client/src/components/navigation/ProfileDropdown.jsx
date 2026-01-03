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
import { useNavigate } from 'react-router-dom';

export default function ProfileDropdown({ user }) {
  const navigate = useNavigate();
  const initials = user?.full_name
    ? user.full_name.split(' ').map(n => n[0]).join('').toUpperCase()
    : 'U';

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout'); // clear HttpOnly cookie server-side
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem('token'); // clear token client-side
      localStorage.removeItem('user');
      sessionStorage.clear();

      navigate(createPageUrl('Landing'));
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-3 p-1.5 rounded-full hover:bg-gray-50 transition-colors">
          <Avatar className="w-12 h-12 border-2 border-gray-100">
            <AvatarImage src={user?.avatar_url} />
            <AvatarFallback className="bg-gradient-to-br from-[#2d6a4f] to-[#1b4332] text-white text-sm font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60 mt-1 p-2">
        <div className="px-3 py-2 mb-2">
          <p className="text-md font-medium text-gray-900">{user?.full_name || 'User'}</p>
          <p className="text-sm text-gray-500 truncate">{user?.email}</p>
        </div>
        <DropdownMenuSeparator />
        <Link to={createPageUrl('Manage-Account')}>
          <DropdownMenuItem className="cursor-pointer rounded-lg text-md">
            <User className="w-4 h-4 mr-3 text-gray-500" />
            Manage Account
          </DropdownMenuItem>
        </Link>
        <Link to={createPageUrl('Settings')}>
          <DropdownMenuItem className="cursor-pointer rounded-lg text-md">
            <Settings className="w-4 h-4 mr-3 text-gray-500" />
            Settings
          </DropdownMenuItem>
        </Link>
        <Link to={createPageUrl('Help')}>
          <DropdownMenuItem className="cursor-pointer rounded-lg text-md">
            <HelpCircle className="w-4 h-4 mr-3 text-gray-500" />
            Help / FAQ
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer rounded-lg text-red-600 focus:text-red-600 focus:bg-red-50 hover:bg-red-50 text-md"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-3" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}