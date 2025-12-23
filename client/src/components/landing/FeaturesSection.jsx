import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Brain, Calendar, Bell, BarChart3, Zap } from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'Smart Document Parsing',
    description: 'Upload PDF, DOCX, or images. Our AI reads and understands your syllabus structure.',
    color: 'green'
  },
  {
    icon: Brain,
    title: 'Intelligent Task Extraction',
    description: 'Automatically identifies deadlines, exams, projects, and readings from your documents.',
    color: 'gold'
  },
  {
    icon: Calendar,
    title: 'AI-Generated Schedules',
    description: 'Creates optimized weekly study plans based on your availability and task priorities.',
    color: 'green'
  },
  {
    icon: Bell,
    title: 'Smart Reminders',
    description: 'Never miss a deadline with intelligent notifications tailored to your schedule.',
    color: 'gold'
  },
  {
    icon: BarChart3,
    title: 'Workload Balancing',
    description: 'Distributes your study time evenly to prevent last-minute cramming sessions.',
    color: 'green'
  },
  {
    icon: Zap,
    title: 'Quick Adjustments',
    description: 'Easily edit and regenerate schedules when plans change or new tasks arise.',
    color: 'gold'
  }
];

const colorMap = {
  green: 'bg-[#2d6a4f]/10 text-[#2d6a4f]',
  gold: 'bg-[#d4a54a]/10 text-[#d4a54a]'
};

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4 bg-[#f6f8f6]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to stay organized
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful features designed specifically for busy university students
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:shadow-gray-100/50 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl ${colorMap[feature.color]} flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}