import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Upload, FileText, X, Loader2, CheckCircle, AlertCircle, Image, File } from 'lucide-react';
import RecentFiles from '@/components/dashboard/RecentFiles';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const supportedFormats = [
  { ext: 'PDF', icon: FileText },
  { ext: 'DOCX', icon: File },
  { ext: 'JPG/PNG', icon: Image }
];

export default function UploadSyllabus() {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('idle');

  const mockUser = {
    full_name: 'Alex Johnson',
    email: 'alex.johnson@university.edu'
  };

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
    }
  }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!uploadedFile) return;
    
    setUploadStatus('uploading');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setUploadStatus('processing');
    await new Promise(resolve => setTimeout(resolve, 2000));
    setUploadStatus('success');
    
    setTimeout(() => {
      navigate(createPageUrl('TaskExtraction'));
    }, 1000);
  };

  const removeFile = () => {
    setUploadedFile(null);
    setUploadStatus('idle');
  };

  return (
    <AppLayout user={mockUser} title="Upload Syllabus" breadcrumb="Dashboard / Upload Syllabus">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Upload Your Course Syllabus
            </h2>
            <p className="text-gray-600">
              Our AI will extract deadlines, exams, and assignments automatically
            </p>
          </div>

          {/* Upload Area */}
          <div
            className={cn(
              "relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300",
              isDragging ? "border-[#2d6a4f] bg-[#2d6a4f]/5" : "border-gray-200 bg-white hover:border-gray-300",
              uploadStatus !== 'idle' && "pointer-events-none opacity-50"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".pdf,.docx,.doc,.jpg,.jpeg,.png"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={uploadStatus !== 'idle'}
            />
            
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-colors",
                isDragging ? "bg-[#2d6a4f]/10" : "bg-gray-100"
              )}>
                <Upload className={cn("w-8 h-8", isDragging ? "text-[#2d6a4f]" : "text-gray-400")} />
              </div>
              
              <p className="text-lg font-medium text-gray-900 mb-1">
                {isDragging ? 'Drop your file here' : 'Drag & drop your syllabus'}
              </p>
              <p className="text-gray-500 mb-4">or click to browse files</p>
              
              <div className="flex items-center gap-4">
                {supportedFormats.map((format) => (
                  <div key={format.ext} className="flex items-center gap-1.5 text-sm text-gray-400">
                    <format.icon className="w-4 h-4" />
                    {format.ext}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Uploaded File */}
          <AnimatePresence>
            {uploadedFile && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 bg-white rounded-xl border border-gray-200 p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#2d6a4f]/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[#2d6a4f]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{uploadedFile.name}</p>
                    <p className="text-xs text-gray-500">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  
                  {uploadStatus === 'idle' && (
                    <button onClick={removeFile} className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  )}
                  
                  {uploadStatus === 'uploading' && (
                    <div className="flex items-center gap-2 text-[#2d6a4f]">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span className="text-sm">Uploading...</span>
                    </div>
                  )}
                  
                  {uploadStatus === 'processing' && (
                    <div className="flex items-center gap-2 text-[#d4a54a]">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span className="text-sm">Extracting tasks...</span>
                    </div>
                  )}
                  
                  {uploadStatus === 'success' && (
                    <div className="flex items-center gap-2 text-[#2d6a4f]">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm">Complete!</span>
                    </div>
                  )}
                  
                  {uploadStatus === 'error' && (
                    <div className="flex items-center gap-2 text-rose-600">
                      <AlertCircle className="w-5 h-5" />
                      <span className="text-sm">Failed</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Upload Button */}
          {uploadedFile && uploadStatus === 'idle' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
              <Button
                onClick={handleUpload}
                className="w-full h-12 bg-[#2d6a4f] hover:bg-[#1b4332] text-white rounded-xl text-base font-medium"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload & Extract Tasks
              </Button>
            </motion.div>
          )}

          {/* Tips */}
          <div className="mt-8 bg-[#d4a54a]/10 rounded-xl p-4 border border-[#d4a54a]/20">
            <h4 className="text-sm font-medium text-[#8b6914] mb-2">Tips for best results</h4>
            <ul className="text-sm text-[#8b6914]/80 space-y-1">
              <li>• Make sure the document is clear and readable</li>
              <li>• Include the full syllabus with all dates and assignments</li>
              <li>• PDF files typically work best</li>
            </ul>
          </div>

          {/* Recent Uploads */}
          <div className="mt-8">
            <RecentFiles />
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}