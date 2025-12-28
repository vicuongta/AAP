import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Upload, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#2d6a4f]/10 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#d4a54a]/10 rounded-full blur-3xl opacity-30"></div>
      </div>
      
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2d6a4f]/10 text-[#2d6a4f] text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            AI-Powered Study Planning
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight leading-tight mb-6">
            Your Syllabus,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2d6a4f] to-[#d4a54a]">
              Automatically
            </span>
            <br />Organized
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Upload your syllabus and let AI create a personalized weekly study schedule. 
            Never miss a deadline again.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={createPageUrl('Dashboard')}>
              <Button size="lg" className="bg-[#2d6a4f] hover:bg-[#1b4332] text-white rounded-full px-8 py-6 text-lg shadow-lg shadow-[#2d6a4f]/25 group">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to={createPageUrl('Dashboard')}>
              <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg border-gray-200 hover:border-[#2d6a4f] hover:text-[#2d6a4f]">
                Log In
              </Button>
            </Link>
          </div>
        </motion.div>
        
        {/* Visual illustration */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 relative"
        >
          <div className="bg-white rounded-2xl shadow-2xl shadow-gray-200/50 border border-gray-100 p-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <div className="flex flex-col items-center gap-3 p-6 bg-[#f6f8f6] rounded-xl">
                <div className="w-14 h-14 rounded-xl bg-[#2d6a4f]/10 flex items-center justify-center">
                  <Upload className="w-7 h-7 text-[#2d6a4f]" />
                </div>
                <span className="text-sm font-medium text-gray-700">Upload Syllabus</span>
              </div>
              
              <div className="hidden sm:block">
                <ArrowRight className="w-6 h-6 text-gray-300" />
              </div>
              
              <div className="flex flex-col items-center gap-3 p-6 bg-[#f6f8f6] rounded-xl">
                <div className="w-14 h-14 rounded-xl bg-[#d4a54a]/10 flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-[#d4a54a]" />
                </div>
                <span className="text-sm font-medium text-gray-700">AI Extracts Tasks</span>
              </div>
              
              <div className="hidden sm:block">
                <ArrowRight className="w-6 h-6 text-gray-300" />
              </div>
              
              <div className="flex flex-col items-center gap-3 p-6 bg-[#f6f8f6] rounded-xl">
                <div className="w-14 h-14 rounded-xl bg-[#2d6a4f]/10 flex items-center justify-center">
                  <Calendar className="w-7 h-7 text-[#2d6a4f]" />
                </div>
                <span className="text-sm font-medium text-gray-700">Get Your Schedule</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}