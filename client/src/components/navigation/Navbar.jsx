import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import Logo from '@/components/ui/Logo';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-600 hover:text-[#2d6a4f] transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-gray-600 hover:text-[#2d6a4f] transition-colors">
              How it Works
            </a>
            <Link to={createPageUrl('Help')} className="text-sm text-gray-600 hover:text-[#2d6a4f] transition-colors">
              FAQ
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            <Link to={createPageUrl('Dashboard')}>
              <Button variant="ghost" className="text-gray-700 hover:text-[#2d6a4f]">
                Log in
              </Button>
            </Link>
            <Link to={createPageUrl('Dashboard')}>
              <Button className="bg-[#2d6a4f] hover:bg-[#1b4332] text-white rounded-full px-5">
                Sign Up Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}