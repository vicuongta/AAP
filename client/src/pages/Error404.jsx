import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import Logo from '@/components/ui/Logo';
import { Home, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Error404() {
  return (
    <div className="min-h-screen bg-[#f6f8f6] flex flex-col">
      <header className="p-6">
        <Logo />
      </header>
      
      <div className="flex-1 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-md"
        >
          <div className="w-24 h-24 rounded-3xl bg-[#2d6a4f]/10 flex items-center justify-center mx-auto mb-8">
            <Search className="w-12 h-12 text-[#2d6a4f]/60" />
          </div>
          
          <h1 className="text-8xl font-bold text-gray-200 mb-4">404</h1>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          
          <Link to={createPageUrl('Landing')}>
            <Button className="bg-[#2d6a4f] hover:bg-[#1b4332] rounded-xl px-8">
              <Home className="w-4 h-4 mr-2" />
              Go Back Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}