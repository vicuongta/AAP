import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import AppLayout from '@/components/layout/AppLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import FixedSchedule from '@/components/dashboard/FixedSchedule';
import MovableSchedule from '@/components/dashboard/MovableSchedule';
import UpcomingTasks from '@/components/dashboard/UpcomingTasks';
import DailyCalendar from '@/components/dashboard/DailyCalendar';
import FocusClock from '@/components/dashboard/FocusClock';
import WeeklyProgressGraph from '@/components/dashboard/WeeklyProgressGraph';
import { Upload, CheckSquare, Calendar, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const mockUser = {
    full_name: 'Alex Johnson',
    email: 'alex.johnson@university.edu'
  };

  return (
    <AppLayout user={mockUser} title="Dashboard">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-5 flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Welcome back, {mockUser.full_name.split(' ')[0]}!
          </h2>
          <p className="text-gray-500 text-sm">
            Here's what's coming up this week.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Focus Clock */}
          <FocusClock />
          
          {/* Upload Button */}
          <Link to={createPageUrl('UploadSyllabus')}>
            <div className="bg-[#2d6a4f] rounded-xl px-4 py-3 text-white hover:bg-[#1b4332] transition-all duration-200 cursor-pointer group flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">Upload New Syllabus</h3>
                <p className="text-xs text-green-100/80">AI will organize your tasks</p>
              </div>
            </div>
          </Link>
        </div>
      </motion.div>

      {/* Two Column Layout: Left (Stats + Tasks), Right (Calendar) */}
      <div className="grid lg:grid-cols-5 gap-5">
        {/* Left Column */}
        <div className="lg:col-span-3 space-y-5">
          {/* Weekly Progress Graph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <WeeklyProgressGraph />
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3"
          >
            <StatsCard
              title="Total Tasks"
              value="24"
              //subtitle="Across 4 courses"
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
              subtitle="75% completion"
              icon={CheckSquare}
              color="emerald"
              trend={{ positive: true, value: '12%' }}
            />
            <StatsCard
              title="Weekly Study Hours"
              value="28h"
              // subtitle="This week"
              icon={Calendar}
              color="green"
            />
          </motion.div>
          
          {/* Task Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="grid lg:grid-cols-3 gap-4"
          >
            <FixedSchedule />
            <MovableSchedule />
            <UpcomingTasks />
          </motion.div>
        </div>

        {/* Right Column - Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <DailyCalendar />
        </motion.div>
      </div>
    </AppLayout>
  );
}