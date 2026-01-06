import React from 'react';

import AppLayout from '@/components/layout/AppLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import FixedSchedule from '@/components/dashboard/FixedSchedule';
import MovableSchedule from '@/components/dashboard/MovableSchedule';
import UpcomingTasks from '@/components/dashboard/UpcomingTasks';
import DailyCalendar from '@/components/dashboard/DailyCalendar';
import FocusClock from '@/components/dashboard/FocusClock';
import WeeklyProgressGraph from '@/components/dashboard/WeeklyProgressGraph';
import { CheckSquare, Calendar } from 'lucide-react';
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
        className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          Welcome back, {mockUser.full_name.split(" ")[0]}!
        </h2>

        <div className="shrink-0">
          <FocusClock />
        </div>
      </motion.div>

      {/* Two Column Layout: Left (Stats + Tasks), Right (Calendar) */}
      <div className="grid lg:grid-cols-5 gap-12">
        {/* Left Column */}
        <div className="lg:col-span-3 space-y-5">
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
              icon={CheckSquare}
              color="blue"
            />
            <StatsCard
              title="Due This Week"
              value="6"
              subtitle="High priority"
              icon={Calendar}
              color="red"
            />
            <StatsCard
              title="Weekly Study Goal"
              icon={CheckSquare}
              color="blue"
              progress={{ currentText: "15h", totalText: "20h", percent: 75 }}
            />

            <StatsCard
              title="This Week's Progress"
              icon={Calendar}
              color="green"
              donut={{ percent: 78, completedLabel: "Tasks completed", remainingLabel: "Not yet completed" }}
            />
          </motion.div>

          {/* Weekly Progress Graph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <WeeklyProgressGraph />
          </motion.div>
        </div>

        {/* Right Column - Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="lg:col-span-2 space-y-5"
        >
          <DailyCalendar />
        </motion.div>
      </div>
    </AppLayout>
  );
}