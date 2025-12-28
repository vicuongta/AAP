import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import Logo from '@/components/ui/Logo';
import { FileWarning, Upload, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ErrorExtraction() {
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
          <div className="w-24 h-24 rounded-3xl bg-[#d4a54a]/10 flex items-center justify-center mx-auto mb-8">
            <FileWarning className="w-12 h-12 text-[#d4a54a]" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Extraction Failed</h2>
          <p className="text-gray-600 mb-6">
            We were unable to extract tasks from your file. This might happen if the document is unclear or doesn't contain recognizable deadline information.
          </p>
          
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 text-left">
            <p className="text-sm font-medium text-gray-700 mb-3">Tips for better results:</p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-[#2d6a4f] mt-0.5">•</span>
                Make sure the document is clear and readable
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#2d6a4f] mt-0.5">•</span>
                Use PDF format for best results
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#2d6a4f] mt-0.5">•</span>
                Ensure all text is properly formatted (not handwritten)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#2d6a4f] mt-0.5">•</span>
                Include the full syllabus with clear date formatting
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to={createPageUrl('UploadSyllabus')}>
              <Button className="bg-[#2d6a4f] hover:bg-[#1b4332] rounded-xl px-8 w-full sm:w-auto">
                <Upload className="w-4 h-4 mr-2" />
                Upload Another File
              </Button>
            </Link>
            <Link to={createPageUrl('Help')}>
              <Button variant="outline" className="rounded-xl px-8 w-full sm:w-auto">
                <HelpCircle className="w-4 h-4 mr-2" />
                Get Help
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}