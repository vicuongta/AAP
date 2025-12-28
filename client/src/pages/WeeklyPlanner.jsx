import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import WeeklyCalendar from '@/components/planner/WeeklyCalendar';
import DailyView from '@/components/planner/DailyView';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, ChevronRight, RefreshCw, Calendar, LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';
import { format, addWeeks, subWeeks, addDays, startOfWeek } from 'date-fns';

export default function WeeklyPlanner() {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [view, setView] = useState('weekly');
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [isRegenerating, setIsRegenerating] = useState(false);

  const mockUser = { full_name: 'Alex Johnson', email: 'alex.johnson@university.edu' };

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekEnd = addDays(weekStart, 6);

  const handlePrevWeek = () => setCurrentWeek(subWeeks(currentWeek, 1));
  const handleNextWeek = () => setCurrentWeek(addWeeks(currentWeek, 1));
  const handleToday = () => { setCurrentWeek(new Date()); setSelectedDay(new Date()); };

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRegenerating(false);
  };

  return (
    <AppLayout user={mockUser} title="Weekly Planner" breadcrumb="Dashboard / Weekly Planner">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={handlePrevWeek} className="rounded-xl"><ChevronLeft className="w-4 h-4" /></Button>
              <Button variant="outline" size="icon" onClick={handleNextWeek} className="rounded-xl"><ChevronRight className="w-4 h-4" /></Button>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d, yyyy')}</h2>
            </div>
            <Button variant="ghost" onClick={handleToday} className="text-[#2d6a4f] hover:text-[#1b4332] hover:bg-[#2d6a4f]/10">Today</Button>
          </div>

          <div className="flex items-center gap-3">
            <Tabs value={view} onValueChange={setView}>
              <TabsList className="bg-gray-100 rounded-xl p-1">
                <TabsTrigger value="daily" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"><Calendar className="w-4 h-4 mr-2" />Daily</TabsTrigger>
                <TabsTrigger value="weekly" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"><LayoutGrid className="w-4 h-4 mr-2" />Weekly</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button onClick={handleRegenerate} disabled={isRegenerating} className="bg-[#2d6a4f] hover:bg-[#1b4332] rounded-xl">
              <RefreshCw className={`w-4 h-4 mr-2 ${isRegenerating ? 'animate-spin' : ''}`} />
              {isRegenerating ? 'Regenerating...' : 'Regenerate Schedule'}
            </Button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#2d6a4f]"></div><span className="text-sm text-gray-600">Homework</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-rose-500"></div><span className="text-sm text-gray-600">Exam Study</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#d4a54a]"></div><span className="text-sm text-gray-600">Project</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#2d6a4f]/60"></div><span className="text-sm text-gray-600">Reading</span></div>
        </div>

        {/* Calendar View */}
        {view === 'weekly' ? (
          <WeeklyCalendar currentWeek={currentWeek} />
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2"><DailyView selectedDate={selectedDay} /></div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Select</h3>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 7 }, (_, i) => {
                  const day = addDays(weekStart, i);
                  const isSelected = format(day, 'yyyy-MM-dd') === format(selectedDay, 'yyyy-MM-dd');
                  const isToday = format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
                  return (
                    <button key={i} onClick={() => setSelectedDay(day)} className={`p-3 rounded-xl text-center transition-all ${isSelected ? 'bg-[#2d6a4f] text-white' : isToday ? 'bg-[#2d6a4f]/10 text-[#2d6a4f]' : 'hover:bg-gray-50'}`}>
                      <p className="text-xs mb-1">{format(day, 'EEE')}</p>
                      <p className="font-semibold">{format(day, 'd')}</p>
                    </button>
                  );
                })}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Today's Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Study sessions</span><span className="font-medium">4</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Total hours</span><span className="font-medium">5.5h</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Tasks due</span><span className="font-medium text-[#d4a54a]">1</span></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </AppLayout>
  );
}