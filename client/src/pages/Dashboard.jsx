import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import AppLayout from '@/components/layout/AppLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import FixedSchedule from '@/components/dashboard/FixedSchedule';
import MovableSchedule from '@/components/dashboard/MovableSchedule';
import UpcomingTasks from '@/components/dashboard/UpcomingTasks';
import { Upload, CheckSquare, Calendar, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const mockUser = {
    full_name: 'Alex Johnson',
    email: 'alex.johnson@university.edu'
  };

  return (
    <AppLayout user={mockUser} title="Dashboard">
      {/* Welcome Section + Upload Button Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {mockUser.full_name.split(' ')[0]}!
          </h2>
          <p className="text-gray-600">
            Here's an overview of your upcoming tasks and study schedule.
          </p>
        </div>
        
        {/* Compact Upload Button */}
        <Link to={createPageUrl('UploadSyllabus')}>
          <div className="bg-gradient-to-r from-[#2d6a4f] to-[#1b4332] rounded-xl px-4 py-3 text-white hover:shadow-lg hover:shadow-[#2d6a4f]/20 transition-all duration-300 cursor-pointer group flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold">Upload New Syllabus</h3>
              <p className="text-xs text-green-100">Let AI extract your tasks</p>
            </div>
          </div>
        </Link>
      </motion.div>
      
      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        <StatsCard
          title="Total Tasks"
          value="24"
          subtitle="Across 4 courses"
          icon={CheckSquare}
          color="green"
        />
        <StatsCard
          title="Due This Week"
          value="6"
          subtitle="3 high priority"
          icon={Clock}
          color="gold"
        />
        <StatsCard
          title="Completed"
          value="18"
          subtitle="75% completion rate"
          icon={CheckSquare}
          color="emerald"
          trend={{ positive: true, value: '12% from last week' }}
        />
        <StatsCard
          title="Study Hours"
          value="28h"
          subtitle="This week"
          icon={Calendar}
          color="green"
        />
      </motion.div>
      
      {/* Main Content Grid - 3 columns */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="grid lg:grid-cols-3 gap-6"
      >
        <FixedSchedule />
        <MovableSchedule />
        <UpcomingTasks />
      </motion.div>
    </AppLayout>
  );
}