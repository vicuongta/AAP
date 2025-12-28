import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import Logo from '@/components/ui/Logo';
import { FileX, Upload, FileText, File, Image } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ErrorUnsupportedFile() {
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
          className="text-center max-w-lg"
        >
          <div className="w-24 h-24 rounded-3xl bg-rose-50 flex items-center justify-center mx-auto mb-8">
            <FileX className="w-12 h-12 text-rose-400" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Unsupported File Type</h2>
          <p className="text-gray-600 mb-6">
            We couldn't process this file. Please upload a file in one of the supported formats.
          </p>
          
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
            <p className="text-sm font-medium text-gray-700 mb-4">Supported formats:</p>
            <div className="flex justify-center gap-6">
              <div className="flex items-center gap-2 text-gray-600">
                <FileText className="w-5 h-5 text-[#2d6a4f]" />
                <span className="text-sm">PDF</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <File className="w-5 h-5 text-[#d4a54a]" />
                <span className="text-sm">DOCX</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Image className="w-5 h-5 text-[#2d6a4f]" />
                <span className="text-sm">JPG / PNG</span>
              </div>
            </div>
          </div>
          
          <Link to={createPageUrl('UploadSyllabus')}>
            <Button className="bg-[#2d6a4f] hover:bg-[#1b4332] rounded-xl px-8">
              <Upload className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}