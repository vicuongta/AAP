import React from 'react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/ui/Logo';
import { RefreshCw, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Error500() {
  const handleRetry = () => {
    window.location.reload();
  };

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
          <div className="w-24 h-24 rounded-3xl bg-[#d4a54a]/10 flex items-center justify-center mx-auto mb-8">
            <AlertTriangle className="w-12 h-12 text-[#d4a54a]" />
          </div>
          
          <h1 className="text-8xl font-bold text-gray-200 mb-4">500</h1>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Something Went Wrong</h2>
          <p className="text-gray-600 mb-8">
            We're experiencing technical difficulties. Please try again in a moment.
          </p>
          
          <Button 
            onClick={handleRetry}
            className="bg-[#2d6a4f] hover:bg-[#1b4332] rounded-xl px-8"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </motion.div>
      </div>
    </div>
  );
}