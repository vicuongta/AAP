import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Upload Your Syllabus',
    description: 'Drag and drop your course syllabus in PDF, DOCX, or image format. We support multiple file types.',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop'
  },
  {
    number: '02',
    title: 'AI Extracts Your Tasks',
    description: 'Our AI scans your document and automatically identifies all deadlines, exams, projects, and assignments.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'
  },
  {
    number: '03',
    title: 'Get Your Personalized Schedule',
    description: 'Receive an optimized weekly study plan that fits your lifestyle and maximizes your productivity.',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop'
  }
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How it works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Three simple steps to transform your syllabus into an actionable study plan
          </p>
        </div>
        
        <div className="space-y-20">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}
            >
              <div className="flex-1">
                <span className="text-6xl font-bold text-[#2d6a4f]/20">{step.number}</span>
                <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-4">{step.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{step.description}</p>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2d6a4f]/20 to-[#d4a54a]/20 rounded-2xl transform rotate-3"></div>
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="relative rounded-2xl shadow-lg w-full h-64 object-cover"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}