import React, { useState, useEffect } from 'react';
import { format, startOfWeek, addDays, isSameDay, isToday } from 'date-fns';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const mockFixedItems = [
  { id: 1, title: 'Calculus II Class', days: ['monday', 'wednesday', 'friday'], startHour: 10, duration: 1 },
  { id: 2, title: 'Part-time Job', days: ['tuesday', 'thursday'], startHour: 14, duration: 4 },
  { id: 3, title: 'Gym Session', days: ['monday', 'wednesday', 'friday'], startHour: 7, duration: 1 },
  { id: 4, title: 'Physics Lab', days: ['thursday'], startHour: 13, duration: 2 },
];

const mockUpcomingTasks = [
  { id: 1, title: 'Assignment Due', course: 'CS301', dueDate: new Date(Date.now() + 86400000 * 2), startHour: 9, duration: 0.5, priority: 'assignment' },
  { id: 2, title: 'Quiz', course: 'MATH201', dueDate: new Date(Date.now() + 86400000 * 1), startHour: 11, duration: 0.5, priority: 'quiz' },
  { id: 3, title: 'Midterm Exam', course: 'PHYS101', dueDate: new Date(Date.now() + 86400000 * 4), startHour: 14, duration: 2, priority: 'exam' },
  { id: 4, title: 'Project Due', course: 'ENG102', dueDate: new Date(Date.now() + 86400000 * 3), startHour: 23, duration: 0, priority: 'assignment' },
];

export default function DailyCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);

  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const selectedDayName = format(selectedDate, 'EEEE').toLowerCase();
  
  const dailyFixedItems = mockFixedItems.filter(item => 
    item.days.includes(selectedDayName)
  );

  const dailyTasks = mockUpcomingTasks.filter(task =>
    isSameDay(task.dueDate, selectedDate)
  );

  // Get priority for each day in the week
  const getDayPriority = (day) => {
    const dayTasks = mockUpcomingTasks.filter(task => isSameDay(task.dueDate, day));
    if (dayTasks.length === 0) return null;
    
    // Return highest priority (exam > quiz > assignment)
    if (dayTasks.some(t => t.priority === 'exam')) return 'exam';
    if (dayTasks.some(t => t.priority === 'quiz')) return 'quiz';
    return 'assignment';
  };

  const hours = Array.from({ length: 14 }, (_, i) => i + 7); // 7 AM to 8 PM

  // Calculate current time line position
  const isSelectedToday = isToday(selectedDate);
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const currentTimePosition = isSelectedToday && currentHour >= 7 && currentHour <= 20
    ? ((currentHour - 7) * 60 + currentMinute) / 60 * 56 // 56px per hour (48px height + 8px margin)
    : null;

  return (
    <div className="bg-white rounded-xl border border-gray-100/50 h-full flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">Calendar</h3>
        <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
          Day <ChevronDown className="w-3 h-3" />
        </button>
      </div>

      {/* Week Selector */}
      <div className="px-4 py-3 border-b border-gray-50">
        <div className="grid grid-cols-7 gap-1.5">
          {weekDays.map((day, index) => {
            const isSelected = isSameDay(day, selectedDate);
            const isTodayDate = isToday(day);
            const priority = getDayPriority(day);
            
            return (
              <button
                key={index}
                onClick={() => setSelectedDate(day)}
                className={cn(
                  "flex flex-col items-center justify-center py-2 rounded-lg transition-all relative",
                  isSelected && "bg-[#2d6a4f] text-white",
                  !isSelected && isTodayDate && "bg-[#2d6a4f]/10 text-[#2d6a4f] font-medium",
                  !isSelected && !isTodayDate && "text-gray-500 hover:bg-gray-50"
                )}
              >
                <span className="text-xs font-medium mb-1">{format(day, 'EEE')}</span>
                <span className={cn(
                  "text-base font-semibold",
                  isSelected && "text-white"
                )}>
                  {format(day, 'd')}
                </span>
                {priority && (
                  <div className={cn(
                    "absolute bottom-1 w-1.5 h-1.5 rounded-full",
                    priority === 'exam' && "bg-rose-500",
                    priority === 'quiz' && "bg-amber-400",
                    priority === 'assignment' && "bg-emerald-500",
                    isSelected && "bg-white"
                  )} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Timeline View */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        <div className="relative">
          {/* Current Time Indicator */}
          {currentTimePosition !== null && (
            <div
              className="absolute left-0 right-0 z-10 flex items-center"
              style={{ top: `${currentTimePosition}px` }}
            >
              <div className="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0"></div>
              <div className="flex-1 h-0.5 bg-rose-500"></div>
            </div>
          )}
          
          {hours.map((hour) => {
            const isPM = hour >= 12;
            const displayHour = hour > 12 ? hour - 12 : hour;
            const timeString = `${displayHour} ${isPM ? 'PM' : 'AM'}`;
            
            // Find events at this hour
            const eventsAtHour = [
              ...dailyFixedItems.filter(item => item.startHour === hour),
              ...dailyTasks.filter(task => task.startHour === hour)
            ];

            return (
              <div key={hour} className="flex items-start gap-3 mb-4">
                <span className="text-xs text-gray-400 w-12 flex-shrink-0 pt-1">{timeString}</span>
                <div className="flex-1 border-t border-gray-100 pt-2 min-h-[32px] relative">
                  {eventsAtHour.map((event, idx) => (
                    <div
                      key={idx}
                      className="absolute left-0 right-0 bg-[#2d6a4f] rounded px-2 py-1 mb-1"
                      style={{
                        top: `${idx * 28}px`,
                        height: `${event.duration * 40}px`,
                        minHeight: '24px'
                      }}
                    >
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-1 rounded-full bg-white"></div>
                        <span className="text-xs text-white font-medium truncate">{event.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}