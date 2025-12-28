import React from 'react';
import { cn } from '@/lib/utils';
import { format, addDays, startOfWeek } from 'date-fns';

const timeSlots = Array.from({ length: 14 }, (_, i) => i + 8); // 8 AM to 9 PM

const mockScheduleBlocks = [
  { id: 1, title: 'Binary Search Trees', day: 1, startHour: 9, duration: 2, color: 'bg-[#2d6a4f]/20 border-[#2d6a4f]/40 text-[#2d6a4f]' },
  { id: 2, title: 'Chapter Reading', day: 1, startHour: 14, duration: 1.5, color: 'bg-[#2d6a4f]/10 border-[#2d6a4f]/30 text-[#2d6a4f]' },
  { id: 3, title: 'Midterm Study', day: 2, startHour: 10, duration: 2, color: 'bg-rose-100 border-rose-300 text-rose-700' },
  { id: 4, title: 'Project Proposal', day: 2, startHour: 15, duration: 2, color: 'bg-[#d4a54a]/20 border-[#d4a54a]/40 text-[#8b6914]' },
  { id: 5, title: 'Binary Search Trees', day: 3, startHour: 9, duration: 2, color: 'bg-[#2d6a4f]/20 border-[#2d6a4f]/40 text-[#2d6a4f]' },
  { id: 6, title: 'Midterm Study', day: 4, startHour: 11, duration: 2, color: 'bg-rose-100 border-rose-300 text-rose-700' },
  { id: 7, title: 'Graph Algorithms', day: 4, startHour: 16, duration: 1.5, color: 'bg-[#2d6a4f]/20 border-[#2d6a4f]/40 text-[#2d6a4f]' },
  { id: 8, title: 'Project Proposal', day: 5, startHour: 10, duration: 2, color: 'bg-[#d4a54a]/20 border-[#d4a54a]/40 text-[#8b6914]' },
  { id: 9, title: 'Chapter Reading', day: 6, startHour: 10, duration: 1.5, color: 'bg-[#2d6a4f]/10 border-[#2d6a4f]/30 text-[#2d6a4f]' },
];

export default function WeeklyCalendar({ currentWeek }) {
  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-8 border-b border-gray-100">
        <div className="p-4 bg-[#f6f8f6]"></div>
        {days.map((day, index) => (
          <div key={index} className="p-4 text-center border-l border-gray-100">
            <p className="text-xs text-gray-500 uppercase tracking-wide">{format(day, 'EEE')}</p>
            <p className={cn(
              "text-lg font-semibold mt-1",
              format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') 
                ? "text-[#2d6a4f]" 
                : "text-gray-900"
            )}>
              {format(day, 'd')}
            </p>
          </div>
        ))}
      </div>

      {/* Time Grid */}
      <div className="relative">
        <div className="grid grid-cols-8">
          {/* Time column */}
          <div className="border-r border-gray-100">
            {timeSlots.map((hour) => (
              <div key={hour} className="h-16 border-b border-gray-50 px-3 pt-1">
                <span className="text-xs text-gray-400">
                  {hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`}
                </span>
              </div>
            ))}
          </div>

          {/* Day columns */}
          {days.map((day, dayIndex) => (
            <div key={dayIndex} className="relative border-r border-gray-100 last:border-r-0">
              {timeSlots.map((hour) => (
                <div key={hour} className="h-16 border-b border-gray-50"></div>
              ))}
              
              {/* Schedule blocks */}
              {mockScheduleBlocks
                .filter(block => block.day === dayIndex)
                .map((block) => (
                  <div
                    key={block.id}
                    className={cn(
                      "absolute left-1 right-1 rounded-lg border px-2 py-1 cursor-pointer hover:shadow-md transition-shadow overflow-hidden",
                      block.color
                    )}
                    style={{
                      top: `${(block.startHour - 8) * 64}px`,
                      height: `${block.duration * 64 - 4}px`
                    }}
                  >
                    <p className="text-xs font-medium truncate">{block.title}</p>
                    <p className="text-xs opacity-70">
                      {block.startHour > 12 ? block.startHour - 12 : block.startHour}
                      {block.startHour >= 12 ? 'PM' : 'AM'}
                    </p>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}